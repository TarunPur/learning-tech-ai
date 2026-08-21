# NEXT SESSION — resume here

## ★ LATEST HANDOFF — 9-chunk UX/UI review pass DONE + committed to local (2026-08-21)

**Read this block first; the older handoffs below are kept for context.** An external agent produced a **9-chunk UX/UI review of the two-frame workspace** (`design/mockups/workspace.html`). That review is saved as **`Complete UX-UI Review.md`** (repo root) and was worked **in full, in the review's recommended order (1, 2, 5, 7, 8, 3, 4, 6, 9)**, one commit per chunk, all **committed to `feedback-pass-20aug` (local only, NOT pushed)**.

### What shipped this session (all on `feedback-pass-20aug`, local)
| Chunk | What | Commit |
|---|---|---|
| 1 | Task brief (Situation/Recipient/Context/Ask) visible in the write frame | `f7ce5b3`+`a4f7966` |
| 2 | Feedback honesty: heuristic no longer claims a full expert pass; recap derived from real outcome (No changes needed / One line tightened / Kept my wording); blue signal kept | `2ab686f` |
| 5 | Edit resets contradictory downstream state (`commitFrame`/`resetFor`) | `748c68b` |
| 7 | Responsive: recap-above-active on ≤1160px, 100dvh, overflow guards | `2aa7b1d` |
| 8 | Header hairline restored; desktop grid contained (stage 1260px, active `minmax(0,700px)`) | `ab34ef9` |
| 3 | Saved history list + Reuse (history now persists across loads) | `6d2a524` |
| 4 | One outcome-tied next-use cue (same situation, write-your-own) | `96a3eee` |
| 6 | Privacy: name masked at the evaluator boundary, unmasked for display; real name device-local | `d8fcecc` |
| 9 | Visual polish (shadows→design.md tokens, Edit hit area, textarea 168px) | `3473f76` |

Docs: `2b50536` (review doc) + `5075c67` (build log). **Working tree clean** except the untracked source briefs (leave untracked). **Nothing pushed.**

### ⚠️ Verification caveats (do not assume 100% device-tested)
- **Chunk 7 mobile is CSS/CSSOM-verified only** — the Chrome extension can't render < ~1456px. **Real-device mobile pass is still owed.**
- **Chunk 2 "tightened"/"kept" recap branches and Chunk 5 step-8** (edit-details-only resets draft) are **code-verified**, not each clicked. Low risk; walk them to close out.
- **Behavior change:** saved history now **persists across page reloads** (needed for Chunk 3). For clean demos, consider a quiet "clear" affordance — not yet built.

### 🅿️ Parked / deferred to build (owner's calls)
1. **Real evaluator** — build **after `implementation.md` is ready** (owner's explicit sequencing). Length-math in code + one anchored Claude call to replace `flow.js` `evaluateText()`; then run the deferred **rubric discrimination test** (PRD §16/§24). Chunk 2 only made the *prototype* honest; Chunk 6 masking is prototype-boundary only — **server-side masking is part of the same build.**
2. **Intake trim decision** — whether to shorten the write-your-own intake (recipient/ask/why-now). **Kept as-is for now; revisit when the evaluator spec shows which fields the rubric actually consumes.**
3. **Finish-line "skill you keep" takeaway** — was built then **reverted** this session (its clean-pass branch fabricated praise on the fake evaluator). Bring it back **wired to the real evaluator's finding**, honest across adopted/kept/clean branches. Design is in the session thread + `journey.md §6`.

### Next thing to pick up
1. (Owner test pass on this URL if wanted.) 2. **Real-device mobile** verification. 3. **`implementation.md` / ERD** → then the **real evaluator** (+ discrimination test) → then bring back the takeaway. Do not start the evaluator before `implementation.md`.

### Run it (local only, ephemeral — restart the server)
```
cd design/mockups && python3 -m http.server 8734
http://localhost:8734/landing-editorial-blue-v3.html?v=<cache-buster>
```
Continuous flow: landing → "Start with your first task" → workspace → saved. Append `?v=` when re-testing (stale-cache caveat).

---

## ★ PRIOR HANDOFF — workspace UI refinement (2026-08-22)

**First action for the next agent:** before inspecting or changing the workspace UI, load the project's design skill — `CLAUDE.md` designates **impeccable** (it ran this session's critique and is the default for design work); a **frontend-design** skill, if present, is complementary. Ground every change in `design.md` / `journey.md`, not generic component habits. Do not begin with generic component changes.

