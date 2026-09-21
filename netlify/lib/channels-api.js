/**
 * Read-only JSON view of the channel data.
 *
 * Status is never stored or re-derived here: it comes from the ledger's
 * resolveStatus(), so a model record can never surface as attested. The
 * attestation block is built from an allowlist so ledger internals
 * (ttlDays, supersedes, and anything added later) cannot leak out.
 */
import { GROUPS } from "../../src/data.js";
import { STATUS, resolveStatus } from "attestation-ledger";

export const VALID_STATUSES = Object.values(STATUS);

export function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const VALID_GROUPS = GROUPS.map((g) => slugify(g.name));

const HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "access-control-allow-origin": "*",
  "cache-control": "public, max-age=60"
};

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { ...HEADERS, ...extra }
  });
}

const MAX_ECHO = 64;

/** Quote a caller's value in an error message without echoing unbounded input. */
function echo(value) {
  return value.length > MAX_ECHO ? `${value.slice(0, MAX_ECHO)}…` : value;
}

function shapeAttestation(a = {}) {
  const r = a.rejection;
  return {
    source: a.source ?? null,
    by: a.by ?? null,
    role: a.role ?? null,
    basis: a.basis ?? null,
    verified: a.verified ?? null,
    model: a.model ?? null,
    rationale: a.rationale ?? null,
    rejection: r
      ? { by: r.by ?? null, reason: r.reason ?? null, reviewed: r.reviewed ?? null }
      : null
  };
}

function shapeChannel(channel, group, now) {
  return {
    name: channel.name,
    variant: channel.variant ?? null,
    group: group.name,
    groupSlug: slugify(group.name),
    status: resolveStatus(channel, now),
    bands: { ...channel.bands },
    attestation: shapeAttestation(channel.attestation)
  };
}

/** Pure core: a URL in, a Response out. Groups and clock are injectable. */
export function buildChannelsResponse(url, { groups = GROUPS, now = new Date() } = {}) {
  const params = new URL(url).searchParams;

  // A repeated param is ambiguous. Refuse it rather than silently pick one.
  for (const name of ["status", "group"]) {
    if (params.getAll(name).length > 1) {
      return json({ error: `Parameter "${name}" may be given only once.` }, 400);
    }
  }
  const status = params.get("status")?.trim().toLowerCase() || null;
  const group = params.get("group")?.trim().toLowerCase() || null;

  if (status && !VALID_STATUSES.includes(status)) {
    return json(
      { error: `Invalid status "${echo(params.get("status"))}".`, validStatuses: VALID_STATUSES },
      400
    );
  }
  const validGroups = groups.map((g) => slugify(g.name));
  if (group && !validGroups.includes(group)) {
    return json(
      { error: `Invalid group "${echo(params.get("group"))}".`, validGroups },
      400
    );
  }

  const channels = groups
    .filter((g) => !group || slugify(g.name) === group)
    .flatMap((g) => g.channels.map((c) => shapeChannel(c, g, now)))
    .filter((c) => !status || c.status === status);

  return json({ count: channels.length, filters: { status, group }, channels });
}

export function handleRequest(request, options) {
  try {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return json({ error: "Method not allowed. Use GET." }, 405, { allow: "GET, HEAD" });
    }
    return buildChannelsResponse(request.url, options);
  } catch {
    return json({ error: "Internal error." }, 500);
  }
}
