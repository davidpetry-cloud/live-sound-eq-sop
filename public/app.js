import { GROUPS, allChannels, channelId, toHz, CONSOLE } from "./src/data.js?v=614366e4";
import { resolveStatus, daysRemaining, STATUS, SOURCE, tally } from "./vendor/attestation-ledger/index.js?v=0e508f28";
import { AUX_CONSOLE, BUSES, SEND_RULES, FX_OPTIONS, MONITOR_RINGOUT } from "./src/auxes.js?v=fefcd75d";

/* ---------- Shared vocabulary: one name, one shape, one colour per state ---------- */
const ORDER = ["attested", "proposed", "expired", "rejected"];
const LABEL = { attested: "Attested", proposed: "Proposed", expired: "Lapsed", rejected: "Rejected" };
const BLURB = {
  attested: "Signed and current", proposed: "Awaiting a practitioner",
  expired: "Needs re-checking", rejected: "Reviewed and turned down"
};
const EDGE = { attested: "var(--att)", proposed: "var(--prop)", expired: "var(--exp)", rejected: "var(--rej)" };
const ICON = {
  attested: '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.2 3.2L13 5"/></svg>',
  proposed: '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.6" y="3.6" width="8.8" height="8.8" rx="1.4" transform="rotate(45 8 8)"/></svg>',
  expired: '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="8" cy="8" r="5.6"/><path d="M8 4.8V8.4M8 11h.01"/></svg>',
  rejected: '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4.4 4.4l7.2 7.2M11.6 4.4l-7.2 7.2"/></svg>'
};
const CHEV = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>';
const WARN = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.5 18 17H2z"/><path d="M10 8v4M10 14.6h.01"/></svg>';

const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
/* A gain is a number, or a range written as text ("−2 dB to +2 dB"). */
const ends = v => typeof v === "number" ? [v, v]
  : (String(v).match(/[−+-]?\d+(\.\d+)?/g) || ["0"]).map(x => parseFloat(x.replace("−", "-")));
const at = (b, i) => ({ ...b, lf: ends(b.lf)[i], lmD: ends(b.lmD)[i], hmD: ends(b.hmD)[i], hf: ends(b.hf)[i] });
const isRange = b => ["lf", "lmD", "hmD", "hf"].some(k => typeof b[k] !== "number");
const db = n => typeof n !== "number" ? String(n).replace(/-/g, "−") : n > 0 ? `+${n} dB` : n === 0 ? "0 dB" : `−${Math.abs(n)} dB`;
const mark = (status, cls = "") =>
  `<span class="mark ${cls}" style="--edge:${EDGE[status]}">${ICON[status]}${LABEL[status]}</span>`;

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
function transition(fn) {
  if (document.startViewTransition && !reduceMotion.matches) document.startViewTransition(fn);
  else fn();
}

/* ---------- EQ curve: the strip's response, drawn from the console's own filters ----------
   RBJ cookbook biquads at 96 kHz. HPF 80 Hz 12 dB/oct; shelves at 80 Hz and
   12 kHz; LM and HM peaks at Q 1.8 (all from CONSOLE in data.js). A sketch
   for reading shape at a glance; the numbers beside it are the instruction. */
const FS = 96000, W = 220, H = 64, F_LO = 20, F_HI = 20000, DB_SPAN = 16;
const xOf = f => Math.log10(f / F_LO) / Math.log10(F_HI / F_LO) * W;
const yOf = d => H / 2 - Math.max(-DB_SPAN, Math.min(DB_SPAN, d)) * (H / 2 - 3) / DB_SPAN;

