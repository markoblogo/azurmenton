import { describe, expect, it, vi } from "vitest";
import { formatTimeCheckedLabel, getAvailabilityHintLabel } from "../../src/lib/availability/presentation";

describe("availability presentation helpers", () => {
  it("formats recent calendar checks in a user-facing way", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-28T12:45:00.000Z"));

    expect(formatTimeCheckedLabel("en", "2026-07-28T12:44:20.000Z")).toBe("Checked just now");
    expect(formatTimeCheckedLabel("en", "2026-07-28T12:10:00.000Z")).toBe("Checked 35 minutes ago");

    vi.useRealTimers();
  });

  it("derives compact availability hints only from fresh data", () => {
    expect(
      getAvailabilityHintLabel("en", {
        apartmentSlug: "sea-view-balcony-studio",
        status: "available",
        freeWindows: [{ start: "2026-09-18", end: "2026-09-23" }],
        checkedAt: "2026-07-28T12:10:00.000Z",
        sourceFreshness: "fresh",
      }),
    ).toBe("Next available: September 18");

    expect(
      getAvailabilityHintLabel("en", {
        apartmentSlug: "sea-view-balcony-studio",
        status: "no-windows",
        freeWindows: [],
        checkedAt: "2026-07-28T12:10:00.000Z",
        sourceFreshness: "fresh",
      }),
    ).toBe("Check flexible dates");

    expect(
      getAvailabilityHintLabel("en", {
        apartmentSlug: "sea-view-balcony-studio",
        status: "available",
        freeWindows: [{ start: "2026-09-18", end: "2026-09-23" }],
        checkedAt: "2026-07-28T12:10:00.000Z",
        sourceFreshness: "stale",
      }),
    ).toBeNull();
  });
});
