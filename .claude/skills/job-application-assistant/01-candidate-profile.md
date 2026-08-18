---
framework_version: 1.1.1
---

# Candidate Profile

## Identity
- **Name:** Eduardo Oliveira de Souza
- **Location:** Curitiba, Paraná, Brazil
- **Phone:** +55 (41) 99699-2634
- **Email:** souza.eduardo@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/eduardosouza
- **GitHub:** https://github.com/edusouza
- **Blog:** https://blog.eduardosouza.me
- **Status:** Open to opportunities. Left Contabilizei in March 2026; since then building
  independently with AI tooling (see Independent Projects).
- **Constraints:** Seeking **fully remote** roles. Based in Curitiba (UTC-3); comfortable
  with US and European overlap.
- **CV language:** English (default). Cover letters follow the posting's language.

### Languages

| Language | Level | Notes |
|----------|-------|-------|
| Portuguese | Native | |
| English | Full professional proficiency | Written and spoken; all recent applications and CVs authored in English |

## Education

| Degree | Period | Institution | Key Topics |
|--------|--------|-------------|------------|
| BSc, Computer Science | 2001-2005 | Universidade Federal de Mato Grosso do Sul (UFMS), Campo Grande | |
| Specialization, Digital Marketing | 2011-2012 | Universidade Federal do Paraná (UFPR), Curitiba | Marketing 2.0, social media |

## Professional Experience

### Especialista de Tecnologia Sênior (Staff-level) - Contabilizei (Sep 2021 - Mar 2026)
Curitiba, Paraná, Brazil

> **Title note:** "Especialista de Tecnologia Sênior" / "Senior Technology Specialist" is the
> formal HR title. The **functional level is Staff Engineer**, reporting directly to the CTO.
> Both framings are accurate; use whichever matches the target market's vocabulary. Past
> applications have used "Staff Software Engineer" and "Senior Technology Specialist"
> interchangeably.

> **Internal promotion timeline (single employer, four levels):** joined Jan 2015 as Full Stack
> Engineer; promoted to **Especialista de Tecnologia** 1 Jun 2020; to **Especialista de
> Tecnologia I** 1 Mar 2021; to **Especialista de Tecnologia Sênior** 1 Sep 2021. Use this
> whenever a reader might read 11 years at one company as stagnation — it is the evidence that
> the tenure was progression, not inertia. See "Growth arc" under Verified Company Claims.

- Drove AI-assisted development adoption across 10+ engineering teams, working through
  influence rather than formal mandate. Cycle time fell from ~14 days to ~4 days (-70%),
  measured across the 10 tracked teams over a 3-month window; throughput rose from ~1-2 to
  ~4-5 comparable tasks per developer (roughly 2-3x).
- Codified Spec-Driven Development (SDD), Context Engineering, and Specialist Agents into
  company engineering practice via internal documentation, workshops, and direct team
  collaboration. Mentored and trained dozens of engineers.
- Designed and built solo an internal AI-powered code review tool integrated with GitLab:
  adopted in 100+ repositories (~20% of ~500 company repos), 50 users, 5,000+ suggestions
  generated. Cost ~USD 200 over 3 months versus ~USD 5,250 for GitLab Duo at list price for
  the same user base (~25x cheaper per user).
- Led the enterprise authentication migration (2024): legacy custom auth to Keycloak-based
  centralized IAM, across 10 teams, 15 modules, ~1,000 internal users, after multiple prior
  attempts had failed. Rejected a big-bang cutover; architected an incremental 3-month
  migration using App Engine traffic splitting with canary releases against real production
  traffic. Built the auth gateway/proxy layer (Keycloak + OIDC + Nginx) requiring no
  application code changes. Led a 4-person delivery team through the 8 most critical modules.
  Result: all 15 modules and ~1,000 users migrated on plan, compliance deadline met, investor
  due diligence passed with no auth findings, zero security incidents, zero downtime, auth
  latency ~20s to <5s. The centralized IAM standard became an organization-wide guideline.
  > **Scope note:** this was centralized identity / SSO for ~1,000 **internal users** across
  > 15 modules. It is **not** machine-to-machine service authentication. Postings asking for
  > M2M auth (JWT/OAuth client credentials between services) get the honest framing: deep
  > OIDC/JWT, Keycloak and IAM gateway experience, user-facing rather than service-to-service.
  > Flagged 2026-08-17 after a draft characterized it as M2M.
  > The cross-team dimension is separately valuable and underused: the interface contracts
  > were co-authored with each owning team and landed through *their* review and release
  > processes. That is direct evidence for "cross-team technical negotiation" requirements.