function biquad(type, f0, gain = 0, Q = 0.7071) {
  const A = 10 ** (gain / 40), w0 = 2 * Math.PI * f0 / FS, c = Math.cos(w0), s = Math.sin(w0);
  const al = type === "peak" || type === "hp" ? s / (2 * Q) : s / 2 * Math.SQRT2, rA = 2 * Math.sqrt(A) * al;
  switch (type) {
    case "hp": return [[(1 + c) / 2, -(1 + c), (1 + c) / 2], [1 + al, -2 * c, 1 - al]];
    case "peak": return [[1 + al * A, -2 * c, 1 - al * A], [1 + al / A, -2 * c, 1 - al / A]];
    case "low": return [[A * ((A + 1) - (A - 1) * c + rA), 2 * A * ((A - 1) - (A + 1) * c), A * ((A + 1) - (A - 1) * c - rA)],
                        [(A + 1) + (A - 1) * c + rA, -2 * ((A - 1) + (A + 1) * c), (A + 1) + (A - 1) * c - rA]];
    case "high": return [[A * ((A + 1) + (A - 1) * c + rA), -2 * A * ((A - 1) + (A + 1) * c), A * ((A + 1) + (A - 1) * c - rA)],
                         [(A + 1) - (A - 1) * c + rA, 2 * ((A - 1) - (A + 1) * c), (A + 1) - (A - 1) * c - rA]];
  }
}
function magDb([b, a], f) {
  const w = 2 * Math.PI * f / FS, c1 = Math.cos(w), c2 = Math.cos(2 * w), s1 = Math.sin(w), s2 = Math.sin(2 * w);
  const nr = b[0] + b[1] * c1 + b[2] * c2, ni = b[1] * s1 + b[2] * s2;
  const dr = a[0] + a[1] * c1 + a[2] * c2, di = a[1] * s1 + a[2] * s2;
  return 10 * Math.log10((nr * nr + ni * ni) / (dr * dr + di * di));
}

function filtersFor(b) {
  const out = [];
  const lmHz = toHz(b.lmF), hmHz = toHz(b.hmF);
  if (b.hpf === "IN") out.push(biquad("hp", CONSOLE.hpfHz));
  if (b.lf) out.push(biquad("low", 80, b.lf));
  if (b.lmD && lmHz) out.push(biquad("peak", lmHz, b.lmD, 1.8));
  if (b.hmD && hmHz) out.push(biquad("peak", hmHz, b.hmD, 1.8));
  if (b.hf) out.push(biquad("high", 12000, b.hf));
  return out;
}

function responseOf(b) {
  const fl = filtersFor(b);
  return f => fl.reduce((sum, q) => sum + magDb(q, f), 0);
}
function pathOf(resp) {
  const pts = [];
  for (let i = 0; i <= 110; i++) {
    const f = F_LO * (F_HI / F_LO) ** (i / 110);
    pts.push(`${xOf(f).toFixed(1)},${yOf(resp(f)).toFixed(1)}`);
  }
  return "M" + pts.join("L");
}
/* Where a record gives a range, the solid line is the low end and the faint
   line the high end. */
function curve(raw, status) {
  const b = at(raw, 0);
  const resp = responseOf(b);
  const line = pathOf(resp);
  const alt = isRange(raw) ? `<path class="line alt" d="${pathOf(responseOf(at(raw, 1)))}"/>` : "";
  const area = `${line}L${W},${H / 2}L0,${H / 2}Z`;
  const dots = [];
  const dot = (cls, f) => dots.push(`<circle class="dot ${cls}" cx="${xOf(f).toFixed(1)}" cy="${yOf(resp(f)).toFixed(1)}" r="3.2"/>`);
  if (b.hpf === "IN") dot("hpf", CONSOLE.hpfHz);
  if (b.hf) dot("hf", 12000);
  if (b.hmD && toHz(b.hmF)) dot("hm", toHz(b.hmF));
  if (b.lmD && toHz(b.lmF)) dot("lm", toHz(b.lmF));
  if (b.lf) dot("lf", 50);
  const grid = [100, 1000, 10000].map(f => `<line class="grid" x1="${xOf(f)}" x2="${xOf(f)}" y1="4" y2="${H - 4}"/>`).join("");
  const dashed = status === "proposed" || status === "rejected" ? " dashed" : "";
  return `<svg class="curve${dashed}" viewBox="0 0 ${W} ${H}" aria-hidden="true" focusable="false">${grid}
    <line class="zero" x1="0" x2="${W}" y1="${H / 2}" y2="${H / 2}"/>
    <path class="area" d="${area}"/>${alt}<path class="line" d="${line}"/>${dots.join("")}</svg>`;
}

