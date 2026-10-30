import type { MyTrip } from "./my-trip";
import { routeDateInTrip } from "./trip-day-routes";

export type PlaceDay = { date: string; placeIds: string[] };
export type PlanPlace = { id: string; title: string; href: string; city?: string; point?: string; visitorInfo?: string; minimumAge?: number };
export const MAX_PLACE_DAYS = 30;
export const MAX_STOPS_PER_DAY = 12;
export const MAX_PLAN_STOPS = 120;
const validId = (id: unknown): id is string => typeof id === "string" && id.length <= 160 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id);
const validDate = (date: unknown): date is string => typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isFinite(Date.parse(date)) && new Date(date).toISOString().slice(0, 10) === date;

export function parsePlaceDays(value: unknown): PlaceDay[] {
  if (!Array.isArray(value)) return [];
  const days = new Map<string, string[]>();
  let total = 0;
  for (const entry of value.slice(0, 100)) {
    if (!entry || !validDate(entry.date) || !Array.isArray(entry.placeIds)) continue;
    if (!days.has(entry.date) && days.size >= MAX_PLACE_DAYS) continue;
    const ids = days.get(entry.date) ?? [];
    for (const id of entry.placeIds.slice(0, 200)) {
      if (!validId(id) || ids.includes(id) || ids.length >= MAX_STOPS_PER_DAY || total >= MAX_PLAN_STOPS) continue;
      ids.push(id);
      total++;
    }
    if (ids.length) days.set(entry.date, ids);
  }
  return [...days].sort(([a], [b]) => a.localeCompare(b)).map(([date, placeIds]) => ({ date, placeIds }));
}

export function addPlacesToDay(trip: MyTrip, date: string, placeIds: string[], today: string): MyTrip | null {
  if (!validDate(today) || !routeDateInTrip(date, trip) || date < today || !placeIds.length || placeIds.some(id => !validId(id))) return null;
  const days = trip.placeDays ?? [];
  const existing = days.find(day => day.date === date);
  const merged = [...new Set([...(existing?.placeIds ?? []), ...placeIds])];
  const total = days.filter(day => day.date !== date).reduce((sum, day) => sum + day.placeIds.length, 0) + merged.length;
  if (merged.length > MAX_STOPS_PER_DAY || total > MAX_PLAN_STOPS || (!existing && days.length >= MAX_PLACE_DAYS)) return null;
  return { ...trip, placeDays: parsePlaceDays([...days.filter(day => day.date !== date), { date, placeIds: merged }]) };
}

export function removePlaceDay(trip: MyTrip, date: string): MyTrip {
  return { ...trip, placeDays: (trip.placeDays ?? []).filter(day => day.date !== date) };
}

export function movePlaceDay(trip: MyTrip, from: string, to: string, today: string): MyTrip | null {
  const day = trip.placeDays?.find(item => item.date === from);
  return day ? addPlacesToDay(removePlaceDay(trip, from), to, day.placeIds, today) : null;
}

export function removePlaceStop(trip: MyTrip, date: string, placeId: string): MyTrip {
  return { ...trip, placeDays: (trip.placeDays ?? []).map(day => day.date === date ? { ...day, placeIds: day.placeIds.filter(id => id !== placeId) } : day).filter(day => day.placeIds.length) };
}

export function reorderPlaceStop(trip: MyTrip, date: string, placeId: string, direction: -1 | 1): MyTrip | null {
  const day = trip.placeDays?.find(item => item.date === date);
  const index = day?.placeIds.indexOf(placeId) ?? -1;
  if (!day || index < 0 || ![-1, 1].includes(direction)) return null;
  const next = index + direction;
  if (next < 0 || next >= day.placeIds.length) return trip;
  const ids = [...day.placeIds];
  [ids[index], ids[next]] = [ids[next], ids[index]];
  return { ...trip, placeDays: trip.placeDays!.map(item => item.date === date ? { ...item, placeIds: ids } : item) };
}

// Editorial signal only: no visit duration or travel-time calculation is implied.
export function placeDayWarnings(trip: MyTrip, day: PlaceDay): { manyStops: boolean; readyRoute: boolean } {
  return { manyStops: day.placeIds.length >= 6, readyRoute: Boolean(trip.dayRoutes?.some(route => route.date === day.date)) };
}
