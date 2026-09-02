import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { parseCsv } from "../src/csv.ts";

const fixture = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), "fixtures", "tracker.csv"),
  "utf8",
);

describe("parseCsv", () => {
  test("parses header and all data rows", () => {
    const rows = parseCsv(fixture);
    expect(rows).toHaveLength(5);
    expect(rows[0].company).toBe("Acme Corp");
    expect(rows[4].company).toBe("Epsilon Oy");
  });

  test("handles quoted commas and escaped quotes", () => {
    const rows = parseCsv(fixture);
    expect(rows[4].notes).toContain('"quoted, commas"');
  });

  test("handles embedded newlines inside quoted fields", () => {
    const rows = parseCsv(fixture);
    expect(rows[4].notes).toContain("multi-line note");
  });

  test("missing trailing columns become empty strings", () => {
    const rows = parseCsv("a,b\n1\n");
    expect(rows[0]).toEqual({ a: "1", b: "" });
  });

  test("empty input yields no rows", () => {
    expect(parseCsv("")).toEqual([]);
  });
});
