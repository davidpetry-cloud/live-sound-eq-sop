import { describe, it, expect } from "vitest";
import http from "node:http";
import { CHECKS, runChecks, startLocalServer } from "../scripts/verify-deploy.mjs";

const failing = (results) => results.filter((r) => !r.ok).map((r) => r.name);

/** A stand-in "deploy" whose /api/channels response is whatever `respond` says. */
async function fakeDeploy(respond) {
  const server = http.createServer((req, res) => {
    if (req.url === "/") return res.writeHead(200).end("ok");
    const { status = 200, body, headers = {} } = respond(req);
    res.writeHead(status, { "content-type": "application/json", "x-content-type-options": "nosniff", ...headers });
    res.end(req.method === "HEAD" ? undefined : JSON.stringify(body));
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => server.close() };
}

describe("verify-deploy script", () => {
  it("passes every check against the real handler", async () => {
    const local = await startLocalServer();
    try {
      const results = await runChecks(local.url);
      expect(results).toHaveLength(CHECKS.length);
      expect(failing(results)).toEqual([]);
    } finally {
      local.close();
    }
  });

  it("fails when a deploy leaks ledger internals and misreports status", async () => {
    const leaky = await fakeDeploy(() => ({
      body: {
        count: 1,
        filters: { status: null, group: null },
        channels: [{
          name: "X", variant: null, group: "Drums", groupSlug: "drums", status: "attested",
          bands: {}, ttlDays: 730,
          attestation: { source: "model", by: null, role: null, basis: null, verified: null, model: "m", rationale: null, rejection: null }
        }]
      }
    }));
    try {
      const failed = failing(await runChecks(leaky.url));
      expect(failed).toContain("channel and attestation shape is stable");
      expect(failed).toContain("ledger internals do not leak");
      expect(failed).toContain("no model record is ever attested");
    } finally {
      leaky.close();
    }
  });

  it("fails when errors become 500s and non-GET is accepted", async () => {
    const broken = await fakeDeploy((req) =>
      req.url.includes("bogus") || req.url.includes("brass") || req.url.includes("status=a")
        ? { status: 500, body: { error: "boom at /Users/x/app.js:1" } }
        : { status: 200, body: { count: 0, filters: {}, channels: [] } });
    try {
      const failed = failing(await runChecks(broken.url));
      expect(failed).toContain("bad status -> 400 listing valid values");
      expect(failed).toContain("bad group -> 400 listing valid slugs");
      expect(failed).toContain("POST is refused with 405");
    } finally {
      broken.close();
    }
  });

  it("reports a check failure rather than throwing when the host is unreachable", async () => {
    const results = await runChecks("http://127.0.0.1:1");
    expect(results.every((r) => !r.ok)).toBe(true);
  });
});
