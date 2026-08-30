import { describe, it, expect } from "vitest";
import {
  AUX_CONSOLE,
  BUSES,
  SEND_RULES,
  FX_PATCHES,
  FX_OPTIONS,
  MONITOR_RINGOUT,
  busById,
  wedgeBuses,
  allAuxRecords
} from "../src/auxes.js";
import { GROUPS, allChannels } from "../src/data.js";
import { SOURCE, STATUS, resolveStatus, isTrusted } from "attestation-ledger";

describe("console facts — the hardware wins", () => {
  it("declares all six sends with the manual's fade modes", () => {
    expect(Object.keys(AUX_CONSOLE.fade)).toEqual(["aux1","aux2","aux3","aux4","aux5","aux6"]);
    expect(AUX_CONSOLE.fade.aux1).toEqual({ mode: "pre", source: "fixed" });
    expect(AUX_CONSOLE.fade.aux2).toEqual({ mode: "pre", source: "fixed" });
    expect(AUX_CONSOLE.fade.aux3.source).toBe("switched");
    expect(AUX_CONSOLE.fade.aux4.source).toBe("switched");
    expect(AUX_CONSOLE.fade.aux5).toEqual({ mode: "post", source: "fixed" });
    expect(AUX_CONSOLE.fade.aux6).toEqual({ mode: "post", source: "fixed" });
  });

  it("never lets a bus record contradict the hardware", () => {
    for (const bus of BUSES) {
      const fact = AUX_CONSOLE.fade[bus.id];
      expect(fact, `${bus.id} is not a real send on this console`).toBeDefined();
      if (fact.source === "fixed") {
        expect(bus.fade, `${bus.id} claims a fade mode the hardware cannot do`).toBe(fact.mode);
      }
    }
  });

  it("only assigns a non-default fade where the console has a switch", () => {
    for (const bus of BUSES) {
      const fact = AUX_CONSOLE.fade[bus.id];
      if (bus.fade !== fact.mode) {
        expect(fact.source, `${bus.id} fade differs from hardware default but has no switch`).toBe("switched");
      }
    }
  });
});

describe("bus coherence", () => {
  it("gives every bus exactly one non-empty role", () => {
    for (const bus of BUSES) {
      expect(bus.role, `${bus.id} has no role`).toBeTruthy();
      expect(typeof bus.role).toBe("string");
    }
  });

  it("covers all six sends — no bus left undocumented", () => {
    expect(BUSES.map((b) => b.id).sort()).toEqual(["aux1","aux2","aux3","aux4","aux5","aux6"]);
  });

  it("runs every wedge mix pre-fade — a post-fade wedge ducks with the house", () => {
    for (const bus of wedgeBuses()) {
      expect(bus.fade, `${bus.id} is a wedge on a post-fade send`).toBe("pre");
    }
  });

  it("runs the sub feed post-fade so it follows the house mix", () => {
    expect(busById("aux6").fade).toBe("post");
  });

  it("gives every bus at least one policy line — a role with no policy is a label, not a decision", () => {
    for (const bus of BUSES) {
      expect(bus.policy.length, `${bus.id} has no policy`).toBeGreaterThan(0);
    }
  });
});

describe("send rules", () => {
  it("references a real bus on every rule", () => {
    for (const rule of SEND_RULES) {
      expect(busById(rule.bus), `rule "${rule.rule}" points at unknown bus ${rule.bus}`).not.toBeNull();
    }
  });

  it("references a real channel group on every rule", () => {
    const groupNames = GROUPS.map((g) => g.name);
    for (const rule of SEND_RULES) {
      expect(groupNames, `rule "${rule.rule}" points at unknown group ${rule.group}`).toContain(rule.group);
    }
  });

  it("states a reason on every rule — an unexplained rule cannot be argued with", () => {
    for (const rule of SEND_RULES) {
      expect(rule.why, `"${rule.rule}" gives no reason`).toBeTruthy();
    }
  });

  it("keeps vocals off the sub feed", () => {
    const vocalSub = SEND_RULES.find((r) => r.group === "Vocals" && r.bus === "aux6");
    expect(vocalSub, "the vocals-off-subs rule is missing").toBeDefined();
    expect(vocalSub.rule).toMatch(/OFF/);
  });
});

describe("FX patches", () => {
  it("sends every patch from a real bus with a stated return path", () => {
    for (const fx of FX_PATCHES) {
      expect(busById(fx.sendBus), `${fx.id} sends from unknown bus`).not.toBeNull();
      expect(fx.returnPath, `${fx.id} has no return path`).toBeTruthy();
    }
  });

  it("sends FX from a post-fade bus, so effects follow the fader", () => {
    for (const fx of FX_PATCHES) {
      expect(busById(fx.sendBus).fade, `${fx.id} sends from a pre-fade bus`).toBe("post");
    }
  });
});

