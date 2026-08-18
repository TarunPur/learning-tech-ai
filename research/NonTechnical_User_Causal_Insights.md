# Causal insights: all-other-roles respondents

## How to read this

This report uses the current primary-research workbook of 160 responses. Its focus is the **84 respondents in “all other roles”**: everyone outside the project’s Product / Management / Design and Technical / Development / Data categories. This is an operational **non-technical / non-builder proxy**, not a direct measure of a person’s technical ability: 39 of the 84 also report formal technology education.

An insight below explains a mechanism; the supporting survey figures are included only as evidence, not presented as the insight itself. The survey is cross-sectional and self-reported, so it cannot prove the mechanism. Existing secondary research is used to make the causal explanation more defensible. Where a claim still needs task interviews or a pilot to confirm it, that is stated explicitly.

## 1. Frequent AI use is not the same as being able to create a repeatable AI-enabled workflow

**Insight.** These respondents can already get value from AI for one-off knowledge and document tasks, but that usage does not naturally develop into the ability to design, judge, and repeat a workflow.

**Survey signal.** 72/84 (86%) use AI for answers or summaries, 57/84 (68%) for documents, and 52/84 (62%) for image generation; only 11/84 (13%) select building products. This is a much larger build-use gap than among builder roles (58%).

**Why is this happening?** Generative AI makes the first output unusually easy to obtain: a person can ask for a draft, summary, or image without decomposing a problem, setting quality criteria, handling failures, or designing a reusable process. Those omitted activities are what make a workflow dependable. The human still owns the consequences of a poor output, but ordinary tool use does not necessarily teach them how to evaluate it. This is consistent with the evidence that AI capability depends on evaluative judgment, not just the ability to produce an output ([WebsearchINSIGHTS.md](WebsearchINSIGHTS.md), Insight 4).

**What does this change about what we should build?** The product’s unit of value cannot be AI exposure, prompts collected, or a finished lesson. It needs to be a participant’s ability to independently repeat a bounded, useful workflow and decide whether its output is good enough to use. Success measures should therefore test a later, independent attempt rather than usage frequency or completion.

**Evidence status.** The use/build gap is directly supported by this survey; the mechanism is secondary-research-supported and needs a task-based test with this cohort.

## 2. The first learning barrier is a decision problem, not simply an information shortage

**Insight.** When people must choose what to learn and practise without a task-specific decision rule, the abundance of AI content becomes a source of uncertainty rather than progress.

**Survey signal.** 28/84 (33%) select “I don’t know where to start / what to learn next,” the most-selected blocker. Of the 55 regular learners in this cohort, 45 (82%) use YouTube, while 22 (40%) use online courses. Learning (43/55) and career growth (39/55) are the leading motives.

**Why is this happening?** General sources are optimized to be broadly useful, so they present tools, concepts, and tutorials rather than tell a particular person which capability will improve a particular recurring task. The learner must supply the missing context—role, task, current process, risk, and desired outcome—and translate it into a next step. That creates a selection burden before practice even begins. The broader research supports the distinction between abundant content and workplace transfer ([WebsearchINSIGHTS.md](WebsearchINSIGHTS.md), Insight 1) and identifies loss of work context as a likely, still-unvalidated ecosystem failure (Insight 13).

**What does this change about what we should build?** The experience must reduce the number of consequential choices before a first useful attempt. It should start from a real task or a tightly bounded task type, make the next action explicit, and explain why that action is relevant. A larger catalogue or more generic resource links would not, on its own, resolve this mechanism.

**Evidence status.** Survey-supported pattern; the specific selection-burden mechanism is a well-supported inference that needs recent-task interviews to validate.

## 3. The central learning failure is transfer from explanation to action

**Insight.** The hard part is not merely understanding an AI concept; it is using it on a work-like task, receiving useful correction, and trying again until the person can perform it without the tutorial.

**Survey signal.** 25/84 (30%) report insufficient practice, 20/84 (24%) say content is too theoretical, and 14/84 (17%) say they understand tutorials but cannot do it themselves. At the same time, 60/84 (71%) choose real-life challenges as the most helpful way to make learning more engaging, and 50/84 (60%) choose small goals.

**Why is this happening?** A tutorial can demonstrate a successful path without requiring the learner to make decisions in a new situation. Generic exercises also tend to omit the messy inputs, constraints, quality bar, and consequences of real work. Without a representative attempt and feedback that changes the next attempt, learners can recognize an explanation while remaining unable to execute it. Training-transfer research distinguishes consumption and completion from independent work application; feedback works through corrected re-attempts, not through reassurance alone ([WebsearchINSIGHTS.md](WebsearchINSIGHTS.md), Insights 1 and 5).

**What does this change about what we should build?** Learning content, if used, needs to serve an attempt–feedback–retry loop around a realistic, safely scoped task. Work should be broken into small missions, but those missions must retain a genuine outcome and quality check; short activity or gamified progress alone is not evidence of capability.

**Evidence status.** Strongly triangulated: this cohort reports the three parts of the pattern, while the transfer mechanism is secondary-research-supported. The exact kind of practice task that produces transfer remains unvalidated.

## 4. Help becomes valuable at the moment of failure because generic content cannot diagnose a contextual mistake

**Insight.** For this cohort, support is not just a motivational add-on: it is likely required when a person’s real inputs or output quality differ from the tutorial’s happy path.

**Survey signal.** 16/84 (19%) select “I get stuck when something doesn’t work,” while 31/84 (37%) choose “a guide who helps when I’m stuck.” The tutorial-to-doing gap is also higher here (17%) than among builder roles (9%).

