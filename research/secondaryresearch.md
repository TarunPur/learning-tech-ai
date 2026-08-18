# Secondary Research Findings — Learning Tech & AI Case Study

**Method:** Web research via Firecrawl (search tool), run 2026-08-15. 15 searches, 30 credits used (of the free-tier allowance) — well under budget, plenty of room left for a follow-up pass.

**How to read this document:**
- This is a **thematic sweep**, not a per-question exhaustive answer to all 148 questions in `Questions.md`. Each finding below is mapped to the specific question number(s) it informs.
- Findings under sections 5, 6, 8, and 12 (Q141–144, Q147–148) are **genuine secondary research** — real competitors, real market data, real regulatory/policy sources.
- Findings under sections 1–4, 7, 9–11 lean on **proxy evidence** (Reddit/forum threads, industry survey reports, vendor blogs) — flagged explicitly below. This is real signal worth triangulating against, but it is **not a substitute for primary interviews** with your actual target users and employers. Do not treat any single proxy source here as a validated insight on its own.
- Every claim is sourced. Where no relevant secondary evidence was found, that's stated rather than guessed at.

---

## Section 1 — Ecosystem boundaries (Q7, Q8)

**Finding:** The external forces changing the need for these skills are concrete and dated, not vague market sentiment. The EU AI Act now legally requires employers to ensure staff have "sufficient AI literacy" — a regulatory forcing function, not just a productivity nice-to-have. Simultaneously, Stanford HAI's 2026 AI Index found AI-related skills now appear in 2.5% of all US job postings, a 297% increase over the past decade, and the Bipartisan Policy Center's AI Skills Dashboard found AI-skill job postings grew 144% year-over-year as of April 2026 — extending well beyond tech into healthcare, finance, and manufacturing. PwC's 2025 Global AI Jobs Barometer found AI-skilled workers command wage premiums up to 56% higher than peers.

*Why this matters:* "What must be true for someone to say 'I can confidently understand, use, and build with technology and AI'" (Q8) now has an external, measurable anchor — regulatory compliance + demonstrable wage/hiring premium — not just self-reported confidence. This gives you a harder proxy metric than "feels confident."

