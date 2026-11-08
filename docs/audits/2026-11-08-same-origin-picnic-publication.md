# Same-Origin Publisher: Picnic Acceptance

## Result

Owner-authorized test guide published on 8 November 2026: `/en/guide/picnic-in-menton-where-to-buy-food` (also FR/IT/UK). Package archived under `content/guide-publications/picnic-in-menton-where-to-buy-food/`. Source DOCX and PNG retained unchanged. Existing illustrated places reused; no invented place, coordinate or scene.

PR #89 introduced the same-origin engine after successful verify (5m36s), production-native and Vercel preview checks; automated review reported no findings on its exact head. Merged application SHA: `c603198094b3c350582848387b965303573620de`. Production `/api/guide-revision` confirmed that SHA before the test; unauthenticated management access returned 401. The separate Production-only publisher credential remains ignored/private; no provider credentials appear in requests or this report.

## Publication Cycle

All operations below called `https://azurmenton.com/api/guides/manage`, not vercel.com from this computer. Local direct Blob credentials were not used for this cycle. Expected revisions and stable request IDs were used throughout.

| Operation | Server ms | Client request ms | Result |
| --- | ---: | ---: | --- |
| Stage guide and cover | 2978 | 3791 | Candidate; expected revision 5 |
| Activate guide | 968 | 1170 | Revision 6 |
| Stage later cover from supplied PNG | 2669 | 3373 | Candidate; expected revision 6 |
| Activate later cover | 1148 | 1375 | Revision 7 |
| Roll back cover change | 1135 | 1405 | Revision 8; old cover verified |
| Restore later cover | 1144 | 1310 | Revision 9; final state |

Initial guide transfer plus activation: 4961 ms of client request time. Payload request file approximately 688 KB including four languages and 427094 WebP bytes encoded as base64. These figures exclude module startup, status reads, local encoding, editorial research, localization, tool waits, approval waits and browser checks. No end-to-end multiplier is claimed from these timings. Compared with rebuilding the entire application per guide, the structural gain is eliminating that build/CI/deploy dependency for content activation.

Prior snapshot: `38803d2f61a789a269eca901d52acb70a1256a2b6a831f14442fc73a04652355`.

Initial/rollback snapshot: `73b88269b2632b5e9826b471c09dbc3ee54ce7fc205bd7187c0217322dbc3b47`.

Later-image/final snapshot: `2ebe73b0e0b4e5e5711fc8c9a18b5ca6be1459f994765da27f7efd60aa53a6b4`.

Initial cover: `/guide-media/15cee8d04ec7f3fb6ff628b144bbcd36ddb079e1e7161bcb76027df4fe76d60b.webp`.

Final cover: `/guide-media/c57aa127f2d61cb0b204105a17de874ae24327451eb60a6eaefab85093021b1e.webp`.

The later image uses the same approved original, not new artwork; differing derivatives verify the separate image revision without changing subject matter. New Year, Beach Day and the existing Halles image override survived all revisions. Application SHA stayed unchanged during the content/image/rollback cycle. Subsequent Git archival deployments are separate from publication necessity.

## Checks And Caveats

Four Markdown sources compile to 22 sections and five matching table shapes (3x4, 2x6, 2x7, 2x6, 2x6 data rows). Budget sums 13/28/37 are examples, not market quotations. Five illustrated places, seven related guides and three collections; the runtime-only Beach Day guide resolves through the merged graph. Source review distinguishes published picnic permission, Fossan off-season use, Sablettes restrictions and Val Rahmeh's November 2–27 closure. No field verification claimed.

Initial production browser acceptance passed in 26920 ms: four page bodies/titles/canonicals, decoded images, 390/1440 px overflow checks, catalogue, sitemap, actual search UI and reciprocal Halles link. The full acceptance passed again in 23016 ms at final revision 9. Separate later-image page verification decoded all main images, found the new cover and preserved Halles override; mobile overflow was false. All three collection selections and the reciprocal runtime Beach Day link passed additional browser checks. Desktop/mobile screenshots inspected locally, not committed as source content.

A one-off screenshot diagnostic waited indefinitely for offscreen lazy images because it omitted eager loading. Only its own test browser was terminated; the repeat used eager loading and a 20-second image deadline and completed successfully. This was a diagnostic harness issue, not a failed guide publication. The reusable acceptance script had already used eager loading.

## Narrow Optimization

The remote CLI previously re-encoded already prepared WebP assets. `guide-publisher-assets.cjs` now preserves valid single-frame bounded WebP bytes, while converting PNG/JPEG as before. Integrity, dimensions and 2.5 MB limits remain enforced. Three-run local sample on this 434002-byte derivative: old 293/252/254 ms, new 3/2/3 ms; medians 254 versus 3 ms. This is an asset-preparation measurement, not an 85x publication claim.

Focused regression suite: 31 tests across six files passed, covering the publisher, runtime model, Markdown/package validation, network fail-fast behavior and asset reuse/conversion/rejection. Initial new test invocation failed because its helper did not yet exist, followed by implementation and green tests. No security or graph checks were removed to achieve speed.

Network boundary: the operator still needs access to azurmenton.com and the deployed server needs its provider. This is not offline publication or a promise that every hotel network permits the domain. Code/schema/auth changes and Git archive commits retain normal CI and deployment procedures; ordinary guide/image activation does not depend on them.
