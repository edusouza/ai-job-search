---
framework_version: 1.0.0
---

# Interview Preparation Guide

<!-- SETUP: STAR examples are personalized by running /setup based on your actual experience -->

## STAR Format

Structure answers as: **Situation** (context), **Task** (your responsibility), **Action** (what you did), **Result** (outcome).

Keep answers to 1-2 minutes. Be specific. End with what you learned or would do differently.

## Ready-Made STAR Examples

None finalized yet. `/setup` Path A produced **stubs** rather than finished examples (see
"STAR Candidates" below), because the Action step has to be in Eduardo's own words. Promote a
stub into this section once its Action and Result lines are filled in and rehearsed. Aim for
4-6 finished examples covering different competencies.

## STAR Candidates (Complete Manually)

`/setup` Path A identified these from the CVs and project narratives in `documents/`. The
situation and result lines are largely supplied by the source documents; **the Action detail
is what needs your own words** - what *you* specifically did, decided, and would do
differently. Fill these in before relying on them in an interview.

### 1. Enterprise authentication migration (influence, risk management, delivery)
**Source:** Staff Software Engineer project narrative; Contabilizei 2024
**What happened:** Migrated a legacy custom auth system to Keycloak-based centralized IAM
across 10 teams, 15 modules, ~1,000 internal users, in 3 months, after multiple previous
attempts had failed. Rejected a big-bang cutover; used App Engine traffic splitting with
canary releases against real production traffic.
**Why it matters:** The strongest single story available. Covers influence without authority,
technical decision-making under risk, stakeholder alignment, and hard delivery outcomes at
once. Answers: "tell me about a complex project you led", "a time you disagreed with a
proposed approach", "how do you de-risk a large change", "a time you influenced without
authority", "how do you handle a project others have failed at".
**S/T/A/R stub:**
- Situation: legacy auth, compliance deadline plus investor due diligence, prior attempts failed
- Task: design and execute the migration, build cross-org consensus, ship within the deadline
- Action: *(your words - the week-long consensus process, why Keycloak, why incremental over
  big-bang, how you designed the gateway/proxy layer, how you sequenced 15 modules)*
- Result: all modules and ~1,000 users migrated on plan; compliance met; due diligence passed
  with no auth findings; zero incidents; zero downtime; auth latency ~20s to <5s; IAM standard
  adopted org-wide

### 2. AI-augmented development adoption across 10+ teams (organizational change, measurement)
**Source:** Staff Software Engineer project narrative; all CVs
**What happened:** Took AI-assisted development from personal experimentation to
organizational practice across 10+ teams, with no new title or formal mandate. Codified SDD,
Context Engineering, and Specialist Agents into internal practice.
**Why it matters:** Answers "tell me about a time you drove change", "how do you get buy-in",
"what impact have you had beyond your own code", and any AI-tooling question. The numbers are
unusually concrete for a change-management story.
**S/T/A/R stub:**
- Situation: company had bought AI tools (Devin, Copilot) but saw no measurable gain
- Task: make AI-assisted development actually change how engineers worked
- Action: *(your words - how you got the first teams to try it, what resistance you hit, how
  you built the documentation and workshops, how you chose what to measure)*
- Result: cycle time ~14 to ~4 days (-70%) across 10 teams over 3 months; throughput ~1-2 to
  ~4-5 tasks per developer (2-3x); dozens of engineers trained

### 3. Internal AI code review tool (solo build, cost-conscious engineering)
**Source:** Staff Software Engineer project narrative
**What happened:** Designed and built solo an AI code review tool integrated with GitLab.
Adopted in 100+ repositories (~20% of ~500 repos), 50 users, 5,000+ suggestions. Cost ~USD 200
over 3 months versus ~USD 5,250 list price for GitLab Duo at the same user count.
**Why it matters:** Answers "tell me about something you built end to end", "a time you made a
build-vs-buy decision", "how do you think about cost". Also the bridge to `ai-code-reviewer`
on GitHub, which is the public evidence for this work.
**S/T/A/R stub:**
- Situation: commercial AI review tooling was expensive per seat; adoption uncertain
- Task: prove the value internally before committing to per-seat spend
- Action: *(your words - architecture, how you handled auth and GitLab integration, how you
  drove adoption to 100+ repos)*
- Result: 100+ repos, 50 users, 5,000+ suggestions, ~25x cheaper per user

### 4. Tax installment payment under pandemic pressure (speed, commercial structuring)
**Source:** Senior Software Engineer project narrative
**What happened:** Customers lost income during the pandemic and could not pay taxes on time.
Led design and built end-to-end a product allowing payment in up to 12 credit card
installments, including structuring the financing so a banking partner advanced the receivable
and absorbed the credit risk while tax reached the government in full and on time. Kickoff to
production in under 2 months.
**Why it matters:** Answers "tell me about delivering under pressure", "a time you worked
across business and engineering", "how do you balance speed and correctness". Shows commercial
thinking beyond code.
**S/T/A/R stub:**
- Situation: pandemic, customers without income, hard statutory tax deadlines
- Task: build a way to pay tax in installments without the company absorbing credit risk
- Action: *(your words - the financing structure, the fee calculation, the Adyen integration,
  what you cut to ship in 2 months)*
