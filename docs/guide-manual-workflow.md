# Manual Guide Publication Packet

This wraps existing guide tools; it is not an automatic publisher, translator, source verifier or new content database. The owner still chooses every guide. New places may retain explicit empty illustrations at first publication; the owner supplies the later image package. Existing images are never replaced automatically. No scheduler, paid storage, Telegram or newsletter integration is enabled.

## One Manual Path

Standard long-form guides may instead use the committed package contract in [content operations](content-operations.md): one directory contains `metadata.json`, `en.md`, `fr.md`, `it.md`, `uk.md` and `sources.md`. Images remain in the existing public library, declared in the package manifest. New place records and coordinate exclusions still need review. Run `npm run guide:package`, `npm run release:check`, and `npm run guide:browser -- --slug <slug>`. After approved deployment, repeat the browser check with `--public`. Registration, collection membership and reciprocal links are automatic; never edit the generated index directly. This path needs neither the legacy intake chain nor a synthetic publication plan. Maria Serena has an exact pre-migration checksum regression; The Long Afternoon is the first new package. Publication still uses the ordinary build, sitemap and Pagefind catalogue. Blob runtime publication remains deferred.

```bash
# Word, Markdown and plain text remain supported.
npm run guide:workflow -- prepare --from /absolute/guide.docx --cover /absolute/cover.png

# Before insertion: edit the plan, review matches, translate and verify facts manually.
# Rerun the planning packet only when resolving pre-insertion gaps:
npm run guide:workflow -- bundle --slug <intake-slug>

# After inserting reviewed source/places/backlinks, use one final verification:
npm run guide:workflow -- verify --slug <intake-slug>
# Explicit fallback only when the normal Turbopack build is unavailable:
npm run guide:workflow -- verify --slug <intake-slug> --webpack

# After a separately approved release, check the public site without writes:
npm run guide:browser -- --slug <intake-slug> --public

# Later illustration pass, using the SAME packet:
npm run guide:workflow -- assets --slug <intake-slug> --assets-dir /absolute/images
npm run guide:workflow -- verify --slug <intake-slug>
```

`prepare` reads the source, refuses an existing intake rather than erasing editorial decisions, runs `guide:new`, freezes original source/cover bytes, processes the explicit cover locally, and runs match -> structure -> link-plan -> check -> apply -> publish-readiness -> patch. `bundle` regenerates the same packet after manual plan edits. It does not translate or insert the article into canonical content. Expected readiness failures return nonzero with the packet and logs retained; inspect blockers rather than treating scaffold generation as publication.

`verify` is the post-insertion path: validate frozen originals, require the same existing canonical guide/slug, save the first plan snapshot to `publication-plan.before-verify.json`, then use the existing review-plan synchronizer. It updates only ignored packet metadata, never public content. It does not rerun fuzzy place suggestions or the seven-step intake pipeline. The refreshed packet marks `canonicalFinalized`, not insertion readiness or publication approval; historical readiness claims are not carried forward. All normal final-tree checks still run, followed by the reusable browser check. Repeating the command on identical inputs reuses intact receipts; actual content, environment, date, log or build-artifact changes invalidate them. Keep `check` for the original strict packet path without synchronization/browser work.

`guide:browser` derives table counts and place images from canonical content, checks four locale pages, titles/canonicals, decoded cover/place images, raw Markdown leaks and document overflow at 360/390/768/1440px. Local mode starts an owned production server on an available loopback port, waits for readiness, and stops only that process. Public mode uses only `https://azurmenton.com`, also verifies catalogue/sitemap, a reciprocal older-guide link and cover asset hashes. Reports and FR screenshots live under `workflow/browser/local` or `workflow/browser/public`; failures remain failures, not approval. Inspect screenshots separately. Bespoke tests remain necessary for new interactions, spoiler disclosures or unusual layouts. This smoke check does not verify personal visa status, source truth, CI/review, deployed SHA or approval and must not replace those gates.

`assets` uses intake-mode asset processing before insertion, or the existing safe published-guide mode after insertion. The latter reads the actual canonical guide and validates place IDs before updating image fields, retaining the existing post-apply verification and durable asset report. An explicit `--cover /absolute/file` may attach a missing cover; existing covers are not replaced. Changes are local until a separate approved Git release.

