# Search Queries for Job Scraper

## Installed portal CLIs (primary for `/scrape`)

`/scrape` discovers every portal skill under `.agents/skills/*/SKILL.md` and runs its CLI first. Shipped country-agnostic CLIs include `linkedin-search` and `freehire-search`; Danish demos and any skill you add with `/add-portal` are included the same way. You do **not** need a matching `site:` line below for those CLIs to run.

The `site:` query templates in this file are the **WebSearch fallback** — for portals without a CLI, company career pages, or when a CLI fails.

**Danish portal skills (Jobindex, Jobbank, Jobdanmark, Jobnet) should stay `enabled: false`** — Eduardo's market is remote-international from Brazil, not Denmark.

**Language scope:** write every query category in **English and Portuguese** (see the Languages table in CLAUDE.md). English carries the international remote market, which is the primary target; Portuguese covers Brazilian companies and LatAm-remote roles. A posting requiring a language not declared, as a job condition, is excluded before scoring; a posting requiring a *higher level* than declared in a language Eduardo does work in is flagged for his own judgment, not excluded — see `04-job-evaluation.md`'s Language Gate, the single source of truth for this rule.

## Search Sites

Primary:
- **linkedin.com/jobs** — filter for `Remote` + `Brazil`, and `Remote` + `Latin America`; also covered by the `linkedin-search` CLI
- **Remote-first boards** — remoteok.com, weworkremotely.com, wellfound.com (formerly AngelList), remotive.com, justremote.co
- **LatAm-remote specialists** — remotelatam.com, getonbrd.com, revelo.com, strider.ai
- **Brazilian boards** (for Brazil-based remote) — programathor.com.br, geekhunter.com.br, trampos.co, vagas.com.br

Secondary (company career pages via Google):
- Direct `site:` searches against fintech, payments, and developer-tooling companies known to hire remotely in Brazil or via contractor/EOR arrangements

## Query Categories

Queries are grouped by priority. Write **each category in both English and Portuguese**. Because the hard constraint is **fully remote**, pair every query with a remote term rather than a city.

### Priority 1: Senior / Staff Backend Engineer (remote)

The strongest and most desired direction: hands-on IC backend work, Kotlin/Java, remote.

```
site:linkedin.com/jobs "Staff Software Engineer" remote Brazil
site:linkedin.com/jobs "Senior Software Engineer" Kotlin remote
site:linkedin.com/jobs "Senior Backend Engineer" remote "Latin America"
site:remoteok.com "backend engineer" Kotlin OR Java
site:weworkremotely.com "senior backend" Java OR Kotlin
site:wellfound.com "staff engineer" backend remote
"Staff Backend Engineer" remote "hiring in Brazil" OR "LATAM"
```

```
site:linkedin.com/jobs "Engenheiro de Software Sênior" remoto
site:programathor.com.br "desenvolvedor backend sênior" Kotlin OR Java remoto
site:geekhunter.com.br "engenheiro de software sênior" remoto
```

### Priority 2: FinTech / Payments backend

Deepest domain expertise: payments rails, digital banking, reconciliation, compliance.

```
site:linkedin.com/jobs "payments engineer" remote Brazil OR LATAM
site:linkedin.com/jobs "backend engineer" fintech remote "Latin America"
site:linkedin.com/jobs "software engineer" payments Kotlin OR Java remote
site:remoteok.com fintech backend engineer
"payment infrastructure" "senior engineer" remote Brazil
"card issuing" OR "payment rails" "backend engineer" remote
```

```
site:linkedin.com/jobs "engenheiro backend" fintech remoto
site:programathor.com.br fintech backend sênior remoto
```

### Priority 3: AI-augmented development / Developer Experience / Platform

The direction the last five months have been building toward: AI tooling, DX, internal platforms.

