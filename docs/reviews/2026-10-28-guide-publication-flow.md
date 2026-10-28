# Guide publication flow: Christmas baseline and Roya trial

## Observed friction

- Word intake originally treated service metadata as prose. The Roya trial still
  selected `Recommended duration` as the introduction.
- Editorial H3 headings were treated as venues: walking difficulty, seasons,
  transport options and itinerary labels. This inflated matching work.
- Christmas required a one-off locale compiler and article-specific parser.
- Its five new places were initially represented as mapped tuples, which the
  safe image patcher could not target by explicit object ID.
- Only two of five illustration filenames matched automatically. Three needed
  explicit mappings, and an accounting defect initially reported mapped files as
  unused. That defect was fixed and tested in commit 25845b8.

## Improvements tested with Roya

1. Intake now separates duration/access-check metadata and excludes the observed
   non-venue headings. The trial extracts three real named attraction candidates;
   village and itinerary-card selection remains an editorial decision.
2. `guide:compile -- --slug <slug> --prefix <prefix>` compiles reviewed Markdown in
   EN/FR/IT/UK into deterministic JSON. It checks section counts, numbered section
   alignment and table dimensions before writing. No translation API is called.
3. A shared Markdown adapter preserves article paragraphs, tables and source
   links in the existing guide schema. New guides need no bespoke text parser.
   The browser trial also caught literal Word URL labels overflowing the mobile
   body. The adapter now renders these once as compact clickable source links;
   a regression test retains the exact destination URL.
4. New place records use explicit `id:` objects from the outset, compatible with
   the existing safe image apply/verify path. Their image fields remain absent
   until the owner supplies illustrations.
5. The second-stage illustration request uses stable `<placeId>.png` filenames.
   Existing pictures are reused; only genuinely missing illustrations are requested.

## Recommended two-stage procedure

Stage 1: DOCX + cover → intake → source review and editorial place decisions →
reviewed locale sources → compile → content integration and backlinks → cover
assets → tests/build → commit/push → CI/deployment and live-page verification.

Use intake mode to copy a supplied first cover before publication. Published-guide
mode intentionally does not replace existing cover metadata; do not interpret a
no-op as proof that the referenced source file exists. `content:lint` checks paths.

Stage 2: owner supplies `<placeId>.png` files → published-guide report-only →
safe apply → targeted post-apply verify → tests and derivative check → one
commit/push → live image decoding and visual confirmation.

```bash
npm run guide:assets -- --published-guide roya-valley-day-trip-from-menton --assets-dir /absolute/package --missing-only --report-only --fail-on-unmatched
npm run guide:assets -- --published-guide roya-valley-day-trip-from-menton --assets-dir /absolute/package --missing-only --apply-places-patch-safe --fail-on-unmatched
```

## Limits and cost claims

Source verification, translation quality and image-to-place correctness still
require editorial judgment. A compiler can detect structural omissions, not
certify a translation. It does not auto-publish or infer live road conditions.

This pass reduces repeated scaffolding and false candidates. No before/after
wall-clock benchmark or model-cost ledger was recorded, so no percentage saving
or monetary saving is claimed.

## Roya illustration trial completed

The owner supplied all six illustrations named by stable place ID. Report-only
matched all six without explicit mappings and found no unused files. Safe apply
copied the six sources, generated AVIF/WebP derivatives, updated the six explicit
place records and verified each image field. Existing illustrated places were
left unchanged. The post-apply rerun copied nothing and reported all six package
files as already covered, with no unmatched files or missing images. Guide review
returned zero errors and zero warnings. Run review only after the apply command exits,
otherwise a report can read the pre-apply state.
