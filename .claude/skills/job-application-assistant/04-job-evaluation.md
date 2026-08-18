---
framework_version: 1.2.2
---

# Job Evaluation Framework

<!-- SETUP: Skill match areas and career goals are personalized by running /setup -->

## Eligibility Gate — run before scoring

If the candidate is not a citizen or permanent resident of the country they are applying in, run this first. It is a hard filter, not a scoring dimension, and it is separate from work-permit *timing*: timing asks "can they work the required hours yet?", eligibility asks "are they permitted to hold this job at all?". A candidate can pass timing and still be categorically excluded.

Read the posting's eligibility / work rights / "who can apply" section **verbatim** and classify:

| Posting wording | Verdict |
|-----------------|---------|
| Names a **citizenship or permanent-residency requirement** ("must be a citizen of X", "permanent resident", "PR required", "full working rights" where the employer means citizen/PR) | **FAIL — hard stop.** Do not score, do not draft. Quote the exact wording back to the user. |
| Requires a **security clearance** at any level | **FAIL** in most countries, since clearance is normally gated on citizenship. Verify the specific scheme rather than assuming. |
| **Explicitly names** the candidate's permit class, or says "international applicants welcome", "visa holders considered", "we sponsor" | **PASS** — verified acceptance. Worth noting as a positive in the application. |
| **Silent** on citizenship or residency | **PROCEED, but mark unverified.** Check the employer's own careers or international-applicant page before drafting. |

**Two rules that are easy to get wrong:**

1. **Silence is not permission.** Large graduate programs frequently gate eligibility on their own website rather than in the job ad. Highest-risk categories: professional-services firms, government and defence, banking, telecommunications, and anything touching critical infrastructure.
2. **A company-wide "we accept international applicants" statement is not role-level permission.** The common pattern is a general welcome followed by a *named list* of the specific programs or service lines it covers. Confirm the **specific posting or stream** appears on that list before drafting.

**Report an eligibility failure to the user with the quoted source** rather than silently dropping the role. They may know something about their own status that the profile does not record.

If the candidate's permit also constrains *hours* or *start date* (a student visa with a term-time cap, a permit that begins on graduation), record that as a second gate under this section during `/setup`, with the specific dates. Do not merge it with the eligibility question above — they fail for different reasons and need different answers.

A role that fails this gate is not scored and not drafted. Everything below applies only to roles that pass it.

## Language Gate — run before scoring

