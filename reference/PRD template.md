# MeetFair: find the fairest place for everyone to meet

**DRI:** Harsh | **Pod:** AI Product Management Cohort Demo  
**Status:** Define | **Created:** 2026-08-13 | **Last Updated:** 2026-08-13  
**Figma:** none, code-first | **ERD / Engineering Docs:** written after PRD selection | **Analytics:** not wired, optional for the workshop MVP

**Document lineage:** This PRD defines the product and the solution. Once the engineering implementation plan exists, that plan becomes the execution source of truth. No formal user research has been done for this concept. It is a workshop build.

---

## A note to the team reading this

MeetFair is a teaching product before it is anything else. I want one small product loop that touches every layer we care about: frontend, backend, stored state, an external API, deterministic product logic, and AI. One loop, no scaffolding we don't need.

If you only read three sections, read **Key Logic**, **Key Flows**, and **Dependency Risks**. That is where the real decisions live.

---

> **Confidence tags**
>
> 🟢 Directly verified  
> 🟡 Supported by secondary evidence  
> 🔵 Hypothesis, not yet validated  
> 🔴 Contradicted

Every user-problem and success claim in this PRD is 🔵. No discovery has been run, so I am not going to pretend otherwise.

---

## The one-paragraph version

**ICP:** a small group of 2 to 5 people who already know each other, coordinating one in-person meetup inside the same city over chat, each starting from a different point.  
**North Star:** the share of groups that go from entering their starting points to a **saved** fair meeting choice. The whole demo is that loop closing end to end.  
**Aha Moment:** the user sees a café that is better on average get ranked *below* a café that is fair to everyone, and understands in one glance that MeetFair optimizes for the worst commute, not the middle.

---

## Changelog

| Change | Date | People | Comments / link |
|---|---|---|---|
| Initial workshop PRD | 2026-08-13 | Harsh | First draft |

---

# PART A: WHY

## 1. The problem

When three or more people need to meet, picking a venue turns into a negotiation around vague ideas like "somewhere central."

The problem is that the geographic center is not the fairest meeting point. One person has a direct metro route. Another needs two changes and a long walk. So a venue can look central on the map and still be a bad trip for one specific person. 🔵

Most tools start with **places**. MeetFair starts with **people and their travel burden**.

To be clear about the edges: I am not solving restaurant discovery, event planning, bookings, or navigation.

### 1.1 A real scenario

Three friends want to meet after work. One is in Koramangala, one in Indiranagar, one near Malleshwaram. They want a café that is reasonably priced and not painful for anyone to reach.

What happens today: someone names a neighborhood, everyone opens Maps on their own, and they argue it out over chat.

The thing that is missing is not another café directory. It is an answer to one question:

**Which good place gives this group the fairest trip?**

### 1.2 The breakdown you can watch

The usual flow looks like this:

suggest a neighborhood → search places → send links → each person checks their own travel time → someone rejects it → repeat.

All that effort lands right at the moment the group is trying to make a simple decision.

### 1.3 Evidence

| Evidence | Magnitude | Source | Confidence |
|---|---|---|---|
| Groups negotiate meeting spots by hand | Not formally measured | Product hypothesis | 🔵 |
| The geographic midpoint can differ from travel-time fairness | True depending on the transport network | Product reasoning | 🔵 |
| People may care more about avoiding one bad commute than about the total | Not validated | Product hypothesis | 🔵 |

### 1.4 Why now

Map and place APIs already expose enough structured location data to build this workflow. We do not have to build mapping infrastructure ourselves. 🔵

And LLMs can explain a recommendation we have already computed, in plain language, instead of being trusted to do the ranking.

> **Key insight**
>
> The best meeting point is not the middle. It is the place where nobody gets punished for showing up.

---

## 2. Target user

**ICP:** a small group of 2 to 5 people who already know each other, coordinating one in-person meetup in the same city, over chat, each from a different starting point.

| Behaviour | Description | What it means for the product |
|---|---|---|
| Coordinates in chat | Location talk happens informally | Input has to take under a minute |
| Different starting points | Travel burden is uneven | Ranking must compare participants |
| Wants a decision, not research | Nobody wants twenty options | Show a short ranked shortlist |

**Not for:** large events, cross-city travel, corporate office planning, reservations, or complex accessibility routing.

---

## 3. The existing ecosystem, and why it falls short

| Tool / tier | What works | What fails | The ceiling |
|---|---|---|---|
| Google Maps | Great place discovery | Optimizes for one user's search at a time | No model of group fairness |
| Group chat | Zero setup | Manual negotiation | No computation |
| Midpoint tools | Finds the center | The center is not the same as a fair trip | Optimizes distance, not burden |

The common ceiling: place search starts with "where." This problem starts with "for whom."

---

## 4. Business impact

