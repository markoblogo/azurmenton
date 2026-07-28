import { describe, expect, it } from "vitest";

import { buildGuideAssetPlan, parsePlaceAssetArgs } from "../../src/lib/guide-assets";

describe("guide assets planning", () => {
  it("builds cover and place copy operations into guide image paths", () => {
    const plan = buildGuideAssetPlan({
      slug: "burgers-menton",
      coverPathHint: "/tmp/cover.jpeg",
      placeAssets: [{ placeId: "alls-stars-menton", sourcePath: "/tmp/alls-stars.PNG" }],
    });

    expect(plan).toEqual([
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

  it("parses repeated place asset arguments", () => {
    expect(parsePlaceAssetArgs(["alls-stars-menton=/tmp/a.png", "le-galion-menton=/tmp/b.jpg"])).toEqual([
      { placeId: "alls-stars-menton", sourcePath: "/tmp/a.png" },
      { placeId: "le-galion-menton", sourcePath: "/tmp/b.jpg" },
    ]);
  });
});

