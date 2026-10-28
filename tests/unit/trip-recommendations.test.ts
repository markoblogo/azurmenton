import { describe, expect, it } from "vitest";
import { guideArticles } from "@/content/guide";
import { getEventDateLabel, getRivieraEvent } from "@/content/riviera-events";
import { emptyTrip, tripBookingValues } from "@/lib/my-trip";
import { rankTripGuides, tripGuideProfiles, tripOverlapsEvent, tripSeasons } from "@/lib/trip-recommendations";

const winter = { ...emptyTrip, checkIn: "2027-02-15", checkOut: "2027-02-20" };
const guides = [
  { id: "stay-cool-in-menton-summer", category: "practical" },
  { id: "menton-in-winter", category: "itineraries" },
  { id: "public-transport-in-menton", category: "practical" },
  { id: "electric-car-charging-menton", category: "practical" },
  { id: "menton-with-kids-family-guide", category: "with-children" },
  { id: "christmas-french-riviera-from-menton", category: "events" },
];

describe("trip recommendations and booking handoff", () => {
  it("does not overwrite explicitly maintained confirmed dates with legacy translations", () => {
    const event = getRivieraEvent("fete-du-citron-2027")!;
    expect(event.dateStatus).toBe("confirmed");
    expect(event.startDate).toBe("2027-02-13");
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      expect(getEventDateLabel(event, locale)).toContain("13-28");
    }
  });
  it("maintains real guide references", () => {
    for (const id of Object.keys(tripGuideProfiles)) expect(guideArticles.some(g => g.slug === id)).toBe(true);
  });
  it("excludes opposite-season and out-of-month material, and ranks transport for car-free guests", () => {
    const ranked = rankTripGuides(guides, winter);
    expect(ranked.map(g => g.id)).not.toContain("stay-cool-in-menton-summer");
    expect(ranked.map(g => g.id)).not.toContain("christmas-french-riviera-from-menton");
    expect(ranked.findIndex(g => g.id === "public-transport-in-menton")).toBeLessThan(ranked.findIndex(g => g.id === "electric-car-charging-menton"));
    const carTrip = rankTripGuides(guides, { ...winter, car: true });
    expect(carTrip.findIndex(g => g.id === "electric-car-charging-menton")).toBeLessThan(carTrip.findIndex(g => g.id === "public-transport-in-menton"));
  });
  it("handles a stay crossing seasons, excluding departure day", () => {
    expect([...tripSeasons({ ...winter, checkIn: "2027-02-28", checkOut: "2027-03-02" })]).toEqual(["winter", "spring"]);
    expect([...tripSeasons({ ...winter, checkIn: "2027-02-28", checkOut: "2027-03-01" })]).toEqual(["winter"]);
  });
  it("includes ongoing events but not departure-day-only events", () => {
    expect(tripOverlapsEvent(winter, { start: "2027-02-10", end: "2027-02-15" })).toBe(true);
    expect(tripOverlapsEvent(winter, { start: "2027-02-20" })).toBe(false);
    expect(tripOverlapsEvent(winter, {})).toBe(false);
  });
  it("transfers only dates and guest numbers, rejecting stale or unsupported group sizes", () => {
    expect(tripBookingValues(winter, "2027-02-01")).toEqual({ checkIn: winter.checkIn, checkOut: winter.checkOut, adults: "2", children: "0" });
    expect(tripBookingValues(winter, "2027-02-16")).toBeNull();
    expect(tripBookingValues({ ...winter, adults: 9 }, "2027-02-01")).toBeNull();
  });
});
