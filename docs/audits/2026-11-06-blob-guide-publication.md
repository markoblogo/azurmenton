# Blob Guide Publication Acceptance

Date: 6 November 2026 (Europe/Paris). Owner explicitly approved the New Year guide in EN/FR/IT/UK after checks, followed by an illustration update and rollback trial.

## Delivered

- Integration: [PR 87](https://github.com/markoblogo/azurmenton/pull/87), production application commit `c11de0951ce96cb824a46f3c34a35d35826659f2`.
- Published guide: [New Year's Eve in Menton](https://azurmenton.com/en/guide/new-years-eve-menton), with FR/IT/UK counterparts. The Sunday guide was already published and was not duplicated.
- One source package: `content/guide-publications/new-years-eve-menton/`; no guide import, generated registration or application build was needed for activation.
- Current detail/metadata, catalogue/collections, search, sitemap and reciprocal older-guide links passed production browser acceptance in all four locales, with decoded images and mobile/desktop overflow checks.
- Explicit ETag-guarded activation, immutable snapshots/media, latest-request idempotency and retained-version rollback. No public write endpoint or scheduler.

## Production Revision Evidence

Every transition below retained application commit `c11de0951ce96cb824a46f3c34a35d35826659f2`, verified through `/api/guide-revision`. No deployment occurred between revisions 0 and 4.

| Revision | Operation | Snapshot | Operation duration |
| --- | --- | --- | --- |
| 0 | Infrastructure ready; guide not active | none | not measured |
| 1 | First guide activation | `67599b496c90e0f893b7af1cb35b6f880f7b971a841cabf627b89b4ec625777f` | 1,147 ms |
| 2 | Separate shared-place illustration update | `ac8b431ca4ef4ce93c214618f4dde197b646f7430e08b7e54942e6dbcef612ab` | 1,466 ms |
| 3 | Rollback to the first guide snapshot | `67599b496c90e0f893b7af1cb35b6f880f7b971a841cabf627b89b4ec625777f` | 1,050 ms |
| 4 | Restore final illustration version | `ac8b431ca4ef4ce93c214618f4dde197b646f7430e08b7e54942e6dbcef612ab` | 1,007 ms |

The illustration trial used the existing approved Halles du Marche image, re-encoded to WebP, not a fabricated missing illustration. The final public path is `/guide-media/29fee1bdb44d1187b68afdf1cc168d7d1df182800eac62b96e87527cc202b7bd.webp`. Image decoding and expected visible source were checked in the new guide and `halles-du-marche-menton`, each in EN/FR/IT/UK: revision 2 passed in 11,122 ms, rollback revision 3 in 9,427 ms, final revision 4 in 8,727 ms. Other images were retained.

## Timing And Bottlenecks

- Local package validation: 241 ms; 18 sections. Repeat immutable staging: 5,158 ms. Separate image staging/encoding/upload: 4,899 ms.
- First full domain acceptance: 43,559 ms. Final full acceptance: 19,945 ms after replacing `networkidle` with document/content assertions and explicit image decoding. One intermediate image check timed out waiting for background network activity; the content-based check passed.
- CLI operation durations start after module/content loading; they exclude process startup, tool approval latency, editorial research, translation and owner waiting. They are not total authoring-to-publication times. The approximately 2.2x browser-check improvement is a single observed comparison, not a guaranteed benchmark.
- One-time integration gates remain materially slower: local production build approximately 636 seconds; final required GitHub CI [42232632881](https://github.com/markoblogo/azurmenton/actions/runs/42232632881) passed in 5m57s. Native production dependency/image processing and Vercel preview passed. Full local baseline included 598 tests and 97 browser scenarios; subsequent hardening added regression coverage and passed final CI.
- Repeated review/CI cycles dominated this integration. Eleven review findings were addressed, including shared-place ownership, canonical search/share targets, carousel edits, guest recommendations, duration/schema validation and subsequent conditional writes. None were bypassed to publish.

The structural improvement is removal of build/CI/deploy from the actual content activation and illustration update path. Preparing and checking the four-language editorial package remains necessary. Git commits still use the repository's ordinary CI/deployment rules; archive commits can be batched separately and must not be mistaken for a prerequisite to every Blob activation.

## Editorial Boundaries

Fireworks, restaurant menus and overnight services remain explicitly unconfirmed. The cover is an artistic illustration, not a programme announcement. Annual review is required in October-November using the existing maintenance process; no new automation was created. Original source files were retained.

Existing static content/health reports describe the build-backed baseline. Review `/api/guide-revision`, the runtime source packages and current public pages as well when auditing active Blob publications; do not present static report counts as the complete live inventory.

The runtime store is isolated from ABVXsite. No credentials, full manuscript PDF, private guest instructions or source notes are exposed through the public media route. No bookings, Telegram, organizer messages or billing-plan changes were performed.
