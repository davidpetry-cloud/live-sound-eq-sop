/**
 * Aux & effects layer — Allen & Heath MixWizard WZ3 16:2
 *
 * A channel strip documents a source. This layer documents RELATIONSHIPS:
 * what each bus is for, which signals may feed it, and the standing
 * procedures that hang off it.
 *
 * What gets attested here is deliberately different from the channel layer.
 * Channel records attest ballpark VALUES. Bus records attest DECISIONS —
 * roles, routing rules, procedures. Tonight's wedge level for a quiet
 * jazz vocalist and a hip-hop hype man are not in the same universe, so
 * per-gig levels are explicitly out of scope. The environment changes the
 * outcome; the policy is what survives the night.
 *
 * The attestation engine is reused from src/attestation.js with ZERO
 * changes. This layer is the first second-domain consumer of the engine —
 * if proposed/attested/expired/rejected survive contact with a genuinely
 * different record shape, the engine is ready to publish as a package.
 */

/**
 * Console facts about the aux section, verified against the WZ3 16:2 / 12:2
 * User Guide (publication AP5331). Facts need no attestation — they are the
 * hardware. The tests enforce that no record contradicts them.
 */
export const AUX_CONSOLE = {
  sends: 6,
  fade: {
    aux1: { mode: "pre",  source: "fixed" },
    aux2: { mode: "pre",  source: "fixed" },
    aux3: { mode: "pre",  source: "switched" },  // pre/post switch on the strip
    aux4: { mode: "pre",  source: "switched" },
    aux5: { mode: "post", source: "fixed" },
    aux6: { mode: "post", source: "fixed" }
  },
  // Manual: pre-fade sends tap the signal PRE-INSERT and PRE-EQ, post-mute.
  // Operational consequence: channel EQ does NOT reach a pre-fade wedge mix.
  // Monitors ring independently of the house — which is why ring-out is a
  // bus procedure, not a channel one.
  preFadeTap: "pre-insert, pre-EQ, post-mute",
  auxFedSub: "Aux 6 can drive the M output for aux-fed sub systems",
  fx: {
    // Manual: "a 16 preset effects engine fed from AUX5, or in dual mode as
    // two 8 preset effects engines independently fed from AUX5 and AUX6."
    singleMode: { engines: 1, presets: "1-16", fedFrom: ["aux5"] },
    dualMode: {
      engines: 2,
      engine1: { presets: "1-8 (reverbs: Vocal Plate through Concert Hall)", fedFrom: "aux5" },
      engine2: { presets: "9-16 (delays and modulation)", fedFrom: "aux6" }
    },
    returnPath: "ST1 stereo return on the 16:2 (labelled ST5/FX on the 12:2) — internal and external effects mix into this one return",
    footswitch: "Rear-panel footswitch jack mutes the effects return — kills internal AND any external unit returning through it",
    conflict: "Dual mode and aux-fed subs both claim Aux 6. The M output carries the mono LR sum or the AUX6 mix — one bus cannot do both jobs.",
    directOutOption: "Any channel direct output can be jumpered post-fade to feed a dedicated external effect, returning on ST6 — a second effect that spends no aux and no wedge"
  },
  specVerified: "2026-08-27 — against the WZ3 16:2 / 12:2 User Guide, publication AP5331"
};

const BASIS =
  "David Petry's years of music and creative related experiences into live " +
  "audio engineering and other technical endeavors.";
const DATE = "2026-08-27";

function attested(extra = "") {
  return {
    source: "practitioner",
    by: "David Petry",
    role: "FOH engineer",
    basis: extra ? `${BASIS} ${extra}` : BASIS,
    verified: DATE,
    ttlDays: 730
  };
}

/* ============================================================
   BUSES — what each aux is FOR
   ============================================================ */