/* Strip order, top to bottom of the WZ3 channel: HPF, HF, HM, LM, LF.
   Numbers are the thing read at the desk, so they get the weight; the unit
   is set smaller beside them and words like "Shelf" stay quiet. */
const num = (text, quiet = false) =>
  `<span class="num${quiet ? " quiet" : ""}">${esc(text).replace(/\s?(kHz|Hz|dB)\b/g, '<span class="u">\u2009$1</span>')}</span>`;
const word = text => `<span class="w">${text}</span>`;
/* HPF is an in/out push switch on the strip, so its state reads like one:
   lit and raised when IN, unlit and recessed when OUT. It is a reading,
   not a control, so it gets no pointer or hover. */
const sw = on => `<span class="sw ${on ? "on" : "off"}"><span class="led" aria-hidden="true"></span>${on ? "IN" : "OUT"}</span>`;
function bandCells(b) {
  const cell = (cls, lbl, top, bottom) => `<li class="band ${cls}"><span class="lbl">${lbl}</span>${top}${bottom}</li>`;
  const sweep = (cls, lbl, F, D) => D === 0 || toHz(F) == null
    ? cell(cls, lbl, word("Flat"), num("0 dB", true))
    : cell(cls, lbl, num(F), num(db(D)));
  const shelf = (cls, lbl, D) => D === 0 && typeof D === "number"
    ? cell(cls, lbl, word("Flat"), num("0 dB", true))
    : cell(cls, lbl, word("Shelf"), num(db(D)));
  return `<ul class="bands" aria-label="EQ, in strip order">
    ${b.hpf === "IN" ? cell("hpf", "HPF", sw(true), num(`${CONSOLE.hpfHz} Hz`)) : cell("hpf", "HPF", sw(false), "")}
    ${shelf("hf", "HF", b.hf)}
    ${sweep("hm", "HM", b.hmF, b.hmD)}
    ${sweep("lm", "LM", b.lmF, b.lmD)}
    ${shelf("lf", "LF", b.lf)}
  </ul>`;
}

/* ---------- Provenance: who said so, and on what grounds ---------- */
function provenance(ch, status) {
  const a = ch.attestation;
  const note = (title, icon, text) => `<div class="note"><b>${icon}${title}</b><p>${text}</p></div>`;
  if (status === STATUS.REJECTED) {
    const r = a.rejection;
    const origin = a.source === SOURCE.MODEL
      ? `<dt>Proposed by</dt><dd>${esc(a.model)}</dd><dt>Reasoning</dt><dd>${esc(a.rationale)}</dd>`
      : `<dt>Asserted by</dt><dd>${esc(a.by ?? "—")}</dd>`;
    return `<dl>${origin}
      <dt>Rejected by</dt><dd>${esc(r.by)}${r.role ? ` · ${esc(r.role)}` : ""}</dd>
      <dt>Why</dt><dd>${esc(r.reason)}</dd>
      <dt>Reviewed</dt><dd>${esc(r.reviewed)}</dd></dl>` +
      note("Turned down", ICON.rejected, "A practitioner reviewed these values and rejected them. They are kept, not deleted, because knowing somebody tried this and found it wrong is worth more than a gap. Do not work from them.");
  }
  if (a.source === SOURCE.MODEL) {
    return `<dl>
      <dt>Proposed by</dt><dd>${esc(a.model)}</dd>
      <dt>Reasoning</dt><dd>${esc(a.rationale)}</dd>
      <dt>Ratified by</dt><dd class="none">Nobody yet</dd></dl>` +
      note("Not verified", ICON.proposed, "A model produced these values. No practitioner has confirmed them at a console. Treat them as a hypothesis to test at soundcheck, not a starting point to dial in blind.");
  }
  const left = daysRemaining(ch);
  const lapsed = status === STATUS.EXPIRED;
  return `<dl>
    <dt>Attested by</dt><dd>${esc(a.by)}${a.role ? ` · ${esc(a.role)}` : ""}</dd>
    <dt>Grounded in</dt><dd>${esc(a.basis)}</dd>
    <dt>Verified</dt><dd>${esc(a.verified)} · ${lapsed ? `lapsed ${Math.abs(left)} days ago` : `${left} days remaining`}</dd></dl>` +
    (lapsed ? note("Attestation lapsed", ICON.expired, "This was signed, but its shelf life has run out. Re-check it in a room before working from it, then re-sign it with today's date.") : "");
}

