# Beach Day Guide: Paused Before Publication

## Resumed 8 November: Published

The 6 November pause below is historical. Owner restored working connectivity and authorized completion on 8 November. Actual publication date is 8 November; source review remains dated 6 November. Temporary Blob credentials had been cleared, so they were recovered from the existing project's development environment (same private store), not recreated or shared from another project.

Staging succeeded in 9540 ms; activation in 1347 ms. Revision 5 selects `38803d2f61a789a269eca901d52acb70a1256a2b6a831f14442fc73a04652355`. Prior snapshot `ac8b431ca4ef4ce93c214618f4dde197b646f7430e08b7e54942e6dbcef612ab` is retained. Deployment stayed `80176bfe61aca7fa184c840d596b179a459209c8`. New Year guide and Halles override were retained.

Full browser acceptance passed in 22706 ms on the domain: EN/FR/IT/UK pages, canonical URLs, image decoding, mobile/desktop overflow, catalogue, sitemap, actual search and reciprocal `best-beaches-in-menton` link. The first search check typed before hydration; an independent hydrated check found the guide. The reusable verifier now waits for search-page network readiness, while ordinary content pages retain the faster DOM-ready check.

Local root disk space prevented an earlier browser launch after a temporary reference checkout. Only that newly created temporary checkout was removed; no owner files were deleted. Subsequent ABVXsite research used narrow GitHub file reads. No successful speedup is attributed to the hotel-network interruption. The 10.887 seconds of successful upload/activation excludes preparation, credentials recovery and engineering work.

The same-origin API is separate engineering work, adapted from current ABVXsite `docs/runtime-writing.md`, `scripts/runtime-writing.mjs` and `src/content/runtime-writing-api.mjs`, read from GitHub main on 8 November. Local ABVXsite checkout was stale (12 October) and did not contain this solution. Do not claim same-origin Production availability until the compatible app deployment and live acceptance are recorded.

## Resume Point

Owner requested a safe pause on 6 November 2026 at approximately 16:35 UTC (17:35 Europe/Paris). Hotel network interferes with vercel.com; owner will later switch to mobile Internet. Do not retry uploads until owner resumes. No commit, push, deployment or active-head change was performed in this task. Original DOCX and PNG retained.

Prepared package: `content/guide-publications/menton-beach-day-costs-what-to-bring/` (metadata, EN/FR/IT/UK Markdown, source evidence). Cover: `public/images/guide/menton-beach-day-costs-what-to-bring.webp`.

Owner's initial request authorizes publication of this guide through the updated path. Pause supersedes execution until resumed. No additional unrelated release or automation is authorized.

## Completed Checks

- Offline runtime package check passed: 21 sections, five tables in each locale, five existing illustrated places, six related guides, two collections, three apartment references. Compiler's measured work: 152 ms, excluding Node/module startup.
- Focused tests passed: `tests/unit/guide-markdown.test.ts`, `tests/unit/guide-package-validation.test.ts`, `tests/unit/guide-runtime.test.ts`: 20 tests; Vitest total 11.87 s.
- `git diff --check` passed. New files are untracked, not committed; resume must include them in eventual archive if requested.
- Cover locally encoded in 310 ms: 3,183,014-byte PNG to 448,710-byte WebP, 1670 x 941. Source untouched; no generative edit.
- EN preserves supplied prose with verified corrections; other locales are adaptations, not line-by-line translations. All 18 numbered topics, table calculations and caveats retained. Word/editorial preamble and two Russian internal notes excluded.
- Two tourist-office tariff listings were updated in August 2025; all locales explicitly distinguish old reference prices from current/2027 quotations. Food budgets are illustrative. Unavailable/incorrect operator links replaced by verified primary listings. Unsupported lift claim and references to nonexistent allergy/baby guides removed. Existing family and accessibility guides linked instead.

## Network Blocker Evidence

Public `/api/guide-revision` last successfully read during this task: revision 4, runtime guide `new-years-eve-menton`, deployment `80176bfe61aca7fa184c840d596b179a459209c8`. Domain request took 796 ms. This is a dated observation, not a fresh resume baseline.

Reading private Blob head succeeded in 302 ms and snapshot in 301 ms during instrumented staging. Independent media lookup returned 404 in 4077 ms. The stage reached `storeGuideImage`, then stalled; a diagnostic retry was stopped by a 60-second overall limit. Original long stage was explicitly interrupted (exit 130). No staged hash or successful upload receipt was returned.

Bounded upload with SDK retries disabled failed after 6980 ms:

`TypeError: fetch failed`, cause `ERR_TLS_CERT_ALTNAME_INVALID`.

vercel.com presented a certificate for `portail.hotspot.2isr.fr` / `www.portail.hotspot.2isr.fr`. Independent curl confirmed certificate mismatch. TLS validation was never disabled and credentials were never logged. No alternate untrusted endpoint used. Default Blob SDK write retries (10) obscured this failure and consumed unnecessary waiting time. All task command sessions have ended; no background publication loop or server was left running.

## Pending Work After Owner Resumes

1. Check network TLS access to `https://vercel.com/api/blob` WITHOUT credentials, using a short deadline; do not rerun editorial research or translations without a new reason. Read current head and deployment; do not assume revision 4 still current.
2. Implement/test a narrowly scoped CLI fail-fast write-endpoint preflight and bounded retry/error reporting for this observed failure. No optimization patch was written before the owner paused. Avoid app rebuild for a local publisher-only improvement. Do not disable TLS or change network settings.
3. Stage the prepared package with the existing isolated Blob store and existing private env file `/tmp/azur-guide-runtime-dev.env` (do not print contents). Preserve New Year publication and its Halles image override. Use normal validated CLI; capture hash, expected revision and elapsed time. No staged hash exists from this turn.
4. Activate only after package/source checks, then run `scripts/guide-runtime-browser.cjs` on the public domain with this slug and `--related-slug best-beaches-in-menton`. Check both collections, source caveats, all five image cards, four locales, catalogue/search/sitemap and reciprocal links. Capture deployment SHA unchanged. Rollback to the actual pre-activation hash if acceptance fails.
5. Record successful staging/activation/browser durations separately from editorial work, network failure and owner pause. No success or speedup should be claimed from this interrupted attempt.

Task start recorded: 2026-11-06T15:33:40Z. First package success was observed by 16:02:18Z. Checkpoint at 16:35:36Z. These wall-clock intervals include tool/approval waits and diagnostic overhead; they are not pure translation or upload timings. Production browser acceptance and publication are still pending.
