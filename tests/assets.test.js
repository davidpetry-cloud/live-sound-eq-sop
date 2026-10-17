import { describe, it, expect } from "vitest";
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { stampAssets, PAGES } from "../scripts/stamp-assets.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFile(join(ROOT, "public", p), "utf8");

// A browser can hold a page's old CSS for ten minutes after a deploy.
describe("pages survive a stale stylesheet", () => {
  it("carry a current content stamp on every CSS and JS URL", async () => {
    const stale = await stampAssets({ check: true });
    expect(stale, "run npm run build and commit the result").toEqual([]);
  });

  it("stamp every local stylesheet and script", async () => {
    for (const page of PAGES) {
      const refs = [...(await read(page)).matchAll(/\b(?:href|src)="([^"]+\.(?:css|js)(?:\?[^"]*)?)"/g)].map((m) => m[1]);
      expect(refs.length, page).toBeGreaterThan(2);
      for (const ref of refs) expect(ref, page).toMatch(/\?v=[0-9a-f]{8}$/);
    }
  });

  it("size every inline icon in the markup, so it stays small without CSS", async () => {
    for (const page of PAGES) {
      // #sim-curve is empty until the simulator draws and sizes it.
      const svgs = [...(await read(page)).matchAll(/<svg\b[^>]*>/g)].map((m) => m[0]).filter((t) => !t.includes('id="sim-curve"'));
      expect(svgs.length, page).toBeGreaterThan(3);
      for (const tag of svgs) {
        expect(tag, page).toMatch(/\swidth="[\d.]+%?"/);
        expect(tag, page).toMatch(/\sheight="[\d.]+"/);
        expect(tag, page).toContain('fill="none"');
      }
    }
  });
});