- Led technical strategy and architecture for the Contabilizei digital banking platform in
  partnership with BS2 Bank: corporate account opening, Pix payments, international account,
  automated reconciliation, scheduled tax payments.
- Served as technical reference for teams and leadership: architecture standards, technical
  decisions, risk management. Implemented product and platform KPI monitoring.

### Engenheiro Full Stack / Tech Lead - Contabilizei (Jan 2015 - Oct 2021)
Curitiba, Paraná, Brazil

- **CobrePJ billing product**: led design and delivery of a billing service supporting Pix,
  credit card, and boleto, with configurable fee responsibility, automatic interest on overdue
  charges, recurring reminders, and 2-business-day payouts. Built an in-house anti-fraud
  module flagging suspicious activity from charge and behaviour signals, auto-routing cases to
  the fraud team via Jira. Integrated Adyen, Transfeera, and Iugu. Adopted by ~20% of the
  customer base.
- **Tax installment payment**: led design and built end-to-end a product letting customers pay
  tax obligations in up to 12 credit-card installments, including the financing structure with
  a banking partner that advanced the receivable so tax reached the government in full and on
  time with credit risk absorbed by the bank. Shipped kickoff to production in under 2 months
  during the pandemic. Over 50,000 tax payments processed.
- **Automatic tax payment**: led design and built end-to-end a product that captures the amount
  immediately after tax calculation and schedules payment via direct debit or credit card.
  Integrated Transfeera, Banco do Brasil, and Adyen. Generated over BRL 200K monthly in
  operation fees.
- **Automated Brazilian tax compliance with no government API to build against (2015-2022).**
  For the first ~7.5 years, no programmatic interface to the Brazilian tax authorities existed:
  every government system — revenue filing, tax-slip issuance, tax calculation, accessory
  obligations — was built exclusively for humans at a browser, and the ledger itself was a
  physical book. Built the compliance layer (Simples Nacional, GPS, DARF) as browser automation
  and crawlers driving those human-only interfaces at scale, with the reliability and audit
  properties of a real financial system: correct amounts, legal filing deadlines, no silent
  failures. Serpro/Receita Federal launched **Integra Contador**, the first API platform for
  firms like Contabilizei, on **26 September 2022** — every year before that had no vendor,
  no reference implementation, and no comparable company to copy.
- Led Kubernetes adoption and cloud migration: implemented the company's first Kubernetes
  cluster and a PaaS solution (Deis Workflow) with zero-downtime deploys and horizontal scale.
- **Digital certificate issuance and custody platform (2018).** Built the integration with the
  Soluti certification authority to issue and store **ICP-Brasil A1 certificates** for the
  customer base. This was a hard dependency of the core product, not a side feature: SPED
  modules including the **ECD** accept no password or simplified authentication — a valid
  ICP-Brasil digital signature is the *only* accepted means of filing, so effectively every
  customer needed a certificate before the company could file on their behalf. A1 certificates
  are software key files (unlike A3 tokens/smartcards), which is what makes server-side
  automated signing possible at all — and which put the platform in the business of **holding
  and safeguarding thousands of customers' private signing keys**, with legally binding
  signature authority attached. Keys were protected with **Google Cloud KMS plus
  application-level encryption** (envelope encryption), so no plaintext private key was held at
  rest and the root key was access-controlled independently of the application. Certificates
  carry a 1-year validity, making issuance and renewal a continuous operational obligation
  rather than a one-off.
- Acted as Tech Leader and DevOps team member, establishing modern development practices.

