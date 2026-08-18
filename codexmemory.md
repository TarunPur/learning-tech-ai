# Codex project memory — Learning Tech & AI

Last updated: 16 August 2026

## Project objective

Explore and build an MVP-ish learning product for non-technical professionals to move from “I don't understand technology” to confidently understanding, using, and building with Tech & AI. Ignore the original case-study deadline for now.

## Critical research guardrails

- Do not treat observations as insights.
- An insight must explain the underlying mechanism: **why the pattern happens**, ideally through a chain from observation → immediate cause → structural/root cause.
- Do not introduce a solution inside an insight.
- Do not present assumptions with the confidence of evidence.
- Hypothesis format must retain the square brackets exactly: **[User] faces [issue] because [underlying reason].**
- Problem discovery must cover the complete ecosystem: nodes, roles, incentives, pain points, communication/handoffs, existing alternatives, and the complete learning-to-work system.
- Avoid unsupported assumptions and researcher self-bias. Explicitly identify primary-research gaps.

## Key project files

- `Week 5 __ Case Study 4 __ Cohort 8.docx` — original case study.
- `Feedback from previous case studies.pages` — feedback guardrails above.
- `Questions.md` — 148 secondary/primary discovery questions across the ecosystem.
- `Hypothesis.md` — 82 unvalidated hypotheses, including ecosystem communication, incentive, and handoff hypotheses.
- `Websearchsecondaryresearch.md` — answers to all 148 discovery questions using secondary research; includes evidence-expansion ledger.
- `WebsearchsecondaryresearchSOURCES.md` — source register with 55 sources.
- `WebsearchINSIGHTS.md` — the current preferred insight synthesis: 15 causal insights, grouped by theme; each has a why chain, source links, evidentiary status, and primary-research falsifier.

## Secondary-research conclusion (not a validated final problem)

The strongest evidence-backed system hypothesis is:

**[Working professionals with AI-relevant tasks] face [difficulty converting learning into independent workplace capability] because [content, practice, feedback, manager support, governance permission, and work application are distributed across different ecosystem nodes].**

This is still too broad for a product problem statement. It must be narrowed through primary research to a specific user, recurring task, and validated broken handoff/constraint.

## Evidence boundaries to preserve

- Broad workforce/AI reports do not identify the best initial segment, exact workflow, willingness to pay, or target geography.
- Existing sources strongly support training-transfer mechanisms, adult-learning barriers, manager support, governance constraints, and the inadequacy of completion metrics as proof of capability.
- Existing sources only suggest, rather than prove for this segment: career anxiety as a strong acquisition route, the exact learning-to-work context handoff, competitive gaps, and signaling versus capability as the main job.
- No distinct causal insight has yet been validated for marketers, product managers, operations professionals, founders, or job seekers. Finance and HR have clearer risk evidence but still need role-specific primary research.
- The case study does not specify a target geography.

## Current primary-research audience

Recruit a broad mix of **non-technical working professionals**, from freshers to approximately 20 years of work experience. No narrower role, industry, or geography has been selected yet.

## Current primary-research form (12 open-ended questions)

1. What is your current role, industry, and years of work experience? Briefly describe the work tasks you do most often.
2. Think of the most recent time you felt that understanding technology or AI could help you do your work better—or when you felt you were expected to know more about it. What was happening?
3. Please walk us through that task from start to finish. How did you complete it, which tools or people did you rely on, and where did you spend the most effort?
4. What did you try to learn, use, or figure out in that situation? Why did you choose that approach instead of other available options?
5. What was difficult, confusing, risky, or frustrating during that attempt? Please describe the specific moment when you got stuck.
6. When you get stuck with a technology or AI-related task, what do you usually do next? Who or what do you turn to, and how useful is that support?
7. What happened after your attempt? Were you able to use what you learned in your work? Why or why not?
8. Are there any workplace conditions that make it easier or harder for you to learn or use Tech & AI—such as time, manager support, approved tools, access to data, privacy rules, budget, or feedback? Please describe real examples.
9. How do you currently decide what Tech or AI skill to learn next? What makes you feel that a learning resource is relevant to you?
10. What would make you feel genuinely capable of using Tech or AI in your work independently? What evidence would convince you, your manager, or an employer that you have that capability?
11. Looking ahead, what work outcome would make learning Tech or AI feel worth your time and effort? Please describe the change you would want to see in your work or career.
12. Is there anything important about your experience of learning or using Tech & AI at work that these questions did not ask?

