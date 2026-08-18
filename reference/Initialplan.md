---
title: One-Shot Builder Studio — Current Product and Pilot Plan
status: superseded
last_updated: 2026-08-17
superseded_on: 2026-08-18
superseded_by: ProblemSolutionBase.md
project_directory: /Users/tarunpuri/Desktop/Learning Tech AI
primary_research_source: /Users/tarunpuri/Downloads/AI & Tech for next gen professionals (Responses).xlsx
curriculum_source: /Users/tarunpuri/Desktop/The-Builders-Gita.pdf
owner_decisions_locked: false
---

# One-Shot Builder Studio — Current Product and Pilot Plan

> **SUPERSEDED — 2026-08-18.** This was one considered direction, not the ongoing plan. The owner has decided to build the product from scratch based on the full research corpus instead. The current authoritative direction is **`ProblemSolutionBase.md`**, reached via a `/grill-me` session. Check that file (and `codexmemory.md`) before treating anything below as directive. This file is kept as historical record only.

## Agent orientation

This is the authoritative current strategy for this project. Read this file before proposing product, research, or implementation work.

The previous strategy—building a student-facing adaptive web app from *The Builder's Gita*—is **superseded for now**. Do not propose a new mobile app, desktop learning platform, or YouTube channel as the first product. The active strategy is a service-led, outcome-first research pilot called the **One-Shot Builder Studio**.

The book remains valuable as internal curriculum infrastructure: use it to select the minimum concepts, setup instructions, exercises, and troubleshooting needed for a participant's task. Do not expose the book publicly or reproduce it outside authenticated/authorized internal use.

## 1. Product thesis

Professionals already use AI frequently, but many have not crossed from drafting, summarising, and analysis into building a repeatable workflow for a real task. The product should not sell generic AI education. It should help someone bring one recurring task and leave with a safe, useful AI-assisted workflow they can run again.

**Core promise:**

> Bring one recurring task. Choose whether to receive, build, or understand a tested AI-assisted workflow.

The experience is intentionally outcome-first. Learning is available through the task and its handover, rather than as a separate course to complete.

## 2. Evidence from primary research

### Dataset

- Source: `AI & Tech for next gen professionals (Responses).xlsx`.
- Respondents: 107.
- Important privacy rule: never expose names, email addresses, or identifiable free-text data in analysis or outreach artifacts.

### Findings that support the pilot

| Finding | Evidence | Product implication |
| --- | --- | --- |
| AI awareness is already high. | 80/107 use AI daily; another 23/107 use it a few times a week. | Do not begin with generic “what is AI” education. |
| Usage exceeds building. | 41/107 report using AI to build products, versus widespread drafting, summarisation, and analysis use. | Target users who use AI but do not build repeatable workflows. |
| Practice and direction are the leading stated blockers. | 37/107 cite not enough practice; 37/107 do not know where to start/what to learn next. | Give a scoped real task and guided next action, not a content catalogue. |
| Real work is the strongest engagement mechanism. | 83/107 chose real-life challenges as making Tech/AI learning more fun. | The task must be work-like and personally relevant. |
| Learners want a complete practice loop. | Among regular AI learners (n=71), 51 chose both concept understanding and real-world practice. | Pair a usable artifact with a concise explanation and retry guidance. |
| Learning support matters. | 60/107 chose small goals, 49/107 peers/community, and 44/107 help when stuck. | Scope each task into a small mission; use live Build It cohorts and a handover pack. |
| Demand is conditional, not proven. | 46/107 said “maybe, if it genuinely helps”; 32/107 said price dependent. | Run a free research pilot, then test a concrete paid offer. |

### Sampling limits

- 73/107 respondents have formal technology education; the sample is not a pure non-technical-professional population.
- Product/management/design accounts for 41 responses; operations has 12; HR has only 2. Do not generalize HR conclusions from this dataset.
- The survey records stated preferences and self-reported use. It does not contain detailed recent task walkthroughs, observed performance, or validated willingness to pay.
- Questions about learning sources, preferences, formats, and motivations were answered only by the 71 people who said they regularly learn about AI. Do not use those results as if they represent every respondent.

### Recruitment pool

62 respondents meet the active pilot definition: they use AI at least weekly and did not report using AI to build products. This is the first invitation pool, subject to consent and appropriate outreach.

## 3. Pilot definition

### Audience

- Recruit 20–30 individual professionals from the 62 eligible survey respondents.
- Prioritize a deliberate mix of operations, product/management, marketing/sales, founders, finance, and people without formal technology education.
- This is an individual-facing free research pilot, not a company-team workshop.

### Delivery model

- No ongoing learner platform is required.
- Use a secure intake form, email/calendar scheduling, live sessions where needed, and a personal handover pack.
- Protect participant information and require safe, non-sensitive representative data by default.
- One human facilitator leads Build It; an approved AI assistant provides supporting guidance. Scope tasks tightly to avoid facilitator bottlenecks.

### Participant route choice

