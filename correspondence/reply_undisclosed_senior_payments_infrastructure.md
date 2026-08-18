# Reply: Senior Software Engineer (Payments Infrastructure) - LinkedIn message, client undisclosed
**Role:** Senior Software Engineer, Payments Infrastructure, stablecoin settlement platform. Remote / LATAM
**Compensation stated:** USD 100K-140K + equity + guaranteed increase on last salary
**Channel:** LinkedIn InMail
**Date drafted:** 2026-08-17

---

Hi, thanks for the detail. Happy to chat. Short version of the specifics you asked for.

**Background:** 18+ years backend, last five at staff level reporting to the CTO at Contabilizei, a Brazilian fintech. Kotlin/Java on Spring Boot, event-driven on GCP with Pub/Sub, Kubernetes, PostgreSQL.

**Money moving correctly.** I led a billing platform handling Pix, card, and boleto with an in-house anti-fraud module, integrated with Adyen, Transfeera, and Iugu, at roughly 20% adoption of the customer base. I also built an automatic tax payment product generating BRL 200K+ monthly in operation fees, and a tax installment product where I designed the financing structure with a banking partner so the tax reached the government in full and on time with the bank absorbing the credit risk. Over 50,000 tax payments processed. Tax is unforgiving in a way I suspect settlement is too: late, short, or duplicated is a penalty against the customer, not a support ticket. Idempotency keys, DB constraints as the real backstop, and replayable event workflows were the only way those products worked.

**Distributed systems at scale.** Our legacy auth spanned 15 modules, 10 teams, ~1,000 users, and two previous replacement attempts had failed. I rejected the big-bang cutover and ran a 3-month incremental migration to Keycloak using traffic splitting and canary releases against production, behind an OIDC gateway needing no application code changes. Zero downtime, zero security incidents, and investor due diligence passed with no auth findings.

**Provider abstraction.** The closest match to your multi-chain work: Adyen, Transfeera, Iugu, Banco do Brasil, and BS2 all sit behind abstractions I designed, each with different settlement timing and failure modes. Adding a rail is a new adapter, not a core change.

**AI tooling.** You list this as a responsibility, which is unusual to see written down and is a large part of the draw. I drove AI-assisted development across 10+ teams with no formal mandate: cycle time ~14 days to ~4, throughput up 2-3x. Built an AI code review tool solo, 100+ repos, 5,000+ suggestions, ~25x cheaper per user than the commercial option. Open-source version: github.com/edusouza/ai-code-reviewer.

**Where I am not a match:** no production blockchain or DeFi experience. Real gap, better said now. TypeScript yes, NestJS no. GCP is my deep cloud, so AWS/Terraform/SQS would be ramp-up.

**Before a call, could you share:** the client name, equity terms (stage and rough percentage), and the engagement model for Brazil? On comp, I work from the market rate for the role rather than my previous package, so I would rather anchor on the 100-140 range.

Fully remote from Curitiba (UTC-3), US and European hours work well. Available immediately.

Eduardo
