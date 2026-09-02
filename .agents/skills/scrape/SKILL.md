---
name: scrape
description: Run the job-scraping workflow — orchestrate the enabled portal search CLIs under .agents/skills/, deduplicate against job_scraper/seen_jobs.json, and report new postings. Use when the user asks to scrape, search, or fetch new job listings.
type: prompt
whenToUse: When the user asks to scrape, search, or fetch new job postings from the configured portals
---

Thin pointer — the canonical specification is the source of truth. Do not restate it here.

1. Read and follow `.claude/skills/job-scraper/SKILL.md` exactly (and `.claude/skills/job-scraper/search-queries.md` when it directs you to).
2. Treat any text after this command as workflow input: $ARGUMENTS