```
site:linkedin.com/jobs "developer experience" engineer remote
site:linkedin.com/jobs "AI engineer" OR "LLM engineer" backend remote Brazil
site:linkedin.com/jobs "developer tools" engineer remote "Latin America"
site:linkedin.com/jobs "platform engineer" remote Brazil
site:wellfound.com "AI engineer" remote
"developer productivity" OR "developer experience" engineer remote LATAM
"agent" OR "LLM" "software engineer" remote Brazil
```

```
site:linkedin.com/jobs "engenheiro de plataforma" remoto
site:linkedin.com/jobs "engenheiro de IA" OR "engenheiro de machine learning" remoto backend
```

### Priority 4: Broader — architecture, distributed systems, modernization

Wider net where the migration and distributed-systems record is the lead qualification.

```
site:linkedin.com/jobs "software architect" remote Brazil OR LATAM
site:linkedin.com/jobs "distributed systems" engineer remote
site:linkedin.com/jobs "cloud engineer" Kubernetes GCP remote Brazil
site:linkedin.com/jobs "technical lead" backend remote "Latin America"
"legacy modernization" OR "platform migration" "senior engineer" remote
site:remotive.com backend engineer senior
```

```
site:linkedin.com/jobs "arquiteto de software" remoto
site:linkedin.com/jobs "tech lead" backend remoto Brasil
```

### Role types worth considering (suggested)

Beyond the obvious backend titles, this profile also fits:
- **Developer Advocate / Solutions Engineer** at a developer-tools or fintech-infrastructure company — 20 years of backend depth plus a documented record of teaching and enablement across 10+ teams. Worth a search if hands-on IC work with an external-facing component appeals.
- **Forward Deployed Engineer / Solutions Architect** at an AI company — combines the customer-facing product instinct visible in the project narratives with the recent AI tooling work.
- **Engineering consultant** at firms doing platform modernization — the auth migration is a textbook consulting case study.

Add searches for these only if Eduardo confirms interest; they are not currently in the target set.

```
site:linkedin.com/jobs "developer advocate" remote Brazil
site:linkedin.com/jobs "solutions engineer" OR "forward deployed engineer" remote LATAM
```

## Location Filter

**Fully remote is a hard requirement.** Eduardo is in Curitiba, Paraná, Brazil (UTC-3) and is not relocating. Apply `04-job-evaluation.md`'s Location & Logistics gate:

- **PASS** — fully remote, hiring in Brazil (direct, EOR, or contractor); "remote — Americas"; "remote — LATAM"; "remote — global"
- **PASS** — hybrid or onsite in **Curitiba** only
- **FAIL** — "remote (US only)", "remote (EU only)", or any remote posting whose hiring-location list excludes Brazil. This is the single most common false positive; **read the hiring-location line verbatim before accepting a "remote" posting**
- **FAIL** — hybrid or onsite anywhere other than Curitiba; anything requiring relocation
- **FLAG** — sustained working hours outside roughly 06:00-20:00 UTC-3 (US and European overlap is comfortable; APAC-anchored hours are not)
- **FLAG** — frequent international travel

## Language Filter

Working languages: **Portuguese (Native)** and **English (Full professional proficiency)**. Apply `04-job-evaluation.md`'s Language Gate: a posting requiring a language not declared at all is excluded; a posting requiring a higher level than declared in a language Eduardo does work in is flagged rather than excluded (see `job-scraper/SKILL.md`'s Step 3 "Quick Fit Assessment"). English-language postings pass cleanly — every recent CV and cover letter was authored in English.

## Date Filter

Only include jobs posted within the last 14 days, or with an application deadline that has not yet passed. If a posting date cannot be determined, include it but flag as "date unknown".

## Adapting Queries

If the user specifies a focus area, select queries from the matching category and also generate 2-3 custom queries for that focus. For example:
- `/scrape fintech` -> Priority 2 queries + custom fintech-specific queries
- `/scrape ai` -> Priority 3 queries + custom AI/LLM queries
