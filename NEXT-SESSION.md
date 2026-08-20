# NEXT SESSION — resume here

> Read this whole file first. **Last updated:** 2026-08-21 (late) — **design layer CLOSED**: `journey.md` written, `design.md` reworked to the two-path loop, flow-change banner retired.
> **✅ The A-vs-B fork was decided (A — a "get better" coach) AND the design.md/journey.md pass is now DONE.** The next job is the **mockup rework** in `design/mockups/` to the two-path flow — then ERD → implementation plan → build. Still NO code was written this pass (design layer only). See "Design layer — DONE" below.

Project: **"Learning Tech & AI" v1**, brand **NOD**, at `~/Desktop/Learning Tech AI` (private GitHub `TarunPur/learning-tech-ai`). **The branch is now pushed** (backup — see Branch state).

## Branch state (read first)
- **`main`** = pre-feedback baseline, commit `af99828`, **left untouched on purpose** for side-by-side comparison.
- **`feedback-pass-20aug`** (current) = all new work, now **pushed to `origin` as a backup** (2026-08-21). ~31 commits ahead of `af99828`. Working tree clean except the untracked source briefs (`Landing page*.docx/.pages`, `Learning Tech AI (1).docx`) — leave them untracked.
- Compare the two branches to see before/after. Never commit the raw survey `.xlsx` (PII, gitignored — verified untracked before the push).
- **Still pending owner OK (separate from the backup push):** canonical-landing (v3 vs v2) decision, real-device mobile pass, and any release/PR. The push was backup only — it locked in nothing.

## Hosted designs (LOCAL ONLY — ephemeral; you must restart the server)
There is **no deployed URL** — the "hosted" designs are a local static server that does **not** persist across sessions.
- **Run it:** `cd design/mockups && python3 -m http.server 8734`
- **New build (this branch), entry point:** `http://localhost:8734/landing-editorial-blue-v3.html` → click through the whole flow (landing → recognition → personalize → draft → feedback → artifact → return/compose).
- **Baseline for comparison:** check out `main` (or add a git worktree) and serve on a different port (e.g. 8735).
- **⚠️ Cache caveat:** editing `shared/system.css` or `shared/flow.js` serves a **stale cached file** in the browser — append a `?v=<anything>` query to the page URL when re-testing (forces a fresh fetch of the HTML *and* revalidates flow.js), or hard-refresh.
- **Chrome viewport limit:** the extension can't render below ~1456px → mobile is CSSOM-verified only.

## ✅ RESOLVED (2026-08-21) — the core-solution fork
The guided loop made the user a **passive spectator** (NOD wrote, checked, and fixed → no real learning, breaking "you get *better*, not just handed a message"). After a `/grill-me` working session grounded in the raw survey (n=160), the owner decided:

