/**
 * Live Sound EQ SOP — channel records
 * Console: Allen & Heath MixWizard WZ3 16:2 (also correct for WZ3 12:2)
 *
 * Every record carries an attestation. A value is not a fact — it is an
 * assertion by someone, grounded in something, at a point in time.
 *
 *   source: "practitioner"  a named human signed this
 *   source: "model"         a model proposed it; nobody has ratified it
 *
 * Status is never stored here. It is derived in src/attestation.js from the
 * verification date, so an attestation decays unless somebody re-checks it.
 *
 * Console constraints every record must respect. All verified against the
 * WZ3 16:2 / 12:2 User Guide (publication AP5331) on 2026-08-27.
 *
 * The manual states the HPF attenuates below 80 Hz at 12 dB per octave, and
 * that it sits pre-insert, pre-EQ. Some retailer copy and two of the author's
 * own earlier reference documents say 100 Hz; they are wrong, likely
 * conflating it with the WZ3 redesign making the shelving filters more
 * responsive around 100 Hz. The manual is the primary source and wins.
 *   HPF  80 Hz fixed, 12 dB/octave, in or out only
 *   LF   shelving at 80 Hz and below
 *   LM   peak/dip, swept 35 Hz - 1 kHz
 *   HM   peak/dip, swept 500 Hz - 15 kHz
 *   HF   shelving at 12 kHz and above
 *   All gain bands +/- 15 dB, Q fixed at 1.8
 */

/** Sweep and gain limits for the WZ3 channel strip. */
export const CONSOLE = {
  name: "Allen & Heath MixWizard WZ3 16:2",
  hpfHz: 80,
  hpfSlope: "12 dB/octave",
  hpfPosition: "pre-insert, pre-EQ",
  padDb: 20,
  padNote: "The PAD switch selects the LINE jack. With nothing plugged into it, the switch acts as a 20 dB pad on the mic XLR.",
  gainRangeMic: "+10 to +60 dB",
  gainRangeLine: "-10 to +40 dB",
  detent: "All four gain bands have a centre-detent 0 dB position.",
  // Frequencies printed around the sweep knobs — landing on a printed mark is
  // faster and more repeatable at the desk than reading between them.
  lmPanelMarks: ["35 Hz", "45", "70", "180", "250", "400", "1k"],
  hmPanelMarks: ["500 Hz", "700", "1k", "3k", "4k", "6k", "15k"],
  specVerified: "2026-08-27 — against the WZ3 16:2 / 12:2 User Guide, publication AP5331",
  alsoFits: ["WZ3 12:2"],
  notFor: ["ZED series — 100 Hz HPF and a different EQ layout"],
  gainLimitDb: 15,
  lmSweepHz: { min: 35, max: 1000 },
  hmSweepHz: { min: 500, max: 15000 },
  hpfValues: ["IN", "OUT"]
};

