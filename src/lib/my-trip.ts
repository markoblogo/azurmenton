import { parseDayRoutes, type SavedDayRoute } from "./trip-day-routes";
import { parsePlaceDays, type PlaceDay } from "./trip-place-days";

export const TRIP_KEY = "azurmenton.trip.v1";
export const TRIP_CHANGED = "azurmenton:trip-changed";
export const tripInterests = ["food-markets", "beaches", "walks-views", "with-children", "day-trips", "events", "practical"] as const;
export type TripInterest = typeof tripInterests[number];
export type MyTrip = { checkIn: string; checkOut: string; adults: number; children: number; childAges?: (number | null)[]; car: boolean; interests: TripInterest[]; dayRoutes?: SavedDayRoute[]; placeDays?: PlaceDay[] };
export const emptyTrip: MyTrip = { checkIn: "", checkOut: "", adults: 2, children: 0, car: false, interests: [] };

function validDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}

export function parseTrip(raw: string | null): MyTrip | null {
  try {
    if (!raw || raw.length > 40000) return null;
    const data = JSON.parse(raw);
    if (data.version !== 1) return null;
    const t = data.trip;
    if (!t || !validDate(t.checkIn) || !validDate(t.checkOut) || t.checkOut <= t.checkIn || !Number.isInteger(t.adults) || t.adults < 1 || t.adults > 12 || !Number.isInteger(t.children) || t.children < 0 || t.children > 12 || typeof t.car !== "boolean" || !Array.isArray(t.interests) || t.interests.some((i: unknown) => !tripInterests.includes(i as TripInterest))) return null;
    const dayRoutes = parseDayRoutes(t.dayRoutes);
    const placeDays = parsePlaceDays(t.placeDays);
    const childAges = Array.from({length:t.children}, (_,index) => {
      const age = Array.isArray(t.childAges) ? t.childAges[index] : undefined;
      return Number.isInteger(age) && age >= 0 && age <= 17 ? age as number : null;
    });
    return { checkIn: t.checkIn, checkOut: t.checkOut, adults: t.adults, children: t.children, ...(childAges.some(age=>age!==null) ? {childAges} : {}), car: t.car, interests: [...new Set<TripInterest>(t.interests)], ...(dayRoutes.length ? { dayRoutes } : {}), ...(placeDays.length ? { placeDays } : {}) };
  } catch { return null; }
}

export function saveTrip(storage: Pick<Storage, "setItem">, trip: MyTrip): boolean {
  const raw = JSON.stringify({ version: 1, trip });
  const validated = parseTrip(raw);
  if (!validated) return false;
  try { storage.setItem(TRIP_KEY, JSON.stringify({ version: 1, trip: validated })); return true; } catch { return false; }
}

export function tripBookingValues(trip: MyTrip, today: string) {
  if (trip.checkIn < today || trip.adults > 8 || trip.children > 8) return null;
  return { checkIn: trip.checkIn, checkOut: trip.checkOut, adults: String(trip.adults), children: String(trip.children) };
}