This is a workshop product, not a commercial pitch, so I am not going to inflate a number.

| Problem | Operational effect | Estimated impact | Confidence |
|---|---|---|---|
| Meeting-point negotiation | Repeated manual comparison | Not sized | 🔵 |

I am deliberately not sizing the market. The session exists to show how a product gets built end to end, not to validate demand.

---

## 5. Problem prioritisation

| Problem | Description | Impact | Effort | Priority |
|---|---|---|---|---|
| P1 | Find the candidate area | Shapes every later result | LOW | Attack now |
| P2 | Compare fairness | The core differentiator | MED | Attack now |
| P3 | Find suitable venues | Makes the recommendation real | MED | Attack now |
| P4 | Explain the trade-off | Builds trust | LOW | Attack now |
| P5 | Live transport routing | More accurate | HIGH | Defer, use fallback |

**The chain I picked:** P1 → P3 → P2 → P4 → venue decision.

### What I am not solving, and why

| Problem | Why it is out |
|---|---|
| Restaurant booking | Adds another external dependency |
| Real-time traffic | High setup cost for little workshop value |
| Public-transit route optimization | API complexity can sink the demo |
| Group voting | Useful, but it does not prove the core idea |

---

## 6. Narrowed problem statement and key assumptions

Small groups need a fast way to pick a meeting place that accounts for everyone's starting point, instead of making one person compare options by hand.

| Assumption | Evidence | Confidence |
|---|---|---|
| Groups care about commute fairness | Product hypothesis | 🔵 |
| Three to five recommendations are enough | Product hypothesis | 🔵 |
| Approximate distance is good enough for an MVP | Product hypothesis | 🔵 |
| Users trust a visible fairness score | Product hypothesis | 🔵 |

---

## 7. The approach, at a high level

The user enters where everyone is starting and what kind of place they want.

MeetFair finds candidate venues near the group's center, works out each person's travel burden in plain deterministic code, ranks the venues, and then explains the best compromise.

---

## 8. Goals and success

A user should get from three starting locations to one defensible meeting choice in under a minute.

**North Star:** the share of groups that go from entering their starting points to a **saved** fair meeting choice. This is the whole loop closing, and it maps directly to H1 (search reaches recommendations) and H3 (the saved choice survives a refresh).

For the workshop itself, success means the students can watch the whole chain happen and understand it:

**input → API → computation → database → AI → action**

---

## 9. Success criteria

These are product hypotheses, not market targets.

| Metric | Baseline | Target | Kill signal | Type | Confidence | Hypothesis |
|---|---|---|---|---|---|---|
| Search reaches recommendations | 0 | Full demo flow completes | Core flow fails | Primary | 🔵 | H1 |
| The ranking is explainable | 0 | Show per-participant scores | Ranking can't be inspected | Primary | 🔵 | H2 |
| Saved choice survives refresh | 0 | 100% in the demo | State disappears | Guardrail | 🔵 | H3 |
| Search works without the AI explanation | 0 | Yes | AI blocks the core result | Guardrail | 🔵 | H4 |

---

## 10. Hypotheses

| H# | Hypothesis | Kill signal | Gates |
|---|---|---|---|
| H1 | Users can enter everything in one simple form | The form turns multi-step and confusing | Input design |
| H2 | A fairness score makes the pick easier to trust | The score can't be explained simply | Core differentiation |
| H3 | Saving one venue closes a meaningful loop | Saving feels pointless | Persistence |
| H4 | AI explanation adds clarity without owning the logic | The model is needed to compute the ranking | AI architecture |

---

## 11. Non-goals

- Accounts and authentication
- Payments or reservations
- Real-time group collaboration
- Turn-by-turn navigation
- Perfect transit routing
- Large groups
- Restaurant review summaries
- Personalization over time

---

# PART B: WHAT

## 12. Product concept

**Name:** MeetFair

**One line:** find a meeting place that is fair for everyone, not just central on a map.

**User:** 2 to 5 people meeting in the same city.

**The angle:** optimize for the worst commute, not the midpoint.

**Aha Moment:** the user watches a café that is better on average get ranked *below* a café that is fair to everyone. In one glance they get it: MeetFair protects the person with the worst trip.

**Why it teaches well:** it mixes external data, deterministic code, persistence, a real product trade-off, and AI, and you can still explain the whole thing in thirty seconds.

### The inversion

| Every place-search product | MeetFair |
|---|---|
| Starts with a neighborhood | Starts with people |
| Ranks venue quality | Ranks group fairness |
| One person's context | Everyone's context |
| Gives many results | Recommends the best compromise |

### The architecture in one sentence

The frontend collects the group's constraints, the backend geocodes the locations and pulls venues, deterministic code scores fairness, the database saves the chosen result, and the LLM explains the trade-off.

### Non-negotiables