export const GROUPS = [
  {
    "name": "Drums",
    "channels": [
      {
        "name": "KICK",
        "variant": null,
        "pad": null,
        "bands": {
          "hpf": "OUT",
          "lf": 3,
          "lmF": "350 Hz",
          "lmD": -4,
          "hmF": "3.5 kHz",
          "hmD": 3,
          "hf": 0
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors.",
          "verified": "2026-08-25",
          "ttlDays": 730
        }
      },
      {
        "name": "SNARE",
        "variant": null,
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": 0,
          "lmF": "700 Hz",
          "lmD": -3,
          "hmF": "4 kHz",
          "hmD": 3,
          "hf": 2
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors.",
          "verified": "2026-08-25",
          "ttlDays": 730
        }
      },
      {
        "name": "TOM",
        "variant": "RACK",
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": 2,
          "lmF": "600 Hz",
          "lmD": -4,
          "hmF": "5 kHz",
          "hmD": 3,
          "hf": 0
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors.",
          "verified": "2026-08-25",
          "ttlDays": 730
        }
      },
      {
        "name": "TOM",
        "variant": "FLOOR",
        "pad": null,
        "bands": {
          "hpf": "OUT",
          "lf": 3,
          "lmF": "450 Hz",
          "lmD": -4,
          "hmF": "4 kHz",
          "hmD": 3,
          "hf": 0
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors.",
          "verified": "2026-08-25",
          "ttlDays": 730
        }
      },
      {
        "name": "OVERHEADS",
        "variant": null,
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": -6,
          "lmF": "400 Hz",
          "lmD": -3,
          "hmF": "0 dB",
          "hmD": 0,
          "hf": 3
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors.",
          "verified": "2026-08-25",
          "ttlDays": 730
        }
      },
      {
        "name": "HI-HAT",
        "variant": null,
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": -8,
          "lmF": "800 Hz",
          "lmD": -3,
          "hmF": "0 dB",
          "hmD": 0,
          "hf": 2
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors.",
          "verified": "2026-08-25",
          "ttlDays": 730
        }
      },
      {
        "name": "CAJON",
        "variant": null,
        "pad": null,
        "bands": {
          "hpf": "OUT",
          "lf": 2,
          "lmF": "400 Hz",
          "lmD": -4,
          "hmF": "3 kHz",
          "hmD": 2,
          "hf": 1
        },
        "attestation": {
          "source": "model",
          "model": "Claude (Anthropic)",
          "rationale": "Treated as a hybrid kick and snare: low shelf lift for the port, mid cut for the box resonance, slight HM lift for slap. Unverified against a real cajon mic position.",
          "by": null,
          "verified": null
        }
      },
      {
        "name": "CONGAS / PERCUSSION",
        "variant": null,
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": -2,
          "lmF": "300 Hz",
          "lmD": -3,
          "hmF": "5 kHz",
          "hmD": 2,
          "hf": 1
        },
        "attestation": {
          "source": "model",
          "model": "Claude (Anthropic)",
          "rationale": "Mud cut plus presence lift for hand attack, following the ownership map. Hand percussion varies enormously by instrument and mic distance.",
          "by": null,
          "verified": null
        }
      }
    ]
  },
  {
    "name": "Bass & guitars",
    "channels": [
      {
        "name": "BASS GTR",
        "variant": "FINGERS",
        "pad": null,
        "bands": {
          "hpf": "OUT",
          "lf": 3,
          "lmF": "300 Hz",
          "lmD": -3,
          "hmF": "800 Hz",
          "hmD": 2,
          "hf": -3
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors.",
          "verified": "2026-08-25",
          "ttlDays": 730
        }
      },
      {
        "name": "BASS GTR",
        "variant": "PICK / SLAP",
        "pad": null,
        "bands": {
          "hpf": "OUT",
          "lf": 2,
          "lmF": "300 Hz",
          "lmD": -3,
          "hmF": "2.5 kHz",
          "hmD": 2,
          "hf": -2
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors.",
          "verified": "2026-08-25",
          "ttlDays": 730
        }
      },
      {
        "name": "ELECTRIC GTR",
        "variant": "CLEAN",
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": 0,
          "lmF": "400 Hz",
          "lmD": -3,
          "hmF": "2 kHz",
          "hmD": 2,
          "hf": -2
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors.",
          "verified": "2026-08-25",
          "ttlDays": 730
        }
      },
      {
        "name": "ELECTRIC GTR",
        "variant": "HIGH GAIN",
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": -2,
          "lmF": "400 Hz",
          "lmD": -3,
          "hmF": "3.5 kHz",
          "hmD": -3,
          "hf": -4
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors.",
          "verified": "2026-08-25",
          "ttlDays": 730
        }
      },
      {
        "name": "ACOUSTIC GTR",
        "variant": "DI / PICKUP",
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": -4,
          "lmF": "200 Hz",
          "lmD": -5,
          "hmF": "5 kHz",
          "hmD": 3,
          "hf": 2
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors.",
          "verified": "2026-08-25",
          "ttlDays": 730
        }
      },
      {
        "name": "UPRIGHT BASS",
        "variant": "PICKUP",
        "pad": null,
        "bands": {
          "hpf": "OUT",
          "lf": 2,
          "lmF": "250 Hz",
          "lmD": -4,
          "hmF": "2 kHz",
          "hmD": 2,
          "hf": -2
        },
        "attestation": {
          "source": "model",
          "model": "Claude (Anthropic)",
          "rationale": "Piezo pickups are typically boxy in the low mids and thin on top. Follows the acoustic guitar DI pattern. Highly dependent on pickup type.",
          "by": null,
          "verified": null
        }
      },
      {
        "name": "BANJO",
        "variant": null,
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": -5,
          "lmF": "350 Hz",
          "lmD": -4,
          "hmF": "3 kHz",
          "hmD": -2,
          "hf": 1
        },
        "attestation": {
          "source": "model",
          "model": "Claude (Anthropic)",
          "rationale": "Aggressive low cut since banjo has little useful content below 150 Hz, plus an HM cut to tame the ring. Model inference, not bench-tested.",
          "by": null,
          "verified": null
        }
      }
    ]
  },
  {
    "name": "Vocals",
    "channels": [
      {
        "name": "LEAD VOCAL",
        "variant": "MALE",
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": 0,
          "lmF": "300 Hz",
          "lmD": -3,
          "hmF": "4 kHz",
          "hmD": 3,
          "hf": 2
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors.",
          "verified": "2026-08-25",
          "ttlDays": 730
        }
      },
      {
        "name": "LEAD VOCAL",
        "variant": "FEMALE",
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": -2,
          "lmF": "400 Hz",
          "lmD": -3,
          "hmF": "4.5 kHz",
          "hmD": 3,
          "hf": 2
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors.",
          "verified": "2026-08-25",
          "ttlDays": 730
        }
      },
      {
        "name": "BACKING VOCAL",
        "variant": null,
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": -3,
          "lmF": "300 Hz",
          "lmD": -3,
          "hmF": "4 kHz",
          "hmD": -2,
          "hf": 0
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors.",
          "verified": "2026-08-25",
          "ttlDays": 730
        }
      },
      {
        "name": "GUEST MIC",
        "variant": "KARAOKE / SPEECH",
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": -2,
          "lmF": "250 Hz",
          "lmD": -4,
          "hmF": "4 kHz",
          "hmD": 2,
          "hf": 1
        },
        "attestation": {
          "source": "model",
          "model": "Claude (Anthropic)",
          "rationale": "Reasoned from the backing-vocal pattern with more presence for cutting over a track. Practitioner has not run this channel and gave an explicit no during review — kept as a starting point, not attested.",
          "by": null,
          "verified": null
        }
      }
    ]
  },
  {
    "name": "Keys, synths & horns",
    "channels": [
      {
        "name": "PIANO",
        "variant": "ACOUSTIC",
        "pad": "IF LINE",
        "bands": {
          "hpf": "IN",
          "lf": -2,
          "lmF": "250 Hz",
          "lmD": -3,
          "hmF": "7 kHz",
          "hmD": 2,
          "hf": 2
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors.",
          "verified": "2026-08-25",
          "ttlDays": 730
        }
      },
      {
        "name": "RHODES",
        "variant": "ELECTRIC PIANO",
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": -2,
          "lmF": "300 Hz",
          "lmD": -2,
          "hmF": "3 kHz",
          "hmD": 1,
          "hf": 1
        },
        "attestation": {
          "source": "model",
          "model": "Claude (Anthropic)",
          "rationale": "Rhodes typically arrives DI'd or line-level, midrange-forward with less low-end weight than acoustic piano and no soundboard resonance to manage. Light LF cut and a small HM lift for bell-tone presence. Practitioner has played and mixed Rhodes but these console values are unverified on the WZ3.",
          "by": null,
          "verified": null
        }
      },
      {
        "name": "HAMMOND B3",
        "variant": "LESLIE",
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": -3,
          "lmF": "400 Hz",
          "lmD": -3,
          "hmF": "3.5 kHz",
          "hmD": 2,
          "hf": 2
        },
        "attestation": {
          "source": "model",
          "model": "Claude (Anthropic)",
          "rationale": "Leslie-mic'd B3 brings a moving tonal character from the rotating horn and drum, plus real low end if bass pedals are in use. LF cut leaves room for bass guitar; HM lift for horn-rotor presence. Practitioner has played and mixed B3/Leslie but these console values are unverified on the WZ3.",
          "by": null,
          "verified": null
        }
      },
      {
        "name": "SYNTH",
        "variant": "PADS",
        "pad": "LINE",
        "bands": {
          "hpf": "IN",
          "lf": -6,
          "lmF": "300 Hz",
          "lmD": -4,
          "hmF": "0 dB",
          "hmD": 0,
          "hf": 1
        },
        "attestation": {
          "source": "model",
          "model": "Claude (Anthropic)",
          "rationale": "Reasoned from mixing theory about how sustained pad content should sit under a mix — not yet verified with this specific patch through the WZ3.",
          "by": null,
          "verified": null
        }
      },
      {
        "name": "SYNTH",
        "variant": "LEAD",
        "pad": "LINE",
        "bands": {
          "hpf": "IN",
          "lf": -3,
          "lmF": "500 Hz",
          "lmD": -2,
          "hmF": "2.8 kHz",
          "hmD": -3,
          "hf": 0
        },
        "attestation": {
          "source": "model",
          "model": "Claude (Anthropic)",
          "rationale": "Reasoned from mixing theory treating a synth lead like a second vocal or guitar solo — not yet verified with this specific patch through the WZ3.",
          "by": null,
          "verified": null
        }
      },
      {
        "name": "SYNTH",
        "variant": "BASS",
        "pad": "LINE",
        "bands": {
          "hpf": "OUT",
          "lf": 2,
          "lmF": "250 Hz",
          "lmD": -3,
          "hmF": "1 kHz",
          "hmD": 2,
          "hf": -3
        },
        "attestation": {
          "source": "model",
          "model": "Claude (Anthropic)",
          "rationale": "Reasoned from frequency-conflict principles between synth bass and bass guitar. Practitioner has mixed synth bass in a DAW context but has not yet swept LM/HM on the WZ3 itself — this is the specific gap the values are pending verification against.",
          "by": null,
          "verified": null
        }
      },
      {
        "name": "TENOR SAXOPHONE",
        "variant": null,
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": -3,
          "lmF": "350 Hz",
          "lmD": -3,
          "hmF": "2.5 kHz",
          "hmD": -3,
          "hf": 2
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors.",
          "verified": "2026-08-25",
          "ttlDays": 730
        }
      },
      {
        "name": "TRUMPET",
        "variant": null,
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": -4,
          "lmF": "400 Hz",
          "lmD": -3,
          "hmF": "3 kHz",
          "hmD": -2,
          "hf": 1
        },
        "attestation": {
          "source": "model",
          "model": "Claude (Anthropic)",
          "rationale": "Trumpet is bright and cutting by nature — LF cut since there is little useful content down there, HM cut to tame the natural edge rather than adding more of it. Practitioner has played and mixed trumpet but these console values are unverified on the WZ3.",
          "by": null,
          "verified": null
        }
      },
      {
        "name": "TROMBONE",
        "variant": null,
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": -2,
          "lmF": "350 Hz",
          "lmD": -3,
          "hmF": "2.5 kHz",
          "hmD": -1,
          "hf": 1
        },
        "attestation": {
          "source": "model",
          "model": "Claude (Anthropic)",
          "rationale": "Trombone sits lower and with more body than trumpet or sax — smaller LF cut, mud cut around 350 Hz same as most horns. Practitioner has played and mixed trombone but these console values are unverified on the WZ3.",
          "by": null,
          "verified": null
        }
      },
      {
        "name": "ALTO SAXOPHONE",
        "variant": null,
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": -3,
          "lmF": "350 Hz",
          "lmD": -3,
          "hmF": "3 kHz",
          "hmD": -2,
          "hf": 2
        },
        "attestation": {
          "source": "model",
          "model": "Claude (Anthropic)",
          "rationale": "Alto sits higher and reedier than tenor — similar treatment to the existing tenor record with a slightly higher HM centre. Practitioner has played and mixed alto sax but these console values are unverified on the WZ3.",
          "by": null,
          "verified": null
        }
      },
      {
        "name": "FIDDLE / VIOLIN",
        "variant": null,
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": -4,
          "lmF": "400 Hz",
          "lmD": -3,
          "hmF": "3 kHz",
          "hmD": -3,
          "hf": 2
        },
        "attestation": {
          "source": "model",
          "model": "Claude (Anthropic)",
          "rationale": "HM cut placed to reduce harshness while staying clear of the protected 3 to 5 kHz vocal seat. The conflict with lead vocal is the open question here.",
          "by": null,
          "verified": null
        }
      }
    ]
  },
  {
    "name": "Playback",
    "channels": [
      {
        "name": "HOUSE MUSIC (PLAYBACK)",
        "variant": "LEFT",
        "pad": "LINE",
        "bands": {
          "hpf": "OUT",
          "lf": 0,
          "lmF": "315 Hz",
          "lmD": -3,
          "hmF": "2.5 kHz",
          "hmD": -3,
          "hf": -2
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors.",
          "verified": "2026-08-25",
          "ttlDays": 730
        }
      },
      {
        "name": "HOUSE MUSIC (PLAYBACK)",
        "variant": "RIGHT",
        "pad": "LINE",
        "bands": {
          "hpf": "OUT",
          "lf": 0,
          "lmF": "315 Hz",
          "lmD": -3,
          "hmF": "2.5 kHz",
          "hmD": -3,
          "hf": -2
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors.",
          "verified": "2026-08-25",
          "ttlDays": 730
        }
      },
      {
        "name": "HOUSE MUSIC (PLAYBACK)",
        "variant": "LEGACY RIG",
        "pad": "LINE",
        "bands": {
          "hpf": "OUT",
          "lf": 0,
          "lmF": "315 Hz",
          "lmD": -3,
          "hmF": "2.5 kHz",
          "hmD": -3,
          "hf": -2
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors. Kept as a demonstration of an older, unrevisited rig — deliberately dated to exercise the decay path.",
          "verified": "2021-03-14",
          "ttlDays": 730
        }
      },
      {
        "name": "TALKBOX",
        "variant": "DEMONSTRATION RECORD",
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": -6,
          "lmF": "500 Hz",
          "lmD": -3,
          "hmF": "2 kHz",
          "hmD": 3,
          "hf": 2
        },
        "attestation": {
          "source": "model",
          "model": "Claude (Anthropic)",
          "rationale": "Inferred from the vocal channel pattern on the assumption a talkbox tube behaves like a mic'd voice. This is a weak inference — a talkbox is a horn driver through plastic tubing, not a larynx.",
          "by": null,
          "verified": null,
          "rejection": {
            "by": "PLACEHOLDER — demonstration record",
            "role": null,
            "reason": "PLACEHOLDER — this record exists to exercise the rejected state in the interface and tests. Replace it with a real rejection, or delete it, once a practitioner has turned down an actual proposal.",
            "reviewed": "2026-08-23"
          }
        }
      },
      {
        "name": "DJ RIG",
        "variant": "STAGE L",
        "pad": "IF CLIPPING",
        "bands": {
          "hpf": "OUT",
          "lf": 0,
          "lmF": "315 Hz",
          "lmD": -3,
          "hmF": "2 kHz",
          "hmD": -3,
          "hf": -2
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors. Confirmed against his own Hip Hop Live Mixing & EQ Reference and Two-DJ FOH Setup Checklist: cut 2-4 dB in the 1-3 kHz HM band to clear a vocal pocket for rap consonants, gentle HF cut where hats and sizzle mask sibilance, LF left flat because the dual mono subs carry the 808s and double-boosting only adds mud. Pad engaged when gain is near minimum and the channel still clips.",
          "verified": "2026-08-26",
          "ttlDays": 730
        }
      },
      {
        "name": "DJ RIG",
        "variant": "STAGE R",
        "pad": "IF CLIPPING",
        "bands": {
          "hpf": "OUT",
          "lf": 0,
          "lmF": "315 Hz",
          "lmD": -3,
          "hmF": "2 kHz",
          "hmD": -3,
          "hf": -2
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors. Confirmed against his own Hip Hop Live Mixing & EQ Reference and Two-DJ FOH Setup Checklist: cut 2-4 dB in the 1-3 kHz HM band to clear a vocal pocket for rap consonants, gentle HF cut where hats and sizzle mask sibilance, LF left flat because the dual mono subs carry the 808s and double-boosting only adds mud. Pad engaged when gain is near minimum and the channel still clips.",
          "verified": "2026-08-26",
          "ttlDays": 730
        }
      },
      {
        "name": "DJ MIC",
        "variant": "HYPE",
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": -3,
          "lmF": "300 Hz",
          "lmD": -3,
          "hmF": "4 kHz",
          "hmD": 1,
          "hf": 0
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors. Confirmed against his own Hip Hop Live Mixing & EQ Reference: HPF engaged since cupping and proximity effect leave nothing useful below it live, 2-4 dB cut at 250-400 Hz for cupped-mic mud, and only a small 3-5 kHz presence lift as a last resort because carving the DJ channel first usually solves it without inviting feedback. A hype mic sits 3-6 dB under the lead vocal and gets muted whenever it is not in use.",
          "verified": "2026-08-26",
          "ttlDays": 730
        }
      }
    ]
  }
];

/** Parse a frequency label such as "3.5 kHz", "350 Hz" or "park 15k" into hertz. */
export function toHz(label) {
  // "0 dB" means the band is inactive. Frequency is meaningless at zero gain,
  // so the record says so plainly rather than implying a sweep position.
  if (label === "0 dB") return null;
  if (label === "park 15k") return 15000;
  const value = parseFloat(label);
  if (Number.isNaN(value)) return NaN;
  return /k/i.test(label) ? value * 1000 : value;
}

/** Every channel across every group, flattened, with its group name attached. */
export function allChannels() {
  return GROUPS.flatMap((group) =>
    group.channels.map((channel) => ({ ...channel, group: group.name }))
  );
}

/** A readable identifier for error messages: "TOM (FLOOR)". */
export function channelId(channel) {
  return channel.variant ? `${channel.name} (${channel.variant})` : channel.name;
}
