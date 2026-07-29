import type { GuideCategory } from "@/content/guide";
import type { GuidePublicationMapAction, GuidePublicationPlan, GuidePublicationPlanPlace } from "@/lib/guide-check";
import type { GuideIntake } from "@/lib/guide-intake";
import { classifyPlaceMatch, rankPlaceMatches, toMatchCandidates, type PlaceSeedReference } from "@/lib/guide-match";

type GuideSeedReference = {
  slug: string;
  title: string;
  category: GuideCategory;
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

function toKebabCase(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
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
  if (normalizedCandidate.startsWith(`${normalizedInput} `)) return 0.95;
  if (normalizedCandidate.includes(` ${normalizedInput} `)) return 0.9;
  if (normalizedCandidate.endsWith(` ${normalizedInput}`)) return 0.88;
  return tokenScore(input, candidate);
}

function firstSentence(value?: string) {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const match = trimmed.match(/^.+?[.!?](?:\s|$)/);
  return (match?.[0] ?? trimmed).trim();
}

function clampDescription(value: string, maxLength = 158) {
  if (value.length <= maxLength) return value;
  const sliced = value.slice(0, maxLength - 1);
  const cut = sliced.lastIndexOf(" ");
  return `${(cut > 80 ? sliced.slice(0, cut) : sliced).trim()}.`;
}

export function inferCategory(intake: GuideIntake): GuideCategory {
  const corpus = normalize([intake.title, intake.intro ?? "", ...intake.sectionHeadings].join(" "));

  if (/\b(restaurant|restaurants|food|eat|cafe|coffee|tea|bakery|pastry|dessert|pizza|burger|sushi|ramen|indian|vegan|seafood|italian|market|boulangerie|patisserie)\b/.test(corpus)) {
    return "food-markets";
  }
  if (/\b(event|festival|carnival|grand prix|e prix|masters|triathlon|rally|show|gala)\b/.test(corpus)) return "events";
  if (/\b(photo|photography|instagram|viewpoint|view point|sunset spot)\b/.test(corpus)) return "photo-spots";
  if (/\b(itinerary|one day|two day|three day|weekend plan)\b/.test(corpus)) return "itineraries";
  if (/\b(day trip|from menton|ventimiglia|sanremo|bordighera|dolceacqua|monaco|nice)\b/.test(corpus) && /\btrain|trip|escape|cross the border|worth the short trip\b/.test(corpus)) return "day-trips";
  if (/\b(kids|children|family)\b/.test(corpus)) return "with-children";
  if (/\b(beach|plage|seafront)\b/.test(corpus)) return "beaches";
  if (/\b(hike|walk|trail|view|garden|park|promenade|village|mountain)\b/.test(corpus)) return "walks-views";
  if (/\b(bar|beer|wine|cocktail|nightlife|shisha|hookah|jazz|live music|club|casino)\b/.test(corpus)) return "nightlife-drinks";
  return "practical";
}

function inferSeoTitle(intake: GuideIntake) {
  return intake.seoTitle?.trim() || intake.title.trim();
}

function inferMetaDescription(intake: GuideIntake) {
  if (intake.metaDescription?.trim()) return intake.metaDescription.trim();
  const sentence = firstSentence(intake.intro);
  if (sentence) return clampDescription(sentence);
  return clampDescription(`${intake.title}. Practical Azur Menton guide.`);
}

function inferLocalitySuffix(name: string, section?: string, guideTitle?: string) {
  const haystack = normalize(`${name} ${section ?? ""} ${guideTitle ?? ""}`);
  const known = [
    "menton",
    "monaco",
    "nice",
    "sanremo",
    "ventimiglia",
    "bordighera",
    "beausoleil",
    "dolceacqua",
    "eze",
    "roquebrune",
  ];

  for (const locality of known) {
    if (haystack.includes(locality)) return locality;
  }

  if (/\bin menton\b/.test(haystack)) return "menton";
  return "menton";
}

function buildNewPlaceId(name: string, section: string | undefined, guideTitle: string, existingIds: Set<string>) {
  const base = toKebabCase(name.replace(/\(([^)]+)\)/g, " $1 "));
  const locality = inferLocalitySuffix(name, section, guideTitle);
  const withLocality = base.includes(locality) ? base : `${base}-${locality}`;

  if (!existingIds.has(withLocality)) return withLocality;

  let index = 2;
  while (existingIds.has(`${withLocality}-${index}`)) index += 1;
  return `${withLocality}-${index}`;
}

function inferMapAction(existingPlace: PlaceSeedReference | undefined, pointIds: Set<string>, exclusionIds: Set<string>, draftName: string): GuidePublicationMapAction {
  if (existingPlace) {
    if (pointIds.has(existingPlace.id)) return "point";
    if (exclusionIds.has(existingPlace.id)) return "exclude";
    if (existingPlace.requiresMapReview === false) return "not_needed";
    return "point";
  }

  if (/\b(area|district|zone|strip)\b/i.test(draftName)) return "exclude";
  return "point";
}

