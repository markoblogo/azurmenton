import { mkdtemp, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { ImportedEventCandidate } from "../../src/lib/events-ingestion/types";
import { candidateFromRaw } from "../../src/lib/events-ingestion/normalize";
import {
  eventBatchId,
  eventBatchReportMarkdown,
  evaluateEventRelevance,
  buildEventQueues,
  canPublishEventImage,
  prepareEventBatch,
  preparedEventToPublishedRecord,
  publishEventBatch,
  writePreparedBatch,
} from "../../src/lib/events-publication/workflow";
import { canRenderEventJsonLd } from "../../src/lib/events";

type CandidateOverrides = Omit<Partial<Parameters<typeof candidateFromRaw>[0]>, "sourceEventId"> & { sourceEventId?: string | null };

function candidate(overrides: CandidateOverrides = {}, now = "2026-08-01T10:00:00.000Z"): ImportedEventCandidate {
  const rawSourceEventId = Object.prototype.hasOwnProperty.call(overrides, "sourceEventId")
    ? overrides.sourceEventId ?? undefined
    : "event-1";
  return candidateFromRaw(
    {
      sourceId: "manual-test",
      sourceEventId: rawSourceEventId,
      title: overrides.title ?? "Local concert in Menton",
      sourceUrl: overrides.sourceUrl ?? "https://example.com/event",
      startDate: overrides.startDate ?? "2026-08-20",
      city: overrides.city ?? "menton",
      venue: overrides.venue ?? "Palais de l'Europe",
      categoryLabel: overrides.categoryLabel,
      imageUrl: overrides.imageUrl,
      status: overrides.status,
      rawPayload: overrides.rawPayload,
    },
    now,
  );
}

describe("events publication workflow", () => {
  it("creates sortable timestamp batch ids", () => {
    expect(eventBatchId(new Date("2026-08-01T18:45:00.000Z"))).toBe("20260801T184500Z");
  });

  it("uses a lower Menton threshold and a stricter destination threshold", () => {
    expect(evaluateEventRelevance(candidate({ title: "Small church concert", city: "menton" })).scope).toBe("menton-local");
    expect(evaluateEventRelevance(candidate({ title: "Routine neighbourhood workshop", city: "nice" })).scope).toBe("borderline");
    expect(evaluateEventRelevance(candidate({ title: "International Jazz Festival", city: "nice" })).scope).toBe("destination-worthy");
  });

  it("prepares a complete batch with localized content and image rights state", () => {
    const batch = prepareEventBatch({
      id: "20260801T184500Z",
      createdAt: "2026-08-01T18:45:00.000Z",
      candidates: [
        candidate({ title: "Small local concert", city: "menton", sourceEventId: "menton-1" }),
        candidate({ title: "Routine workshop", city: "nice", sourceEventId: "nice-1" }),
        candidate({ title: "International Art Festival", city: "monaco", sourceEventId: "monaco-1", imageUrl: "https://example.com/poster.jpg" }),
      ],
      sourceNames: { "manual-test": "Manual test source" },
    });

    expect(batch.candidates).toHaveLength(2);
    expect(batch.borderline).toHaveLength(1);
    expect(batch.candidates[0]).toMatchObject({
      sourceName: "Manual test source",
      timezone: "Europe/Paris",
      editorialScope: "menton-local",
      localized: {
        en: { title: "Small local concert" },
        uk: { title: "Small local concert" },
      },
    });
    expect(batch.candidates[1].image.status).toBe("remote-reference");
    expect(batch.candidates[1].image).toMatchObject({
      kind: "remote-reference",
      rightsStatus: "unknown",
      recommendation: "manual-image-review",
    });
    expect(batch.statistics.missingApprovedImage).toBe(2);
    expect(eventBatchReportMarkdown(batch)).toContain("Prepared for publication: 2");
    expect(batch.queues?.images).toHaveLength(2);
  });

  it("keeps remote reference images out of public event media until approved", () => {
    const batch = prepareEventBatch({
      candidates: [
        candidate({
          title: "International Art Festival",
          city: "monaco",
          sourceEventId: "monaco-art",
          imageUrl: "https://example.com/poster.jpg",
        }),
      ],
    });
    const event = batch.candidates[0];

    expect(canPublishEventImage(event.image)).toBe(false);
    expect(preparedEventToPublishedRecord(event).media).toBeUndefined();
  });

  it("publishes local approved event images and puts unresolved images into the image queue", () => {
    const batch = prepareEventBatch({ candidates: [candidate({ title: "Menton music evening" })] });
    const event = batch.candidates[0];
    event.image = {
      ...event.image,
      id: "approved-image",
      status: "manual-approved",
      kind: "azur-editorial",
      rightsStatus: "manual-approved",
      recommendation: "keep-official-poster",
      recommendationReason: "Owner-approved Azur Menton event illustration.",
      localPath: "/images/events/menton-music-evening.webp",
      manuallySelected: true,
      approvedAt: "2026-08-01T12:00:00.000Z",
    };

    expect(canPublishEventImage(event.image)).toBe(true);
    expect(preparedEventToPublishedRecord(event).media).toMatchObject({
      image: "/images/events/menton-music-evening.webp",
      mediaStatus: "available",
    });
    expect(buildEventQueues(batch).images).toEqual([]);
  });

  it("applies durable owner image overrides during batch preparation", () => {
    const batch = prepareEventBatch({
      candidates: [candidate({ title: "Menton summer fireworks", sourceEventId: "fireworks-1" })],
      imageOverrides: [{
        sourceEventId: "fireworks-1",
        localPath: "/images/events/menton-summer-fireworks.webp",
        kind: "azur-editorial",
        rightsStatus: "manual-approved",
        alt: "Menton summer fireworks illustration",
        approvedAt: "2026-08-01T12:00:00.000Z",
        locked: true,
      }],
    });

    expect(batch.candidates[0].image).toMatchObject({
      status: "manual-approved",
      kind: "azur-editorial",
      rightsStatus: "manual-approved",
      localPath: "/images/events/menton-summer-fireworks.webp",
      locked: true,
    });
    expect(batch.statistics.missingApprovedImage).toBe(0);
    expect(batch.queues?.images).toEqual([]);
  });

  it("consolidates source-fragmented multi-day records into one prepared event", () => {
    const batch = prepareEventBatch({
      id: "20260801T184500Z",
      createdAt: "2026-08-01T18:45:00.000Z",
      candidates: [
        candidate({
          title: "Pina Festival 2026",
          city: "sanremo",
          sourceEventId: "pina-2026",
          sourceUrl: "https://example.com/pina",
          startDate: "2026-08-06",
        }),
        candidate({
          title: "Pina Festival 2026",
          city: "sanremo",
          sourceEventId: "pina-2026",
          sourceUrl: "https://example.com/pina",
          startDate: "2026-08-07",
        }),
        candidate({
          title: "Pina Festival 2026",
          city: "sanremo",
          sourceEventId: "pina-2026",
          sourceUrl: "https://example.com/pina",
          startDate: "2026-08-08",
        }),
      ],
    });

    expect(batch.candidates).toHaveLength(1);
    expect(batch.candidates[0]).toMatchObject({
      startDate: "2026-08-06",
      endDate: "2026-08-08",
    });
    expect(batch.duplicates).toEqual([
      expect.objectContaining({ duplicateOf: batch.candidates[0].sourceEventId }),
      expect.objectContaining({ duplicateOf: batch.candidates[0].sourceEventId }),
    ]);
  });

  it("consolidates multi-day records even when generated source ids contain dates", () => {
    const batch = prepareEventBatch({
      id: "20260801T184500Z",
      createdAt: "2026-08-01T18:45:00.000Z",
      candidates: [
        candidate({ title: "Ruins", city: "sanremo", sourceEventId: null, sourceUrl: "https://example.com/ruins", startDate: "2026-08-01" }),
        candidate({ title: "Ruins", city: "sanremo", sourceEventId: null, sourceUrl: "https://example.com/ruins", startDate: "2026-08-02" }),
      ],
    });

    expect(batch.candidates).toHaveLength(1);
    expect(batch.candidates[0]).toMatchObject({
      startDate: "2026-08-01",
      endDate: "2026-08-02",
    });
    expect(batch.duplicates).toHaveLength(1);
  });

  it("does not publish without an explicit selection", async () => {
    const rootDir = await mkdtemp(path.join(os.tmpdir(), "azur-events-publish-"));
    const batch = prepareEventBatch({ candidates: [candidate()] });
    const summary = await publishEventBatch({ batch, rootDir });

    expect(summary.dryRun).toBe(true);
    expect(summary.selected).toBe(0);
    expect(summary.warnings[0]).toContain("No explicit selection");
  });

  it("supports dry-run and explicit publication into durable source content", async () => {
    const rootDir = await mkdtemp(path.join(os.tmpdir(), "azur-events-publish-"));
    const batch = prepareEventBatch({
      id: "20260801T184500Z",
      createdAt: "2026-08-01T18:45:00.000Z",
      candidates: [candidate({ title: "Local market evening", sourceEventId: "menton-market" })],
    });
    batch.candidates[0].programmeUrl = "https://example.com/programme";
    batch.candidates[0].travelNote = {
      en: "Travel note.",
      fr: "Note transport.",
      it: "Nota trasporto.",
      uk: "Транспортна нотатка.",
    };
    batch.candidates[0].detailContent = {
      overview: [{
        en: "Detail intro.",
        fr: "Introduction detaillee.",
        it: "Introduzione dettagliata.",
        uk: "Детальний вступ.",
      }],
      venues: [],
      family: {
        en: "Family context.",
        fr: "Contexte famille.",
        it: "Contesto famiglia.",
        uk: "Сімейний контекст.",
      },
      tickets: [],
      tips: [],
      officialLinks: [{
        label: {
          en: "Official programme",
          fr: "Programme officiel",
          it: "Programma ufficiale",
          uk: "Офіційна програма",
        },
        href: "https://example.com/programme",
      }],
    };
    await writePreparedBatch(batch, rootDir);

    const dryRun = await publishEventBatch({ batch, rootDir, selection: { all: true, dryRun: true } });
    expect(dryRun.filesToWrite[0]).toContain("src/content/events/published/events.json");

    const published = await publishEventBatch({ batch, rootDir, selection: { all: true } });
    expect(published.created).toHaveLength(1);
    const raw = await readFile(path.join(rootDir, "src", "content", "events", "published", "events.json"), "utf8");
    const records = JSON.parse(raw);
    expect(records[0]).toMatchObject({
      sourceUrl: "https://example.com/event",
      programmeUrl: "https://example.com/programme",
      dateStatus: "confirmed",
      detailPage: true,
      lastVerifiedAt: "2026-08-01",
      detailContent: {
        officialLinks: [{ href: "https://example.com/programme" }],
      },
    });
    expect(canRenderEventJsonLd(records[0], new Date("2026-08-01T12:00:00Z"))).toBe(true);
  });
});