- Result: shipped in under 2 months; 50,000+ tax payments processed

### 5. CobrePJ billing platform and in-house anti-fraud (end-to-end ownership)
**Source:** Senior Software Engineer project narrative
**What happened:** Led design and delivery of a billing service supporting Pix, card, and
boleto with configurable fees, automatic overdue interest, reminders, and 2-business-day
payouts, plus an in-house anti-fraud module routing suspicious cases to the fraud team via
Jira. Adopted by ~20% of the customer base.
**Why it matters:** Answers "tell me about a product you owned", payments-domain questions,
and fraud/risk questions. Strongest fit for payments-company interviews.
**S/T/A/R stub:**
- Situation: customers were losing revenue, uncomfortable chasing their own clients for payment
- Task: automate the full collection cycle
- Action: *(your words - the fee model, the anti-fraud signals you chose, the three payment
  integrations)*
- Result: ~20% customer-base adoption

### 6. Early Kubernetes adoption at Contabilizei (technical bet, early adoption)
**Source:** all CVs; Contabilizei 2015-2021
**What happened:** Implemented the company's first Kubernetes cluster and a PaaS solution
(Deis Workflow) with zero-downtime deploys and horizontal scaling, when Kubernetes was still
emerging in the Brazilian market.
**Why it matters:** Answers "tell me about a technology bet you made", "how do you evaluate
new technology", "a time you were early on something". Establishes the early-adopter pattern
that recurs with AI tooling.
**S/T/A/R stub:**
- Situation: deployment friction, no zero-downtime story, scaling limits
- Task: modernize deployment infrastructure
- Action: *(your words - why Kubernetes then, how you convinced the team, migration approach)*
- Result: first cluster in the company; zero-downtime deploys; horizontal scale

### 7. Career transition period (March 2026 to present)
**Source:** GitHub activity; confirmed by Eduardo
**What happened:** Since leaving Contabilizei, building and learning with AI full-time:
`ai-code-reviewer` (public), `edusouza-plugins` (public Claude Code plugin marketplace),
`ai-job-search` (public), plus private projects (interview-simulator, markurl, seguro-ai,
catalogo).
**Why it matters:** **This question is coming** in every interview. A five-month gap on the CV
needs a confident, concrete two-part answer: what filled the time, and what came out of it.
The public repositories make it checkable, which is the strongest possible version of this
answer. Prepare it deliberately rather than improvising.
**S/T/A/R stub:**
- Situation: left Contabilizei in March 2026
- Task: *(your words - what you set out to learn or prove)*
- Action: *(your words - what you built, what you deliberately chose to learn)*
- Result: *(your words - shipped projects, links, what you can now do that you could not before)*

## Live Coding / DSA Preparation

**Why this section exists.** QuintoAndar rejected the Staff Software Engineer application on
2026-08-07 **solely on the live coding round**. Every other signal was positive and named
specifically: technical leadership, connecting architecture decisions to business impact, the
emergency two-week Banco do Brasil migration, depth of risk analysis, scaling AI tooling
across teams. The stated gap was structuring currency-conversion navigation logic and choosing
a data model suited to path-finding.

Read that split carefully. The narrative is a proven strength - it survived a Staff-level loop
at a company that then said no. What failed is a *separate, trainable skill*: timed algorithmic
problem-solving. Do not respond to this by re-tailoring the CV.

### The two failure modes, in order of importance

**1. Modelling, not algorithms.** The QuintoAndar problem was currency conversion - given
pairs of exchange rates, find a conversion path between two currencies. The algorithm (BFS or
DFS) is undergraduate material. The hard part, and the part flagged, is *seeing that a list of
rate pairs is a graph*: currencies are nodes, rates are directed weighted edges, and
"can I convert A to B" is reachability. Most failures at this level are modelling failures
dressed up as algorithm failures. Practice recognizing the graph in a problem that never uses
the word "graph".

**2. Order of explanation.** The interviewers advised balancing product context with more
direct explanations of technical decisions and design patterns. This is the subtler note and
it points at a real habit: leading with business framing. That instinct is exactly what makes
Eduardo strong in architecture and behavioral rounds, and it works against him in live coding,
where an interviewer waiting to hear the approach reads context-setting as stalling.

**The fix is ordering, not content.** State the model and the algorithm in the first 30
seconds, then add context:

> "I'll model this as a directed graph - currencies are nodes, exchange rates are weighted
> edges - and run BFS from the source to find a conversion path. Let me start with the
> adjacency map."

Business context is welcome *after* that, and it is a genuine differentiator once the
interviewer knows the approach is under control.

### What to practice

Ordered by relevance to what actually came up. Aim for out-loud practice, not silent solving -
the failure mode is verbalizing under time pressure, not comprehension.

