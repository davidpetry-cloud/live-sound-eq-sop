# Build notes

How this was built and why, in enough detail to rebuild it from scratch or present it to a room.

---

## The problem

A live sound SOP is a list of numbers. `KICK: LF +3, LM 350 Hz −4`.

Those numbers look like facts. They are not. Each one is **an assertion by a practitioner, grounded in rooms worked and gigs mixed, at a point in time.** All of that context exists in reality and none of it existed in the data.

That gap matters more every year. As models generate more operational content, the difference between *"someone with twenty years at the desk asserted this"* and *"a model produced something plausible"* becomes load-bearing — especially where wrong guidance has consequences. Nothing in a plain SOP distinguishes the two.

## The idea

Make provenance a first-class property of every value, and enforce one rule in code:

> **A model can propose. Only a named human can attest.**

Not a policy in a README. A constraint the data model refuses to violate.

---

## Architecture

```
src/data.js          channel records, each carrying an attestation block
src/attestation.js   the state machine and the enforcement
tests/               29 tests, 18 of them on the attestation rule itself
public/index.html    interface that renders the three states differently
```

Data, logic, and interface are three separate files on purpose. The whole point is that the rule lives in `attestation.js` and cannot be bypassed by the interface, so the interface must not own the rule.

### The record shape

```js
{
  name: "KICK",
  bands: { hpf: "OUT", lf: 3, lmF: "350 Hz", lmD: -4, hmF: "3.5 kHz", hmD: 3, hf: 0 },
  attestation: {
    source: "practitioner",     // or "model"
    by: "David Petry",
    role: "FOH engineer",
    basis: "…what this is grounded in…",
    verified: "2026-08-01",
    ttlDays: 730
  }
}
```

**Decision 1 — bands are nested under `bands`, not spread flat.**
The original data had `hpf`, `lf`, `lmF` etc. as top-level keys. Nesting them separates *the claim* from *the metadata about the claim*. Without that separation you cannot iterate over the values without also iterating over the provenance, and every function has to know which keys are which.

**Decision 2 — status is derived, never stored.**
There is no `status: "attested"` field. Status is computed from `verified` plus `ttlDays` against the current date. Storing it would let a stale record keep claiming to be current forever. Deriving it means **an attestation decays on its own** unless a human re-checks it. That single choice is what turns the model from a label into a mechanism.

**Decision 3 — the model check short-circuits first.**

```js
if (a.source === SOURCE.MODEL) return STATUS.PROPOSED;
```

That line runs before any other check in `resolveStatus`. It means no combination of fields — not a real name, a real date, a convincing basis — can promote a model assertion. There is a test that tries exactly this smuggling attack and asserts it fails.

**Decision 4 — `attest()` throws rather than returning false.**
A silent refusal would be the precise failure the module exists to prevent: something quietly not happening while the caller assumes it did. Loud failure is correct here.

**Decision 5 — `attest()` returns a new record and never mutates.**
When a practitioner ratifies a model proposal, the original proposal survives in `supersedes`. You can always see what was proposed versus what a human actually signed. That is the audit trail.

**Decision 6 — rejection resolves before the model check.**
A rejected model proposal has to read as *rejected*, not *proposed*, or the reviewer's judgement disappears and the next reader cannot tell "nobody looked" from "somebody looked and said no." Letting rejection short-circuit first is safe because **a rejection can only ever make a record less trusted, never more.** It is fail-safe by construction, which is why it can outrank the check that everything else has to run after.

**Decision 7 — rejections do not decay.**
An attestation expires because a room changes and a claim goes stale. A rejection is a finding about the claim itself, and it stands until somebody supersedes it by attesting a replacement — at which point the rejection is preserved in `supersedes`.

**Decision 8 — rejected values stay in the dataset, struck through rather than deleted.**
"Somebody tried this and it was wrong, here is why" is worth more to the next reader than a gap. Deleting the record loses the finding and invites the next person to propose the same wrong thing.

---

## The three states

| State | Means | Rendered as |
|---|---|---|
| **Attested** | A named human signed it, within shelf life | Green, check mark |
| **Proposed** | A model produced it; nobody has ratified | Amber, diamond outline |
| **Lapsed** | Was signed, shelf life ran out | Red, alert circle |
| **Rejected** | A practitioner reviewed it and said no | Grey, cross, values struck through |

Colour is never the only signal — each state also carries a distinct **shape** and a **text label**, so the distinction survives colour blindness, greyscale printing, and a screen reader.

Proposed and lapsed records both show a warning panel explaining what to do about it. An empty state is an instruction, not a mood.

---

## What was faked, and what could not be

You said to pretend a step occurred if something was missing. Here is exactly where that line fell.

