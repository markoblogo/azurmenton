import type { GuideApplyArtifacts } from "@/lib/guide-apply";
import type { GuidePublishIssue, GuidePublishReport } from "@/lib/guide-publish";
import type { GuidePublicationPlan } from "@/lib/guide-check";

export type GuidePatchTarget = {
  file: string;
  action: "insert" | "update";
  anchor: string;
  snippet?: string;
  notes: string[];
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

export function buildGuidePatchBundle(input: {
  slug: string;
  publicationPlan: GuidePublicationPlan;
  publishReport: GuidePublishReport;
  applyArtifacts: GuideApplyArtifacts;
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
    const notes = existingPlaceUpdates.flatMap((place) => {
      const placeId = place.existingPlaceId as string;
      const updateNotes = [`Update existing place \`${placeId}\` in \`rawPlaces\`.`];
      updateNotes.push(`Add \`${input.slug}\` to \`relatedArticleIds\`.`);
      if (place.coverageGuideSlug) updateNotes.push(`Add \`${place.coverageGuideSlug}\` to \`guideCoverageSlugs\`.`);
      return updateNotes;
    });

    if (hasPlaceVisualSnippet(input.applyArtifacts.placeVisualsSnippet)) {
      notes.push("Merge the generated visual fields into the matching place objects where illustrations are now available.");
    }

    targets.push({
      file: "src/content/places.ts",
      action: "update",
      anchor: "Locate each existing place object inside `rawPlaces` by its `id` field.",
      snippet: hasPlaceVisualSnippet(input.applyArtifacts.placeVisualsSnippet)
        ? `// Visual field snippets\n${input.applyArtifacts.placeVisualsSnippet.trim()}`
        : undefined,
      notes,
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
