# NOD — v1 Implementation Plan (airtight build spec)

**Audience:** the engineer/agent who will build NOD v1. Follow this file **top to bottom, one phase at a
time.** Every phase has a **Definition of Done (DoD)** — a command or check with an expected result. **Do
not start a phase until the previous phase's DoD passes.** Do not redesign anything; port the locked design.

**Source-of-truth docs (read in this order before Phase 0):**
1. `README.md` → `PRODUCT.md` → `v1ProductDetailing.md` (the 11 locked decisions — do not relitigate)
2. `v1PRD.md` (requirements; **§13** off-scope funnel, **§14** events, **§16** the rubric — memorize the 5 criteria)
3. `journey.md` (the LOCKED flow: the two-frame workspace + the coaching loop)
4. `design.md` (the LOCKED visual system + components)
5. `ERD.md` (the data model + the migration SQL)
6. This file.
The **canonical UI + logic to port** is `design/mockups/workspace.html` + `design/mockups/shared/flow.js` +
`design/mockups/shared/system.css`, and the marketing page `design/mockups/landing-editorial-blue-v3.html`.

---

## Amendments (owner, 2026-08-21 — override the sections below where they conflict)

1. **Evaluator model = `claude-opus-4-8`** (Claude Opus 4.8), not the `claude-opus-5` default named in Phase 5 /
   Appendix. Same $5/$25-per-MTok tier as Opus 5, current (not deprecated) — verified against the live model
   table via the `claude-api` skill. `NOD_EVALUATOR_MODEL` defaults to `claude-opus-4-8`; still owner-configurable,
   still flag the cost/latency tradeoff rather than silently changing it again.
2. **Google sign-on is required** — it's the way users sign in and use NOD, not an optional provider among
   several. Phase 2 already builds Google OAuth + email magic-link as a fallback; Google is the primary/must-work
   path. Get the OAuth client id/secret before Phase 2's DoD can pass.
3. **Analytics ships after the core build, not inline.** The PRD §14 / ERD `events` table instrumentation
   (Phase 8) is **deferred to a follow-up pass after the rest of implementation.md is done** — build the full
   product loop (Phases 0–7, 9–13) first, wire in the six-event instrumentation afterward. Phase 9 (nudge +
   unaided re-attempt) still ships its **product mechanics** (nudge UI, the unaided flow, thinner scaffolding) on
   schedule; only its event-emission calls (`unaided_started`/`unaided_completed`) move into the deferred
   analytics pass along with the rest of Phase 8. Do not let this block Phase 11 (discrimination test) or
   Phase 12 (build/test/deploy) — those don't depend on the events table being wired.

---

## Prime directives (do not violate — from the owner's standing rules + the locked decisions)

1. **Never use TypeScript `any`.** Always real types. `strict: true`.
2. **Write tests for every feature** (Vitest). No feature ships without tests. Run build + tests before
   staging anything.
3. **The masking invariant (ERD.md):** no raw recipient name / company identifier is ever stored or sent to
   the model. Masking happens **client-side before any network call**; server routes re-validate. The real
   name lives only in the browser.
4. **Never show a score, grade, checklist, "X/5", or pass/fail colour.** Feedback is 1–2 concrete fixes.
   (PRD §16, Decision 8.) **Banned UI words:** course, lesson, learn, grade, score, quiz, streak, bench.
