# Job Search Dashboard

A zero-dependency TypeScript/Bun CLI that turns `job_search_tracker.csv` into a
self-contained HTML dashboard:

- stat cards (tracked, submitted, open pipeline, follow-ups due, interviews/offers, avg fit, response rate, activity streak)
- a follow-up section mirroring the `/outcome` spec (open applications quiet 10+ days with fewer than 2 follow-ups; `drafted` rows listed separately)
- a GitHub-style activity heatmap (every dated activity in the tracker: application dates, `followed up YYYY-MM-DD` markers, dated notes)
- the full applications table with links to the generated CV/cover letter and posting
- breakdowns by status, channel, role type, and month

## Usage

Live server (recommended — always shows current tracker data):

```bash
cd dashboard
bun install     # dev types only; zero runtime dependencies
bun run serve   # http://localhost:4173
```

The page polls `/api/version` and reloads itself whenever `job_search_tracker.csv`
changes, so updates from `/outcome`, `/apply`, or manual edits appear automatically.
Links in the applications table are served over HTTP (`/files/<repo path>`), so the
CV/cover-letter/posting links work in the browser. Everything binds to localhost
only. Options: `--port N`, `--tracker PATH`, `--weeks N`, `--threshold N`.

One-shot static file (shareable snapshot):

```bash
bun run src/cli.ts   # writes reports/dashboard.html (gitignored, personal data)
```

Static-mode options: `--tracker PATH`, `--out PATH`, `--weeks N` (heatmap span,
default 26), `--threshold N` (follow-up quiet days, default 10 per `/outcome`).

## Tests

```bash
bun run typecheck
bun test             # fixture-based, no network
```
