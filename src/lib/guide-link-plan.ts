import type { Apartment } from "@/content/apartments";
import type { ContentCollection, ContentCollectionId } from "@/content/content-map";
import { resolveContentCollectionGuideSlugs } from "@/content/content-map";
import type { GuideCategory } from "@/content/guide";
import type { GuideIntentCluster } from "@/content/guide-intents";
import type { GuidePublicationPlan, PlaceReference } from "@/lib/guide-check";
import type { GuideIntake } from "@/lib/guide-intake";

type GuideSeedReference = {
  slug: string;
  title: string;
  category: GuideCategory;
};

export type GuideLinkPlanPriority = "required" | "recommended" | "noise-risk";
export type GuideLinkPlanSource =
  | "intake"
  | "matched-place"
  | "content-collection"
  | "intent-cluster"
  | "category-fallback"
  | "title-similarity";

export type GuideLinkPlanArticleSuggestion = {
  slug: string;
  priority: GuideLinkPlanPriority;
  source: GuideLinkPlanSource;
  reason: string;
  score?: number;
};

export type GuideLinkPlanApartmentSuggestion = {
  slug: string;
  priority: GuideLinkPlanPriority;
  source: GuideLinkPlanSource;
  reason: string;
};

export type GuideLinkPlanBacklinkSuggestion = {
  draftName: string;
  existingPlaceId?: string | null;
  newPlaceId?: string | null;
  priority: GuideLinkPlanPriority;
  action: "add-related-article" | "already-linked" | "defer-until-place-created" | "skip";
  reason: string;
};

export type GuideLinkPlanCoverageSuggestion = {
  draftName: string;
  existingPlaceId?: string | null;
  newPlaceId?: string | null;
  priority: GuideLinkPlanPriority;
  action: "set-coverage-guide" | "already-covered" | "defer-until-place-created" | "skip";
  coverageGuideSlug: string;
  reason: string;
};

