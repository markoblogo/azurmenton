import { describe, expect, it } from "vitest";

import { buildGuideAssetPlan, parsePlaceAssetArgs, resolveGuideAssetPlan } from "../../src/lib/guide-assets";

describe("guide assets", () => {
  it("builds explicit asset copy operations", () => {
    const operations = buildGuideAssetPlan({
      slug: "burgers-menton",
      coverPathHint: "/tmp/cover.jpeg",
      placeAssets: [{ placeId: "alls-stars-menton", sourcePath: "/tmp/alls-stars.PNG" }],
    });

    expect(operations).toEqual([
      {
        kind: "cover",
        sourcePath: "/tmp/cover.jpeg",
        destinationPath: "public/images/guide/burgers-menton.jpg",
        publicPath: "/images/guide/burgers-menton.jpg",
      },
      {
        kind: "place",
        sourcePath: "/tmp/alls-stars.PNG",
        destinationPath: "public/images/guide/alls-stars-menton.png",
        publicPath: "/images/guide/alls-stars-menton.png",
      },
    ]);
  });

  it("parses repeated place asset args", () => {
    expect(parsePlaceAssetArgs(["one=/tmp/a.png", "two=/tmp/b.jpg"])).toEqual([
      { placeId: "one", sourcePath: "/tmp/a.png" },
      { placeId: "two", sourcePath: "/tmp/b.jpg" },
    ]);
  });

  it("resolves cover and place assets from publication-plan hints and asset directory", () => {
    const plan = resolveGuideAssetPlan({
      slug: "best-coffee-menton",
      intakeTitle: "Best Coffee in Menton",
      coverImageStatus: "provided",
      assetsDirectory: "/tmp/assets",
      coverAssetFileName: "cover.png",
      plannedPlaces: [
        {
          draftName: "Jean-Luc Pelé",
          newPlaceId: "jean-luc-pele-menton",
          imageStatus: "provided",
        },
        {
          draftName: "Flowy Coffee Coworking Menton",
          existingPlaceId: "flowy-coffee-coworking-menton",
          imageStatus: "pending",
        },
      ],
      availableAssetFiles: ["cover.png", "Jean-Luc Pele.png"],
    });

    expect(plan.operations.map((operation) => operation.destinationPath)).toEqual([
      "public/images/guide/best-coffee-menton.png",
      "public/images/guide/jean-luc-pele-menton.png",
    ]);
    expect(plan.issues.map((issue) => issue.code)).toContain("pending-place-asset");
    expect(plan.matchedAssetFiles).toEqual(["Jean-Luc Pele.png", "cover.png"]);
    expect(plan.unmatchedAssetFiles).toEqual([]);
    expect(plan.expectedCoverAsset).toBe(true);
    expect(plan.missingExpectedCoverAsset).toBe(false);
    expect(plan.expectedAssetPlaceIds).toEqual(["jean-luc-pele-menton"]);
    expect(plan.missingExpectedAssetPlaceIds).toEqual([]);
  });

  it("reports unused files and missing expected assets", () => {
    const plan = resolveGuideAssetPlan({
      slug: "best-tea-menton",
      intakeTitle: "Best Tea in Menton",
      coverImageStatus: "provided",
      assetsDirectory: "/tmp/assets",
      plannedPlaces: [
        {
          draftName: "Tea Room One",
          newPlaceId: "tea-room-one",
          imageStatus: "provided",
        },
      ],
      availableAssetFiles: ["extra.png"],
    });

    expect(plan.matchedAssetFiles).toEqual([]);
    expect(plan.unmatchedAssetFiles).toEqual(["extra.png"]);
    expect(plan.expectedCoverAsset).toBe(true);
    expect(plan.missingExpectedCoverAsset).toBe(true);
    expect(plan.expectedAssetPlaceIds).toEqual(["tea-room-one"]);
    expect(plan.missingExpectedAssetPlaceIds).toEqual(["tea-room-one"]);
    expect(plan.issues.map((issue) => issue.code)).toEqual(expect.arrayContaining(["missing-cover-asset", "missing-place-asset"]));
  });

  it("accepts existing repo imagery without expecting a new asset file", () => {
    const plan = resolveGuideAssetPlan({
      slug: "burgers-menton",
      plannedPlaces: [
        {
          draftName: "All's Stars",
          existingPlaceId: "alls-stars-menton",
          imageStatus: "existing",
        },
      ],
      existingPlaceImages: {
        "alls-stars-menton": "/images/guide/alls-stars-menton.jpg",
      },
      availableAssetFiles: ["unused.png"],
    });

    expect(plan.operations).toEqual([]);
    expect(plan.issues).toEqual([]);
    expect(plan.expectedAssetPlaceIds).toEqual([]);
    expect(plan.missingExpectedAssetPlaceIds).toEqual([]);
    expect(plan.unmatchedAssetFiles).toEqual(["unused.png"]);
  });
});
