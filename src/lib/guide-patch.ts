import type { GuideApplyArtifacts } from "@/lib/guide-apply";
import type { GuidePublishIssue, GuidePublishReport } from "@/lib/guide-publish";
import type { GuidePublicationPlan } from "@/lib/guide-check";

export type GuidePatchPlaceReference = {
  id: string;
  name: string;
  relatedArticleIds?: string[];
  guideCoverageSlugs?: string[];
  image?: string;
};

export type GuidePatchPlaceUpdate = {
  placeId: string;
  draftName: string;
  anchor: string;
  addRelatedArticleIds: string[];
  addGuideCoverageSlugs: string[];
  visualFields?: {
    image: string;
    imageAlt: string;
    visualTheme: string;
  };
  alreadySatisfied: {
    backlink: boolean;
    coverage: boolean;
    visual: boolean;
  };
  notes: string[];
};

export type GuidePatchTarget = {
  file: string;
  action: "insert" | "update";
  anchor: string;
  snippet?: string;
  notes: string[];
  placeUpdates?: GuidePatchPlaceUpdate[];
};

export type GuidePatchBundle = {
  slug: string;
  ready: boolean;
  blockers: GuidePublishIssue[];
  targets: GuidePatchTarget[];
  nextSteps: string[];
  summary: {
    targetFileCount: number;
    newPlaceCount: number;
    existingPlaceUpdateCount: number;
  };
};

function indentBlock(value: string, spaces: number) {
  const pad = " ".repeat(spaces);
  return value
    .trim()
    .split("\n")
    .map((line) => `${pad}${line}`)
    .join("\n");
}

function hasNewPlaceSnippet(snippet: string) {
  return !snippet.trim().startsWith("// No new place objects are required");
}

function hasPlaceVisualSnippet(snippet: string) {
  return !snippet.trim().startsWith("// No place visuals resolved yet");
}

function quote(value: string) {
  return JSON.stringify(value);
}

function unique(values: string[]) {
  return [...new Set(values)];
}

function arr(values: string[], indent = 4) {
  const pad = " ".repeat(indent);
  if (!values.length) return "[]";
  return `[\n${values.map((value) => `${pad}${quote(value)}`).join(",\n")}\n${" ".repeat(Math.max(0, indent - 2))}]`;
}

function buildPlaceUpdateSnippet(update: GuidePatchPlaceUpdate) {
  const lines = [`// ${update.placeId} (${update.draftName})`];

  if (update.addRelatedArticleIds.length) {
    lines.push(`relatedArticleIds: ${arr(update.addRelatedArticleIds, 6)}, // merge with existing values`);
  }

  if (update.addGuideCoverageSlugs.length) {
    lines.push(`guideCoverageSlugs: ${arr(update.addGuideCoverageSlugs, 6)}, // merge with existing values`);
  }

  if (update.visualFields) {
    lines.push(`image: ${quote(update.visualFields.image)},`);
    lines.push(`imageAlt: ${quote(update.visualFields.imageAlt)},`);
    lines.push(`visualTheme: ${quote(update.visualFields.visualTheme)},`);
  }

  return lines.join("\n");
}