/* ---------- Channels view ---------- */
const state = { filter: "all", query: "", open: new Set(), allOpen: false };
const list = document.getElementById("list");
const resultEl = document.getElementById("result");
const toggleAllBtn = document.getElementById("toggleAll");
const TOTAL = allChannels().length;

function matches(ch, group, status) {
  if (state.filter !== "all" && status !== state.filter) return false;
  if (!state.query) return true;
  return `${channelId(ch)} ${group.name}`.toLowerCase().includes(state.query);
}

function cardHTML(ch, status, id, idx) {
  const open = state.open.has(id);
  const pid = `prov-${idx}`;
  const pad = ch.pad
    ? `<span class="pad"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 5h12M2 11h12"/><path d="M8 2v12"/></svg>PAD \u00b7 ${esc(ch.pad)}</span>`
    : "";
  const mic = ch.mic ? `<div class="note mic"><b>Mic · cheap option</b><p>${esc(ch.mic.cheap)}</p><p>${esc(ch.mic.note)}</p></div>` : "";
  return `<article class="card ${status}" style="--edge:${EDGE[status]}" data-id="${esc(id)}">
    <button class="card-head" type="button" aria-expanded="${open}" aria-controls="${pid}">
      <span class="nm">${esc(ch.name)}${ch.variant ? ` <span class="var">· ${esc(ch.variant)}</span>` : ""}${pad}</span>
      <span class="head-r">${mark(status)}<span class="chev">${CHEV}</span></span>
    </button>
    <div class="strip">${curve(ch.bands, status)}${bandCells(ch.bands)}</div>
    <div class="prov" id="${pid}"${open ? "" : " hidden"}>${provenance(ch, status)}${mic}</div>
  </article>`;
}

function render() {
  let html = "", shown = 0, idx = 0;
  for (const group of GROUPS) {
    const rows = group.channels.map(ch => ({ ch, status: resolveStatus(ch) }))
      .filter(({ ch, status }) => matches(ch, group, status));
    idx += group.channels.length;
    if (!rows.length) continue;
    shown += rows.length;
    const hid = `g-${group.name.toLowerCase().replace(/[^a-z]+/g, "-")}`;
    html += `<section class="group" aria-labelledby="${hid}"><h2 class="group-h" id="${hid}">${esc(group.name)} <small>${rows.length} ${rows.length === 1 ? "channel" : "channels"}</small></h2>`;
    html += rows.map(({ ch, status }, i) => cardHTML(ch, status, channelId(ch), `${hid}-${i}`)).join("");
    html += `</section>`;
  }
  if (!shown) {
    html = `<div class="empty"><p>No channel matches${state.query ? ` “${esc(state.query)}”` : ""}${state.filter !== "all" ? ` in ${LABEL[state.filter].toLowerCase()}` : ""}.</p>
      <button class="ghost" type="button" id="clearAll">Show all channels</button></div>`;
  }
  list.innerHTML = html;
  document.getElementById("clearAll")?.addEventListener("click", () => {
    state.filter = "all"; state.query = ""; document.getElementById("q").value = "";
    syncFilters(); render(); document.getElementById("q").focus();
  });
  announce(shown);
}

let announceTimer;
function announce(shown) {
  const what = state.filter === "all" ? "" : ` ${LABEL[state.filter].toLowerCase()}`;
  const text = state.query
    ? `${shown} of ${TOTAL} channels match “${state.query}”${what ? ` and are${what}` : ""}.`
    : state.filter === "all" ? `Showing all ${TOTAL} channels.` : `Showing ${shown}${what} ${shown === 1 ? "channel" : "channels"} of ${TOTAL}.`;
  clearTimeout(announceTimer);
  announceTimer = setTimeout(() => { resultEl.textContent = text; }, state.query ? 400 : 0);
}

list.addEventListener("click", e => {
  const head = e.target.closest(".card-head");
  if (!head) return;
  const card = head.closest(".card"), prov = card.querySelector(".prov");
  const open = head.getAttribute("aria-expanded") !== "true";
  head.setAttribute("aria-expanded", String(open));
  prov.hidden = !open;
  if (open) state.open.add(card.dataset.id); else state.open.delete(card.dataset.id);
});

