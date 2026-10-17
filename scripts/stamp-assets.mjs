#!/usr/bin/env node
/**
 * Stamp the pages' own CSS, JS and font URLs with a hash of each file's content.
 *
 *   <link rel="stylesheet" href="app.css?v=1a2b3c4d">
 *   import { GROUPS } from "./src/data.js?v=5e6f7a8b";
 *   src: url(./outfit-300-700-latin.woff2?v=9c0d1e2f)
 *
 * GitHub Pages serves every file with max-age=600, so for ten minutes after a
 * deploy a browser can pair the new HTML with the old CSS (that is how the
 * masthead button's icon once showed 976px wide). A new URL for every changed
 * file means a page only ever loads the files it was written for.
 *
 * The stamp is the file's content, not the commit, so building twice writes
 * the same bytes and the committed pages stay current; npm test fails if they
 * are not. app.js and fonts.css are stamped before the pages, because their own
 * hashes include the stamps inside them. A font's preload in the page and its
 * url() in fonts.css get the same stamp, so the font still downloads once.
 */
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
export const PAGES = ["index.html", "strip.html"];

/** app.js imports these; the build copies them into public/ from here. */
const MODULE_SOURCES = {
  "./src/data.js": "src/data.js",
  "./src/auxes.js": "src/auxes.js",
  "./vendor/attestation-ledger/index.js": "node_modules/attestation-ledger/src/index.js"
};

const STAMP = "(?:\\?v=[0-9a-f]+)?";
// Each pattern captures: what comes before the URL, the URL, what closes it.
const IMPORT = new RegExp(`(from\\s+")(\\.[^"?]+)${STAMP}(")`, "g");
const FONT = new RegExp(`(url\\()(\\./[^)?]+\\.woff2)${STAMP}(\\))`, "g");
// Local .css, .js and .woff2 in href or src; icons and other sites are left alone.
const ASSET = new RegExp(`(\\b(?:href|src)=")((?![a-z]+:|/)[^"?]+\\.(?:css|js|woff2))${STAMP}(")`, "g");

const hash = (text) => createHash("sha256").update(text).digest("hex").slice(0, 8);

async function stampWith(text, pattern, sourceOf, fresh = {}) {
  const hashOf = async (path) => hash(fresh[path] ?? await readFile(join(ROOT, path)));
  const swaps = [];
  for (const m of text.matchAll(pattern)) {
    const source = sourceOf(m[2]);
    if (!source) throw new Error(`no source known for "${m[2]}"; add it to MODULE_SOURCES`);
    swaps.push([m[0], `${m[1]}${m[2]}?v=${await hashOf(source)}${m[3]}`]);
  }
  for (const [from, to] of swaps) text = text.replace(from, to);
  return text;
}

/** Returns the files whose stamps were out of date; writes them unless check is set. */
export async function stampAssets({ check = false } = {}) {
  const stale = [];
  const update = async (file, next) => {
    const path = join(PUBLIC, file);
    if ((await readFile(path, "utf8")) === next) return;
    stale.push(`public/${file}`);
    if (!check) await writeFile(path, next);
  };

  const appJs = await stampWith(await readFile(join(PUBLIC, "app.js"), "utf8"), IMPORT, (spec) => MODULE_SOURCES[spec]);
  await update("app.js", appJs);

  const fontsCss = await stampWith(await readFile(join(PUBLIC, "fonts", "fonts.css"), "utf8"), FONT, (p) => `public/fonts/${p.slice(2)}`);
  await update("fonts/fonts.css", fontsCss);

  // Hash these as they should be, which in check mode may not be what is on disk.
  const fresh = { "public/app.js": appJs, "public/fonts/fonts.css": fontsCss };
  for (const page of PAGES) {
    await update(page, await stampWith(await readFile(join(PUBLIC, page), "utf8"), ASSET, (p) => `public/${p}`, fresh));
  }
  return stale;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const stale = await stampAssets();
  console.log(stale.length ? `Stamped ${stale.join(", ")}` : "Asset stamps already current");
}
