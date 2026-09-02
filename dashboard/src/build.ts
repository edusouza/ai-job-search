/**
 * Shared dashboard-building logic used by both the one-shot CLI (cli.ts) and the
 * live server (serve.ts). Reads the tracker fresh on every call, so the server
 * always renders current data.
 */

import { readFileSync } from "node:fs";
import { parseCsv } from "./csv.ts";
import { loadApplications } from "./model.ts";
import { activityStreak, buildHeatmap, computeStats, todayIso, type Stats } from "./stats.ts";
import { renderDashboard } from "./render.ts";

export interface BuildOptions {
  trackerPath: string;
  weeks: number;
  threshold: number;
  /** Prefix prepended to cv/cover-letter links (e.g. "../" for a file in reports/, "/files/" for the server). */
  linkPrefix: string;
  /** Inject a live-reload polling script (used by serve.ts). */
  liveReload?: boolean;
}

export interface BuildResult {
  html: string;
  stats: Stats;
}

const LIVE_RELOAD_SCRIPT = `<script>
(async () => {
  let version = null;
  try { version = (await (await fetch("/api/version")).json()).version; } catch { return; }
  setInterval(async () => {
    try {
      const current = (await (await fetch("/api/version")).json()).version;
      if (version !== null && current !== version) location.reload();
      version = current;
    } catch { /* server restarting; keep polling */ }
  }, 2000);
})();
</script>`;

export function buildDashboard(opts: BuildOptions): BuildResult {
  const csvText = readFileSync(opts.trackerPath, "utf8");
  const today = todayIso();
  const apps = loadApplications(parseCsv(csvText), today, opts.threshold);
  const stats = computeStats(apps);
  const heat = buildHeatmap(apps, today, opts.weeks);
  const streak = activityStreak(apps, today);

  let html = renderDashboard(
    apps,
    stats,
    heat,
    streak,
    `${today} (follow-up threshold: ${opts.threshold} days)`,
    opts.linkPrefix,
  );
  if (opts.liveReload) html = html.replace("</body>", `${LIVE_RELOAD_SCRIPT}\n</body>`);
  return { html, stats };
}
