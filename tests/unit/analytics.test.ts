import { describe, expect, it } from "vitest";
import { daysBetweenDates, getBookingFunnelPageType, leadTimeDays } from "../../src/lib/analytics";

describe("booking funnel analytics helpers", () => {
  it("classifies localized page paths by booking funnel page type", () => {
    expect(getBookingFunnelPageType("/en")).toBe("home");
    expect(getBookingFunnelPageType("/fr/apartments")).toBe("apartments");
    expect(getBookingFunnelPageType("/it/apartments/sea-view-balcony-studio")).toBe("apartment_detail");
    expect(getBookingFunnelPageType("/uk/guide/stay-cool-in-menton-summer")).toBe("guide_detail");
    expect(getBookingFunnelPageType("/en/events")).toBe("events");
    expect(getBookingFunnelPageType("/en/events/menton-lemon-festival")).toBe("event_detail");
    expect(getBookingFunnelPageType("/en/check-availability")).toBe("check_availability");
  });

  it("computes non-PII stay metrics for funnel reporting", () => {
    expect(daysBetweenDates("2026-08-01", "2026-08-08")).toBe(7);
    expect(daysBetweenDates("not-a-date", "2026-08-08")).toBeUndefined();
    expect(leadTimeDays("not-a-date")).toBeUndefined();
  });
});
