/**
 * Aggregate statistics and activity-heatmap data over the parsed applications.
 */

import type { Application } from "./model.ts";
import { daysBetween } from "./model.ts";

export interface Stats {
  total: number;
  submitted: number; // not drafted
  drafted: number;
  open: number; // submitted and not final
  final: number;
  needsFollowUp: number;
  interviewsOrOffers: number; // status interview / offer / hired
  hired: number;
  rejected: number;
  noResponse: number;
  responseRate: number | null; // % of submitted with any outcome other than no_response... see below
  avgFit: number | null;
  byStatus: [string, number][];
  byChannel: [string, number][];
  byRoleType: [string, number][];
  byMonth: [string, number][]; // YYYY-MM -> count, ascending
}

const INTERVIEW_STATUSES = new Set(["interview", "offer", "hired", "interview_only"]);

function countBy(apps: Application[], key: (a: Application) => string): [string, number][] {
  const map = new Map<string, number>();
  for (const app of apps) {
    const k = key(app) || "(unknown)";
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

export function computeStats(apps: Application[]): Stats {
  const submittedApps = apps.filter((a) => !a.isDrafted);
  const fits = apps.map((a) => a.fitRating).filter((f): f is number => f !== null);

  // Response = the company engaged at all: interview-stage or better, or an
  // explicit rejection. `no_response` and still-open applications count against it.
  const responded = submittedApps.filter(
    (a) => INTERVIEW_STATUSES.has(a.statusKey) || a.statusKey === "rejected",
  ).length;

  return {
    total: apps.length,
    submitted: submittedApps.length,
    drafted: apps.filter((a) => a.isDrafted).length,
    open: submittedApps.filter((a) => !a.isFinal).length,
    final: apps.filter((a) => a.isFinal).length,
    needsFollowUp: apps.filter((a) => a.needsFollowUp).length,
    interviewsOrOffers: submittedApps.filter((a) => INTERVIEW_STATUSES.has(a.statusKey)).length,
    hired: apps.filter((a) => a.statusKey === "hired").length,
    rejected: apps.filter((a) => a.statusKey === "rejected").length,
    noResponse: apps.filter((a) => a.statusKey === "no_response").length,
    responseRate: submittedApps.length === 0 ? null : (responded / submittedApps.length) * 100,
    avgFit: fits.length === 0 ? null : fits.reduce((s, f) => s + f, 0) / fits.length,
    byStatus: countBy(apps, (a) => a.status),
    byChannel: countBy(apps, (a) => a.channel),
    byRoleType: countBy(apps, (a) => a.roleType),
    byMonth: countBy(apps, (a) => a.date.slice(0, 7)).sort((a, b) => a[0].localeCompare(b[0])),
  };
}

export interface HeatmapDay {
  date: string; // YYYY-MM-DD
  count: number;
}

export interface Heatmap {
  /** Weeks, oldest first; each week is 7 days (Sun..Sat), nulls pad the edges. */
  weeks: (HeatmapDay | null)[][];
  monthLabels: { weekIndex: number; label: string }[];
  maxCount: number;
  totalEvents: number;
  activeDays: number;
}

/**
 * Build a GitHub-style activity grid ending at `endIso` and covering `weeks` full
 * weeks. Events are every dated activity on every application (applied date,
 * follow-ups, dated notes).
 */
export function buildHeatmap(apps: Application[], endIso: string, weeks = 26): Heatmap {
  const counts = new Map<string, number>();
  for (const app of apps) {
    for (const d of app.activityDates) {
      if (d <= endIso) counts.set(d, (counts.get(d) ?? 0) + 1);
    }
  }

  // Align the end of the grid to the Saturday of endIso's week (GitHub-style
  // Sun..Sat rows), then go back `weeks - 1` full weeks.
  const end = new Date(`${endIso}T00:00:00Z`);
  const endDow = end.getUTCDay(); // 0 = Sunday
  const gridEnd = new Date(end.getTime() + (6 - endDow) * 86_400_000);
  const gridStart = new Date(gridEnd.getTime() - (weeks * 7 - 1) * 86_400_000);

  const columns: (HeatmapDay | null)[][] = [];
  const monthLabels: { weekIndex: number; label: string }[] = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let maxCount = 0;
  let lastMonth = -1;

  for (let w = 0; w < weeks; w++) {
    const col: (HeatmapDay | null)[] = [];
    for (let d = 0; d < 7; d++) {
      const day = new Date(gridStart.getTime() + (w * 7 + d) * 86_400_000);
      const iso = day.toISOString().slice(0, 10);
      if (iso > endIso) {
        col.push(null); // future day: blank cell
        continue;
      }
      if (d === 0) {
        const month = day.getUTCMonth();
        if (month !== lastMonth) {
          monthLabels.push({ weekIndex: w, label: monthNames[month] });
          lastMonth = month;
        }
      }
      const count = counts.get(iso) ?? 0;
      if (count > maxCount) maxCount = count;
      col.push({ date: iso, count });
    }
    columns.push(col);
  }

  return {
    weeks: columns,
    monthLabels,
    maxCount,
    totalEvents: [...counts.values()].reduce((s, c) => s + c, 0),
    activeDays: counts.size,
  };
}

/** Current streak of consecutive days with activity, ending today or yesterday. */
export function activityStreak(apps: Application[], todayIso: string): number {
  const days = new Set<string>();
  for (const app of apps) for (const d of app.activityDates) days.add(d);
  let cursor = todayIso;
  if (!days.has(cursor)) {
    const yesterday = new Date(Date.parse(`${todayIso}T00:00:00Z`) - 86_400_000)
      .toISOString()
      .slice(0, 10);
    if (days.has(yesterday)) cursor = yesterday;
    else return 0;
  }
  let streak = 0;
  while (days.has(cursor)) {
    streak += 1;
    cursor = new Date(Date.parse(`${cursor}T00:00:00Z`) - 86_400_000).toISOString().slice(0, 10);
  }
  return streak;
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export { daysBetween };
