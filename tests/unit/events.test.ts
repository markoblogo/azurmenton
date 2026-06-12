import { describe, expect, it } from "vitest";
import { getEventDateStatus } from "../../src/lib/events";

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
});