| Priority | Topic | Why |
|----------|-------|-----|
| 1 | Graph representation: adjacency map vs. adjacency matrix vs. edge list | The named gap. Build the adjacency structure from raw input by reflex |
| 2 | BFS and DFS: reachability, shortest path in unweighted graphs, path reconstruction | The algorithms behind the exact problem asked |
| 3 | Currency/exchange-rate problems specifically | Recurring interview archetype: conversion paths, and arbitrage detection via Bellman-Ford on log-transformed rates |
| 4 | Hash maps for in-memory indexing | "Efficient mappings of data in memory" was called out verbatim |
| 5 | Recursion with memoization, and the iterative rewrite | The feedback named recursion; know when to convert to a stack |
| 6 | Topological sort, cycle detection, union-find | Common graph follow-ups once the base problem is solved |

**Canonical problems worth doing by name:** LeetCode 399 *Evaluate Division* (literally the
QuintoAndar problem), 133 *Clone Graph*, 207 *Course Schedule*, 200 *Number of Islands*,
743 *Network Delay Time*, 787 *Cheapest Flights Within K Stops*.

### Practice protocol

The gap is performance under observation, so practice must reproduce that:

- **Talk out loud, always.** Silent solving trains the wrong skill entirely.
- **Set a 35-minute timer.** Time pressure is the variable that changed the outcome.
- **State the model first, then code.** Rehearse the 30-second opener above until it is automatic.
- **Write real code, not pseudocode**, in the language you will interview in.
- **Narrate trade-offs as you go**: "adjacency map over matrix here because the graph is sparse."
- Use `interview-simulator` (private project) as the harness if it fits - it is exactly this problem.

### When to flag this in the workflow

`/rank` and `/apply` should surface this ahead of the interview, not after. Companies likely to
run a timed DSA round: scale-ups and marketplaces (QuintoAndar, iFood, Nubank, Mercado Livre),
big-tech-style loops (DoorDash, Stripe), and most US-remote staff roles. Companies weighting
system design and domain depth instead: smaller fintechs and payment infrastructure firms,
where the payments record carries more of the load.

**This is trainable in weeks, not years, and it is the single highest-leverage preparation
item on this page.** Nothing else in the profile blocked a Staff offer.

## Common Tough Questions

### "Why did you leave [previous company]?"
> [PREPARE YOUR ANSWER - be honest, forward-looking, no negativity about former employer]

### "You don't have [specific skill/experience]."
> [PREPARE YOUR ANSWER - acknowledge the gap, bridge to adjacent experience, show willingness to learn]

### "Where do you see yourself in 5 years?"
> [PREPARE YOUR ANSWER - show ambition aligned with the role's growth path]

### "What's your biggest weakness?"
> [PREPARE YOUR ANSWER - genuine weakness with concrete mitigation strategy]

### "Why this company specifically?"
> Customize per company. Must reference: specific projects, company values, market position, or team structure. Never give a generic answer.

## Questions You Should Ask Interviewers

### About the Role
- "What does a typical week look like in this role?"
- "What would success look like in the first 6 months?"
- "What's the biggest challenge the team is facing right now?"

### About the Team
- "How big is the team, and how do you divide work?"
- "What does the development/project lifecycle look like, from idea to production?"
- "How do you onboard new team members?"

### About Tech & Growth
- "What's your current tech stack for [relevant area]?"
- "Is there room to grow into more architectural or strategic decisions?"
- "How does the team stay current with new tools and methods?"

### About Culture (use these to prevent disappointment)
- "How would you describe the team culture?"
- "What does professional development look like here?"
- "Is there flexibility for remote/hybrid work?"
- "What's the balance between development/new projects and maintenance work?"
- "How would you describe the leadership style in this team?"
- "What do people who thrive here have in common?"

## Phone/Video Interview Tips
- Have STAR examples written out (use this file)
- Keep a glass of water nearby
- Smile when speaking (it changes your tone)
- Ask for clarification if a question is vague
- It's OK to take 5 seconds to think before answering
- End with: "Is there anything else you'd like to know about my background?"

## After the Application (Best Practice)

### Follow-Up Etiquette
- **Don't call to "stand out"** or to learn more about the role post-submission - this risks a negative impression
- If the employer specified a timeline, respect it and wait
- If no timeline was given and significant time has passed (2+ weeks), a brief call to ask about status is acceptable
- If you have genuinely new, relevant information to share, a short follow-up is fine

### Thank-You Notes
- When you receive any update (interview invitation, rejection, or status update), send a brief thank-you message
- Express appreciation for their time and the process
- Keep it short (2-3 sentences)

## Roleplay Guidelines
When the user asks for interview practice:
1. Ask which role/company to simulate
2. Start with easy warm-up questions ("Tell me about yourself")
3. Progress to role-specific technical questions
4. Include 1-2 behavioral questions using the competencies from the job posting
5. End with a tough question or curveball
6. After each answer, give brief feedback: what worked, what to sharpen
7. Suggest which STAR example would work best for each question
