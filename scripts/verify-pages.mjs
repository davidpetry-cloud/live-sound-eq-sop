#!/usr/bin/env node
/**
 * Verify the GitHub Pages site and its static JSON API.
 *
 *   npm run verify:pages                      production (default)
 *   npm run verify:pages -- <base-url>        any other copy of the site
 *   npm run verify:pages -- --local           a fresh build on a throwaway local server
 *
 * Read-only GETs. Exits non-zero if any check fails.
 */
import http from "node:http";
import { readFile } from "node:fs/promises";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, dirname, extname, normalize } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { buildApi } from "./build-api.mjs";

export const PRODUCTION_URL = "https://davidpetry-cloud.github.io/live-sound-eq-sop";
const STATUSES = ["proposed", "attested", "expired", "rejected"];
const CHANNEL_KEYS = ["name", "variant", "group", "groupSlug", "status", "bands", "attestation"];
const ATTESTATION_KEYS = ["source", "by", "role", "basis", "verified", "model", "rationale", "rejection"];
const MAX_AGE_HOURS = 48; // the workflow rebuilds daily; two days allows one missed run

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
function assert(cond, message) { if (!cond) throw new Error(message); }

async function get(base, path) {
  const res = await fetch(`${base}/${path}`);
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* checks decide if that matters */ }
  return { res, text, json };
}

/** Each check throws on failure. None depend on another. */
export const CHECKS = [
  ["page serves", async (b) => {
    const { res, text } = await get(b, "");
    assert(res.status === 200, `got ${res.status}`);
    assert(text.includes("Live Sound EQ SOP"), "title missing");
  }],
  ["page assets serve", async (b) => {
    for (const p of ["app.js", "app.css", "theme.js", "fonts/fonts.css"]) {
      const { res } = await get(b, p);
      assert(res.status === 200, `${p}: ${res.status}`);
    }
  }],
  ["strip simulator serves", async (b) => {
    const { res, text } = await get(b, "strip.html");
    assert(res.status === 200, `strip.html: ${res.status}`);
    assert(text.includes("Strip simulator"), "strip.html title missing");
    for (const p of ["strip.js", "strip.css"]) {
      const r = await get(b, p);
      assert(r.res.status === 200, `${p}: ${r.res.status}`);
    }
  }],
  ["index lists every file, and each is JSON", async (b) => {
    const { json } = await get(b, "api/index.json");
    assert(json && Array.isArray(json.files) && json.files.length > 0, "api/index.json missing or empty");
    assert(same([...json.statuses].sort(), [...STATUSES].sort()), "statuses differ");
    for (const f of json.files) {
      const r = await get(b, f);
      assert(r.res.status === 200 && r.json, `${f}: ${r.res.status}`);
    }
  }],
  ["data is fresh", async (b) => {
    const { json } = await get(b, "api/channels.json");
    const age = (Date.now() - Date.parse(json.generated)) / 36e5;
    assert(Number.isFinite(age) && age < MAX_AGE_HOURS, `generated ${json.generated} (${age.toFixed(1)} h ago)`);
  }],
  ["status files add up to the whole", async (b) => {
    const all = (await get(b, "api/channels.json")).json;
    let sum = 0;
    for (const s of STATUSES) {
      const { json } = await get(b, `api/channels/${s}.json`);
      assert(json.channels.every((c) => c.status === s), `${s}.json holds another status`);
      sum += json.count;
    }
    assert(sum === all.count, `statuses sum to ${sum}, all is ${all.count}`);
  }],
  ["combined filter is the intersection", async (b) => {
    const both = (await get(b, "api/channels/attested/drums.json")).json;
    const drums = (await get(b, "api/channels/drums.json")).json;
    const expect = drums.channels.filter((c) => c.status === "attested").map((c) => c.name + c.variant);
    assert(same(both.channels.map((c) => c.name + c.variant), expect), "attested/drums differs from drums ∩ attested");
  }],
  ["no model record reads as attested", async (b) => {
    const { json } = await get(b, "api/channels.json");
    const bad = json.channels.filter((c) => c.attestation.source === "model" && c.status === "attested");
    assert(bad.length === 0, `${bad.map((c) => c.name).join(", ")}`);
  }],
  ["only allowlisted fields leave the ledger", async (b) => {
    const { json } = await get(b, "api/channels.json");
    for (const c of json.channels) {
      assert(same(Object.keys(c), CHANNEL_KEYS), `${c.name}: channel keys ${Object.keys(c)}`);
      assert(same(Object.keys(c.attestation), ATTESTATION_KEYS), `${c.name}: attestation keys`);
    }
  }]
];

export async function runChecks(base) {
  const results = [];
  for (const [name, fn] of CHECKS) {
    try { await fn(base); results.push({ name, ok: true }); }
    catch (e) { results.push({ name, ok: false, error: e.message }); }
  }
  return results;
}

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".woff2": "font/woff2" };

/** Serve public/ with a freshly built api/ from a temp dir, like Pages would. */
export async function startLocalServer() {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
  const apiDir = await mkdtemp(join(tmpdir(), "eq-sop-api-"));
  await buildApi(apiDir);
  const server = http.createServer(async (req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^\/+/, "");
    if (path.includes("..")) return res.writeHead(400).end();
    const file = path.startsWith("api/") ? join(apiDir, path.slice(4)) : join(root, path || "index.html");
    try {
      const body = await readFile(file);
      res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" }).end(body);
    } catch { res.writeHead(404).end("not found"); }
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => server.close() };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const arg = process.argv[2];
  const local = arg === "--local" ? await startLocalServer() : null;
  const base = (local?.url ?? arg ?? PRODUCTION_URL).replace(/\/+$/, "");
  console.log(`Checking ${base}\n`);
  const results = await runChecks(base);
  for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.ok ? "" : `: ${r.error}`}`);
  local?.close();
  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${results.length - failed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
}
