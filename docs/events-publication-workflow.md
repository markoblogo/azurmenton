# Events Publication Workflow

Azur Menton events use a repository-based editorial workflow. There is no admin panel, CMS, database or automatic publication from ingestion.

## Storage

- Temporary ingestion state: `build/events-ingestion/`
- Prepared editorial batches: `src/content/events/batches/<batch-id>/`
- Published repository events: `src/content/events/published/events.json`
- Manual event inbox: `src/content/events/manual-inbox/`
- Durable owner overrides: `src/content/events/overrides/`
- Durable image locks: `src/content/events/overrides/image-overrides.json`

Published JSON records are imported through `src/content/events/published/index.ts` and bridged into `src/content/riviera-events.ts`, so existing `/[locale]/events` filters, detail routes, sitemap logic and JSON-LD eligibility continue to use the same public event model.

## Relevance Policy

Menton is the primary destination. A small event can qualify when it is useful for a guest already staying in Menton.

Surrounding destinations use a stricter threshold:

- Monaco, Nice, Ventimiglia and Sanremo must be worth a dedicated trip from Menton.
- Routine bar music, small workshops and ordinary neighbourhood events outside Menton remain `borderline` or `exclude`.
- `borderline` events appear in the batch report but are not prepared for default publication.

The deterministic scope values are:

- `menton-local`
- `destination-worthy`
- `borderline`
- `exclude`

Every prepared or borderline event includes a short `relevanceReason`.

## Image Policy

Preparation is conservative:

- Event images carry both a visual kind and a rights state.
- Publishable local kinds are `official-poster`, `official-photo`, `azur-editorial`, `category-fallback` and `location-fallback`.
- Publishable rights states are `approved`, `official-promotional` and `manual-approved`.
- `remote-reference` keeps the poster/image URL for editorial review but does not publish it automatically.
- `missing` is allowed when the UI handles an empty image cleanly.
- Owner-approved image choices are locked in `src/content/events/overrides/image-overrides.json` so later batch preparation does not re-open the same image decision.

Do not hotlink arbitrary third-party images or treat visible website images as reusable.

## Commands

Collect:

```bash
npm run events:ingest
```

Prepare:

```bash
npm run events:prepare -- --latest
```

Inspect:

```text
src/content/events/batches/<batch-id>/batch.json
src/content/events/batches/<batch-id>/report.md
src/content/events/batches/<batch-id>/publishing-queue.md
src/content/events/batches/<batch-id>/image-queue.md
src/content/events/batches/<batch-id>/verification-queue.md
```

The queues separate publication readiness from image work and source verification:

- `publishing-queue`: prepared records that can be created or updated explicitly.
- `image-queue`: missing or unapproved images that need an Azur Menton illustration or an owner-approved official asset.
- `verification-queue`: factual checks to review before relying on price, accessibility, free-entry or other claims.

Published event records support `relatedGuideSlugs` and `relatedPlaceIds`.
Manual inbox values are kept first; the publication workflow only supplements
obvious city/category/venue defaults such as Menton family, beach, library,
garden, transport and Monaco/Nice/Italian Riviera travel links.

Dry-run:

```bash
npm run events:publish -- --batch <batch-id> --all --dry-run
```

Publish selected events:

```bash
npm run events:publish -- --batch <batch-id> --all
npm run events:publish -- --batch <batch-id> --city menton
npm run events:publish -- --batch <batch-id> --ids event-id-1,event-id-2
```

Publishing without `--all`, `--city` or `--ids` is a safe no-write dry run.

Attach owner-supplied event illustrations after publication:

```bash
npm run events:assets -- --published-events --assets-dir /absolute/path/to/assets --missing-only --report-only --fail-on-unmatched
npm run events:assets -- --published-events --assets-dir /absolute/path/to/assets --missing-only --apply --fail-on-unmatched
```

```bash
npm run events:assets -- --published-events --assets-dir /absolute/path/to/assets --missing-only --apply --fail-on-unmatched
```

This optimizes matched images into `public/images/events/`, updates published event media and records the decision in `src/content/events/overrides/image-overrides.json`.

Validate:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Manual Menton Event

Add a small JSON file under `src/content/events/manual-inbox/`:

```json
[
  {
    "title": "Official event title",
    "sourceUrl": "https://official.example/event",
    "city": "menton",
    "startDate": "2026-08-15",
    "venue": "Venue name"
  }
]
```

Then run `npm run events:prepare -- --latest`. The event enters the same relevance, localization, image and report flow as automated ingestion.

## Known Limitations

- Localization is currently deterministic fallback copy for all supported locales, not human-polished translation.
- Manual override files are documented and preserved as the durable owner-edit location, but conflict resolution remains conservative and should be reviewed during the first real publication cycles.
- Multi-day source cards can still appear as multiple daily prepared events when the upstream source exposes them that way. Review the batch report before publishing broad destination batches.
