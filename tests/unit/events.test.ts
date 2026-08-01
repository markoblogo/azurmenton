import { describe, expect, it } from "vitest";
import { eventDetailSlugs, getCanonicalEventDetailSlug, getEventDetail, getEventSearchIndexing, getRivieraEvent, isIndexableEventDetail } from "../../src/content/riviera-events";
import { eventDeduplicationKey, filterDiscoverableEvents, findDuplicateEventCandidates, parseEventDiscoveryParams } from "../../src/lib/event-discovery";
import { canRenderEventJsonLd, eventOverlapsDateRange, getEventDateStatus, getParisDateRange } from "../../src/lib/events";

const datedEvent = {
  dateLabel: "20 November-4 December 2026",
  expectedSeason: undefined,
  startDate: "2026-11-20",
  endDate: "2026-12-04",
};

describe("event date status", () => {
  it("keeps an event visible through its end date, then moves it to the archive", () => {
    expect(getEventDateStatus(datedEvent, new Date("2026-12-04T12:00:00Z"))).toBe("current");
    expect(getEventDateStatus(datedEvent, new Date("2026-12-05T12:00:00Z"))).toBe("past");
  });

  it("keeps dates-pending events out of confirmed date logic", () => {
    expect(getEventDateStatus({ dateLabel: "Dates pending", dateStatus: "dates_pending" })).toBe("dates_pending");
  });

  it("keeps estimated annual windows separate from confirmed dates", () => {
    expect(getEventDateStatus({ dateLabel: "Late July", dateStatus: "estimated_annual_window" })).toBe("estimated_annual_window");
  });

  it("allows Event JSON-LD only for confirmed events with real start dates", () => {
    const today = new Date("2026-08-01T12:00:00Z");
    expect(canRenderEventJsonLd({ dateStatus: "confirmed", startDate: "2027-02-09" }, today)).toBe(true);
    expect(canRenderEventJsonLd({ dateStatus: "confirmed", startDate: "2026-07-23", endDate: "2026-07-26" }, today)).toBe(false);
    expect(canRenderEventJsonLd({ dateStatus: "dates_pending", startDate: undefined }, today)).toBe(false);
    expect(canRenderEventJsonLd({ dateStatus: "estimated_annual_window", startDate: undefined }, today)).toBe(false);
  });

  it("resolves occurrence route aliases to the current event object", () => {
    expect(getRivieraEvent("monaco-grand-prix-2027")?.slug).toBe("monaco-grand-prix");
  });

  it("keeps yearly occurrence pages canonical and excludes their duplicate series routes", () => {
    expect(getCanonicalEventDetailSlug("monaco-e-prix")).toBe("monaco-e-prix-2027");
    expect(eventDetailSlugs).toContain("monaco-e-prix-2027");
    expect(eventDetailSlugs).not.toContain("monaco-e-prix");
    expect(getCanonicalEventDetailSlug("summer-on-the-riviera")).toBe("summer-on-the-riviera");
  });

  it("keeps high-intent annual events indexable while excluding thin seasonal placeholders", () => {
    const lemonFestival = getEventDetail("menton-lemon-festival");
    const summer = getEventDetail("summer-on-the-riviera");

    expect(lemonFestival && getEventSearchIndexing(lemonFestival)).toBe("priority");
    expect(lemonFestival && isIndexableEventDetail(lemonFestival)).toBe(true);
    expect(summer && getEventSearchIndexing(summer)).toBe("noindex");
    expect(summer && isIndexableEventDetail(summer)).toBe(false);
  });

  it("excludes past confirmed event details from current SEO indexing", () => {
    const niceJazzFest = getRivieraEvent("nice-jazz-fest");
    expect(niceJazzFest && getEventSearchIndexing(niceJazzFest, new Date("2026-08-01T12:00:00Z"))).toBe("noindex");
    expect(niceJazzFest && isIndexableEventDetail(niceJazzFest, new Date("2026-08-01T12:00:00Z"))).toBe(false);
  });

  it("keeps past annual editions archived while routing planning links to a pending next occurrence", () => {
    const e1Archive = getRivieraEvent("e1-monaco-2026");
    const e1Planning = getRivieraEvent("e1-monaco");

    expect(e1Archive?.detailPage).toBe(false);
    expect(e1Archive?.searchIndexing).toBe("noindex");
    expect(e1Planning?.occurrenceSlug).toBe("e1-monaco-2027");
    expect(e1Planning?.dateStatus).toBe("dates_pending");
    expect(e1Planning && canRenderEventJsonLd(e1Planning)).toBe(false);
  });

  it("calculates visitor quick date ranges in the Europe/Paris timezone", () => {
    const fridayInParis = new Date("2026-08-14T21:30:00.000Z");

    expect(getParisDateRange("today", fridayInParis)).toEqual({ from: "2026-08-14", to: "2026-08-14" });
    expect(getParisDateRange("tomorrow", fridayInParis)).toEqual({ from: "2026-08-15", to: "2026-08-15" });
    expect(getParisDateRange("weekend", fridayInParis)).toEqual({ from: "2026-08-15", to: "2026-08-16" });
    expect(getParisDateRange("custom", fridayInParis, { from: "2026-08-18", to: "2026-08-16" })).toEqual({ from: "2026-08-16", to: "2026-08-18" });
  });

  it("keeps multi-day confirmed events visible when a stay overlaps them", () => {
    expect(eventOverlapsDateRange(datedEvent, { from: "2026-12-01", to: "2026-12-02" })).toBe(true);
    expect(eventOverlapsDateRange(datedEvent, { from: "2026-12-05", to: "2026-12-06" })).toBe(false);
    expect(eventOverlapsDateRange({ dateStatus: "dates_pending", startDate: undefined }, { from: "2026-12-01", to: "2026-12-02" })).toBe(false);
  });

  it("parses shareable discovery parameters and applies combined filters", () => {
    const params = new URLSearchParams("period=custom&from=2027-06-03&to=2027-06-06&location=monaco&interest=sports&q=grand");
    const filters = parseEventDiscoveryParams(params);
    const results = filterDiscoverableEvents([getRivieraEvent("monaco-grand-prix")!], filters, new Date("2026-08-01T10:00:00.000Z"));

    expect(filters).toMatchObject({ period: "custom", location: "monaco", interest: "sports", query: "grand" });
    expect(results.map((event) => event.slug)).toEqual(["monaco-grand-prix"]);
  });

  it("builds deterministic dedupe keys for future ingestion candidates", () => {
    const first = {
      sourceId: "source",
      title: "Nice Jazz Fest",
      normalizedTitle: "nice jazz fest",
      sourceUrl: "https://example.com/event/",
      city: "Nice",
      venue: "Place Massena",
      startDate: "2026-07-24",
      reviewRequired: false,
    };
    const second = { ...first, sourceUrl: "https://example.com/event" };

    expect(eventDeduplicationKey(first)).toBe(eventDeduplicationKey(second));
    expect(findDuplicateEventCandidates([first, second])).toHaveLength(1);
  });
});
