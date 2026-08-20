# NEXT SESSION — resume here

> Read this whole file first. **Maintenance rule (CLAUDE.md): rewrite/refresh this at the END of every session.**
> **Last updated:** 2026-08-20 — implemented the full 20 Aug feedback doc on a new comparison branch.

I'm continuing my **"Learning Tech & AI" v1** product (brand **NOD**) at `~/Desktop/Learning Tech AI`
(private GitHub `TarunPur/learning-tech-ai`). **Nothing is pushed** — all work is local.

## ⚠️ Branch state — READ FIRST
- **`main`** is the pre-feedback baseline (HEAD `af99828`), **left untouched on purpose** for side-by-side comparison.
- **`feedback-pass-20aug`** (current) has **11 commits** implementing the entire "Landing page changes on 20th August" feedback doc. This is where the new work lives.
- Compare the two branches to see before/after. Neither is pushed. Owner asked to keep them comparable.
- Also present, **uncommitted/untracked**: the source briefs `Landing page (2).docx`, `Landing page changes on 20th August (2).pages`, `Landing page.docx`, `Learning Tech AI (1).docx` (left untracked intentionally; the `.docx` twins are the readable version of the `.pages`).

## Start-of-session basics
- **Read order:** `README.md` → `PRODUCT.md` → `v1ProductDetailing.md` → `v1PRD.md` → `DESIGN.md`. Don't relitigate the 10 locked decisions.
- **Design work uses the `impeccable` skill.** Preview server (restart each session): `cd design/mockups && python3 -m http.server 8734`.
- **⚠️ CACHE CAVEAT (critical for testing):** editing `shared/system.css` or `shared/flow.js` (and re-testing any screen) serves a **stale cached file** in the browser. When verifying via browser automation, **append a cache-buster query** (`?v=whatever`) to the page URL — that forces a fresh fetch of the HTML *and* revalidates `flow.js`. Or hard-refresh (Cmd+Shift+R). This bit me repeatedly this session.
- **Chrome viewport limit:** extension can't render below ~1456px, so **mobile is CSSOM-verified only**.

## Brand & design system (LOCKED)
- **NOD**, tagline "Know it's good before you send — and get sharper each time." Banned in UI: bench / learn / course / lesson / grade / score / quiz / streak.
- **"The Calm Correspondent":** warm paper `#F6F5F1`, ink `#1A1A1A`, ONE Signal Blue `#2F6FE0` (no green/red), Spectral serif for statements, Hanken Grotesk for UI, square floating cards, editorial whitespace. Canonical: `DESIGN.md` + `design/mockups/shared/system.css`.

## What the feedback pass shipped (on `feedback-pass-20aug`)
**Part A — Landing (`landing-editorial-blue-v3.html`), commits "Landing chunk 1–3b":**
new hero headline + one consistent CTA "Start with your first task" + one approved masking line + inline research proof cue; 3 "uniquely powerful" cards with drawn icons + bigger body; ChatGPT demo pause-on-hover + Stage-3 caption + reduced-motion + a11y fix; research cards relabelled "Insight from research" (no testimonial styling) + framed source strip; a 4-Q FAQ; honest footer (real links work, rest marked "soon"); nav "Sign in" → acquisition CTA.

**Part B — App flow (P0 #1–5), commits "App chunk 4–9" + "Chunk 10":**
- **NEW `design/mockups/shared/flow.js`** — the state layer: `NOD.store` (localStorage key `nod.flow`), a `SCENARIOS` registry (`quiet`/`cold`/`meeting`/`event`/`custom`) with per-situation copy + draft content, `composeDraft()`, `SOFT_FLAG`/`FLAG_WHY`, `ASK_SUGGESTIONS`, `firstName()`, `currentSituationLabel()`.
- **NEW `design/mockups/compose.html`** — the unaided return composer (P0 #3): plain textarea, no guided annotations, "Ask NOD for help" secondary routes into the guided flow prefilled.
- Every screen now **hydrates from state on load and writes on advance**: Recognition persists the chosen scenario (cards carry `data-scenario`; escape → `custom` + typed text); Personalize binds chip/heading/placeholders + ask-suggestion chips + writes who/ask/ctx; Draft renders opener/ask/recipient from state, "Two details you control", goal-preserving ask, persists an exact **snapshot**; Feedback reads that snapshot so it flags the **same** message (P0 #2), with differentiated Use-edit vs Keep-mine paths (never "nothing left to fix"); Artifact renders the finished message + first-vs-returning history, real **Reuse** buttons, consistent privacy copy, dev "nudge" reframed as a labelled prototype control; Return reflects the last scenario + reassurance + dismiss/snooze.

**Flow map (all wired):** landing → recognition → personalize → draft → feedback → artifact → (return → compose | reuse → personalize).

## Delegated calls I made (flag for owner sign-off)
1. Nav "Sign in" → "Start with your first task" (no auth exists). 2. Footer unavailable links marked "soon" (not fully-built legal pages). 3. Artifact "Preview a later nudge" → a clearly-labelled **PROTOTYPE** control (kept so the walkthrough stays navigable). If owner wants the heavier version of any, revisit.

## Detector state
- `.impeccable/config.json`: project-wide `flat-type-hierarchy` ignore + old-landing marquee/buzzword ignores (unchanged).
- Standing **advisory only** (not a bug): em-dash saturation — landing 16, artifact 8. Trimmed from 21; rest is legitimate editorial use.

## Open items / what to pick up
1. **Owner review** of the feedback-pass branch vs main (that was the point of the branch). Then decide whether to merge into `main`.
2. **Sign off (or adjust)** the 3 delegated calls above.
3. **Refresh `DESIGN.md`** — it now predates `shared/flow.js`, the state model, `compose.html`, and the landing v3 patterns. Document them.
4. **Decide canonical landing** (v3 vs v2) — v3 is the entry and now carries all the feedback work.
5. **Real-device mobile pass** (tooling can't render narrow).
6. **Push?** — everything is local only.

## How the owner works
- Owns aesthetic/copy calls (don't offer menus); ground in users/PRD; build variations to see; prefers the **live localhost link** over screenshots. **Incremental commits; NEVER push without explicit OK; never commit the raw survey `.xlsx` (PII).** Give a plain-language recap alongside technical ones. Copy guardrails: sell utility not "learning"; banned UI words; claim quality never outcome; one blue no green; English-only v1; desktop-primary.