### The owner’s current design direction

The per-page app flow is now being presented as a **single persistent two-frame workspace**. The latest iterations are in `design/mockups/workspace.html` and should be viewed through the continuous entry URL:

```text
cd design/mockups && python3 -m http.server 8734
http://localhost:8734/landing-editorial-blue-v3.html?v=<cache-buster>
```

The interaction model is locked for the current design pass:

```text
Global, stable NOD brand lockup above the workspace
────────────────────────────────────────────────────
LEFT: the single immediately previous completed frame (dimmed but editable)
RIGHT: the only active frame (where the user acts now)
```

- This is the *spatial result* of a Tinder/Bumble-style left swipe, **not** a literal swipe gesture. Completing the active frame moves it left into the recap position; the old recap disappears; the next active frame arrives on the right.
- Show **only one** prior frame. Never turn this into a history stack, stepper, checklist, “Step 2 of 5,” percentage, score, or course-like workflow.
- Clicking `Edit` on the recap makes it the active right-hand frame again, preserves its values, and resets/recomputes the downstream active state so contradictory states cannot remain.
- The NOD logo/name/tagline are persistent application chrome. They must not resize, relocate, hide, or animate between frames. Treat the brand lockup as a reusable fixed component, not page content.
- The workspace is desktop-first, but mobile must stack cleanly: active work is dominant; the editable recap stays immediately above it. Never squeeze the two desktop columns side-by-side on narrow screens.

### Current visual direction and non-negotiables

- **Calm Correspondent** system remains authoritative: warm paper `#F6F5F1`, ink, restrained signal blue, Spectral only for editorial statements, Hanken Grotesk for functional UI, square cards, no glass / bevel / gradients / green or red grading cues.
- The latest UI is closer but not final. The earlier three-column version was rejected because the brand column was underused and the work was pushed too far right. Do not reintroduce it.
- Avoid “card inside card” composition. The active right frame should be a clear work surface, not a giant white panel containing multiple nested white panels.
- The left recap should be a larger, readable warm-tinted snapshot of the prior decision with a blue `Edit` action. It must look secondary, **not disabled**; do not lower text contrast via opacity.
- The choose-path frame: user-written first version is the visual default; `Start with a NOD draft` stays a quiet fallback link below it. Do not turn it back into equal buttons/cards. Exact intent: user effort first; NOD-drafts-and-tap-the-weak-line only for the genuinely stuck user.
- Intake must be conversational and reduce cognitive load. The user has three short inputs: recipient (required), one ask (required), why-now/context (optional). Reveal the questions progressively, one meaningful prompt at a time. Inputs must make the requested information unambiguous; a prior test answer “Tarun went quiet” exposed that `Who are you writing to?` was too easy to misread as task context.
- Privacy: mask real identifiers before persistence/model processing, while allowing the user’s local UI to show their original name. The reassurance must be technically truthful and calm.

### Latest visual QA findings (not abstract theory)

1. The **fixed global header** is now the correct direction: larger readable NOD mark + wordmark + tagline, consistent location above both columns, subtle hairline below. Preserve it across every workspace state.
2. The earlier oversized blank outer panel around the active area was wrong; it was removed. Keep avoiding empty white containers as fake structure.
3. The current recap/active composition works better, but copy/data mapping must be precise: recipient, situation, ask, and context must never be conflated. Example: `Tarun` = recipient; `went quiet after our demo` = context; `15-minute call` = ask.
4. The primary choice card should be fully clickable (not only a small arrow), with keyboard focus and a restrained hover lift. The fallback is text/link treatment.
5. CTA placement must remain close to the final relevant field; do not make users hunt through large vertical empty space for `Continue`.
6. BeUniq was tried as an automated UI audit. Treat it as a linting signal, **not a design director**:
   - valid: remove landing-page backdrop-blur/glass nav; switch `100vh` workspace sizing to dynamic viewport-safe `100dvh` with fallback; audit genuinely excessive shadows/glows; prevent low-contrast helper text.
   - reject: making one situation card “featured,” removing equal recognition choices, banning all font/color mixing, replacing warm paper with stark SaaS contrast, removing NOD’s intentional tagline punctuation, or claiming every current transition is `transition: all` (current relevant workspace uses property-specific transitions).
   - only the NOD logo may have a blue glow. Cards use neutral ambient shadow, never glass or glow.

