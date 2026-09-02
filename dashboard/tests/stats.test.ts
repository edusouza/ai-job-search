import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { parseCsv } from "../src/csv.ts";
import { loadApplications } from "../src/model.ts";
import { activityStreak, buildHeatmap, computeStats } from "../src/stats.ts";

const TODAY = "2026-08-25";
const fixture = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), "fixtures", "tracker.csv"),
  "utf8",
);
const apps = loadApplications(parseCsv(fixture), TODAY);
const stats = computeStats(apps);

describe("computeStats", () => {
  test("counts totals", () => {
    expect(stats.total).toBe(5);
    expect(stats.submitted).toBe(4);
    expect(stats.drafted).toBe(1);
    expect(stats.open).toBe(3); // acme, beta, epsilon
    expect(stats.final).toBe(1);
    expect(stats.needsFollowUp).toBe(3);
  });

  test("response rate counts interviews and rejections over submissions", () => {
    // beta (interview) responded out of 4 submitted -> 25%
    expect(stats.responseRate).toBeCloseTo(25);
  });

  test("average fit ignores blanks", () => {
    expect(stats.avgFit).toBeCloseTo((80 + 75 + 88 + 60) / 4);
  });

  test("groups by month ascending", () => {
    expect(stats.byMonth).toEqual([
      ["2026-06", 1],
      ["2026-07", 1],
      ["2026-08", 3],
    ]);
  });
});

describe("buildHeatmap", () => {
  const heat = buildHeatmap(apps, TODAY, 26);

  test("builds the requested number of weeks with 7 days each", () => {
    expect(heat.weeks).toHaveLength(26);
    for (const week of heat.weeks) expect(week).toHaveLength(7);
  });

  test("counts every dated activity as an event", () => {
    // 2026-07-25 appears in beta's follow-up marker and its notes date
    const day = heat.weeks.flat().find((d) => d?.date === "2026-07-25");
    expect(day?.count).toBeGreaterThanOrEqual(1);
    expect(heat.activeDays).toBe(9); // distinct dates across all rows
  });

  test("never emits future days", () => {
    for (const day of heat.weeks.flat()) {
      if (day) expect(day.date <= TODAY).toBe(true);
    }
  });

  test("month labels are present and ordered", () => {
    expect(heat.monthLabels.length).toBeGreaterThan(1);
    const indices = heat.monthLabels.map((m) => m.weekIndex);
    expect([...indices].sort((a, b) => a - b)).toEqual(indices);
  });
});

describe("activityStreak", () => {
  test("no activity today or yesterday -> 0", () => {
    expect(activityStreak(apps, TODAY)).toBe(0);
  });

  test("consecutive days ending today", () => {
    const rows = parseCsv(
      [
        "date,company,sector,role,role_type,channel,status,contact_person,fit_rating,notes,cv_file,cover_letter_file,source",
        '"2026-08-24","A","s","r","t","c","applied","","","2026-08-24 note. 2026-08-25 more.","","",""',
      ].join("\n"),
    );
    expect(activityStreak(loadApplications(rows, TODAY), TODAY)).toBe(2);
  });
});
