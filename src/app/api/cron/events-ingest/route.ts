import { NextResponse } from "next/server";
import { isAuthorizedEventsIngestRequest, runEventsIngestion } from "@/lib/events-ingestion/runner";

function jsonResponse(body: unknown, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
      ...init?.headers,
    },
  });
}

export async function GET(request: Request) {
  if (!isAuthorizedEventsIngestRequest(request)) {
    return jsonResponse({ ok: false, error: "Unauthorized or EVENT_INGEST_SECRET/CRON_SECRET is not configured." }, { status: 401 });
  }

  const url = new URL(request.url);
  const sourceId = url.searchParams.get("source") ?? undefined;
  const report = await runEventsIngestion({ sourceId, outputDir: "/tmp/azurmenton-events-ingestion" });
  const failed = report.results.some((result) => result.errors.length > 0);

  return jsonResponse({
    ok: !failed,
    generatedAt: report.generatedAt,
    sourceId: report.sourceId,
    results: report.results,
    sourceHealth: report.sourceHealth,
    candidateCounts: report.candidateCounts,
    note: "Candidates are review-only. Public events are still published manually in src/content/riviera-events.ts.",
  });
}