**Faked, and labelled as such:**
- The `basis` text on all 22 of your original channels reads `PLACEHOLDER`. I know those values are yours — you wrote them — but I do not know what they are grounded in. Inventing "fifteen years across Denver clubs" would be putting words in your mouth.
- The `verified: 2026-08-01` dates are placeholders.
- Two records were fabricated outright to exercise interface states that had no real occupant: `DJ / TRACK (LEGACY RIG)` with a 2021 date for the decay path, and `TALKBOX (DEMONSTRATION RECORD)` for the rejection path. Both say so in their own fields and both are reported by the placeholder test.
- I did not reject any of my own five proposals on your behalf. Rejection is a practitioner judgement, and manufacturing one under your name is the same category of fabrication as manufacturing an attestation. The demonstration record exists precisely so that the rejected state could be built and tested without doing that.

**Could not be faked, on principle:**
Generating EQ values and marking them attested by you. That is fabricating your professional assertions under your real name, in a tool whose entire thesis is that attestation cannot be faked. Faking it during construction would refute the project.

**So the constraint became a feature.** I contributed five genuinely new channels — cajón, congas, upright bass, banjo, fiddle — with real reasoning attached, marked `source: "model"`. They are honestly proposed and honestly unratified. **The system's first live test case is the assistant's own contribution to it.** You ratify or reject them at an actual console.

There is a test that reports how many placeholder records remain, deliberately written as a warning rather than a failure. Placeholders are allowed to exist during a build. They are not allowed to be invisible. Tighten it to `toEqual([])` once the real text is written.

---

## Test strategy

29 tests across two files. The split is meaningful:

**`data.test.js` — physical constraints.** Every value must be one the WZ3 can actually produce: gains within ±15 dB in whole steps, LM inside its 35 Hz–1 kHz sweep, HM inside 500 Hz–15 kHz, HPF only `IN` or `OUT`. These are facts about the hardware. They cannot be argued with.

**`attestation.test.js` — the governance rule.** Models never resolve to attested. Smuggled fields get rejected. Attestation requires a name and a basis; rejection requires a name and a reason. Attestations decay on schedule; rejections do not. Every proposal carries a rationale so it can be argued with.

Worth noting what happened when the rejected state was added: an existing test broke. It had asserted *"every model-sourced record resolves to proposed"* — which quietly forbade anyone from ever reviewing a model proposal. The real invariant was always narrower: **a model record may be proposed or rejected, but never attested.** The suite caught an assumption that had been wrong from the start and was only exposed by the new state. That is what a test suite is for, and it is worth saying out loud in a presentation.

The distinction is worth naming in a presentation: **one suite tests what is physically possible, the other tests what is procedurally permitted.** Most projects only have the first kind.

---

## What I could not verify

Honest gaps, so you are not surprised:

- **No browser screenshot.** The sandbox blocks Playwright's browser download, so I validated the page script with `node --check` and verified the render inputs directly, but I have not seen it render. Open it and check.
- **The interface uses ES module imports** from `../src/`, which means it must be served over HTTP, not opened as a `file://` URL. Run `npx serve .` from the project root, then visit `/public/`. If you want a true double-click-to-open file, the data has to be inlined at build time.
- **The five proposed channels are inference, not experience.** Marked as such throughout. The banjo low cut at −5 in particular is a guess.
- **The `CONSOLE` sweep ranges** were taken from your own SOP text. Check them against the manual. If they are wrong, the tests enforce a wrong constraint — worse than no test.

---

## Where this could fail

With one contributor, provenance is trivially *"David said so."* The idea only earns its keep once several practitioners contribute and you can see who asserted what. Until then it demonstrates a principle rather than running a commons.

Say that plainly in interviews. The concept is sound and the implementation is real; the network effect is not there yet. Overselling it is the only thing that would make it look worse than it is.

---

## The argument this makes

Your graduate research argues that Clyde Stubblefield never received royalties for drumming that was sampled onto high-return records — the labour was extracted and the attribution chain was severed. Congo Square is the same shape at larger scale: culture-bearer knowledge absorbed into a canon that erased who made it.

FOH knowledge moves the same way. Practitioners hand down EQ starting points informally, uncredited, until it becomes "common knowledge" with the originator gone.

This is that argument built into a data structure rather than written about. It also resolves the tension you already live with — publishing on Suno while advocating for creator rights — more usefully than either side of that argument does alone. **You use generative AI and you build the attribution layer.** That is a position you can defend by pointing at running code.

---

## Rebuilding it from nothing

1. Take any expert reference dataset where the values are assertions, not facts.
2. Nest the claims under one key, provenance under another.
3. Write a `resolveStatus` that derives state from a verification date. Order the short-circuits by whether they can raise or only lower trust — rejection first, then the model check, then everything else.
4. Write an `attest()` that throws without a name and a basis, and a `reject()` that throws without a name and a reason. Both return new records.
5. Test the rule harder than you test the data — including an attack that tries to smuggle a model record through with human-looking fields.
6. Render each state with colour **and** shape **and** text.
7. Label every placeholder and write a test that reports them.

The domain is interchangeable. Clinical protocols, safety procedures, compliance checklists, editorial standards — anywhere an expert asserts something that later gets treated as fact.
