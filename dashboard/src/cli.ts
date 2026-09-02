#!/usr/bin/env bun
/**
 * job-search-dashboard — generates a self-contained static HTML dashboard from
 * the repo's job_search_tracker.csv. For a live, auto-reloading version, use
 * `bun run serve` (src/serve.ts) instead.
 *
 * Usage (from anywhere):
 *   bun run dashboard/src/cli.ts [--tracker PATH] [--out PATH] [--weeks N] [--threshold N]
 *
 * Defaults: tracker = <repo>/job_search_tracker.csv, out = <repo>/reports/dashboard.html
 * (reports/ is gitignored — the dashboard contains personal application data).
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_FOLLOWUP_THRESHOLD_DAYS } from "./model.ts";
import { buildDashboard } from "./build.ts";

interface CliOptions {
  tracker: string;
  out: string;
  weeks: number;
  threshold: number;
}

function parseArgs(argv: string[], repoRoot: string): CliOptions {
  const opts: CliOptions = {
    tracker: resolve(repoRoot, "job_search_tracker.csv"),
    out: resolve(repoRoot, "reports", "dashboard.html"),
    weeks: 26,
    threshold: DEFAULT_FOLLOWUP_THRESHOLD_DAYS,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const next = () => argv[++i];
    if (arg === "--tracker") opts.tracker = resolve(next());
    else if (arg === "--out") opts.out = resolve(next());
    else if (arg === "--weeks") opts.weeks = Number(next());
    else if (arg === "--threshold") opts.threshold = Number(next());
    else if (arg === "--help" || arg === "-h") {
      console.log(
        "Usage: bun run dashboard/src/cli.ts [--tracker PATH] [--out PATH] [--weeks N] [--threshold N]",
      );
      process.exit(0);
    } else {
      console.error(`Unknown argument: ${arg}`);
      process.exit(1);
    }
  }
  if (!Number.isInteger(opts.weeks) || opts.weeks < 1 || opts.weeks > 53) {
    console.error("--weeks must be an integer between 1 and 53");
    process.exit(1);
  }
  return opts;
}

function main(): void {
  // src/cli.ts -> dashboard/ -> repo root
  const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
  const opts = parseArgs(process.argv.slice(2), repoRoot);

  // Links to cv/ and cover_letters/ files must work from wherever the HTML lands.
  let linkPrefix = relative(dirname(opts.out), repoRoot);
  if (linkPrefix !== "" && !linkPrefix.endsWith("/")) linkPrefix += "/";

  let result;
  try {
    result = buildDashboard({
      trackerPath: opts.tracker,
      weeks: opts.weeks,
      threshold: opts.threshold,
      linkPrefix,
    });
  } catch {
    console.error(`Tracker not found or unreadable: ${opts.tracker}`);
    process.exit(1);
  }

  mkdirSync(dirname(opts.out), { recursive: true });
  writeFileSync(opts.out, result.html, "utf8");
  console.log(`Dashboard written to ${opts.out}`);
  console.log(
    `${result.stats.total} applications tracked, ${result.stats.open} open, ${result.stats.needsFollowUp} need follow-up.`,
  );
}

main();
