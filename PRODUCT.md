# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js · TypeScript (strict) · Supabase (RLS) · Tailwind CSS. AI/model calls are server-owned and invisible to the user (the product is not a tool-picker). Confirmed in `v1ProductDetailing.md` and `v1PRD.md`; not "delegated" — this was decided before design.

## Users

**Primary user:** a non-technical professional in India — a non-builder role **and** no formal tech education (the strict research cut, n=44/160, ~28% of the sample), skewing Marketing/Sales (20% plurality). They already use AI almost daily (64% "every single day") but stall on what to try next and can't tell if their output is any good (36% at ≤3/5 confidence). Nearly half (45%) do **not** self-identify as active learners — they want the task *done*, not to "learn AI."

**Situation / job:** they have a real, recurring work task — drafting a persuasive outreach message (cold email, warm follow-up, re-engaging a quiet prospect) — and want to produce one that is genuinely good, on their own messy real situation, without facing a blank prompt box or a course.

**Not for (v1):** builders / technical roles, people who want to *become* builders, users outside India, and the other three task types (research/decision, spreadsheet/data, workflow).

## Product Purpose

Get a Marketing/Sales user to **one real outreach-message win** on their *own* task, end to end, with help that fades — leaving a reusable artifact and instrumenting (without depending on) a later unaided re-attempt. Success is not completion counts or self-reported confidence; it is the **behavioral delta between a guided first attempt and a later unaided attempt** on a similar task (fewer help requests, fewer AI turns, faster, clean rubric pass without scaffolding). **v1 is an honest experiment testing one bet — does guided practice on a person's own real task produce independent capability — not a product that assumes its thesis.**

## Positioning

