import { describe, expect, it } from "vitest";
import { getEventDetail } from "@/content/riviera-events";
import { guideApartmentScenarios, getEventApartmentScenario, getGuideApartmentScenario } from "@/content/contextual-apartment-recommendations";
import { guideArticles } from "@/content/guide";
import { apartments } from "@/content/apartments";
import { contextualStayHref, eventStayWindow } from "@/lib/contextual-stay";
import { getAvailabilityPrefillFromSearchParams } from "@/lib/availability/prefill";
import { compactBookingAttributionProps } from "@/lib/analytics";

const now = new Date("2026-10-31T12:00:00Z");
const event = getEventDetail("st-johns-jazz-menton-2026-11-06")!;
describe("contextual stay recommendations", () => {
  it("extends canonical guide links without guessing a family or winter intent", () => {
    const coffee = guideArticles.find(article => article.slug === "best-coffee-menton")!;
    const scenario = getGuideApartmentScenario({ ...coffee, relatedApartments: ["bad-id", "panoramic-sea-view-studio", "panoramic-sea-view-studio"], sections: [] })!;
    expect(scenario.recommendations.map(item => item.apartmentSlug)).toEqual(["panoramic-sea-view-studio"]);
    expect(scenario.checkLabel).toBeUndefined();
    expect(getGuideApartmentScenario({ ...coffee, relatedApartments: [], sections: [] })).toBeUndefined();
    expect(getGuideApartmentScenario({ ...coffee, relatedApartments: [], sections: [{ ...coffee.sections[0], relatedApartmentKeys: ["beachside-family-apartment"] }] })!.recommendations[0].apartmentSlug).toBe("beachside-family-apartment");
    for (const article of guideArticles) {
      for (const item of getGuideApartmentScenario(article)?.recommendations ?? []) {
        expect(apartments.some(apartment => apartment.slug === item.apartmentSlug)).toBe(true);
      }
    }
  });
  it("uses capacity-appropriate family recommendations and a translated winter scenario", () => {
    expect(guideApartmentScenarios["menton-with-kids-family-guide"].recommendations.map(item => item.apartmentSlug)).toEqual(["beachside-family-apartment"]);
    const winter = guideApartmentScenarios["menton-in-winter"];
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      expect(winter.intro?.[locale]).toBeTruthy();
      expect(winter.checkLabel?.[locale]).toBeTruthy();
    }
  });
  it("suggests an overnight stay, with exclusive checkout and calendar-day arithmetic", () => {
    expect(eventStayWindow(event, now)).toEqual({ start: "2026-11-06", end: "2026-11-07" });
    expect(eventStayWindow({ ...event, startDate: "2026-12-31", endDate: "2027-01-02", schedule: undefined }, now)).toEqual({ start: "2026-12-31", end: "2027-01-03" });
  });
  it("never prefills stale, unknown, invalid or broad festival dates", () => {
    for (const candidate of [
      { ...event, dateStatus: "dates_pending" as const },
      { ...event, dateStatusConflict: true },
      { ...event, sourceStatus: "needs_verification" as const },
      { ...event, sourceUrl: undefined },
      { ...event, startDate: "2026-02-30" },
      { ...event, startDate: "2026-11-06", endDate: "2026-12-30" },
      { ...event, startDate: "2026-10-30", endDate: "2026-10-31" },
      { ...event, endDate: "2026-11-05" },
    ]) expect(eventStayWindow(candidate, now)).toBeUndefined();
    expect(eventStayWindow(event, new Date("2026-11-06T23:00:00Z"))).toBeUndefined();
    expect(eventStayWindow(getEventDetail("stand-up-monaco-2026-11-09")!, now)).toBeUndefined();
  });
  it("uses the existing form prefill and preserves attribution without putting dates in analytics", () => {
    const attribution = { sourcePageType: "event" as const, sourceSlug: event.slug, sourceEventSlug: event.slug };
    const href = contextualStayHref("uk", "beachside-family-apartment", attribution, eventStayWindow(event, now));
    const url = new URL(href, "https://azurmenton.com");
    expect(getAvailabilityPrefillFromSearchParams(url.searchParams)).toMatchObject({ apartment: "beachside-family-apartment", checkIn: "2026-11-06", checkOut: "2026-11-07" });
    expect(url.searchParams.get("sourceEventSlug")).toBe(event.slug);
    expect(url.hash).toBe("#direct-request-form");
    expect(compactBookingAttributionProps(attribution)).not.toHaveProperty("checkIn");
    expect(compactBookingAttributionProps(attribution)).not.toHaveProperty("checkOut");
    expect(contextualStayHref("en", "bad-id", attribution)).not.toContain("apartment=");
    expect(getEventApartmentScenario(event, ["bad-id", "beachside-family-apartment"]).recommendations.map(item => item.apartmentSlug)).toEqual(["beachside-family-apartment"]);
  });
});
