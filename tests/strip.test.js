import { describe, it, expect } from "vitest";
import { readFile, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildReference, OUT } from "../strip/tool/js_reference.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFile(join(ROOT, p), "utf8");

describe("strip simulator", () => {
  // The Dart test checks the simulator's filters against this file. If the
  // curve maths in app.js change, this fails until the file is regenerated
  // (node strip/tool/js_reference.mjs) and the Dart test is run again.
  it("has reference values that match app.js today", async () => {
    const saved = JSON.parse(await readFile(OUT, "utf8"));
    expect(saved).toEqual(JSON.parse(JSON.stringify(buildReference())));
  });

  it("ships its compiled script, so Pages needs no Dart SDK", async () => {
    const js = await stat(join(ROOT, "public", "strip.js"));
    expect(js.size).toBeGreaterThan(20_000);
    expect(js.size).toBeLessThan(400_000);
  });

  it("finds every element the Dart code looks up", async () => {
    const html = await read("public/strip.html");
    const dart = await read("strip/web/main.dart");
    const ids = [...dart.matchAll(/_(?:el|field)\('([^']+)'\)|getElementById\('([^']+)'\)/g)].map((m) => m[1] ?? m[2]);
    expect(ids.length).toBeGreaterThan(15);
    for (const id of ids) expect(html, `#${id}`).toContain(`id="${id}"`);
  });

  it("keeps the strip order, top to bottom: HPF, HF, HM, LM, LF", async () => {
    const html = await read("public/strip.html");
    const order = [...html.matchAll(/<li class="knob (\w+)">/g)].map((m) => m[1]);
    expect(order).toEqual(["hpf", "hf", "hm", "lm", "lf"]);
  });

  it("is linked from the channel list", async () => {
    expect(await read("public/index.html")).toContain('href="strip.html"');
  });
});
