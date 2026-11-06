import type { GuideArticle, LocalizedText } from "@/content/guide";
import type { Place } from "@/content/places";
import type { ContentCollection } from "@/content/content-map";

export type GuidePublication = {
  article: GuideArticle;
  places: Place[];
  collections: string[];
  sources: string;
};
export type GuideSnapshot = { version: 1; publications: GuidePublication[] };
export type GuideHead = { version: 1; revision: number; hash: string; previousHash: string | null; requestId: string };
const locales = ["en", "fr", "it", "uk"] as const;
export const validHash = (value: unknown): value is string => typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
const id = (value: unknown) => typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
const placeTypes = new Set(["market", "supermarket", "cinema", "theatre", "casino", "ice-cream", "restaurant", "bar", "wine-bar", "winery", "golf-course", "rooftop", "beach", "garden", "hospital", "healthcare", "pharmacy", "police", "civic", "tourist-office", "station", "car-rental", "fuel-station", "parking", "bike-shop", "cycle-route", "museum", "viewpoint", "walk", "mountain", "ski-resort", "port", "neighbourhood", "family-activity", "shopping-centre", "bookshop", "pool", "fitness-centre", "theme-park", "playground", "skatepark", "barbershop", "coworking", "fishing-guide", "fishing-shop", "computer-repair"]);
const localized = (value: LocalizedText) => value && locales.every(locale => typeof value[locale] === "string" && value[locale].trim());

export function validateSnapshot(snapshot: GuideSnapshot) {
  if (!snapshot || snapshot.version !== 1 || !Array.isArray(snapshot.publications) || snapshot.publications.length > 1000) throw Error("Invalid guide snapshot");
  const seen = new Set<string>();
  for (const publication of snapshot.publications) {
    const a = publication.article;
    if (!a || !id(a.slug) || a.id !== a.slug || seen.has(a.slug)) throw Error("Invalid or duplicate guide identity");
    seen.add(a.slug);
    for (const field of [a.title, a.seoTitle, a.seoDescription, a.excerpt]) if (!localized(field)) throw Error("Four guide translations required");
    if (!["food-markets", "beaches", "walks-views", "with-children", "nightlife-drinks", "photo-spots", "itineraries", "day-trips", "events", "practical"].includes(a.category)) throw Error("Invalid guide category");
    for (const list of [a.tags, a.bestFor]) if (!Array.isArray(list) || !list.every(localized)) throw Error("Invalid guide labels");
    for (const list of [a.locationTags, a.relatedPlaces, a.relatedArticles, a.relatedApartments]) if (list !== undefined && (!Array.isArray(list) || !list.every(id))) throw Error("Invalid guide references");
    if (!Array.isArray(a.sections) || !a.sections.length || a.sections.length > 200) throw Error("Invalid guide sections");
    for (const section of a.sections) {
      if (!localized(section.heading) || !Array.isArray(section.body) || !section.body.every(localized)) throw Error("Invalid localized section");
      if (section.tables) for (const locale of locales) {
        const tables = section.tables[locale];
        if (!Array.isArray(tables) || !tables.every(table => Array.isArray(table.headers) && table.headers.length > 0 && table.headers.every(cell => typeof cell === "string") && Array.isArray(table.rows) && table.rows.every(row => Array.isArray(row) && row.length === table.headers.length && row.every(cell => typeof cell === "string")))) throw Error("Invalid localized table");
      }
    }
    if (!publication.sources?.trim() || !Array.isArray(publication.places) || !Array.isArray(publication.collections)) throw Error("Missing publication manifest");
    const placeIds = new Set<string>();
    for (const place of publication.places) {
      if (!id(place.id) || placeIds.has(place.id) || !place.name || !placeTypes.has(place.type) || !localized(place.shortNote) || !Array.isArray(place.relatedArticleIds) || !Array.isArray(place.bestFor) || !place.bestFor.every(localized)) throw Error("Invalid place");
      placeIds.add(place.id);
    }
  }
  // No executable content, external media fetches or arbitrary local file paths.
  function inspect(value: unknown, key = "") {
    if (typeof value === "string") {
      if (value.length > 200_000 || /^(?:javascript|data|file):/i.test(value.trim())) throw Error("Unsafe publication string");
      if (["image", "images", "coverImage", "heroImage"].includes(key) && (!/^\/(?:images\/[\w/.-]+\.(?:png|jpe?g|webp|avif)|guide-media\/[a-f0-9]{64}\.webp)$/.test(value) || value.includes(".."))) throw Error("Unsupported publication media");
    } else if (Array.isArray(value)) value.forEach(item => inspect(item, key));
    else if (value && typeof value === "object") for (const [name, child] of Object.entries(value)) {
      if (["__proto__", "constructor", "prototype"].includes(name)) throw Error("Unsafe publication key");
      inspect(child, name);
    }
  }
  inspect(snapshot);
}

// A shared place has one effective owner in each snapshot, independent of guide order.
export function setPublicationPlace(snapshot: GuideSnapshot, slug: string, place: Place) {
  const target = snapshot.publications.find(p => p.article.slug === slug);
  if (!target) throw Error("Runtime guide not found");
  for (const publication of snapshot.publications) publication.places = publication.places.filter(p => p.id !== place.id);
  target.places.push(structuredClone(place));
}

export function mergeGuideSnapshot(baseGuides: GuideArticle[], basePlaces: Place[], baseCollections: ContentCollection[], snapshot: GuideSnapshot) {
  validateSnapshot(snapshot);
  const guides = new Map(baseGuides.map(a => [a.slug, structuredClone(a)]));
  const places = new Map(basePlaces.map(p => [p.id, structuredClone(p)]));
  const collections = structuredClone(baseCollections);
  for (const publication of snapshot.publications) {
    guides.set(publication.article.slug, structuredClone(publication.article));
    for (const place of publication.places) {
      const previous = places.get(place.id);
      places.set(place.id, { ...structuredClone(place), relatedArticleIds: [...new Set([...(previous?.relatedArticleIds ?? []), ...place.relatedArticleIds])] });
    }
    for (const collectionId of publication.collections) {
      const collection = collections.find(c => c.id === collectionId);
      if (!collection) throw Error(`Unknown collection ${collectionId}`);
      collection.includeGuideSlugs = [...new Set([...(collection.includeGuideSlugs ?? []), publication.article.slug])];
    }
  }
  for (const publication of snapshot.publications) {
    const a = guides.get(publication.article.slug)!;
    const related = new Set([...(a.relatedArticles ?? []), ...a.sections.flatMap(s => s.guideLinkSlug ? [s.guideLinkSlug] : [])]);
    for (const slug of related) {
      const other = guides.get(slug);
      if (!other || other === a) throw Error(`Invalid guide relation ${slug}`);
      other.relatedArticles = [...new Set([...(other.relatedArticles ?? []), a.slug])];
    }
    for (const placeId of new Set([...(a.relatedPlaces ?? []), ...a.sections.flatMap(s => s.relatedPlaceIds ?? [])])) {
      const place = places.get(placeId);
      if (!place) throw Error(`Unknown place ${placeId}`);
      place.relatedArticleIds = [...new Set([...place.relatedArticleIds, a.slug])];
    }
  }
  return { guideArticles: [...guides.values()], places: [...places.values()], contentCollections: collections };
}
