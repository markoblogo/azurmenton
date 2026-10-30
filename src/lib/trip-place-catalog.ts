import { places } from "@/content/places";
import type { Locale } from "@/i18n/locales";
import { placeSharePath } from "./place-share-target";
import type { PlanPlace } from "./trip-place-days";
import { placeMapPoints } from "@/content/planning/place-map-points";
import { placeCities } from "@/content/planning/place-cities";
import { placeMinimumAge, placeVisitNotes } from "./place-visit-rules";

// Public labels/targets only; private favourite IDs and dates stay in the browser.
export function tripPlaceCatalog(locale: Locale): PlanPlace[] {
  return places.flatMap(place => {
    const href = placeSharePath(place.id, locale);
    const map = placeMapPoints.find(point => point.placeId === place.id);
    const point = map?.review && Number.isFinite(map.lat) && Math.abs(map.lat) <= 90 && Number.isFinite(map.lng) && Math.abs(map.lng) <= 180 ? `${map.lat},${map.lng}` : undefined;
    const access = { en: "Access requires checking with the venue.", fr: "Accès à vérifier auprès du lieu.", it: "Accesso da verificare con la sede.", uk: "Уточніть умови доступу в закладі." }[locale];
    const visitorInfo = [place.openingHoursLabel?.[locale], ...placeVisitNotes(place,locale), place.visitorAccess && place.visitorAccess !== "public" ? access : undefined].filter(Boolean).join(" ");
    const city = placeCities[place.id];
    const minimumAge=placeMinimumAge(place);
    return href ? [{ id: place.id, title: place.name, href, ...(city ? { city } : {}), ...(point ? { point } : {}), ...(visitorInfo ? { visitorInfo } : {}), ...(minimumAge!==undefined ? {minimumAge} : {}) }] : [];
  });
}