No dimension or gate anywhere in this framework currently checks a posting's language requirements against what the candidate actually speaks - it is not one of the five Scoring Dimensions below, not a field `/scrape` or `/rank` track, and not something `/apply`'s language detection (Step 1, which already extracts a posting's required language generically) has anywhere to report to. This gate adds that check, structured the same way as the Eligibility Gate above: read the posting, classify against profile data, and treat a hard mismatch as FAIL before scoring.

Read the posting's language requirements as stated for **the role itself** — not the language the ad happens to be written in. A posting written in a language you don't work in, for a role that only needs languages you do work in on the job, passes fine; only an explicit job-condition requirement ("fluent X required," "must communicate with the Y team in Z") triggers this check. For each language the posting requires as a job condition, compare it against your Languages table in CLAUDE.md / `01-candidate-profile.md`:

| Posting requirement vs. your Languages table | Verdict |
|---|---|
| Requires a language **not on your table at all** (e.g. "fluent Polish required," "must communicate with the Warsaw team in Russian," and you list no Polish/Russian row) | **FAIL — hard stop.** Do not score, do not draft. Quote the exact requirement line. |
| Requires a language you **do** list, but the posting's stated bar (as written — "fluent," "native," "C1+," "business-level") reads as plausibly **higher** than your declared level | **FLAG, then proceed.** Not a fail. Score and draft normally, but surface the gap explicitly in your report to the user (quote both the posting's requirement and your declared level) so they can judge it themselves — bars like "fluent" vary a lot by company and geography, and a recruiter may be flexible. Never silently drop the posting and never silently treat it as a clean pass. |
| Requires a language you list, at or below your declared level (or the posting doesn't specify a level at all — just names the language) | **PASS.** No note needed. |

Judge the level comparison the same way you judge everything else in this framework: read both sides as written and reason about it, don't force either into a rigid scale — CEFR letters, LinkedIn-style buckets ("professional working proficiency"), and plain-English words ("conversational," "fluent," "native") all appear in the wild and don't map onto each other precisely. When genuinely unsure whether a stated bar exceeds the candidate's level, prefer FLAG over a silent PASS — the human is meant to be the tiebreaker, not the gate.

**Worked example:** a candidate whose Languages table lists Spanish (Native) and English (B1/B2). A posting requiring "fluent Russian" → **FAIL**, Russian isn't declared at all. A posting requiring "fluent English" → **FLAG**, English is declared but "fluent" plausibly exceeds B1/B2 — score and draft the application, but tell the candidate this posting's bar may be a stretch and let them decide. A posting requiring "conversational English" or unspecified English → **PASS**, B1/B2 clears a "conversational" bar cleanly.

## Scoring Dimensions

Evaluate each job posting against these five dimensions:

### 1. Technical Skills Match (0-100)
How well do the required/preferred skills align with the candidate's capabilities?

| Score | Meaning |
|-------|---------|
| 80-100 | Core requirements are primary skills |
| 60-79 | Most requirements match, 1-2 gaps that are learnable |
| 40-59 | Partial match, significant upskilling needed |
| 0-39 | Fundamental mismatch |

**Strong match areas:** Java and Kotlin backend; Spring Boot / WebFlux; microservices and
event-driven architecture; Domain-Driven Design; GCP (Kubernetes, App Engine, Pub/Sub,
BigQuery, Dataflow); PostgreSQL and Redis; REST/OpenAPI design; third-party and banking
integrations; zero-downtime and incremental migration; IAM (Keycloak, OIDC); payments and
fintech domain; AI-assisted development tooling and enablement.

**Moderate match areas:** Python (AI tooling, shipped projects); TypeScript/JavaScript
(recent independent projects); Go (one shipped project); Scala (coursework, not production);
Cloudflare Workers; Apache Beam; data engineering; frontend work (dated - the Full Stack
title is from 2015-2021).

**Weak match areas:** C++/Rust; mobile (iOS/Android); AWS and Azure at depth (GCP is the
deep cloud); ML/data science modelling as a core job (Udacity coursework only, ~2017);
embedded and systems programming; formal people management.

### 2. Experience Match (0-100)
Does work history align with what they're looking for?

| Score | Meaning |
|-------|---------|
| 80-100 | Direct experience in the same domain and role type |
| 60-79 | Related experience, transferable skills clear |
| 40-59 | Adjacent experience, would need to make the case |
| 0-39 | Unrelated experience |

**Strong:** Senior/Staff backend engineering in fintech; payments and payment rails
(Pix, boleto, card, acquirers); digital banking and corporate account opening; tax and fiscal
compliance automation (Brazil); platform modernization and large migrations; developer
tooling and developer experience; technical leadership without line management.

**Moderate:** Platform/infrastructure engineering; data platform work (BigQuery, Dataflow,
Beam); AI/LLM application engineering (strong recent independent work, but ~5 months of
full-time focus rather than years); B2B SaaS outside fintech; solutions/consulting roles.

**Entry-level:** Roles requiring formal engineering management; ML engineering or data science
as the core function; frontend-led roles; non-JVM-primary systems roles (Rust, C++).

### 3. Behavioral/Culture Fit (0-100)
Does the role and company culture match the behavioral profile?

| Score | Meaning |
|-------|---------|
| 80-100 | Culture strongly matches behavioral preferences |
| 60-79 | Mixed signals but mostly compatible |
| 40-59 | Some friction areas |
| 0-39 | Significant culture mismatch |

**Red flags to research:** Department disorganization, work dominated by maintenance over development, poor chemistry with leadership, culture mismatches. Check reviews, media coverage, LinkedIn connections, and network contacts for insider perspective.

### 4. Location & Logistics (Pass/Fail + Notes)

Eduardo is in **Curitiba, Paraná, Brazil (UTC-3)** and is seeking **fully remote** work.
Remote is the primary filter here, not commute distance.

- Fully remote, hires in Brazil / contractors worldwide: **PASS**
- Remote within Latin America or "remote - Americas": **PASS**
- Remote but restricted to specific countries that exclude Brazil: **FAIL** (check the
  posting's hiring-location wording carefully; "remote" often means "remote in the US")
- Hybrid in Curitiba: **PASS** (feasible, though not the preference)
- Hybrid or onsite anywhere else: **FAIL** (would require relocation)
- Requires relocation: **FAIL**
- Timezone requiring sustained overlap outside roughly 06:00-20:00 UTC-3: **FLAG**
  (US and European overlap is comfortable; APAC-anchored hours are not)
- Occasional international travel: **PASS**; frequent travel: **FLAG**

**Check before scoring:** many "remote" postings are country-restricted, and many list a
city as the office while hiring remotely. Read the hiring-location line verbatim, the same
way the Eligibility Gate is applied. Work authorization for Brazil is not in question; the
question is whether the employer can engage someone based in Brazil (direct employment,
EOR, or contractor).

### 5. Career Alignment & Motivation (0-100)
Does this role advance career goals and contain tasks that energize?

| Score | Meaning |
|-------|---------|
| 80-100 | Strongly aligned with career direction, clear growth path |
| 60-79 | Good role but only partially aligned with long-term goals |
| 40-59 | Decent job but doesn't build toward career goals |
| 0-39 | Dead end or backwards step |

**Career goals:**
- Senior/Staff individual-contributor engineering with deep technical ownership, explicitly
  **not** a people-management track
- Work at the intersection of AI-assisted development and production backend systems, building
  on the organization-scale adoption record and the recent independent AI tooling projects
- International remote work, applying fintech and distributed-systems depth beyond the
  Brazilian market
- Continued influence at organizational scale: architecture standards, developer experience,
  mentoring - without line-management responsibility

**Motivation filter:** Evaluate not just whether Eduardo *can* do the tasks, but whether the
tasks will *energize* him.
- **Tasks that energize:** owning a system end to end from customer problem to production
  outcome; introducing a practice or technology and spreading it across teams; hard migration
  and modernization problems with real reliability constraints; payments and financial
  correctness; building developer tooling; mentoring and enablement; measurable impact
  (cycle time, adoption, cost).
- **Tasks that drain:** *[Inferred - not directly stated by Eduardo; confirm before weighting
  heavily]* line management, performance reviews, hiring committees; maintenance-only mandates
  with no room to change practice; environments where architecture is decided without engineer
  input; work with no measurable outcome attached.
- **Non-task factors:** leadership that engages on technical substance; autonomy over
  approach; a culture that accepts incremental, risk-managed delivery.

**Life situation alignment:**
- **Security:** Left Contabilizei in March 2026 and has been building independently since.
  Actively seeking a role. *[Salary baseline and financial runway not recorded - ask the user
  before advising on negotiation or before ruling a role out on compensation.]*
- **Flexibility:** Fully remote required. Based UTC-3; US and European overlap comfortable.
- **Professional development:** Deepening AI/LLM engineering alongside the established
  JVM/distributed-systems foundation; broadening beyond the JVM (Python, TypeScript, Go).

### 6. Salary Benchmark (Optional)

If the salary lookup tool is configured (`salary_data.json` exists), look up the company:
```
python salary_lookup.py "<Company Name>" --json
```

If a city is known from the posting, add `--city "<City>"` to narrow results.

Present findings as:
```
### Salary Benchmark
| Metric | Value |
|--------|-------|
| [Category] index | XX.X (+/-X.X% vs baseline) |
| Overall index | XX.X (+/-X.X% vs baseline) |
```

Interpret results relative to the baseline defined in the data file's metadata. For index-based data, higher typically means above-market compensation.

If the salary tool is not configured, skip this section.

## Output Format

Present the evaluation as:

```
## Job Fit Evaluation: [Role] at [Company]

| Dimension | Score | Notes |
|-----------|-------|-------|
| Technical Skills | XX/100 | [brief note] |
| Experience Match | XX/100 | [brief note] |
| Behavioral Fit | XX/100 | [brief note] |
| Location | PASS/FAIL | [brief note] |
| Career Alignment | XX/100 | [brief note] |

**Overall Score: XX/100** (weighted average of scored dimensions)

### Verdict: [Strong Fit / Good Fit / Moderate Fit / Weak Fit / Poor Fit]

### Key Strengths for This Role
- [bullet points]

### Gaps to Address
- [bullet points]

### Recommendation
[1-2 sentences: apply/skip/apply with caveats]

### Company Research Checklist
- [ ] Checked company website (mission, values, recent news)
- [ ] Checked review sites (Glassdoor, Jobindex, etc.)
- [ ] Checked LinkedIn for team size, recent hires, connections
- [ ] Checked media for restructuring, growth, or workplace issues
- [ ] Identified network contacts who may know the team/manager
```

## Weighting
- Technical Skills: 30%
- Experience Match: 25%
- Behavioral Fit: 15%
- Career Alignment: 30%

(Location is pass/fail, not weighted)

## Thresholds
- **Strong Fit** (75+): Definitely apply, tailor everything
- **Good Fit** (60-74): Apply, address gaps in cover letter
- **Moderate Fit** (45-59): Consider carefully, discuss with user
- **Weak Fit** (30-44): Probably skip unless strategic reasons
- **Poor Fit** (<30): Skip

## Calibration from Past Applications

**Not calibrated.** `/setup` Path A found 11 archived applications in
`documents/applications/` (agoda, alpaca, alternative payments, amazon, crewai, lithic, moov,
pulley, sardine, thoughtworks, valon) but **no `outcome.md` files and only one
`job_posting.md`** (amazon). Without outcome signal there is nothing to learn: it is not
known which of these reached interview, offer, rejection, or no response.

The scoring framework above is therefore **uncalibrated against real results** and rests on
profile data alone. Treat its scores as a first approximation.

**To calibrate:** add an `outcome.md` to each archived application folder recording status
(`hired` / `offer_declined` / `rejected` / `no_response` / `interview_only` / `in_progress`),
the stages reached, and any feedback. Then re-run `/setup`, which will read them and populate
this section. Recording outcomes for new applications as they resolve is what makes this
section useful over time.

What the archive *does* show, without outcomes attached, is the target profile Eduardo has
been aiming at: **senior/staff backend roles at fintech and infrastructure companies**
(payments, cards, banking, brokerage, compliance) plus one AI-tooling company (crewai), one
consultancy (thoughtworks), and one large-scale product company (agoda, amazon). Mostly US
companies hiring remotely.

## Pre-Application: Call the Employer (Best Practice)

Before writing the application, consider whether the candidate should call the contact person listed in the posting. **Only call if there are substantive questions** - never call just to "be remembered."

### When to Suggest Calling
- The posting has unclear or ambiguous requirements
- It's unclear which competencies are essential vs. nice-to-have
- The role description is vague about day-to-day tasks
- There's a named contact person who invites questions

### Good Questions to Ask
- "What are the primary challenges in this role?"
- "How is time typically divided across the listed responsibilities?"
- "Which competencies are most critical for success in this position?"
- "What does success look like in the first 6-12 months?"

### Rules for the Call
- Prepare a 30-second "elevator pitch" about your background in case they ask
- The call's purpose is **gathering information**, not delivering a pitch
- Take notes - use what you learn to tailor the application
- Reference the conversation naturally in the cover letter ("After speaking with [name], I was especially drawn to...")
