import { describe, expect, it } from "vitest";
import {
  attributionFromSearchParams,
  bookingAttributionHref,
  daysBetweenDates,
  getBookingFunnelPageType,
  leadTimeDays,
  sourcePageTypeFromPathname,
} from "../../src/lib/analytics";

describe("booking funnel analytics helpers", () => {
  it("classifies localized page paths by booking funnel page type", () => {
    expect(getBookingFunnelPageType("/en")).toBe("home");
    expect(getBookingFunnelPageType("/fr/apartments")).toBe("apartments");
    expect(getBookingFunnelPageType("/it/apartments/sea-view-balcony-studio")).toBe("apartment_detail");
    expect(getBookingFunnelPageType("/uk/guide/stay-cool-in-menton-summer")).toBe("guide_detail");
    expect(getBookingFunnelPageType("/en/events")).toBe("events");
    expect(getBookingFunnelPageType("/en/events/menton-lemon-festival")).toBe("event_detail");
    expect(getBookingFunnelPageType("/en/stay/sea-view-apartment-menton")).toBe("stay_detail");
    expect(getBookingFunnelPageType("/en/check-availability")).toBe("check_availability");
  });

  it("computes non-PII stay metrics for funnel reporting", () => {
    expect(daysBetweenDates("2026-08-01", "2026-08-08")).toBe(7);
    expect(daysBetweenDates("not-a-date", "2026-08-08")).toBeUndefined();
    expect(leadTimeDays("not-a-date")).toBeUndefined();
  });

  it("builds safe booking source attribution without personal data", () => {
    expect(sourcePageTypeFromPathname("/en/guide/stay-cool-in-menton-summer")).toBe("guide");
    expect(sourcePageTypeFromPathname("/en/apartments/sea-view-balcony-studio")).toBe("apartment");
    expect(sourcePageTypeFromPathname("/en/stay/monaco-events-from-menton")).toBe("stay");

    expect(
      bookingAttributionHref("en", {
        sourcePageType: "event",
        sourceSlug: "monaco-e-prix",
        sourceEventSlug: "monaco-e-prix",
      }),
    ).toBe("/en/check-availability?sourcePageType=event&sourceSlug=monaco-e-prix&sourceEventSlug=monaco-e-prix");

    const attribution = attributionFromSearchParams(
      new URLSearchParams("sourcePageType=guide&sourceSlug=stay-cool-in-menton-summer&sourceGuideSlug=stay-cool-in-menton-summer"),
      "/en/check-availability",
    );

    expect(attribution).toEqual({
      sourcePageType: "guide",
      sourceSlug: "stay-cool-in-menton-summer",
      sourceGuideSlug: "stay-cool-in-menton-summer",
    });
  });
});
