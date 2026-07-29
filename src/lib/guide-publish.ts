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
  blocked: Array<{
    scope: "intake" | "check" | "assets" | "apply" | "publish";
    code: string;
    message: string;
  }>;
  autoResolved: string[];
  manualActions: string[];
  assets: GuidePublishAssetsState;
  summary: {
    plannedPlaceCount: number;
    newPlaceCount: number;
    existingPlaceCount: number;
    relatedArticleCount: number;
    relatedApartmentCount: number;
  };
  operator: {
    status: "ready" | "blocked";
    headline: string;
    counts: {
      blockers: number;
      warnings: number;
      autoResolved: number;
      manualActions: number;
    };
    blockedTop: string[];
    warningTop: string[];
    autoResolvedTop: string[];
    nextManualActions: string[];
  };
};

type GuidePublishBlockedScope = "intake" | "check" | "assets" | "apply" | "publish";

function toIssue(issue: GuideCheckIssue | GuideAssetPlanIssue): GuidePublishIssue {
  return {
    severity: issue.severity,
    code: issue.code,
    message: issue.message,
  };
}

function summarizeIssue(issue: GuidePublishIssue) {
  return `[${issue.code}] ${issue.message}`;
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
  const autoResolved: string[] = [];
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
  if (input.publicationPlan.coverImageStatus === "existing") {
    autoResolved.push("Cover already resolved from an existing public guide asset.");
  }
  if (coverExpected && !input.resolvedCoverImage) {
    blockers.push({
      severity: "error",
      code: "missing-published-cover-asset",
      message: `Cover is marked as provided but no public guide cover asset is currently resolved for ${input.slug}.`,
    });
  }

  if (coverExpected && input.resolvedCoverImage) {
    autoResolved.push(`Cover resolved at ${input.resolvedCoverImage}.`);
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

      if (expected && publicPath) {
        autoResolved.push(`Place image resolved for ${placeId} at ${publicPath}.`);
      }
      if (plannedPlace.existingPlaceId) {
        autoResolved.push(`Existing place match confirmed for ${plannedPlace.existingPlaceId}.`);
      }
      if (plannedPlace.newPlaceId && !plannedPlace.existingPlaceId) {
        autoResolved.push(`New place scaffold prepared for ${plannedPlace.newPlaceId}.`);
      }

      return {
        placeId,
        expected,
        resolved: Boolean(publicPath),
        publicPath,
      };
    })
    .filter(Boolean) as GuidePublishAssetsState["places"];

  if ((input.publicationPlan.relatedArticleSlugs ?? []).length) {
    autoResolved.push(`Related guides planned: ${(input.publicationPlan.relatedArticleSlugs ?? []).join(", ")}.`);
  }

  if ((input.publicationPlan.relatedApartmentSlugs ?? []).length) {
    autoResolved.push(`Apartment CTA planned: ${(input.publicationPlan.relatedApartmentSlugs ?? []).join(", ")}.`);
  }

  if (plannedPlaces.some((plannedPlace) => plannedPlace.coverageGuideSlug)) {
    autoResolved.push("Specialist place coverage slugs are present in the publication plan.");
  }

  const blocked = blockers.map((issue) => {
    let scope: GuidePublishBlockedScope = "publish";
    if (issue.code.includes("cover") || issue.code.includes("place-asset")) scope = "assets";
    else if (issue.code === "apply-not-ready") scope = "apply";
    else if (issue.code.startsWith("missing-") || issue.code.startsWith("invalid-") || issue.code.includes("related-") || issue.code.includes("map-")) scope = "check";

    return {
      scope,
      code: issue.code,
      message: issue.message,
    };
  });

  const manualActionsRaw = blockers.length
    ? [
        "Resolve every blocked item listed in publish-report.json.",
        "Re-run npm run guide:publish -- --slug <slug> until ready becomes yes.",
      ]
    : [
        `Insert build/guide-intake/<slug>/apply/guide-article.snippet.txt into src/content/guide.ts.`,
        `Insert build/guide-intake/<slug>/apply/places-raw.snippet.txt into src/content/places.ts if new place objects are required.`,
        `Apply backlinks, guideCoverageSlugs and visual field merges from build/guide-intake/<slug>/patch/existing-place-updates.json.`,
        "Run content preflight and build before commit.",
        "Run guide:review after the manual merge.",
      ];

  const manualActions = [...new Set(manualActionsRaw)].slice(0, 5);

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
    blocked,
    autoResolved: [...new Set(autoResolved)],
    manualActions,
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
    operator: {
      status: blockers.length === 0 ? "ready" : "blocked",
      headline:
        blockers.length === 0
          ? `Ready to merge ${input.slug}: ${plannedPlaces.length} planned places, ${input.applyArtifacts.summary.newPlaceIds.length} new, ${input.applyArtifacts.summary.existingPlaceIds.length} existing updates.`
          : `Blocked: ${blockers.length} blocker${blockers.length === 1 ? "" : "s"} remain before ${input.slug} can be merged.`,
      counts: {
        blockers: blockers.length,
        warnings: warnings.length,
        autoResolved: [...new Set(autoResolved)].length,
        manualActions: manualActions.length,
      },
      blockedTop: blockers.slice(0, 5).map(summarizeIssue),
      warningTop: warnings.slice(0, 3).map(summarizeIssue),
      autoResolvedTop: [...new Set(autoResolved)].slice(0, 5),
      nextManualActions: manualActions.slice(0, 5),
    },
  };
}
