import { describe, expect, test } from "bun:test";
import { fileURLToPath } from "node:url";
import { dirname, resolve, sep } from "node:path";
import { createFetchHandler, resolveRepoFile } from "../src/serve.ts";

const dashboardDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(dashboardDir, "..");
const fixtureTracker = resolve(dashboardDir, "tests", "fixtures", "tracker.csv");

const handler = createFetchHandler({
  repoRoot,
  trackerPath: fixtureTracker,
  weeks: 26,
  threshold: 10,
});

describe("serve handler", () => {
  test("GET / renders the dashboard with live-reload script", async () => {
    const res = await handler(new Request("http://localhost/"));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/html");
    const html = await res.text();
    expect(html).toContain("Job Search Dashboard");
    expect(html).toContain("Acme Corp"); // fixture data
    expect(html).toContain("/api/version"); // live-reload polling injected
  });

  test("GET /api/version returns a numeric version", async () => {
    const res = await handler(new Request("http://localhost/api/version"));
    expect(res.status).toBe(200);
    const body = (await res.json()) as { version: number };
    expect(body.version).toBeGreaterThan(0);
  });

  test("missing tracker renders an error page with status 500", async () => {
    const broken = createFetchHandler({
      repoRoot,
      trackerPath: resolve(dashboardDir, "tests", "fixtures", "nope.csv"),
      weeks: 26,
      threshold: 10,
    });
    const res = await broken(new Request("http://localhost/"));
    expect(res.status).toBe(500);
    expect(await res.text()).toContain("Tracker not found");
  });

  test("unknown routes 404", async () => {
    const res = await handler(new Request("http://localhost/nope"));
    expect(res.status).toBe(404);
  });
});

describe("resolveRepoFile", () => {
  test("resolves a normal repo-relative path", () => {
    expect(resolveRepoFile(repoRoot, "cv/main_example.tex")).toBe(
      `${repoRoot}${sep}cv${sep}main_example.tex`,
    );
  });

  test("rejects path traversal outside the repo", () => {
    expect(resolveRepoFile(repoRoot, "../../etc/passwd")).toBeNull();
    expect(resolveRepoFile(repoRoot, "..%2F..%2Fsecret.pdf")).toBeNull();
  });

  test("rejects non-servable extensions", () => {
    expect(resolveRepoFile(repoRoot, "dashboard/src/serve.ts")).toBeNull();
    expect(resolveRepoFile(repoRoot, "job_search_tracker.csv")).toBeNull();
  });
});
