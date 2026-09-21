import { describe, it, expect } from "vitest";
import { GROUPS } from "../src/data.js";
import { propose, attest, reject } from "attestation-ledger";
import {
  buildChannelsResponse,
  handleRequest,
  slugify,
  VALID_STATUSES,
  VALID_GROUPS
} from "../netlify/lib/channels-api.js";
import handler, { config } from "../netlify/functions/channels.js";

const NOW = new Date("2026-09-01T00:00:00Z");
const bands = { hpf: "IN", lf: 0, lmF: "350 Hz", lmD: -3, hmF: "4 kHz", hmD: 2, hf: 0 };
const named = (name, record) => ({ name, variant: null, pad: null, ...record });

const proposal = propose(bands, { model: "test-model", rationale: "because" });
const FIXTURE = [
  {
    name: "Drums",
    channels: [
      named("KICK", attest({ bands }, { by: "A. Tech", basis: "Ten years", verified: "2026-08-01" })),
      named("SNARE", proposal),
      named("OLD", attest({ bands }, { by: "A. Tech", basis: "Long ago", verified: "2020-01-01" }))
    ]
  },
  {
    name: "Bass & guitars",
    channels: [
      named("BASS", reject(proposal, { by: "A. Tech", reason: "Muddy", reviewed: "2026-08-02" }))
    ]
  }
];

const call = async (qs = "", options = { groups: FIXTURE, now: NOW }) => {
  const res = buildChannelsResponse(`https://x.test/api/channels${qs}`, options);
  return { res, body: await res.json() };
};
const names = (body) => body.channels.map((c) => c.name);

describe("status filter", () => {
  it.each([
    ["attested", ["KICK"]],
    ["proposed", ["SNARE"]],
    ["expired", ["OLD"]],
    ["rejected", ["BASS"]]
  ])("?status=%s returns only %s", async (status, expected) => {
    const { res, body } = await call(`?status=${status}`);
    expect(res.status).toBe(200);
    expect(names(body)).toEqual(expected);
    expect(body.channels.every((c) => c.status === status)).toBe(true);
    expect(body.count).toBe(expected.length);
  });

  it("is case-insensitive", async () => {
    expect(names((await call("?status=ATTESTED")).body)).toEqual(["KICK"]);
  });

  it("covers every status the ledger defines", () => {
    expect(VALID_STATUSES.sort()).toEqual(["attested", "expired", "proposed", "rejected"]);
  });

  it("never reports a model-sourced record as attested", async () => {
    const { body } = await call("?status=attested");
    expect(body.channels.every((c) => c.attestation.source !== "model")).toBe(true);
  });
});

describe("group filter and no params", () => {
  it("filters by group slug", async () => {
    expect(names((await call("?group=drums")).body)).toEqual(["KICK", "SNARE", "OLD"]);
    expect(names((await call("?group=bass-guitars")).body)).toEqual(["BASS"]);
  });

  it("ANDs group with status", async () => {
    expect(names((await call("?group=drums&status=proposed")).body)).toEqual(["SNARE"]);
    expect((await call("?group=drums&status=rejected")).body.count).toBe(0);
  });

  it("returns everything, each flagged, with no params", async () => {
    const { body } = await call();
    expect(names(body)).toEqual(["KICK", "SNARE", "OLD", "BASS"]);
    expect(body.filters).toEqual({ status: null, group: null });
  });

  it("slugs every real group", () => {
    expect(VALID_GROUPS).toEqual(GROUPS.map((g) => slugify(g.name)));
    expect(VALID_GROUPS).toContain("bass-guitars");
    expect(VALID_GROUPS).toContain("keys-synths-horns");
  });
});

describe("failing gracefully", () => {
  it("rejects a bad status with 400 and the valid values, not a 500", async () => {
    const { res, body } = await call("?status=approved");
    expect(res.status).toBe(400);
    expect(body.validStatuses).toEqual(VALID_STATUSES);
    expect(body.channels).toBeUndefined();
  });

  it("rejects a bad group with 400 and the valid slugs", async () => {
    const { res, body } = await call("?group=brass");
    expect(res.status).toBe(400);
    expect(body.validGroups).toEqual(["drums", "bass-guitars"]);
  });

  it("rejects a repeated param with 400 instead of silently picking one", async () => {
    for (const qs of ["?status=attested&status=bogus", "?group=drums&group=vocals"]) {
      const { res, body } = await call(qs);
      expect(res.status).toBe(400);
      expect(body.error).toMatch(/only once/);
      expect(body.channels).toBeUndefined();
    }
  });

  it("does not echo unbounded input back in errors", async () => {
    const long = "a".repeat(8000);
    for (const p of ["status", "group"]) {
      const res = buildChannelsResponse(`https://x.test/api/channels?${p}=${long}`, { groups: FIXTURE, now: NOW });
      expect(res.status).toBe(400);
      expect((await res.text()).length).toBeLessThan(600);
    }
  });

  it("answers non-GET with 405 and an Allow header", () => {
    const res = handleRequest(new Request("https://x.test/api/channels", { method: "POST" }));
    expect(res.status).toBe(405);
    expect(res.headers.get("allow")).toMatch(/GET/);
  });

  it("turns an unexpected throw into JSON 500, not a crash", async () => {
    const res = handleRequest(new Request("https://x.test/api/channels"), { groups: null });
    expect(res.status).toBe(500);
    expect((await res.json()).error).toBeTruthy();
  });
});

describe("response shape is stable", () => {
  it("has exactly these keys", async () => {
    const { res, body } = await call();
    expect(res.headers.get("content-type")).toMatch(/application\/json/);
    expect(Object.keys(body)).toEqual(["count", "filters", "channels"]);
    for (const c of body.channels) {
      expect(Object.keys(c)).toEqual([
        "name", "variant", "group", "groupSlug", "status", "bands", "attestation"
      ]);
      expect(Object.keys(c.attestation)).toEqual([
        "source", "by", "role", "basis", "verified", "model", "rationale", "rejection"
      ]);
    }
    expect(Object.keys(body.channels[0].bands)).toEqual(Object.keys(bands));
  });

  it("does not leak ledger internals", async () => {
    const text = JSON.stringify((await call()).body);
    expect(text).not.toMatch(/ttlDays|supersedes/);
  });

  it("carries rejection detail only on rejected records", async () => {
    const { body } = await call();
    const bass = body.channels.find((c) => c.name === "BASS");
    expect(Object.keys(bass.attestation.rejection)).toEqual(["by", "reason", "reviewed"]);
    expect(body.channels.filter((c) => c.attestation.rejection).length).toBe(1);
  });
});

describe("against the real data", () => {
  it("statuses partition the full set", async () => {
    const all = (await call("", { now: NOW })).body.count;
    let sum = 0;
    for (const s of VALID_STATUSES) sum += (await call(`?status=${s}`, { now: NOW })).body.count;
    expect(sum).toBe(all);
    expect(all).toBeGreaterThan(0);
  });

  it("is wired at /api/channels", async () => {
    expect(config.path).toBe("/api/channels");
    const res = await handler(new Request("https://x.test/api/channels?group=drums"));
    expect(res.status).toBe(200);
    expect((await res.json()).channels.every((c) => c.groupSlug === "drums")).toBe(true);
  });
});
