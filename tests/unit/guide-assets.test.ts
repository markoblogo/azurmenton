import { describe, expect, it } from "vitest";

import {
  buildGuideAssetPlan,
  buildGuideAssetsPersistentSummary,
  buildPublishedGuideAssetsRerunCommand,
  parsePlaceAssetArgs,
  resolveGuideAssetPlan,
  suggestPublishedGuideTargets,
} from "../../src/lib/guide-assets";

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

  it("ignores stale legacy cover hints when the publication plan already treats cover as existing", () => {
    const plan = resolveGuideAssetPlan({
      slug: "ramen-near-menton-the-best-bowls-in-menton-monaco-nice",
      outputSlug: "ramen-near-menton",
      coverPathHint: "/missing/legacy-cover.png",
      coverImageStatus: "existing",
      availableAssetFiles: ["cover.png"],
    });

    expect(plan.operations).toEqual([]);
    expect(plan.expectedCoverAsset).toBe(false);
    expect(plan.missingExpectedCoverAsset).toBe(false);
    expect(plan.issues).toEqual([]);
    expect(plan.unmatchedAssetFiles).toEqual(["cover.png"]);
  });

  it("accepts explicit place overrides even when a place is outside the intake publication plan", () => {
    const plan = resolveGuideAssetPlan({
      slug: "cheap-eats-intake-slug",
      placeAssetOverrides: [{ placeId: "la-cantine-des-copains-nice", sourcePath: "/tmp/copains.png" }],
      knownPlaces: [{ id: "la-cantine-des-copains-nice", name: "La Cantine des Copains" }],
    });

    expect(plan.operations).toEqual([
      {
        kind: "place",
        sourcePath: "/tmp/copains.png",
        destinationPath: "public/images/guide/la-cantine-des-copains-nice.png",
        publicPath: "/images/guide/la-cantine-des-copains-nice.png",
      },
    ]);
    expect(plan.matchedPlaces).toEqual([
      {
        placeId: "la-cantine-des-copains-nice",
        draftName: "La Cantine des Copains",
        sourcePath: "/tmp/copains.png",
        destinationPath: "public/images/guide/la-cantine-des-copains-nice.png",
      },
    ]);
  });

  it("supports published-guide mode, blocks duplicate cover creation and reports remaining missing place images", () => {
    const plan = resolveGuideAssetPlan({
      slug: "cheap-eats-intake-slug",
      outputSlug: "cheap-eats-menton-budget-lunch",
      assetsDirectory: "/tmp/assets",
      availableAssetFiles: ["cover.png", "Mont Gout.png"],
      publishedGuide: {
        slug: "cheap-eats-menton-budget-lunch",
        intakeTitle: "Cheap Eats in Menton",
        coverImage: "/images/guide/cheap-eats-menton-budget-lunch.png",
        places: [
          { placeId: "mont-gout-menton", draftName: "Mont Goût" },
          { placeId: "chez-les-grecs-monaco", draftName: "Chez Les Grecs" },
          { placeId: "la-pescaria-de-menton", draftName: "La Pescaria de Menton", image: "/images/guide/la-pescaria-de-menton.jpg" },
        ],
      },
      knownPlaces: [
        { id: "mont-gout-menton", name: "Mont Goût" },
        { id: "chez-les-grecs-monaco", name: "Chez Les Grecs" },
        { id: "la-pescaria-de-menton", name: "La Pescaria de Menton", image: "/images/guide/la-pescaria-de-menton.jpg" },
      ],
      existingPlaceImages: {
        "la-pescaria-de-menton": "/images/guide/la-pescaria-de-menton.jpg",
      },
    });

    expect(plan.operations).toEqual([
      {
        kind: "place",
        sourcePath: "/tmp/assets/Mont Gout.png",
        destinationPath: "public/images/guide/mont-gout-menton.png",
        publicPath: "/images/guide/mont-gout-menton.png",
      },
    ]);
    expect(plan.issues.map((issue) => issue.code)).not.toContain("published-guide-cover-already-exists");
    expect(plan.unmatchedAssetFiles).toEqual(["cover.png"]);
    expect(plan.matchedPlaces).toEqual([
      {
        placeId: "mont-gout-menton",
        draftName: "Mont Goût",
        sourcePath: "/tmp/assets/Mont Gout.png",
        destinationPath: "public/images/guide/mont-gout-menton.png",
      },
    ]);
    expect(plan.publishedGuidePlacesWithoutImage).toEqual([{ placeId: "chez-les-grecs-monaco", draftName: "Chez Les Grecs" }]);
  });

  it("supports missing-only by skipping already-covered published guide places", () => {
    const plan = resolveGuideAssetPlan({
      slug: "cheap-eats-intake-slug",
      outputSlug: "cheap-eats-menton-budget-lunch",
      assetsDirectory: "/tmp/assets",
      availableAssetFiles: ["Mont Gout.png", "La Pescaria de Menton.png"],
      publishedGuide: {
        slug: "cheap-eats-menton-budget-lunch",
        intakeTitle: "Cheap Eats in Menton",
        places: [
          { placeId: "mont-gout-menton", draftName: "Mont Goût" },
          { placeId: "la-pescaria-de-menton", draftName: "La Pescaria de Menton", image: "/images/guide/la-pescaria-de-menton.jpg" },
        ],
      },
      knownPlaces: [
        { id: "mont-gout-menton", name: "Mont Goût" },
        { id: "la-pescaria-de-menton", name: "La Pescaria de Menton", image: "/images/guide/la-pescaria-de-menton.jpg" },
      ],
      existingPlaceImages: {
        "la-pescaria-de-menton": "/images/guide/la-pescaria-de-menton.jpg",
      },
      missingOnly: true,
    });

    expect(plan.operations).toEqual([
      {
        kind: "place",
        sourcePath: "/tmp/assets/Mont Gout.png",
        destinationPath: "public/images/guide/mont-gout-menton.png",
        publicPath: "/images/guide/mont-gout-menton.png",
      },
    ]);
    expect(plan.skippedAlreadyCoveredPlaces).toEqual([{ placeId: "la-pescaria-de-menton", draftName: "La Pescaria de Menton" }]);
    expect(plan.unmatchedAssetFiles).toEqual(["La Pescaria de Menton.png"]);
  });

  it("suggests likely published guides when an asset package matches another guide better", () => {
    const suggestions = suggestPublishedGuideTargets({
      assetFiles: [
        "Cannes Fréjus skydiving.png",
        "French Riviera sightseeing flights.png",
        "Gourdon paragliding area.png",
        "Italian Riviera paragliding clubs.png",
        "Nice region skydiving.png",
        "Roquebrune Menton paragliding area.png",
      ],
      guides: [
        {
          slug: "airports-near-menton-live-flights",
          relatedPlaces: ["nice-cote-dazur-airport"],
          sections: [],
        },
        {
          slug: "air-adventures-near-menton",
          relatedPlaces: [
            "french-riviera-sightseeing-flights",
            "roquebrune-menton-paragliding-area",
            "gourdon-paragliding-area",
            "nice-region-skydiving",
            "cannes-frejus-skydiving",
            "italian-riviera-paragliding-clubs",
          ],
          sections: [],
        },
      ],
      places: [
        { id: "nice-cote-dazur-airport", name: "Nice Côte d'Azur Airport", image: "/images/guide/nice-cote-dazur-airport.jpg" },
        { id: "french-riviera-sightseeing-flights", name: "French Riviera sightseeing flights" },
        { id: "roquebrune-menton-paragliding-area", name: "Roquebrune & Menton paragliding area" },
        { id: "gourdon-paragliding-area", name: "Gourdon paragliding area" },
        { id: "nice-region-skydiving", name: "Nice region skydiving" },
        { id: "cannes-frejus-skydiving", name: "Cannes & Fréjus skydiving" },
        { id: "italian-riviera-paragliding-clubs", name: "Italian Riviera paragliding clubs" },
      ],
      missingOnly: true,
    });

    expect(suggestions[0]).toEqual({
      guideSlug: "air-adventures-near-menton",
      matchedAssetFiles: [
        "French Riviera sightseeing flights.png",
        "Roquebrune Menton paragliding area.png",
        "Gourdon paragliding area.png",
        "Nice region skydiving.png",
        "Cannes Fréjus skydiving.png",
        "Italian Riviera paragliding clubs.png",
      ],
      matchedPlaceIds: [
        "french-riviera-sightseeing-flights",
        "roquebrune-menton-paragliding-area",
        "gourdon-paragliding-area",
        "nice-region-skydiving",
        "cannes-frejus-skydiving",
        "italian-riviera-paragliding-clubs",
      ],
    });
  });

  it("builds a rerun command for published-guide asset recovery", () => {
    expect(
      buildPublishedGuideAssetsRerunCommand({
        guideSlug: "air-adventures-near-menton",
        assetsDir: "/tmp/assets",
        missingOnly: true,
        reportOnly: true,
        failOnUnmatched: true,
      }),
    ).toBe(
      "npm run guide:assets -- --published-guide air-adventures-near-menton --assets-dir /tmp/assets --missing-only --report-only --fail-on-unmatched",
    );
  });

  it("builds a sanitized persistent post-publish summary", () => {
    expect(
      buildGuideAssetsPersistentSummary({
        slug: "airports-near-menton-live-flights",
        strict: false,
        missingOnly: true,
        reportOnly: true,
        failOnUnmatched: false,
        matchedAssetFiles: [],
        unmatchedAssetFiles: ["French Riviera sightseeing flights.png"],
        matchedPlaces: [],
        skippedAlreadyCoveredPlaces: [{ placeId: "nice-cote-dazur-airport" }],
        publishedGuidePlacesWithoutImage: [],
        likelyGuideTargets: [
          {
            guideSlug: "air-adventures-near-menton",
            matchedAssetFiles: ["French Riviera sightseeing flights.png"],
            matchedPlaceIds: ["french-riviera-sightseeing-flights"],
            rerunCommand:
              "npm run guide:assets -- --published-guide air-adventures-near-menton --assets-dir /tmp/assets --missing-only --report-only",
          },
        ],
        bestRerunCommand:
          "npm run guide:assets -- --published-guide air-adventures-near-menton --assets-dir /tmp/assets --missing-only --report-only",
        issues: [],
      }),
    ).toEqual({
      slug: "airports-near-menton-live-flights",
      mode: "published-guide",
      strict: false,
      missingOnly: true,
      reportOnly: true,
      failOnUnmatched: false,
      counts: {
        matched: 0,
        unmatched: 1,
        skippedCovered: 1,
        stillMissing: 0,
      },
      matchedAssetFiles: [],
      unmatchedAssetFiles: ["French Riviera sightseeing flights.png"],
      matchedPlaceIds: [],
      publishedGuidePlacesWithoutImage: [],
      likelyGuideTargets: [
        {
          guideSlug: "air-adventures-near-menton",
          matchedAssetFiles: ["French Riviera sightseeing flights.png"],
          matchedPlaceIds: ["french-riviera-sightseeing-flights"],
          rerunCommand:
            "npm run guide:assets -- --published-guide air-adventures-near-menton --assets-dir /tmp/assets --missing-only --report-only",
        },
      ],
      bestRerunCommand:
        "npm run guide:assets -- --published-guide air-adventures-near-menton --assets-dir /tmp/assets --missing-only --report-only",
      issueCodes: [],
    });
  });
});