describe("FX architecture — the manual's facts hold", () => {
  it("feeds single mode from aux5 and dual mode from aux5 and aux6", () => {
    expect(AUX_CONSOLE.fx.singleMode.fedFrom).toEqual(["aux5"]);
    expect(AUX_CONSOLE.fx.dualMode.engine1.fedFrom).toBe("aux5");
    expect(AUX_CONSOLE.fx.dualMode.engine2.fedFrom).toBe("aux6");
  });

  it("names the aux6 conflict — dual FX and aux-fed subs cannot coexist", () => {
    expect(AUX_CONSOLE.fx.conflict).toMatch(/Aux 6/);
    // and the current rig has aux6 as the sub feed, so single mode is implied
    expect(busById("aux6").role).toMatch(/SUB/);
  });

  it("runs at most one internal patch while the sub owns aux6", () => {
    const internalPatches = FX_PATCHES.filter((fx) => fx.sendBus === "aux5");
    expect(internalPatches.length, "two simultaneous internal patches need dual mode, which needs aux6").toBeLessThanOrEqual(1);
  });

  it("keeps every FX option honest — model-sourced, never trusted, each with gains and costs", () => {
    expect(FX_OPTIONS.length).toBeGreaterThanOrEqual(3);
    for (const opt of FX_OPTIONS) {
      expect(opt.attestation.source).toBe(SOURCE.MODEL);
      expect(isTrusted(opt)).toBe(false);
      expect(opt.gains, `${opt.id} states no gains`).toBeTruthy();
      expect(opt.costs, `${opt.id} states no costs — an option with no cost is an advertisement`).toBeTruthy();
    }
  });
});

describe("monitor ring-out — restored where it belongs", () => {
  it("applies only to wedge buses", () => {
    const wedgeIds = wedgeBuses().map((b) => b.id).sort();
    expect([...MONITOR_RINGOUT.appliesTo].sort()).toEqual(wedgeIds);
  });

  it("keeps the three-notch rule", () => {
    expect(MONITOR_RINGOUT.rule).toMatch(/three frequencies/i);
  });

  it("gives every entry a frequency, band and description", () => {
    expect(MONITOR_RINGOUT.entries.length).toBeGreaterThan(0);
    for (const row of MONITOR_RINGOUT.entries) {
      expect(row.freq).toBeTruthy();
      expect(row.band).toBeTruthy();
      expect(row.what).toBeTruthy();
    }
  });

  it("names indoor rooms as the critical case", () => {
    expect(MONITOR_RINGOUT.note).toMatch(/indoors/i);
  });
});

describe("the engine on a second domain — the invariant must hold here too", () => {
  it("never resolves a model-sourced aux record to attested", () => {
    for (const record of allAuxRecords()) {
      if (record.attestation?.source === SOURCE.MODEL) {
        expect(resolveStatus(record)).not.toBe(STATUS.ATTESTED);
        expect(isTrusted(record)).toBe(false);
      }
    }
  });

  it("names an attester, basis and date on every practitioner record", () => {
    for (const record of allAuxRecords()) {
      const a = record.attestation;
      if (a?.source === SOURCE.PRACTITIONER) {
        const id = record.id ?? record.rule ?? "ring-out";
        expect(a.by, `${id} is unsigned`).toBeTruthy();
        expect(a.basis, `${id} states no basis`).toBeTruthy();
        expect(a.verified, `${id} has no date`).toBeTruthy();
      }
    }
  });

  it("resolves the attested bus records as attested and the FX guesses as proposed", () => {
    for (const bus of BUSES) expect(resolveStatus(bus)).toBe(STATUS.ATTESTED);
    for (const fx of FX_PATCHES) expect(resolveStatus(fx)).toBe(STATUS.PROPOSED);
  });

  it("carries no placeholder text — this layer shipped finished", () => {
    for (const record of allAuxRecords()) {
      expect(/PLACEHOLDER/i.test(record.attestation?.basis ?? "")).toBe(false);
    }
  });
});

describe("scope discipline", () => {
  it("contains no per-gig level values anywhere in the layer", () => {
    // The design decision: this layer attests decisions, never levels.
    // No record may carry a dB send level — if one appears, the scope leaked.
    for (const record of allAuxRecords()) {
      const flat = JSON.stringify(record);
      expect(/"level"|"sendDb"|"db":/i.test(flat), "a per-gig level leaked into the aux layer").toBe(false);
    }
  });
});
