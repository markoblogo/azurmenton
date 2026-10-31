import { describe, expect, it } from "vitest";
import { buildUmapTrial, compactMapNote } from "@/lib/umap-trial";
import { placeMapPoints } from "@/content/planning/place-map-points";

describe("bounded uMap experiment", () => {
  it("reuses reviewed coordinates, stop order, real links and access caveats in four locales", () => {
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      const trial = buildUmapTrial("family-menton", locale);
      expect(trial.stops.features.map(feature => feature.id)).toEqual(["palais-de-leurope-menton", "salle-des-mariages-jean-cocteau", "promenade-du-soleil"]);
      for (const feature of trial.stops.features) {
        const point = placeMapPoints.find(item => item.placeId === feature.id)!;
        expect(feature.geometry.coordinates).toEqual([point.lng, point.lat]);
        expect(feature.properties!.description).toContain(`https://azurmenton.com/${locale}/guide/`);
        expect(feature.properties!.accessNote).toBe(trial.accessNote);
        expect(feature.properties!.description).not.toContain(trial.accessNote);
        expect(feature.properties!.description).toContain(`#day-route-family-menton`);
        expect(feature.properties!.description.split("\n")[0].length).toBeLessThanOrEqual(96);
      }
      const url = new URL(trial.previewUrl);
      const preview = JSON.parse(url.searchParams.get("data")!);
      expect(preview.features.map((feature: { geometry: unknown }) => feature.geometry)).toEqual(trial.stops.features.map(feature => feature.geometry));
      expect(preview.features[0].properties.accessNote).toBeUndefined();
      expect(trial.stops.features.every(feature => feature.geometry.type === "Point")).toBe(true);
      expect(trial.schematic.features[0].properties!.name).toContain("not street navigation");
      expect(JSON.stringify(trial)).not.toMatch(/checkIn|checkOut|childAges|email|phone/);
    }
  });
  it("bounds popup summaries without dropping the original note from the export", () => {
    expect(compactMapNote("  A short\n note. ")).toBe("A short note.");
    expect(compactMapNote("A longer sentence ".repeat(30)).length).toBeLessThanOrEqual(96);
    expect(compactMapNote("A longer sentence ".repeat(30))).toMatch(/\.\.\.$/);
    const trial = buildUmapTrial("family-menton", "uk");
    expect(trial.stops.features[0].properties!.fullNote).toBeTruthy();
  });
  it("fails instead of silently dropping unreviewed, missing or invalid stops", () => {
    expect(() => buildUmapTrial("missing", "en")).toThrow("Unknown day route");
    expect(() => buildUmapTrial("constructor", "en")).toThrow("Unknown day route");
    expect(() => buildUmapTrial("one-day-without-car", "en")).toThrow("Unreviewed");
    expect(() => buildUmapTrial("family-menton", "en", [])).toThrow("Unreviewed");
    expect(() => buildUmapTrial("family-menton", "en", placeMapPoints.map(point => ({ ...point, lng: NaN })))).toThrow("Invalid coordinates");
  });
  it("uses the official seafront point, not the old inland Promenade du Soleil pin", () => {
    const point = placeMapPoints.find(item => item.placeId === "promenade-du-soleil")!;
    expect([point.lat, point.lng]).toEqual([43.768361, 7.491301]);
    expect(point.review?.sourceUrl).toContain("la-promenade-du-soleil-menton");
    expect(point.review?.precision).toBe("area");
  });
});