- **Spine = A, a "get better" coach** (not B, a get-it-done assistant). Effort is required, help **fades**, winning = the user needs NOD **less**. Not Grammarly (no always-on inline fixing). → new **Decision 11**.
- **Two entry paths, user's choice; DEFAULT = write your own draft.** Escape hatch = **NOD drafts it → user spots what's weak first** (serves the 36% "where do I start"). Both end at the same rubric feedback. The old "AI-led first attempt" is now the escape hatch, not the default. → **Decision 7 amended**. The relocation of effort from *blank-page drafting* to *judgment/spot-the-flaw* is what answers the adoption worry (never sell "practice"; make the effort produce today's real message).
- **The rubric now reads the user's OWN draft** (not only a NOD-authored one). Hybrid: length/structure in code + anchored model call for the reading-comprehension criteria (must quote the exact line). → **Decision 8 clarified**.
- **Two measurement reads:** the existing capability-delta (getting-better) + a secondary **choice/independence trend** (does the user reach for write-your-own more over time?).

**Survey evidence that grounded this (n=160):** #1 blocker "don't know where to start" (53) → never a blank page on day one; #2 "don't get enough practice" (52) + 120 want "learn by solving real-life challenges" + 58 want "a guide who helps when I'm stuck" → the coach spine; WTP soft "maybe if it genuinely helps me" → won't pay for another generator, only for genuine improvement.

**⚠️ Consciously deferred (owner's call — demo first):**
1. **Rubric discrimination test NOT run** (does it reliably tell good outreach from bad? — PRD §16/§24). Stress-test right after the demo. A weak rubric silently invalidates the experiment.
2. **The real check needs a real backend** (an evaluator endpoint: length-math in code + one anchored Claude call). The `design/mockups/` prototype currently **fakes** the check (plants a known flaw in NOD's own draft and "finds" it) — this collapses on the write-your-own path. Real evaluator to be built with the app.

## ✅ Design layer — DONE (2026-08-21, late)
The `design.md` / `journey.md` pass is complete. Order followed (peer-agreed): leave the visual system alone → write `journey.md` first → rework only the flow-dependent parts of `design.md` → retire the banner last.

- **`journey.md` (NEW)** = the canonical flow spec (the *what happens*). Owns the two-path loop screen-by-screen: Home ① → Personalize ② → **Choose how to start ③** → [Write your own ④a *default*] / [NOD drafts + **spot-the-flaw** ④b *fallback*] → **Feedback on your own words ⑤** → Saved ⑥ → Later ⑦. Traces every Decision 6–11 to a screen; flags what's deferred-to-build.
- **`design.md` (REWORKED)** = now purely the *visual system + component library* (the *how it looks*). Visual system untouched. Re-anchored screen-numbered components to named anchors; added two components — **Path-choice** (unequal-weight fork, never 50/50) and **Tap-the-weak-line** (spot-the-flaw, reuses the neutral marker); Status/Roadmap maps the mockups to the new screens; the alarmist flow-change banner is retired to a calm one-line pointer to `journey.md`.

**Resolved design calls (owner delegated):**
- **Spot-the-flaw = tap the weak line** (tap the sentence a busy reader trips on, or "I'm not sure"). Chosen over type-a-critique (reintroduces a blank page) and pick-from-a-menu (guessy).
- **Choose-how-to-start** = loud write-your-own default + quiet "let NOD draft one" link — never two equal buttons.
- **The fork sits after Personalize** (both paths need the intake), correcting the old "after the situation is picked" wording.

Earlier this session (before the design layer): `v1ProductDetailing.md` (Decisions 7 & 8 amended, 11 added), `v1PRD.md` (§12/§13/§15/§16/§24/§25), `PRODUCT.md`, `README.md`.

## ✅ Mockup rework — DONE (2026-08-21, late) — browser-verified, both paths
The six `design/mockups/` now match the two-path loop in `journey.md`. Serve: `cd design/mockups && python3 -m http.server 8734`; entry `http://localhost:8734/landing-editorial-blue-v3.html` (append `?v=x` cache-buster when re-testing edited screens).
- **NEW `choose.html` ③** — the fork after Personalize; loud "Write your first version" pill + quiet "let NOD draft one" link (never 50/50). Writes `path` ('own'|'nod').
- **`compose.html` ④a** — repurposed from return-only to the **day-one default**; anchored by the user's own notes (never blank); routes through feedback; serves the return path too via `returnMode`.
- **`draft.html` ④b** — the **spot-the-flaw** beat: NOD drafts → user taps the weak line FIRST → NOD reacts → check. Dropped the old tone/phrasing chips + upfront why-notes.
- **`feedback.html` ⑤** — reads the user's **OWN** text on both paths via `flow.js` `evaluateText()` (Option-A heuristic stand-in: soft-opener / no-ask / too-long). No more planted flag. Clean-pass + guidance-only states handled. Carries an honest "prototype check" note.
- **`flow.js`** — added `path`, `workingDraftText()`, `evaluateText()`; coach-reframed scenario copy.
- **`artifact.html` ⑥** — quiet "You wrote this one" / "Started from a NOD draft" tag (Decision-11 trend). **`return.html` ⑦** — re-attempt now flows through feedback; eyebrow replaces the boxed chip. **Home/landing** — copy softened to "you write, I check".
- Verified in Chrome (desktop ≥1456px): both full paths, use-edit/keep-mine, clean-pass, no-ask guidance, path stamping. **Mobile still CSSOM-only** (tool can't render narrow) — real-device pass still owed.

## The next thing to pick up
1. **Owner test pass** on the reworked flow (both paths) → collect fixes.
2. **Real-device mobile** verification (tool can't render narrow).
3. Then **ERD + implementation plan + build** — **including the real evaluator endpoint** (length-math in code + one anchored Claude call to replace the `evaluateText()` heuristic), then run the deferred rubric discrimination test. Do not start ERD/build before the reworked mockups are signed off.

**Build note (logged 2026-08-21):** the landing demo's **"The skill you keep"** callout (and the feedback step's takeaway) is currently a hardcoded line ("End with one clear, specific ask"). In the built product it must **name whichever skill the user's own fix actually taught**, derived from the real evaluator's finding on their own words — never a fixed line. See `journey.md` §6.

## How to work with the owner (important)
- **Plain, simple, non-jargon language.** No "rounds/frontier/rubric/B1" unless you explain them.
- **Free-form questions, not multiple-choice** (the owner repeatedly rejected the multiple-choice question tool).
- **One decision at a time.** Think hard and push back — the owner found every hole in the reasoning above; match that rigor, don't hand-wave.
- Owner owns aesthetic/copy/product calls; ground them in users/PRD. **Incremental commits; NEVER push without explicit OK.** Give plain-language recaps.

## What shipped + committed this session (on `feedback-pass-20aug`)
All browser-verified. Read order for product context: `README.md` → `PRODUCT.md` → `v1ProductDetailing.md` → `v1PRD.md` → `DESIGN.md`.

**Landing (`design/mockups/landing-editorial-blue-v3.html`):**
- Two-column hero with an **original animated SVG scene** ("How NOD helps": bring a real task → NOD checks it → you get sharper), grounded, reduced-motion fallback.
- "Then why not ChatGPT?" = a **watchable 3-step progress demo** (your draft → checked vs the standard → you improve), Tarun copy.
- Research "We asked" cards → **per-participant data cards** (Daily AI use / Use case pattern / Learning blocker) in a **right-to-left marquee**, no avatars, no numbers.
- **FAQ = expandable accordion**; heading "A few questions asked by our partner users".
- Honest footer ("soon" tags), stronger source strip, one consistent CTA "Start with your first task".
- Detector marquee ignore scoped to this file (owner-requested scroll).

**App flow:**
- **`shared/flow.js`** = state layer (localStorage `nod.flow`) + `SCENARIOS` registry + `classifyTask()`.
- **Soft funnel (PRD §13):** free-text task is classified — outreach maps to the nearest situation (right questions); off-scope (e.g. "draft a proposal") gets a **warm boundary** + "Remember I asked for this" + a "shape it as a message anyway" override.
- **Selected-task eyebrow** ("YOUR TASK · … · Change") on Personalize and Draft, replacing the boxed chip + back link.
- **Copy guard:** coaching "Why…" notes stay visible but are **never copied** (user-select:none + a copy-event that clips the clipboard to the message only).
- Draft CTA → **"Check it against the standard"** (was the confusing "Review one suggested change").
- Earlier in the session: the full feedback-doc pass (Part A landing + Part B app-flow P0 fixes: scenario/draft persistence, feedback-on-exact-draft, unaided return composer `compose.html`, artifact truthfulness).

**Key commits (newest first):** `6175752` draft CTA · `fc5ad9a` copy guard · `1cde60a`/`dadcbb8`/`fa43978` eyebrow · `2932d6e` soft funnel · `21017cf`/`5a3e107` FAQ accordion · `87beb39`/`2709f71` research cards+marquee · `1a18571` hero scene + ChatGPT journey + sources marquee · `1e1ae32` chunk-10 verify · `654cca0`…`abb093f` app chunks 4–9 · `7e901b1`…`22c86c5` landing chunks 1–3b.

## Open items
1. ~~Resolve A vs B~~ ✅ **Done 2026-08-21**. ~~`design.md`/`journey.md` pass~~ ✅ **Done 2026-08-21** (see "Design layer — DONE").
2. **(NEXT)** Rework `design/mockups/` to the two-path loop per `journey.md` (choose-how-to-start ③; `compose.html` → default ④a; tap-the-weak-line beat on `draft.html` ④b; real feedback in `feedback.html` ⑤).
3. Build the real evaluator endpoint (length-math in code + one anchored Claude call) — needs an `ANTHROPIC_API_KEY`; then run the deferred rubric discrimination test.
4. Return screen still uses the old boxed chip (eyebrow pattern not applied there).
5. Decide canonical landing (v3 vs v2); real-device mobile pass; any release/PR — all still pending owner OK. **Backup push done; no release/PR made.**