### How to work with the owner in this design pass

- The owner is highly sensitive to generic AI UI. Do not bring unvetted design references, generic steppers, procurement UI, or “feature-card” advice and present it as a fit. Check visual quality, interaction model, desktop relevance, and NOD fit before sharing a reference.
- Think as a senior product designer for a user who is already struggling with real work. Every decision must reduce “what do I do next?” without turning NOD into a course or a get-it-done generator.
- Be candid. If an idea is poor or conflicts with `v1PRD.md`, `PRODUCT.md`, `design.md`, or `journey.md`, explain the concrete conflict rather than agreeing loosely.
- Before drafting a new high-consequence interaction concept, ask concise free-form clarification questions when user intent materially affects the result. Do **not** use multiple-choice question tools; the owner dislikes them.
- Make one change-set at a time; show exactly what elements were inspected. Do not broad redesign without consent. Never push or release without explicit permission.

> Read this whole file first. **Last updated:** 2026-08-22 (early) — the design direction has EVOLVED past the page-by-page flow into a **single-session two-frame WORKSPACE** (`design/mockups/workspace.html`), now the active direction. Built, critiqued (/impeccable, 28/40), UX-fixed, and merged to `feedback-pass-20aug`.
> **✅ Fork decided (get-better coach) · ✅ journey.md/design.md · ✅ page-flow mockups + polish · ✅ NEW two-frame workspace built + critiqued + fixed + merged · ✅ landing wired into the workspace (continuous landing→workspace→saved).** Next: owner test pass on the continuous flow, formally retire the page-flow + rework journey.md/design.md to the workspace model, real-device mobile, then ERD → build. **See "★ CURRENT FOCUS — the two-frame workspace" below.**

Project: **"Learning Tech & AI" v1**, brand **NOD**, at `~/Desktop/Learning Tech AI` (private GitHub `TarunPur/learning-tech-ai`). **The branch is pushed and in sync with `origin`.** Current tagline: **"Your coach against the AI slop — so the skill sticks."**

