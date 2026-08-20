# NEXT SESSION — resume here

> Read this whole file first. **Last updated:** 2026-08-21 — core-solution fork RESOLVED; product/design docs updated.
> **✅ The open A-vs-B fork is now decided (A — a "get better" coach). The next job is the OWNER's `design.md` / `journey.md` pass to absorb the new two-path loop — NOT QA, an audit, or code.** See "RESOLVED" below.

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

## Docs updated this session (all consistent with the above)
`v1ProductDetailing.md` (Decisions 7 & 8 amended, 11 added; core-loop steps), `v1PRD.md` (§12/§13/§15/§16/§24/§25), `PRODUCT.md`, `README.md`, `design.md` (flow-change banner + Status/Roadmap). **Not touched:** `design/mockups/` code (still old flow) and `journey.md` (owner will create).

## The next thing to pick up
**Owner's `design.md` / `journey.md` pass** to absorb the two-path loop (choose-how-to-start → write-your-own default / NOD-draft+spot-the-flaw escape hatch → real feedback on their own text). The visual system in `design.md` is unchanged and reusable; only the flow/screens change. *Then* ERD + implementation plan + build (incl. the real evaluator endpoint). **No code or implementation plan yet — the design layer closes first.**

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

## Open items (secondary — after the design.md/journey.md pass)
1. ~~Resolve A vs B~~ ✅ **Done 2026-08-21** (see RESOLVED above).
2. Rework `design/mockups/` to the two-path loop (choose-how-to-start; `compose.html` → default path; spot-the-flaw beat on `draft.html`; real feedback in `feedback.html`).
3. Build the real evaluator endpoint (length-math in code + one anchored Claude call) — needs an `ANTHROPIC_API_KEY`; then run the deferred rubric discrimination test.
4. Return screen still uses the old boxed chip (eyebrow pattern not applied there).
5. Decide canonical landing (v3 vs v2); real-device mobile pass; push decision — all still pending owner OK. **Nothing pushed yet; local commits only.**