export const BUSES = [
  {
    id: "aux1",
    role: "WEDGE MIX 1",
    fade: "pre",
    feeds: "Floor wedge, downstage",
    policy: [
      "Pre-fade, so the wedge mix holds steady while the house fader moves",
      "Channel EQ does not reach this mix — the pre-fade tap is pre-EQ. Ring out the wedge at the bus, not the strip"
    ],
    attestation: attested("Bus assignment stated by the practitioner: Aux 1-4 run floor wedge monitor mixes on this rig.")
  },
  {
    id: "aux2",
    role: "WEDGE MIX 2",
    fade: "pre",
    feeds: "Floor wedge, downstage",
    policy: [
      "Pre-fade, so the wedge mix holds steady while the house fader moves",
      "Channel EQ does not reach this mix — ring out at the bus, not the strip"
    ],
    attestation: attested("Bus assignment stated by the practitioner: Aux 1-4 run floor wedge monitor mixes on this rig.")
  },
  {
    id: "aux3",
    role: "WEDGE MIX 3",
    fade: "pre",
    feeds: "Floor wedge",
    policy: [
      "STANDING DECISION: the pre/post switch on this bus is set to PRE. A wedge on a post-fade send would duck every time the house fader moved",
      "Check the switch at load-in — it is the one setting on this desk that silently breaks a monitor mix"
    ],
    attestation: attested("Bus assignment and switch position stated by the practitioner: Aux 3-4 are switched to PRE and run wedges.")
  },
  {
    id: "aux4",
    role: "WEDGE MIX 4",
    fade: "pre",
    feeds: "Floor wedge",
    policy: [
      "STANDING DECISION: pre/post switch set to PRE — same reasoning as Aux 3",
      "Check the switch at load-in"
    ],
    attestation: attested("Bus assignment and switch position stated by the practitioner: Aux 3-4 are switched to PRE and run wedges.")
  },
  {
    id: "aux5",
    role: "FX SEND",
    fade: "post",
    feeds: "Effects processor",
    policy: [
      "Post-fade by hardware — effects follow the fader down, so a vocal pulled from the mix does not leave its reverb hanging",
      "Mute the FX return during speech between songs. Reverb on an announcement reads as amateur hour — and the rear-panel footswitch jack does this in one stomp, killing internal and external returns together",
      "A channel EQ move DOES reach this send — post-fade taps after the strip. A dull source sends a dull reverb"
    ],
    attestation: attested("Bus assignment stated by the practitioner. The FX-mute-during-speech rule is documented in his own Hip Hop Live Mixing Reference.")
  },
  {
    id: "aux6",
    role: "SUB FEED (MONO)",
    fade: "post",
    feeds: "M output — aux-fed subs",
    policy: [
      "Post-fade, so the sub feed follows the house mix down",
      "Low-end sources only: kick, bass, synth bass, DJ rig. Nothing else gets a send here",
      "Vocals never feed this bus — see the standing rule"
    ],
    attestation: attested("Bus assignment stated by the practitioner. Aux-fed sub routing via Aux 6 to the M output is documented in his own Two-DJ FOH Setup Checklist and matches the console's designed aux-fed sub mode.")
  }
];

/* ============================================================
   SEND RULES — relationships worth writing down
   ============================================================ */
export const SEND_RULES = [
  {
    group: "Vocals",
    bus: "aux6",
    rule: "OFF — vocals never feed the subs",
    why: "Sub energy under a vocal reads as mud, eats headroom the low end actually needs, and feeds back through wedge bleed long before it adds anything useful.",
    attestation: attested("Documented in his own Two-DJ FOH Setup Checklist: vocals are kept off the sub send.")
  },
  {
    group: "Drums",
    bus: "aux6",
    rule: "KICK ONLY — toms, snare and overheads stay off the sub feed",
    why: "The sub bus exists for sustained low-frequency content. Snare and cymbal bleed through the subs smears the low end without adding weight.",
    attestation: attested("Follows from the low-end-sources-only sub policy in his own Two-DJ FOH Setup Checklist.")
  },
  {
    group: "Playback",
    bus: "aux6",
    rule: "ON — DJ rig and house music feed the subs at line level",
    why: "Mastered program material carries the genre's low end; the aux-fed sub is how it reaches the boxes without doubling through the main LR EQ.",
    attestation: attested("Documented in his own Two-DJ FOH Setup Checklist: DJ tracks feed the subs via Aux 6.")
  }
];

/* ============================================================
   FX PATCHES — proposed until the practitioner names his presets
   ============================================================ */
export const FX_PATCHES = [
  {
    id: "fx-a",
    preset: "Vocal Plate",
    sendBus: "aux5",
    returnPath: "ST1 stereo return to LR",
    policy: [
      "Return comes up on the ST1 return level, not a channel strip",
      "Mute at the return during speech — the send keeps working, the room goes dry"
    ],
    attestation: {
      source: "model",
      model: "Claude (Anthropic)",
      rationale: "Vocal Plate is preset 1 in the console's internal effects list and the most common default for a live vocal. The practitioner has not named which preset he actually runs — this is a starting point, not his patch.",
      by: null,
      verified: null
    }
  },
  // A second simultaneous internal patch requires DUAL mode, which claims
  // Aux 6 — currently the sub feed. See FX_OPTIONS for the honest paths to
  // a second effect. A previous record here ("Slap Delay on Aux 5") implied
  // hardware behaviour the console cannot do in single mode; removed.
];

