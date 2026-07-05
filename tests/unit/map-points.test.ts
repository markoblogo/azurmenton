import { describe, expect, it } from "vitest";
import { apartmentMapPoints } from "@/content/planning/apartment-map-points";
import { placeMapPoints } from "@/content/planning/place-map-points";

const minLandLatitudeByPlaceId = new Map<string, number>([
  ["quai-bonaparte-menton", 43.78],
  ["plage-sablettes", 43.7804],
  ["plage-casino", 43.7773],
  ["plage-fossan", 43.779],
  ["plage-rondelli", 43.783],
  ["rondelli-garavan-side", 43.7835],
  ["promenade-du-soleil", 43.7773],
  ["port-de-garavan", 43.7848],
  ["musee-jean-cocteau-bastion", 43.7795],
  ["borrigo-beaches", 43.7767],
  ["inky-bar", 43.7802],
]);

const minLandLatitudeByApartmentSlug = new Map<string, number>([
  ["sea-view-balcony-studio", 43.7773],
  ["beachside-family-apartment", 43.7772],
  ["panoramic-sea-view-studio", 43.7852],
]);

describe("map points", () => {
  it("keeps coastal Menton place markers on land-side map positions", () => {
    for (const [placeId, minLatitude] of minLandLatitudeByPlaceId) {
      const point = placeMapPoints.find((item) => item.placeId === placeId);
      expect(point, placeId).toBeDefined();
      expect(point?.lat, placeId).toBeGreaterThanOrEqual(minLatitude);
    }
  });

  it("keeps apartment markers on land-side map positions", () => {
    for (const [apartmentSlug, minLatitude] of minLandLatitudeByApartmentSlug) {
      const point = apartmentMapPoints.find((item) => item.apartmentSlug === apartmentSlug);
      expect(point, apartmentSlug).toBeDefined();
      expect(point?.lat, apartmentSlug).toBeGreaterThanOrEqual(minLatitude);
    }
  });
});
