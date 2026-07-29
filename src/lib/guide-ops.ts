import { buildGuideOperatorSummary } from "@/lib/guide-operator-summary";

export type GuideOpsIntakeSnapshot = {
  slug: string;
  hasIntake: boolean;
  hasPublicationPlan: boolean;
  hasCheckReport: boolean;
  publishReady: boolean | null;
  publishHeadline?: string | null;
  publishBlockers?: string[];
  reviewOk: boolean | null;
  reviewHeadline?: string | null;
  reviewOpenItems?: string[];
};

export type GuideOpsItemStatus = "ready" | "blocked" | "incomplete";

export type GuideOpsItem = {
  slug: string;
  status: GuideOpsItemStatus;
  headline: string;
  nextAction: string;
};

export type GuideOpsSummary = {
  operatorSummary: string[];
  counts: {
    ready: number;
    blocked: number;
    incomplete: number;
    total: number;
  };
  items: GuideOpsItem[];
};

export function buildGuideOpsSummary(snapshots: GuideOpsIntakeSnapshot[], options?: { reportPath?: string }): GuideOpsSummary {
  const items = snapshots
    .map((snapshot): GuideOpsItem => {
      if (snapshot.reviewOk === true && snapshot.publishReady === true) {
        return {
          slug: snapshot.slug,
          status: "ready",
          headline: snapshot.reviewHeadline ?? snapshot.publishHeadline ?? "Ready for owner visual review or archive.",
          nextAction: "Use review/owner-checklist.md for final visual pass, then continue with content work.",
        };
      }

      if (snapshot.reviewOk === false) {
        return {
          slug: snapshot.slug,
          status: "blocked",
          headline: snapshot.reviewHeadline ?? "Post-merge review still has open issues.",
          nextAction: snapshot.reviewOpenItems?.[0] ?? "Resolve review open items, then re-run npm run guide:review -- --slug <slug>.",
        };
      }

      if (snapshot.publishReady === false) {
        return {
          slug: snapshot.slug,
          status: "blocked",
          headline: snapshot.publishHeadline ?? "Publish gate is still blocked.",
          nextAction: snapshot.publishBlockers?.[0] ?? "Resolve publish blockers, then re-run npm run guide:publish -- --slug <slug>.",
        };
      }

      if (!snapshot.hasPublicationPlan) {
        return {
          slug: snapshot.slug,
          status: "incomplete",
          headline: "Publication plan is missing.",
          nextAction: "Run guide:new or restore publication-plan.json before continuing.",
        };
      }

      if (!snapshot.hasCheckReport) {
        return {
          slug: snapshot.slug,
          status: "incomplete",
          headline: "Guide check has not been run yet.",
          nextAction: "Run npm run guide:check -- --slug <slug>.",
        };
      }

      if (snapshot.publishReady === null) {
        return {
          slug: snapshot.slug,
          status: "incomplete",
          headline: "Publish gate has not been run yet.",
          nextAction: "Run npm run guide:publish -- --slug <slug>.",
        };
      }

      return {
        slug: snapshot.slug,
        status: "incomplete",
        headline: "Review has not been run yet.",
        nextAction: "Run npm run guide:review -- --slug <slug> after manual merge.",
      };
    })
    .sort((a, b) => {
      const rank: Record<GuideOpsItemStatus, number> = { blocked: 0, incomplete: 1, ready: 2 };
      return rank[a.status] - rank[b.status] || a.slug.localeCompare(b.slug);
    });

  const counts = {
    ready: items.filter((item) => item.status === "ready").length,
    blocked: items.filter((item) => item.status === "blocked").length,
    incomplete: items.filter((item) => item.status === "incomplete").length,
    total: items.length,
  };

  return {
    operatorSummary: buildGuideOperatorSummary({
      status: counts.blocked ? "needs-attention" : "ok",
      subject: "guide-intake",
      mode: "guide-ops",
      counts,
      reportPath: options?.reportPath,
    }),
    counts,
    items,
  };
}
