import type { GuidePublicationImageStatus } from "./guide-check";
import { buildGuideOperatorSummary } from "./guide-operator-summary";

export type PlaceAssetInput = {
  placeId: string;
  sourcePath: string;
};

export type GuideAssetPlanIssue = {
  severity: "warning" | "error";
  code: string;
  message: string;
};

export type GuideAssetPlanInput = {
  slug: string;
  coverPathHint?: string;
  placeAssets?: PlaceAssetInput[];
};

export type GuideAssetCopyOperation = {
  kind: "cover" | "place";
  sourcePath: string;
  destinationPath: string;
  publicPath: string;
};

export type GuideAssetResolutionPlan = {
  operations: GuideAssetCopyOperation[];
  issues: GuideAssetPlanIssue[];
  matchedAssetFiles: string[];
  unmatchedAssetFiles: string[];
  alreadyCoveredAssetFiles: string[];
  matchedPlaces: Array<{
    placeId: string;
    draftName: string;
    sourcePath: string;
    destinationPath: string;
    publicPath: string;
  }>;
  expectedAssetPlaceIds: string[];
  missingExpectedAssetPlaceIds: string[];
  expectedCoverAsset: boolean;
  missingExpectedCoverAsset: boolean;
  skippedAlreadyCoveredPlaces: Array<{
    placeId: string;
    draftName: string;
  }>;
  publishedGuidePlacesWithoutImage: Array<{
    placeId: string;
    draftName: string;
  }>;
};

export type GuideAssetTargetSuggestion = {
  guideSlug: string;
  matchedAssetFiles: string[];
  matchedPlaceIds: string[];
  rerunCommand?: string;
};

export type GuideAssetsPersistentSummary = {
  slug: string;
  mode: "published-guide";
  reportOnly: boolean;
  missingOnly: boolean;
  failOnUnmatched: boolean;
  strict: boolean;
  operatorSummary: string[];
  counts: {
    matched: number;
    unmatched: number;
    alreadyCovered: number;
    skippedCovered: number;
    stillMissing: number;
    patchReady: number;
  };
  matchedAssetFiles: string[];
  unmatchedAssetFiles: string[];
  alreadyCoveredAssetFiles: string[];
  matchedPlaceIds: string[];
  publishedGuidePlacesWithoutImage: Array<{
    placeId: string;
    draftName: string;
  }>;
  likelyGuideTargets: GuideAssetTargetSuggestion[];
  bestRerunCommand: string | null;
  issueCodes: string[];
};

export type PublishedGuidePlaceImagePatchUpdate = {
  placeId: string;
  draftName: string;
  anchor: string;
  imagePublicPath: string;
  currentImage: string | null;
  alreadySatisfied: boolean;
  snippet: string;
  notes: string[];
};

export type PublishedGuidePlaceImagePatchBundle = {
  slug: string;
  counts: {
    matchedPlaces: number;
    patchReady: number;
    alreadySatisfied: number;
  };
  operatorSummary: string[];
  updates: PublishedGuidePlaceImagePatchUpdate[];
};

export type PublishedGuideAssetPlace = {
  placeId: string;
  draftName: string;
  image?: string;
};

export type PublishedGuideAssetContext = {
  slug: string;
  intakeTitle?: string;
  coverImage?: string;
  places: PublishedGuideAssetPlace[];
};

type GuideAssetCandidatePlace = {
  draftName: string;
  existingPlaceId?: string | null;
  newPlaceId?: string | null;
  imageStatus?: GuidePublicationImageStatus | "existing" | "pending" | null;
  assetPath?: string | null;
  assetFileName?: string | null;
};

function normalizeExt(value: string) {
  const lower = value.toLowerCase();
  return lower === ".jpeg" ? ".jpg" : lower;
}

export function parsePlaceAssetArgs(args: string[]): PlaceAssetInput[] {
  return args.map((arg) => {
    const separator = arg.indexOf("=");
    if (separator === -1) {
      throw new Error(`Invalid --place value: ${arg}. Expected place-id=/absolute/path.png`);
    }

    const placeId = arg.slice(0, separator).trim();
    const sourcePath = arg.slice(separator + 1).trim();

    if (!placeId || !sourcePath) {
      throw new Error(`Invalid --place value: ${arg}. Expected place-id=/absolute/path.png`);
    }

    return { placeId, sourcePath };
  });
}

