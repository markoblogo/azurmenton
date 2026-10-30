import { describe, expect, it } from "vitest";
import { guideArticles } from "@/content/guide";
import { stayPlans } from "@/content/planning/stay-plans";
import { dayRouteDetails } from "@/content/planning/day-route-details";
import { getPlaces } from "@/content/places";
import { placeSharePath } from "@/lib/place-share-target";
import { locales } from "@/i18n/locales";

const detailed = stayPlans.filter(plan => plan.dayRoute);
const guideSlugs = new Set(guideArticles.map(guide => guide.slug));

describe("editorial day routes", () => {
  it("extends five existing stay scenarios without orphaned route details", () => {
    expect(detailed).toHaveLength(5);
    expect(detailed.map(plan => plan.id).sort()).toEqual(Object.keys(dayRouteDetails).sort());
    for (const plan of detailed) {
      const route = plan.dayRoute!;
      expect(route.guideSlugs.length).toBeGreaterThan(0);
      for (const slug of [...route.guideSlugs, route.planBGuideSlug]) expect(guideSlugs.has(slug), slug).toBe(true);
      expect(route.stops.length).toBeGreaterThanOrEqual(2);
      expect(new Set(route.stops.map(stop => stop.placeId)).size).toBe(route.stops.length);
      expect(route.durationMinutes[0]).toBeGreaterThan(0);
      expect(route.durationMinutes[1]).toBeGreaterThanOrEqual(route.durationMinutes[0]);
      expect(route.durationMinutes[0]).toBeGreaterThanOrEqual(route.stops.filter(stop => !stop.optional).reduce((sum, stop) => sum + stop.visitMinutes[0], 0));
      for (const stop of route.stops) {
        const place = getPlaces([stop.placeId])[0];
        expect(place, stop.placeId).toBeDefined();
        expect(place.image, stop.placeId).toBeTruthy();
        expect(plan.relatedPlaceIds).toContain(place.id);
        for (const slug of route.guideSlugs) expect(place.relatedArticleIds).toContain(slug);
        expect(stop.visitMinutes[0]).toBeGreaterThan(0);
        expect(stop.visitMinutes[1]).toBeGreaterThanOrEqual(stop.visitMinutes[0]);
        for (const locale of locales) {
          expect(placeSharePath(place.id, locale), place.id).toMatch(new RegExp(`^/${locale}/(?:guide|events)/.+#place-${place.id}$`));
          expect(stop.note[locale].trim()).not.toBe("");
        }
      }
    }
  });

  it("retains uncertainty and localized source/constraint information", () => {
    for (const { dayRoute: route } of detailed) {
      expect(route!.childAgeStatus).toBe("not-verified");
      expect(["partial", "not-assessed"]).toContain(route!.accessStatus);
      expect(route!.reviewedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(new Date(route!.reviewedOn).toISOString().slice(0, 10)).toBe(route!.reviewedOn);
      expect(route!.sources.length).toBeGreaterThan(0);
      for (const source of route!.sources) {
        expect(new URL(source.url).protocol).toBe("https:");
        for (const locale of locales) expect(source.label[locale].trim()).not.toBe("");
      }
      for (const field of ["title", "accessNote", "transport", "booking", "timing", "planB"] as const) {
        for (const locale of locales) expect(route![field][locale].trim()).not.toBe("");
        expect(route![field].uk).toMatch(/[іїєґІЇЄҐ]/);
        expect(route![field].uk).not.toBe(route![field].en);
      }
    }
  });

  it("does not turn exterior visits, building access or seasonal plans into guarantees", () => {
    const cocteau = dayRouteDetails["cocteau-walking-day"];
    expect(cocteau.stops.find(stop => stop.placeId === "musee-jean-cocteau-wunderman-menton")?.note.en).toContain("Exterior only");
    expect(cocteau.timing.en).toContain("1 November");
    expect(cocteau.accessNote.en).toContain("not wheelchair accessible");
    expect(dayRouteDetails["family-menton"].accessStatus).toBe("not-assessed");
    expect(dayRouteDetails["monaco-event-weekend"].accessNote.en).toContain("complete route from the station has not been audited");
    expect(dayRouteDetails["monaco-event-weekend"].timing.en).toContain("planned");
    expect(dayRouteDetails["italian-riviera-day"].timing.en).toContain("only on Friday");
  });
});
