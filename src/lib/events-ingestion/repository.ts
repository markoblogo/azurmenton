import { promises as fs } from "node:fs";
import path from "node:path";
import type { EventCandidateRepository, ImportedEventCandidate, SourceHealth } from "@/lib/events-ingestion/types";
import { materialChanges } from "@/lib/events-ingestion/normalize";

type StoreShape = {
  candidates: ImportedEventCandidate[];
  sourceHealth: SourceHealth[];
};

const emptyStore: StoreShape = { candidates: [], sourceHealth: [] };

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8")) as T;
  } catch {
    return JSON.parse(JSON.stringify(fallback)) as T;
  }
}

async function writeJson(filePath: string, value: unknown) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export class FileEventCandidateRepository implements EventCandidateRepository {
  private readonly storePath: string;

  constructor(outputDir: string) {
    this.storePath = path.join(outputDir, "events-ingestion-store.json");
  }

  private async readStore() {
    return readJson<StoreShape>(this.storePath, emptyStore);
  }

  private async writeStore(store: StoreShape) {
    await writeJson(this.storePath, store);
  }

  async listCandidates() {
    return (await this.readStore()).candidates;
  }

  async findBySourceIdentity(sourceId: string, sourceEventId: string) {
    return (await this.listCandidates()).find((candidate) => candidate.sourceId === sourceId && candidate.sourceEventId === sourceEventId) ?? null;
  }

  async upsertCandidate(candidate: ImportedEventCandidate) {
    const store = await this.readStore();
    const index = store.candidates.findIndex((item) => item.id === candidate.id);
    if (index === -1) {
      store.candidates.push(candidate);
      await this.writeStore(store);
      return "created" as const;
    }

    const previous = store.candidates[index];
    const changes = materialChanges(previous, candidate);
    if (previous.sourceHash === candidate.sourceHash && previous.reviewStatus !== "outdated") {
      store.candidates[index] = { ...previous, lastSeenAt: candidate.lastSeenAt, lastVerifiedAt: candidate.lastVerifiedAt, missingRunCount: 0 };
      await this.writeStore(store);
      return "unchanged" as const;
    }

    store.candidates[index] = {
      ...candidate,
      firstSeenAt: previous.firstSeenAt,
      publicTitle: previous.publicTitle,
      publicSummary: previous.publicSummary,
      editorialNote: previous.editorialNote,
      reviewStatus: previous.reviewStatus === "published" ? "needs_review" : candidate.reviewStatus,
      materialChanges: changes,
    };
    await this.writeStore(store);
    return "updated" as const;
  }

  async markMissingFromRun(sourceId: string, seenCandidateIds: string[], checkedAt: string) {
    const seen = new Set(seenCandidateIds);
    const store = await this.readStore();
    let changed = 0;
    store.candidates = store.candidates.map((candidate) => {
      if (candidate.sourceId !== sourceId || seen.has(candidate.id) || candidate.reviewStatus === "rejected") return candidate;
      changed += 1;
      const missingRunCount = candidate.missingRunCount + 1;
      return {
        ...candidate,
        lastVerifiedAt: checkedAt,
        missingRunCount,
        reviewStatus: missingRunCount >= 3 && candidate.reviewStatus !== "published" ? "outdated" : candidate.reviewStatus,
      };
    });
    if (changed) await this.writeStore(store);
    return changed;
  }

  async recordSourceHealth(sourceId: string, health: SourceHealth) {
    const store = await this.readStore();
    const previous = store.sourceHealth.find((item) => item.sourceId === sourceId);
    const nextHealth = {
      ...health,
      consecutiveFailures: health.lastError ? (previous?.consecutiveFailures ?? 0) + 1 : 0,
      lastSuccessAt: health.lastError ? previous?.lastSuccessAt : health.lastSuccessAt,
      lastFailureAt: health.lastError ? health.lastFailureAt : previous?.lastFailureAt,
    };
    store.sourceHealth = [...store.sourceHealth.filter((item) => item.sourceId !== sourceId), nextHealth].sort((left, right) => left.sourceId.localeCompare(right.sourceId));
    await this.writeStore(store);
  }

  async listSourceHealth() {
    return (await this.readStore()).sourceHealth;
  }
}

export async function writeEventsIngestionReport(outputDir: string, report: unknown) {
  await writeJson(path.join(outputDir, "events-ingestion-report.json"), report);
}