## Build state & git (this session — 2026-08-22)
The two-frame workspace described above is built and **committed on `feedback-pass-20aug`** (pushed, in sync with `origin`). Facts the design brief above doesn't cover:
- **/impeccable critique run → 28/40 "Good".** UX fixes applied + **merged (commit `20c7ab3`)**: visible compose box (was an invisible bottom-border textarea), one consistent "your message" surface across compose/feedback/saved, tappable bordered NOD-draft rows, a "one question at a time" cue on Personalize, better vertical balance. Full critique log: `~/.claude/plans/replicated-imagining-cerf.md`.
- **Landing → workspace wired:** all 5 `landing-editorial-blue-v3.html` CTAs now `href="workspace.html"`, so the continuous journey is **landing → workspace → saved** from the landing URL. The old page-flow screens (recognition/personalize/choose/compose/draft/feedback/artifact/return) still exist and work but are now **unreferenced from the landing**; the workspace is the lead direction.
- `workspace.html` **reuses `shared/flow.js`** (scenarios, `evaluateText`, state) — same journey logic, single-page presentation. The evaluator is still the **faked/heuristic** stand-in; the real one is deferred to build.
- **Open (owner's call):** formally retire the page-flow + rework `journey.md`/`design.md` to the workspace model; real-device mobile pass; build the real evaluator.

## Branch state (read first)
- **`main`** = pre-feedback baseline, commit `af99828`, **left untouched on purpose** for side-by-side comparison.
- **`feedback-pass-20aug`** (current) = all new work, now **pushed to `origin` as a backup** (2026-08-21). ~31 commits ahead of `af99828`. Working tree clean except the untracked source briefs (`Landing page*.docx/.pages`, `Learning Tech AI (1).docx`) — leave them untracked.
- Compare the two branches to see before/after. Never commit the raw survey `.xlsx` (PII, gitignored — verified untracked before the push).
- **Still pending owner OK (separate from the backup push):** canonical-landing (v3 vs v2) decision, real-device mobile pass, and any release/PR. The push was backup only — it locked in nothing.

## Hosted designs (LOCAL ONLY — ephemeral; you must restart the server)
There is **no deployed URL** — the "hosted" designs are a local static server that does **not** persist across sessions.
- **Run it:** `cd design/mockups && python3 -m http.server 8734`
- **Entry point (continuous flow):** `http://localhost:8734/landing-editorial-blue-v3.html` → "Start with your first task" now opens `workspace.html` → situation → details → choose → draft → feedback → **saved** (landing → workspace → saved, one URL). *(The old landing → recognition → personalize → … page-flow screens still exist, but the landing no longer links to them.)*
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
- **NEW `choose.html` ③** — the fork after Personalize; writes `path` ('own'|'nod'). *(Redesigned in the polish pass — see below: now two comparable option rows, not a pill + quiet link.)*
- **`compose.html` ④a** — repurposed from return-only to the **day-one default**; anchored by the user's own notes (never blank); routes through feedback; serves the return path too via `returnMode`.
- **`draft.html` ④b** — the **spot-the-flaw** beat: NOD drafts → user taps the weak line FIRST → NOD reacts → check. Dropped the old tone/phrasing chips + upfront why-notes.
- **`feedback.html` ⑤** — reads the user's **OWN** text on both paths via `flow.js` `evaluateText()` (Option-A heuristic stand-in: soft-opener / no-ask / too-long). No more planted flag. Clean-pass + guidance-only states handled. Carries an honest "prototype check" note.
- **`flow.js`** — added `path`, `workingDraftText()`, `evaluateText()`; coach-reframed scenario copy.
- **`artifact.html` ⑥** — quiet "You wrote this one" / "Started from a NOD draft" tag (Decision-11 trend). **`return.html` ⑦** — re-attempt now flows through feedback; eyebrow replaces the boxed chip. **Home/landing** — copy softened to "you write, I check".
- Verified in Chrome (desktop ≥1456px): both full paths, use-edit/keep-mine, clean-pass, no-ask guidance, path stamping. **Mobile still CSSOM-only** (tool can't render narrow) — real-device pass still owed.

## ✅ Polish pass — owner feedback (2026-08-21, very late) — all browser-verified + pushed
After the rework, the owner reviewed screens and requested these; all done:
- **Tagline changed** to **"Your coach against the AI slop — so the skill sticks."** Rolled across all 8 app screens' brand mark + `design.md` (frontmatter + Brand section). Old "Know it's good before you send…" retired to a product descriptor. Landing nav is logo-only (unaffected).
- **Landing "You improve" demo step** — added a labelled **"The skill you keep"** callout that names the transferable lesson ("End with one clear, specific ask") so the learning is explicit, not implied. Shows on the final demo step + the reduced-motion static state. (Design-hook flagged a side-tab accent border → fixed to a subtle full hairline; nothing suppressed.)
- **Landing journey-foot copy** — "NOD **checks**" → "NOD **optimizes** your draft…" (owner's word choice; I flagged that "optimizes" slightly implies NOD does the work — owner kept it).
- **`choose.html` ③ REDESIGNED** (this supersedes the "pill + quiet link" build): the left column is slimmed to just the question + reassurance (killed the left-column-vs-card redundancy); the right column is now **two comparable option rows** — text-left + a **filled CTA right** (uses the card width, no left-stranding). Both are real filled pills (solid blue "Write it myself" / blue-tint "Show me a draft") — Buy-Now/Add-to-Cart style — with the **default still clearly leading** (Recommended tag, solid blue, listed first). ⚠️ *Watch:* a more prominent fallback nudges toward the get-it-done drift (Decision 11) — the **independence-trend measurement** is the guardrail; if it sags, this screen's balance is the first knob to turn.

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
1. ~~Resolve A vs B~~ ✅ **Done**. ~~`design.md`/`journey.md` pass~~ ✅ **Done**. ~~Rework `design/mockups/` to the two-path loop~~ ✅ **Done + polished** (2026-08-21). ~~Return boxed chip → eyebrow~~ ✅ **Done**.
2. **(NEXT)** Owner test pass on the reworked flow (both paths), then real-device mobile pass.
3. Build the real evaluator endpoint (length-math in code + one anchored Claude call) — needs an `ANTHROPIC_API_KEY`; replaces `flow.js` `evaluateText()`; then run the deferred rubric discrimination test.
4. **Skill-line personalization** (build): the "skill you keep" callout must name the user's OWN learned skill, not the hardcoded demo line — see `journey.md` §6.
5. Decide canonical landing (v3 vs v2); any release/PR — still pending owner OK. **Backup push done + in sync; no release/PR made.**
6. Cross-screen copy: the "you write / I check / get sharper" idea now appears on Home + inside the cards — watch for over-repetition when the real app is built (owner flagged repetition sensitivity).
