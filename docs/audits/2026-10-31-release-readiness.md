# Release 0.3.0: Maintenance Audit

Date: 31 October 2026. Baseline: `cc5add7eb7292fce65ff3bf605a20bd3914c1b64`, the published creative-workshops guide. Scope: repository hygiene, current operating documentation, editorial/report consistency, dependency review and release verification. No booking, DNS, mail-provider, Telegram or subscription configuration changes.

## Findings Addressed

1. README duplicated detailed runbooks and stale ecosystem versions; it is now a compact entrypoint backed by `docs/README.md`. Replaced first-launch checkmarks and setup-oriented deployment instructions with reusable release gates. Corrected the BCC fallback contradiction in deployment, email setup and the environment example. Dated evidence and media history are retained, not relabelled as current.
2. The content report called 15 event-only venues orphan places because it checked only guide backlinks. Reporting now uses actual incoming guide-section, guide-level, event and event-venue references. The regression test preserves the distinction between an event-only venue and a genuinely unused place; no artificial guide links were added.
3. Link-plan refresh could remove reviewed editorial choices. Optional `approvedRelatedArticleSlugs` / `approvedRelatedApartmentSlugs` survive ranking changes while stale automatic suggestions can still be removed. These fields pin editorial links, not publication approval or availability. Normal reference checks still apply.
4. Added `docs:check` to CI and guide checks. It validates local Markdown link targets and documented npm script names across active root/docs Markdown, excluding historical `docs/archive`. It does not fetch external sites or certify prose accuracy.
5. Added `release:check`, sharing check definitions and input-bound receipt logic with the manual guide workflow. It adds native metadata, the production dependency gate and fresh production browser tests. The security audit always reruns even when other checks can reuse valid receipts. It neither commits nor deploys. Browser evidence, Python caches and temporary working media are explicitly ignored rather than deleted.

The version-only npm lockfile regeneration removed Linux `libc` filters. The native metadata guard reproduced the error before release; the lockfile was regenerated from the unchanged baseline dependency graph with only root version fields updated. The native guard again validates 27 production Sharp packages and 48 libc filters. No dependency downgrade or force audit fix was applied.

## Content Snapshot

The local release trial exposed slow serial hashing of the complete media tree before any check output. Fingerprinting now reports its stage and uses eight bounded IO workers, preserving deterministic byte hashes, missing-file detection and symlink rejection; no timestamp-only shortcut or reduced validation was introduced. Timing remains machine/storage-dependent.

Current report: 102 guides, 606 places, 119 events and three apartments. Zero missing apartment CTAs, place backlink gaps, canonical coverage gaps, orphan guides, orphan places or expired featured events. Nine new workshop places intentionally await requested owner illustrations. Existing media is not replaced.

The report still has 34 editorial review items, including 18 guides outside the current intent-cluster model; that is not evidence of broken links or a reason to pad unrelated collections. The separate event review reports zero high-risk, missing-source and stale-source items, with nine pending-review records plus historical/annual-review notices. Do not delete archived events merely to silence these reports. Guide-count thresholds alone do not complete the roadmap's quality gates.

## Dependency Review

The full dependency audit reports 16 moderate affected package entries caused by one transitive development-tool issue: [minimatch glob-pattern amplification, GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). The advisory lists versions below 11.0.1 as affected. Installed ESLint consumers use minimatch 3.x and 10.x; a blanket override to the changed 11.x API is not a proven compatible repair. The audit's suggested force operation would downgrade ESLint/Next tooling and is rejected.

No high or critical dependency entries were found in the full audit at review time. The separate production audit is enforced by the release runner and CI. This is not a claim of zero development vulnerabilities, a penetration test or proof against unpublished advisories. Follow up when upstream-compatible fixes are available; never accept untrusted remote glob configuration in local lint tooling.

## Verification And Publication Gates

Baseline local proof: 454 unit and 71 browser tests passed, with four public workshop locales and the production commit verified. The changed release tree must pass `npm run release:check -- --webpack`; actual outcomes/logs are retained privately in `build/release/checks.json`, not inferred from this document. The final CI, deployed SHA, public smoke result and release tag must be verified after publication. See the [release checklist](../../LAUNCH_CHECKLIST.md).

This maintenance pass does not independently reverify every factual claim in 102 guides, every archived event, real inbox delivery, field Core Web Vitals, native-language quality or image rights. Existing dated audits remain the evidence for their original scope. Telegram delivery remains deferred; original manuscripts, illustrations, intake packets and prior browser evidence are retained.
