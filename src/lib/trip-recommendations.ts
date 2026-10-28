import { homeSeason, type HomeSeason } from "@/lib/home-season";
import { addDaysToDateKey } from "@/lib/events";
import type { MyTrip } from "@/lib/my-trip";

export type TripGuide = { id: string; category?: string };
type Profile = { seasons?: HomeSeason[]; months?: number[]; seasonalOnly?: boolean; car?: "useful" | "transit"; priority?: number };

// Editorial relevance only: these are not opening-hour or transport guarantees.
export const tripGuideProfiles: Record<string, Profile> = {
  "menton-in-autumn": { seasons: ["autumn"], seasonalOnly: true, priority: 12 },
  "menton-in-winter": { seasons: ["winter"], seasonalOnly: true, priority: 12 },
  "stay-cool-in-menton-summer": { seasons: ["summer"], seasonalOnly: true, priority: 12 },
  "mountains-snow-skiing-near-menton": { seasons: ["winter"], seasonalOnly: true, car: "useful", priority: 5 },
  "christmas-french-riviera-from-menton": { months: [11, 12, 1], priority: 6 },
  "menton-without-a-car": { car: "transit", priority: 5 },
  "public-transport-in-menton": { car: "transit", priority: 5 },
  "italian-riviera-day-trip-from-menton": { car: "transit", priority: 4 },
  "car-rental-menton-nice-airport-convertibles": { car: "useful" },
  "electric-car-charging-menton": { car: "useful" },
  "best-walks-and-hikes-around-menton": { seasons: ["spring", "autumn"], priority: 3 },
  "menton-old-town": { car: "transit", priority: 4 },
  "museums-in-menton-nice-monaco": { car: "transit", priority: 3 },
  "menton-with-kids-family-guide": { priority: 3 },
};

export function tripSeasons(trip: MyTrip): Set<HomeSeason> {
  const seasons = new Set<HomeSeason>();
  // At most twelve samples plus the last overnight day, even for a long stay.
  let day = trip.checkIn;
  for (let count = 0; count < 12 && day < trip.checkOut; count++) {
    seasons.add(homeSeason(new Date(`${day}T12:00:00Z`)));
    const next = new Date(`${day}T12:00:00Z`);
    next.setUTCMonth(next.getUTCMonth() + 1, 1);
    day = next.toISOString().slice(0, 10);
  }
  seasons.add(homeSeason(new Date(`${addDaysToDateKey(trip.checkOut, -1)}T12:00:00Z`)));
  return seasons;
}

export function rankTripGuides<T extends TripGuide>(guides: T[], trip: MyTrip | null, limit = 6): T[] {
  const seasons = trip ? tripSeasons(trip) : null;
  return guides.flatMap(guide => {
    const profile = tripGuideProfiles[guide.id];
    if (!trip && (profile?.seasonalOnly || profile?.months)) return [];
    const seasonalMatch = Boolean(profile?.seasons?.some(season => seasons?.has(season)));
    if (trip && profile?.seasonalOnly && !seasonalMatch) return [];
    if (trip && profile?.months) {
      const from = new Date(`${trip.checkIn}T12:00:00Z`);
      const last = new Date(`${addDaysToDateKey(trip.checkOut, -1)}T12:00:00Z`);
      const months = new Set<number>();
      for (let i = 0; i < 12 && from <= last; i++) { months.add(from.getUTCMonth() + 1); from.setUTCMonth(from.getUTCMonth() + 1, 1); }
      if (!profile.months.some(month => months.has(month))) return [];
    }
    const interested = Boolean(trip?.interests.includes(guide.category as MyTrip["interests"][number]));
    const score = (profile?.priority ?? 0) + (seasonalMatch ? 12 : 0) + (interested ? 25 : 0)
      + (trip && !trip.car && profile?.car === "transit" ? 9 : 0)
      - (trip && !trip.car && profile?.car === "useful" ? 18 : 0)
      + (trip?.car && profile?.car === "useful" ? 9 : 0)
      + (trip?.children && guide.category === "with-children" ? 15 : 0);
    return [{ guide, score }];
  }).sort((a, b) => b.score - a.score || a.guide.id.localeCompare(b.guide.id)).slice(0, limit).map(item => item.guide);
}

export function tripOverlapsEvent(trip: MyTrip, event: { start?: string; end?: string }): boolean {
  return Boolean(event.start && event.start < trip.checkOut && (event.end ?? event.start) >= trip.checkIn);
}