export function buildGuideAssetPlan(input: GuideAssetPlanInput): GuideAssetCopyOperation[] {
  const operations: GuideAssetCopyOperation[] = [];

  if (input.coverPathHint) {
    const extension = normalizeExt(input.coverPathHint.slice(input.coverPathHint.lastIndexOf(".")));
    const publicPath = `/images/guide/${input.slug}${extension}`;
    operations.push({
      kind: "cover",
      sourcePath: input.coverPathHint,
      destinationPath: `public/images/guide/${input.slug}${extension}`,
      publicPath,
    });
  }

  for (const placeAsset of input.placeAssets ?? []) {
    const extension = normalizeExt(placeAsset.sourcePath.slice(placeAsset.sourcePath.lastIndexOf(".")));
    const publicPath = `/images/guide/${placeAsset.placeId}${extension}`;
    operations.push({
      kind: "place",
      sourcePath: placeAsset.sourcePath,
      destinationPath: `public/images/guide/${placeAsset.placeId}${extension}`,
      publicPath,
    });
  }

  return operations;
}

function normalizeName(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’`]/g, "")
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function unique<T>(values: T[]) {
  return [...new Set(values)];
}

function shouldRequireFreshCoverSource(input: {
  coverImageStatus?: GuidePublicationImageStatus | null;
  coverAssetPath?: string | null;
  coverAssetFileName?: string | null;
  coverPathHint?: string;
  publishedGuide?: PublishedGuideAssetContext;
}) {
  if (input.publishedGuide?.coverImage) return false;
  if (input.coverImageStatus === "provided") return true;
  if (input.coverAssetPath || input.coverAssetFileName) return true;
  if (input.coverImageStatus === "existing" || input.coverImageStatus === "not_needed") return false;
  return Boolean(input.coverPathHint);
}

export function resolveGuideAssetPlan(input: {
  slug: string;
  outputSlug?: string;
  intakeTitle?: string;
  coverPathHint?: string;
  coverImageStatus?: GuidePublicationImageStatus | null;
  coverAssetPath?: string | null;
  coverAssetFileName?: string | null;
  assetsDirectory?: string | null;
  plannedPlaces?: Array<{
    draftName: string;
    existingPlaceId?: string | null;
    newPlaceId?: string | null;
    imageStatus?: GuidePublicationImageStatus | null;
    assetPath?: string | null;
    assetFileName?: string | null;
  }>;
  placeAssetOverrides?: PlaceAssetInput[];
  availableAssetFiles?: string[];
  existingPlaceImages?: Record<string, string | undefined>;
  knownPlaces?: Array<{
    id: string;
    name: string;
    image?: string;
  }>;
  publishedGuide?: PublishedGuideAssetContext;
  missingOnly?: boolean;
}) : GuideAssetResolutionPlan {
  const operations: GuideAssetCopyOperation[] = [];
  const issues: GuideAssetPlanIssue[] = [];
  const matchedPlaces: GuideAssetResolutionPlan["matchedPlaces"] = [];
  const skippedAlreadyCoveredPlaces: GuideAssetResolutionPlan["skippedAlreadyCoveredPlaces"] = [];
  const alreadyCoveredAssetFiles = new Set<string>();
  const availableFiles = input.availableAssetFiles ?? [];
  const normalizedAvailable = new Map(availableFiles.map((file) => [normalizeName(file), file]));
  const overrideByPlaceId = new Map((input.placeAssetOverrides ?? []).map((asset) => [asset.placeId, asset.sourcePath]));
  const matchedAssetFiles = new Set<string>();
  const expectedAssetPlaceIds = new Set<string>();
  const missingExpectedAssetPlaceIds = new Set<string>();
  const outputSlug = input.outputSlug ?? input.publishedGuide?.slug ?? input.slug;
  const knownPlaceById = new Map(
    [
      ...(input.knownPlaces ?? []),
      ...(input.publishedGuide?.places.map((place) => ({ id: place.placeId, name: place.draftName, image: place.image })) ?? []),
    ].map((place) => [place.id, place]),
  );

  const candidatePlaces: GuideAssetCandidatePlace[] = [
    ...(input.plannedPlaces ?? []),
    ...(input.publishedGuide?.places.map((place) => ({
      draftName: place.draftName,
      existingPlaceId: place.placeId,
      imageStatus: place.image ? ("existing" as const) : ("pending" as const),
    })) ?? []),
  ];

  const candidatePlaceIds = new Set(
    candidatePlaces.map((place) => place.existingPlaceId ?? place.newPlaceId).filter(Boolean) as string[],
  );

  for (const placeId of overrideByPlaceId.keys()) {
    if (candidatePlaceIds.has(placeId)) continue;
    const knownPlace = knownPlaceById.get(placeId);
    candidatePlaces.push({
      draftName: knownPlace?.name ?? placeId,
      existingPlaceId: placeId,
      imageStatus: "provided",
    });
    candidatePlaceIds.add(placeId);
  }

  const expectedCoverAsset = shouldRequireFreshCoverSource(input);

  const findAssetFromDirectory = (candidates: string[]) => {
    for (const candidate of candidates) {
      const match = normalizedAvailable.get(normalizeName(candidate));
      if (match) return match;
    }
    return undefined;
  };

  const useLegacyCoverPathHint =
    Boolean(input.coverPathHint) &&
    !input.publishedGuide?.coverImage &&
    input.coverImageStatus !== "existing" &&
    input.coverImageStatus !== "not_needed";

  const coverSourcePath = (() => {
    if (!expectedCoverAsset) return undefined;
    if (useLegacyCoverPathHint && input.coverPathHint) return input.coverPathHint;
    if (input.coverAssetPath) return input.coverAssetPath;
    if (input.assetsDirectory && input.coverAssetFileName) {
      matchedAssetFiles.add(input.coverAssetFileName);
      return `${input.assetsDirectory}/${input.coverAssetFileName}`;
    }
    if (input.assetsDirectory) {
      const match = findAssetFromDirectory(["cover", input.slug, input.intakeTitle ?? ""]);
      if (match) {
        matchedAssetFiles.add(match);
        return `${input.assetsDirectory}/${match}`;
      }
    }
    return undefined;
  })();

  if (coverSourcePath && input.publishedGuide?.coverImage && expectedCoverAsset) {
    issues.push({
      severity: "error",
      code: "published-guide-cover-already-exists",
      message: `Published guide ${input.publishedGuide.slug} already has cover ${input.publishedGuide.coverImage}; guide:assets will not create a duplicate cover asset.`,
    });
  } else if (coverSourcePath) {
    operations.push(...buildGuideAssetPlan({ slug: outputSlug, coverPathHint: coverSourcePath }));
  } else if (input.coverImageStatus === "provided") {
    issues.push({
      severity: "error",
      code: "missing-cover-asset",
      message: `Cover is marked as provided but no cover asset could be resolved for ${input.slug}.`,
    });
  }

  const placeAssets: PlaceAssetInput[] = [];
  for (const plannedPlace of candidatePlaces) {
    const placeId = plannedPlace.existingPlaceId ?? plannedPlace.newPlaceId ?? null;
    if (!placeId) continue;
    if (plannedPlace.imageStatus === "provided") expectedAssetPlaceIds.add(placeId);
    const existingImage = input.existingPlaceImages?.[placeId] ?? knownPlaceById.get(placeId)?.image;

    if (input.missingOnly && existingImage) {
      if (input.assetsDirectory) {
        const alreadyCoveredMatch = findAssetFromDirectory([plannedPlace.draftName, placeId]);
        if (alreadyCoveredMatch) {
          matchedAssetFiles.add(alreadyCoveredMatch);
          alreadyCoveredAssetFiles.add(alreadyCoveredMatch);
        }
      }
      skippedAlreadyCoveredPlaces.push({
        placeId,
        draftName: plannedPlace.draftName,
      });
      continue;
    }

    const override = overrideByPlaceId.get(placeId);
    if (override) {
      placeAssets.push({ placeId, sourcePath: override });
      matchedPlaces.push({
        placeId,
        draftName: plannedPlace.draftName,
        sourcePath: override,
        destinationPath: `public/images/guide/${placeId}${normalizeExt(override.slice(override.lastIndexOf(".")))}`,
        publicPath: `/images/guide/${placeId}${normalizeExt(override.slice(override.lastIndexOf(".")))}`,
      });
      continue;
    }

    if (plannedPlace.assetPath) {
      placeAssets.push({ placeId, sourcePath: plannedPlace.assetPath });
      matchedPlaces.push({
        placeId,
        draftName: plannedPlace.draftName,
        sourcePath: plannedPlace.assetPath,
        destinationPath: `public/images/guide/${placeId}${normalizeExt(plannedPlace.assetPath.slice(plannedPlace.assetPath.lastIndexOf(".")))}`,
        publicPath: `/images/guide/${placeId}${normalizeExt(plannedPlace.assetPath.slice(plannedPlace.assetPath.lastIndexOf(".")))}`,
      });
      continue;
    }

    if (input.assetsDirectory && plannedPlace.assetFileName) {
      matchedAssetFiles.add(plannedPlace.assetFileName);
      placeAssets.push({ placeId, sourcePath: `${input.assetsDirectory}/${plannedPlace.assetFileName}` });
      matchedPlaces.push({
        placeId,
        draftName: plannedPlace.draftName,
        sourcePath: `${input.assetsDirectory}/${plannedPlace.assetFileName}`,
        destinationPath: `public/images/guide/${placeId}${normalizeExt(plannedPlace.assetFileName.slice(plannedPlace.assetFileName.lastIndexOf(".")))}`,
        publicPath: `/images/guide/${placeId}${normalizeExt(plannedPlace.assetFileName.slice(plannedPlace.assetFileName.lastIndexOf(".")))}`,
      });
      continue;
    }

    if (input.assetsDirectory) {
      const match = findAssetFromDirectory([plannedPlace.draftName, placeId]);
      if (match) {
        matchedAssetFiles.add(match);
        placeAssets.push({ placeId, sourcePath: `${input.assetsDirectory}/${match}` });
        matchedPlaces.push({
          placeId,
          draftName: plannedPlace.draftName,
          sourcePath: `${input.assetsDirectory}/${match}`,
          destinationPath: `public/images/guide/${placeId}${normalizeExt(match.slice(match.lastIndexOf(".")))}`,
          publicPath: `/images/guide/${placeId}${normalizeExt(match.slice(match.lastIndexOf(".")))}`,
        });
        continue;
      }
    }

    if (plannedPlace.imageStatus === "provided") {
      missingExpectedAssetPlaceIds.add(placeId);
      issues.push({
        severity: "error",
        code: "missing-place-asset",
        message: `Place ${placeId} is marked as provided but no asset could be resolved.`,
      });
    } else if (plannedPlace.imageStatus === "existing") {
      if (!existingImage) {
        issues.push({
          severity: "error",
          code: "missing-existing-place-image",
          message: `Place ${placeId} is marked as already covered by an existing repo image, but no current image was found.`,
        });
      }
    } else if (plannedPlace.imageStatus === "pending") {
      issues.push({
        severity: "warning",
        code: "pending-place-asset",
        message: `Place ${placeId} still has no resolved illustration asset.`,
      });
    }
  }

  operations.push(...buildGuideAssetPlan({ slug: outputSlug, placeAssets }));

  const publishedGuidePlacesWithoutImage = input.publishedGuide
    ? candidatePlaces
        .map((plannedPlace) => {
          const placeId = plannedPlace.existingPlaceId ?? plannedPlace.newPlaceId ?? null;
          if (!placeId) return null;
          const resolvedExistingImage = input.existingPlaceImages?.[placeId] ?? knownPlaceById.get(placeId)?.image;
          const matched = matchedPlaces.some((entry) => entry.placeId === placeId);
          if (resolvedExistingImage || matched) return null;
          return { placeId, draftName: plannedPlace.draftName };
        })
        .filter(Boolean) as Array<{ placeId: string; draftName: string }>
    : [];

  return {
    operations,
    issues,
    matchedAssetFiles: [...matchedAssetFiles].sort(),
    unmatchedAssetFiles: availableFiles.filter((file) => !matchedAssetFiles.has(file)),
    alreadyCoveredAssetFiles: [...alreadyCoveredAssetFiles].sort(),
    matchedPlaces,
    expectedAssetPlaceIds: [...expectedAssetPlaceIds].sort(),
    missingExpectedAssetPlaceIds: [...missingExpectedAssetPlaceIds].sort(),
    expectedCoverAsset,
    missingExpectedCoverAsset: expectedCoverAsset && !coverSourcePath,
    skippedAlreadyCoveredPlaces,
    publishedGuidePlacesWithoutImage,
  };
}

export function suggestPublishedGuideTargets(input: {
  assetFiles: string[];
  guides: Array<{
    slug: string;
    relatedPlaces?: string[];
    sections: Array<{
      relatedPlaceIds?: string[];
    }>;
  }>;
  places: Array<{
    id: string;
    name: string;
    image?: string;
  }>;
  missingOnly?: boolean;
}) : GuideAssetTargetSuggestion[] {
  const normalizedFiles = new Map(input.assetFiles.map((file) => [normalizeName(file), file]));
  const placeById = new Map(input.places.map((place) => [place.id, place]));
  const suggestions: GuideAssetTargetSuggestion[] = [];

  for (const guide of input.guides) {
    const relatedPlaceIds = unique([
      ...(guide.relatedPlaces ?? []),
      ...guide.sections.flatMap((section) => section.relatedPlaceIds ?? []),
    ]);

    const matchedPlaceIds: string[] = [];
    const matchedAssetFiles: string[] = [];

    for (const placeId of relatedPlaceIds) {
      const place = placeById.get(placeId);
      if (!place) continue;
      if (input.missingOnly && place.image) continue;

      const file =
        normalizedFiles.get(normalizeName(place.name)) ??
        normalizedFiles.get(normalizeName(place.id));

      if (!file) continue;
      matchedPlaceIds.push(placeId);
      matchedAssetFiles.push(file);
    }

    if (!matchedPlaceIds.length) continue;

    suggestions.push({
      guideSlug: guide.slug,
      matchedPlaceIds: unique(matchedPlaceIds),
      matchedAssetFiles: unique(matchedAssetFiles),
    });
  }

  return suggestions.sort((left, right) => {
    if (right.matchedPlaceIds.length !== left.matchedPlaceIds.length) {
      return right.matchedPlaceIds.length - left.matchedPlaceIds.length;
    }

    return left.guideSlug.localeCompare(right.guideSlug);
  });
}

export function buildPublishedGuideAssetsRerunCommand(input: {
  guideSlug: string;
  assetsDir?: string | null;
  missingOnly?: boolean;
  reportOnly?: boolean;
  failOnUnmatched?: boolean;
  strict?: boolean;
}) {
  const parts = [
    "npm run guide:assets --",
    "--published-guide",
    input.guideSlug,
  ];

  if (input.assetsDir) {
    parts.push("--assets-dir", input.assetsDir);
  }
  if (input.missingOnly) parts.push("--missing-only");
  if (input.reportOnly) parts.push("--report-only");
  if (input.failOnUnmatched) parts.push("--fail-on-unmatched");
  if (input.strict) parts.push("--strict");

  return parts.join(" ");
}

export function buildGuideAssetsPersistentSummary(input: {
  slug: string;
  strict: boolean;
  missingOnly: boolean;
  reportOnly: boolean;
  failOnUnmatched: boolean;
  mode: string;
  status: "ok" | "needs-attention";
  matchedAssetFiles: string[];
  unmatchedAssetFiles: string[];
  alreadyCoveredAssetFiles: string[];
  matchedPlaces: Array<{ placeId: string }>;
  skippedAlreadyCoveredPlaces: Array<{ placeId: string }>;
  publishedGuidePlacesWithoutImage: Array<{ placeId: string; draftName: string }>;
  likelyGuideTargets: GuideAssetTargetSuggestion[];
  bestRerunCommand: string | null;
  issues: Array<{ code: string }>;
  reportPath?: string | null;
}): GuideAssetsPersistentSummary {
  const patchReady = input.matchedPlaces.length;
  const counts = {
    matched: input.matchedPlaces.length,
    unmatched: input.unmatchedAssetFiles.length,
    alreadyCovered: input.alreadyCoveredAssetFiles.length,
    skippedCovered: input.skippedAlreadyCoveredPlaces.length,
    stillMissing: input.publishedGuidePlacesWithoutImage.length,
    patchReady,
  };
  const operatorSummary = buildGuideOperatorSummary({
    status: input.status,
    subject: input.slug,
    mode: input.mode,
    counts: {
      matched: counts.matched,
      "skipped-covered": counts.skippedCovered,
      "already-covered": counts.alreadyCovered,
      unmatched: counts.unmatched,
      "still-missing": counts.stillMissing,
    },
    reportPath: input.reportPath,
    rerunCommand: input.bestRerunCommand,
  });

  return {
    slug: input.slug,
    mode: "published-guide",
    strict: input.strict,
    missingOnly: input.missingOnly,
    reportOnly: input.reportOnly,
    failOnUnmatched: input.failOnUnmatched,
    operatorSummary,
    counts,
    matchedAssetFiles: input.matchedAssetFiles,
    unmatchedAssetFiles: input.unmatchedAssetFiles,
    alreadyCoveredAssetFiles: input.alreadyCoveredAssetFiles,
    matchedPlaceIds: unique(input.matchedPlaces.map((place) => place.placeId)),
    publishedGuidePlacesWithoutImage: input.publishedGuidePlacesWithoutImage,
    likelyGuideTargets: input.likelyGuideTargets.map((target) => ({
      guideSlug: target.guideSlug,
      matchedAssetFiles: target.matchedAssetFiles,
      matchedPlaceIds: target.matchedPlaceIds,
      rerunCommand: target.rerunCommand,
    })),
    bestRerunCommand: input.bestRerunCommand,
    issueCodes: unique(input.issues.map((issue) => issue.code)),
  };
}

function quote(value: string) {
  return JSON.stringify(value);
}

export function buildPublishedGuidePlaceImagePatchBundle(input: {
  slug: string;
  matchedPlaces: GuideAssetResolutionPlan["matchedPlaces"];
  currentPlaces: Array<{
    id: string;
    image?: string;
  }>;
  reportPath?: string | null;
}): PublishedGuidePlaceImagePatchBundle {
  const currentById = new Map(input.currentPlaces.map((place) => [place.id, place]));
  const updates = input.matchedPlaces.map((place) => {
    const currentImage = currentById.get(place.placeId)?.image ?? null;
    const alreadySatisfied = currentImage === place.publicPath;

    return {
      placeId: place.placeId,
      draftName: place.draftName,
      anchor: `id: ${quote(place.placeId)}`,
      imagePublicPath: place.publicPath,
      currentImage,
      alreadySatisfied,
      snippet: `image: ${quote(place.publicPath)},`,
      notes: alreadySatisfied
        ? ["Image field already matches the resolved public asset path."]
        : ["Insert or replace the image field inside the matching rawPlaces object."],
    };
  });

  const patchReady = updates.filter((update) => !update.alreadySatisfied).length;
  const alreadySatisfied = updates.filter((update) => update.alreadySatisfied).length;

  return {
    slug: input.slug,
    counts: {
      matchedPlaces: updates.length,
      patchReady,
      alreadySatisfied,
    },
    operatorSummary: buildGuideOperatorSummary({
      status: patchReady ? "needs-follow-up" : "ok",
      subject: input.slug,
      mode: "guide-assets-postpublish-patch",
      counts: {
        matched: updates.length,
        "patch-ready": patchReady,
        "already-satisfied": alreadySatisfied,
      },
      reportPath: input.reportPath,
    }),
    updates,
  };
}
