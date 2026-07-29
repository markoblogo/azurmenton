import type { GuideCategory } from "@/content/guide";
import type { PlaceType } from "@/content/places";
import type { GuidePublicationPlan, GuidePublicationPlanPlace } from "@/lib/guide-check";
import type { GuideIntake, GuidePlaceCandidate } from "@/lib/guide-intake";
import type { GuideStructure } from "@/lib/guide-structure";

export type GuideApplyGuideReference = {
  slug: string;
  title: string;
};

export type GuideApplyPlaceReference = {
  id: string;
  name: string;
  type?: string;
  image?: string;
  requiresMapReview?: boolean;
  relatedArticleIds?: string[];
  guideCoverageSlugs?: string[];
};

export type GuideApplyAssetMap = {
  coverImage?: string;
  placeImages?: Record<string, string>;
};

export type GuideApplyArtifacts = {
  guideArticleSnippet: string;
  placesRawSnippet: string;
  placeVisualsSnippet: string;
  integrationChecklist: string;
  summary: {
    slug: string;
    ready: boolean;
    newPlaceIds: string[];
    existingPlaceIds: string[];
    relatedArticleSlugs: string[];
    relatedApartmentSlugs: string[];
  };
};

const localeTodo = {
  fr: "TODO FR",
  it: "TODO IT",
  uk: "TODO UK",
};

function quote(value: string) {
  return JSON.stringify(value);
}

function arr(values: string[], indent = 4) {
  const pad = " ".repeat(indent);
  if (!values.length) return "[]";
  return `[\n${values.map((value) => `${pad}${quote(value)}`).join(",\n")}\n${" ".repeat(Math.max(0, indent - 2))}]`;
}