toggleAllBtn.addEventListener("click", () => {
  state.allOpen = !state.allOpen;
  state.open = state.allOpen ? new Set(allChannels().map(channelId)) : new Set();
  toggleAllBtn.setAttribute("aria-pressed", String(state.allOpen));
  toggleAllBtn.textContent = state.allOpen ? "Close all details" : "Open all details";
  render();
});

function renderFilters() {
  const c = tally(allChannels());
  const tile = (key, n, name, blurb, color, icon = "") =>
    `<button class="tile" type="button" data-f="${key}" aria-pressed="${state.filter === key}" style="--c:${color}">
      <b>${n}</b><span class="t-name">${icon}${name}</span><span class="t-blurb">${blurb}</span></button>`;
  document.getElementById("filters").innerHTML =
    tile("all", TOTAL, "All", "Every channel", "var(--text)") +
    ORDER.map(k => tile(k, c[k], LABEL[k], BLURB[k], EDGE[k], ICON[k])).join("");
}
/* Update the pressed state in place so keyboard focus stays on the tile. */
function syncFilters() {
  document.querySelectorAll("[data-f]").forEach(t => t.setAttribute("aria-pressed", String(t.dataset.f === state.filter)));
}
document.getElementById("filters").addEventListener("click", e => {
  const t = e.target.closest("[data-f]");
  if (!t) return;
  const f = t.dataset.f;
  state.filter = state.filter === f && f !== "all" ? "all" : f;
  transition(() => { syncFilters(); render(); });
});

document.getElementById("q").addEventListener("input", e => {
  state.query = e.target.value.trim().toLowerCase(); render();
});

/* ---------- Aux & effects view ---------- */
function whoSays(rec) {
  const a = rec.attestation, status = resolveStatus(rec);
  const body = a.source === SOURCE.MODEL
    ? `Proposed by ${esc(a.model)}. ${esc(a.rationale)} <em>Nobody has ratified it yet.</em>`
    : `${esc(a.by)}${a.role ? `, ${esc(a.role)}` : ""}, verified ${esc(a.verified)}. ${esc(a.basis)}`;
  return `<details class="why"><summary>${status === "proposed" ? "Why this was proposed" : "Who says so"}</summary><p>${body}</p></details>`;
}

function policyItem(p) {
  const m = p.match(/^STANDING DECISION:\s*(.*)$/s);
  return m ? `<li><span class="standing">Standing decision</span>${esc(m[1][0].toUpperCase() + m[1].slice(1))}</li>` : `<li>${esc(p)}</li>`;
}