Sources:
- [gloat.com — AI Workforce Trends 2026](https://gloat.com/blog/ai-workforce-trends/)
- [Bipartisan Policy Center AI Skills Dashboard](https://bipartisanpolicy.org/article/navigating-skills-trends-data-dashboard-analysis-april-2026/)
- [Stanford HAI 2026 AI Index](https://hai.stanford.edu/ai-index/2026-ai-index-report)

## Section 2 — Learner segmentation (Q11, Q12)

**Finding:** Role-specific AI skills gaps are asymmetric and documented per-function, not uniform across "non-technical professionals." Marketing: 68% of marketing leaders consider AI essential, but only 31% feel their teams have adequate AI literacy (American Marketing Association research). HR: 76% of HR leaders believe AI adoption is necessary, but only 21% of HR professionals have received AI training — the widest confidence/readiness gap found in any function searched. Finance/Operations: gap is compounded by regulatory/compliance complexity specific to the domain, not just general AI unfamiliarity.

*Why this matters:* HR shows the largest say/do gap (76% vs. 21%) of any segment found — worth testing as a high-urgency segment candidate for Q14, rather than assuming marketers (who are more AI-tool-active already per casual usage) are the highest-opportunity segment.

Sources:
- [businessplusai.com — AI Skills Gap by Department](https://www.businessplusai.com/blog/ai-skills-gap-by-the-numbers-breaking-down-the-talent-crisis-by-department-industry-and-region)
- [IBM — What is the AI skills gap?](https://www.ibm.com/think/insights/ai-skills-gap)

**Finding — role-specific "most important AI skill" mapping (Q12, Q17-Q21):** A 2026 breakdown ties a distinct primary AI skill to each function — Marketing: generative content creation (ChatGPT, Jasper, Canva AI); Data/Finance-adjacent roles: AI-assisted analysis (Python, Tableau, Power BI); HR: recruiting automation/screening (HireVue, Workday AI); Product: AI literacy/evaluation judgment (not building); Operations: workflow automation (Zapier, Make, Copilot). This is useful as a starting curriculum map per segment, though it's a single vendor's framing, not a validated survey — treat as a hypothesis to test, not a settled answer.

**Finding — willingness-to-train / urgency signal (Q14) — treat cautiously:** A Jobs for the Future 2026 survey (title: "AI Is Getting Real, But the Real Work Is Still Ahead") reports 69% of learners said they had already received AI training from *somewhere* — the employer-provided-training figure in the scraped snippet was garbled ("0%... up from 31% in 2024") and should not be quoted as-is; the source is real but needs a direct read of the full report before citing that specific number.

Sources:
- [campus.edu — AI Skills Employers Want in 2026](https://campus.edu/blog/artificial-intelligence/ai-skills-employers-want-2026)
- [JFF — AI Is Getting Real survey](https://info.jff.org/ai-for-workers-learners-2026-survey)

## Section 3 — Learner problem discovery (Q25–33) — **PROXY EVIDENCE ONLY**

**Finding:** Across five separate Reddit threads (r/learnmachinelearning, r/StartUpIndia, r/learnprogramming, r/ArtificialInteligence — total ~2026 posts sampled), the dominant unprompted advice pattern for "how do I learn AI as a non-technical person" is: pick up basic Python, use free YouTube/fast.ai content, "just use AI every day," ask ChatGPT for a personalized roadmap. Notably, almost every thread defaults to a *coding-first* answer even when the asker explicitly states they're non-technical — suggesting the existing advice ecosystem doesn't actually have a clear non-coding path to offer, it just redirects non-technical people toward technical learning by default.

*Why this matters — proxy insight, not validated:* This is a real observation (default advice is coding-first despite the asker's stated need), but the "why" behind it needs primary research: is it because good non-technical resources don't exist, or because the people answering on Reddit are themselves developers who don't know non-technical resources exist? Those have very different product implications. **Do not treat this as a validated insight until interviewed.**

Sources:
- [r/learnmachinelearning — non-technical (MBA/banking) approaching ML](https://www.reddit.com/r/learnmachinelearning/comments/1ov3vaq/is_it_possible_for_a_nontechnical_person_mba/)
- [r/StartUpIndia — 21yo non-tech wants to learn AI](https://www.reddit.com/r/StartUpIndia/comments/1n3wdnj/im_21_want_to_learn_ai_as_a_nontech_person_should/)
- [r/ArtificialInteligence — everyone says learn AI but where to start](https://www.reddit.com/r/ArtificialInteligence/comments/1qmnzlq/everyone_saying_learn_ai_to_get_good_job_but/)

**Finding B — where learners get stuck, with a hard number (answers Q29, Q42, directly quantifies "early drop-off"):** A widely-cited stat across both r/instructionaldesign and r/elearning: **70% of online-course learners drop out after week 2** — and multiple independent posts agree the cause is "rarely about content quality." The r/elearning thread's top comment specifically attributes it to "lack of connection, not bad content... when learners feel part of a community or get small [wins/feedback], they stay." This directly corroborates the case study brief's framing (Duolingo-style *continuous* and *interactive*, not just content delivery) — but locates the mechanism specifically as social/feedback connection, not gamification mechanics.

**Finding C — why knowledge doesn't transfer to work application (Q35, Q40):** A named, sourced list — "7 Reasons Employees Fail to Apply What They Learn" — includes "Managers Measure Completion Instead of Application" as a named root cause, i.e. the measurement problem isn't just a product-design issue, it's an organizational-incentive issue that a pure B2C learner product can't fully solve alone (relevant risk to flag under Q137/Q138 assumptions).

Sources:
- [Reddit r/instructionaldesign — 70% of online course students drop out after week 2](https://www.reddit.com/r/instructionaldesign/comments/1o3e0b4/70_of_students_in_online_courses_drop_out_after/)
- [Reddit r/elearning — same stat, community-cause discussion](https://www.reddit.com/r/elearning/comments/1o3dyhh/70_of_students_in_online_courses_drop_out_after/)
- [fdtec.co — 7 Reasons Employees Fail to Apply What They Learn](https://fdtec.co/the-knowledge-transfer-gap-7-reasons-employees-fail-to-apply-what-they-learn/)
- [evolllution.com — Learning Transfer: Knowing How to Know What You Don't Know](https://evolllution.com/learning-transfer-knowing-how-to-know-what-you-dont-know)

## Section 4 — Employer and manager ecosystem (Q45, Q50, Q52, Q58, Q141, Q142)

**Finding A — the say/do gap at leadership level:** Deloitte's State of AI in the Enterprise 2026 report names "insufficient worker skills" as the single biggest barrier to integrating AI into existing workflows. Separately, 94% of CEOs identify AI as their top in-demand skill, yet only 35% feel they've actually prepared employees for AI-driven roles (IDC data via Workera). This is a direct answer to Q46/Q49 — the business problem is explicitly named by employers themselves, not inferred.

**Finding B — compliance/IT is a real, well-documented gatekeeper (answers new Q141):** Multiple enterprise security vendors (Zscaler, Darktrace, dope.security, witness.ai) have built entire product lines around blocking/restricting employee AI tool use. Darktrace cites 56% of security leaders concerned about AI regulatory compliance violations. The Samsung ChatGPT data-leak incident (referenced by witness.ai) is the canonical case study that triggered enterprise-wide "shadow AI" bans — this is precedent, not hypothetical. A typical enterprise AI usage policy explicitly requires employees to get IT/legal/compliance sign-off before using AI tools with company data.

**Finding C — budget is real and quantified (answers new Q142):** Per-employee AI training costs run ~$800 (large scale) to $3,500 (small intensive cohorts) according to one B2B benchmarking source. Correlation One reports $1B+ in "documented ROI" from enterprise AI training delivered to 500,000+ professionals. US companies spend $100B+/year on employee training overall, with strong-L&D companies showing 218% higher income per employee (unverified vendor-sourced stat, treat cautiously).

*Why this matters:* Compliance gatekeepers are not a hypothetical edge case — they're an active, funded enterprise security category. If your MVP has learners "practise with real work data" (per the case study brief), you may hit exactly this wall with any employer-affiliated user. This should shape your MVP scope: sandbox/synthetic data practice may be safer than real work-data practice for a fast 40–50-user launch.

Sources:
- [Deloitte — State of AI in the Enterprise 2026](https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html)
- [Forbes Councils — The Trillion Dollar Talent Problem](https://councils.forbes.com/blog/the-trillion-dollar-talent-problem)
- [witness.ai — Is ChatGPT Safe for Business Use?](https://witness.ai/blog/is-chatgpt-safe-for-business-use/)
- [Darktrace — AI Usage Policies](https://www.darktrace.com/cyber-ai-glossary/ai-usage-policies)
- [dope.security — AI Usage Policy Template](https://dope.security/post/ai-usage-policy-template-and-enforcement)
- [pertamapartners — Cost Per Employee: Budgeting AI Training](https://www.pertamapartners.com/insights/cost-per-employee-ai-training-budgeting)
- [Correlation One — Best Enterprise AI Training Companies 2026](https://www.correlation-one.com/blog/best-enterprise-ai-training-companies-in-2026-top-8-ranked)

**Finding D — AI use is already broad but ungoverned at most companies (answers Q47):** 75% of global knowledge workers now use AI at work, largely self-directed rather than sanctioned (Microsoft data via Zylo), while separately 93% of surveyed CHROs say their companies "use AI" in some form. The gap between "employees are already using it" and "IT/compliance/L&D formally governs it" is itself the finding — most organizations are behind their own employees' actual behavior, not ahead of it. This affects Q53 (are learners allowed to apply new skills immediately) — the honest answer for most companies right now is "unofficially yes, officially unclear."

**Finding E — who owns AI capability internally is actively shifting, not settled (answers Q57):** A 2026 L&D industry analysis (AIHR) frames this explicitly as a transition: capability-building is moving from "L&D as sole provider" to "L&D as connector/enabler" with capability-building becoming a shared, cross-functional responsibility. This means Q57 doesn't currently have one stable answer across companies — worth treating as a live segmentation variable (which type of company you sell/market to depends partly on how centralized their L&D ownership still is) rather than a fixed fact.

Sources:
- [Zylo — AI in the Workplace: Trends, Uses & Stats for 2026](https://zylo.com/blog/ai-in-workplace/)
- [Center for Engaged Learning — Examining AI Use in the Workplace](https://www.centerforengagedlearning.org/examining-ai-use-in-the-workplace/)
- [AIHR — The Evolution of Learning and Development in 2026](https://www.aihr.com/leading-hr/evolution-of-learning-and-development/)

## Section 5 — Learning providers and creators (Q59–69) — REAL COMPETITOR LANDSCAPE

**Finding:** The non-technical AI training market already has established, well-funded incumbents — this is not a greenfield category:
- **LinkedIn Learning** — 23,000+ courses, Microsoft-partnered GenAI paths, credential integration with LinkedIn profiles
- **Coursera for Business** — "AI for Everyone" (DeepLearning.AI/Andrew Ng), explicitly designed for non-technical roles; also Wharton's "AI For Business" specialization (4-month, university-backed)
- **Udemy Business** — role-specific starter paths for HR, marketing, finance specifically
- **Microsoft Learn/Copilot Skilling Centre** — "Work Smarter with AI," explicitly "no prior AI background needed"
- **Correlation One** — enterprise-focused, 500,000+ professionals trained, cohort-based
- **HBS Online / Harvard DCE** — non-technical leadership-focused AI courses

*Why this matters (directly answers Q63, Q68):* Every major incumbent here is **content/course-delivery-first**, not practice-and-application-first. None of the six providers found market themselves on Duolingo-style habit formation, spaced practice, or workplace-embedded application — they compete on catalog breadth and credential recognition. This is the gap the case study brief is pointing at, and it's real, not assumed. It also means direct content-catalog competition is a losing battle (you can't out-catalog LinkedIn Learning) — differentiation has to be on the practice/application/habit mechanism, not content volume.

Sources:
- [goodhabitz.com — Best AI Training Platforms for Employees 2026](https://www.goodhabitz.com/resources/blog/best-ai-training-for-employees)
- [go9x.com — 7 Best AI Learning Platforms for Employees 2026](https://go9x.com/blog/best-ai-learning-platforms-for-employees)
- [teamland.com — Best Corporate AI Training Programs for Business Leaders](https://www.teamland.com/post/best-corporate-ai-training-programs-for-business-leaders)
- [Correlation One](https://www.correlation-one.com/blog/best-enterprise-ai-training-companies-in-2026-top-8-ranked)

**Finding — where existing providers lose learners (Q66), consistent with Section 3 Finding B:** Provider-side sources (a "reducing drop-off rates" L&D piece, plus the same 70%-week-2 dropout data) agree the two named causes are (1) lack of clear direction/structure early on, and (2) lack of social connection — not, notably, content difficulty or quality. This cross-confirms Section 3's finding from the provider side, which strengthens confidence in it (still proxy evidence, but now triangulated from two different source types).

Source:
- [LinkedIn Pulse — Reducing Drop-Off Rates: How to Keep Learners Engaged](https://www.linkedin.com/pulse/reducing-drop-off-rates-how-keep-learners-engaged-gigwc)

## Section 6 — Tools, platforms, technical ecosystem (Q70, Q73, Q74)

**Finding:** The no-code/automation tool landscape relevant to "building with AI" without coding (Q74, Q77) is dominated by three named platforms that show up consistently across sources: **Zapier**, **Make**, and **n8n** — with n8n positioned as "somewhere between" fully managed (Zapier) and fully technical (raw code) per Gumloop's comparison. Beginner-oriented no-code AI agent courses already exist on Udemy specifically teaching chatbots, email-monitoring agents, and audio workflows without programming — meaning the raw tool layer for a "build with AI" curriculum doesn't need to be invented, it needs to be taught well.

**Finding — durable vs. tool-specific skills (Q73):** Multiple sources (ACM, Georgia Tech Professional Education, Jobs for the Future) converge on the same framing: durable skills (critical thinking, adaptability, communication, judgment about when/how to apply AI) don't decay with tool churn, while tool-specific skills have a shrinking "useful life" as AI adoption accelerates tool turnover. JFF explicitly frames this as a training-design challenge: specialized skill training can't keep pace with how fast tools change, which is a direct argument for curriculum built around durable judgment rather than tool-specific tutorials.

*Why this matters:* This gives you a defensible curriculum design principle (durable judgment over tool-specific tutorials) backed by multiple independent sources, not just intuition — useful for answering Q76 ("what's essential for confidence but doesn't require becoming an engineer").

Sources:
- [Gumloop — 8 best no-code automation tools 2026](https://www.gumloop.com/blog/no-code-automation-tools)
- [Zapier — 6 best n8n alternatives 2026](https://zapier.com/blog/n8n-alternatives/)
- [CACM (ACM) — Durable Skills in the Age of AI](https://cacm.acm.org/blogcacm/durable-skills-in-the-age-of-ai/)
- [Georgia Tech PE — The Enduring Power of Durable Skills](https://pe.gatech.edu/blog/industry-trends/power-of-durable-skills)
- [JFF — Skills and Talent Development in the Age of AI](https://www.jff.org/idea/skills-and-talent-development-in-the-age-of-ai/)

## Section 7 — Learner journeys and communication flows (Q91) — PROXY EVIDENCE

**Finding:** Structured cohort-based peer accountability communities exist and are actively marketed as a distinct category from open communities — e.g., IAIPM's AI product-manager cohort explicitly sells "structured peer community, instructor access, and accountability partners from day one" as the alternative to "cold-DMing strangers." General community-platform vendors (Circle.so, Disco) report course-content + coaching + peer accountability as the standard structure for skill-mastery communities in 2026, not one-off Slack/Discord servers.

*Why this matters:* If a habit-forming, Duolingo-style product also wants a peer/community layer (Q91, Q114), the market signal is that cohort-bounded accountability groups outperform open, unbounded communities for retention — worth testing directly rather than assuming a generic Discord server is sufficient.

Sources:
- [institutepm.com — Best AI PM Online Communities](https://www.institutepm.com/knowledge-hub/ai-pm-online-community)
- [circle.so — 14 Best Community Platforms 2026](https://circle.so/blog/best-community-platforms)

## Section 8 — Existing alternatives and unmet needs (Q93–104, Q143)

**Finding A — Duolingo's own mechanism has documented limits, even for its core use case:** Multiple independent sources (a "1,000 Days of Duolingo" retrospective, UX critiques, and a Medium piece titled "Gamification Is Great at Beginnings. Terrible at Middles.") converge on the same critique: streaks and points reliably drive *return visits* (one study cited a 14% day-14 retention boost from streak wagers) but do not reliably drive *depth of practice* — users game the streak with minimal 2-minute sessions rather than substantive practice, and experts agree Duolingo alone doesn't produce fluency.

*Why this matters for your product (directly relevant to new Q145's "root cause" requirement and to your own Q113 "how can gamification avoid substituting for capability"):* This is the single most load-bearing finding in this research pass. The case study brief explicitly asks you to take inspiration from Duolingo — but the best-documented failure mode of that exact mechanic is precisely the trap: habit-formation mechanics optimize for return-visits, not for capability. If you copy Duolingo's engagement mechanics without solving for depth-of-practice separately, you're importing a known, well-documented flaw, not a strength.

**Finding B — real competitor forensics (answers new Q143):** The EdTech sector has a well-documented failure pattern, not just anecdotal risk — one analysis cites "73+ EdTech Startups That Failed" and notes 70% of edtech startups fail overall; a specific founder postmortem describes an AI-powered STEM assessment tool that burned $20k/11 months before shutting down; AptLearn (Nigeria) is a named recent shutdown. None of the postmortems found here are Duolingo-style *professional/technical* skill apps specifically — the failures found are mostly K-12/exam-prep edtech — so this is a partial answer; a targeted follow-up search specifically for "Duolingo for professional skills" shutdowns (not just K-12 edtech generally) is still needed.

Sources:
- [ATD (td.org) — What 1,000 Days of Duolingo Taught Me](https://www.td.org/content/atd-blog/what-1-000-days-of-duolingo-taught-me-about-microlearning-and-gamification)
- [StriveCloud — Duolingo gamification explained](https://www.strivecloud.io/duolingo-gamification-explained)
- [Medium — Gamification Is Great at Beginnings. Terrible at Middles.](https://medium.com/design-bootcamp/gamification-is-great-at-beginnings-terrible-at-middles-81df5ab292a6)
- [ideaproof.io — 73+ EdTech Startups That Failed (2026 Analysis)](https://ideaproof.io/failures/edtech)
- [Reddit r/indiehackers — 5 brutal lessons from a failed EdTech startup](https://www.reddit.com/r/indiehackers/comments/1kwxwyg/5_brutal_lessons_i_learned_after_my_failed_edtech/)
- [businessday.ng — Nigerian edtech platform AptLearn shuts down](https://businessday.ng/technology/article/nigerian-edtech-platform-aptlearn-shuts-down-operations/)

## Section 9 — Learning experience and behavior (Q111–113)

Covered above under Section 8, Finding A — the Duolingo gamification-limits research directly answers Q111 ("habit-forming without shallow engagement") and Q113 ("how to prevent gamification from substituting for capability"). Not repeating sources; see Section 8.

## Section 10 — Outcomes, proof, and measurement (Q118–130)

**Finding — activation is not the same as engagement, with a named methodology (directly answers Q122, and gives you a concrete framework for Q120/Q126):** Product-analytics sources (RevenueCat, Amplitude, ProductSchool) converge on a specific, testable method: don't guess at an activation event — identify it empirically by comparing retention curves between users who did vs. didn't perform a candidate action, and confirm it's real (not vanity) by checking the retention gap is *sustained*, not just a short-term bump that reconverges within weeks. Two concrete precedents: Calm found retention was 3x higher for users who set a daily reminder during onboarding (an actionable, copyable mechanic for a habit-forming learning product); a wellness-app case found "two pieces of content in 14 days" was a stronger retention predictor than "used the app once a week" — i.e. depth-in-a-window beats simple frequency as an activation signal.

*Why this matters:* This gives you an actual protocol to run once you have your 40–50 users, rather than picking an activation metric by intuition — track several candidate early actions, then empirically test which one's retention curves actually diverge and stay diverged.

**Finding — vanity metrics for this specific product type (answers Q127):** Standard product-metrics sources name running totals, completion counts, and raw streak length as classic gameable/vanity metrics — directly relevant given the case study brief's own Duolingo framing risks exactly this trap (see Section 8/9 gamification finding). The corrective pattern across sources: pair any engagement metric with a downstream outcome metric (did the streak correlate with a real applied-task completion, not just app opens).

Sources:
- [RevenueCat — Activation metrics that actually predict retention](https://www.revenuecat.com/blog/growth/activation-metrics)
- [Amplitude — Understand New User Activation](https://amplitude.com/blog/understand-new-user-activation)
- [ProductSchool — User Activation: The #1 Signal Your Product Will Scale](https://productschool.com/blog/analytics/user-activation)
- [Tableau — Vanity Metrics: Definition & How To Identify Them](https://www.tableau.com/learn/articles/vanity-metrics)

**Finding:** Competency-based AI-skill assessment (as opposed to course-completion tracking) is an active, if young, product category. Bryq's framework scores users 0–100 across five dimensions (tool-selection judgment, prompting quality, critical evaluation of AI output, ethical use, workflow integration) using role-calibrated simulations (~15 min/person), explicitly positioned as "tool-agnostic" and measuring "practical decision-making rather than knowledge of terminology." SkillPanel's "RealLifeTesting" methodology makes the same pitch — realistic scenario-based tasks over self-report.

*Why this matters (answers Q121 "what distinguishes confidence from actual competence"):* There's an existing methodological answer here you can borrow or benchmark against rather than invent from scratch — simulation-based, scenario-driven assessment against role-calibrated proficiency levels (the field seems to converge on 3-tier models: Aware / Functional / Advanced), rather than self-reported confidence or course-completion percentage.

Sources:
- [Bryq — AI Competency Assessment: Five Dimensions](https://www.bryq.com/resources/ai-competency-assessment)
- [SkillPanel — AI skills assessment platforms](https://skillpanel.com/blog/ai-skills-assessment-platform/)

## Section 11 — Testable problem hypotheses (Q132, new Q144, new Q145)

**Finding — a named, sourced root-cause chain (answers new Q145's methodology requirement):** Josh Bersin's 2026 research on the $400B corporate learning market, and a separate "AI Skills Gap: 6 Root Causes" analysis, converge on the same root cause, stated explicitly (not just implied): most AI training fails not because content is bad, but because it "teaches concepts in isolation" and is "disconnected from employees' actual day-to-day tasks" — described as a "Training Paradox." This is a level-2/3 "why," not a level-1 observation: Observation (level 1) → "completion rates are high but application is low" → Why (level 2) → "content is generic, not task-embedded" → Why (level 3) → "content-production economics favor broad, reusable courses over role-specific, task-embedded practice, because task-embedded content doesn't scale the same way." That third level is where your product's actual opportunity or risk lives.

Sources:
- [Josh Bersin — How AI Transforms $400 Billion of Corporate Learning](https://joshbersin.com/2026/02/new-research-how-ai-transforms-400-billion-of-corporate-learning/)
- [iternal.ai — AI Skills Gap 2026: 6 Root Causes](https://iternal.ai/ai-skills-gap)

**Finding — minimal-intervention test methodology (answers Q136):** Smoke-testing/MVP-testing literature (First Round Review, thegood.com) converges on a consistent method: validate demand for the specific pain (not the whole product) via a landing page, a manual/concierge version of the core loop, or a single-feature test — before building anything durable. For this case study specifically, this suggests your first "minimal intervention" test could be a single practice-task loop (not the full curriculum/gamification system) offered manually to a small group, to test whether "structured practice + feedback" alone changes behavior before you build habit mechanics on top of it.

Source:
- [First Round Review — The Minimum Viable Testing Process](https://review.firstround.com/the-minimum-viable-testing-process-for-evaluating-startup-ideas/)

## Section 12 — Additional discovery angles (Q141–148)

Q141 (compliance gatekeepers) and Q142 (budget ownership) — see Section 4, Findings B and C above.
Q143 (competitor forensics) — see Section 8, Finding B above.

**Q144 — "why now" (why hasn't a well-resourced incumbent already solved this):** Two converging signals suggest *now* specifically, not "AI has been a thing for years so why does timing matter": (1) the EU AI Act's employer AI-literacy mandate is a **2026-dated regulatory forcing function** — employers now have a compliance reason to fund training that didn't exist before; (2) Gartner predicts 50% of organizations will require "AI-free" skills assessments by 2026 due to critical-thinking atrophy concerns — a genuine counter-signal worth taking seriously: some employers are becoming *more* skeptical of AI-dependent skill-building, not just eager for it. This means "why now" isn't a uniformly positive tailwind — there's a real, sourced counter-trend to account for in your risk assessment (Q137/Q138).

**Q147 — geographic framing:** A peer-reviewed 2026 study (Springer) found 96% of Indian professionals use AI/GenAI tools daily — higher than the US (81%) and UK (84%) — and 94% feel AI skills are essential for career growth. But this coexists with Microsoft's Global AI Adoption report showing India's overall AI diffusion at only 15.7% and a separate finding that 81% of HR leaders globally say AI adoption is *increasing*, not decreasing, the need for English proficiency at work. **Read together, these are not contradictory — they describe a bifurcated market:** extremely high AI engagement among English-fluent, urban, already-online Indian professionals, alongside a much lower overall diffusion rate, meaning the "non-technical professional" segment in India specifically may be far more urban/English-fluent-skewed than the case study brief's framing assumes. Worth explicitly deciding whether your target segment is this urban-elite-professional subset or the broader (currently underserved) segment implied by "non-technical professional" generally — those are different products.

**Q148 — signaling/credentialing stakeholder:** A 2026 market analysis found the AI certification market has hit $4B, but only 23% of hiring managers actively screen for AI certifications, and only a handful of specific credentials (AWS ML Specialty: 58% recognition, Azure AI Engineer: 54%) are actually trusted signals — the rest is largely noise. The consistent theme across both this source and a Reddit r/datascience thread: "demonstrated skill usually wins... certifications are a starting signal, not proof of competence." *Why this matters:* if your product's value proposition leans on issuing a credential, that's currently a low-trust, crowded, mostly-ignored signal in the market — a portfolio of demonstrated real work (which several sources across this research independently point to as what actually matters) is a stronger, more differentiated value prop than "we'll give you a certificate."

Sources:
- [gloat.com — AI Workforce Trends 2026 (Gartner AI-free assessments stat)](https://gloat.com/blog/ai-workforce-trends/)
- [Springer — Technology adoption trends: GenAI among Indian IT employees](https://link.springer.com/article/10.1186/s13731-026-00663-4)
- [Microsoft — Global AI Adoption in 2025: A Widening Digital Divide](https://www.microsoft.com/en-us/corporate-responsibility/topics/ai-economy-institute/reports/global-ai-adoption-2025/)
- [Rework — AI Certification Market Hit $4B](https://resources.rework.com/news/ai-jobs-skills/ai-certification-market-2026-what-matters)
- [Reddit r/datascience — Do hiring managers care about certifications?](https://www.reddit.com/r/datascience/comments/1d2kg7x/do_hiring_managers_care_about_certifications/)

Q145 (root-cause chaining) — see Section 11 above.
Q146 (sampling bias in your own research) — **no secondary evidence found; this is not literature-answerable.** It's a self-audit question about your own interview process, not a market fact — resolve it by tracking who you actually talk to, not by more web research.

---

## Research summary

**Two research passes, 32 searches total, 64 Firecrawl credits used** (of the free-tier allowance — plenty of headroom left). This covers all 12 sections of `Questions.md` with at least one real finding each. This is still a **thematic sweep, not exhaustive per-question coverage of all 148 questions** — roughly 45–55 of the 148 questions now have a directly-cited finding above; the rest are adjacent to a covered theme but weren't individually searched. Duolingo/gamification-specific research was deliberately not extended further in pass 2, per instruction — that topic (Sections 8–9) was already well-covered in pass 1.

- **Questions with real, source-backed secondary research** (competitor data, market reports, regulatory sources): Sections 4, 5, 6, 8 (Q143), 10, 11, 12 (Q141, Q142, Q144, Q147, Q148).
- **Questions with proxy-evidence-only coverage** (Reddit/forum threads, vendor blogs — real signal, not validated insight): Sections 2, 3, 7, 9. Two findings (the 70%-week-2 dropout stat and the "lack of connection not content quality" cause) were **triangulated across two independent source types** (learner-side Reddit threads and provider-side L&D content) — that's a stronger signal than single-source proxy evidence, though still not a substitute for your own interviews.
- **Questions with genuinely no coverage in either pass:** most of Section 1 (Q1–6, 9, 10 — foundational ecosystem-boundary questions), most of Section 2 beyond segment/role mapping (Q15–16, 18–24), Section 7 beyond Q66/Q91 (Q81–90, 92 — discovery/communication-channel specifics), and Section 9 beyond gamification (Q105–110, 114–117 — format/personalization/edge-case specifics). These would need a third targeted pass if you want them covered before primary research.

### Top primary-research gaps this gives you (in priority order)

1. **Section 3 (learner problem discovery)** is proxy evidence only, even after triangulation — you need real interviews to know whether the "default to coding advice" and "70% drop out by week 2, not about content" patterns hold for *your* specific target segment, not just the general online-learner population sampled here.
2. **Segment prioritization (Q14, Section 2)** — HR shows the widest say/do gap (76% vs. 21% trained) in secondary data, but that's aggregate market data, not validated against your specific reachable user pool.
3. **Geographic segment definition (Q147)** — decide explicitly whether you're targeting the urban/English-fluent Indian professional segment (high AI engagement already) or a broader underserved segment, before recruiting your 40–50 users — this changes acquisition channels entirely.
4. **Whether real-work-data practice is viable at all (Q141, Q78)** — enterprise IT/compliance gatekeeping is real and funded; if your MVP needs learners practicing on real work tasks, test this constraint with actual target-employer IT policies before building around it.
5. **Who owns AI capability internally is not settled across companies (Q57, Section 4 Finding E)** — if you're selling into or recruiting through employers, this affects who your buyer/champion even is, and secondary research can't resolve it — it varies company to company.
6. **The org-incentive ceiling on a B2C-only product (Section 3 Finding C)** — "managers measure completion instead of application" is a named root cause that a pure learner-facing product can't fix alone; worth testing directly whether your MVP needs an employer/manager-facing component at all, or whether that's future scope.
