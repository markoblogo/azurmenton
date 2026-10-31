import type { Feature, FeatureCollection, Point, LineString } from "geojson";
import { dayRouteDetails } from "@/content/planning/day-route-details";
import { placeMapPoints, type PlaceMapPoint } from "@/content/planning/place-map-points";
import { getPlace } from "@/content/places";
import { placeSharePath } from "@/lib/place-share-target";
import type { Locale } from "@/i18n/locales";

const popupLabels = {
  en: { place: "Place details", route: "Route & access" },
  fr: { place: "Détails du lieu", route: "Parcours et accès" },
  it: { place: "Dettagli del luogo", route: "Percorso e accesso" },
  uk: { place: "Про місце", route: "Маршрут і доступ" },
};

export function compactMapNote(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (Array.from(normalized).length <= 96) return normalized;
  const prefix = Array.from(normalized).slice(0, 93).join("");
  const boundary = prefix.lastIndexOf(" ");
  return `${boundary > 0 ? prefix.slice(0, boundary) : prefix}...`;
}

// Editorial export only: no public route, provider writes or copied place database.
export function buildUmapTrial(routeId: string, locale: Locale, points: PlaceMapPoint[] = placeMapPoints) {
  if (!Object.hasOwn(dayRouteDetails, routeId)) throw new Error(`Unknown day route: ${routeId}`);
  const route = dayRouteDetails[routeId as keyof typeof dayRouteDetails];
  const routeUrl = `https://azurmenton.com/${locale}/guide/${route.guideSlugs[0]}#day-route-${routeId}`;
  const labels = popupLabels[locale];
  const features: Feature<Point>[] = route.stops.map((stop, index) => {
    const place = getPlace(stop.placeId);
    const point = points.find(item => item.placeId === stop.placeId);
    const href = placeSharePath(stop.placeId, locale);
    if (!place || !point?.review || !href) throw new Error(`Unreviewed or unresolved stop: ${stop.placeId}`);
    if (!Number.isFinite(point.lat) || !Number.isFinite(point.lng) || Math.abs(point.lat) > 90 || Math.abs(point.lng) > 180) throw new Error(`Invalid coordinates: ${stop.placeId}`);
    const review = point.review;
    return {
      type: "Feature", id: stop.placeId,
      geometry: { type: "Point", coordinates: [point.lng, point.lat] },
      properties: {
        name: `${index + 1}. ${place.name}`,
        description: `${compactMapNote(stop.note[locale])}\n\n[[https://azurmenton.com${href}|${labels.place}]]\n[[${routeUrl}|${labels.route}]]`,
        fullNote: stop.note[locale], accessNote: route.accessNote[locale],
        placeId: stop.placeId, order: index + 1, precision: review.precision,
        coordinateCheckedOn: review.checkedOn, coordinateSource: review.sourceUrl ?? review.source,
        _umap_options: { color: "#0b6f8f", iconClass: "Circle", showLabel: true, labelKey: "name" },
      },
    };
  });
  const stops: FeatureCollection<Point> = { type: "FeatureCollection", features };
  const schematic: FeatureCollection<LineString> = {
    type: "FeatureCollection", features: [{ type: "Feature", geometry: { type: "LineString", coordinates: features.map(feature => feature.geometry.coordinates) }, properties: {
      name: "Stop order ONLY - not street navigation",
      description: "Straight connectors do not follow streets, identify entrances, avoid stairs or establish accessibility. Use the original route's access notes and external navigation.",
      _umap_options: { color: "#ba6b28", dashArray: "6,8", weight: 3 },
    } }],
  };
  const preview = new URL("https://umap.openstreetmap.de/en/map/");
  // Keep audit metadata in the downloadable export, not in a long preview URL.
  const previewStops = { ...stops, features: features.map(feature => ({ ...feature, properties: { name: feature.properties!.name, description: feature.properties!.description, _umap_options: feature.properties!._umap_options } })) };
  preview.searchParams.set("data", JSON.stringify(previewStops));
  preview.searchParams.set("dataFormat", "geojson");
  const lng = features.reduce((sum, feature) => sum + feature.geometry.coordinates[0], 0) / features.length;
  const lat = features.reduce((sum, feature) => sum + feature.geometry.coordinates[1], 0) / features.length;
  preview.hash = `14/${lat.toFixed(5)}/${lng.toFixed(5)}`;
  return { routeId, locale, title: route.title[locale], stops, schematic, previewUrl: preview.toString(), originalGuideUrl: `https://azurmenton.com/${locale}/guide/${route.guideSlugs[0]}`, accessNote: route.accessNote[locale] };
}