**Why is this happening?** AI outputs and no-code/tool workflows often fail in ways that are specific to the user’s input, objective, permissions, or quality standard. Generic lessons can supply an answer, but they cannot see which assumption the learner made or whether a revised output is safe and useful in that context. The learning mechanism is therefore not the presence of help; it is a diagnosis that enables a corrected action and, eventually, an independent retry ([WebsearchINSIGHTS.md](WebsearchINSIGHTS.md), Insight 5).

**What does this change about what we should build?** The product must make recovery from a failed attempt part of the core experience, not an optional support channel. Any assistance should lead to a revised user action and a check against an explicit quality standard; simply producing the answer for the participant would hide whether capability improved.

**Evidence status.** Survey-supported need for help; causal interpretation is secondary-research-supported. The form does not reveal the actual failure modes, so task walkthroughs are required before designing support flows.

## 5. “Non-technical” hides materially different jobs, risks, and starting points

**Insight.** A broad non-technical identity does not define a coherent learning job; the useful AI capability depends more on the task, the data involved, and the cost of an error than on whether someone is labelled technical.

**Survey signal.** The 84-person proxy contains operations (20), marketing/sales (12), students/learners (12), founders/business owners (10), finance/audit/compliance (11), HR (6), and other roles. Their current AI use spans documents (57), data analysis (44), images (52), and a small amount of building (11). Formal technical education is split 45 “No” and 39 “Yes.”

**Why is this happening?** A role title and an education credential are imperfect proxies for the decisions a person must make at work. For example, an operation’s workflow task, a finance-related analysis task, and an HR-related people decision require different data handling, verification, and oversight even if each user calls themselves non-technical. Secondary research similarly finds that required AI literacy is determined by work context and risk rather than a simple technical/non-technical identity ([WebsearchINSIGHTS.md](WebsearchINSIGHTS.md), Insights 3 and 9).

**What does this change about what we should build?** The product cannot assume one common curriculum or a single proficiency ladder for this whole cohort. It needs to identify a participant’s recurring task, intended outcome, available data, and consequence of error before selecting the practice and quality bar. Claims about a segment should remain narrow until a specific role–task combination is validated.

**Evidence status.** Strongly supported by cohort heterogeneity and secondary research. The current survey does not provide enough task detail to prioritize one role or workflow.

## 6. Learners want learning to fit into work-life constraints, but brevity alone will not solve the problem

**Insight.** The appeal of short lessons and small goals reflects a need to manage attention and effort, yet the demand for real-life challenges shows that convenience cannot replace meaningful practice.

**Survey signal.** Among the 55 regular learners, 33 (60%) prefer short daily lessons. Across the 84-person cohort, 50 (60%) want small goals and 60 (71%) want real-life challenges. Cost is also a blocker for 18/84 (21%).

**Why is this happening?** Adult learning competes with existing work and personal obligations, and the learner often bears the time and financial cost while the productivity benefit may be captured by an employer. That makes a large, abstract course hard to sustain. But a purely short or game-like interaction fails to establish the applied capability that learners actually seek. The workload-allocation mechanism is supported by adult-learning research, while research on learning products warns against treating engagement mechanics as proof of depth ([WebsearchINSIGHTS.md](WebsearchINSIGHTS.md), Insight 2; [secondaryresearch.md](secondaryresearch.md), Sections 8–10).

**What does this change about what we should build?** The experience should minimise setup and fit into short windows while protecting enough time for substantive task practice. The design should not optimize for streaks, minutes watched, or tiny content consumption at the expense of a completed, checked work-like outcome.

**Evidence status.** The preference pattern is direct survey evidence; workload and incentive explanations are secondary-research-supported. The survey did not ask directly about time at work, so this must be validated.

## 7. Interest in paying is conditional because users cannot yet evaluate a concrete economic outcome

**Insight.** The cohort’s willingness to pay is not evidence that it wants an AI course; it is a signal that people may pay once a relevant outcome is credible, bounded, and worth more than the perceived cost and effort.

**Survey signal.** 78/84 give a positive or conditional payment response, but only 12 say “Definitely.” The largest responses are “Maybe, if it genuinely helps me” (34) and “Depends on the price” (25); 7 would pay only if their employer did. Career growth is selected by 39/55 regular learners, but “building your own products” by only 15/55.

**Why is this happening?** The survey asks about a hypothetical, broad promise—getting better at AI—rather than a known, recurring task with a measurable benefit. That makes respondents unable to price the value confidently; conditional interest is a rational response to uncertain relevance and outcome. Career concern may bring people to explore AI, but it does not by itself define a task, a buyer, or a durable reason to pay ([WebsearchINSIGHTS.md](WebsearchINSIGHTS.md), Insight 6).

**What does this change about what we should build?** The product’s value proposition and demand test must be tied to a tangible first outcome for a real task, with a clear handover and evidence of reuse. Payment conclusions should be based on an actual offer and later behavior—not this survey response, learner interest, or course-completion metrics.

**Evidence status.** Direct survey evidence of conditional stated interest only. Actual willingness to pay and repeat use require a real purchase test.

## What this research still cannot answer

- Which one role–task combination has the most urgent, repeatable problem.
- Whether workplace manager support, policy, tool access, or data restrictions prevent these respondents from applying AI; the current workbook does not capture those details.
- Which practice format leads to independent reuse, safe judgment, or actual payment.
- Whether the 84-person proxy represents the intended market beyond this sample.

The next evidence step is a recent-task walkthrough followed by a small outcome-based pilot. Measure a later independent reuse attempt, not just satisfaction, completion, AI activity, or stated intent to pay.
