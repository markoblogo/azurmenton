import { places } from "@/content/places";
import type { Locale } from "@/i18n/locales";
import { placeSharePath } from "./place-share-target";
import type { PlanPlace } from "./trip-place-days";

// Public labels/targets only; private favourite IDs and dates stay in the browser.
export function tripPlaceCatalog(locale: Locale): PlanPlace[] {
  return places.flatMap(place => {
    const href = placeSharePath(place.id, locale);
    return href ? [{ id: place.id, title: place.name, href }] : [];
  });
}
