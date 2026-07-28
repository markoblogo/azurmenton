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
  });
});
