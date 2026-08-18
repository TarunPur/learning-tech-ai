---
title: Converged Problem Statement and Solution Base
status: current-authoritative-direction
last_updated: 2026-08-18
project_directory: /Users/tarunpuri/Desktop/Learning Tech AI
supersedes: Initialplan.md (One-Shot Builder Studio pilot — now historical only)
reached_via: /grill-me session (grilling skill), 3 rounds, 18 questions, all confirmed by owner
---

# Converged Problem Statement and Solution Base

## Agent orientation

This is the current authoritative direction for this project. Read this file before proposing product, research, or implementation work. `Initialplan.md` (the One-Shot Builder Studio pilot) is superseded — it remains in the folder as historical record only, not as guidance.

## Problem statement

Non-technical professionals in India already use AI every day, but most still don't know what to learn next and don't get enough real practice applying it to their own work — so even with daily use, a third of them remain unconfident in their AI ability, and that gap isn't closing on its own.

## How each part of that statement is grounded

- **"A third... unconfident"** — validated against the primary-research workbook (160 responses). Among the 85 "non-builder" respondents, self-rated confidence (1–5) splits 34% at ≤3 vs. 66% at 4–5. This treats a 3/5 ("moderate") as *not* confident, which is a deliberate judgment call (not an objective fact) — grounded in `NonTechnical_User_Causal_Insights.md`'s Insight 1, which argues moderate self-rated confidence is not the same as demonstrated independent capability. If only 1–2/5 counted as "unconfident," the figure would be 7%, not a third.
- **"Don't know what to learn next"** — the most-selected blocker in the 84-person non-builder cohort (28/84, 33%), per `codexmemory.md`'s session-handover data.
- **"Don't get enough real practice"** — corroborated by "insufficient practice" (25/84), "content too theoretical" (20/84), and "tutorial-to-doing gap" (14/84) in the same cohort.
- **"That gap isn't closing on its own"** — supported by the transfer-literature synthesis in `WebsearchINSIGHTS.md` (Insights 1, 5, 16): content abundance and AI exposure do not, by themselves, produce independent capability; that requires practice, feedback, and a corrected re-attempt.

## Target user (data-grounded definition)

The **strict non-technical cut**, not the looser "all other roles" proxy used in earlier analysis docs:

- Role is outside Product/Management/Design and outside tech-adjacent free-text titles (developer, engineer, data analyst, IT, etc.), **and**
- No formal technology education (self-reported "No" to the BTech/BCA/MCA question).

In the 160-response primary-research workbook, this intersection is **n≈45 (~28% of the sample)** — smaller than the project's earlier "all other roles" proxy (n≈84–85), but more defensible: only 9% of this strict group uses AI to build products, versus 18% of non-builder-role respondents who *do* have formal tech education. Job title alone is a weak proxy; education is the sharper technical/non-technical divider in this dataset.

**Geography: India**, chosen explicitly (the case study brief never specifies one) because the primary-research sample and the competitive landscape (see `CompetitiveLandscape.md`) are both India-weighted, and India has a named, specific competitive gap ("almost no Duolingo for AI — it has workshop factories instead").

## Solution base

**v1 job — Understand + Use only, not Build.** Help the user run one real recurring task end-to-end with AI. Building repeatable workflows/automations is explicitly deferred to a later stage, not v1 scope.

**Task categories (bounded, not open-ended) for v1:**
1. Research or decision-help
2. Document / communication drafting
3. Spreadsheet / data-analysis
4. Tool-or-workflow-figuring-out

