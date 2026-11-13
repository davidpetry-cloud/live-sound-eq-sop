/**
 * Reference layer — the bass guitar's low register, note by note.
 *
 * Two kinds of content live here, kept apart on purpose:
 *
 *   bassNotes()  facts. Equal-temperament pitch from A4 = 440 Hz and the
 *                standard tunings (4-string E A D G, 5-string adds low B).
 *                Arithmetic and tuning need no attestation, the same way
 *                CONSOLE in data.js does not.
 *
 *   LOW_END_RING advice. How to use the table at the WZ3 when one bass note
 *                blooms and hangs. A model wrote it, so it is proposed and
 *                stays proposed until a practitioner attests it at a console.
 */
export const A4_HZ = 440;

const NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

/** Pitch in Hz of a note like "E1" or "A#2", equal temperament, A4 = 440. */
export function noteHz(note) {
  const m = /^([A-G]#?)(-?\d)$/.exec(note);
  if (!m) throw new Error(`not a note: "${note}"`);
  const semitonesFromA4 = NAMES.indexOf(m[1]) - 9 + (Number(m[2]) - 4) * 12;
  return A4_HZ * 2 ** (semitonesFromA4 / 12);
}

/** Open strings, lowest first. B0 exists on a 5-string only. */
export const OPEN_STRINGS = [
  { string: "B", note: "B0", fiveStringOnly: true },
  { string: "E", note: "E1" },
  { string: "A", note: "A1" },
  { string: "D", note: "D2" },
  { string: "G", note: "G2" }
];

const semis = (note) => Math.round(12 * Math.log2(noteHz(note) / A4_HZ));

/** Where a note first falls under the hand: the highest open string at or below it, so frets stay 0-4. */
function whereOnBass(note) {
  const n = semis(note);
  const s = [...OPEN_STRINGS].reverse().find((o) => semis(o.note) <= n);
  return { string: s.string, fret: n - semis(s.note), fiveStringOnly: !!s.fiveStringOnly };
}

/**
 * The chromatic run from the 5-string's low B up to A2, with where each note
 * sits on the strip. Takes the console's limits (CONSOLE in data.js) rather
 * than importing them, so this module stands alone like the others in src/.
 */
export function bassNotes(strip) {
  const rows = [];
  const lo = semis("B0"), hi = semis("A2");
  for (let s = lo; s <= hi; s++) {
    const idx = ((s + 9) % 12 + 12) % 12;
    const octave = 4 + Math.floor((s + 9) / 12);
    const note = `${NAMES[idx]}${octave}`;
    const hz = noteHz(note);
    const open = OPEN_STRINGS.find((o) => o.note === note) ?? null;
    const pos = whereOnBass(note);
    rows.push({
      note,
      hz: Math.round(hz * 10) / 10,
      open: open ? open.string : null,
      played: pos.fret === 0
        ? `Open ${pos.string}${pos.fiveStringOnly ? " (5-string)" : ""}`
        : `${pos.string} string, fret ${pos.fret}`,
      lmReaches: hz >= strip.lmSweepHz.min && hz <= strip.lmSweepHz.max,
      belowHpf: hz < strip.hpfHz
    });
  }
  return rows;
}

/* ============================================================
   LOW-END RING — how to use the table. Model-proposed.
   ============================================================ */
export const LOW_END_RING = {
  id: "low-end-ring",
  name: "Bass note finder",
  appliesTo: "Bass & Guitars",
  note:
    "When one bass note blooms and hangs while the rest sound normal, find the note, " +
    "then find its frequency here. The fundamental is the number to work with on the strip.",
  rule:
    "The strip has one LM sweep. Moving it down to a bass note takes it off the bass " +
    "channel's 300 Hz mud cut, and HM cannot reach below 500 Hz to cover for it. Try " +
    "the LF shelf first; move the LM only if a single note still blooms.",
  steps: [
    "Ask the bassist to play up the lowest string one note at a time, at show level. Note the one that blooms.",
    "If it booms on the bass only: pull the LF shelf back first (for example, +3 dB to 0 dB).",
    "Still one note hanging: sweep LM to that note's frequency and cut −3 dB. Go to −6 dB only if it needs it.",
    "Leave the HPF out on the bass channel. At 80 Hz it sits above every note from E1 to D#2.",
    "Same note booms on kick, synth bass and track too: that is the room, not the bass. Leave the channels alone and note the frequency for system EQ.",
    "Swells on sustained notes and shrinks when the bassist steps away from the sub: that is a feedback loop. Fix it with distance and stage-amp level, not EQ."
  ],
  attestation: {
    source: "model",
    model: "Claude (Anthropic)",
    rationale:
      "Written in conversation after the practitioner traced a long, ringing sub note to the bass player. " +
      "The frequencies are arithmetic; the procedure is not. The LF-before-LM order follows from the " +
      "attested BASS GTR cards already using the LM at 300 Hz. Untested at a console.",
    by: null,
    verified: null
  }
};
