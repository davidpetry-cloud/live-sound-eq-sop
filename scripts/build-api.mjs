#!/usr/bin/env node
/**
 * Write the channel API as static JSON files for GitHub Pages.
 *
 * Pages serves files, not functions, so every filter combination is written
 * out ahead of time. Each file is produced by buildChannelsResponse(), the
 * tested core that once served /api/channels on Netlify, so the shape and the
 * allowlisted attestation fields are unchanged.
 *
 *   api/channels.json                     every channel
 *   api/channels/<status>.json            attested | proposed | expired | rejected
 *   api/channels/<group>.json             drums | bass-guitars | vocals | ...
 *   api/channels/<status>/<group>.json    both filters
 *   api/index.json                        lists all of the above
 *
 * Status is resolved when the files are built, so the Pages workflow rebuilds
 * daily; `generated` in every file says when. An attestation therefore lapses
 * within a day of its shelf life running out, not at the second.
 */
import { mkdir, writeFile, rm } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { buildChannelsResponse, VALID_STATUSES, VALID_GROUPS } from "../lib/channels-api.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Every file to write: [relative path, query string]. */
export function apiFiles() {
  const files = [["channels.json", ""]];
  for (const s of VALID_STATUSES) files.push([`channels/${s}.json`, `status=${s}`]);
  for (const g of VALID_GROUPS) files.push([`channels/${g}.json`, `group=${g}`]);
  for (const s of VALID_STATUSES)
    for (const g of VALID_GROUPS) files.push([`channels/${s}/${g}.json`, `status=${s}&group=${g}`]);
  return files;
}

export async function buildApi(outDir = join(ROOT, "public", "api"), now = new Date()) {
  await rm(outDir, { recursive: true, force: true });
  const generated = now.toISOString();
  for (const [path, query] of apiFiles()) {
    const res = buildChannelsResponse(`https://local/api/channels?${query}`, { now });
    if (res.status !== 200) throw new Error(`${path}: unexpected ${res.status}`);
    const body = { generated, ...(await res.json()) };
    const file = join(outDir, path);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, JSON.stringify(body, null, 2) + "\n");
  }
  // A map of the API, so a reader never has to guess a valid status or group.
  const index = {
    generated,
    about: "Read-only channel data for the Live Sound EQ SOP. Status is resolved when these files are built (daily); see `generated`.",
    statuses: VALID_STATUSES,
    groups: VALID_GROUPS,
    files: apiFiles().map(([path]) => `api/${path}`)
  };
  await writeFile(join(outDir, "index.json"), JSON.stringify(index, null, 2) + "\n");
  return apiFiles().length + 1;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const n = await buildApi();
  console.log(`Wrote ${n} API files to public/api/`);
}