(These map to the four workflow templates originally proposed in the now-superseded `Initialplan.md`, retained here because they're a tractable, buildable scope for a solo founder rather than an open-ended task space.)

**Entry point:** AI-guided conversational intake is the front door — no human triage, no course/lesson picker before it. The AI narrows a vague "I'm stuck on X" into a workable task itself. This directly answers the "don't know where to start" blocker (the #1 named blocker in the data) inside the product, rather than assuming it away.

**Interaction shape:** hybrid. The user describes their task conversationally (low-friction, natural entry), and the product renders that into a visible, structured step sequence as it progresses. Pure open chat risks recreating the "don't know where to start" problem inside the product; a rigid wizard risks feeling like the orthodox course-flow being deliberately avoided.

**AI/model layer:** the product owns the AI calls itself (its own backend, its own API key); the underlying model is invisible to the user. No "pick your AI tool" step — this audience doesn't want to learn AI as a subject, they want their task done. (Note: this deliberately diverges from the G6 competitor sheet's "multi-vendor neutrality" whitespace insight, which assumes a more sophisticated user who wants to choose between ChatGPT/Claude/Gemini. Internally the product can still route to whichever model fits a task type — that's an implementation choice, never a user-facing decision.)

**Data-safety default:** guide the user to genericize/redact their real task before practicing, as part of onboarding — not a scary warning screen after the fact. There's no employer/compliance layer in a B2C individual-led product, so this default has to hold regardless of who's using it. (Open item: the exact mechanism — AI redacts what's pasted, vs. the AI guides an abstract description from the start — is intentionally left to a dedicated UX design pass, not decided here.)

**Output / artifact:** every session leaves the user with a persistent, reusable artifact, plus a running portfolio/history. This is what the user can literally show a manager when they carry the product into their organization (see growth model below), and it directly answers the G6 sheet's own insight that "certification isn't enough — proof via real projects is the stronger proposition."

**Success metric:** independent completion on a **later, unaided attempt** — not self-reported confidence. Measured via:
1. An AI-scored rubric at first completion (the AI generates and scores against success criteria for that task type), and
2. A behavioral proxy on a later similar task: less help needed, fewer AI turns, faster completion.

Self-reported confidence is tracked only as a secondary/diagnostic signal — treating it as the primary metric would repeat the exact trap this project's own research names in `WebsearchINSIGHTS.md` (Insights 4, 16) and `NonTechnical_User_Causal_Insights.md`.

**Re-engagement:** one outcome-tied nudge per completed task ("last time you did X — want to try a similar one yourself?"), not a streak or daily-return mechanic. This closes the measurement loop above without importing the exact gamification pattern this project is deliberately avoiding.

**Growth / buyer model:** individual-led product-led growth. The individual professional experiences real value first (free), and *becomes the channel* into their organization later — no direct B2B sales motion in v1. This is a deliberate low-effort-on-selling bet: land with the individual, let the artifact/output be what gets carried into the org.

**Monetization:** fully free in v1. Willingness-to-pay is tracked as a signal (e.g. a real, non-charging "I'd pay for another one of these" commit point), not built as a paywall — payment infrastructure would be effort spent away from proving the core loop. Watch the reputational trap named in the G6 sheet: India's low-cost workshop players (GrowthSchool, Be10x) are associated with aggressive upselling — the free task's outcome quality has to earn the return, not a sales sequence.

**Build approach:** solo-buildable software, in the existing stack (Next.js, TypeScript, Supabase, Tailwind) — no recurring human-facilitator dependency (this is the one thing explicitly *not* carried forward from the discarded One-Shot Builder Studio pilot, which needed a human facilitator running live cohorts). Ship a version, get feedback, pursue funding/a team later if warranted.

## What this is explicitly not building

A course catalog, a role-based content library, a gamified streak app, a certification product, or a "pick your AI tool" interface. All five are well-represented in the 32-row competitive landscape (`CompetitiveLandscape.md`) and are treated as the orthodoxy to avoid.

The claimed differentiation is **execution quality** — frictionless, flow-state, genuinely built for someone who has never used a technical tool — applied to a mechanism (practice on your own real task, not a generic exercise) that nothing in the competitive set actually closes end-to-end, not a fundamentally novel mechanism.

## Open items deliberately not resolved here

- The exact mechanics of the genericization/redaction step (UX design pass, not a strategy decision).
- The exact rubric-generation logic behind the AI-scored success check.
- Pricing/paywall design for a future paid tier (deferred until the free loop is validated).
- Product naming/branding.

## Provenance

Reached through a `/grill-me` session (the `grilling` skill) run against the problem statement above, across three rounds and 18 questions, covering: segment definition, geography, success-metric definition, buyer/growth model, v1 scope boundary (Understand+Use vs. Build), interaction shape, task-category scope, AI/model-ownership, data-safety default, artifact/output design, re-engagement mechanic, and monetization posture. Every decision was explicitly confirmed by the owner, including a final full-summary confirmation ("Yes, this is it — lock it in").

Grounded in: `NonTechnical_User_Causal_Insights.md`, the primary-research workbook (`AI & Tech for next gen professionals (Responses) (1).xlsx`), `WebsearchINSIGHTS.md`, `Websearchsecondaryresearch.md`, `Firecrawlearchsecondaryresearch.md`, and the G6 workbook's Competitor Analysis sheet (synthesized separately in `CompetitiveLandscape.md`).