## Immediate next step

Turn the above into a usable form, recruit the mixed non-technical-professional audience, collect behavioral examples of recent work tasks, and use findings to select one narrowly defined problem statement in the required hypothesis format.

---

## Session handover — 18 August 2026

### Authoritative primary-research source

- Use `AI & Tech for next gen professionals (Responses) (1).xlsx` as the current source of truth.
- It contains **160 responses** in `Form Responses 1` (row 1 is the header; data is rows 2–161).
- Do not use the earlier 107-response workbook for any new conclusion.
- Names, timestamps, and email addresses must not appear in analysis or dashboards.

### Current dashboard artefacts

- `AI_Learning_Research_Dashboard.html` — self-contained local interactive dashboard; opened in Chrome when requested.
- `build_dashboard.py` — regenerates the dashboard from the workbook. Preserve its full-option matching for multi-select fields.
- The dashboard includes: Overview; Role segments; Learning & blockers; Motivation & preferences; AI adoption; Builder vs other roles; Gender & age patterns; Executive summary.

### Data integrity rules

- Multi-select answers are exported as comma-separated text, but some valid option labels themselves include commas. Never naively split every field on commas.
- Count known choices by matching the complete option text against the response string.
- Surface residual unrecognised text as `Other / write-in`, rather than omitting it.
- Motivation, learning preference, format, and learning-source questions have an answered base of **108 regular learners**, not 160.
- The current executive view marks demographic groups with `n < 10` as **Directional — low base** and only surfaces contrast callouts with `n >= 10` and a ≥10 percentage-point difference from overall.

### Segmentation currently used

- **Builder roles (`n=76`)** = Product / Management / Design + Technical / Development / Data.
- **All other roles (`n=84`)** = remaining stated roles. This is the current operational proxy for non-technical/non-builder professionals; describe it as “all other roles” in findings to avoid claiming all are non-technical.
- Gender: Male 103, Female 56, Prefer not to say 1.
- Age: 18–25 = 40; 26–35 = 83; 36–50 = 33; Above 50 = 4.

### All-other-roles evidence (`n=84`)

- Daily AI use: 56; regular AI learners: 55; open/conditional payment response: 78.
- Main reasons to learn AI (base: 55 regular learners): Learning 43; Career Growth 39; Current job requirements 25.
- Main blockers (multi-select, base 84): do not know where to start/what to learn next 28; insufficient practice 25; content too theoretical 20; course/tool cost 18; difficult concepts 17; get stuck 16; tutorial-to-doing gap 14; cannot apply to work 12.
- Main learning paths among regular learners: YouTube 45/55; Online Courses 22/55. Preferred formats: short daily lessons 33; self-directed reading/figuring out 24.
- Engagement mechanisms: real-life challenges 60; small goals 50.
- Existing AI use: answers/summaries 72; documents/reports 57; image generation 52; data analysis 44; building products 11.
- Payment composition: Maybe if it genuinely helps 34; Depends on price 25; Definitely 12; Employer-paid 7; No 6.

### Safe interpretation of the non-builder pattern

- Direct observation: this group already uses AI and many actively learn, while the leading learning blocker is lack of direction, followed by lack of practice.
- Careful inference: the issue likely occurs when a person moves from casual work use into self-directed learning and has to choose a relevant next skill/practice task across scattered sources.
- Do not claim the survey directly proves a physical location or workflow stage; it did not ask that question.
- User value to validate: less search/choice burden, a clearer next action, practical rehearsal, and support when stuck.
- Business relevance to validate: 78/84 are positive or conditional about payment, but this is not proof of purchase. The test is whether a role-relevant, guided first win converts conditional interest into paid or repeat use.

### Executive-summary direction agreed in this session

