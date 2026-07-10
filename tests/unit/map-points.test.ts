import { describe, expect, it } from "vitest";
import { apartmentMapPoints } from "@/content/planning/apartment-map-points";
import { mapCategories, mapPlaceTypes } from "@/content/planning/map-taxonomy";
import { placeMapPoints } from "@/content/planning/place-map-points";
import { places } from "@/content/places";

const reviewedWaterfrontAndOldTownPointIds = [
  "halles-du-marche",
  "maison-herbin-menton",
  "rue-saint-michel-menton",
  "plage-sablettes",
  "plage-casino",
  "plage-rondelli",
  "rondelli-garavan-side",
  "promenade-du-soleil",
  "port-de-garavan",
  "jardins-bioves",
  "jardin-val-rahmeh",
  "cimetiere-vieux-chateau",
  "musee-jean-cocteau-bastion",
  "salle-des-mariages-jean-cocteau",
  "menton-station",
  "menton-garavan-station",
  "palais-de-leurope-menton",
  "basilica-saint-michel-archange",
  "cinema-eden-menton",
  "le-lavoir-theatre-menton",
];

const newlyReviewedPublicPointIds = [
  "casino-barriere-menton",
  "plage-fossan",
  "borrigo-beaches",
];

const reviewedRestaurantEveningMuseumPointIds = [
  "chez-mimi-menton",
  "musee-prehistoire-regionale-menton",
  "nabucco-wine-bar-cellar",
  "o-divin-menton",
  "comptoir-des-vignes-menton",
  "nicolas-menton",
  "mirazur-menton",
  "orangerie-menton",
  "casa-fuego-menton",
  "biera-daqui",
  "inky-bar",
  "les-incompris",
  "bar-lescalier",
];

describe("map points", () => {
  it("keeps reviewed waterfront and old-town markers traceable", () => {
    for (const placeId of reviewedWaterfrontAndOldTownPointIds) {
      const point = placeMapPoints.find((item) => item.placeId === placeId);
      expect(point, placeId).toBeDefined();
      expect(point?.review, placeId).toMatchObject({ checkedOn: "2026-07-10" });
      expect(point?.review?.sourceUrl, placeId).toBeTruthy();
      expect(point?.lat, placeId).toBeGreaterThan(43.7);
      expect(point?.lng, placeId).toBeGreaterThan(7.45);
    }
  });

  it("keeps newly reviewed public points linked to their coordinate source", () => {
    for (const placeId of [...newlyReviewedPublicPointIds, ...reviewedRestaurantEveningMuseumPointIds]) {
      const point = placeMapPoints.find((item) => item.placeId === placeId);
      expect(point?.review, placeId).toMatchObject({ checkedOn: "2026-07-10" });
      expect(point?.review?.sourceUrl, placeId).toBeTruthy();
    }
  });

  it("requires reviewed coordinates for places flagged as map-review critical", () => {
    const mapPointByPlaceId = new Map(placeMapPoints.map((point) => [point.placeId, point]));
    const requiredPlaces = places.filter((place) => place.requiresMapReview);

    expect(requiredPlaces.map((place) => place.id).sort()).toEqual(reviewedRestaurantEveningMuseumPointIds.toSorted());

    for (const place of requiredPlaces) {
      const point = mapPointByPlaceId.get(place.id);
      expect(point, place.id).toBeDefined();
      expect(point?.review?.sourceUrl, place.id).toBeTruthy();
      expect(point?.review?.checkedOn, place.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
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