| Constraint | What it means | Basis |
|---|---|---|
| AI never calculates distance | The ranking stays inspectable | Product design 🔵 |
| The core works even if the LLM fails | The explanation is additive | Workshop requirement |
| The place API has a seeded fallback | The demo can't depend on API uptime | Workshop requirement |
| One primary journey on one page | Build fits in 90 minutes | Workshop constraint |

### Why not just ask the model

The obvious shortcut is to ask an LLM "where should these people meet?" I am not doing that.

The model has no reliable live travel data, and its ranking would be hard to debug. So instead:

1. APIs give us the place data.
2. Code computes the score.
3. AI explains the result.
4. The user stays in control.

---

## 13. Key features

### P0

| # | Feature | Description | Impact | Effort | Owner |
|---|---|---|---|---|---|
| 1 | Group input | Add 2 to 4 starting locations | HIGH | LOW | Instructor |
| 2 | Preference input | Café / restaurant / bar, plus an optional keyword | MED | LOW | Instructor |
| 3 | Geocoding | Turn places into coordinates | HIGH | MED | Instructor |
| 4 | Candidate discovery | Pull nearby venues | HIGH | MED | Instructor |
| 5 | Fairness ranking | Score results per participant | HIGH | MED | Instructor |
| 6 | Recommendation cards | Show the best three | HIGH | LOW | Instructor |
| 7 | AI explanation | Say why #1 is the fairest | MED | LOW | Instructor |
| 8 | Save selection | Persist the chosen venue | MED | LOW | Instructor |

### P1

| # | Feature | Description | Impact | Effort | Owner |
|---|---|---|---|---|---|
| 1 | Embedded map | Show starts and venues visually | HIGH | MED | Instructor |
| 2 | Participant labels | Name each starting point | LOW | LOW | Instructor |
| 3 | Shareable result URL | Reload a saved meeting | MED | MED | Instructor |

### P2

- Live transit duration
- Opening-hours filtering
- Group voting
- Calendar integration

### Not building

No auth, booking, payments, realtime collaboration, or complex route planning.

---

## 14. Instrumentation and event spec

Analytics is optional for the workshop. A production version would track:

| Event | Properties | Fires when | Answers |
|---|---|---|---|
| `search_submitted` | participant_count, venue_type | Search starts | Funnel |
| `recommendations_loaded` | result_count | Ranking completes | Reliability |
| `venue_selected` | venue_id, rank | User saves a venue | Core action, the North Star |
| `api_fallback_used` | service | Seeded data was used | Dependency health |

---

## 15. Key flows

### Primary flow

`Landing → add locations → choose venue type → search → candidate API → fairness scoring → ranked results → AI explanation → save venue`

1. The user enters three starting locations.
2. The backend geocodes them.
3. The system finds an approximate center.
4. The backend requests nearby places.
5. Code measures the distance from every participant to every candidate.
6. Each venue gets an average distance, a longest individual distance, and a fairness spread.
7. Results are ranked.
8. The LLM receives the top candidates and the score breakdown.
9. The LLM writes a short, human explanation.
10. The user picks one.
11. The pick is saved.

### Stored-state flow

`Saved venue → refresh or revisit → server loads the meeting → the selected venue is still there`

### Failure flow

`External API fails → seeded Bangalore dataset → same scoring pipeline → the normal results UI`

This fallback matters because the architecture stays identical even when the data source changes underneath it. That is the point worth showing.

---

## 16. Key logic

### The scoring model

For each venue:

`participant_distance = haversine(start, venue)`

Then:

- `average_distance`
- `max_distance`
- `distance_spread = max - min`

Example weighting:

`fairness_score = max_distance × 0.6 + average_distance × 0.3 + distance_spread × 0.1`

Lower is better. The weights are deliberately easy to change live during the session.

| # | Rule | Edge case / exception |
|---|---|---|
| 1 | At least two origins | Disable search below two |
| 2 | At most four for the MVP | Cap the input |
| 3 | An unknown location blocks search | Show an inline error |
| 4 | Zero venues returned | Offer a broader search |
| 5 | API timeout | Fall back to seeded venue data |
| 6 | LLM failure | Results still render, just without the explanation |
| 7 | Duplicate origins allowed | Warn, but continue |
| 8 | Invalid coordinates never reach scoring | Validate server-side |
| 9 | Ranking happens in code | Never ask the LLM to rank raw locations |

---

## 17. User stories

### Job 1: define the group

| # | Story | Acceptance criteria | Pain point |
|---|---|---|---|
| U1 | As an organizer, I want to enter where everyone starts, so the recommendation reflects the whole group. | Minimum two origins, clear validation, locations can be edited | §1 |

### Job 2: find the compromise

