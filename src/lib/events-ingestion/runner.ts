import path from "node:path";
import { eventSources } from "@/content/event-sources";
import { getEventSourceAdapters } from "@/lib/events-ingestion/adapters";
import { candidateDedupeKey, candidateFromRaw, validateRawEvent } from "@/lib/events-ingestion/normalize";
import { FileEventCandidateRepository, writeEventsIngestionReport } from "@/lib/events-ingestion/repository";
import type { EventCandidateRepository, ImportedEventCandidate, IngestionContext, IngestionError, IngestionResult, SourceHealth } from "@/lib/events-ingestion/types";

export const defaultEventsIngestionOutputDir = path.join(process.cwd(), "build", "events-ingestion");
export const eventsIngestionUserAgent = "AzurMentonBot/1.0 (+https://azurmenton.com)";

function sourceById(sourceId: string) {
  return eventSources.find((source) => source.id === sourceId);
}

function flagDuplicates(candidates: ImportedEventCandidate[]) {
  const seen = new Map<string, ImportedEventCandidate>();
  const semanticSeen = new Map<string, ImportedEventCandidate>();
  for (const candidate of candidates) {
    const key = candidateDedupeKey(candidate);
    const semanticKey = [candidate.normalizedTitle, candidate.city ?? "", candidate.venue ?? "", candidate.startDate ?? ""].join("|");
    const first = seen.get(key);
    if (first && first.id !== candidate.id) {
      candidate.duplicateCandidates = [first.id];
      candidate.reviewStatus = "duplicate";
    } else {
      seen.set(key, candidate);
    }
    const probable = semanticSeen.get(semanticKey);
    if (probable && probable.id !== candidate.id) {
      candidate.duplicateCandidates = [...new Set([...candidate.duplicateCandidates, probable.id])];
      candidate.reviewStatus = "duplicate";
    } else {
      semanticSeen.set(semanticKey, candidate);
    }
  }
}

async function runAdapter(sourceId: string, context: IngestionContext, repository: EventCandidateRepository): Promise<IngestionResult> {
  const adapter = getEventSourceAdapters(sourceId)[0];
  const source = sourceById(sourceId);
  const started = Date.now();
  const fetchedAt = context.now.toISOString();
  const errors: IngestionError[] = [];
  let rawCount = 0;
  let parsedCount = 0;
  let createdCount = 0;
  let updatedCount = 0;
  let duplicateCount = 0;
  let rejectedCount = 0;
  const seenCandidateIds: string[] = [];

  if (!adapter || !source) {
    errors.push({ sourceId, stage: "fetch", message: "No enabled automated adapter registered for source.", recoverable: false });
  } else {
    try {
      const rawEvents = await adapter.fetchEvents(context);
      rawCount = rawEvents.length;
      const candidates = rawEvents.flatMap((raw) => {
        const validationErrors = validateRawEvent(raw);
        if (validationErrors.length) {
          rejectedCount += 1;
          errors.push({ sourceId, sourceUrl: raw.sourceUrl, stage: "validate", message: validationErrors.join("; "), recoverable: true });
          return [];
        }
        parsedCount += 1;
        return [candidateFromRaw(raw, fetchedAt)];
      });

      flagDuplicates(candidates);
      for (const candidate of candidates) {
        seenCandidateIds.push(candidate.id);
        if (candidate.reviewStatus === "duplicate") duplicateCount += 1;
        const result = await repository.upsertCandidate(candidate);
        if (result === "created") createdCount += 1;
        if (result === "updated") updatedCount += 1;
      }
      await repository.markMissingFromRun(sourceId, seenCandidateIds, fetchedAt);
    } catch (error) {
      errors.push({ sourceId, sourceUrl: adapter.sourceUrl, stage: "fetch", message: error instanceof Error ? error.message : String(error), recoverable: true });
    }
  }

  const durationMs = Date.now() - started;
  const health: SourceHealth = {
    sourceId,
    enabled: source?.enabled ?? false,
    automated: source?.automated ?? false,
    lastSuccessAt: errors.length ? undefined : fetchedAt,
    lastFailureAt: errors.length ? fetchedAt : undefined,
    latestRawCount: rawCount,
    latestCandidateCount: parsedCount,
    latestRejectedCount: rejectedCount,
    latestDurationMs: durationMs,
    consecutiveFailures: errors.length ? 1 : 0,
    lastError: errors[0]?.message,
  };
  await repository.recordSourceHealth(sourceId, health);

  return { sourceId, fetchedAt, rawCount, parsedCount, createdCount, updatedCount, duplicateCount, rejectedCount, durationMs, errors };
}

export async function runEventsIngestion(options: { sourceId?: string; outputDir?: string; timeoutMs?: number; writeReport?: boolean } = {}) {
  const outputDir = options.outputDir ?? defaultEventsIngestionOutputDir;
  const context: IngestionContext = {
    now: new Date(),
    timeoutMs: options.timeoutMs ?? 12_000,
    userAgent: eventsIngestionUserAgent,
    sourceId: options.sourceId,
    outputDir,
  };
  const repository = new FileEventCandidateRepository(outputDir);
  const adapters = getEventSourceAdapters(options.sourceId);
  const results: IngestionResult[] = [];
  for (const adapter of adapters) results.push(await runAdapter(adapter.sourceId, context, repository));
  const candidates = await repository.listCandidates();
  const sourceHealth = await repository.listSourceHealth();
  const report = {
    generatedAt: context.now.toISOString(),
    sourceId: options.sourceId ?? "all",
    results,
    sourceHealth,
    candidateCounts: {
      total: candidates.length,
      new: candidates.filter((candidate) => candidate.reviewStatus === "new").length,
      needsReview: candidates.filter((candidate) => candidate.reviewStatus === "needs_review").length,
      duplicates: candidates.filter((candidate) => candidate.reviewStatus === "duplicate").length,
      outdated: candidates.filter((candidate) => candidate.reviewStatus === "outdated").length,
    },
    candidates,
  };
  if (options.writeReport !== false) await writeEventsIngestionReport(outputDir, report);
  return report;
}

export function isAuthorizedEventsIngestRequest(request: Request, env: Partial<Record<string, string | undefined>> = process.env) {
  const secret = env.EVENT_INGEST_SECRET ?? env.CRON_SECRET;
  if (!secret) return false;
  const header = request.headers.get("authorization");
  if (header === `Bearer ${secret}`) return true;
  const url = new URL(request.url);
  return url.searchParams.get("secret") === secret;
}
