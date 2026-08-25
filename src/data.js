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
 * Console constraints every record must respect:
 *   HPF  80 Hz fixed, in or out only
 *   LF   shelving at 80 Hz and below
 *   LM   peak/dip, swept 35 Hz - 1 kHz
 *   HM   peak/dip, swept 500 Hz - 15 kHz
 *   HF   shelving at 12 kHz and above
 *   All gain bands +/- 15 dB, Q fixed at 1.8
 */

/** Sweep and gain limits for the WZ3 channel strip. */
export const CONSOLE = {
  name: "Allen & Heath MixWizard WZ3 16:2",
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
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
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
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
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
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
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
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
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
          "hmF": "park 15k",
          "hmD": 0,
          "hf": 3
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
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
          "hmF": "park 15k",
          "hmD": 0,
          "hf": 2
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
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
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
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
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
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
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
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
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
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
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
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
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
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
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
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
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
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
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
          "ttlDays": 730
        }
      }
    ]
  },
  {
    "name": "Keys, synths & horns",
    "channels": [
      {
        "name": "PIANO",
        "variant": "ACOUSTIC / ELECTRIC",
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
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
          "ttlDays": 730
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
          "hmF": "park 15k",
          "hmD": 0,
          "hf": 1
        },
        "attestation": {
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
          "ttlDays": 730
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
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
          "ttlDays": 730
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
          "source": "practitioner",
          "by": "David Petry",
          "role": "FOH engineer",
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
          "ttlDays": 730
        }
      },
      {
        "name": "HORNS",
        "variant": "SAX / BRASS",
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
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
          "ttlDays": 730
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
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
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
          "basis": "PLACEHOLDER — replace with your own account of what these values are grounded in (rooms, years, rig).",
          "verified": "2026-08-01",
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
          "basis": "PLACEHOLDER — an older rig, kept to demonstrate attestation decay.",
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
        "name": "DJ RIG (STAGE)",
        "variant": "HIP-HOP · LEFT",
        "pad": "LINE",
        "bands": {
          "hpf": "OUT",
          "lf": 0,
          "lmF": "315 Hz",
          "lmD": -3,
          "hmF": "2.5 kHz",
          "hmD": -3,
          "hf": 2
        },
        "attestation": {
          "source": "model",
          "model": "Claude (Anthropic)",
          "rationale": "Stereo pair off a battle mixer. HPF stays out because the sub content is the genre — an 80 Hz filter guts an 808. LF held at flat rather than boosted: the tracks arrive already mastered and bass-heavy, and lifting the shelf tends to go flubby in a live room. The 315 Hz cut clears mud from stacked samples. The HM cut at 2.5 kHz is the important one — it carves a seat for the live MC, applying the ownership map rule that 3 to 5 kHz is protected for vocal. On a stage rig, also watch for low-frequency energy from the wedges reaching the turntables and skipping the needle; that is a physical isolation problem, not an EQ one.",
          "by": null,
          "verified": null
        }
      },
      {
        "name": "DJ RIG (STAGE)",
        "variant": "HIP-HOP · RIGHT",
        "pad": "LINE",
        "bands": {
          "hpf": "OUT",
          "lf": 0,
          "lmF": "315 Hz",
          "lmD": -3,
          "hmF": "2.5 kHz",
          "hmD": -3,
          "hf": 2
        },
        "attestation": {
          "source": "model",
          "model": "Claude (Anthropic)",
          "rationale": "Matched to the left channel. A stereo pair should track identically unless the room forces otherwise — dialling them apart introduces image shift that reads as a phase problem from the floor.",
          "by": null,
          "verified": null
        }
      },
      {
        "name": "DJ MIC",
        "variant": "HYPE / DROPS",
        "pad": null,
        "bands": {
          "hpf": "IN",
          "lf": -3,
          "lmF": "400 Hz",
          "lmD": -3,
          "hmF": "4 kHz",
          "hmD": 3,
          "hf": 2
        },
        "attestation": {
          "source": "model",
          "model": "Claude (Anthropic)",
          "rationale": "Follows the backing vocal pattern with more presence, since a DJ mic has to cut over a full track rather than sit inside a band. HPF in and LF down hard because the mic sits on a stage next to the rig and will pick up sub energy from the wedges. Sits in the same 3 to 5 kHz band as the lead MC, which is the conflict to watch — if both are open at once, one has to give ground."
        }
      }
    ]
  }
];

/** Parse a frequency label such as "3.5 kHz", "350 Hz" or "park 15k" into hertz. */
export function toHz(label) {
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
