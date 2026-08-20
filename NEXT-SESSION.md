# NEXT SESSION — resume here

> Read this whole file first. **Last updated:** 2026-08-21 — end of a long design + product-debate session.
> **⛔ Do NOT start QA, an audit, or "fixing" anything on handoff. Read the OPEN PROBLEM below first — the core solution is UNRESOLVED, and the owner must decide a fork before any more building.**

Project: **"Learning Tech & AI" v1**, brand **NOD**, at `~/Desktop/Learning Tech AI` (private GitHub `TarunPur/learning-tech-ai`). **Nothing is pushed** — all work is local.

## Branch state (read first)
- **`main`** = pre-feedback baseline, commit `af99828`, **left untouched on purpose** for side-by-side comparison.
- **`feedback-pass-20aug`** (current) = all new work, **24 commits** ahead of `af99828`, **local only, nothing pushed**. Working tree clean except the untracked source briefs (`Landing page*.docx/.pages`, `Learning Tech AI (1).docx`) — leave them untracked.
- Compare the two branches to see before/after. Never commit the raw survey `.xlsx` (PII, gitignored).

## Hosted designs (LOCAL ONLY — ephemeral; you must restart the server)
There is **no deployed URL** — the "hosted" designs are a local static server that does **not** persist across sessions.
- **Run it:** `cd design/mockups && python3 -m http.server 8734`
- **New build (this branch), entry point:** `http://localhost:8734/landing-editorial-blue-v3.html` → click through the whole flow (landing → recognition → personalize → draft → feedback → artifact → return/compose).
- **Baseline for comparison:** check out `main` (or add a git worktree) and serve on a different port (e.g. 8735).
- **⚠️ Cache caveat:** editing `shared/system.css` or `shared/flow.js` serves a **stale cached file** in the browser — append a `?v=<anything>` query to the page URL when re-testing (forces a fresh fetch of the HTML *and* revalidates flow.js), or hard-refresh.
- **Chrome viewport limit:** the extension can't render below ~1456px → mobile is CSSOM-verified only.

## ⚠️ THE OPEN PROBLEM — unresolved, do NOT build against it
The guided loop makes the user a **passive spectator**: NOD writes the draft, NOD checks it against the standard, NOD says the one thing to tighten. The user only picks a situation, types 3 intake lines, and taps. **So there's no real learning and no felt value** — which breaks NOD's whole promise ("capable, not taught"; you get *better*, not just handed a message).

We tried to fix it and hit a wall — every fix died to the next objection (the owner caught each one):
1. NOD writes everything → user learns nothing.
2. So make the user write → **nobody drafts from scratch anymore; they use ChatGPT.**
3. So let them paste ChatGPT's draft into NOD → **two tools for one email, dead at ~10 emails/day.**
4. So make NOD live inline like Grammarly → **always-on fixing breeds dependence** (output improves, the person's own skill atrophies), which kills the "makes you better" promise.

**Root contradiction (the real problem, not a missing feature):** *learning needs friction* (the user must do the work, struggle a little, and need help *less* over time) — but *fitting into a busy person's day needs zero friction* (fast, automatic, always there). You can't max both.

**The fork the OWNER must decide before anything else:**
- **A — a "get better" coach.** A little effort is okay; people come *to improve*; help **fades**; winning = they stop needing it. → Hard part: **adoption** (why would a busy person choose to practice?). *Almost everything in the research + PRODUCT.md/PRD points here — it's the edge over ChatGPT.*
- **B — a "get it done" assistant.** Frictionless, inline, always-on; winning = daily use. → Hard part: **honesty** — it will create some dependence like every assistant, and "makes you better" shrinks to marketing.

**No solution is settled. Do not design screens or run QA until A vs B is chosen.** Next session's first job: resume this with the owner.

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

## Open items (secondary — only after the A/B fork is resolved)
1. **Resolve A vs B** (the OPEN PROBLEM) — everything else waits on this.
2. Return screen still uses the old boxed chip (eyebrow pattern not yet applied there).
3. `DESIGN.md` predates `flow.js` / `compose.html` / the state model / the landing v3 patterns — refresh once direction is set.
4. Decide canonical landing (v3 vs v2); real-device mobile pass; push decision — all still pending owner OK.
