import { describe, expect, it } from "vitest";
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
});