function rankGuidesByTitle(title: string, guides: GuideSeedReference[], category: GuideCategory, limit: number) {
  return guides
    .filter((guide) => guide.category === category)
    .map((guide) => ({ slug: guide.slug, score: phraseScore(title, guide.title) }))
    .filter((guide) => guide.score >= 0.45)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((guide) => guide.slug);
}

export function seedGuideIntake(intake: GuideIntake): GuideIntake {
  return {
    ...intake,
    seoTitle: inferSeoTitle(intake),
    metaDescription: inferMetaDescription(intake),
    categoryHint: intake.categoryHint ?? inferCategory(intake),
  };
}

export function buildSeededPublicationPlan(input: {
  intake: GuideIntake;
  todayIso: string;
  guides: GuideSeedReference[];
  places: PlaceSeedReference[];
  mapPointPlaceIds: string[];
  mapExclusionPlaceIds: string[];
}) : GuidePublicationPlan {
  const { intake } = input;
  const category = (intake.categoryHint as GuideCategory | undefined) ?? inferCategory(intake);
  const pointIds = new Set(input.mapPointPlaceIds);
  const exclusionIds = new Set(input.mapExclusionPlaceIds);
  const existingIds = new Set(input.places.map((place) => place.id));
  const relatedPlaceIds: string[] = [];
  const relatedArticleVotes = new Map<string, number>();

  const plannedPlaces: GuidePublicationPlanPlace[] = intake.placeCandidates.map((candidate) => {
    const rankedPlaces = rankPlaceMatches(candidate, input.places, intake.title);
    const top = rankedPlaces[0];
    const matchStatus = classifyPlaceMatch(rankedPlaces);
    const topMatches = toMatchCandidates(rankedPlaces);

    if (matchStatus === "existing_place" && top) {
      relatedPlaceIds.push(top.place.id);
      for (const slug of top.place.relatedArticleIds ?? []) {
        relatedArticleVotes.set(slug, (relatedArticleVotes.get(slug) ?? 0) + 2);
      }

      return {
        draftName: candidate.name,
        existingPlaceId: top.place.id,
        newPlaceId: null,
        suggestedExistingPlaceId: top.place.id,
        matchStatus,
        matchReason: top.reason,
        topMatches,
        imageStatus: top.place.image ? "existing" : "pending",
        assetPath: null,
        assetFileName: null,
        requiresMapReview: top.place.requiresMapReview ?? true,
        mapAction: inferMapAction(top.place, pointIds, exclusionIds, candidate.name),
        coverageGuideSlug: null,
      };
    }

    if (matchStatus === "ambiguous_match" && top) {
      return {
        draftName: candidate.name,
        existingPlaceId: null,
        newPlaceId: null,
        suggestedExistingPlaceId: top.place.id,
        matchStatus,
        matchReason: top.reason,
        topMatches,
        imageStatus: "pending",
        assetPath: null,
        assetFileName: null,
        requiresMapReview: top.place.requiresMapReview ?? true,
        mapAction: inferMapAction(top.place, pointIds, exclusionIds, candidate.name),
        coverageGuideSlug: null,
      };
    }

    return {
      draftName: candidate.name,
      existingPlaceId: null,
      newPlaceId: buildNewPlaceId(candidate.name, candidate.section, intake.title, existingIds),
      suggestedExistingPlaceId: null,
      matchStatus,
      matchReason: top?.reason ?? "no-confident-match",
      topMatches,
      imageStatus: "pending",
      assetPath: null,
      assetFileName: null,
      requiresMapReview: true,
      mapAction: inferMapAction(undefined, pointIds, exclusionIds, candidate.name),
      coverageGuideSlug: null,
    };
  });

  for (const slug of rankGuidesByTitle(intake.title, input.guides, category, 4)) {
    relatedArticleVotes.set(slug, (relatedArticleVotes.get(slug) ?? 0) + 1);
  }

  if (category === "food-markets" && input.guides.some((guide) => guide.slug === "local-food-menton")) {
    relatedArticleVotes.set("local-food-menton", (relatedArticleVotes.get("local-food-menton") ?? 0) + 1);
  }

  const relatedArticleSlugs = [...relatedArticleVotes.entries()]
    .filter(([slug]) => slug !== intake.slug)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 6)
    .map(([slug]) => slug);

  return {
    slug: intake.slug,
    publishedOn: input.todayIso,
    category,
    coverImageStatus: intake.coverPathHint ? "provided" : "pending",
    assetsDirectory: null,
    coverAssetPath: intake.coverPathHint ?? null,
    coverAssetFileName: intake.coverPathHint ? intake.coverPathHint.split("/").at(-1) ?? null : null,
    relatedPlaceIds: [...new Set(relatedPlaceIds)],
    relatedArticleSlugs,
    relatedApartmentSlugs: [],
    canonicalGuideForPlaces: false,
    plannedPlaces,
  };
}
