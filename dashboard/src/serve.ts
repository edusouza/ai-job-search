#!/usr/bin/env bun
/**
 * Live dashboard server — serves the job-search dashboard over HTTP, rebuilding
 * it from job_search_tracker.csv on every request. The page polls /api/version
 * and reloads itself when the tracker file changes, so editing the tracker (via
 * /outcome, /apply, or by hand) shows up in the browser automatically.
 *
 * Usage: bun run serve [--port N] [--tracker PATH] [--weeks N] [--threshold N]
 * Default: http://localhost:4173
 *
 * Everything stays on localhost; the tracker and the linked documents are
 * personal data and are never sent anywhere else.
 */

import { statSync } from "node:fs";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_FOLLOWUP_THRESHOLD_DAYS } from "./model.ts";
import { buildDashboard } from "./build.ts";

export interface ServeOptions {
  repoRoot: string;
  trackerPath: string;
  weeks: number;
  threshold: number;
}

const CONTENT_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".tex": "text/plain; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

/**
 * Resolve a /files/<path> URL to a file inside the repo. Returns null for
 * anything that escapes the repo root or has a non-servable extension.
 */
export function resolveRepoFile(repoRoot: string, urlPath: string): string | null {
  let decoded: string;
  try {
    decoded = decodeURIComponent(urlPath);
  } catch {
    return null;
  }
  const fullPath = resolve(repoRoot, decoded);
  if (fullPath !== repoRoot && !fullPath.startsWith(repoRoot + sep)) return null;
  if (!(extname(fullPath).toLowerCase() in CONTENT_TYPES)) return null;
  return fullPath;
}

export function trackerVersion(trackerPath: string): number {
  try {
    return statSync(trackerPath).mtimeMs;
  } catch {
    return 0;
  }
}

export function createFetchHandler(opts: ServeOptions): (req: Request) => Promise<Response> {
  return async (req) => {
    const url = new URL(req.url);

    if (url.pathname === "/api/version") {
      return Response.json({ version: trackerVersion(opts.trackerPath) });
    }

    if (url.pathname === "/" || url.pathname === "/index.html") {
      try {
        const { html } = buildDashboard({
          trackerPath: opts.trackerPath,
          weeks: opts.weeks,
          threshold: opts.threshold,
          linkPrefix: "/files/",
          liveReload: true,
        });
        return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
      } catch {
        return new Response(
          `<!doctype html><html><body style="font-family:sans-serif;background:#0d1117;color:#e6edf3;padding:40px">
             <h1>Tracker not found</h1><p>Could not read <code>${opts.trackerPath}</code>.</p>
           </body></html>`,
          { status: 500, headers: { "content-type": "text/html; charset=utf-8" } },
        );
      }
    }

    if (url.pathname.startsWith("/files/")) {
      const filePath = resolveRepoFile(opts.repoRoot, url.pathname.slice("/files/".length));
      if (filePath === null) return new Response("Not found", { status: 404 });
      const file = Bun.file(filePath);
      if (!(await file.exists())) return new Response("Not found", { status: 404 });
      return new Response(file, {
        headers: { "content-type": CONTENT_TYPES[extname(filePath).toLowerCase()] },
      });
    }

    return new Response("Not found", { status: 404 });
  };
}

function main(): void {
  const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
  let port = 4173;
  let tracker = resolve(repoRoot, "job_search_tracker.csv");
  let weeks = 26;
  let threshold = DEFAULT_FOLLOWUP_THRESHOLD_DAYS;

  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    const next = () => argv[++i];
    if (argv[i] === "--port") port = Number(next());
    else if (argv[i] === "--tracker") tracker = resolve(next());
    else if (argv[i] === "--weeks") weeks = Number(next());
    else if (argv[i] === "--threshold") threshold = Number(next());
    else if (argv[i] === "--help" || argv[i] === "-h") {
      console.log("Usage: bun run serve [--port N] [--tracker PATH] [--weeks N] [--threshold N]");
      process.exit(0);
    } else {
      console.error(`Unknown argument: ${argv[i]}`);
      process.exit(1);
    }
  }
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error("--port must be an integer between 1 and 65535");
    process.exit(1);
  }

  const server = Bun.serve({
    port,
    hostname: "127.0.0.1",
    fetch: createFetchHandler({ repoRoot, trackerPath: tracker, weeks, threshold }),
  });
  console.log(`Job search dashboard live at http://localhost:${server.port}`);
  console.log(`Reading ${tracker} — the page reloads itself when the tracker changes. Ctrl+C to stop.`);
}

if (import.meta.main) main();
