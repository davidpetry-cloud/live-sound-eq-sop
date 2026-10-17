# Live Sound EQ SOP — with attestation

[![test](https://github.com/davidpetry-cloud/live-sound-eq-sop/actions/workflows/test.yml/badge.svg)](https://github.com/davidpetry-cloud/live-sound-eq-sop/actions/workflows/test.yml)
[![pages](https://github.com/davidpetry-cloud/live-sound-eq-sop/actions/workflows/pages.yml/badge.svg)](https://github.com/davidpetry-cloud/live-sound-eq-sop/actions/workflows/pages.yml)

**Live site:** https://davidpetry-cloud.github.io/live-sound-eq-sop/

Channel EQ starting points for the **Allen &amp; Heath MixWizard WZ3 16:2**, where every value carries a record of who asserted it and what it is grounded in.

Written and designed for FOH operations by David Petry.

## The idea

A value in an operating procedure is not a fact. It is an assertion by someone, grounded in something, at a point in time. This project makes that explicit and enforces one rule in code:

> **A model can propose. Only a named human can attest.**

Not a policy statement — a constraint the data model refuses to violate. A model-sourced record can never resolve to `attested`, no matter what fields it carries.

## Three states

| State | Means |
|---|---|
| **Attested** | A named practitioner signed it, still within shelf life |
| **Proposed** | A model produced it; nobody has ratified it at a console |
| **Lapsed** | It was signed, but the shelf life ran out — re-check before using |
| **Rejected** | A practitioner reviewed it and turned it down, with the reason recorded |

Status is derived from the verification date, never stored, so **an attestation decays on its own** unless somebody re-checks it in a real room. A rejection is the exception — it does not decay, and it stands until somebody supersedes it by attesting a replacement.

Rejected values are kept, not deleted. Knowing that somebody tried something and found it wrong is worth more to the next reader than a gap where the record used to be.

Each state is rendered with a distinct colour, shape and text label, so the distinction survives colour blindness, greyscale printing and screen readers.

## Reading the page

Built for reading at the desk, in a dark room or on a phone.

- **Strip order.** Each channel's EQ reads top to bottom like the WZ3 strip: **HPF → HF → HM → LM → LF**. The dB and Hz values are the largest text on the card.
- **Response curve.** Each card sketches the strip's frequency response from the console's own filters: HPF 80 Hz at 12 dB/octave, shelves at 80 Hz and 12 kHz, sweeps at Q 1.8. Proposed and rejected curves are dashed. The numbers beside the curve are the instruction; the curve is for seeing the shape at a glance.
- **Pad.** Channels that need the PAD switch carry a solid **PAD** badge next to their name.
- **Ledger as filter.** The four state counts at the top filter the list. Search matches channel and group names.
- **Aux & effects.** Every bus, send rule, ring-out step and FX option shows its own state, with who said so (or why a model proposed it) one click away.
- **Themes.** Dark and a warm light theme. The page follows the device until you choose. The choice is kept in your browser only.
- **No third parties.** Fonts (Cormorant Garamond and Outfit, SIL Open Font License) are served from the site, so a visit makes no requests to Google or anyone else.
- **Accessibility.** Text meets WCAG 2.2 AA contrast in both themes. The page works by keyboard, reflows to 320px wide, and respects reduced motion.

## Strip simulator

[`strip.html`](https://davidpetry-cloud.github.io/live-sound-eq-sop/strip.html) puts any channel's starting point on a simulated WZ3 strip, linked from the page header.

- **Pick a channel**, then turn HPF (a latched IN/OUT switch), HF, HM, LM and LF, top to bottom as on the strip. The controls keep to the console's limits: ±15 dB in 1 dB steps, LM 35 Hz – 1 kHz, HM 500 Hz – 15 kHz, Q 1.8. Sweeps step in about a 24th of an octave and land on the panel's printed marks.
- **The curve** redraws as you turn. The dashed line is the recorded starting point; the solid line is your setting. Each band shows its starting value and what you changed (in dB and octaves), and **Reset to starting point** puts it back.
- **Trust.** A proposed, lapsed or rejected channel says so above the controls, in words. The starting point is only as good as its status.
- **Private.** Your settings live in the open tab only. Nothing is saved or sent; the address bar keeps just the channel's name.
- **Built in Dart.** The source is in `strip/` (`lib/eq.dart` holds the filter maths). `sh strip/build.sh` tests it and compiles it to `public/strip.js`, which is committed, so the Pages build needs no Dart SDK. The Dart filters match the channel cards' curves in `public/app.js` within 0.01 dB; `strip/tool/js_reference.mjs` takes reference values from `app.js` itself, and `npm test` fails if they drift.

## Current ledger

27 attested · 7 proposed · 1 lapsed · 1 rejected

All 28 signed records (the 27 attested and the 1 lapsed) carry the basis "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors." Several add a channel-specific note on top — the three synths, trumpet, trombone and alto sax among them.

The 7 proposed channels are all model-sourced and unverified, in two kinds. Cajón, congas, upright bass, banjo and fiddle were generated by a model with reasoning attached, with nothing from the practitioner behind them. Rhodes and Hammond B3 are instruments the practitioner has played and mixed, but whose specific console values haven't yet been verified on this WZ3. Both kinds are hypotheses to test at soundcheck, not starting points to dial in blind — the distinction is in the rationale text on each record.

## Console scope

| Band | Behaviour |
|------|-----------|
| HPF  | 80 Hz fixed, 12 dB/octave, pre-insert and pre-EQ, in or out only |
| HF   | Shelving, 12 kHz and above |
| HM   | Peak/dip, swept 500 Hz – 15 kHz |
| LM   | Peak/dip, swept 35 Hz – 1 kHz |
| LF   | Shelving, 80 Hz and below |
| Q    | Fixed at 1.8 on both sweeps |
| Range | ±15 dB on all four gain bands, centre-detent at 0 dB |
| Pad | 20 dB — the PAD switch selects the LINE jack, and acts as a pad on the mic XLR when nothing is plugged in |

All of the above verified against the WZ3 16:2 / 12:2 User Guide (publication AP5331) on 27 August 2026.

Correct for the **WZ3 16:2** and **WZ3 12:2**. **ZED consoles differ** — 100 Hz HPF and a different EQ layout.

## API

Read-only JSON of the channel data, published as static files with the site on GitHub Pages. Filters are part of the path, so any static host can serve them and nothing has to run per request.

| File | Holds |
|---|---|
| `api/index.json` | A map of the API: valid statuses, groups, and every file below |
| `api/channels.json` | Every channel, each flagged with its status |
| `api/channels/<status>.json` | One status: `attested`, `proposed`, `expired`, `rejected` |
| `api/channels/<group>.json` | One group: `drums`, `bass-guitars`, `vocals`, `keys-synths-horns`, `playback` |
| `api/channels/<status>/<group>.json` | Both filters together |

Every file carries `generated`, the time its statuses were resolved by the ledger's `resolveStatus()`. The Pages workflow rebuilds daily, so an attestation lapses within a day of its shelf life running out. Every channel carries its `status` next to its `bands`, so a proposed value is never returned without saying so.

```bash
curl "https://davidpetry-cloud.github.io/live-sound-eq-sop/api/channels/attested/drums.json"
```

```json
{
  "generated": "2026-10-17T05:17:00.000Z",
  "count": 6,
  "filters": { "status": "attested", "group": "drums" },
  "channels": [
    {
      "name": "KICK",
      "variant": null,
      "group": "Drums",
      "groupSlug": "drums",
      "status": "attested",
      "bands": { "hpf": "OUT", "lf": 3, "lmF": "350 Hz", "lmD": -4, "hmF": "3.5 kHz", "hmD": 3, "hf": 0 },
      "attestation": {
        "source": "practitioner",
        "by": "David Petry",
        "role": "FOH engineer",
        "basis": "David Petry's years of music and creative related experiences into live audio engineering and other technical endeavors.",
        "verified": "2026-08-25",
        "model": null,
        "rationale": null,
        "rejection": null
      }
    }
  ]
}
```

(`count` is 6 today; the example lists one channel for brevity. Gains are in dB. Model-sourced records have `by` and `verified` set to `null` and carry `model` and `rationale` instead; rejected records carry `rejection: { by, reason, reviewed }`.)

The files are written by `scripts/build-api.mjs` using `lib/channels-api.js`, the tested core that served the earlier Netlify endpoint (`/api/channels?status=&group=`), so the shape and the allowlisted fields are unchanged from that endpoint.

## Verifying a deploy

```bash
npm run verify:pages                   # GitHub Pages (production)
npm run verify:pages -- <url>          # any other copy of the site
npm run verify:pages -- --local        # a fresh build on a local throwaway server
```

Read-only checks: the page, its assets and the strip simulator serve; every file in `api/index.json` is JSON; the data is less than 48 hours old; the status files add up to the whole; a combined filter equals the intersection; no model record reads as attested; only allowlisted fields leave the ledger. Exits non-zero on any failure. `npm test` runs the same checks against a local build.

## Running it

```bash
npm install
npm run preview     # builds the page and API, then serves public/ as the site root
```

`npm run build` copies `src/` into `public/` so the page's module imports
resolve inside the published tree, and writes the JSON API to `public/api/`.
`public/src/` and `public/api/` are generated and gitignored —
`src/` remains the single source of truth.

## Architecture

The attestation engine that powers this SOP is published separately as
[`attestation-ledger`](https://www.npmjs.com/package/attestation-ledger) on
npm — a general-purpose library for expert assertions with provenance, with
zero coupling to audio. This project consumes it as a real dependency rather
than a local copy, which is the proof the extraction was genuine: the same
rule that governs a kick drum EQ value governs a bus routing policy, enforced
by code neither file can see.

## Development

```bash
npm install
npm test              # runs the full suite
npm run test:watch
sh strip/build.sh     # strip simulator: Dart tests, then compile to public/strip.js
```

The simulator needs the [Dart SDK](https://dart.dev/get-dart) (3.9 or later) only to change it.

### What the tests cover

**Physical constraints** — every value must be one the console can actually produce. Gains within ±15 dB in whole steps, LM inside its 35 Hz–1 kHz sweep, HM inside 500 Hz–15 kHz, HPF only `IN` or `OUT`, parked bands at zero gain.

**The governance rule** — models never resolve to attested, including a test that tries to smuggle a model record through with human-looking fields. Attestation requires a name and a stated basis; rejection requires a name and a stated reason. Attestations decay on schedule, rejections do not. Every proposal carries reasoning so it can be argued with.

One suite tests what is physically possible. The other tests what is procedurally permitted.

## Known gaps

- One record still carries placeholder text: the rejection on `TALKBOX · DEMONSTRATION RECORD`. The test suite reports it on every run.
- Two demonstration records exist to exercise the interface: `HOUSE MUSIC (PLAYBACK) · LEGACY RIG` (a 2021 date, for the decay path) and `TALKBOX · DEMONSTRATION RECORD` (for the rejection path). Only the TALKBOX record is flagged as a placeholder by the test suite. Delete or replace them once real records fill those states.
- With one contributor, provenance is trivially "David said so." The idea earns its keep once several practitioners contribute.

See [docs/BUILD-NOTES.md](docs/BUILD-NOTES.md) for the full reasoning behind every design decision.

## Related

- **[DJ Mixing SOP](https://github.com/davidpetry-cloud/dj-mixing-sop)**
  ([live site](https://dj-mixing-sop.netlify.app)) — procedures for running a
  DJ source through a two-sub, two-main rig. A physically different system:
  full-range XLR pass-through to standalone powered subs rather than this
  console's aux-fed sub feature.
- **[attestation-ledger](https://www.npmjs.com/package/attestation-ledger)**
  — the published engine both SOPs depend on.

## License

MIT — see [LICENSE](LICENSE).

Starting points drawn from live experience, not guarantees. Every room, rig and band is different. Gain first, EQ second, monitors third, house last.
