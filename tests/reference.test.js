import { describe, it, expect } from "vitest";
import { A4_HZ, noteHz, OPEN_STRINGS, bassNotes, LOW_END_RING } from "../src/reference.js";
import { CONSOLE, GROUPS } from "../src/data.js";
import { SOURCE, STATUS, resolveStatus, isTrusted } from "attestation-ledger";

const notes = bassNotes(CONSOLE);
const row = (n) => notes.find((r) => r.note === n);

describe("bass notes — arithmetic, not opinion", () => {
  it("tunes to A4 = 440 Hz and doubles every octave", () => {
    expect(A4_HZ).toBe(440);
    expect(noteHz("A4")).toBeCloseTo(440, 10);
    expect(noteHz("A1")).toBeCloseTo(55, 10);
    expect(noteHz("A2") / noteHz("A1")).toBeCloseTo(2, 10);
  });

  it("matches published equal-temperament pitches for the open strings", () => {
    const published = { B0: 30.87, E1: 41.2, A1: 55, D2: 73.42, G2: 98 };
    for (const [n, hz] of Object.entries(published)) expect(noteHz(n), n).toBeCloseTo(hz, 1);
    expect(OPEN_STRINGS.map((s) => s.note)).toEqual(["B0", "E1", "A1", "D2", "G2"]);
  });

  it("runs chromatically from the 5-string's low B to A2 with no gaps", () => {
    expect(notes[0].note).toBe("B0");
    expect(notes.at(-1).note).toBe("A2");
    expect(notes).toHaveLength(23);
    for (let i = 1; i < notes.length; i++) {
      expect(notes[i].hz / notes[i - 1].hz, notes[i].note).toBeCloseTo(2 ** (1 / 12), 2);
    }
  });

  it("shows each frequency to 0.1 Hz of the exact pitch", () => {
    for (const r of notes) expect(Math.abs(r.hz - noteHz(r.note)), r.note).toBeLessThanOrEqual(0.05);
  });

  it("marks exactly the open strings, and only B0 as 5-string", () => {
    expect(notes.filter((r) => r.open).map((r) => r.note)).toEqual(["B0", "E1", "A1", "D2", "G2"]);
    expect(row("E1").played).toBe("Open E");
    expect(row("B0").played).toBe("Open B (5-string)");
    expect(row("C2").played).toBe("A string, fret 3");
    for (const r of notes) {
      const fret = Number(r.played.match(/fret (\d+)/)?.[1] ?? 0);
      expect(fret, r.note).toBeLessThanOrEqual(4);
    }
  });
});

describe("bass notes — the strip decides what is reachable", () => {
  it("flags the notes below the LM sweep's 35 Hz floor, and only those", () => {
    expect(CONSOLE.lmSweepHz.min).toBe(35);
    expect(notes.filter((r) => !r.lmReaches).map((r) => r.note)).toEqual(["B0", "C1", "C#1"]);
    for (const r of notes.filter((x) => x.lmReaches)) {
      expect(r.hz).toBeGreaterThanOrEqual(CONSOLE.lmSweepHz.min);
      expect(r.hz).toBeLessThanOrEqual(CONSOLE.lmSweepHz.max);
    }
  });

  it("knows the 80 Hz HPF sits above every note from the low B to D#2", () => {
    expect(notes.filter((r) => r.belowHpf).at(-1).note).toBe("D#2");
    expect(row("E2").belowHpf).toBe(false);
  });

  it("is consistent with the attested bass cards keeping the HPF out", () => {
    const bass = GROUPS.find((g) => g.name === LOW_END_RING.appliesTo);
    expect(bass, "the group the finder rides under").toBeTruthy();
    for (const ch of bass.channels.filter((c) => c.name === "BASS GTR")) expect(ch.bands.hpf).toBe("OUT");
  });
});

describe("bass note finder — a model's procedure stays proposed", () => {
  it("is model-sourced, unsigned and resolves to proposed", () => {
    expect(LOW_END_RING.attestation.source).toBe(SOURCE.MODEL);
    expect(LOW_END_RING.attestation.by).toBeNull();
    expect(LOW_END_RING.attestation.rationale.length).toBeGreaterThan(40);
    expect(resolveStatus(LOW_END_RING)).toBe(STATUS.PROPOSED);
    expect(isTrusted(LOW_END_RING)).toBe(false);
  });

  it("cannot be promoted by smuggling in a practitioner's fields", () => {
    const smuggled = {
      ...LOW_END_RING,
      attestation: { ...LOW_END_RING.attestation, by: "David Petry", verified: "2026-11-13", ttlDays: 730, basis: "looks real" }
    };
    expect(resolveStatus(smuggled)).not.toBe(STATUS.ATTESTED);
  });

  it("keeps every cut it suggests inside the strip's ±15 dB", () => {
    const cuts = LOW_END_RING.steps.join(" ").match(/[−-]\d+ dB/g).map((d) => Math.abs(parseInt(d.replace("−", "-"), 10)));
    expect(cuts.length).toBeGreaterThan(0);
    for (const c of cuts) expect(c).toBeLessThanOrEqual(CONSOLE.gainLimitDb);
  });
});
