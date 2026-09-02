/**
 * Renders the dashboard as a single self-contained HTML file (inline CSS, no JS
 * dependencies, no network requests).
 */

import type { Application } from "./model.ts";
import type { Heatmap, Stats } from "./stats.ts";

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const e = escapeHtml;

function statusBadge(app: Application): string {
  const colors: Record<string, string> = {
    applied: "#1f6feb",
    drafted: "#9e6a03",
    qualifying: "#8250df",
    interview: "#bf8700",
    offer: "#1a7f37",
    hired: "#1a7f37",
    rejected: "#cf222e",
    no_response: "#6e7781",
    withdrawn: "#6e7781",
    offer_declined: "#6e7781",
    interview_only: "#6e7781",
  };
  const color = colors[app.statusKey] ?? "#57606a";
  return `<span class="badge" style="background:${color}">${e(app.status || "unknown")}</span>`;
}

function heatLevel(count: number, max: number): number {
  if (count <= 0) return 0;
  if (max <= 1) return 4;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

function renderHeatmap(heat: Heatmap): string {
  const labelCells = Array.from({ length: heat.weeks.length }, (_, i) => {
    const label = heat.monthLabels.find((m) => m.weekIndex === i);
    return `<div class="hm-month">${label ? e(label.label) : ""}</div>`;
  }).join("");

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const rows = Array.from({ length: 7 }, (_, d) => {
    const cells = heat.weeks
      .map((week) => {
        const day = week[d];
        if (!day) return `<div class="hm-cell hm-future"></div>`;
        const level = heatLevel(day.count, heat.maxCount);
        const title = `${day.date}: ${day.count} ${day.count === 1 ? "activity" : "activities"}`;
        return `<div class="hm-cell hm-l${level}"><span class="hm-tip">${e(title)}</span></div>`;
      })
      .join("");
    const name = d % 2 === 1 ? dayNames[d] : "";
    return `<div class="hm-row"><div class="hm-day">${name}</div>${cells}</div>`;
  }).join("");

  return `
  <section class="card">
    <h2>Activity <span class="muted">· ${heat.totalEvents} events on ${heat.activeDays} days (last ${heat.weeks.length} weeks)</span></h2>
    <div class="hm-wrap">
      <div class="hm-months"><div class="hm-day"></div>${labelCells}</div>
      ${rows}
    </div>
    <div class="hm-legend">Less
      <div class="hm-cell hm-l0"></div><div class="hm-cell hm-l1"></div><div class="hm-cell hm-l2"></div><div class="hm-cell hm-l3"></div><div class="hm-cell hm-l4"></div>
    More</div>
  </section>`;
}

function renderStatCards(stats: Stats, streak: number): string {
  const card = (value: string | number, label: string, accent = "") =>
    `<div class="stat"><div class="stat-value"${accent ? ` style="color:${accent}"` : ""}>${value}</div><div class="stat-label">${label}</div></div>`;
  return `<section class="stats">
    ${card(stats.total, "tracked")}
    ${card(stats.submitted, "submitted")}
    ${card(stats.open, "open pipeline", stats.open > 0 ? "#1f6feb" : "")}
    ${card(stats.needsFollowUp, "need follow-up", stats.needsFollowUp > 0 ? "#cf222e" : "#1a7f37")}
    ${card(stats.interviewsOrOffers, "interviews / offers")}
    ${card(stats.hired, "hired", stats.hired > 0 ? "#1a7f37" : "")}
    ${card(stats.avgFit === null ? "—" : stats.avgFit.toFixed(0), "avg fit")}
    ${card(stats.responseRate === null ? "—" : `${stats.responseRate.toFixed(0)}%`, "response rate")}
    ${card(streak, "day streak", streak > 0 ? "#bf8700" : "")}
  </section>`;
}

function renderFollowUps(apps: Application[]): string {
  const followUps = apps
    .filter((a) => a.needsFollowUp)
    .sort((a, b) => (b.daysQuiet ?? 0) - (a.daysQuiet ?? 0));
  const drafted = apps.filter((a) => a.isDrafted);

  if (followUps.length === 0 && drafted.length === 0) {
    return `<section class="card"><h2>Follow-ups</h2><p class="ok">Nothing is overdue. Every open application was touched recently.</p></section>`;
  }

  const followUpItems = followUps
    .map(
      (a) => `<li>
        <strong>${e(a.company)}</strong> — ${e(a.role)}
        <span class="muted">· ${a.daysQuiet} days quiet · ${a.followUpsSent}/2 follow-ups sent${
          a.contactPerson ? ` · contact: ${e(a.contactPerson)}` : ""
        } · ${e(a.channel)}</span>
      </li>`,
    )
    .join("");

  const draftedItems = drafted
    .map(
      (a) =>
        `<li><strong>${e(a.company)}</strong> — ${e(a.role)} <span class="muted">· drafted ${e(
          a.date,
        )}, not yet submitted</span></li>`,
    )
    .join("");

  return `<section class="card">
    <h2>Follow-ups</h2>
    ${followUps.length > 0 ? `<p class="warn">${followUps.length} open application(s) have gone quiet (10+ days, fewer than 2 follow-ups):</p><ul>${followUpItems}</ul>` : ""}
    ${drafted.length > 0 ? `<h3>Drafted, not yet submitted</h3><ul>${draftedItems}</ul>` : ""}
  </section>`;
}

function renderTable(apps: Application[], linkPrefix: string): string {
  const sorted = [...apps].sort((a, b) => b.date.localeCompare(a.date));
  const rows = sorted
    .map((a) => {
      const link = (path: string, label: string) =>
        path ? `<a href="${e(linkPrefix + path)}">${label}</a>` : "";
      const docs = [link(a.cvFile, "CV"), link(a.coverLetterFile, "CL")]
        .filter(Boolean)
        .join(" · ");
      const source = a.source ? `<a href="${e(a.source)}">posting</a>` : "";
      return `<tr>
        <td class="nowrap">${e(a.date)}</td>
        <td><strong>${e(a.company)}</strong><br><span class="muted">${e(a.sector)}</span></td>
        <td>${e(a.role)}</td>
        <td>${statusBadge(a)}</td>
        <td class="num">${a.fitRating ?? "—"}</td>
        <td>${e(a.channel)}</td>
        <td>${e(a.contactPerson)}</td>
        <td class="num">${a.isDrafted ? "—" : (a.daysQuiet ?? "—")}</td>
        <td class="num">${a.followUpsSent}</td>
        <td class="nowrap">${[docs, source].filter(Boolean).join(" · ")}</td>
      </tr>`;
    })
    .join("");

  return `<section class="card">
    <h2>Applications</h2>
    <table>
      <thead><tr>
        <th>Date</th><th>Company</th><th>Role</th><th>Status</th><th>Fit</th>
        <th>Channel</th><th>Contact</th><th>Days quiet</th><th>F-ups</th><th>Links</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </section>`;
}

function renderBreakdowns(stats: Stats): string {
  const bar = (entries: [string, number][]): string => {
    const max = Math.max(1, ...entries.map(([, n]) => n));
    return entries
      .map(
        ([label, n]) => `<div class="bar-row">
          <div class="bar-label">${e(label)}</div>
          <div class="bar-track"><div class="bar-fill" style="width:${((n / max) * 100).toFixed(1)}%"></div></div>
          <div class="bar-num">${n}</div>
        </div>`,
      )
      .join("");
  };
  return `<section class="card">
    <h2>Breakdowns</h2>
    <div class="breakdowns">
      <div><h3>By status</h3>${bar(stats.byStatus)}</div>
      <div><h3>By channel</h3>${bar(stats.byChannel)}</div>
      <div><h3>By role type</h3>${bar(stats.byRoleType)}</div>
      <div><h3>By month</h3>${bar(stats.byMonth)}</div>
    </div>
  </section>`;
}

export function renderDashboard(
  apps: Application[],
  stats: Stats,
  heat: Heatmap,
  streak: number,
  generatedAt: string,
  linkPrefix: string,
): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Job Search Dashboard</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 24px; background: #0d1117; color: #e6edf3;
         font: 14px/1.5 -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  h1 { font-size: 22px; margin: 0 0 4px; }
  h2 { font-size: 16px; margin: 0 0 12px; }
  h3 { font-size: 13px; margin: 12px 0 6px; color: #9da7b3; text-transform: uppercase; letter-spacing: .04em; }
  a { color: #4493f8; text-decoration: none; }
  a:hover { text-decoration: underline; }
  .muted { color: #9da7b3; font-weight: 400; }
  .ok { color: #3fb950; }
  .warn { color: #d29922; }
  .nowrap { white-space: nowrap; }
  header { margin-bottom: 20px; }
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px; margin-bottom: 16px; }
  .stat { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 12px; text-align: center; }
  .stat-value { font-size: 24px; font-weight: 700; }
  .stat-label { color: #9da7b3; font-size: 12px; }
  .card { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 16px; margin-bottom: 16px; overflow-x: auto; }
  .badge { color: #fff; border-radius: 10px; padding: 2px 9px; font-size: 12px; white-space: nowrap; }
  table { border-collapse: collapse; width: 100%; }
  th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #21262d; vertical-align: top; }
  th { color: #9da7b3; font-size: 12px; text-transform: uppercase; letter-spacing: .04em; }
  td.num, th.num { text-align: right; }
  ul { margin: 6px 0; padding-left: 20px; }
  li { margin: 4px 0; }
  .hm-wrap { display: inline-block; }
  .hm-months, .hm-row { display: flex; gap: 3px; align-items: center; }
  .hm-row { margin-bottom: 3px; }
  .hm-day { width: 34px; flex: 0 0 34px; font-size: 10px; color: #9da7b3; }
  .hm-month { width: 13px; flex: 0 0 13px; font-size: 10px; color: #9da7b3; overflow: visible; white-space: nowrap; }
  .hm-cell { width: 13px; height: 13px; border-radius: 2px; position: relative; }
  .hm-l0 { background: #21262d; }
  .hm-l1 { background: #0e4429; }
  .hm-l2 { background: #006d32; }
  .hm-l3 { background: #26a641; }
  .hm-l4 { background: #39d353; }
  .hm-future { background: transparent; }
  .hm-tip { display: none; position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%);
            background: #1f242c; border: 1px solid #30363d; border-radius: 6px; padding: 3px 8px;
            font-size: 11px; white-space: nowrap; z-index: 10; }
  .hm-cell:hover .hm-tip { display: block; }
  .hm-legend { display: flex; gap: 3px; align-items: center; justify-content: flex-end;
               font-size: 11px; color: #9da7b3; margin-top: 8px; }
  .breakdowns { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
  .bar-row { display: flex; align-items: center; gap: 8px; margin: 4px 0; }
  .bar-label { flex: 0 0 40%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .bar-track { flex: 1; background: #21262d; border-radius: 4px; height: 10px; }
  .bar-fill { background: #1f6feb; border-radius: 4px; height: 10px; }
  .bar-num { flex: 0 0 24px; text-align: right; color: #9da7b3; }
</style>
</head>
<body>
<header>
  <h1>Job Search Dashboard</h1>
  <div class="muted">Generated ${e(generatedAt)} from <code>job_search_tracker.csv</code></div>
</header>
${renderStatCards(stats, streak)}
${renderFollowUps(apps)}
${renderHeatmap(heat)}
${renderTable(apps, linkPrefix)}
${renderBreakdowns(stats)}
</body>
</html>
`;
}