At intake, each participant chooses one route. Choice is unrestricted; record it as research data. Do not claim causal performance comparisons between routes because participants self-select.

| Route | Participant experience | Delivery standard |
| --- | --- | --- |
| `ship_it` | Receive a usable, scoped workflow/output. | Human-reviewed output plus handover within 48 hours. |
| `build_it` | Create and test the workflow personally. | 20-minute pre-intake plus a 2.5–3 hour live build sprint. Run cohorts of at most 8–10, grouped by workflow template. |
| `understand_it` | Receive the outcome and learn the minimum fundamentals behind it. | Output plus tailored explanation/handover within 48 hours. |

Every route receives a personal handover pack:

1. workflow map and purpose;
2. reusable prompt/template or implementation artifact;
3. expected inputs, outputs, and quality checks;
4. safe-use and data-handling guardrails;
5. common failure states and recovery steps;
6. one next practice task;
7. selected relevant fundamentals from *The Builder's Gita*, cited by chapter/page where used.

## 4. Task intake and safety triage

### Required intake fields

Capture: role, task description, task frequency, current process, desired output, success definition, available tools, data sensitivity, constraints, and selected route.

### Accepted outcome templates

Any participant task may be submitted, but the facilitator must map it to one bounded template:

1. Research or decision-brief assistant.
2. Document, SOP, meeting, or communication workflow.
3. Spreadsheet/data-analysis workflow.
4. Simple internal prototype.

### Triage rules

- Narrow overlarge tasks to one demonstrable, repeatable workflow.
- Use synthetic/non-sensitive representative data by default.
- Do not process confidential personal data, regulated decisions, legal/medical/financial advice, irreversible actions, or external-system actions in the pilot.
- If a real task is unsafe or too complex, convert it to a smaller safe representative workflow; record the scope change and rationale.
- If it cannot be safely narrowed, decline it and offer a comparable approved mission.

## 5. Research and success measurement

### Baseline

At intake, record role, prior AI use, confidence, baseline ability to perform the workflow unaided, task context, selected route, and selected template.

### Immediate post-delivery feedback

Collect: completion status, perceived usefulness, clarity of the handover, remaining blockers, and route satisfaction.

### Seven-day follow-up

Collect a written reflection seven days after delivery. Ask whether the participant reused or adapted the workflow; what task they used it for; what changed; what result occurred; what blocked them; and what help they still needed.

This is **self-reported reuse**, not verified independent mastery. Use that wording consistently in all reporting.

### Paid demand test

At the seven-day follow-up, offer every participant:

> **Second Personalized Build — ₹499**
>
> One new scoped task, delivered within 48 hours with a tailored handover and review.

This must be a real purchase option, not a price survey.

### Go/no-go rule for a paid iteration

Continue only if all conditions hold:

- At least 50% of enrolled participants report self-reported reuse/adaptation at day seven.
- At least 20% of all enrolled participants purchase the ₹499 second personalized build.
- At least 70% of enrolled participants complete the seven-day follow-up.

For a 20–30 participant pilot, this means approximately 10–15 reuse reports and 4–6 purchases. If follow-up completion is below 70%, label results inconclusive rather than successful.

## 6. Analysis requirements

Report results separately by:

- selected route (`ship_it`, `build_it`, `understand_it`);
- workflow template;
- role group;
- formal technology education status;
- baseline confidence and AI-use frequency.

Answer these questions after the pilot:

1. Which route do users choose when given a real choice?
2. Which task types can be safely scoped, delivered, and handed over within 48 hours?
3. Where do users get stuck: task definition, setup, prompting, evaluation, iteration, or application?
4. Which book fundamentals recur across workflows and should become standard reusable handover modules?
5. Which route/task combinations generate self-reported reuse?
6. Who buys the ₹499 second personalized build, and what do they say they are buying?

Do not optimize for attendance, session satisfaction, or content consumed as primary success metrics. The signal that matters is repeat application plus real paid demand.

## 7. Agent guardrails

- Do not revert to the earlier adaptive-app plan unless the owner explicitly requests it after pilot evidence.
- Do not turn the pilot into a generic course, certificate, content library, or AI-awareness workshop.
- Do not promise that Ship It produces a production-ready system; it produces a safe, scoped workflow/output and handover.
- Do not use unverified self-reports as evidence of objective skill mastery.
- Do not use participant data beyond this research/pilot purpose without explicit consent.
- When proposing future work, preserve the distinction between `ship_it` demand, `build_it` capability, and `understand_it` explanation demand.

## 8. Immediate next actions

1. Create a safe task-intake form using the required fields and route options above.
2. Prepare the four workflow-template playbooks and standard handover-pack template.
3. Draft a consented invitation for eligible survey respondents; recruit 20–30 participants while balancing the target mix.
4. Prepare Build It cohort schedules, facilitation scripts, triage checklist, and approved AI-tool guidance.
5. Prepare immediate feedback and seven-day reflection forms before recruitment begins.
6. Prepare the ₹499 second-personalized-build checkout/commitment path before sending the follow-up.

