#!/usr/bin/env node
/**
 * Verify a deployed /api/channels endpoint.
 *
 *   npm run verify:deploy                     production (default)
 *   npm run verify:deploy -- <base-url>       any deploy or preview URL
 *   npm run verify:local                      the handler on a throwaway local server
 *
 * Read-only: GET, HEAD, and one POST that must be refused. Exits non-zero if
 * any check fails. It cannot see which Node version Netlify built with, so
 * confirm that separately in the deploy log (see the reminder it prints).
 */
import http from "node:http";
import { pathToFileURL } from "node:url";

export const PRODUCTION_URL = "https://live-sound-eq-sop.netlify.app";
const STATUSES = ["proposed", "attested", "expired", "rejected"];
const CHANNEL_KEYS = ["name", "variant", "group", "groupSlug", "status", "bands", "attestation"];
const ATTESTATION_KEYS = [
  "source", "by", "role", "basis", "verified", "model", "rationale", "rejection"
];

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function assert(cond, message) {
  if (!cond) throw new Error(message);
}

async function get(base, path, init) {
  const res = await fetch(base + path, init);
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* not JSON; checks decide if that matters */ }
  return { res, text, json };
}

/** Each check throws on failure. Order does not matter; none depend on another. */
export const CHECKS = [
  ["site root serves", async (b) => {
    const { res } = await get(b, "/");
    assert(res.status === 200, `expected 200, got ${res.status}`);
  }],
  ["no params: 200 JSON, count matches channels", async (b) => {
    const { res, json } = await get(b, "/api/channels");
    assert(res.status === 200, `expected 200, got ${res.status}`);
    assert(/application\/json/.test(res.headers.get("content-type") ?? ""), "content-type is not JSON");
    assert(same(Object.keys(json), ["count", "filters", "channels"]), "top-level keys changed");
    assert(json.count === json.channels.length && json.count > 0, "count does not match channels");
  }],
  ["channel and attestation shape is stable", async (b) => {
    const { json } = await get(b, "/api/channels");
    for (const c of json.channels) {
      assert(same(Object.keys(c), CHANNEL_KEYS), `${c.name}: channel keys changed`);
      assert(same(Object.keys(c.attestation), ATTESTATION_KEYS), `${c.name}: attestation keys changed`);
      assert(STATUSES.includes(c.status), `${c.name}: unknown status ${c.status}`);
    }
  }],
  ["ledger internals do not leak", async (b) => {
    const { text } = await get(b, "/api/channels");
    assert(!/ttlDays|supersedes/.test(text), "ttlDays or supersedes present in response");
  }],
  ["no model record is ever attested", async (b) => {
    const { json } = await get(b, "/api/channels?status=attested");
    assert(json.channels.every((c) => c.attestation.source !== "model"), "a model record reads attested");
  }],
  ["each status filter returns only that status, and they partition the set", async (b) => {
    const all = (await get(b, "/api/channels")).json.count;
    let sum = 0;
    for (const s of STATUSES) {
      const { res, json } = await get(b, `/api/channels?status=${s}`);
      assert(res.status === 200, `status=${s}: expected 200, got ${res.status}`);
      assert(json.channels.every((c) => c.status === s), `status=${s} returned another status`);
      sum += json.count;
    }
    assert(sum === all, `statuses sum to ${sum}, total is ${all}`);
  }],
  ["group filter and combined filter work", async (b) => {
    const { res, json } = await get(b, "/api/channels?status=attested&group=drums");
    assert(res.status === 200, `expected 200, got ${res.status}`);
    assert(json.count > 0, "no attested drums returned");
    assert(json.channels.every((c) => c.groupSlug === "drums" && c.status === "attested"), "filter leaked");
  }],
  ["bad status -> 400 listing valid values", async (b) => {
    const { res, json } = await get(b, "/api/channels?status=bogus");
    assert(res.status === 400, `expected 400, got ${res.status}`);
    assert(same([...json.validStatuses].sort(), [...STATUSES].sort()), "validStatuses wrong");
  }],
  ["bad group -> 400 listing valid slugs", async (b) => {
    const { res, json } = await get(b, "/api/channels?group=brass");
    assert(res.status === 400, `expected 400, got ${res.status}`);
    assert(Array.isArray(json.validGroups) && json.validGroups.includes("drums"), "validGroups missing");
  }],
  ["repeated param -> 400", async (b) => {
    const { res } = await get(b, "/api/channels?status=attested&status=bogus");
    assert(res.status === 400, `expected 400, got ${res.status}`);
  }],
  ["huge input is not echoed back", async (b) => {
    const { res, text } = await get(b, `/api/channels?status=${"a".repeat(8000)}`);
    assert(res.status === 400, `expected 400, got ${res.status}`);
    assert(text.length < 600, `error body is ${text.length} bytes`);
  }],
  ["error bodies leak no stack or paths", async (b) => {
    const { text } = await get(b, "/api/channels?status=x");
    assert(!/stack|node_modules|\/Users\/|\.js:\d+/.test(text), "error body looks like a stack trace or path");
  }],
  ["POST is refused with 405", async (b) => {
    const { res } = await get(b, "/api/channels", { method: "POST" });
    assert(res.status === 405, `expected 405, got ${res.status}`);
  }],
  ["HEAD works", async (b) => {
    const { res } = await get(b, "/api/channels", { method: "HEAD" });
    assert(res.status === 200, `expected 200, got ${res.status}`);
  }],
  ["nosniff header present", async (b) => {
    const { res } = await get(b, "/api/channels");
    assert(res.headers.get("x-content-type-options") === "nosniff", "x-content-type-options missing");
  }]
];

/** Run every check against `base`. Returns [{ name, ok, error? }]. */
export async function runChecks(base, checks = CHECKS) {
  const results = [];
  for (const [name, fn] of checks) {
    try {
      await fn(base.replace(/\/$/, ""));
      results.push({ name, ok: true });
    } catch (error) {
      results.push({ name, ok: false, error: error.message });
    }
  }
  return results;
}

/** The real handler on a throwaway server, for testing this script with no Netlify. */
export async function startLocalServer() {
  const { handleRequest } = await import("../netlify/lib/channels-api.js");
  const server = http.createServer(async (req, res) => {
    if (req.url === "/" || req.url === "") {
      res.writeHead(200, { "content-type": "text/plain" }).end("ok");
      return;
    }
    const response = handleRequest(new Request(`http://localhost${req.url}`, { method: req.method }));
    const headers = Object.fromEntries(response.headers);
    headers["x-content-type-options"] ??= "nosniff"; // netlify.toml adds this in production
    res.writeHead(response.status, headers);
    res.end(req.method === "HEAD" ? undefined : await response.text());
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => server.close() };
}

async function main() {
  const arg = process.argv[2];
  let local = null;
  let base = arg ?? PRODUCTION_URL;
  if (arg === "--local") {
    local = await startLocalServer();
    base = local.url;
  }

  console.log(`Verifying ${base}\n`);
  const results = await runChecks(base);
  local?.close();

  for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.ok ? "" : `\n        ${r.error}`}`);
  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${results.length - failed}/${results.length} checks passed.`);
  if (!local) {
    console.log("Also confirm in the Netlify deploy log that the build used Node 22 (this script cannot see that).");
  }
  process.exit(failed ? 1 : 0);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) main();
