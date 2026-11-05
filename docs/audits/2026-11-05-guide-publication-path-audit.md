# Guide Publication Path: Structural Audit

## Scope and Evidence

Reviewed the Maria Serena publication from supplied DOCX/cover through research, four-language content, graph integration, local gates, PR/CI, deployment and public acceptance. This is an audit and migration proposal, not authorization to switch production storage, remove checks or introduce paid services.

Evidence: existing ignored `build/guide-intake/*/publication-timing.json`, immutable `workflow/checks.json`, preparation logs, current `scripts/guide-workflow.cjs`, `scripts/lib/guide-workflow.cjs`, `scripts/lib/project-checks.cjs`, `.github/workflows/ci.yml`, `src/content/guide.ts`, `src/content/places.ts`, `src/content/content-map.ts`, `src/app/[locale]/guide/[slug]/page.tsx`, `src/app/sitemap.ts`, `scripts/search-index.cjs` and the isolated runtime trial. No third-party account or booking writes.

`npm run guide:timing` now normalizes the three existing timing schemas and reports directly from these packets, without a second database or repository writes. Unknown labour/owner waits remain null. Reused gate durations retain an explicit historical label. End-to-end includes research, owner waits and orchestration; do not call it CPU time or compare different articles as controlled benchmarks.

## Baseline: Four Recent Publications

| Guide | Observed wall time | Local verification | Everything outside local verification |
| --- | ---: | ---: | ---: |
| Maigret | 76m23s | 18m23s | 58m00s |
| Winter 1–2 months | 80m38s | 18m23s | 62m14s |
| Michael Nelson | 74m19s | 14m06s | 60m13s |
| Sundays/holidays | 66m17s | 15m22s | 50m55s |

Rounded values; subtraction residuals are NOT active labour. Owner waiting was not independently measured. Even removing ALL local verification would yield only about 1.23–1.32x end-to-end, an unattainable safety-free upper bound, not 2x. Optimizing search writes by a few seconds cannot solve an hour-long path.

## Findings

1. **Editorial content is still executable application code.** Each guide adds Markdown, compiled JSON, a bespoke TS adapter, registration, collection membership, reciprocal graph mutations and a test. Repeated hand wiring is costly and makes a supposedly data-only release indistinguishable from code changes. The monolithic guide/place modules also increase context and regression work.
2. **The dominant unmeasured interval is before and around QA.** Sunday intake-to-final-verification start was 40m26s; the 50m55s non-QA residual also includes approval, publication and tool orchestration. It cannot be assigned wholly to translation. Our own repeated reads, staged commands, manual boilerplate and status polling are part of the path, not external blockers.
3. **Whole application work repeats across trust boundaries.** Local full QA builds/tests; PR CI runs complete release checks/build; preview builds; main CI and production build run after merge. CI and preview already overlap, so their durations must not be added blindly. Separate runtimes and artifacts mean green local logs cannot simply authorize skipping remote gates. The deployment chain has no promoted, verified artifact contract today.
4. **Illustration handling is mostly already targeted.** Explicit cover import and missing-only place attachment avoid whole-library regeneration; existing derivatives/cards are reused. Maria Serena needs only its cover and four existing illustrated cards. The long-term waste is making a later image attachment trigger an application release, not image encoding alone.
5. **Fingerprinting and Pagefind are bounded subproblems.** Two source fingerprints typically cost about 2–2.5 minutes together; local build ranges roughly 6–10 minutes. Search is a small fraction of that build. The rejected eight-writer experiment retained identical bytes but showed no speedup. The new export/write split is diagnostic evidence, not an optimization claim. Storage latency is a hypothesis requiring a controlled local-disk versus current-volume test, not something proved by the `/Volumes` pathname.
6. **The no-build experiment is not production readiness.** It uses a separate minimal renderer and temporary store, not catalogue, actual guide renderer, map, Pagefind, sitemap, apartment links and rollback. Reusing it directly would create an incomplete second publishing system.

## Recommended Structure

### Pass A: One Declarative Guide Package, Still Git-Backed