The inversion a neighboring product cannot truthfully copy: every AI-learning product starts with **content, curriculum, or a tool** and measures completion/confidence; this one starts with **the user's own real task**, does it *with* them, and measures an independent re-attempt. Concretely, the trustable edge over raw ChatGPT is three things a chat tool doesn't give: (1) a **fixed, evidence-based standard** applied the same way every time (not the model's flattering mood), grounded in large-N sources; (2) it **catches the specific failure patterns raw AI produces** (long, "hope this finds you well," multiple-ask emails); (3) the user **learns *why*** because feedback points at *their* actual draft. Honest caveat: the model underneath may be the same kind of LLM — the edge is the guardrails around it, not a smarter engine.

## Operating Context

The v1 core loop, screen by screen (from `v1PRD.md` §15 and `v1ProductDetailing.md`):

1. **Recognition home** — 3–4 concrete Marketing/Sales outreach situations as tappable cards + a scoped "something else" escape. **No blank box.**
2. **Personalize** — short conversational fill-in of the picked situation (who, the ask, the context). Silent auto-mask fires here.
3. **Guided draft (fading scaffold)** — AI proposes the message in visible moves, narrating *why*, and hands the user 1–2 key decisions (the ask, the tone). "I do → we do."
4. **Feedback, not grading** — concrete, actionable fixes against an expert rubric; the user revises; loops until it clears the core criteria (max 3 loops). Never a score or checklist.
5. **Artifact + portfolio** — the finished message saved as a reusable artifact; a running history is the "proof" they carry into their org.
6. **Later, real occurrence** — one outcome-tied nudge → unaided re-attempt on a similar task; help-used / AI-turns / time captured.

The four curated recognition-home situations (each maps to an added rubric criterion): **Re-engage a prospect who went quiet · Book a demo / meeting · Cold intro to a new prospect · Follow up after an event.**

## Capabilities and Constraints

**The judgment model (product-level):** a **fixed expert rubric backbone** of five criteria — B1 one clear low-friction ask; B2 earned relevance & recipient-centered framing; B3 right tone for the relationship; B4 respects their time (~50–125 words, plain language); B5 no fluff — same five every message, stage-tuned (cold/warm/follow-up), plus 1–2 curated per-situation criteria. Evaluation is **hybrid**: B4 is deterministic (word count, structure, reading level); B1/B2/B3/B5 use anchored LLM judgment that must return the exact quote it reacts to. **Core (must-pass to count as a win): B1, B2, B4. Advisory (surfaced, never win-gating): B3, B5, personalized.** Cap at **3 revise loops**. The user is **never** shown a score, a checklist, or "X/5" — only 1–2 concrete draft-specific fixes at a time, framed as an edit *they* make.

**Terminology that must stay out of the UI:** no "course," "lesson," "learn," "grade," "score," "quiz," "streak." Sell utility.

**Explicitly undecided / open (design-owned, to resolve in this design work):**
- **Auto-mask mechanism:** detect-and-mask vs. guide-abstract.
- **Aha-staging:** whether to show a "rough attempt → shaped final" contrast, whether it requires capturing the user's own rough attempt first (they stall on where to start, 36%), whether it backfires by making the AI feel like it did the work, and where in the flow it surfaces without adding friction.
- **How the rubric surfaces as feedback in the UI** (1–2 fixes at a time, pointing at the actual draft, never a score/checklist).

**Deferred, do not design now:** numeric success targets (§9, set after design, within-subject); ERD / technical architecture / build milestones; the other 3 task types; non-Marketing/Sales roles; paid tier; **product naming/branding** (use a placeholder).

**Scope guardrail:** off-scope free-text inputs get a **soft funnel** (never open ChatGPT) — an outreach message flows into the loop; a real-but-off-scope task gets a warm boundary, not a dead end; abuse/injection is refused safely.

## Brand Commitments

- **Name:** deferred — use a neutral placeholder in designs, never invent a brand.
- **Voice:** utility-first, warm, plain-language, never instructional/course-like. Reassuring for an overwhelmed non-technical user; confident but never condescending. English-only in v1 (the rubric's signals are English-validated; Hinglish/Hindi is v-next).
- **Emotional target of the whole product:** the user should feel **capable, not taught.** No screen should ever leave them staring at something hard.

## Evidence on Hand

Primary research: 160-response survey, strict target cut n=44, re-verified against the raw workbook (PII-excluded; insights in `research/`). Headline verified figures (🟢): 64% daily AI use; 36% ≤3/5 confidence; 36% "don't know where to start" (#1 blocker); 25% each for not-enough-practice / too-theoretical / concepts-too-difficult; 45% not active learners; 9% build with AI; 64% want "learn by solving real-life challenges"; Marketing/Sales 20% plurality; WTP soft (11% "definitely"). Rubric grounded in named large-N secondary sources (🟡): Gong (304K emails), Boomerang (40M), Backlinko (12M), Woodpecker (20M), Lavender, Josh Braun 4-T. **The solution mechanism is 🔵 (hypothesis) on purpose — validating it is the point of v1.** Do not fabricate testimonials, user counts, or outcome guarantees; the product claims *quality by expert standards*, never *"this will get a reply."*

## Product Principles

1. **No blank box, ever.** Recognition over recall — the #1 blocker (36%) is "where do I start," so meet the user with concrete, tappable real situations, not an empty prompt.
2. **Never leave them staring at something hard.** Every screen hands the overwhelmed user an obvious next move; difficulty is defused by doing-it-*with*-them, never by a lesson.
3. **Feedback, not grades.** Surface 1–2 concrete fixes that point at *their* actual draft; the numeric score stays internal, for measurement only. Claim quality, never outcome.
4. **Sell utility, not learning.** 45% aren't learners — the visible promise is "get your task done"; capability transfer rides along invisibly.
5. **Safe by default, invisibly.** Mask real names/identifiers before any persist or model call, with gentle reassurance — never an up-front warning gate.

## Accessibility & Inclusion

Audience is non-technical and often low-confidence with software; the bar is **plain-language, low-cognitive-load, obvious-affordance** UI. Mobile-first (India daily-AI usage skews to phone). Standard WCAG-AA targets (contrast, tap-target size ≥44px, focus states, reduced-motion support). English-only copy in v1.
