import { describe, expect, it } from "vitest";
import { apartmentMapPoints } from "@/content/planning/apartment-map-points";
import { mapCategories, mapPlaceTypes } from "@/content/planning/map-taxonomy";
import { placeMapPoints } from "@/content/planning/place-map-points";

const reviewedWaterfrontAndOldTownPointIds = [
  "halles-du-marche",
  "maison-herbin-menton",
  "rue-saint-michel-menton",
  "plage-sablettes",
  "plage-casino",
  "plage-rondelli",
  "rondelli-garavan-side",
  "port-de-garavan",
  "jardin-val-rahmeh",
  "cimetiere-vieux-chateau",
  "musee-jean-cocteau-bastion",
  "salle-des-mariages-jean-cocteau",
  "menton-garavan-station",
  "cinema-eden-menton",
  "le-lavoir-theatre-menton",
];

const newlyReviewedPublicPointIds = [
  "casino-barriere-menton",
  "plage-fossan",
  "borrigo-beaches",
];

describe("map points", () => {
  it("keeps reviewed waterfront and old-town markers traceable", () => {
    for (const placeId of reviewedWaterfrontAndOldTownPointIds) {
      const point = placeMapPoints.find((item) => item.placeId === placeId);
      expect(point, placeId).toBeDefined();
      expect(point?.review, placeId).toMatchObject({ checkedOn: "2026-07-10" });
      expect(point?.lat, placeId).toBeGreaterThan(43.7);
      expect(point?.lng, placeId).toBeGreaterThan(7.45);
    }
  });

  it("keeps newly reviewed public points linked to their coordinate source", () => {
    for (const placeId of newlyReviewedPublicPointIds) {
      const point = placeMapPoints.find((item) => item.placeId === placeId);
      expect(point?.review, placeId).toMatchObject({ checkedOn: "2026-07-10" });
      expect(point?.review?.sourceUrl, placeId).toBeTruthy();
    }
  });

  it("keeps apartment markers host-reviewed at building precision", () => {
    expect(apartmentMapPoints).toHaveLength(3);
    for (const point of apartmentMapPoints) {
      expect(point.review).toEqual({ source: "host_verified", precision: "building", checkedOn: "2026-07-10" });
    }
  });

  it("keeps map filters based on concrete, non-overlapping place types", () => {
    const declaredTypes = mapCategories.flatMap((category) => category.placeTypes);
    expect(new Set(declaredTypes).size).toBe(declaredTypes.length);
    expect(mapPlaceTypes.size).toBe(declaredTypes.length);
  });
});