function renderAuxPanel() {
  const fx = AUX_CONSOLE.fx;
  const buses = BUSES.map(bus => {
    const s = resolveStatus(bus);
    return `<article class="panel" style="--edge:${EDGE[s]}">
      <div class="panel-top"><div><p class="bus-id">${esc(bus.id.replace(/(\d)/, " $1"))}</p><h3 class="bus-role">${esc(bus.role)}</h3></div>${mark(s, "sm")}</div>
      <p class="tags"><span class="tag ${bus.fade}">${bus.fade === "pre" ? "Pre-fade" : "Post-fade"}</span><span class="tag">${esc(bus.feeds)}</span></p>
      <ul class="policy">${bus.policy.map(policyItem).join("")}</ul>
      ${whoSays(bus)}
    </article>`;
  }).join("");

  const rules = SEND_RULES.map(r => {
    const off = /OFF/.test(r.rule);
    const icon = off ? ICON.rejected : ICON.attested;
    return `<div class="rule">
      <div class="rule-group">${esc(r.group)}</div>
      <div class="verdict ${off ? "off" : "on"}">${icon}${esc(r.rule.split("—")[0].trim())}</div>
      <div class="rule-why">${esc(r.why)}</div>
      ${mark(resolveStatus(r), "sm")}
    </div>`;
  }).join("");

  const ring = MONITOR_RINGOUT, rs = resolveStatus(ring);
  const ringHTML = `<article class="panel" style="--edge:${EDGE[rs]}">
    <div class="panel-top"><p class="section-sub">${esc(ring.note)}</p>${mark(rs, "sm")}</div>
    <div class="note" style="--c:var(--exp)"><b>${WARN.replace('viewBox', 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" viewBox')}Rule</b><p>${esc(ring.rule)}</p></div>
    <table class="ring">
      <thead><tr><th scope="col">Frequency</th><th scope="col">Band</th><th scope="col">What it is</th></tr></thead>
      <tbody>${ring.entries.map(e => `<tr><td class="fq">${esc(e.freq)}</td><td class="bd">${esc(e.band)}</td><td>${esc(e.what)}</td></tr>`).join("")}</tbody>
    </table>
    ${whoSays(ring)}
  </article>`;

  const fxCounts = tally(FX_OPTIONS);
  const opts = FX_OPTIONS.map(o => {
    const s = resolveStatus(o);
    return `<article class="panel" style="--edge:${EDGE[s]}">
      <div class="panel-top"><h3 class="opt-name">${esc(o.name)}</h3>${mark(s, "sm")}</div>
      <p class="opt-config">${esc(o.config)}</p>
      <div class="gc"><div class="gains"><b>Gains</b>${esc(o.gains)}</div><div class="costs"><b>Costs</b>${esc(o.costs)}</div></div>
      ${whoSays(o)}
    </article>`;
  }).join("");

  document.getElementById("auxPanel").innerHTML = `
    <div class="alert">${WARN}<div><b>Console conflict</b>${esc(fx.conflict)}</div></div>

    <h2 class="section-h">Buses</h2>
    <p class="section-sub">What each of the six aux sends is for on this rig.</p>
    <div class="bus-grid">${buses}</div>

    <h2 class="section-h">Send rules</h2>
    <p class="section-sub">Which sources may feed the sub bus, and why.</p>
    <div class="panel rules">${rules}</div>

    <h2 class="section-h">Monitor ring-out</h2>
    <p class="section-sub">For the wedge mixes, ${ring.appliesTo.map(a => a.replace(/aux(\d)/, "Aux $1")).join(", ")}.</p>
    ${ringHTML}

    <h2 class="section-h">FX configuration</h2>
    <p class="section-sub">${fxCounts.attested} ratified by a practitioner; ${fxCounts.proposed} proposed by a model and waiting for one. Open “Why this was proposed” to see the reasoning.</p>
    <div class="opt-grid">${opts}</div>`;
}

/* ---------- View tabs (ARIA tabs pattern; the URL remembers the view) ---------- */
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab, { focus = false, animate = true } = {}) {
  const apply = () => tabs.forEach(t => {
    const on = t === tab;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
  });
  animate ? transition(apply) : apply();
  if (focus) tab.focus();
  history.replaceState(null, "", tab.id === "tab-aux" ? "#aux" : location.pathname + location.search);
}
tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", e => {
    const n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (n === undefined) return;
    e.preventDefault();
    selectTab(tabs[(n + tabs.length) % tabs.length], { focus: true });
  });
});

/* ---------- Theme: follows the device until the person chooses ---------- */
const modeBtn = document.getElementById("mode");
const modeLabel = document.getElementById("modeLabel");
const sysLight = matchMedia("(prefers-color-scheme: light)");
function applyMode(mode) {
  document.documentElement.setAttribute("data-mode", mode);
  const next = mode === "dark" ? "light" : "dark";
  modeLabel.textContent = `Switch to ${next}`;
  modeBtn.setAttribute("aria-label", `Switch to ${next} theme`);
}
modeBtn.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-mode") === "dark" ? "light" : "dark";
  try { localStorage.setItem("eq-sop-theme", next); } catch (e) {}
  applyMode(next);
});
sysLight.addEventListener("change", e => {
  let saved = null;
  try { saved = localStorage.getItem("eq-sop-theme"); } catch (err) {}
  if (!saved) applyMode(e.matches ? "light" : "dark");
});

/* ---------- Start ---------- */
applyMode(document.documentElement.getAttribute("data-mode") || "dark");
renderFilters();
render();
renderAuxPanel();
if (location.hash === "#aux") selectTab(tabs[1], { animate: false });
