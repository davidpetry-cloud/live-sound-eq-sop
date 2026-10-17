import { describe, it, expect } from "vitest";
import { mkdtemp, readFile, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildApi, apiFiles } from "../scripts/build-api.mjs";
import { buildChannelsResponse } from "../netlify/lib/channels-api.js";
import { CHECKS, runChecks, startLocalServer } from "../scripts/verify-pages.mjs";

const failing = (results) => results.filter((r) => !r.ok).map((r) => `${r.name}: ${r.error}`);

describe("static API build", () => {
  it("writes every filter combination plus an index", async () => {
    const dir = await mkdtemp(join(tmpdir(), "api-test-"));
    const n = await buildApi(dir);
    expect(n).toBe(apiFiles().length + 1);
    const index = JSON.parse(await readFile(join(dir, "index.json"), "utf8"));
    expect(index.files).toHaveLength(apiFiles().length);
    expect(await readdir(join(dir, "channels"))).toContain("attested.json");
  });

  it("matches the live handler's output, plus a generated time", async () => {
    const dir = await mkdtemp(join(tmpdir(), "api-test-"));
    const now = new Date("2026-10-17T12:00:00Z");
    await buildApi(dir, now);
    const file = JSON.parse(await readFile(join(dir, "channels", "proposed", "drums.json"), "utf8"));
    const live = await buildChannelsResponse("https://x/api/channels?status=proposed&group=drums", { now }).json();
    expect(file).toEqual({ generated: now.toISOString(), ...live });
  });

  it("resolves status at build time, so a later build sees a lapse", async () => {
    const early = await mkdtemp(join(tmpdir(), "api-test-"));
    const late = await mkdtemp(join(tmpdir(), "api-test-"));
    await buildApi(early, new Date("2026-10-17"));
    await buildApi(late, new Date("2030-01-01"));
    const count = async (d) => JSON.parse(await readFile(join(d, "channels", "expired.json"), "utf8")).count;
    expect(await count(late)).toBeGreaterThan(await count(early));
  });
});

describe("verify-pages script", () => {
  it("passes every check against a local build", async () => {
    const local = await startLocalServer();
    try {
      const results = await runChecks(local.url);
      expect(results).toHaveLength(CHECKS.length);
      expect(failing(results)).toEqual([]);
    } finally {
      local.close();
    }
  });

  it("fails when nothing is served", async () => {
    const results = await runChecks("http://127.0.0.1:9");
    expect(results.every((r) => !r.ok)).toBe(true);
  });
});