When one operator represents multiple venues, give each `plannedPlaces` entry its own stable ID and `draftName`, with a shared `sourceDraftName` matching the intake candidate (for example, Fragonard in Èze and Grasse). Re-running matching preserves these explicit branches and resolved editorial additions instead of collapsing them into one ambiguous operator. A manual new-place decision is not silently supplemented with a conflicting existing-place ID. Nested workshop labels such as “Practical details” are not venue candidates when their parent identifies the operator and address.

Pin reviewed links in `approvedRelatedArticleSlugs` and `approvedRelatedApartmentSlugs` when they must survive re-running link suggestions. These editorial choices are retained even when the suggestion engine no longer ranks them; stale automatic suggestions can still be removed. IDs remain subject to the normal reference validation. This does not approve publication or assert availability.

Files under ignored `build/guide-intake/<intake-slug>/workflow/`:

- `packet.json`: canonical slug, hashed source/artifact references, real command outcomes and blockers. Approval and publication are explicitly not inferred.
- `originals/`: frozen original Word/text and supplied cover. `originalPath` retains provenance. Moving the original into a publication archive does not lose the prepared bytes; editing an original still present is rejected until reviewed.
- `operator.md`: short handoff and the existing combined patch location.
- `checks.json` and `logs/`: exact input fingerprint, command signature, exit codes, timings and log hashes. No fabricated PASS for skipped checks.
- `asset-pass.json`: result of the explicit illustration pass; it is not a deployment receipt.

Keep these files private/local: they can contain absolute source paths, prose and command output. They are not automatically copied into the tracked editorial registry. A clean checkout has no such local packets; original sources and committed content remain distinct.

## Publication Timing And Improvement

`npm run guide:timing` is a read-only comparison of existing publication packets and check receipts. It normalizes historical timing field names, preserves unknown owner/labour time and distinguishes recorded reused-check durations from current wall time. Its hypothetical QA-removal bound is diagnostic, never permission to skip checks. See [the structural publication audit](audits/2026-11-05-guide-publication-path-audit.md) for the original proposal and [the package delivery audit](audits/2026-11-06-guide-runtime-migration-status.md) for current verification. The declarative package path is implemented; the no-build snapshot path remains deferred.

The search-index build prints monotonic phase durations for content loading, initialization, record submission and file output, plus record/file counts and observed timestamps. The normal build log retains this line in the existing check receipt. It does not change records, concurrency or validation. Separate this measured substage from the whole build duration before proposing indexing optimizations; a total build duration alone does not identify an indexing bottleneck.

Preparation/image steps now retain `startedAt`, `finishedAt` and `durationMs` alongside their actual exit codes and log hashes. Final checks run cheap documentation/content/readiness/image gates before lint, types and the full test suite; every prior gate remains mandatory. This catches schema, reference and map mistakes before an avoidable long run. Release dependency/native gates still come first, and browser/build checks remain unchanged.

For supplied illustrations, use the existing targeted `guide:assets` pass: it already generates the new assets' derivatives and updates the manifest. Follow with `images:check`, not a whole-library `images:generate` run. The importer checks physical image files before resolving coverage: `--missing-only` repairs an assigned-but-missing image while preserving existing images. The same verified coverage feeds package matching and target suggestions; canonical metadata is not cleared by this filesystem check. Use explicit `--place id=/absolute/source` mappings when filenames are ambiguous. Each copied asset's local report records actual processing start/end/duration and source/output bytes. Reports contain local paths and are not publication receipts.

If `prepare --cover` already processed the cover, do not pass it again with `--apply-cover-patch-safe`: the importer deliberately refuses replacing existing covers. For a later supplied place illustration, use only `--published-guide <slug> --place id=/absolute/source --missing-only --apply-places-patch-safe --fail-on-unmatched`. This avoids a redundant cover failure and keeps existing assets untouched.

Image coverage probes are deduplicated and limited to eight concurrent filesystem reads, with deterministic output order. All paths are validated inside `public` before probing; only missing files are omitted, while permission/other filesystem errors still fail. Both report-only and apply reports retain `imageCoverage.durationMs`, available-file count and concurrency. This optimizes existence checks, not image encoding or publication; benchmark those stages separately and do not extrapolate warm-cache milliseconds into minutes saved.

When a guide also changes a helper or script, run ESLint on those changed code files alongside focused tests before freezing the full publication tree. Unit/type checks do not cover import-style rules. The normal complete lint gate still runs; this early pass catches inexpensive formatting failures before repeating source fingerprinting and release preparation.