Technologies: Java, Kotlin, Spring Boot, PostgreSQL, GCP, Kubernetes, Docker, microservices,
NoSQL, Pub/Sub, BigQuery.

### Analista de Inovação - Zênite Informação e Consultoria S.A. (Feb 2013 - Dec 2014)
Curitiba, Paraná, Brazil

- Initiated a public procurement data extraction and classification project, building a
  repository for price and supplier analysis across national government bids (ComprasNet).
- Led the company's cloud migration, improving deployment agility and reducing operating cost.

### Programador - Zênite Informação e Consultoria S.A. (Aug 2010 - Feb 2013)
Curitiba, Paraná, Brazil

- Built LeiAnotada.com, a legal enrichment platform with high-performance full-text search
  over Brazilian public procurement legislation.
- Built WebZênite, an online legal library with an extensible document-type architecture and
  multi-dimensional metadata search.

Technologies: Java, SQL Server, Sencha ExtJS.

### Desenvolvedor de Software - TecSinapse (Jan 2008 - Aug 2010)
São Paulo, Brazil

- Built a PowerPoint generator driven by performance dashboards, saving executive time at
  multinational clients.
- Built a price and stock extraction crawler, and an XML-configurable after-sales system for
  automakers that removed the need to code each new workflow.

Technologies: Java, Struts 2, Hibernate, Spring, C#, ASP.NET.

### Trainee and junior development roles (2003 - 2007)
Brazil

- Entry-level and trainee software development positions. This period is the basis for the
  "20+ years" experience figure used in CVs and cover letters.

> **Gap note:** no employer names, titles, or detailed dates are recorded for 2003-2007, and
> no CV in `documents/` covers it. The 20+ years claim is honest but currently
> unevidenced on paper. If a posting leans hard on total years, either supply the detail or
> use the documented span from 2008 (18+ years as of 2026).

> **Tenure arithmetic (three different numbers, do not conflate):**
> - **Total engineering experience: 20+ years** (from 2003, or 18+ from the documented 2008).
> - **Contabilizei tenure: 11 years** (Jan 2015 - Mar 2026). This is *company* tenure, and is
>   the number the growth-arc and promotion story rests on.
> - **FinTech / payments experience: ~6 years, from late 2019.** Corrected 2026-08-18 by
>   Eduardo: **Contabilizei is an accountancy company, not a financial one** — financial
>   services only became part of the business at the **end of 2019** (CobrePJ billing, the BS2
>   digital banking platform, tax payment products). His 2015-2019 work there was tax and
>   fiscal compliance automation, which is regulated and money-adjacent but **is not payments**.
>
> The prior version of this block claimed **11 years of fintech from Jan 2015 — that was wrong**
> and is the second error of this kind: a draft claiming "15+ years in fintech" was caught on
> 2026-08-17. **Never derive fintech years from the Contabilizei start date.** Count from late
> 2019. If a posting demands a decade of payments experience, that is a genuine gap — say so
> and lead with depth (Pix, boleto, card, acquirers, reconciliation, anti-fraud, provider
> failover) rather than inflating years. Recompute against the current date rather than copying
> a figure from an older CV.
>
> **Honest framing that loses nothing:** "20+ years engineering, the last ~6 focused on payments
> and financial infrastructure, built on top of a decade of regulated tax and fiscal compliance
> work." The compliance background is a genuine asset for fintech targets — it just is not
> payments tenure.

## Independent Projects

Since leaving Contabilizei (March 2026), building and learning with AI tooling full-time.
Public repositories are linkable evidence; several projects are private.