| # | Story | Acceptance criteria | Pain point |
|---|---|---|---|
| U2 | As an organizer, I want ranked venues, so I don't compare Maps links by hand. | Top results show the score and each person's burden | §1.2 |
| U3 | As an organizer, I want to understand why one place won, so I can defend it. | The explanation references the actual computed values | §1.2 |

### Job 3: commit

| # | Story | Acceptance criteria | Pain point |
|---|---|---|---|
| U4 | As an organizer, I want to save the chosen venue, so the decision survives a refresh. | The selection persists | The end-to-end loop |

---

## 18. Trade-offs, limitations, dependency risks

### What this product does not solve

| Area | Why it is out |
|---|---|
| Actual commute time | Needs a routing API |
| Traffic | Adds volatile data |
| Venue quality | We trust the provider's ranking |
| Availability | Booking integration is unnecessary |

### The trade-offs I made on purpose

| Trade-off | What I gave up | Why |
|---|---|---|
| Straight-line distance | Transit accuracy | Much easier to build live |
| A simple score | Sophisticated optimization | Easier to explain |
| No accounts | Multi-device persistence | Removes auth setup |
| Three results | Exploration | A stronger decision product |

### Dependency risks

| Risk | Impact | Fallback |
|---|---|---|
| Geocoding API auth | Search blocked | Seed the coordinates |
| Places API quota or auth | No candidates | Seeded venue JSON |
| Map component complexity | UI build slows down | Use cards, drop the map |
| LLM request fails | No explanation | Template explanation |
| Database setup slows down | Save blocked | SQLite, local JSON, or localStorage for the workshop |

---

# PART C: HOW

## 19. Key milestones

| Milestone | Owner | Planned | Actual | Comments |
|---|---|---|---|---|
| Requirements locked | Harsh | Session start | | PRD selected |
| Project scaffolded | Harsh | Session | | Next.js |
| Input flow working | Harsh | Session | | First checkpoint |
| API and fallback data working | Harsh | Session | | Second checkpoint |
| Fairness scoring working | Harsh | Session | | Core logic |
| AI explanation wired | Harsh | Session | | Additive |
| Persistence working | Harsh | Session | | The loop is closed |
| UI and demo polish | Harsh | Session | | Only after the flow works |

---

## 20. Operational checklist

| Team | Prompt | Y/N | Action | Done? |
|---|---|---|---|---|
| Analytics | Needed for the workshop? | N | Skip | |
| Localisation | Multiple languages? | N | English only | |
| Internal Ops | Training needed? | N | Workshop demo | |
| Partners | External partner impacted? | N | API providers only | |
| Legal | Sensitive data? | N | No precise locations kept beyond the demo state | |
| Risk | API failure possible? | Y | Seed the fallback | |

---

## 21. Marketing / GTM

No GTM. This is a workshop MVP built to show how an AI product gets constructed end to end.

---

## 22. Rollout and phasing

**V1:** origins, venue preference, geocoding, candidate venues, fairness score, result cards, AI explanation, saved selection.

**V-next:** map visualization and a shareable meeting.

**Later:** route duration, live transit, calendar coordination, voting.

### 22.1 The five-minute demo script

**Minute 0 to 1**

Open MeetFair. Say:

"Three of us want coffee after work. Maps can tell each of us what is nearby. It can't easily tell us what is fair for all three."

Enter Koramangala, Indiranagar, and Malleshwaram. Choose **Café**. Click **Find a fair place**.

**Minute 1 to 2**

Show the loading steps: `Finding everyone → Searching venues → Comparing fairness`.

Results appear. Point out that the winner is not simply the venue closest to the geometric center.

**Minute 2 to 3**

Open the first venue and show:

- Person A: 4.2 km
- Person B: 3.8 km
- Person C: 4.5 km
- the fairness score

Compare it against another venue where one person travels much farther.

**Aha Moment:**

"The second café is slightly better on average, but one person gets a terrible trip. MeetFair ranks it lower on purpose."

**Minute 3 to 4**

Reveal the AI explanation:

> This is the fairest option because no participant travels much farther than the others.

Then say the part that matters: the AI did not calculate the result. It turned a structured computation into a sentence a human can use.

**Minute 4 to 5**

Click **Choose this place**. Refresh. The meeting is still selected. Show the backend state or the database row.

Close with:

"One user action just touched location APIs, backend logic, deterministic ranking, AI, persistence, and frontend state. That is the product system we built."

---

# PART D: WORKING SECTION

## 23. Meeting notes

None yet.

---

## 24. Open questions

| Question | Owner | Deadline / trigger |
|---|---|---|
| Which location API is fastest to set up for the workshop? | Harsh | Before implementation |
| Supabase or SQLite? | Harsh | Implementation plan |
| Map in P0 or P1? | Harsh | Depends on build time |

---

## 25. Decision log

Starts during implementation planning.

---

*Evidence sources: none. This is a workshop product hypothesis and has not been through formal discovery.*
