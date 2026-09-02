import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { parseCsv } from "../src/csv.ts";
import { loadApplications, normalizeStatus } from "../src/model.ts";

const TODAY = "2026-08-25";
const fixture = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), "fixtures", "tracker.csv"),
  "utf8",
);
const apps = loadApplications(parseCsv(fixture), TODAY);

describe("model", () => {
  test("normalizes statuses", () => {
    expect(normalizeStatus("No Response")).toBe("no_response");
    expect(normalizeStatus(" offer declined ")).toBe("offer_declined");
  });

  test("parses fit rating, blank becomes null", () => {
    expect(apps[0].fitRating).toBe(80);
    expect(apps[4].fitRating).toBeNull();
  });

  test("days quiet counts from the latest dated activity in notes", () => {
    // Acme: only date 2026-08-01 -> 24 days quiet
    expect(apps[0].daysQuiet).toBe(24);
    // Beta: latest note date is the follow-up on 2026-07-25 -> 31 days
    expect(apps[1].daysQuiet).toBe(31);
  });

  test("drafted rows are never counted as quiet", () => {
    expect(apps[2].isDrafted).toBe(true);
    expect(apps[2].daysQuiet).toBeNull();
    expect(apps[2].needsFollowUp).toBe(false);
  });

  test("final statuses close the application", () => {
    expect(apps[3].statusKey).toBe("no_response");
    expect(apps[3].isFinal).toBe(true);
    expect(apps[3].needsFollowUp).toBe(false);
  });

  test("counts follow-up markers in notes", () => {
    expect(apps[1].followUpsSent).toBe(1);
    expect(apps[3].followUpsSent).toBe(2);
  });

  test("open application quiet >= threshold with < 2 follow-ups needs follow-up", () => {
    // Acme: applied 24 days ago, 0 follow-ups -> needs follow-up
    expect(apps[0].needsFollowUp).toBe(true);
    // Beta: interview status, still open and quiet -> needs follow-up too
    expect(apps[1].needsFollowUp).toBe(true);
    // Epsilon: applied 15 days ago -> needs follow-up
    expect(apps[4].needsFollowUp).toBe(true);
  });

  test("respects a custom threshold", () => {
    const strict = loadApplications(parseCsv(fixture), TODAY, 30);
    expect(strict[0].needsFollowUp).toBe(false); // 24 < 30
    expect(strict[1].needsFollowUp).toBe(true); // 31 >= 30
  });

  test("activity dates merge the date column and dated notes", () => {
    expect(apps[1].activityDates).toEqual(["2026-07-10", "2026-07-20", "2026-07-25"]);
    expect(apps[1].lastActivity).toBe("2026-07-25");
  });
});