- **[ai-code-reviewer](https://github.com/edusouza/ai-code-reviewer)** (public, Python): AI-powered
  code review system for GitHub, GitLab, and Bitbucket. The independently built open-source
  counterpart to the internal GitLab review tool from Contabilizei; the strongest public
  evidence for the AI-tooling track record.
  - **Verified from source (2026-08-17), safe to cite:** implements an **LLM-as-judge**
    (`src/llm/judge.py`) that validates each suggestion for accuracy, actionability, severity
    appropriateness, and value before it reaches a developer, and ranks suggestions by
    importance. A **model router** (`src/llm/router.py`) exposes FAST / BALANCED /
    HIGH\_QUALITY tiers, trading cost against quality per request. Also does structured JSON
    output with parsing, and graceful fallback (validation failures accept the suggestion
    rather than dropping it). These are strong, checkable evidence for LLM evaluation and
    quality-control roles.
  - **Do NOT claim multi-provider or open-source/open-weight model support.** The client
    (`src/llm/client.py`) is `VertexAIClient`, Vertex AI only, and the router's models are
    Gemini (`gemini-1.5-flash`, `gemini-1.5-pro`). There is no Ollama/Llama/Mistral or
    OpenAI-compatible backend, and no provider abstraction layer. Wording such as
    "provider-agnostic across LLM backends" is unsupported.
- **[edusouza-plugins](https://github.com/edusouza/edusouza-plugins)** (public): a personal Claude Code
  plugin marketplace covering cross-session memory, TDD delivery workflows, GitHub issue ops,
  context docs, design-to-UI, and an LLM wiki.
- **[ai-job-search](https://github.com/edusouza/ai-job-search)** (public fork): AI job application
  framework built on Claude Code.
- **[nfse-emissor-go](https://github.com/edusouza/nfse-emissor-go)** (public, Go): NFS-e emission core.
- Private work in the same period: `interview-simulator` (TypeScript), `markurl` (TypeScript,
  URL-to-markdown service, with admin and landing page), `seguro-ai` (JavaScript),
  `catalogo` (Astro + Cloudflare Workers, D1, R2, Clerk), `mockstage-website`.

Earlier public repositories include `cnpj-dataflow` (Kotlin, Google Dataflow),
`event-driven-application` (Spring Boot + Spring Cloud + GCP), `blockchain-pow-example`
(Kotlin), and `testcontainers` (Kotlin).

## Technical Skills

### Programming & Frameworks
- **Java** (20+ years): Spring Boot, Spring WebFlux, Hibernate, Struts 2
- **Kotlin** (primary backend language in recent years): Spring Boot, microservices
- **Scala**: functional programming (Rock the JVM coursework)
- **Python**: AI tooling and code review systems
- **TypeScript / JavaScript**: recent independent projects
  - **No production React.** The only frontend framework anywhere in this record is Sencha
    ExtJS (Zênite, 2010-2013). The "Full Stack" title (2015-2021) is real, but every
    documented achievement under it is backend or infrastructure, so "owned the
    customer-facing front end" is not supportable either. Postings requiring React are an
    honest gap: name it rather than bridging from TypeScript. Flagged 2026-08-17 when a
    Brightgrove draft claimed React as a competency and the grounding audit caught it.
- **Go**: NFS-e emission core
- **C# / ASP.NET**: early career

### Distributed Systems & Architecture
Microservices, event-driven architecture, API gateway patterns, Domain-Driven Design, CQRS,
service orchestration, zero-downtime deployments, incremental migration strategies,
legacy system integration, third-party API design.

### Cloud & Infrastructure
Google Cloud Platform, Kubernetes, Docker, App Engine, Cloud Run, cloud-native architecture,
container orchestration, auto-scaling, PaaS (Deis Workflow), DevOps, StackDriver,
Cloudflare Workers (independent projects).

### Data & Messaging
PostgreSQL, NoSQL, Redis, SQL Server, Google BigQuery, Google Pub/Sub, Google Dataflow,
Apache Beam, event streaming, REST APIs, OpenAPI/Swagger.

### AI-Augmented Development
Claude Code, GitHub Copilot, Cursor, Windsurf; Spec-Driven Development (SDD), Context
Engineering, Specialist Agents; LLM integration, code review agents, agent tooling.
Organization-scale adoption, training, and enablement.

### Domain Expertise
- **FinTech and payments**: Pix, boleto, credit card, MDR, payment rails, acquirer and
  banking integrations (Adyen, Transfeera, Iugu, Banco do Brasil, BS2), reconciliation,
  anti-fraud, double-entry ledger concepts
- **Brazilian tax and fiscal compliance**: Simples Nacional, GPS, DARF, DIRPF, NFS-e,
  e-CNPJ digital certificates
- **Digital banking**: corporate account opening, KYC/KYB workflows, international accounts
- **Regulatory compliance**: financial regulatory requirements, IAM and audit readiness

## Verified Company Claims

Claims about the Contabilizei/BS2 partnership that have been independently verified, with the
exact defensible wording. Do not restate these more strongly than written here.

- **"First 100% open-banking financial service for business customers (PJ) in Brazil, per BS2
  and Contabilizei."** Attribution matters: *Valor Investe* (8 July 2020) reports it as a
  claim by the two companies, not as its own finding: *"Segundo o BS2 e a Contabilizei, esse é
  o primeiro serviço financeiro lançado 100% via open banking focado em pessoas jurídicas."*
  BS2's own blog calls the partnership *"inédita para o mercado Brasileiro."* The same article
  notes Nubank, C6 Bank, and Neon already offered free business accounts; the distinguishing
  feature is that account opening is **automatic**, not merely free or low-bureaucracy. Keep
  that distinction, since it is what makes the claim true.
  Sources: `blog.bancobs2.com.br/banco-bs2-parceria-contabilizei/`,
  `valorinveste.globo.com` (8 July 2020).
- Reported benefit: account opening estimated **50% faster** than non-integrated banks.

### Growth arc: under 100 customers to 100,000+ (verified 2026-08-18)

The single strongest framing device in this profile. Eduardo joined Contabilizei in **January
2015**, when the company had **~90 customers** (his recollection of the figure on his start
date). Contabilizei publicly announced passing **100,000 clients on 19 December 2025**, while
he was still there. He left in March 2026. That is an **~1,100x customer growth curve with him
inside the engineering org for the whole of it** — 11 years, four promotions, every scaling
inflection point.

Defensible wording:
- The **100,000+ figure is public and citable** — use it freely.
  Source: `contabilizei.com.br/contabilidade-online/100-mil-clientes-contabilizei-um-marco-feito-de-vocacao-coragem-e-primeiros-passos/`
  (published 19 Dec 2025). Corroborated: Contabilizei is described in Brazilian press as the
  country's largest accounting firm, 100,000+ clients across 50+ cities.
- The **starting figure is Eduardo's own recollection, not published.** **Preferred wording:
  "under 100 customers"** (decided 2026-08-18) — a round threshold reads as a deliberate
  category rather than a suspiciously precise memory, invites no "why exactly 90?" question,
  and sharpens the contrast against the six-figure endpoint. Never present it as audited.
- Prefer the **growth multiple or the two endpoints** over any intermediate count. Contabilizei
  passed 50,000 clients earlier (a separate public milestone); do not interpolate figures for
  years in between.

**Why this matters for positioning** — it converts the two standing weaknesses:
- *"11 years at one company"* reframes from stagnation-risk to "the company 1,100x-ed under
  him; he changed roles four times without changing employers."
- *"No external benchmark"* (Contabilizei grew faster than any local comparable) reframes as
  building where no playbook existed — directly relevant to early-stage fintech targets.

**Do NOT use the title "Founding Engineer."** Contabilizei was founded in 2013 (confirmed in
the source above); Eduardo joined in 2015, two years later, without founding equity. In the US
fintech market he is targeting, that title has a specific meaning and a reference check would
contradict it. Truthful alternatives: "early engineer", "joined at ~90 customers", or simply
let the two endpoints carry the story with no label.

### The "no benchmark" story: building tax compliance with no government API (2015-2022)

The concrete evidence behind "no other company to benchmark against" — and the strongest
*technical* differentiator in this profile, distinct from the scale numbers.

**The situation.** When Eduardo joined in 2015, Brazil had **no API for tax compliance**. Every
government system was designed for a person sitting at a browser: filling revenues, issuing tax
slips, calculating tax, filing accessory obligations. The accounting ledger was a **physical
book**, not a digital record. Contabilizei's entire proposition — online accounting at scale —
required programmatic access to systems that offered none.

**What he built.** The compliance layer for Simples Nacional, GPS and DARF as crawlers and
browser automation driving human-only interfaces, held to financial-system standards: correct
amounts, statutory deadlines, no silent failures. Money and legal obligations, on infrastructure
that could change without warning and had no contract, no SLA, and no changelog.

**The dates.** Serpro/Receita Federal launched **Integra Contador** — the first API platform for
accounting firms — on **26 September 2022** (public, citable; source:
`serpro.gov.br/menu/noticias/noticias-2024/novidades-integra-contador` and
`apicenter.estaleiro.serpro.gov.br/documentacao/api-integra-contador/`). So the no-API era ran
**2015 to late 2022, roughly 7.5 years**, essentially all of his first Contabilizei role.
Eduardo does not recall the launch year unaided — **use the verified date, not memory.**

**Why it is the best story he has.** Scale numbers are common in staff-level loops; genuinely
unprecedented problems are not. This is first-principles engineering under real financial and
legal risk, with no vendor, no reference implementation, and no competitor to imitate. It is the
honest answer to "hardest technical decision", "a time you worked without a playbook", and "why
should a US fintech care about Brazilian accounting software".

**Handling the obvious objection.** A reader may hear "scraping" as unserious. Lead with the
constraint, not the technique: the interesting part is not Playwright, it is holding
financial-grade correctness on infrastructure with no contract, no SLA and no notice of change —
and the monitoring, reconciliation and failure-handling that required.

**Detection mechanics (collected 2026-08-18 — the interview-grade detail).** The whole robot
fleet was monitored, with alerting on the **error rate of the automations themselves**: a spike
in "element not found" failures triggered investigation, because that was the signal a
government page had changed underneath them. This is the right answer to the obvious follow-up,
and worth stating explicitly: the danger was never the robot crashing loudly — it was the robot
*succeeding against a changed page* and filing wrong numbers silently. Parse-failure rate as a
leading indicator of correctness risk is the engineering substance of this story.

**Volume/accuracy figures: none available.** Eduardo does not recall them and they are not
public. **Do not estimate or infer any.** The story stands on the constraint and the mechanics.

> **Do not put in writing: the anti-bot countermeasures.** Later in the period the government
> introduced CAPTCHAs; the team used proxy services and CAPTCHA-solving services to keep
> delivering. **Omit this from every CV, cover letter, and portfolio artefact** (decided with
> Eduardo 2026-08-18). Not a judgement on the work — Contabilizei was a legitimate firm acting
> on client authority — but on how it reads to the targets: regulated US fintechs (Lithic,
> Alpaca) and a **fraud-detection company (Sardine)** whose engineers work the other side of
> that arms race. Phrasing like "bypass" and "measures to block us" reads as adversarial to a
> state authority, and a compliance reader will not reconstruct the nuance. Nothing is lost:
> the no-API constraint, the physical ledger, the financial-grade correctness and the
> monitoring all survive without it. If asked directly in an interview, answer honestly and
> factually — never deny it — but do not volunteer it and never write it down.

### Claims that must NOT be used
- **"Systems processing millions of dollars in transactions daily"** (appears in the archived
  Alpaca cover letter). No source supports a figure at this scale. Documented figures are
  50,000+ tax payments processed, BRL 200K+ monthly in operation fees, and ~20% customer-base
  adoption of CobrePJ. Use those.
- **"Brazil's first integrated digital banking solution"** (archived Alpaca letter). Too broad.
  The verified claim is narrower and attributed. Use the wording above.

### Digital certificate / key custody at scale (verified 2026-08-18)

Context that makes the 2018 Soluti work legible to a non-Brazilian reader, and turns a one-line
CV bullet into a security-and-compliance credential.

- **ICP-Brasil signature is mandatory for SPED/ECD filing.** Every SPED module requires a
  digital signature from an ICP-Brasil certificate for the file to be accepted by the validator
  and transmitted to Receita Federal. There is no simplified mode, no password path, no
  alternative authentication, regardless of company size or tax regime. Source:
  `gov.br/iti` (ICP-Brasil PJ certificate mandatory for signing the ECD); corroborated across
  Brazilian accounting/certification publications.
- **A1 vs A3 is the technically load-bearing distinction.** A1 is a **software key file**
  installed on a computer or server; A3 lives in a hardware token, smartcard or cloud HSM. Both
  carry identical legal weight — the difference is storage technology. A1 is the type suited to
  "agility, high volume and system integration", i.e. the only type that supports automated
  server-side signing at scale. A1 validity is **1 year** (A3 up to 3, reduced since March 2026).
- **Why this is a strong claim.** Framed properly it is not "an integration with a CA" — it is
  **custody of thousands of customers' private signing keys, carrying legally binding authority**,
  plus the issuance and annual-renewal lifecycle around them. That is a key-management,
  cryptographic-signing and regulatory-compliance story, and it maps directly onto US fintech
  requirements (KYC/KYB onboarding, secrets and key management, audit trails, signing
  infrastructure). Under-sold in every CV to date as "e-CNPJ certificate platform".
- **Note:** ICP-Brasil is retiring the A1/A2 certificate types under a newer model. Irrelevant to
  the historical accuracy of 2018-era work, but do not write about A1 in the present tense.
- **Key protection at rest (collected 2026-08-18): Cloud KMS + application-level encryption.**
  This is envelope encryption — the standard, correct pattern for key custody at scale, and the
  answer a security-minded interviewer is hoping to hear. It means the platform never held
  plaintext private keys at rest, the KMS root key was managed and access-controlled separately
  from the application, and compromise of the datastore alone did not yield usable signing keys.
  State it plainly; it converts the story from "we stored certificates" into a defensible
  key-management design.

### Pix provider suspension: emergency failover to Banco do Brasil (July 2025, verified 2026-08-18)

The "keep the money moving when your payment rail is cut off" story. Externally verifiable
crisis, clean architectural response.

**The external event (public, well documented).** On the night of **1 July 2025**, **C&M
Software** — a technology provider connecting smaller financial institutions to the Central
Bank's systems (SPB) — was breached. An employee sold legitimate access credentials (arrested
and confessed; he received BRL 5,000 plus BRL 10,000 for building the access mechanism).
Attackers reached institutions' **reserve accounts held at the Banco Central** and diverted an
estimated **BRL 400M-1B** (at least ~BRL 800M by most reporting), moved out via Pix and
converted to crypto. At least six institutions were harmed. On **4 July 2025** the Banco Central
**precautionarily suspended three institutions from Pix** — **Transfeera**, Soffy and Nuoro Pay
— while investigating whether diverted funds had passed through them. Transfeera stated that
neither it nor its clients were affected and that only its Pix functionality was suspended.
Sources: `poder360.com.br` (4 Jul 2025), `exame.com`, `finsidersbrasil.com.br`,
`reporterdiario.com.br`.

**Eduardo's part.** Transfeera was Contabilizei's Pix provider for **CobrePJ**. Its suspension
lasted weeks and CobrePJ could not stop collecting. He already had a **Banco do Brasil contract
signed for tax-slip payments**, and extended that contract to cover Pix transfers. Rather than
rewrite CobrePJ against a second provider API under time pressure, he built an
**anti-corruption layer** that accepted the existing Transfeera-shaped requests and translated
them to Banco do Brasil — so the payment provider was swapped underneath a live product without
changing its callers.

> **THREE CORRECTIONS to Eduardo's recollection — use the verified facts, not memory:**
> 1. **It was July 2025, not 2024.** Do not date this 2024 in any document.
> 2. **The breached provider was C&M Software, not a BaaS provider, and not Transfeera.**
>    Transfeera was *precautionarily* suspended during the investigation and publicly stated it
>    was not affected. **Never write or imply that Transfeera was breached or leaked
>    credentials** — that is a damaging and false claim about a named third party, and it also
>    weakens the story (the point is that a *clean* provider got cut off, which is exactly why
>    the risk was uninsurable by vendor choice).
> 3. **~BRL 1B is the top of the reported range**; at least ~BRL 800M is the safer figure, and
>    the funds came from institutions' **reserve accounts at the Central Bank**.

**Why it is a strong story.** It is the rare combination of (a) an externally verifiable
industry crisis a reviewer can look up, (b) a real business continuity stake, and (c) a textbook
architectural answer — anti-corruption layer as the mechanism for provider substitution under
duress. It answers "tell me about an incident", "a time you worked under severe time pressure",
"vendor/third-party risk", and "a design decision you are proud of". For payments-infrastructure
targets it is directly on point: **provider redundancy and failover in a real-money system.**

**Framing.** Lead with the constraint (a regulator cut the rail; the product could not stop),
then the leverage (an existing BB contract, extended rather than negotiated from zero), then the
mechanism (ACL preserving the existing interface). Credit the ACL as the reason the switch was
fast — the design, not heroics.

**Delivery and outcome (collected 2026-08-18 — these complete the story).**
- **Two weeks, one developer.** Eduardo built and shipped the failover **solo in ~2 weeks**,
  **using AI to write the code with himself as the verifier**. This independently corroborates
  the "about two weeks" figure that came back through QuintoAndar's recruiter feedback — two
  separate sources now agree, so the timeline is safe to use.
- **The change was kept: CobrePJ is now permanently multi-provider (two Pix vendors).** The
  incident response became a durable architectural improvement rather than a temporary patch.
  **This is the ending the story needs** — it converts "handled a crisis well" into "left the
  system structurally more resilient than before", which is the staff-level distinction.

> **This is also the profile's single best AI-augmented-development proof point.** Everywhere
> else, the AI story is adoption and enablement metrics (cycle time, throughput, tool building).
> Here it is Eduardo personally using AI to ship **production payment code under a real
> regulatory outage, alone, in two weeks, with himself as the verification gate** — the exact
> human-in-the-loop pattern serious engineering organisations want to hear, and evidence he
> practises what he drove across 10 teams. Pair it with Claude Code by name where truthful.
> Confirm which tool was used before naming one.

**Tools used (confirmed 2026-08-18): Claude Code and GitHub Copilot.** Naming **Claude Code**
here is accurate and satisfies the CLAUDE.md rule about referencing it by name. Both were used,
so "Claude Code and GitHub Copilot" is the fully honest phrasing; naming only Claude Code is also
truthful, just partial.

> **Nuance Eduardo should decide on, not the drafter:** Claude Code was on his **personal
> account**; Copilot was the **company account**. Do not mention the personal-account detail in
> any CV or cover letter — it is irrelevant to the outcome and invites a distracting question
> about tooling policy and code handling at a financial company. In an interview, if asked which
> tools, "Claude Code and GitHub Copilot" is a complete answer. Only if pressed on procurement
> or policy should the account distinction come up, and then answer straightforwardly. Flagging
> it here so the choice is deliberate rather than accidental.

**Continuity during the outage (collected 2026-08-18).** No customer-facing interruption: while
Pix transfers were blocked, the **finance team executed the payments manually** until the Banco
do Brasil path shipped. So the product stayed up for customers, absorbed by human operational
effort rather than by the system.

> **Say it precisely — "no downtime" alone would be misleading.** The automated path *was* down;
> a manual process carried the load. The honest and stronger phrasing is: *"No customer-facing
> interruption — the finance team processed payments by hand while I built the failover, which
> is exactly why two weeks mattered."* This is better than a bare "zero downtime" claim because
> it (a) is accurate, (b) gives the two-week timeline real urgency (every extra day was manual
> toil and operational risk carried by colleagues), and (c) shows he understands the difference
> between system availability and business continuity — a distinction payments interviewers care
> about. **Never write "zero downtime" unqualified for this incident.** That phrasing is
> correct for the *Keycloak migration* and must not be borrowed across to this story.

## Certifications
- Oracle Certified Professional, Java SE 6 Programmer - Oracle
- Scala & Functional Programming for Beginners - Rock the JVM
- Software Architecture: Domain-Driven Design
- The Gradle Masterclass

## Publications
None.

## Awards
None recorded.

## References
None recorded. Add referee name, title, company, and contact before an application requires them.
