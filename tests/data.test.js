import { describe, it, expect } from "vitest";
import { CONSOLE, toHz, allChannels, channelId } from "../src/data.js";

const channels = allChannels();

describe("every channel has a complete band set", () => {
  it("defines all seven strip values", () => {
    for (const channel of channels) {
      const id = channelId(channel);
      expect(channel.bands, `${id} has no bands`).toBeDefined();
      for (const key of ["hpf", "lf", "lmF", "lmD", "hmF", "hmD", "hf"]) {
        expect(channel.bands[key], `${id} is missing ${key}`).toBeDefined();
      }
    }
  });
});

describe("gain limits", () => {
  it("keeps every dB value inside the console's plus or minus 15 dB range", () => {
    for (const channel of channels) {
      const id = channelId(channel);
      for (const band of ["lf", "lmD", "hmD", "hf"]) {
        const value = channel.bands[band];
        expect(typeof value, `${id} ${band} should be a number`).toBe("number");
        expect(
          Math.abs(value),
          `${id} ${band} is ${value} dB, outside the console range`
        ).toBeLessThanOrEqual(CONSOLE.gainLimitDb);
      }
    }
  });

  it("uses whole-dB values only — the WZ3 has no finer detent", () => {
    for (const channel of channels) {
      for (const band of ["lf", "lmD", "hmD", "hf"]) {
        expect(
          Number.isInteger(channel.bands[band]),
          `${channelId(channel)} ${band} is not a whole number`
        ).toBe(true);
      }
    }
  });
});

describe("high-pass filter", () => {
  it("only ever sets HPF to IN or OUT", () => {
    for (const channel of channels) {
      expect(
        CONSOLE.hpfValues,
        `${channelId(channel)} HPF is "${channel.bands.hpf}"`
      ).toContain(channel.bands.hpf);
    }
  });

  it("leaves the HPF out on the low-end sources named in the load-in reset", () => {
    const shouldBeOut = ["KICK", "BASS GTR", "DJ / TRACK"];
    for (const channel of channels) {
      if (shouldBeOut.includes(channel.name)) {
        expect(channel.bands.hpf, `${channelId(channel)} should have HPF out`).toBe("OUT");
      }
    }
  });
});

describe("frequencies are reachable on the console", () => {
  it("keeps LM inside its 35 Hz to 1 kHz sweep", () => {
    for (const channel of channels) {
      const hz = toHz(channel.bands.lmF);
      const id = `${channelId(channel)} LM "${channel.bands.lmF}"`;
      expect(Number.isNaN(hz), `${id} is not a readable frequency`).toBe(false);
      expect(hz, id).toBeGreaterThanOrEqual(CONSOLE.lmSweepHz.min);
      expect(hz, id).toBeLessThanOrEqual(CONSOLE.lmSweepHz.max);
    }
  });

  it("keeps HM inside its 500 Hz to 15 kHz sweep", () => {
    for (const channel of channels) {
      const hz = toHz(channel.bands.hmF);
      const id = `${channelId(channel)} HM "${channel.bands.hmF}"`;
      expect(Number.isNaN(hz), `${id} is not a readable frequency`).toBe(false);
      expect(hz, id).toBeGreaterThanOrEqual(CONSOLE.hmSweepHz.min);
      expect(hz, id).toBeLessThanOrEqual(CONSOLE.hmSweepHz.max);
    }
  });

  it("parks a band at 15 kHz with zero gain, per the SOP rule", () => {
    for (const channel of channels) {
      if (channel.bands.hmF === "park 15k") {
        expect(
          channel.bands.hmD,
          `${channelId(channel)} is parked but still has gain applied`
        ).toBe(0);
      }
    }
  });
});

describe("toHz", () => {
  it("reads hertz and kilohertz labels", () => {
    expect(toHz("350 Hz")).toBe(350);
    expect(toHz("3.5 kHz")).toBe(3500);
    expect(toHz("1 kHz")).toBe(1000);
  });

  it("treats a parked band as 15 kHz", () => {
    expect(toHz("park 15k")).toBe(15000);
  });

  it("returns NaN for anything it cannot read", () => {
    expect(Number.isNaN(toHz("loud"))).toBe(true);
  });
});
