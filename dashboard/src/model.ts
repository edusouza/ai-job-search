/**
 * Tracker model and derived fields. Follow-up / quiet-days semantics mirror the
 * /outcome spec (.claude/commands/outcome.md, Steps 1 and 2b):
 * - final statuses close an application
 * - `drafted` rows are never counted as quiet
 * - days quiet counts from the row date or the latest dated note, whichever is newer
 * - an open application needs a follow-up after `threshold` quiet days, max 2 sent
 */

import type { CsvRow } from "./csv.ts";

export interface TrackerRow {
  date: string;
  company: string;
  sector: string;
  role: string;
  roleType: string;
  channel: string;
  status: string;
  contactPerson: string;
  fitRating: number | null;
  notes: string;
  cvFile: string;
  coverLetterFile: string;
  source: string;
}

export interface Application extends TrackerRow {
  /** Normalized status: lowercase, spaces/underscores unified. */
  statusKey: string;
  isFinal: boolean;
  isDrafted: boolean;
  /** All YYYY-MM-DD dates found in the row (date column + notes). */
  activityDates: string[];
  lastActivity: string | null;
  daysQuiet: number | null;
  followUpsSent: number;
  needsFollowUp: boolean;
}

export const FINAL_STATUSES = new Set([
  "hired",
  "offer_declined",
  "rejected",
  "no_response",
  "withdrawn",
  "interview_only",
]);

export const DEFAULT_FOLLOWUP_THRESHOLD_DAYS = 10;
export const MAX_FOLLOWUPS = 2;

const ISO_DATE = /\b(\d{4}-\d{2}-\d{2})\b/g;
const ISO_DATE_TEST = /\b\d{4}-\d{2}-\d{2}\b/;
const FOLLOWUP_MARKER = /followed up (\d{4}-\d{2}-\d{2})/gi;

export function normalizeStatus(status: string): string {
  return status.trim().toLowerCase().replace(/[\s-]+/g, "_");
}

export function toTrackerRow(raw: CsvRow): TrackerRow {
  const fit = raw["fit_rating"]?.trim() ?? "";
  return {
    date: raw["date"]?.trim() ?? "",
    company: raw["company"] ?? "",
    sector: raw["sector"] ?? "",
    role: raw["role"] ?? "",
    roleType: raw["role_type"] ?? "",
    channel: raw["channel"] ?? "",
    status: raw["status"] ?? "",
    contactPerson: raw["contact_person"] ?? "",
    fitRating: fit === "" || Number.isNaN(Number(fit)) ? null : Number(fit),
    notes: raw["notes"] ?? "",
    cvFile: raw["cv_file"] ?? "",
    coverLetterFile: raw["cover_letter_file"] ?? "",
    source: raw["source"] ?? "",
  };
}

export function daysBetween(fromIso: string, toIso: string): number {
  const from = Date.parse(`${fromIso}T00:00:00Z`);
  const to = Date.parse(`${toIso}T00:00:00Z`);
  return Math.round((to - from) / 86_400_000);
}

export function toApplication(
  row: TrackerRow,
  todayIso: string,
  followUpThresholdDays = DEFAULT_FOLLOWUP_THRESHOLD_DAYS,
): Application {
  const statusKey = normalizeStatus(row.status);
  const isFinal = FINAL_STATUSES.has(statusKey);
  const isDrafted = statusKey === "drafted";

  const activityDates = new Set<string>();
  if (ISO_DATE_TEST.test(row.date)) activityDates.add(row.date);
  for (const match of row.notes.matchAll(ISO_DATE)) activityDates.add(match[1]);
  const sorted = [...activityDates].sort();
  const lastActivity = sorted.length > 0 ? sorted[sorted.length - 1] : null;

  const followUpsSent = [...row.notes.matchAll(FOLLOWUP_MARKER)].length;

  const daysQuiet =
    isDrafted || lastActivity === null ? null : Math.max(0, daysBetween(lastActivity, todayIso));

  const needsFollowUp =
    !isFinal &&
    !isDrafted &&
    daysQuiet !== null &&
    daysQuiet >= followUpThresholdDays &&
    followUpsSent < MAX_FOLLOWUPS;

  return {
    ...row,
    statusKey,
    isFinal,
    isDrafted,
    activityDates: sorted,
    lastActivity,
    daysQuiet,
    followUpsSent,
    needsFollowUp,
  };
}

export function loadApplications(
  rows: CsvRow[],
  todayIso: string,
  followUpThresholdDays = DEFAULT_FOLLOWUP_THRESHOLD_DAYS,
): Application[] {
  return rows.map((r) => toApplication(toTrackerRow(r), todayIso, followUpThresholdDays));
}