Use one versioned directory per article: schema-validated metadata, EN/FR/IT/UK Markdown and an explicit asset manifest. The existing Markdown compiler remains the parser. A single generic loader constructs GuideArticle values; registration, collections and reverse relationships are derived from reviewed forward links rather than patched in multiple modules. Do not auto-attach every mentioned place or infer location identity from headings. Bespoke interactions still need focused tests.

The same packet contains a short claim/source ledger, exact check date, accessible/blocked/unknown status and the editorial decision. Review source claims once, then translate the frozen text; do not research the same claim independently four times. Fresh operational hours still require current verification. Preserving uncertainty is quicker and more honest than repeatedly retrying inaccessible sources.

Generate the four adapters/metadata and graph diff together; validate all locales, references, Markdown and supplied assets before expensive gates. This removes repeated hand wiring, not human source review. After fixtures prove that packages cannot execute code, define a fail-closed content-only profile with exact path/dependency allowlists. Code, renderer, dependencies, scripts, schema or ambiguous changes must keep full release checks. Compare reduced/full results on representative ordinary, table-heavy, new-place and late-image packages before adoption.

Target to test, NOT a promise: prepared-and-approved ordinary article to verified public page in 10–20 minutes, with editorial research and owner wait reported separately. Merely deleting local QA cannot achieve this reliably; data-only integration and reduced duplication must both work.

### Pass B: Publish a Versioned Content Snapshot Without Rebuilding the App

Keep the same declarative package as the ONLY canonical content source; do not create a parallel CMS. Publish immutable, checksummed snapshots and content-addressed assets to an existing permitted durable store, with a reviewed manifest pointer. Hosting cost, quota and credentials must be verified before adoption; no new paid service is authorized here. Repo `public/` is build-time output, not a durable mutable production store.

Introduce a shared snapshot loader for the actual renderer, catalogue/collections, reciprocal graph, map, sitemap, schema and search. New slugs need runtime lookup rather than only the bundled `getGuideArticle`; updating `generateStaticParams` alone is insufficient. Pagefind must be generated for a snapshot (or a separately evaluated search replacement), with cache/version coherence. Later illustration publication updates the snapshot/asset manifest, not handwritten TS or an entire site build.

Validate and preview the exact snapshot, then atomically move the reviewed pointer. Require conditional compare-and-swap, idempotency, stale-write rejection, authenticated owner-only writes, bounded schema/path/size validation, complete locale/reference checks, audit receipt, read-after-write public verification and rollback to the previous snapshot. A rejected/missing snapshot must never silently publish a partial graph. Define availability/fallback and cache invalidation before migration. Keep app releases on full CI; content updates use their proved contract tests.

Target to test, NOT a measured forecast: 1–3 minutes from a prepared, approved package to coherent public content and 15–60 seconds for an existing-card illustration. Research/translation still takes real time. No-build publication removes the recurring build/deploy dependency, which is the route to multiples rather than seconds.

## Order and Acceptance

1. Finish Maria Serena on the existing approved path; freeze sources before QA. Record this audit's time separately where observable, without guessing active minutes.
2. Build Pass A's declarative loader and generated graph in an isolated migration with exact before/after output fixtures; no bulk content rewrite at first.
3. Prove fail-closed content-only checks against full checks; inspect actual diff paths, shared-place effects and all discovery surfaces. Do not declare current TS modules data-only.
4. Trial Pass B through the ACTUAL renderer with one new guide and its later image; test catalogue, search, sitemap, links, cache refresh, stale writes, partial failure, authorization and rollback before any production switch.
5. Compare paired cases: active preparation, source review, owner wait, machine validation, queue/build, public verification, retries and audit overhead. Set targets only after measured trials. One command should return a receipt plus next required human action, not launch another round of ad hoc polling.

Current release keeps every gate and production architecture unchanged. The only tooling addition is the report-only timing reader. Final Maria Serena outcomes and timestamps live in its existing ignored publication packet after verification; this audit does not pre-claim success.