CI uses Playwright's documented `--with-deps --only-shell chromium` installation because both browser suites launch the default headless shell without a channel. System dependencies and all browser/release gates remain. This avoids downloading unused full Chromium, not Linux dependencies. The 4 November budget run spent 6m47s fetching 21.9 MB of fonts from the Ubuntu Azure mirror; browser downloads took seconds. Do not describe this change as eliminating that seven-minute bottleneck. Measure the next install step; a browser cache would not fix the observed package-mirror delay. [Playwright browser installation](https://playwright.dev/docs/browsers).

Starting with `la-baie-des-anges-jacques-demy-riviera-filming-locations`, keep a timing table in each dated guide audit. Record observed ISO start/end timestamps and elapsed time for intake, research, editing/localization/content graph, local QA, owner approval wait, CI/preview, merge/production and public verification. Separate elapsed wall time, actual tool durations and owner/external waiting; do not infer active labour from wall time. Use `UNKNOWN` when an interval was not measured. Interrupted work and overlapping stages must be labelled, not summed twice.

For each blocker record the affected stage, symptom, observed time lost, cause (`unknown` until supported), recovery, and one proposed improvement. After public verification, report total observed elapsed time, the largest avoidable delay and one small improvement for the next guide. Reuse check receipts and provider timestamps rather than starting a second content database or automation. Never remove fact checks, approval or public verification to improve the measured time. Keep the same execution environment across retries; environment changes intentionally invalidate receipts. Local server/browser checks require a permitted loopback listener; an environment restriction is a blocker, not a failed guide or permission to mark a skipped check passed.

## Reusing Check Results

Search-index timing separates Pagefind `getFiles()` (`exportMs`) from filesystem output (`writeMs`); `outputMs` remains their aggregate for historical comparisons. Do not interpret older `outputMs` as disk-write time. A 5 November 2026 sync-versus-eight-writer experiment showed no improvement (1.182s / 1.214s on the same retained-output snapshot), so parallel writes were not adopted; identical output alone is insufficient evidence of a speedup.

Artifact directory hashing uses at most eight concurrent filesystem operations while retaining the same sorted recursive content digest. Symlinks and unsupported artifacts remain errors; no timestamp-based cache or missing-file shortcut is introduced. Receipts expose `initialFingerprintMs` and `finalFingerprintMs`, and `startedAt` now includes the initial fingerprint, matching `durationMs`. Use these actual phase measurements to separate hashing overhead from tests/builds before selecting the next optimization.

Repository source fingerprinting uses a separate bounded pool of sixteen readers, retaining sorted paths and complete byte hashes. A fixed 2,414-file comparison produced identical digests at eight and sixteen readers (90.0s / 78.4s, one cache-sensitive pair, not a guaranteed speedup). Invalid concurrency is rejected and failures wait for outstanding work. On this host, use explicit `--webpack` while the recorded Turbopack listener restriction persists; do not spend another full attempt rediscovering it.

The illustration patcher resolves literal place objects in `src/content/places.ts` and its local value-imported content modules with the TypeScript parser before processing image files. Absent/duplicate owners, dynamic object properties or existing images are rejected before derivative work. Compact id lines are supported; alt text and unrelated fields are retained. Source-drift checks precede writes and exact-byte readback verifies them. IO failure is not a transaction rollback: inspect errors and existing outputs before retrying; do not regenerate derivatives merely to repair metadata. Existing-image replacement still requires a separate reviewed path, not this missing-image attachment tool.

Before a full verification after adding a guide or changing intent membership, run its focused guide test together with `tests/unit/content-audit.test.ts`. Schema lint alone does not enforce reciprocal links from intent-cluster canonical guides. Include `tests/unit/guide-assets.test.ts` for illustration changes and `tests/unit/release-hygiene.test.ts` plus `tests/unit/project-check-order.test.ts` for shared-gate changes.

The check suite runs guide review, documentation, lint, TypeScript, unit tests, content/SEO/weekly/funnel preflight, image validation, build and post-build preflight, using the shared project-check definitions. `release:check` adds native dependency validation, production security audit and production browser tests with the same receipt safeguards. A content-only reduced profile is not yet proved for executable TypeScript content modules.