export function buildGuidePatchBundle(input: {
  slug: string;
  publicationPlan: GuidePublicationPlan;
  publishReport: GuidePublishReport;
  applyArtifacts: GuideApplyArtifacts;
  places: GuidePatchPlaceReference[];
}): GuidePatchBundle {
  if (!input.publishReport.ready) {
    return {
      slug: input.slug,
      ready: false,
      blockers: input.publishReport.blockers,
      targets: [],
      nextSteps: [
        "Resolve publish blockers first.",
        `Re-run npm run guide:publish -- --slug ${input.slug}.`,
        `Re-run npm run guide:patch -- --slug ${input.slug} once publish is ready.`,
      ],
      summary: {
        targetFileCount: 0,
        newPlaceCount: 0,
        existingPlaceUpdateCount: 0,
      },
    };
  }

  const targets: GuidePatchTarget[] = [];
  const existingPlaceUpdates = (input.publicationPlan.plannedPlaces ?? []).filter((place) => place.existingPlaceId);
  const newPlaceUpdates = (input.publicationPlan.plannedPlaces ?? []).filter((place) => place.newPlaceId);
  const placeById = new Map(input.places.map((place) => [place.id, place]));
  const resolvedPlaceImages = new Map(
    (input.publishReport.assets.places ?? [])
      .filter((entry) => entry.publicPath)
      .map((entry) => [entry.placeId, entry.publicPath as string]),
  );

  targets.push({
    file: "src/content/guide.ts",
    action: "insert",
    anchor: "Insert before the closing `];` of `guideArticles`.",
    snippet: `,\n${indentBlock(input.applyArtifacts.guideArticleSnippet, 2)}`,
    notes: [
      `Add the new guide article for slug \`${input.slug}\`.`,
      "Keep `publishedOn` unchanged so the guide landing NEW slot stays deterministic.",
    ],
  });

  if (hasNewPlaceSnippet(input.applyArtifacts.placesRawSnippet)) {
    targets.push({
      file: "src/content/places.ts",
      action: "insert",
      anchor: "Insert before the closing `];` of `rawPlaces`.",
      snippet: `,\n${indentBlock(input.applyArtifacts.placesRawSnippet, 2)}`,
      notes: [
        "Add the new place objects to `rawPlaces`.",
        "Preserve the generated ids and source status until editorial verification changes them.",
      ],
    });
  }

  if (existingPlaceUpdates.length || hasPlaceVisualSnippet(input.applyArtifacts.placeVisualsSnippet)) {
    const placeUpdates: GuidePatchPlaceUpdate[] = existingPlaceUpdates.map((place) => {
      const placeId = place.existingPlaceId as string;
      const current = placeById.get(placeId);
      const desiredRelatedArticleIds = unique([input.slug]);
      const desiredCoverageSlugs = place.coverageGuideSlug ? unique([place.coverageGuideSlug]) : [];
      const currentRelatedArticleIds = current?.relatedArticleIds ?? [];
      const currentCoverageSlugs = current?.guideCoverageSlugs ?? [];
      const resolvedImage = resolvedPlaceImages.get(placeId);
      const backlinkOk = desiredRelatedArticleIds.every((slug) => currentRelatedArticleIds.includes(slug));
      const coverageOk = desiredCoverageSlugs.every((slug) => currentCoverageSlugs.includes(slug));
      const visualOk = resolvedImage ? current?.image === resolvedImage : true;
      const addRelatedArticleIds = desiredRelatedArticleIds.filter((slug) => !currentRelatedArticleIds.includes(slug));
      const addGuideCoverageSlugs = desiredCoverageSlugs.filter((slug) => !currentCoverageSlugs.includes(slug));
      const notes = [`Update existing place \`${placeId}\` in \`rawPlaces\`.`];

      if (addRelatedArticleIds.length) notes.push(`Merge \`${addRelatedArticleIds.join(", ")}\` into \`relatedArticleIds\`.`);
      if (addGuideCoverageSlugs.length) notes.push(`Merge \`${addGuideCoverageSlugs.join(", ")}\` into \`guideCoverageSlugs\`.`);
      if (resolvedImage && !visualOk) notes.push("Merge the resolved image fields into this existing place object.");
      if (!addRelatedArticleIds.length && !addGuideCoverageSlugs.length && (!resolvedImage || visualOk)) {
        notes.push("No remaining content delta; verify this object stays aligned after the guide insert.");
      }

      return {
        placeId,
        draftName: place.draftName,
        anchor: `id: ${quote(placeId)}`,
        addRelatedArticleIds,
        addGuideCoverageSlugs,
        visualFields: resolvedImage
          ? {
              image: resolvedImage,
              imageAlt: `Illustration of ${place.draftName}`,
              visualTheme: "food",
            }
          : undefined,
        alreadySatisfied: {
          backlink: backlinkOk,
          coverage: coverageOk,
          visual: visualOk,
        },
        notes,
      };
    });

    const notes = [
      "Apply the per-place update blocks below to the matching existing `rawPlaces` objects.",
      "Merge arrays with existing values; do not overwrite unrelated guide links or coverage slugs.",
    ];

    targets.push({
      file: "src/content/places.ts",
      action: "update",
      anchor: "Locate each existing place object inside `rawPlaces` by its `id` field.",
      snippet: placeUpdates.map((update) => buildPlaceUpdateSnippet(update)).join("\n\n"),
      notes,
      placeUpdates,
    });
  }

  return {
    slug: input.slug,
    ready: true,
    blockers: [],
    targets,
    nextSteps: [
      `Review build/guide-intake/${input.slug}/patch/content-bundle.md.`,
      "Apply the target snippets into the listed files.",
      "Run guide:review once the manual insertion is complete.",
    ],
    summary: {
      targetFileCount: new Set(targets.map((target) => target.file)).size,
      newPlaceCount: newPlaceUpdates.length,
      existingPlaceUpdateCount: existingPlaceUpdates.length,
    },
  };
}