/* ============================================================
   FX CONFIGURATION OPTIONS — a decision the practitioner has not made yet
   ============================================================ */
export const FX_OPTIONS = [
  {
    id: "opt-single",
    name: "Single FX (current, by consequence)",
    config: "Aux 5 feeds one 16-preset engine; Aux 6 stays the sub feed",
    gains: "Full aux-fed sub control — the backbone of the hip-hop rig",
    costs: "One effect at a time",
    attestation: {
      source: "model", model: "Claude (Anthropic)",
      rationale: "This is the configuration the rig already implies, but it exists by consequence of the sub decision, not as a ratified choice. Ratifying it makes the trade-off deliberate.",
      by: null, verified: null
    }
  },
  {
    id: "opt-dual",
    name: "Dual FX — trade the subs",
    config: "Engine 2 takes Aux 6 (delays, presets 9-16); subs run full-range off LR",
    gains: "Reverb and delay running simultaneously, both internal",
    costs: "Loses aux-fed subs entirely — the per-channel sub mix and dedicated sub fader go with it",
    attestation: {
      source: "model", model: "Claude (Anthropic)",
      rationale: "Manual-verified: dual mode is fed from Aux 5 and Aux 6. For a rig built around 808-heavy program material, giving up the sub feed for a delay engine is probably the wrong trade — proposed mainly so the rejection can be recorded with its reason.",
      by: null, verified: null
    }
  },
  {
    id: "opt-aux4",
    name: "External effect on a flipped Aux 4",
    config: "Aux 4 switched POST, feeds an external unit, returns into ST1 alongside the internal engine",
    gains: "Second effect; subs untouched; the footswitch still mutes both returns at once",
    costs: "Drops from four wedge mixes to three",
    attestation: {
      source: "model", model: "Claude (Anthropic)",
      rationale: "Manual-verified: an external effects device fed from a different aux mix can return through ST1 and mix with the internal processor. Whether three wedge mixes cover the stage is a per-rig judgment only the practitioner can make.",
      by: null, verified: null
    }
  },
  {
    id: "opt-direct",
    name: "Dedicated vocal reverb via direct out",
    config: "Lead vocal channel direct output jumpered post-fade, feeds an external reverb, returns on ST6",
    gains: "Second effect that spends no aux and no wedge — all four monitor mixes and the sub feed survive intact",
    costs: "An internal jumper change and an external unit to own, cable and power",
    attestation: {
      source: "model", model: "Claude (Anthropic)",
      rationale: "The manual names this exact use case: a reverb unit dedicated to the lead vocalist via post-fade direct output, freeing the aux mix for other purposes. The only option with no operational cost — the cost is hardware and a one-time jumper.",
      by: null, verified: null
    }
  }
];

/* ============================================================
   MONITOR RING-OUT — restored from the original SOP
   ============================================================ */
export const MONITOR_RINGOUT = {
  appliesTo: ["aux1", "aux2", "aux3", "aux4"],
  note:
    "Ring out each wedge mix at the bus, one at a time, before the band arrives. " +
    "Especially critical indoors — reflections bring the room into the loop and " +
    "the ring frequencies below are where wedges catch first. Outdoor stages are " +
    "more forgiving; do not let that forgiveness become the habit.",
  rule: "Never notch more than three frequencies per monitor. A wedge that needs a fourth cut has a placement problem, not an EQ problem — move the mic or the wedge.",
  entries: [
    { freq: "250 Hz", band: "LM", what: "Chesty, boomy ring. Most common on floor wedges near a back wall." },
    { freq: "500 Hz", band: "LM or HM", what: "Hollow honk. Cut −4." },
    { freq: "800 Hz – 1 kHz", band: "LM (max) or HM", what: "Overlap zone — either band reaches it." },
    { freq: "2 kHz", band: "HM", what: "Piercing ring. Cut −4 to −6." },
    { freq: "4 kHz", band: "HM", what: "Sharp whistle. Cut −6, then re-check vocal presence." }
  ],
  attestation: attested("Restored from the practitioner's original Live Sound EQ SOP, where it was authored as a general reference; it was always a monitor-bus procedure and now lives with the buses it belongs to.")
};

/* ============================================================
   Helpers
   ============================================================ */
export function busById(id) {
  return BUSES.find((b) => b.id === id) ?? null;
}

export function wedgeBuses() {
  return BUSES.filter((b) => /WEDGE/i.test(b.role));
}

export function allAuxRecords() {
  return [...BUSES, ...SEND_RULES, ...FX_PATCHES, ...FX_OPTIONS, MONITOR_RINGOUT];
}
