# Manual Guide Publication Packet

This wraps existing guide tools; it is not an automatic publisher, translator, source verifier or new content database. The owner still chooses every guide. New places may retain explicit empty illustrations at first publication; the owner supplies the later image package. Existing images are never replaced automatically. No scheduler, paid storage, Telegram or newsletter integration is enabled.

## One Manual Path

```bash
# Word, Markdown and plain text remain supported.
npm run guide:workflow -- prepare --from /absolute/guide.docx --cover /absolute/cover.png

# Edit the plan, review matches, translate and verify facts manually.
# Rerun the packet after resolving editorial gaps:
npm run guide:workflow -- bundle --slug <intake-slug>

# Insert reviewed source/places/backlinks through the existing patch bundle.
# Then validate the final tree:
npm run guide:workflow -- check --slug <intake-slug>
# Local fallback when Turbopack worker ports are restricted:
npm run guide:workflow -- check --slug <intake-slug> --webpack

# Later illustration pass, using the SAME packet:
npm run guide:workflow -- assets --slug <intake-slug> --assets-dir /absolute/images
npm run guide:workflow -- check --slug <intake-slug> --webpack
```

`prepare` reads the source, refuses an existing intake rather than erasing editorial decisions, runs `guide:new`, freezes original source/cover bytes, processes the explicit cover locally, and runs match -> structure -> link-plan -> check -> apply -> publish-readiness -> patch. `bundle` regenerates the same packet after manual plan edits. It does not translate or insert the article into canonical content. Expected readiness failures return nonzero with the packet and logs retained; inspect blockers rather than treating scaffold generation as publication.

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

## Reusing Check Results

The check suite runs guide review, documentation, lint, TypeScript, unit tests, content/SEO/weekly/funnel preflight, image validation, build and post-build preflight, using the shared project-check definitions. `release:check` adds native dependency validation, production security audit and production browser tests with the same receipt safeguards. A content-only reduced profile is not yet proved for executable TypeScript content modules.

A successful check is reused only if the input fingerprint, ordered command definitions, log hash and any required generated artifacts still match. The fingerprint covers tracked and non-ignored source files, frozen packet inputs, Node/platform, local environment files and a hash of process environment values (excluding transient shell/invocation labels). Secret values are never printed or stored in the receipt. Generated build/report/browser output is excluded from source inputs; build artifacts and the complete generated Pagefind directory have separate integrity hashes. A changed guide, locale, place, image, link, script or dependency invalidates the prior result. Missing/modified required build artifacts force the relevant check again. A failed check stops the suite; earlier real successes may be reused on a same-input retry. Changing inputs during a run invalidates the entire receipt.

This is local evidence, not a signature of human approval or proof of browser/production behavior. Current GitHub CI remains mandatory and unchanged; so do exact deployed-SHA, public locale/media checks and owner visual acceptance. No commit, push, merge, deployment or original-file deletion is performed by these commands. Archive source files only after the separately approved release and public verification, never merely after a green local receipt.

Receipts are also bound to the calendar day in Europe/Paris, so date-sensitive readiness is not reused silently on the following day.

The release runner's production dependency audit always runs again, even when source/check receipts match; external advisory data can change without a repository edit.

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