export type GuideLinkPlan = {
  matchedClusterIds: string[];
  matchedCollectionIds: ContentCollectionId[];
  relatedArticles: GuideLinkPlanArticleSuggestion[];
  relatedApartments: GuideLinkPlanApartmentSuggestion[];
  backlinkObligations: GuideLinkPlanBacklinkSuggestion[];
  specialistCoverageUpdates: GuideLinkPlanCoverageSuggestion[];
  autoAppliedRelatedArticles: string[];
  autoAppliedRelatedApartments: string[];
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokenize(value: string) {
  return normalize(value).split(/\s+/).filter(Boolean);
}

function tokenScore(input: string, candidate: string) {
  const inputTokens = new Set(tokenize(input));
  const candidateTokens = new Set(tokenize(candidate));
  if (!inputTokens.size || !candidateTokens.size) return 0;

  let overlap = 0;
  for (const token of inputTokens) {
    if (candidateTokens.has(token)) overlap += 1;
  }

  return overlap / Math.max(inputTokens.size, candidateTokens.size);
}

function phraseScore(input: string, candidate: string) {
  const normalizedInput = normalize(input);
  const normalizedCandidate = normalize(candidate);
  if (!normalizedInput || !normalizedCandidate) return 0;
  if (normalizedInput === normalizedCandidate) return 1;
  if (normalizedCandidate.includes(normalizedInput)) return 0.92;
  return tokenScore(input, candidate);
}

function includesAny(haystack: string, terms: string[]) {
  return terms.some((term) => haystack.includes(term));
}

function dedupeByKey<T>(items: T[], key: (item: T) => string) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const id = key(item);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

function guideRequiresApartmentCta(category: GuideCategory | "" | null | undefined, slug: string) {
  if (category === "practical" || category === "beaches" || category === "with-children" || category === "day-trips") {
    return true;
  }

  return ["where-to-stay", "without-a-car", "stay-cool", "airport", "public-transport", "beaches"].some((token) => slug.includes(token));
}

function detectClusterIds(intake: GuideIntake, category: GuideCategory | "" | null | undefined, clusters: GuideIntentCluster[]) {
  const corpus = normalize([intake.slug, intake.title, intake.intro ?? "", ...intake.sectionHeadings].join(" "));
  const matched = new Set<string>();

  for (const cluster of clusters) {
    if (cluster.canonicalGuideSlug === intake.slug || cluster.supportingGuideSlugs.includes(intake.slug)) {
      matched.add(cluster.id);
      continue;
    }

    switch (cluster.id) {
      case "menton-with-kids":
        if (category === "with-children" || includesAny(corpus, ["kids", "kid", "children", "child", "family"])) matched.add(cluster.id);
        break;
      case "menton-without-car":
        if (includesAny(corpus, ["without a car", "sans voiture", "senza auto", "car free", "public transport", "train", "airport", "station"])) matched.add(cluster.id);
        break;
      case "beachfront-stay":
        if (category === "beaches" || includesAny(corpus, ["beach", "seafront", "sea view", "sea-view", "beachfront", "plage"])) matched.add(cluster.id);
        break;
      case "day-trips":
        if (category === "day-trips" || includesAny(corpus, ["day trip", "day-trip", "from menton", "monaco", "nice", "sanremo", "ventimiglia", "italian riviera"])) matched.add(cluster.id);
        break;
      case "winter-autumn":
        if (includesAny(corpus, ["winter", "autumn", "fall", "lemon festival", "fete du citron", "carnival", "christmas"])) matched.add(cluster.id);
        break;
      case "summer-heat":
        if (includesAny(corpus, ["summer", "heat", "cool", "shade", "air conditioning", "air-conditioned"])) matched.add(cluster.id);
        break;
      case "practical-stay":
        if (category === "practical" || includesAny(corpus, ["practical", "supermarket", "apps", "websites", "airport", "transport", "parking", "arrival"])) matched.add(cluster.id);
        break;
    }
  }

  return [...matched];
}

function detectCollectionIds(
  intake: GuideIntake,
  category: GuideCategory | "" | null | undefined,
  guides: GuideSeedReference[],
  collections: ContentCollection[],
) {
  const matched = new Set<ContentCollectionId>();
  for (const collection of collections) {
    const collectionGuideSlugs = resolveContentCollectionGuideSlugs(collection, guides);
    if (collectionGuideSlugs.includes(intake.slug) || (category && collection.categories.includes(category))) {
      matched.add(collection.id);
    }
  }

  if (matched.size) return [...matched];

  const corpus = normalize([intake.slug, intake.title, intake.intro ?? "", ...intake.sectionHeadings].join(" "));
  if (includesAny(corpus, ["restaurant", "restaurants", "food", "coffee", "tea", "bakery", "pizza", "burger", "sushi", "ramen"])) matched.add("food-and-markets");
  if (includesAny(corpus, ["bar", "nightlife", "casino", "jazz", "cinema", "theatre", "opera"])) matched.add("evening-plans");
  if (includesAny(corpus, ["walk", "view", "hike", "old town", "old-town", "photo"])) matched.add("walks-and-views");
  if (includesAny(corpus, ["airport", "transport", "without a car", "parking", "station"])) matched.add("practical-stay");
  if (includesAny(corpus, ["day trip", "monaco", "nice", "sanremo", "ventimiglia"])) matched.add("riviera-day-trips");

  return [...matched];
}

function buildArticleSuggestions(input: {
  intake: GuideIntake;
  category: GuideCategory | "" | null | undefined;
  guides: GuideSeedReference[];
  places: PlaceReference[];
  publicationPlan: GuidePublicationPlan;
  matchedCollectionIds: ContentCollectionId[];
  matchedClusterIds: string[];
  collections: ContentCollection[];
  clusters: GuideIntentCluster[];
}) {
  const suggestions = new Map<string, GuideLinkPlanArticleSuggestion>();
  const guideBySlug = new Map(input.guides.map((guide) => [guide.slug, guide]));
  const placeById = new Map(input.places.map((place) => [place.id, place]));

  const push = (entry: GuideLinkPlanArticleSuggestion) => {
    if (entry.slug === input.intake.slug || !guideBySlug.has(entry.slug)) return;
    const existing = suggestions.get(entry.slug);
    const priorityRank = { required: 3, recommended: 2, "noise-risk": 1 } as const;
    if (!existing || priorityRank[entry.priority] > priorityRank[existing.priority]) {
      suggestions.set(entry.slug, entry);
      return;
    }
    if (existing && priorityRank[entry.priority] === priorityRank[existing.priority] && (entry.score ?? 0) > (existing.score ?? 0)) {
      suggestions.set(entry.slug, entry);
    }
  };

  for (const relatedTitle of input.intake.relatedGuideTitles ?? []) {
    const ranked = input.guides
      .filter((guide) => guide.slug !== input.intake.slug)
      .map((guide) => ({ guide, score: phraseScore(relatedTitle, guide.title) }))
      .filter((entry) => entry.score >= 0.45)
      .sort((a, b) => b.score - a.score)
      .slice(0, 2);

    for (const entry of ranked) {
      push({
        slug: entry.guide.slug,
        priority: entry.score >= 0.82 ? "required" : "recommended",
        source: "intake",
        reason: `Matched explicit related guide hint "${relatedTitle}".`,
        score: entry.score,
      });
    }
  }

  for (const placeId of input.publicationPlan.relatedPlaceIds ?? []) {
    const place = placeById.get(placeId);
    for (const slug of place?.relatedArticleIds ?? []) {
      push({
        slug,
        priority: "required",
        source: "matched-place",
        reason: `${place?.name ?? placeId} already links to this guide and should stay connected.`,
      });
    }
  }

  for (const plannedPlace of input.publicationPlan.plannedPlaces ?? []) {
    if (!plannedPlace.existingPlaceId) continue;
    const place = placeById.get(plannedPlace.existingPlaceId);
    for (const slug of place?.relatedArticleIds ?? []) {
      push({
        slug,
        priority: "required",
        source: "matched-place",
        reason: `${place?.name ?? plannedPlace.existingPlaceId} already links to this guide family.`,
      });
    }
  }

  for (const collectionId of input.matchedCollectionIds) {
    const collection = input.collections.find((entry) => entry.id === collectionId);
    if (!collection) continue;
    for (const slug of resolveContentCollectionGuideSlugs(collection, input.guides).slice(0, 8)) {
      push({
        slug,
        priority: "recommended",
        source: "content-collection",
        reason: `${collection.id} is a matching collection for this guide.`,
      });
    }
  }

  for (const clusterId of input.matchedClusterIds) {
    const cluster = input.clusters.find((entry) => entry.id === clusterId);
    if (!cluster) continue;
    push({
      slug: cluster.canonicalGuideSlug,
      priority: guideRequiresApartmentCta(input.category, input.intake.slug) ? "required" : "recommended",
      source: "intent-cluster",
      reason: `${cluster.id} is the closest search-intent cluster for this guide.`,
    });
    for (const slug of cluster.supportingGuideSlugs.slice(0, 6)) {
      push({
        slug,
        priority: "recommended",
        source: "intent-cluster",
        reason: `${cluster.id} supporting guide.`,
      });
    }
  }

  const titleSimilarity = input.guides
    .filter((guide) => guide.slug !== input.intake.slug)
    .map((guide) => ({ guide, score: phraseScore(input.intake.title, guide.title) }))
    .filter((entry) => entry.score >= 0.36)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  for (const entry of titleSimilarity) {
    push({
      slug: entry.guide.slug,
      priority: entry.score >= 0.6 ? "recommended" : "noise-risk",
      source: "title-similarity",
      reason: "Title similarity suggests a possible editorial connection.",
      score: entry.score,
    });
  }

  return [...suggestions.values()].sort((a, b) => {
    const priorityRank = { required: 3, recommended: 2, "noise-risk": 1 } as const;
    return priorityRank[b.priority] - priorityRank[a.priority] || (b.score ?? 0) - (a.score ?? 0) || a.slug.localeCompare(b.slug);
  });
}

function buildApartmentSuggestions(input: {
  intake: GuideIntake;
  category: GuideCategory | "" | null | undefined;
  apartments: Apartment[];
  matchedClusterIds: string[];
  clusters: GuideIntentCluster[];
}) {
  const suggestions = new Map<string, GuideLinkPlanApartmentSuggestion>();
  const apartmentSlugSet = new Set(input.apartments.map((apartment) => apartment.slug));
  const push = (entry: GuideLinkPlanApartmentSuggestion) => {
    if (!apartmentSlugSet.has(entry.slug)) return;
    const existing = suggestions.get(entry.slug);
    const priorityRank = { required: 3, recommended: 2, "noise-risk": 1 } as const;
    if (!existing || priorityRank[entry.priority] > priorityRank[existing.priority]) {
      suggestions.set(entry.slug, entry);
    }
  };

  for (const clusterId of input.matchedClusterIds) {
    const cluster = input.clusters.find((entry) => entry.id === clusterId);
    if (!cluster) continue;
    for (const slug of cluster.relatedApartmentKeys) {
      push({
        slug,
        priority: guideRequiresApartmentCta(input.category, input.intake.slug) ? "required" : "recommended",
        source: "intent-cluster",
        reason: `${cluster.id} defines the most relevant apartment set.`,
      });
    }
  }

  if (!suggestions.size && guideRequiresApartmentCta(input.category, input.intake.slug)) {
    for (const apartment of input.apartments) {
      push({
        slug: apartment.slug,
        priority: "required",
        source: "category-fallback",
        reason: "This guide pattern needs an apartment CTA even before a tighter intent match is chosen.",
      });
    }
  }

  return [...suggestions.values()].sort((a, b) => {
    const priorityRank = { required: 3, recommended: 2, "noise-risk": 1 } as const;
    return priorityRank[b.priority] - priorityRank[a.priority] || a.slug.localeCompare(b.slug);
  });
}

function buildBacklinkSuggestions(input: {
  intake: GuideIntake;
  publicationPlan: GuidePublicationPlan;
  places: PlaceReference[];
}) {
  const placeById = new Map(input.places.map((place) => [place.id, place]));
  const canonical = input.publicationPlan.canonicalGuideForPlaces === true;

  return (input.publicationPlan.plannedPlaces ?? []).map((plannedPlace) => {
    if (!plannedPlace.existingPlaceId) {
      return {
        draftName: plannedPlace.draftName,
        existingPlaceId: null,
        newPlaceId: plannedPlace.newPlaceId ?? null,
        priority: canonical ? "required" : "recommended",
        action: "defer-until-place-created",
        reason: canonical
          ? "Canonical place guide: add the backlink when the new place object is created."
          : "Rendered place card should get a backlink once the new place object exists.",
      } satisfies GuideLinkPlanBacklinkSuggestion;
    }

    const place = placeById.get(plannedPlace.existingPlaceId);
    const alreadyLinked = place?.relatedArticleIds?.includes(input.intake.slug) ?? false;
    return {
      draftName: plannedPlace.draftName,
      existingPlaceId: plannedPlace.existingPlaceId,
      newPlaceId: null,
      priority: canonical ? "required" : "recommended",
      action: alreadyLinked ? "already-linked" : "add-related-article",
      reason: alreadyLinked
        ? `${place?.name ?? plannedPlace.existingPlaceId} already links back to this guide.`
        : canonical
          ? `${place?.name ?? plannedPlace.existingPlaceId} should link back because this is the canonical specialist guide.`
          : `${place?.name ?? plannedPlace.existingPlaceId} is rendered in this guide and should usually link back.`,
    } satisfies GuideLinkPlanBacklinkSuggestion;
  });
}

function buildCoverageSuggestions(input: {
  intake: GuideIntake;
  publicationPlan: GuidePublicationPlan;
}) {
  if (!input.publicationPlan.canonicalGuideForPlaces) return [] as GuideLinkPlanCoverageSuggestion[];

  return (input.publicationPlan.plannedPlaces ?? []).map((plannedPlace) => {
    const alreadyCovered = plannedPlace.coverageGuideSlug === input.intake.slug;
    return {
      draftName: plannedPlace.draftName,
      existingPlaceId: plannedPlace.existingPlaceId ?? null,
      newPlaceId: plannedPlace.newPlaceId ?? null,
      priority: "required",
      action: alreadyCovered ? "already-covered" : plannedPlace.existingPlaceId ? "set-coverage-guide" : "defer-until-place-created",
      coverageGuideSlug: input.intake.slug,
      reason: alreadyCovered
        ? "coverageGuideSlug already points to this specialist guide."
        : "Canonical specialist guides should stay attached to their covered places.",
    } satisfies GuideLinkPlanCoverageSuggestion;
  });
}

export function buildGuideLinkPlan(input: {
  intake: GuideIntake;
  publicationPlan: GuidePublicationPlan;
  guides: GuideSeedReference[];
  places: PlaceReference[];
  apartments: Apartment[];
  collections: ContentCollection[];
  clusters: GuideIntentCluster[];
}): GuideLinkPlan {
  const category = input.publicationPlan.category ?? null;
  const apartmentCtaRequired = guideRequiresApartmentCta(category, input.intake.slug);
  const matchedClusterIds = detectClusterIds(input.intake, category, input.clusters);
  const matchedCollectionIds = detectCollectionIds(input.intake, category, input.guides, input.collections);
  const relatedArticles = buildArticleSuggestions({
    intake: input.intake,
    category,
    guides: input.guides,
    places: input.places,
    publicationPlan: input.publicationPlan,
    matchedCollectionIds,
    matchedClusterIds,
    collections: input.collections,
    clusters: input.clusters,
  });
  const relatedApartments = buildApartmentSuggestions({
    intake: input.intake,
    category,
    apartments: input.apartments,
    matchedClusterIds,
    clusters: input.clusters,
  });
  const backlinkObligations = buildBacklinkSuggestions({
    intake: input.intake,
    publicationPlan: input.publicationPlan,
    places: input.places,
  });
  const specialistCoverageUpdates = buildCoverageSuggestions({
    intake: input.intake,
    publicationPlan: input.publicationPlan,
  });

  return {
    matchedClusterIds,
    matchedCollectionIds,
    relatedArticles,
    relatedApartments,
    backlinkObligations,
    specialistCoverageUpdates,
    autoAppliedRelatedArticles: dedupeByKey(
      relatedArticles.filter((entry) => entry.priority === "required" || (entry.priority === "recommended" && entry.source !== "title-similarity")).slice(0, 6),
      (entry) => entry.slug,
    ).map((entry) => entry.slug),
    autoAppliedRelatedApartments: apartmentCtaRequired
      ? dedupeByKey(
          relatedApartments.filter((entry) => entry.priority === "required" || entry.source === "intent-cluster" || entry.source === "category-fallback").slice(0, 3),
          (entry) => entry.slug,
        ).map((entry) => entry.slug)
      : [],
  };
}

export function applyGuideLinkPlan(publicationPlan: GuidePublicationPlan, linkPlan: GuideLinkPlan): GuidePublicationPlan {
  const plannedPlaces = (publicationPlan.plannedPlaces ?? []).map((plannedPlace) => {
    if (!publicationPlan.canonicalGuideForPlaces) return plannedPlace;
    if (plannedPlace.coverageGuideSlug) return plannedPlace;
    return {
      ...plannedPlace,
      coverageGuideSlug: publicationPlan.slug ?? null,
    };
  });

  return {
    ...publicationPlan,
    plannedPlaces,
    relatedArticleSlugs:
      publicationPlan.relatedArticleSlugs && publicationPlan.relatedArticleSlugs.length
        ? publicationPlan.relatedArticleSlugs
        : linkPlan.autoAppliedRelatedArticles,
    relatedApartmentSlugs:
      publicationPlan.relatedApartmentSlugs && publicationPlan.relatedApartmentSlugs.length
        ? publicationPlan.relatedApartmentSlugs
        : linkPlan.autoAppliedRelatedApartments,
    linkPlan,
  };
}
