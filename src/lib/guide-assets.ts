export type PlaceAssetInput = {
  placeId: string;
  sourcePath: string;
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

