# Guide Automation Workflow

This document defines the current semi-automated flow for publishing new Azur Menton guides.

## Current Command Chain

Use the commands in this order:

```bash
npm run guide:new -- --from /absolute/path/to/draft.txt [--cover /absolute/path/to/cover.png]
npm run guide:match -- --slug <slug>
npm run guide:structure -- --slug <slug>
npm run guide:link-plan -- --slug <slug>
npm run guide:check -- --slug <slug>
npm run guide:assets -- --slug <slug> [--assets-dir /absolute/path/to/asset-package]
npm run guide:apply -- --slug <slug>
npm run guide:publish -- --slug <slug>
npm run guide:patch -- --slug <slug>
npm run guide:review -- --slug <slug>
```

## What Each Step Does

### `guide:new`

- creates `build/guide-intake/<slug>/`
- extracts title, slug, section headings, place candidates and related guide hints
- writes:
  - `draft.md`
  - `intake.json`
  - `structure.json`
  - `guide-scaffold.md`
  - `places-scaffold.md`
  - `publication-plan.json`

### `guide:match`

- re-runs place matching for an existing intake
- updates `publication-plan.json` with:
  - `matchStatus`
  - `suggestedExistingPlaceId`
  - `topMatches`
  - `matchReason`
- preserves already-entered editorial decisions such as:
  - `existingPlaceId`
  - `newPlaceId`
  - image status
  - map action
  - coverage guide slug
- writes `match-report.json`

### `guide:structure`

- rebuilds a section-aware structure from `draft.md`
- writes:
  - `structure.json`
  - `structure-scaffold.md`
- extracts:
  - intro paragraphs
  - section body paragraphs
  - place-card summaries under the right parent section
- `guide:apply` uses this when present so section snippets start from real draft prose instead of blank TODO-only bodies

### `guide:link-plan`

Reads `publication-plan.json` plus current repo content and adds a narrow suggestion layer:

- auto-suggest `relatedArticleSlugs`
- auto-suggest `relatedApartmentSlugs`
- backlink obligations for rendered places
- specialist coverage updates for canonical place guides
- required vs recommended vs noise-risk split

It writes:

- `build/guide-intake/<slug>/publication-plan.json` with `linkPlan`
- `build/guide-intake/<slug>/link-plan-report.json`

If `relatedArticleSlugs` or `relatedApartmentSlugs` are still empty, it also autofills them from the required/recommended suggestions.

### `guide:check`

- validates the draft before insertion
- checks:
  - required SEO fields
  - `publishedOn`
  - category
  - cover status
  - related guides / places / apartments
  - apartment CTA discipline
  - map-point or explicit exclusion discipline
  - specialist guide coverage backlinks
  - latest-guide landing slot logic
- writes `check-report.json`

### `guide:assets`

- resolves cover and place images from a supplied asset package
- copies source files into `public/images/guide/`
- updates derivative targets and generated manifest
- reports:
  - matched asset files
  - unused asset files left in the package
  - expected cover/place assets still missing
- supports optional `--strict` mode:
  - fails when expected assets were declared but not matched
  - fails when extra files remain unused in the package
- writes `assets-report.json`

### `guide:apply`

- builds repo-ready scaffolds from the validated intake
- writes:
  - `apply/guide-article.snippet.txt`
  - `apply/places-raw.snippet.txt`
  - `apply/place-visuals.snippet.txt`
  - `apply/integration-checklist.md`
  - `apply/summary.json`

### `guide:publish`

- acts as the final readiness gate before manual insertion
- recomputes `check-report` and `apply` outputs
- verifies that required public cover/place assets are actually resolved
- writes `publish-report.json`
- `ready: yes` means the intake is fit for manual insertion

### `guide:patch`

- requires a green `publish-report.json`
- collects the ready artifacts into one reviewable patch bundle
- writes:
  - `patch/content-bundle.md`
  - `patch/existing-place-updates.json`
  - `patch/summary.json`
- includes per-place update blocks for backlinks, specialist coverage and resolved visuals
- this is the handoff bundle for editing `src/content/guide.ts` and `src/content/places.ts`

### `guide:review`

- verifies the repo after the manual merge has actually happened
- checks only the touched content graph for the intake:
  - guide present in `src/content/guide.ts`
  - planned places present or updated in `src/content/places.ts`
  - backlinks and `guideCoverageSlugs`
  - map point / exclusion obligations
- writes:
  - `review/report.json`
  - `review/report.md`
  - `review/owner-checklist.md`

`owner-checklist.md` is the structured human handoff for:

- cover correctness
- place-image correctness
- wrong-image-on-wrong-place regressions
- guide landing / NEW slot expectations
- locale spot-check URLs

## Output Contract

`guide:patch` is intentionally not an auto-publisher.

It must remain:

- reviewable
- deterministic
- safe against accidental mutation of `src/content/*`

The operator still decides whether to apply the generated bundle.

## Automation Status

The guide automation block is now complete for repo-side preparation and validation:

- intake: `guide:new`
- validation: `guide:check`
- link planning: `guide:link-plan`
- asset resolution: `guide:assets` with optional strict package enforcement
- scaffold generation: `guide:apply`
- final readiness gate: `guide:publish`
- patch bundle generation: `guide:patch`
- post-merge verification plus owner visual handoff: `guide:review`

The only intentionally human step that remains is the owner visual pass driven by `review/owner-checklist.md`.

## End State

After these remaining passes, the workflow becomes:

1. intake
2. validation
3. assets
4. scaffold
5. publish gate
6. patch bundle
7. manual merge
8. review
9. owner visual approval

That is enough to stop treating each new guide as a one-off procedure while still keeping editorial control local.