- The executive summary must be organised as separate decision sections, not a long ranking of generic counts.
- Keep role segmentation separate from gender and age views; do not make role × gender × age the primary summary because it creates small cells.
- Use evidence plus clearly labelled **decision questions**, not unsupported recommendations.
- Current sections: Population map; Role-segment patterns; Gender patterns; Age patterns; meaningful blocker contrasts; payment contrasts; Builder Lab decision questions.

---

## Session handover — 18 August 2026 (continued)

### Current authoritative direction has changed

- **`Initialplan.md` (One-Shot Builder Studio) is superseded as of 2026-08-18.** It was one considered direction, not the ongoing plan. Do not treat it as directive — it remains in the folder as historical record only.
- **`ProblemSolutionBase.md` is now the current authoritative direction.** Reached via a `/grill-me` session (3 rounds, 18 questions), all decisions explicitly confirmed by the owner. Read this file before proposing any product, research, or implementation work.
- Summary of the new direction: a solo-buildable software product (not a facilitated pilot) for the **strict non-technical cut** in India (non-builder role + no formal tech education, n≈45 in the primary-research sample) — helps the user run one real recurring task end-to-end with AI (bounded to 4 task categories: research/decision-help, document/communication drafting, spreadsheet/data-analysis, tool-or-workflow-figuring-out), via AI-guided conversational intake, with success measured by independent completion on a later unaided attempt (not self-reported confidence). Free in v1, individual-led PLG growth, no human facilitator.

### New source files added this session

- `G6 - Case Study 4_ .xlsx` — a separate 16-tab research workbook (Index, Plan, Discovery Questions, Reference Library, Secondary Research, Hypothesis - Categorisation & V, primary research, **Competitor Analysis**, Comp. analysis metrics, THEMES, Problem statements, Notes, Consolidated Survey, etc.). Only the "Competitor Analysis" sheet (32 rows) has been processed so far.
- `CompetitiveLandscape.md` — synthesis of that Competitor Analysis sheet: landscape clusters, the sheet's own 10 key insights, and observed whitespace. Purely descriptive, no product proposals — those live in `ProblemSolutionBase.md` instead.

---

## Session handover — 18 August 2026 (product detailing locked)

### `v1ProductDetailing.md` is now the locked product spec for v1

- **`v1ProductDetailing.md` is the current locked product detailing** — the *what* and *why* one level below `ProblemSolutionBase.md`. Reached via a second `/grill-me` (4 rounds, 10 decisions, all owner-confirmed), stress-tested against the constraint "super user-friendly for an overwhelmed non-tech user." Read it before any PRD/design/build work.
- **Raw primary-research workbook was read directly this session** (`AI & Tech for next gen professionals (Responses) (1).xlsx`), parsed via stdlib zipfile+XML (same technique as `build_dashboard.py`). PII columns (Timestamp, Email) excluded; multi-select matched on full option strings (labels contain commas — never naive-split). The **strict cut = n=44** (non-builder role AND formal-tech-education="No"); confidence ≤3 = 36%, builds-with-AI = 9% — all confirming `ProblemSolutionBase.md`. New nuance the earlier n=84 summaries missed: "concepts too difficult" 25%, image-gen is the excluded #2 actual use, only 55% are regular learners, Marketing/Sales is the role plurality (20%), WTP soft (11% "definitely").
- **v1 narrowed from the 4 task categories to ONE first loop:** Marketing/Sales → a recurring persuasive outreach message (cold/warm email, follow-up). The other 3 task types and other roles are deferred.
- **The 10 locked decisions** (see the file's Decision log for the why + rejected alternative each): v1-is-the-experiment · direction-led-comprehension-handled-implicitly · Marketing/Sales-drafting anchor · success=first-win-now + later-attempt-instrumented-not-gated · outreach-message artifact · concrete-example front door (no blank box) · fading scaffolding (I-do/we-do/you-do) · fixed-rubric-backbone feedback shown as guidance not a score · silent auto-mask data safety · one outcome-tied re-engagement nudge (no streaks).

### Work sequence going forward (owner-set)

Product detailing (`v1ProductDetailing.md`, DONE) → **PRD (immediate next, owner + Claude together)** → `design.md` (owner will share; must precede technical work) → ERD + technical architecture + implementation plan → build. Do NOT produce the ERD/architecture/milestones before design is finalised.
