import type { GuideApplyArtifacts } from "@/lib/guide-apply";
import type { GuideAssetPlanIssue } from "@/lib/guide-assets";
import type { GuideCheckIssue, GuideCheckReport, GuidePublicationPlan } from "@/lib/guide-check";

export type GuidePublishIssue = {
  severity: "error" | "warning";
  code: string;
  message: string;
};

export type GuidePublishAssetsState = {
  cover: {
    expected: boolean;
    resolved: boolean;
    publicPath?: string;
  };
  places: Array<{
    placeId: string;
    expected: boolean;
    resolved: boolean;
    publicPath?: string;
  }>;
};

export type GuidePublishReport = {
  slug: string;
  ready: boolean;
  blockers: GuidePublishIssue[];
  warnings: GuidePublishIssue[];
  nextSteps: string[];
  assets: GuidePublishAssetsState;
  summary: {
    plannedPlaceCount: number;
    newPlaceCount: number;
    existingPlaceCount: number;
    relatedArticleCount: number;
    relatedApartmentCount: number;
  };
};

function toIssue(issue: GuideCheckIssue | GuideAssetPlanIssue): GuidePublishIssue {
  return {
    severity: issue.severity,
    code: issue.code,
    message: issue.message,
  };
}

export function buildGuidePublishReport(input: {
  slug: string;
  publicationPlan: GuidePublicationPlan;
  checkReport: GuideCheckReport;
  applyArtifacts: GuideApplyArtifacts;
  assetsReport?: { issues?: GuideAssetPlanIssue[] } | null;
  resolvedCoverImage?: string;
  resolvedPlaceImages?: Record<string, string>;
}): GuidePublishReport {
  const blockers: GuidePublishIssue[] = [];
  const warnings: GuidePublishIssue[] = [];
  const resolvedPlaceImages = input.resolvedPlaceImages ?? {};

  for (const issue of input.checkReport.errors) blockers.push(toIssue(issue));
  for (const issue of input.checkReport.warnings) warnings.push(toIssue(issue));
  for (const issue of input.assetsReport?.issues ?? []) {
    if (issue.severity === "error") blockers.push(toIssue(issue));
    else warnings.push(toIssue(issue));
  }

  if (!input.applyArtifacts.summary.ready) {
    blockers.push({
      severity: "error",
      code: "apply-not-ready",
      message: "guide:apply artifacts are not ready because blocking guide:check errors remain.",
    });
  }

  const plannedPlaces = input.publicationPlan.plannedPlaces ?? [];
  const coverExpected = input.publicationPlan.coverImageStatus === "provided";
  if (coverExpected && !input.resolvedCoverImage) {
    blockers.push({
      severity: "error",
      code: "missing-published-cover-asset",
      message: `Cover is marked as provided but no public guide cover asset is currently resolved for ${input.slug}.`,
    });
  }

  const placeAssets: GuidePublishAssetsState["places"] = plannedPlaces
    .map((plannedPlace) => {
      const placeId = plannedPlace.existingPlaceId ?? plannedPlace.newPlaceId;
      if (!placeId) return null;
      const expected = plannedPlace.imageStatus === "provided" || plannedPlace.imageStatus === "existing";
      const publicPath = resolvedPlaceImages[placeId];
      if (expected && !publicPath) {
        blockers.push({
          severity: "error",
          code: "missing-published-place-asset",
          message: `Place ${placeId} is marked as provided but no public guide illustration asset is currently resolved.`,
        });
      }

      return {
        placeId,
        expected,
        resolved: Boolean(publicPath),
        publicPath,
      };
    })
    .filter(Boolean) as GuidePublishAssetsState["places"];

  const nextSteps = blockers.length
    ? [
        "Resolve blocking publish-report issues.",
        "Re-run npm run guide:publish -- --slug <slug> until ready becomes true.",
      ]
    : [
        "Insert build/guide-intake/<slug>/apply/guide-article.snippet.txt into src/content/guide.ts.",
        "Insert place snippets and backlink updates from build/guide-intake/<slug>/apply/.",
        "Run content and build preflight before commit.",
      ];

  return {
    slug: input.slug,
    ready: blockers.length === 0,
    blockers,
    warnings,
    nextSteps,
    assets: {
      cover: {
        expected: coverExpected,
        resolved: Boolean(input.resolvedCoverImage),
        publicPath: input.resolvedCoverImage,
      },
      places: placeAssets,
    },
    summary: {
      plannedPlaceCount: plannedPlaces.length,
      newPlaceCount: input.applyArtifacts.summary.newPlaceIds.length,
      existingPlaceCount: input.applyArtifacts.summary.existingPlaceIds.length,
      relatedArticleCount: input.applyArtifacts.summary.relatedArticleSlugs.length,
      relatedApartmentCount: input.applyArtifacts.summary.relatedApartmentSlugs.length,
    },
  };
}
