# BUILD KICKOFF — NOD v1

Paste the prompt below to the building agent (a fresh Claude Code / Agent SDK session started **in
`~/Desktop/Learning Tech AI`**). It is written so the agent can execute without re-deriving decisions.

---

You are building **NOD v1**, a real Next.js + Supabase product. Everything you need is already specified in
this repo — your job is to **execute the plan exactly**, not to redesign or re-decide anything.

## Read these first, in this order (do not skip)
1. `README.md`, `PRODUCT.md`, `v1ProductDetailing.md` — the product and its **11 locked decisions** (do not relitigate them).
2. `v1PRD.md` — requirements. Memorize **§13** (off-scope soft funnel), **§14** (the 6 events), **§16** (the 5-criterion rubric B1–B5, the hybrid deterministic-B4 + anchored-LLM evaluation, the core/advisory split, the max-3-check cap).
3. `journey.md` — the **LOCKED** flow: one two-frame workspace, the two entry paths, and the coaching loop.
4. `design.md` — the **LOCKED** visual system + components (Calm Correspondent).
5. `ERD.md` — the data model + the exact migration SQL.
6. `implementation.md` — **your step-by-step build plan. Follow it top to bottom, one phase at a time.**

The **canonical UI + logic to port** is `design/mockups/workspace.html` + `design/mockups/shared/flow.js` +
`design/mockups/shared/system.css`, plus the landing `design/mockups/landing-editorial-blue-v3.html`.
Serve them locally (`cd design/mockups && python3 -m http.server 8734`) and walk the flow so you know the
exact interaction you are reproducing. The prototype's check is **faked** — you build the real evaluator
(implementation.md Phase 5).

## How to work (non-negotiable)
- **Execute `implementation.md` phase by phase.** Do not start a phase until the previous phase's
  **Definition of Done** passes (run the stated command/check and confirm the expected result).
- **Obey the Prime Directives** in `implementation.md`: TypeScript strict, **no `any`**; **write tests for
  every feature** (Vitest); **the masking invariant** (no raw name ever stored/sent — mask client-side
  before any network call); **never show a score/grade/checklist/colour**; one blue, no green/red; the
  **banned words** (course, lesson, learn, grade, score, quiz, streak, bench); claim quality, never a reply.
- **Faithfully port** the locked design — same tokens, same components, same two-frame workspace + coaching
  loop. This is not a redesign.
- When you write the **Anthropic evaluator call** (Phase 5), **invoke the `claude-api` skill (TypeScript)**
  for the exact current SDK syntax (structured outputs via `output_config.format` / `client.messages.parse()`,
  adaptive thinking, server-side key). Default model `claude-opus-5`; make it env-configurable and flag the
  cheaper-model cost/latency tradeoff to the owner rather than downgrading silently.
- When you write **Supabase SSR auth** (Phase 2), **invoke the `supabase` skill** for the current
  `@supabase/ssr` App Router pattern; don't hand-roll cookies.
- **Commit per phase** (small, incremental) with the commit messages suggested in each phase.
- **Do not `git push` or deploy without the owner's explicit OK — with one exception:** the owner has
  **pre-authorized pushing the locked design + docs commit** (implementation.md **Phase 13**). You may push
  the working branch `feedback-pass-20aug` to `origin` (GitHub `TarunPur/learning-tech-ai`) for that. Do not
  open a PR to `main` and do not deploy to production without a separate OK.
- **Run the rubric discrimination test (Phase 11) before considering the build shippable** — it is a gate.
  If it fails, stop and tell the owner.
- **If you hit a genuine ambiguity or a missing secret** (Supabase/Anthropic keys, an OAuth client, a schema
  choice not covered here), stop and ask in plain language. Don't guess on high-consequence choices.

## Environment you'll need (ask the owner if missing)
- A Supabase project (URL + anon key + service-role key), Google OAuth client for Supabase Auth.
- `ANTHROPIC_API_KEY` (server-side). If `ANTHROPIC_API_KEY` is unset, run `ant auth status` — a profile may
  already be active.
- Node + npm. GitHub push access to `TarunPur/learning-tech-ai` (for Phase 13 only).

## First action
Confirm you've read all six docs, then start **Phase 0** of `implementation.md` and report the DoD result
before moving to Phase 1. Work the owner's way: plain language, one phase at a time, incremental commits,
and never push/deploy beyond the one pre-authorized design/docs push.

---

*(The build agent may also be the one to push the design commit per Phase 13; that push is pre-authorized.
Everything else — production deploy, PR to `main` — still needs the owner's explicit OK.)*
