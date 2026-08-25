# Setup

Everything below runs on **your machine**, in your own terminal. Not in Claude.

---

## 1. Confirm your tools

```bash
git --version     # any recent version is fine
node --version    # want v18 or higher
```

Missing git on macOS: run `xcode-select --install`.
Missing node: install the LTS build from nodejs.org.

## 2. Identity — use the private address, not your real inbox

Every commit permanently records the email you configure, and on a public
repo that address is scraped for phishing and credential stuffing. Rewriting
history to remove it afterwards is painful. Set it correctly the first time.

First, on github.com/settings/emails, turn on:

- **Keep my email addresses private**
- **Block command line pushes that expose my email**

The second is a safety net. If the config below is ever lost — a reset, a new
machine, a fresh clone — GitHub refuses the push instead of quietly leaking
your address.

Then:

```bash
git config --global user.name "David Petry"
git config --global user.email "304596088+davidpetry-cloud@users.noreply.github.com"
git config --global init.defaultBranch main
```

Verify:

```bash
git config --global user.email    # should echo the noreply address
git config --global user.name
```

Commits still attribute to your GitHub account. Your real inbox stays out of it.

Config only affects commits made after it is set, so if you had a different
address configured earlier and have not committed yet, there is nothing to
clean up.

## 3. Install the test runner

From inside this folder:

```bash
npm install
```

This reads package.json, downloads Vitest into node_modules/, and writes
package-lock.json. node_modules/ is gitignored and never gets committed.
package-lock.json does get committed — it is the record of which exact
versions were verified to work.

## 4. Run the tests

```bash
npm test
```

Expect 40 passing tests, plus a warning naming the records that still carry
placeholder text. That warning is deliberate. Placeholders are allowed to
exist during a build; they are not allowed to be invisible.

Now break something on purpose so you have seen it fail. Open src/data.js,
find the KICK channel, change its hmF from "3.5 kHz" to "40 kHz", and run
npm test again. It should fail and name the channel. Change it back.

A test suite you have never seen fail is a test suite you do not know works.

## 5. Look at it

The page uses ES module imports, so it must be served over HTTP. Opening it
as a file:// URL will fail silently with a blank page.

```bash
npx serve .
# then open http://localhost:3000/public/
```

Check that the four states render distinctly: attested, proposed, lapsed and
rejected. This has never been visually verified — the build environment could
not run a browser — so you are the first person to see it.

## 6. First commit

```bash
git init
git add .
git commit -m "Add Live Sound EQ SOP with attestation model and validation suite"
```

## 7. Push

On github.com: New repository, name it exactly `live-sound-eq-sop`, set it
**public**, and do NOT check "Add a README" — this repo already has one.

```bash
git remote add origin https://github.com/davidpetry-cloud/live-sound-eq-sop.git
git branch -M main
git push -u origin main
```

The build badge at the top of README.md already points at the right URL.

## 8. Continuous integration

The workflow file is already committed. Open the **Actions** tab on your repo
and you should see a run named "test" appear within a few seconds. Green means
the suite passed on a clean checkout on GitHub's machine, not just on a laptop
that happens to have the right things installed. That distinction is the whole
point of CI.

## 9. Netlify

On app.netlify.com: Add new site, Import an existing project, GitHub, pick
`live-sound-eq-sop`.

netlify.toml is already in the repo, so the settings should fill themselves in:

    Build command:      npm ci && npm test
    Publish directory:  public

Deploy. You get a URL like live-sound-eq-sop.netlify.app. Add it to the repo's
About section on GitHub, and link the repo from david-petry.netlify.app.

## 10. Prove the gate actually holds

This is the step people skip, and the only one that proves the pipeline does
anything at all.

```bash
git checkout -b test-ci
```

Break the KICK channel's hmF again, then:

```bash
git add src/data.js
git commit -m "Temporarily break kick HM to verify CI catches it"
git push -u origin test-ci
```

Open a pull request. Within a minute the Actions check goes red and the PR
shows the failure. The Netlify deploy preview fails too.

Close the pull request without merging, then clean up:

```bash
git checkout main
git branch -D test-ci
git push origin --delete test-ci
```

You have now watched the gate hold. That is CI done.

---

## The daily loop

```bash
git status                          # what changed?
git add src/data.js                 # stage specific files
git commit -m "Correct floor tom HPF to OUT"
git push
```

Write commit messages that say **why**, not what. "Fix bug" tells a reviewer
nothing. "Correct floor tom HPF to OUT — the 80 Hz filter was cutting the
fundamental" tells them everything.

## Why CI uses `npm ci` instead of `npm install`

`npm install` can quietly update dependency versions to satisfy the ranges in
package.json. `npm ci` installs exactly what package-lock.json specifies and
fails if the two disagree. On your laptop you want flexibility. In a pipeline
you want the same result every single time.

## Before making any other repo public

This repo is clean — it was scanned for credentials and email addresses before
packaging. Others may not be. Config-heavy repos are where secrets hide:

```bash
git log -p | grep -inE "aws_access_key|secret_key|password|api[_-]key|BEGIN.*PRIVATE KEY"
```

Check the history, not just the current files. Deleting a secret in a later
commit does not remove it from the log. If anything turns up, rotate the
credential — assume it is already compromised.
