# Guide Automation Workflow

This document defines the current semi-automated flow for publishing new Azur Menton guides and the remaining passes needed to finish the workflow cleanly.

## Current Command Chain

Use the commands in this order:

```bash
npm run guide:new -- --from /absolute/path/to/draft.txt [--cover /absolute/path/to/cover.png]
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
  - `intake.json`
  - `guide-scaffold.md`
  - `places-scaffold.md`
  - `publication-plan.json`

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
  - `patch/summary.json`
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

## Output Contract

`guide:patch` is intentionally not an auto-publisher.

It must remain:

- reviewable
- deterministic
- safe against accidental mutation of `src/content/*`

The operator still decides whether to apply the generated bundle.

## Remaining Passes To Finish This Automation Block

Keep the rest to two narrow passes plus the final owner visual sign-off.

### Pass 1: `guide:review v1`

Goal:
post-insert verification after the guide has been manually merged into the repo.

Status:
implemented

Why this matters:
it closes the gap between “patch bundle generated” and “content really landed correctly”.

### Pass 2: `guide:assets v3`

Goal:
make illustration handling stricter and faster.

Status:
implemented

Does:

- report which files from the provided asset package were matched
- report which files were left unused
- warn when a place expected an image but no asset matched
- optional `--strict` mode:
  - fail when unresolved expected assets remain
  - fail when the package contains extra unmatched files

Why this matters:
it removes the repeated manual uncertainty around whether every supplied image was actually consumed and turns incomplete or noisy image packages into an immediate pre-publication failure.

### Pass 3: `guide:review v2` visual handoff

Goal:
formalize the last non-automated step: editorial/visual confirmation.

Should do:

- generate a short owner-review checklist for:
  - cover correctness
  - place-card image correctness
  - wrong-image-on-wrong-place regressions
  - guide landing placement / NEW slot expectations
  - key guide page locale spot-check
- optionally store the checklist in `build/guide-intake/<slug>/review/`

Why this matters:
this is the only part that should remain human, but it should become structured instead of ad hoc.

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
