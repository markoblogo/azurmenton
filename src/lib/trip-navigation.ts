import type { PlaceDay, PlanPlace } from "./trip-place-days";

export type TravelMode = "walking" | "driving" | "transit";
const validPoint = (value?: string) => {
  if (!value || !/^-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?$/.test(value)) return false;
  const [lat, lng] = value.split(",").map(Number);
  return Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
};

// No geocoding, optimisation, dates or guest profile sent to Maps. Keep every stop.
export function dayNavigation(day: PlaceDay, places: PlanPlace[], mode: TravelMode) {
  if (!["walking", "driving", "transit"].includes(mode)) return [];
  const stops = day.placeIds.map(id => places.find(place => place.id === id));
  if (stops.length < 2 || stops.some(place => !validPoint(place?.point))) return [];
  const chunks: { href: string; from: number; to: number }[] = [];
  // Three waypoints work on mobile; transit does not support waypoints.
  const stride = mode === "transit" ? 1 : 4;
  for (let start = 0; start < stops.length - 1; start += stride) {
    const end = Math.min(start + stride, stops.length - 1);
    const url = new URL("https://www.google.com/maps/dir/");
    url.search = new URLSearchParams({ api: "1", origin: stops[start]!.point!, destination: stops[end]!.point!, travelmode: mode }).toString();
    if (end - start > 1) url.searchParams.set("waypoints", stops.slice(start + 1, end).map(place => place!.point).join("|"));
    chunks.push({ href: url.href, from: start + 1, to: end + 1 });
  }
  return chunks;
}

export function dayGeography(day: PlaceDay, places: PlanPlace[]) {
  const stops = day.placeIds.map(id => places.find(place => place.id === id));
  return { cities: [...new Set(stops.flatMap(place => place?.city ? [place.city] : []))], unknown: stops.some(place => !place?.city) };
}