function localizedText(en: string, fr = localeTodo.fr, it = localeTodo.it, uk = localeTodo.uk) {
  return `t(${quote(en)}, ${quote(fr)}, ${quote(it)}, ${quote(uk)})`;
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function candidateByDraftName(candidates: GuidePlaceCandidate[], draftName: string) {
  const target = normalize(draftName);
  return candidates.find((candidate) => normalize(candidate.name) === target);
}

function inferPlaceType(category: GuideCategory | "" | null | undefined): PlaceType {
  switch (category) {
    case "beaches":
      return "beach";
    case "nightlife-drinks":
      return "bar";
    case "photo-spots":
      return "viewpoint";
    case "walks-views":
    case "itineraries":
      return "walk";
    case "with-children":
      return "family-activity";
    case "day-trips":
      return "museum";
    case "practical":
      return "civic";
    case "events":
      return "theatre";
    case "food-markets":
    default:
      return "restaurant";
  }
}

function inferApartmentPreset(apartmentSlugs: string[]) {
  if (!apartmentSlugs.length) return "[]";
  const all = ["sea-view-balcony-studio", "beachside-family-apartment", "panoramic-sea-view-studio"];
  const seaView = ["sea-view-balcony-studio", "panoramic-sea-view-studio"];

  if (apartmentSlugs.length === all.length && all.every((slug) => apartmentSlugs.includes(slug))) return "allApartments";
  if (apartmentSlugs.length === seaView.length && seaView.every((slug) => apartmentSlugs.includes(slug))) return "seaViewApartments";
  return arr(apartmentSlugs, 6);
}

function unique<T>(values: T[]) {
  return [...new Set(values)];
}

function firstSentence(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  const match = trimmed.match(/^.+?[.!?](?:\s|$)/);
  return (match?.[0] ?? trimmed).trim();
}

function placeIdForPlan(place: GuidePublicationPlanPlace) {
  return place.existingPlaceId ?? place.newPlaceId ?? null;
}

function buildGuideSections(intake: GuideIntake, publicationPlan: GuidePublicationPlan, structure?: GuideStructure | null) {
  const placeBySection = new Map<string, string[]>();

  for (const plannedPlace of publicationPlan.plannedPlaces ?? []) {
    const placeId = placeIdForPlan(plannedPlace);
    if (!placeId) continue;
    const candidate = candidateByDraftName(intake.placeCandidates, plannedPlace.draftName);
    if (!candidate?.section) continue;
    const existing = placeBySection.get(candidate.section) ?? [];
    existing.push(placeId);
    placeBySection.set(candidate.section, existing);
  }

  const structureByHeading = new Map((structure?.sections ?? []).map((section) => [section.heading, section]));

  return intake.sectionHeadings.map((heading) => {
    const relatedPlaceIds = unique(placeBySection.get(heading) ?? []);
    const structuredSection = structureByHeading.get(heading);
    const derivedBody = structuredSection
      ? [
          ...structuredSection.bodyParagraphs,
          ...structuredSection.placeCards
            .map((card) => {
              const summary = card.bodyParagraphs[0] ? firstSentence(card.bodyParagraphs[0]) : "";
              return summary ? `${card.draftName}: ${summary}` : card.draftName;
            }),
        ]
      : [];
    const bodyBlock = derivedBody.length
      ? derivedBody.map((paragraph) => `          ${localizedText(paragraph)}`).join(",\n")
      : `          ${localizedText("TODO: add localized section body from the draft.")}`;
    const relatedPlaceBlock = relatedPlaceIds.length ? `,\n        relatedPlaceIds: ${arr(relatedPlaceIds, 10)}` : "";
    return `      {
        heading: ${localizedText(heading)},
        body: [
${bodyBlock}
        ]${relatedPlaceBlock}
      }`;
  });
}

function buildGuideArticleSnippet(
  intake: GuideIntake,
  publicationPlan: GuidePublicationPlan,
  assets: GuideApplyAssetMap,
  places: GuideApplyPlaceReference[],
  structure?: GuideStructure | null,
) {
  const placeIds = unique([
    ...(publicationPlan.relatedPlaceIds ?? []),
    ...((publicationPlan.plannedPlaces ?? []).map((plannedPlace) => placeIdForPlan(plannedPlace)).filter(Boolean) as string[]),
  ]);
  const apartmentExpr = inferApartmentPreset(publicationPlan.relatedApartmentSlugs ?? []);
  const sectionBlocks = buildGuideSections(intake, publicationPlan, structure).join(",\n");
  const coverBlock = assets.coverImage
    ? `    coverImage: ${quote(assets.coverImage)},
    coverImageAlt: ${localizedText(`Illustration for ${intake.title}`)},
    visualTheme: "food",
    visualStatus: "project_illustration",`
    : `    visualStatus: "editorial_placeholder",`;
  const canonicalTypes = unique(
    (publicationPlan.plannedPlaces ?? [])
      .map((plannedPlace) => plannedPlace.existingPlaceId)
      .filter(Boolean)
      .map((placeId) => places.find((place) => place.id === placeId)?.type)
      .filter(Boolean) as string[],
  );
  const canonicalBlock =
    publicationPlan.canonicalGuideForPlaces && canonicalTypes.length
      ? `\n    canonicalPlaceTypes: ${arr(canonicalTypes, 6)},`
      : publicationPlan.canonicalGuideForPlaces
        ? `\n    // TODO: set canonicalPlaceTypes once every planned place type is confirmed,`
        : "";

  return `shortArticle({
    id: ${quote(intake.slug)},
    slug: ${quote(intake.slug)},
    title: ${localizedText(intake.title)},
    seoTitle: ${localizedText(intake.seoTitle ?? `TODO SEO title for ${intake.title}`)},
    seoDescription: ${localizedText(intake.metaDescription ?? `TODO SEO description for ${intake.title}`)},
    excerpt: ${localizedText(intake.intro ?? `TODO excerpt for ${intake.title}`)},
    category: ${quote(publicationPlan.category ?? "food-markets")},
    tags: [
      ${localizedText("TODO primary tag")},
      ${localizedText("TODO secondary tag")}
    ],
    bestFor: [
      guideBestForOptions[0].label,
      guideBestForOptions[3].label
    ],
    duration: "1-2 hours",
    locationTags: ["menton-centre"],${coverBlock}
    publishedOn: ${quote(publicationPlan.publishedOn ?? "TODO")},
    sourceStatus: "needs_verification",
    relatedPlaces: ${arr(placeIds, 6)},${canonicalBlock}
    relatedArticles: ${arr(publicationPlan.relatedArticleSlugs ?? [], 6)},
    relatedApartments: ${apartmentExpr},
    sections: [
${sectionBlocks}
    ],
    practicalTips: [
      ${localizedText("TODO: add one to three practical tips from the draft.")}
    ],
  })`;
}

function buildPlaceRawSnippet(intake: GuideIntake, publicationPlan: GuidePublicationPlan, places: GuideApplyPlaceReference[]) {
  const blocks = (publicationPlan.plannedPlaces ?? [])
    .filter((plannedPlace) => plannedPlace.newPlaceId)
    .map((plannedPlace) => {
      const placeId = plannedPlace.newPlaceId as string;
      const candidate = candidateByDraftName(intake.placeCandidates, plannedPlace.draftName);
      const relatedGuides = unique([intake.slug]);
      const guideCoverageBlock =
        publicationPlan.canonicalGuideForPlaces || plannedPlace.coverageGuideSlug
          ? `,\n    guideCoverageSlugs: ${arr(unique([plannedPlace.coverageGuideSlug ?? intake.slug]), 6)}`
          : "";
      const requiresMapReview = plannedPlace.requiresMapReview ? "true" : "false";
      return `  {
    id: ${quote(placeId)},
    name: ${quote(plannedPlace.draftName)},
    type: ${quote(inferPlaceType(publicationPlan.category))}, // TODO adjust place type if needed
    sourceStatus: "needs_verification",
    shortNote: ${localizedText(`TODO short note for ${plannedPlace.draftName}`)},
    bestFor: [
      ${localizedText("TODO best-for label")}
    ],
    relatedArticleIds: ${arr(relatedGuides, 6)}${guideCoverageBlock},
    requiresMapReview: ${requiresMapReview},
  }${candidate?.section ? ` // section: ${candidate.section}` : ""}`;
    });

  if (!blocks.length) {
    return `// No new place objects are required for ${intake.slug}. Existing place ids from publication-plan.json:\n// ${unique((publicationPlan.plannedPlaces ?? []).map((plannedPlace) => plannedPlace.existingPlaceId).filter(Boolean) as string[]).join(", ") || "none"}`;
  }

  const existingPlaceNotes = (publicationPlan.plannedPlaces ?? [])
    .filter((plannedPlace) => plannedPlace.existingPlaceId)
    .map((plannedPlace) => {
      const place = places.find((candidate) => candidate.id === plannedPlace.existingPlaceId);
      return `// existing place ${plannedPlace.existingPlaceId}: add ${intake.slug} to relatedArticleIds${publicationPlan.canonicalGuideForPlaces || plannedPlace.coverageGuideSlug ? " and guideCoverageSlugs" : ""}${place?.image ? "" : " (image still missing or intentionally empty)"}`;
    });

  return `${blocks.join(",\n")}\n${existingPlaceNotes.length ? `\n${existingPlaceNotes.join("\n")}` : ""}`;
}

function buildPlaceVisualsSnippet(publicationPlan: GuidePublicationPlan, assets: GuideApplyAssetMap) {
  const blocks = (publicationPlan.plannedPlaces ?? [])
    .map((plannedPlace) => {
      const placeId = placeIdForPlan(plannedPlace);
      if (!placeId) return null;
      const image = assets.placeImages?.[placeId];
      if (!image) return null;
      return `  ${quote(placeId)}: {
    image: ${quote(image)},
    imageAlt: ${localizedText(`Illustration of ${plannedPlace.draftName}`)},
    visualTheme: "food", // TODO adjust visualTheme if needed
  }`;
    })
    .filter(Boolean);

  if (!blocks.length) {
    return `// No place visuals resolved yet from public/images/guide for this intake.`;
  }

  return blocks.join(",\n");
}

function buildChecklist(intake: GuideIntake, publicationPlan: GuidePublicationPlan, assets: GuideApplyAssetMap, places: GuideApplyPlaceReference[]) {
  const lines = [
    `# guide:apply checklist for ${intake.slug}`,
    "",
    "## Guide article insertion",
    `- insert guide article scaffold into src/content/guide.ts`,
    `- verify category: ${publicationPlan.category ?? "TODO"}`,
    `- verify publishedOn: ${publicationPlan.publishedOn ?? "TODO"}`,
    `- verify relatedApartments: ${(publicationPlan.relatedApartmentSlugs ?? []).join(", ") || "none"}`,
    `- cover asset: ${assets.coverImage ?? "missing / placeholder"}`,
    "",
    "## Place objects",
  ];

  for (const plannedPlace of publicationPlan.plannedPlaces ?? []) {
    const placeId = placeIdForPlan(plannedPlace) ?? "TODO";
    const place = plannedPlace.existingPlaceId ? places.find((candidate) => candidate.id === plannedPlace.existingPlaceId) : undefined;
    lines.push(
      `- ${plannedPlace.draftName}: ${plannedPlace.existingPlaceId ? `reuse ${plannedPlace.existingPlaceId}` : `create ${placeId}`}`,
      `  - image: ${assets.placeImages?.[placeId] ?? plannedPlace.imageStatus ?? "pending"}`,
      `  - map: ${plannedPlace.requiresMapReview ? plannedPlace.mapAction ?? "TODO" : "not needed"}`,
      `  - backlinks: add ${intake.slug} to relatedArticleIds${publicationPlan.canonicalGuideForPlaces || plannedPlace.coverageGuideSlug ? " and guideCoverageSlugs" : ""}${place?.relatedArticleIds?.includes(intake.slug) ? " (already linked)" : ""}`,
    );
  }

  lines.push("", "## Related guides", ...(publicationPlan.relatedArticleSlugs ?? []).map((slug) => `- verify editorial link to ${slug}`));
  lines.push("", "## Assets", "- run guide:assets before final publish if cover or place package is still pending");

  return lines.join("\n");
}

export function buildGuideApplyArtifacts(input: {
  intake: GuideIntake;
  publicationPlan: GuidePublicationPlan;
  guides: GuideApplyGuideReference[];
  places: GuideApplyPlaceReference[];
  assets: GuideApplyAssetMap;
  structure?: GuideStructure | null;
  checkErrors?: { code: string; message: string }[];
}) : GuideApplyArtifacts {
  const { intake, publicationPlan, places, assets, structure, checkErrors } = input;
  const newPlaceIds = unique((publicationPlan.plannedPlaces ?? []).map((plannedPlace) => plannedPlace.newPlaceId).filter(Boolean) as string[]);
  const existingPlaceIds = unique((publicationPlan.plannedPlaces ?? []).map((plannedPlace) => plannedPlace.existingPlaceId).filter(Boolean) as string[]);

  return {
    guideArticleSnippet: buildGuideArticleSnippet(intake, publicationPlan, assets, places, structure),
    placesRawSnippet: buildPlaceRawSnippet(intake, publicationPlan, places),
    placeVisualsSnippet: buildPlaceVisualsSnippet(publicationPlan, assets),
    integrationChecklist: buildChecklist(intake, publicationPlan, assets, places),
    summary: {
      slug: intake.slug,
      ready: !checkErrors?.length,
      newPlaceIds,
      existingPlaceIds,
      relatedArticleSlugs: publicationPlan.relatedArticleSlugs ?? [],
      relatedApartmentSlugs: publicationPlan.relatedApartmentSlugs ?? [],
    },
  };
}