A successful check is reused only if the input fingerprint, ordered command prefix through that check, log hash and any required generated artifacts still match. Receipt v2 binds each gate to its complete predecessor definitions: changing the build command invalidates build and all later gates while preserving identical earlier checks; adding or reordering an earlier gate invalidates its dependants. Legacy v1 receipts rerun once. The fingerprint covers tracked and non-ignored source files, frozen packet inputs, Node/platform, local environment files and a hash of process environment values (excluding transient shell/invocation labels). Secret values are never printed or stored in the receipt. Generated build/report/browser output is excluded from source inputs; build artifacts and the complete generated Pagefind directory have separate integrity hashes. A changed guide, locale, place, image, link, script or dependency invalidates the prior result. Missing/modified required build artifacts force the relevant check again. A failed check stops the suite; earlier real successes may be reused on a same-input retry. Changing inputs during a run invalidates the entire receipt. Receipts record total wall time as well as individual check times.

This is local evidence, not a signature of human approval or proof of browser/production behavior. Current GitHub CI remains mandatory and unchanged; so do exact deployed-SHA, public locale/media checks and owner visual acceptance. No commit, push, merge, deployment or original-file deletion is performed by these commands. Archive source files only after the separately approved release and public verification, never merely after a green local receipt.

Receipts are also bound to the calendar day in Europe/Paris, so date-sensitive readiness is not reused silently on the following day.

The release runner's production dependency audit always runs again, even when source/check receipts match; external advisory data can change without a repository edit.

`CODEX_TOOL_CALL_ID` is an invocation label, not build configuration, and is excluded from the environment digest. A changing tool-call ID must not force a rebuild. All other non-transient configuration and secret values remain hashed; the exception is covered alongside a test proving that an actual environment-value change still invalidates receipts.

## Isolated No-Rebuild Trial

```bash
npm run guide:runtime-trial -- --slug menton-lemons-producers-orchards-tastings
```

The explicitly local trial copies one existing guide and uses one existing illustrated place as a simulated initially empty card. It starts a token-protected loopback-only HTTP server and a temporary checksummed snapshot store; it is prohibited on Vercel. It publishes the local guide, rejects unauthenticated/stale writes, verifies a retry does not duplicate it, adds the already-generated WebP illustration, and verifies the actual image in Chromium in EN/FR/IT/UK. Authored guide bytes, original/derivative image bytes and existing build ID are checked unchanged. The server and temporary content store are removed on completion; a sanitized result remains under `build/guide-runtime-trial/<slug>.json`.

The trial uses a minimal HTML acceptance harness, **not the production Next.js guide renderer**. It proves a local storage/read/image lifecycle without invoking a build. It does not integrate runtime content with production guide lists, Pagefind, the map, sitemap, related events or hosted durable storage. It does not establish hosted costs, performance savings or a migration decision. Raw PNG originals may exceed the bounded JSON request; the trial uses an existing approved web derivative without modifying the source photograph/illustration.

The next two owner-selected guides should test the manual packet path on the existing Git-backed website. Production no-rebuild publication requires a separate engineering decision and a complete read/index/recovery design. Do not silently route those real guides into this temporary prototype.

Architectural reference: [ABVXsite v0.4.0 publication workflow](https://github.com/markoblogo/ABVXsite/blob/v0.4.0/docs/abvx-os-publishing.md). No private ABVX OS runtime dependency or ABVX-specific store is introduced here.

## Acceptance Evidence: 31 October 2026

- A temporary Markdown intake traversed all seven preparation stages. Packet artifact hashes and frozen source bytes matched; a second prepare refused to overwrite editorial choices. Final checks refused a guide not inserted into canonical content. Editing the original source blocked a subsequent bundle. The generated smoke intake was removed, leaving only an ignored result summary under `build/guide-workflow-smoke-result.json`.
- Receipt tests cover intact-log reuse, changed source/environment, failed checks, mid-run source changes, missing build outputs and altered generated search fragments. Only genuine successful check results are reusable; no reduced QA profile or implicit approval is enabled.
- The browser-backed local runtime trial used `menton-lemons-producers-orchards-tastings` and `domaine-gannac-menton`. Local publication was revision 1; the later image pass was revision 2. The four languages and actual decoded image passed. Retry, stale-write and unauthenticated-write checks passed; authored guide/image bytes and the existing build remained unchanged. The original PNG exceeded the JSON transport bound, so the existing generated WebP was reused without modifying the original.
- This is engineering/local acceptance only. No owner guide from the input folder was published, moved or deleted, no hosted store was provisioned, and no production runtime cutover occurred. Public content still follows the existing Git release workflow.
