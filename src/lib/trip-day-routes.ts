import type { MyTrip } from "./my-trip";

export type SavedDayRoute = { routeId: string; date: string };
export type DayRouteOption = { id: string; title: string; href: string; minutes: [number, number] };
export const MAX_DAY_ROUTES = 60;
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const validDate = (value: unknown): value is string => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
export const dayRouteKey = (entry: SavedDayRoute) => `${entry.date}:${entry.routeId}`;

export function parseDayRoutes(value: unknown): SavedDayRoute[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value.slice(0, 200).flatMap(entry => {
    if (!entry || typeof entry !== "object" || typeof entry.routeId !== "string" || entry.routeId.length > 100 || !idPattern.test(entry.routeId) || !validDate(entry.date)) return [];
    const clean = { routeId: entry.routeId, date: entry.date };
    if (seen.has(dayRouteKey(clean))) return [];
    seen.add(dayRouteKey(clean));
    return [clean];
  }).slice(0, MAX_DAY_ROUTES).sort((a, b) => dayRouteKey(a).localeCompare(dayRouteKey(b)));
}

export function routeDateInTrip(date: string, trip: Pick<MyTrip, "checkIn" | "checkOut">): boolean {
  return validDate(date) && date >= trip.checkIn && date < trip.checkOut;
}

export function assignDayRoute(trip: MyTrip, entry: SavedDayRoute, today: string): MyTrip | null {
  if (!validDate(today) || entry.date < today || !routeDateInTrip(entry.date, trip) || parseDayRoutes([entry]).length !== 1) return null;
  const current = trip.dayRoutes ?? [];
  if (current.some(item => dayRouteKey(item) === dayRouteKey(entry))) return trip;
  if (current.length >= MAX_DAY_ROUTES) return null;
  return { ...trip, dayRoutes: parseDayRoutes([...current, entry]) };
}

export function removeDayRoute(trip: MyTrip, entry: SavedDayRoute): MyTrip {
  return { ...trip, dayRoutes: (trip.dayRoutes ?? []).filter(item => dayRouteKey(item) !== dayRouteKey(entry)) };
}

export function moveDayRoute(trip: MyTrip, entry: SavedDayRoute, date: string, today: string): MyTrip | null {
  if (!trip.dayRoutes?.some(item => dayRouteKey(item) === dayRouteKey(entry))) return null;
  return assignDayRoute(removeDayRoute(trip, entry), { routeId: entry.routeId, date }, today);
}
