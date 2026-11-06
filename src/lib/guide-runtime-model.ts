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
    if (a.duration !== undefined && !["45 to 90 minutes", "1 hour", "1-2 hours", "half-day", "full-day", "2-3 days", "evening", "flexible", "reference"].includes(a.duration)) throw Error("Invalid guide duration");
    if (!["editorial", "needs_verification", "verified"].includes(a.sourceStatus)) throw Error("Invalid source status");
    if (!Array.isArray(a.locationTags)) throw Error("Guide locations required");
    for (const list of [a.tags, a.bestFor]) if (!Array.isArray(list) || !list.every(localized)) throw Error("Invalid guide labels");
    for (const list of [a.locationTags, a.relatedPlaces, a.relatedArticles, a.relatedApartments]) if (list !== undefined && (!Array.isArray(list) || !list.every(id))) throw Error("Invalid guide references");
    if (a.practicalTips !== undefined && (!Array.isArray(a.practicalTips) || !a.practicalTips.every(localized))) throw Error("Invalid practical tips");
    if (a.appTools !== undefined && (!Array.isArray(a.appTools) || !a.appTools.every(tool => localized(tool.useFor) && localized(tool.bestFor)))) throw Error("Invalid guide app tools");
    if (a.utilityBlocks !== undefined && !Array.isArray(a.utilityBlocks)) throw Error("Invalid utility blocks");
    if (a.bookRecommendation && ![a.bookRecommendation.coverImageAlt, a.bookRecommendation.languageNote, a.bookRecommendation.disclosure].every(localized)) throw Error("Invalid book localization");
    if (!Array.isArray(a.sections) || !a.sections.length || a.sections.length > 200) throw Error("Invalid guide sections");
    for (const section of a.sections) {
      if (!localized(section.heading) || !Array.isArray(section.body) || !section.body.every(localized)) throw Error("Invalid localized section");
      if (section.bullets !== undefined && (!Array.isArray(section.bullets) || !section.bullets.every(localized))) throw Error("Invalid section bullets");
      for (const refs of [section.relatedPlaceIds, section.relatedEventIds, section.relatedApartmentKeys]) if (refs !== undefined && (!Array.isArray(refs) || !refs.every(id))) throw Error("Invalid section references");
      if (section.disclosures !== undefined && (!Array.isArray(section.disclosures) || !section.disclosures.every(item => id(item.id) && localized(item.heading) && Array.isArray(item.body) && item.body.every(localized)))) throw Error("Invalid section disclosures");
      if (section.officialLinks !== undefined && (!Array.isArray(section.officialLinks) || !section.officialLinks.every(link => localized(link.label) && typeof link.url === "string"))) throw Error("Invalid official links");
      if (section.videoEmbeds !== undefined && (!Array.isArray(section.videoEmbeds) || !section.videoEmbeds.every(video => localized(video.title) && (!video.secondaryLinks || (Array.isArray(video.secondaryLinks) && video.secondaryLinks.every(link => localized(link.label))))))) throw Error("Invalid videos");
      if (section.artworkCards !== undefined && (!Array.isArray(section.artworkCards) || !section.artworkCards.every(art => [art.workTitle, art.rightsNote, art.locationNote].every(localized)))) throw Error("Invalid artworks");
      if (section.tables) for (const locale of locales) {
        const tables = section.tables[locale];
        if (!Array.isArray(tables) || !tables.every(table => Array.isArray(table.headers) && table.headers.length > 0 && table.headers.every(cell => typeof cell === "string") && Array.isArray(table.rows) && table.rows.every(row => Array.isArray(row) && row.length === table.headers.length && row.every(cell => typeof cell === "string")))) throw Error("Invalid localized table");
      }
    }
    if (!publication.sources?.trim() || !Array.isArray(publication.places) || !Array.isArray(publication.collections)) throw Error("Missing publication manifest");
    const placeIds = new Set<string>();
    for (const place of publication.places) {
      if (!id(place.id) || placeIds.has(place.id) || typeof place.name !== "string" || !place.name.trim() || !placeTypes.has(place.type) || !localized(place.shortNote) || !Array.isArray(place.relatedArticleIds) || !place.relatedArticleIds.every(id) || !Array.isArray(place.bestFor) || !place.bestFor.every(localized)) throw Error("Invalid place");
      placeIds.add(place.id);
      if (place.images !== undefined && (!Array.isArray(place.images) || !place.images.every(image => typeof image === "string"))) throw Error("Invalid place gallery");
    }
  }
  // No executable content, external media fetches or arbitrary local file paths.
  function inspect(value: unknown, key = "") {
    if (["image", "coverImage", "heroImage"].includes(key) && value !== undefined && typeof value !== "string") throw Error("Unsupported publication media");
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

export function replacePlacePrimaryImage(place: Place, image: string): Place {
  return { ...structuredClone(place), image, ...(place.images?.length ? { images: [image, ...place.images.slice(1)] } : {}) };
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