5. **No green/red.** One blue only (design.md — "The One Blue Rule"). Fix-targets use the neutral marker.
6. **Claim quality by the standard, never an outcome** ("strong by expert standards," never "this will get
   a reply"). (PRD §16.)
7. **Do the design as a faithful port** of `workspace.html` — same tokens, same components, same
   interaction model. This is not a redesign.
8. **Commit per phase** (small, incremental). **Never `git push` or deploy without the owner's OK** — except
   the one explicit exception in Phase 13 (pushing the locked design/docs commit), which the owner has
   pre-authorized.
9. **If genuinely blocked** (a real ambiguity that changes the outcome, or a missing secret), stop and ask
   in plain language — don't guess on high-consequence choices (schema, auth, the rubric).

---

## Tech stack (pinned — do not substitute)

| Concern | Choice |
|---|---|
| Framework | **Next.js (App Router, React Server Components)** — `npx create-next-app@latest`, TypeScript, App Router, Tailwind, ESLint |
| Language | TypeScript, `strict: true`, no `any` |
| Styling | **Tailwind CSS** + CSS variables for the design tokens |
| DB + Auth | **Supabase** (Postgres + Auth + RLS). Client: `@supabase/ssr` + `@supabase/supabase-js` |
| LLM | **Anthropic API**, server-side only, `@anthropic-ai/sdk`. Default model `claude-opus-5` (see Phase 5 note on the cheaper-model owner decision) |
| Fonts | Spectral + Hanken Grotesk (Google Fonts via `next/font`) |
| Tests | **Vitest** (+ `@testing-library/react` for component tests) |
| Deploy | **Vercel** (do not deploy without owner OK) |

**Env vars** (`.env.local`, and set in Vercel later):
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...        # server only, never exposed to the client
ANTHROPIC_API_KEY=...                # server only
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Phase 0 — Project scaffold

**Goal:** a running Next.js app with Tailwind, TS strict, and the repo wired.

Steps:
1. In `~/Desktop/Learning Tech AI`, create the app **in a new `app/` subfolder** so the existing docs +
   `design/mockups/` stay at the repo root: `npx create-next-app@latest app` (TypeScript ✔, App Router ✔,
   Tailwind ✔, ESLint ✔, `src/` dir ✔, import alias `@/*` ✔). *(If the owner prefers the app at repo root,
   ask first — default is `app/`.)*
2. In `app/tsconfig.json` confirm `"strict": true`. Add `"noUncheckedIndexedAccess": true`.
3. Add an ESLint rule banning `any`: extend with `@typescript-eslint/no-explicit-any: "error"`.
4. Install deps: `@supabase/ssr @supabase/supabase-js @anthropic-ai/sdk`; dev: `vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react`.
5. Create `app/.env.local` from the block above (fill Supabase + Anthropic values — create a Supabase
   project at supabase.com first; get the Anthropic key from the owner or `ANTHROPIC_API_KEY` if already set).
6. Configure Vitest: `app/vitest.config.ts` (jsdom env, React plugin), and a `test` script in `package.json`.

**DoD:** `cd app && npm run dev` serves `http://localhost:3000` with the default page; `npm run build`
succeeds; `npm test` runs (0 tests OK). Commit: `chore: scaffold Next.js app (TS strict, tailwind, supabase, anthropic)`.

---

## Phase 1 — Database schema

**Goal:** the `ERD.md` schema applied with RLS.

Steps:
1. Copy the migration from **`ERD.md` → "The migration"** into `app/supabase/migrations/0001_init.sql`.
2. Apply it: paste into the Supabase SQL editor and run, **or** `supabase db push` if the CLI is linked.
   (CLI login is interactive — if in a non-TTY, ask the owner to run it, or use the SQL editor.)
3. In Supabase → Auth, enable **Google** provider (get OAuth client id/secret; redirect
   `${NEXT_PUBLIC_SITE_URL}/auth/callback`) and **Email (magic link)** as a fallback.
4. Run the Supabase **Advisor**; resolve any "security definer executable by anon" warning (the migration
   already `revoke`s it — confirm no anon grant remains).

**DoD:** all 7 tables exist with RLS enabled (Supabase → Database → check policies); inserting a row as an
anonymous client is rejected; the `on_auth_user_created` trigger creates a `profiles` row on a test signup.
Commit: `feat(db): apply v1 schema with RLS`.

---

## Phase 2 — Auth (Supabase, server-side sessions)

**Goal:** sign-in with Google (magic-link fallback); the workspace is behind auth; sessions via cookies.

Build (follow the current `@supabase/ssr` Next.js App Router pattern — **invoke the `supabase` skill for the
exact, current SSR client code**; do not hand-roll cookie handling):
1. `src/lib/supabase/server.ts` (server client), `src/lib/supabase/client.ts` (browser client),
   `src/middleware.ts` (refreshes the session; protects `/app/*`).
2. Auth routes: a sign-in page (`/signin`) with "Continue with Google" + email magic-link; `/auth/callback`
   route handler that exchanges the code and redirects to `/app`.
3. A server helper `getUser()` that returns the authenticated user or redirects to `/signin`.

**DoD:** visiting `/app` unauthenticated redirects to `/signin`; completing Google sign-in lands on `/app`
with a session that survives refresh; sign-out works. Commit: `feat(auth): supabase google + magic-link auth`.

---

## Phase 3 — Design tokens → Tailwind, base primitives

**Goal:** the Calm Correspondent system available as Tailwind theme + CSS variables, ported 1:1 from
`design.md` + `design/mockups/shared/system.css`. **Do not invent new colors/spacing.**

Steps:
1. Define CSS variables in `globals.css` from `design.md` frontmatter (`--bg #F6F5F1`, `--card`, `--ink`,
   `--ink-2/soft/faint`, `--line`, `--line-2`, `--blue #2F6FE0`, `--blue-deep #1E52B0`, tints, shadows) —
   copy the exact values from `workspace.html`'s `:root`.
2. Map them into `tailwind.config.ts` `theme.extend.colors` (paper, card, ink, ink-soft, ink-faint, line,
   blue, blue-deep …) and add the two shadow tokens (`sh-card`, `sh-lift`).
3. Load fonts with `next/font/google`: Spectral (400/500/600 + italic 600) and Hanken Grotesk (400–800).
   Expose as `font-serif` (Spectral) and `font-sans` (Hanken).
4. Build base primitives as React components matching `design.md`: `<Button>` (pill; `variant="ghost"`),
   `<Card>` (square, ambient shadow, hover lift), the bottom-border `<Field>`, `<Chip>`, and the pinned
   `<BrandHeader>` (sticky). Keep square corners; one blue; ≥44px tap targets.

**DoD:** a `/style-check` page renders the brand header, a situation-style card, a pill button, a field, and
a chip that **visually match** `workspace.html` (compare side by side). No green/red anywhere. Commit:
`feat(ui): port NOD design tokens + base primitives`.

---

## Phase 4 — Masking + flow state + the workspace shell

**Goal:** the masking module, the ported flow state, and the empty two-frame workspace shell.

Steps:
1. **Masking** (`src/lib/masking.ts`): port `maskName`/`unmaskName` from `workspace.html`, generalized:
   given the user's known recipient name (and optionally a company token they typed), return masked text.
   `mask(text, tokens[])` replaces each token (word-boundary, case-insensitive) with `[name]`/`[company]`;
   `unmask(text, map)` reverses it for display/copy. **Unit-test it** (a name inside a sentence, multiple
   occurrences, no-op when token empty). This runs **client-side before any fetch**.
2. **Flow state** (`src/lib/flow.ts`): port `flow.js` — `SCENARIOS` (quiet/cold/meeting/event/custom with
   their intake copy), `ASK_SUGGESTIONS`, `classifyTask()` (the soft funnel), `firstName()`, and the
   scenario ids. Keep the ids identical to `ERD.md`'s `scenario` enum. **Drop** the fake `evaluateText()` and
   the planted-flaw `composeDraft()` — those become server calls (Phase 5/6). Type everything.
3. **Workspace shell** (`/app` route): the pinned `<BrandHeader>`, the two-column grid (recap left / active
   right), top-anchored, with the responsive stack (≤1160px) — port the layout/CSS from `workspace.html`
   exactly (see `design.md` → "Two-Frame Workspace"). A client-side state machine holds the frame order
   `['situation','details','choose','draft','feedback','saved']`, `activeIndex`, and the per-attempt draft
   state (scenario, path, who, ask, ctx, ownText, checkCount, …), mirroring `workspace.html`'s state object.
   Recap Edit re-activates a frame and resets contradictory downstream state (port `resetFor`/`commitFrame`).

**DoD:** `/app` shows the pinned header + the situation frame (four cards + "Something else?" escape) and can
navigate situation → details → choose → (empty) draft frame, with the left recap updating. Masking unit
tests pass. No network calls yet. Commit: `feat(workspace): masking, flow state, two-frame shell`.

---

## Phase 5 — The real evaluator endpoint (the crux — replaces the fake check)

**Goal:** a server route that evaluates *arbitrary* user text against the fixed standard (PRD §16), hybrid:
**B4 computed in code**, **B1/B2/B3/B5 via one anchored Claude call**, returning per-criterion pass/needs-work
**with the exact quote**, then the core/advisory verdict and the 1–2 highest-impact misses.

> **Model note (owner amendment, 2026-08-21 — supersedes the original default below):** default to
> **`claude-opus-4-8`** (Claude Opus 4.8), not `claude-opus-5`. This evaluator is called on every "Check," so
> cost/latency matter — **whether to use the cheaper `claude-sonnet-5` or `claude-haiku-4-5` is the owner's
> call, not a silent downgrade.** Implement it model-configurable via an env var `NOD_EVALUATOR_MODEL`
> (default `claude-opus-4-8`) and surface the tradeoff to the owner.

Build:
1. **Deterministic B4** (`src/lib/rubric/b4.ts`, pure, unit-tested): from the masked draft compute
   `word_count`, `sentence_count`, `paragraph_count`, and a reading-level estimate (Flesch–Kincaid grade or
   a simple syllable-based approximation). **B4 passes when** ~50–125 words **and** ≤~4 sentences/short
   paragraphs **and** reading level ≲ grade 6 (aim ~3rd grade; be lenient, it's advisory-adjacent but B4 is
   core — see PRD §16 lines/thresholds). Return `{ pass, word_count, sentence_count, reading_level, why }`
   where `why` is one plain sentence when it fails (e.g. *"This runs long (~180 words); outreach that gets
   replies is usually 50–125 — cut to the reason plus the ask."*).
2. **Anchored LLM call** (`src/lib/rubric/llm.ts`, server only): one `@anthropic-ai/sdk` call that judges
   **B1, B2, B3, B5** and the **1–2 personalized criteria** for the scenario. Requirements:
   - **Structured output** — use the SDK's structured outputs (`output_config.format` / `client.messages.parse()`).
     **Invoke the `claude-api` skill (TypeScript) for the exact current SDK syntax before writing this call.**
     The JSON schema (strict) is in **Appendix A**.
   - **Anchored** — the system prompt states each criterion's pass/fail bar **with worked pass/fail
     examples** (Appendix B), so the model is consistent, not vibes. It must return, per criterion,
     `pass: boolean`, the **exact quote** it reacted to (`quote`, or null if pass), and a one-line
     `why` framed as an edit (never a grade).
   - **Thinking:** `thinking: { type: 'adaptive' }` (judgment task); effort `medium`. `max_tokens ~4000`.
   - **Stage-tune B1/B3** by the scenario (cold vs warm/follow-up) per PRD §16 — pass the scenario into the
     prompt.
   - The input text is **already masked**; the route also re-checks it doesn't contain the known recipient
     token (defense in depth) and refuses if it does.
3. **Compose the verdict** (`src/lib/rubric/evaluate.ts`): merge B4 (code) + B1/B2/B3/B5/personalized (LLM).
   - **core_pass = B1.pass && B2.pass && B4.pass** (B3/B5/personalized are advisory — surfaced, never gate).
   - **top_misses**: pick the **1–2 highest-impact** failing criteria, core first, then advisory (order:
     B1, B2, B4, B3, B5, personalized). Return each as `{ criterion, quote, why }`.
   - Return `{ core_pass, criteria, top_misses, deterministic }`.
4. **Route** `POST /api/check` (`src/app/api/check/route.ts`): auth-gated; body `{ attemptId, draftMasked, scenario, path, revisionIndex }`; runs `evaluate`; **writes a `checks` row** (ERD.md) with everything incl.
   `model` + `latency_ms`; returns the verdict to the client. Never returns or logs anything unmasked.
5. **NOD's "better version" rewrite** (`POST /api/rewrite`, `src/lib/rubric/rewrite.ts`): one anchored Claude
   call that rewrites the user's masked draft to **pass the standard** — leads with their real reason, one
   clear ask, no soft opener, 50–125 words (Appendix C prompt). Used by the coaching loop after two failed
   self-edits (journey.md §3 ⑤). It must itself pass `evaluate` — verify in code and, if it doesn't,
   regenerate once.

**DoD (write these tests):**
- `b4.ts` unit tests: a 40-word one-ask message passes; a 200-word four-paragraph message fails on length.
- An integration test hitting `/api/check` with a **known-bad** message ("Hi [name], I hope this finds you
  well, just wanted to reach out and circle back, let me know your thoughts, also can we set up a call and
  can you review the doc") returns `core_pass=false` with B1 (multiple/vague ask) and B2 (fluff opener) in
  `top_misses`, each with a real quote.
- A **known-good** message ("Hi [name] — you asked to see pricing once we shipped the new plan; it's live.
  Would a 15-minute call Thursday work?") returns `core_pass=true`.
- `/api/rewrite` output passes `evaluate` (`core_pass=true`).
Commit: `feat(rubric): hybrid evaluator (code B4 + anchored Claude B1/B2/B3/B5) + rewrite`.

---

## Phase 6 — Wire the workspace to the real evaluator + the coaching loop

**Goal:** the full flow works against the real endpoints, with the LOCKED coaching loop.

Port from `workspace.html` (its logic is the reference), swapping the fake check for `/api/check`:
1. **Situation frame:** four equal cards + the "Something else?" escape → `classifyTask` (outreach → custom
   scenario + go to details; off-scope → warm boundary + override → `roadmap_signals` insert; abuse →
   refuse). On first entry to a real attempt, insert an `attempts` row and emit `attempt_started`.
2. **Details frame:** progressive one-at-a-time prompts (who/ask/ctx) with the mask reassurance; on continue,
   **mask client-side** and save the masked values to the attempt (recipient stays real only in browser).
3. **Choose frame:** loud "Write my first version" primary + quiet "Start with a NOD draft" link (never 50/50).
4. **④a Write your own:** the compose surface with the task brief; "Check it against the standard" masks the
   draft client-side, `POST /api/check` (revisionIndex = checkCount), bump `check_count`. **Fade:** lighter
   scaffolding once `history.length>0`, with the "Stuck?" restore (port from `workspace.html`).
5. **④b NOD drafts + spot-the-flaw:** call `/api/rewrite`-style generation to produce the NOD draft **from
   the user's context** (never invented facts; label a sample when no context), render tappable sentences,
   capture the tap, then route into feedback which checks the (masked) NOD draft.
6. **⑤ Feedback + THE COACHING LOOP (journey.md §3 ⑤, LOCKED):**
   - Render `top_misses[0]` as *your line → why → (tighter version if the criterion supplies one)*, neutral
     marker on the quoted line. Emit `feedback_acted` when the user revises.
   - **"Let me tighten it"** → back to the editable compose with a "one thing to tighten" reminder; the check
     action returns. Allow **two** self-edit+recheck cycles (`check_count`).
   - **Third check still failing** → `POST /api/rewrite`, show NOD's better version + "the move to keep"
     takeaway + Save; set `outcome='nod-rewrote'`.
   - **Clean check** → *"It's ready — here's what's working"* naming one concrete judgement from the draft;
     Save. Record `first_pass_criteria` (from the **first** check) + `loops_to_clear` on the attempt.
   - Respect the **max-3-check** cap and **1–2 misses at a time** (PRD §16). Advisory misses never gate.

**DoD:** end-to-end in the browser (a real signed-in user): situation → details → choose own → write a weak
message → check (real fix shown with a quote) → tighten → check → tighten → check → NOD writes a better
version → Save. And a clean message → "It's ready" → Save. `checks` + `attempts` rows are written and masked.
No score/colour anywhere. Commit: `feat(workspace): wire real evaluator + coaching loop`.

---

## Phase 7 — Saved artifact + history + reuse (masked)

**Goal:** the saved frame, the masked history list, copy-with-real-name, and Reuse.

Steps:
1. On Save: insert a `messages` row (masked `text_masked`, title, scenario, ask, `authored` =
   own/nod/nod-rewrote); set `attempts.completed_at` + `outcome`; emit `draft_completed` with
   `{ rubric_pass, revision_count }`.
2. **Saved frame:** the finished message shown **masked** (copy restores the real name from the browser map);
   the "Your saved messages" list = plain rows (title, one-line peek, "Asked for: …", relative date, "just
   saved" chip on the newest, Reuse →). Load history from `messages` (masked). Copy guard: coaching notes
   never copy.
3. **Reuse:** seeds a fresh attempt's compose with the selected masked message; the user re-personalizes.
4. One outcome-tied next-use cue (journey.md ⑦ seed).

**DoD:** saving writes a masked `messages` row; the list distinguishes multiple messages (title + ask +
date); inspecting the row shows `[name]`, not a real name; copy produces the real name; Reuse pre-fills.
Commit: `feat(saved): masked artifacts, history, reuse`.

---

## Phase 8 — Instrumentation (PRD §14 — the experiment) — DEFERRED (owner amendment, 2026-08-21)

**Do not build this phase inline.** Per the Amendments section above, analytics is wired in **after** the rest
of implementation.md (Phases 0–7, 9–13) is done, as a follow-up pass. Keep the spec below as the reference for
that later pass; skip ahead to Phase 9 once Phase 7's DoD passes.

**Goal:** the six events written server-side with **exact** names (ERD.md `events.name` enum).

Steps: add a server helper `logEvent(name, { attemptId, properties })` and fire:
`attempt_started` (situation chosen), `draft_completed` (save; `{rubric_pass, revision_count}`),
`feedback_acted` (`{criterion, before, after}` on a revise), `nudge_sent`, `unaided_started`,
`unaided_completed` (`{help_requests, ai_turns, time_to_done, rubric_pass}`). Never include unmasked text in
`properties`.

**DoD:** completing a guided attempt writes `attempt_started` + `draft_completed` (+ `feedback_acted` if the
user revised) to `events`, with correct property shapes. Commit: `feat(analytics): PRD §14 event instrumentation`.

---

## Phase 9 — Nudge + unaided re-attempt + capture

**Goal:** the outcome-tied nudge and the instrumented unaided attempt (Decision 10 / North Star).

Steps:
1. On a completed attempt, create a `nudges` row (scenario-tied). v1 surfaces the nudge **in-app on the next
   visit** (no email needed for v1) — a calm one-liner tied to the same situation ("Got another prospect
   who's gone quiet? Do the next one yourself — I'll jump in if you get stuck.").
2. Starting from the nudge creates an `attempts` row with `attempt_type='unaided'`, emits `unaided_started`,
   and runs the **same** flow with **thinner scaffolding** (help fades further; the "Stuck?" restore stays).
3. On its completion emit `unaided_completed` with `{help_requests, ai_turns, time_to_done, rubric_pass}`.

**DoD:** finishing a guided attempt then returning shows the nudge; taking it creates an `unaided` attempt
and, on completion, an `unaided_completed` event with the capability fields. Commit: `feat(return): outcome-tied nudge + unaided capture`.

---

## Phase 10 — Marketing landing

**Goal:** port `design/mockups/landing-editorial-blue-v3.html` to a Next.js route `/` (the app lives at
`/app`). Keep it a faithful port (no `backdrop-filter` glass on the nav — already fixed in the prototype).
The five CTAs go to `/signin?next=/app`.

**DoD:** `/` renders the landing matching the prototype; CTAs route to sign-in → `/app`. Commit: `feat(landing): port marketing page`.

---

## Phase 11 — Rubric discrimination test (BEFORE shipping — PRD §16/§24)

**Goal:** prove the standard reliably separates good outreach from bad (the un-run validation the whole
experiment's credibility rests on). This is a **gate**, not optional.

Steps:
1. Build a labelled set: **≥15 known-good** and **≥15 known-bad** outreach messages across the four scenarios
   (write them from the PRD §16 pass/fail columns; keep them in `app/test/rubric-fixtures.ts`).
2. A test (`app/test/discrimination.test.ts`) runs each through `evaluate` and asserts: known-good →
   `core_pass=true`; known-bad → `core_pass=false` with a sensible `top_miss`. Report precision/recall.
3. **If discrimination is weak** (misclassifies), tune the **anchors/thresholds** (Appendix B / B4 lines) —
   not the five criteria — and re-run. Record results in a short `RUBRIC-VALIDATION.md`.

**DoD:** ≥~85% correct on the labelled set (owner reviews the misses). `RUBRIC-VALIDATION.md` written.
Commit: `test(rubric): discrimination validation + results`. **Do not proceed to launch if this fails —
raise it with the owner.**

---

## Phase 12 — Tests, build, deploy

**Goal:** green build, meaningful tests, deploy (owner-gated).

Steps:
1. Ensure each feature has tests (masking, B4, evaluate, the funnel `classifyTask`, the coaching-loop state
   machine, a component render smoke test). `npm test` green.
2. `npm run build` green; `npm run lint` green (no `any`).
3. Deploy to Vercel (set the env vars there; Supabase redirect URLs updated to the prod domain).
   **Ask the owner before deploying.**

**DoD:** build + tests + lint green locally; a preview deploy works end-to-end (sign in → full loop → saved).
Commit: `chore: test/build/deploy readiness`.

---

## Phase 13 — Commit + push the locked design/docs (owner pre-authorized)

The owner has authorized pushing **the design + docs commits**. After the above:
1. Ensure `journey.md`, `design.md`, `ERD.md`, `implementation.md`, `BUILD-KICKOFF.md`, and the prototype
   changes are committed on the working branch (`feedback-pass-20aug`).
2. **Push** the branch to `origin` (GitHub `TarunPur/learning-tech-ai`). This is the one pre-authorized push.
3. Do **not** open a PR to `main` or deploy without a separate OK.

**DoD:** `git push` succeeds; `git status` shows in sync with origin. Report the pushed commit range.

---

## Definition of Done (the whole build)
A signed-in Marketing/Sales user can: pick a situation (or a scoped "something else"), personalize it (names
masked before anything is stored/sent), choose to write their own (default) or react to a NOD draft, get a
**real** concrete fix on **their own words** with the exact quote, tighten-and-recheck up to twice, have NOD
write a better version if still stuck, or reach a clean "it's ready," and **save a masked artifact** with a
running masked history and Reuse. The six §14 events fire; the nudge + unaided path are instrumented; the
rubric passed its discrimination test. No score, no green/red, no banned words, no raw PII stored.

---

# Appendix A — Evaluator JSON schema (strict)

```jsonc
{
  "type": "object",
  "additionalProperties": false,
  "required": ["b1","b2","b3","b5","personalized"],
  "properties": {
    "b1": { "$ref": "#/$defs/crit" },   // one clear, low-friction ask
    "b2": { "$ref": "#/$defs/crit" },   // earned relevance & recipient-centered framing
    "b3": { "$ref": "#/$defs/crit" },   // right tone for the relationship (advisory)
    "b5": { "$ref": "#/$defs/crit" },   // no fluff — plain, direct language (advisory)
    "personalized": {
      "type": "array",
      "items": {
        "type": "object", "additionalProperties": false,
        "required": ["id","pass","quote","why"],
        "properties": {
          "id": { "type": "string" },
          "pass": { "type": "boolean" },
          "quote": { "type": ["string","null"] },
          "why": { "type": ["string","null"] }
        }
      }
    }
  },
  "$defs": {
    "crit": {
      "type": "object", "additionalProperties": false,
      "required": ["pass","quote","why"],
      "properties": {
        "pass": { "type": "boolean" },
        "quote": { "type": ["string","null"] },   // the EXACT sentence reacted to, verbatim from the draft; null if pass
        "why":   { "type": ["string","null"] }     // one plain edit-framed line; null if pass
      }
    }
  }
}
```
(B4 is **not** in this schema — it is computed in code and merged afterward.)

# Appendix B — Anchored system prompt (skeleton for the LLM call)

Write the evaluator's system prompt from PRD §16's criteria table. It MUST:
- State NOD's role: *an expert outreach editor applying a fixed standard — you never grade, never guarantee
  a reply; you name at most the issues that matter and quote the exact line.*
- Define **B1, B2, B3, B5** with the PRD §16 "Passes when / Fails when" lines, **stage-tuned by scenario**
  (cold vs warm/follow-up) for B1 and B3.
- Include **1 worked pass example and 1 worked fail example per criterion** (from the PRD §16 "How the user
  hears it" column) so judgments are anchored, not improvised.
- Add the **personalized criterion for the scenario** (from the map below).
- Demand: return the **exact quote** from the draft for any needs-work criterion; `why` is an edit
  ("move your ask up so they see it at a glance"), never "your score is…".
- Input: the **masked** draft + the scenario. Output: **only** the Appendix A JSON.

**Personalized criteria map** (PRD §16 — 1 per scenario; advisory):
| scenario | personalized criterion |
|---|---|
| quiet | a graceful, low-pressure reason to reply *now* — a fresh hook, not just "following up" |
| meeting | makes the meeting the obvious low-friction next step — specific, short, clear payoff for their time |
| cold | establishes credibility fast — one relevant proof point, without bragging |
| event | anchors to the shared context — references the specific event/conversation naturally |
| custom | map to the nearest of the above (via `classifyTask`); never invent a fresh criterion |

# Appendix C — "Better version" rewrite prompt (skeleton)

One anchored call that rewrites the masked draft to **pass the standard**: lead with the user's real reason
(from their context), exactly one clear low-friction ask matched to the scenario stage, 50–125 words, plain
language, **no soft opener** ("just checking in", "I hope this finds you well", "I wanted to reach out").
Keep the masked placeholders (`[name]`). Output the message only. In code, run the result back through
`evaluate`; if it doesn't `core_pass`, regenerate once, then use the better of the two.

# Appendix D — Deterministic B4 (code, no model)
- `word_count` = whitespace tokens. Pass band ~**50–125** (fail <35 as "too thin to earn the read" only if
  also no clear reason; primarily fail >150).
- `sentence_count` via `.!?` split; prefer **≤4** sentences / short paragraphs.
- `reading_level`: Flesch–Kincaid grade (or syllable approximation); target ≲ grade 6.
- `pass = word_count in band && sentences ≤ ~4-ish && reading_level ≲ 6`. `why` (on fail) is one plain line
  matching PRD §16 B4 phrasing.
