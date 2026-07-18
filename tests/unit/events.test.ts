import { describe, expect, it } from "vitest";
import { eventDetailSlugs, getCanonicalEventDetailSlug, getEventDetail, getEventSearchIndexing, getRivieraEvent, isIndexableEventDetail } from "../../src/content/riviera-events";
import { canRenderEventJsonLd, getEventDateStatus } from "../../src/lib/events";

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
    expect(canRenderEventJsonLd({ dateStatus: "confirmed", startDate: "2027-02-09" })).toBe(true);
    expect(canRenderEventJsonLd({ dateStatus: "dates_pending", startDate: undefined })).toBe(false);
    expect(canRenderEventJsonLd({ dateStatus: "estimated_annual_window", startDate: undefined })).toBe(false);
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
});
