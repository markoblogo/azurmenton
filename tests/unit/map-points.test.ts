import { describe, expect, it } from "vitest";
import { apartmentMapPoints } from "@/content/planning/apartment-map-points";
import { mapCategories, mapPlaceTypes } from "@/content/planning/map-taxonomy";
import { placeMapExclusions } from "@/content/planning/place-map-exclusions";
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

const reviewedScreenLocationPointIds = [
  "rue-longue-menton",
  "rue-de-brea-menton",
  "place-du-cap-menton",
  "tunnel-pascal-molinari",
  "villa-maria-serena",
  "palais-carnoles-menton",
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

const reviewedPracticalMentonPointIds = [
  "office-tourisme-menton-riviera-merveilles",
  "centre-hospitalier-la-palmosa-menton",
  "commissariat-police-menton",
  "police-municipale-menton",
  "mairie-menton",
  "intermarche-hyper-menton",
  "intermarche-super-borrigo",
  "u-express-menton-centre",
  "u-express-menton-garavan",
  "carrefour-city-felix-faure",
  "carrefour-express-menton",
  "petit-casino-saint-michel",
  "pharmacie-lafayette-des-jardins",
  "pharmacie-victoria-menton",
  "pharmacie-calvin-menton",
  "grande-pharmacie-mentonnaise",
];

const reviewedTransportAccessPointIds = [
  "nice-cote-dazur-airport",
  "nice-airport-car-rental-center",
  "nice-saint-augustin-station",
  "nice-ville-station",
  "europcar-menton",
  "ada-menton-gare",
  "rent-a-car-menton",
  "free2move-rent-menton",
  "r-bike-menton",
  "bike-trip-atelier-velo-riviera",
  "sport-21-cycles",
  "menton-cycle-path",
  "promenade-reine-astrid",
  "pont-saint-ludovic",
];

const reviewedParkingPointIds = [
  "parking-vieille-ville-sablettes",
  "parking-hotel-de-ville-menton",
  "parking-saint-roch-menton",
  "parking-gare-sncf-menton",
  "parking-george-v-menton",
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

  it("keeps new screen-location points reviewed for map accuracy", () => {
    for (const placeId of reviewedScreenLocationPointIds) {
      const point = placeMapPoints.find((item) => item.placeId === placeId);
      expect(point?.review, placeId).toMatchObject({ checkedOn: "2026-07-14" });
      expect(point?.review?.sourceUrl, placeId).toBeTruthy();
      expect(point?.lat, placeId).toBeGreaterThan(43.7);
      expect(point?.lng, placeId).toBeGreaterThan(7.45);
    }
  });

  it("keeps high-value practical Menton points reviewed for map accuracy", () => {
    for (const placeId of reviewedPracticalMentonPointIds) {
      const point = placeMapPoints.find((item) => item.placeId === placeId);
      expect(point?.review, placeId).toMatchObject({ checkedOn: "2026-07-11" });
      expect(point?.review?.sourceUrl, placeId).toBeTruthy();
      expect(point?.lat, placeId).toBeGreaterThan(43.7);
      expect(point?.lng, placeId).toBeGreaterThan(7.45);
    }
  });

  it("keeps transport and arrival access points reviewed for map accuracy", () => {
    for (const placeId of reviewedTransportAccessPointIds) {
      const point = placeMapPoints.find((item) => item.placeId === placeId);
      expect(point?.review, placeId).toMatchObject({ checkedOn: "2026-07-11" });
      expect(point?.review?.sourceUrl, placeId).toBeTruthy();
      expect(point?.lat, placeId).toBeGreaterThan(43.6);
      expect(point?.lng, placeId).toBeGreaterThan(7.19);
    }
  });

  it("keeps public Menton parking points reviewed for map accuracy", () => {
    for (const placeId of reviewedParkingPointIds) {
      const point = placeMapPoints.find((item) => item.placeId === placeId);
      expect(point?.review, placeId).toMatchObject({ checkedOn: "2026-07-11" });
      expect(point?.review?.sourceUrl, placeId).toBeTruthy();
      expect(point?.lat, placeId).toBeGreaterThan(43.7);
      expect(point?.lng, placeId).toBeGreaterThan(7.45);
    }
  });

  it("requires a reviewed coordinate or an explicit exclusion for map-review critical places", () => {
    const mapPointByPlaceId = new Map(placeMapPoints.map((point) => [point.placeId, point]));
    const mapExclusionByPlaceId = new Map(placeMapExclusions.map((exclusion) => [exclusion.placeId, exclusion]));
    const requiredPlaces = places.filter((place) => place.requiresMapReview);

    for (const place of requiredPlaces) {
      const point = mapPointByPlaceId.get(place.id);
      const exclusion = mapExclusionByPlaceId.get(place.id);

      expect(Boolean(point) || Boolean(exclusion), place.id).toBe(true);
      expect(Boolean(point) && Boolean(exclusion), place.id).toBe(false);

      if (point) {
        expect(point.review?.sourceUrl, place.id).toBeTruthy();
        expect(point.review?.checkedOn, place.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }

      if (exclusion) {
        expect(exclusion.sourceUrl, place.id).toMatch(/^https:\/\//);
        expect(exclusion.checkedOn, place.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
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
