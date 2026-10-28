# Belle Époque publication: second workflow refinement

## What the Roya cycle established

The final Roya illustration pass matched all six stable-ID filenames without
manual mapping. Safe apply verified the six records, and a subsequent rerun copied
nothing. There is no evidence that a new image-matching subsystem is needed.

The expensive remaining work was editorial source/translation review, manual
post-insert plan reconciliation, repeated metadata cleanup and a brittle test
which assumed Roya would remain the globally newest guide forever.

## Changes exercised with the Belle Époque source

- `Duration` and `Last researched` are now service fields in intake and compilation.
  The first extracted paragraph is the real article introduction.
  Compilation removes these labels only in the preamble: duration paragraphs in
  the actual route sections are preserved and covered by regression tests.
- Advice headings such as `Access`, `What to look for`, route variants and access
  classifications no longer become place candidates. This source went from 26
  candidates (mostly false venues) to four genuine named subheading candidates.
  Main-section venues still receive an editorial selection, not an automatic guess.
- `guide:review -- --slug <slug> --sync-plan-from-published` explicitly snapshots
  the inserted repository content into its intake plan before reviewing it.
  This replaces the one-off reconciliation used for Roya. It retains the original
  plan in `publication-plan.before-sync.json`, leaves public content untouched,
  refuses unknown rendered IDs and preserves already declared new-place decisions.
  Required map review without evidence remains unresolved rather than being marked
  as unnecessary. This flag reads the local graph, not the deployed website.
- Historical article tests use fixed publication cohorts. A future guide no longer
  requires changing yesterday's test merely because the NEW slot has advanced.
- The shared locale compiler and Markdown adapter are reused without a new
  article-specific parser. Cover assets are imported in intake mode before release.

## Operator sequence

```bash
npm run guide:new -- --from /absolute/source.docx --cover /absolute/cover.png
# Review sources, translations, place identities and insert the reviewed content.
npm run guide:compile -- --slug <public-slug> --prefix <source-prefix>
npm run guide:assets -- --slug <public-slug> --cover /absolute/cover.png
npm run guide:review -- --slug <public-slug> --sync-plan-from-published
```

Use sync only after editorial integration. It replaces the old plan's guessed
place set with the guide's actual rendered set; inspect the saved original for
intentional omissions. Default guide:review behavior remains unchanged.

Run unit/type/content/image checks, one production build, then desktop/mobile
browser checks. After commit/push verify CI, the exact deployment status, live
translations, image decoding and the NEW card. Do not run read/review commands
against an image batch while safe apply is still writing.

## Next illustration pass

Request `<placeId>.png` only for missing pictures. Reuse the established
published-guide report-only → safe-apply → post-apply review path. The six new
architectural places are explicit objects and cannot receive the article cover as
a substitute illustration. Four existing place illustrations remain unchanged.

No paid translation service was added. Structural checks do not certify language
quality, access rights, historical accuracy or actual walking gradients. There is
no comparable cost/time baseline, so no percentage or monetary saving is claimed.

## Illustration pass

The six owner-supplied stable-ID PNGs matched automatically without overrides or
unused files. Safe apply copied the six assets, generated AVIF/WebP derivatives
and verified all six place image fields. The existing cover and four illustrated
places were not replaced. The normal published-guide workflow was reused without
new code or manual insertion of image fields.
