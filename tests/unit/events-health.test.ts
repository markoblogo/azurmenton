import { describe, expect, it } from "vitest";
import {
  buildEventHealthReport,
  classifyEventHealth,
  type EventHealthSource,
} from "../../src/lib/events-health";

const source: EventHealthSource = {
  id: "menton-source",
  name: "Menton source",
  city: "menton",
  expectedUpdateFrequency: "weekly",
};

const event = (overrides: Record<string, unknown> = {}) => ({
  id: "event-1",
  slug: "event-1",
  title: "Local event",
  location: "Menton" as const,
  city: "menton",
  dateLabel: "20 August 2026",
  startDate: "2026-08-20",
  endDate: "2026-08-20",
  dateStatus: "confirmed" as const,
  sourceStatus: "verified" as const,
  lastChecked: "2026-08-01",
  lastVerifiedAt: "2026-08-01",
  sourceUrl: "https://example.com/event",
  ...overrides,
});

describe("event health observatory", () => {
  it("classifies current, expired, stale and unknown evidence explicitly", () => {
    expect(classifyEventHealth(event(), { today: "2026-08-10", source })).toMatchObject({ state: "CURRENT" });
    expect(classifyEventHealth(event({ endDate: "2026-08-09" }), { today: "2026-08-10", source }).state).toBe("EXPIRED");
    expect(classifyEventHealth(event(), { today: "2026-08-10", source, staleAfterDays: 5 }).state).toBe("STALE");
    expect(classifyEventHealth(event({ lastChecked: undefined, lastVerifiedAt: undefined }), { today: "2026-08-10", source }).state).toBe("UNKNOWN");
  });

  it("does not treat an unobserved source as proof that no events exist", () => {
    const report = buildEventHealthReport(
      [],
      [{ ...source, id: "unobserved", name: "Unobserved source" }],
      { today: "2026-08-10", observations: {} },
    );

    expect(report.sources[0]).toMatchObject({ state: "UNKNOWN", futureEventCount: 0 });
    expect(report.sources[0].coverageConclusion).toBe("NO_EVIDENCE_OF_FAILURE");
  });

  it("counts overlapping events in deterministic date windows and geography", () => {
    const report = buildEventHealthReport(
      [
        event({ id: "today", slug: "today", startDate: "2026-08-10", endDate: "2026-08-10" }),
        event({ id: "later", slug: "later", startDate: "2026-08-25", endDate: "2026-08-26", city: "nice", location: "Nice" }),
      ],
      [source],
      { today: "2026-08-10", observations: { "menton-source": "2026-08-10" } },
    );

    expect(report.coverage.TODAY.total).toBe(1);
    expect(report.coverage.NEXT_30_DAYS.total).toBe(2);
    expect(report.coverage.NEXT_30_DAYS.byCity).toMatchObject({ menton: 1, nice: 1 });
  });
});
