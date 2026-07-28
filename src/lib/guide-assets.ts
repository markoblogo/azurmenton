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
  expectedAssetPlaceIds: string[];
  missingExpectedAssetPlaceIds: string[];
  expectedCoverAsset: boolean;
  missingExpectedCoverAsset: boolean;
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

export function resolveGuideAssetPlan(input: {
  slug: string;
  intakeTitle?: string;
  coverPathHint?: string;
  coverImageStatus?: "provided" | "pending" | "not_needed" | null;
  coverAssetPath?: string | null;
  coverAssetFileName?: string | null;
  assetsDirectory?: string | null;
  plannedPlaces?: Array<{
    draftName: string;
    existingPlaceId?: string | null;
    newPlaceId?: string | null;
    imageStatus?: "provided" | "pending" | "not_needed" | null;
    assetPath?: string | null;
    assetFileName?: string | null;
  }>;
  placeAssetOverrides?: PlaceAssetInput[];
  availableAssetFiles?: string[];
}) : GuideAssetResolutionPlan {
  const operations: GuideAssetCopyOperation[] = [];
  const issues: GuideAssetPlanIssue[] = [];
  const availableFiles = input.availableAssetFiles ?? [];
  const normalizedAvailable = new Map(availableFiles.map((file) => [normalizeName(file), file]));
  const overrideByPlaceId = new Map((input.placeAssetOverrides ?? []).map((asset) => [asset.placeId, asset.sourcePath]));
  const matchedAssetFiles = new Set<string>();
  const expectedAssetPlaceIds = new Set<string>();
  const missingExpectedAssetPlaceIds = new Set<string>();
  const expectedCoverAsset = input.coverImageStatus === "provided";

  const findAssetFromDirectory = (candidates: string[]) => {
    for (const candidate of candidates) {
      const match = normalizedAvailable.get(normalizeName(candidate));
      if (match) return match;
    }
    return undefined;
  };

  const coverSourcePath = (() => {
    if (input.coverPathHint) return input.coverPathHint;
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

  if (coverSourcePath) {
    operations.push(...buildGuideAssetPlan({ slug: input.slug, coverPathHint: coverSourcePath }));
  } else if (input.coverImageStatus === "provided") {
    issues.push({
      severity: "error",
      code: "missing-cover-asset",
      message: `Cover is marked as provided but no cover asset could be resolved for ${input.slug}.`,
    });
  }

  const placeAssets: PlaceAssetInput[] = [];
  for (const plannedPlace of input.plannedPlaces ?? []) {
    const placeId = plannedPlace.existingPlaceId ?? plannedPlace.newPlaceId ?? null;
    if (!placeId) continue;
    if (plannedPlace.imageStatus === "provided") expectedAssetPlaceIds.add(placeId);

    const override = overrideByPlaceId.get(placeId);
    if (override) {
      placeAssets.push({ placeId, sourcePath: override });
      continue;
    }

    if (plannedPlace.assetPath) {
      placeAssets.push({ placeId, sourcePath: plannedPlace.assetPath });
      continue;
    }

    if (input.assetsDirectory && plannedPlace.assetFileName) {
      matchedAssetFiles.add(plannedPlace.assetFileName);
      placeAssets.push({ placeId, sourcePath: `${input.assetsDirectory}/${plannedPlace.assetFileName}` });
      continue;
    }

    if (input.assetsDirectory) {
      const match = findAssetFromDirectory([plannedPlace.draftName, placeId]);
      if (match) {
        matchedAssetFiles.add(match);
        placeAssets.push({ placeId, sourcePath: `${input.assetsDirectory}/${match}` });
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
    } else if (plannedPlace.imageStatus === "pending") {
      issues.push({
        severity: "warning",
        code: "pending-place-asset",
        message: `Place ${placeId} still has no resolved illustration asset.`,
      });
    }
  }

  operations.push(...buildGuideAssetPlan({ slug: input.slug, placeAssets }));

  return {
    operations,
    issues,
    matchedAssetFiles: [...matchedAssetFiles].sort(),
    unmatchedAssetFiles: availableFiles.filter((file) => !matchedAssetFiles.has(file)),
    expectedAssetPlaceIds: [...expectedAssetPlaceIds].sort(),
    missingExpectedAssetPlaceIds: [...missingExpectedAssetPlaceIds].sort(),
    expectedCoverAsset,
    missingExpectedCoverAsset: expectedCoverAsset && !coverSourcePath,
  };
}
