# Unified Editorial Registry And Report

Local, metadata-only coordination over existing workflows. No second content database, admin UI, scheduler or automatic publisher.

## Run

```bash
npm run editorial:report
npm run editorial:report -- --as-of 2026-10-31
node scripts/editorial-report.cjs --stdout --as-of 2026-10-31
```

Default output: `build/editorial/queue-report.md` and `.json`, plus a short console summary. `--stdout` emits JSON without writing reports. Dates use Europe/Paris; an explicit date makes comparisons repeatable. No network requests, emails, content edits or registry writes occur. Invalid registry/JSON inputs fail the command rather than disappearing silently.

## Sources And Coverage

- `src/content/editorial/queue.json`: tracked task metadata and verified historical target mappings.
- `build/guide-intake/*`: intake/plan and available publish/review artifacts. These are local, ignored files; a clean checkout may have no intake tasks. Old check results are snapshots, not new validation.
- `src/content/events/batches/*`: candidate metadata and publishing-queue rows. `publish`/`update` rows are proposals, not owner approval. Borderline/excluded rows are counted, not promoted; those counts can repeat across batches.
- Canonical guide, event, place, weekly and detail records resolve task targets. Canonical presence is not proof of a successful deployment or public availability. Weekly/detail/place tasks enter through explicit registry entries; canonical content is not automatically turned into maintenance debt.

Public reader submissions remain unverified proposals in the existing editorial mailbox. This command does not read emails, import guest data or scan every maintenance document. Report totals describe discovered/registered tasks, not the entire site's content inventory.

## Registry

One item per `kind:targetId:action`. Kinds: `guide`, `event`, `weekly`, `detail`, `place`. Actions: `publish`, `update`, `illustrations`, `verify`.

Example proposed task (not an approval):

```json
{
  "id": "guide:menton-in-winter:verify",
  "kind": "guide",
  "targetId": "menton-in-winter",
  "action": "verify",
  "status": "new",
  "priority": "normal",
  "refs": ["docs/guide-maintenance-review.md"],
  "nextAction": "Check official winter opening dates"
}
```

Use the real canonical ID and source path when registering a task. Do not copy article prose, email addresses, private messages or subscriber/booking data here. Priority is `high`, `normal` or `low`. Optional fields: `title`, `nextAction`, `blockers`, `notBefore`, `decisionReason`, `approval`, `publication`.

Suggested manual progression: `new` -> `in-progress` -> `review` -> `approved` -> `published`. `deferred` and `rejected` require `decisionReason`. There is no automatic state transition. The initial registry deliberately contains no invented approvals or publication decisions.

The first populated registry includes four editorial priorities and one rejected test artifact. The 6-12 November weekly edition has explicit owner approval but no public-verification claim; see the [pilot evidence](audits/2026-10-31-editorial-queue-pilot.md).

- `approved` requires `approval: { "by": "owner", "on": "YYYY-MM-DD", "reference": "Explicit decision reference" }`.
- `published` also requires `publication: { "url": "https://azurmenton.com/en/...", "verifiedOn": "YYYY-MM-DD", "reference": "Public verification evidence" }`.
- `notBefore` is a manual planning constraint, not a scheduler. A future date appears as a blocker; approval never bypasses outstanding checks.
- `publication` preserves previously recorded evidence. Every report still says `liveStatus: not-checked` because it does not recheck the domain.

To coordinate an update to existing content, register a separate `update`, `verify` or `illustrations` task. Do not reopen an old `publish` row merely because its historical report mentions a missing image.

## Duplicate And Historical Handling

Exact canonical IDs/slugs take priority. Events can also match a unique combination of source URL, start date and title; tracking parameters are ignored. Title alone, organizer URL alone and recurring-event year similarity never merge events. Ambiguous canonical matches remain blocked.

`targetAliases` records explicit mappings with `kind`, `alias`, `targetId`, `reference`. Targets must exist, and mappings cannot override another canonical record. The initial two mappings reconcile historical laundry/book intake slugs with existing guides. They are identity evidence, not publication approval. No fuzzy auto-rewrite is performed.

Report buckets:

- `active`: proposed/manual tasks still requiring attention; this does not mean publish-ready.
- `repository-present`: automatically discovered old publication proposals already represented by canonical content. Explicit registered publication tasks stay active until their recorded completion, even when already staged in code.
- `past`: unpublished event proposals whose known end/start date has passed.
- `completed`, `deferred`, `rejected`: explicit registry decisions with required evidence/reason.

Technical snapshot is separately `reported-ready`, `reported-blocked` or `unknown`. Conflicting reports require a fresh check. Missing dates and incomplete intake remain explicit blockers. Neither technical readiness nor repository presence implies approval.

## Operator Review

1. Generate the report and inspect active tasks and their source references.
2. Reconcile stale/duplicate artifacts before creating new publication work.
3. Register current priorities and manual decisions; rerun the existing guide/event checks before seeking approval.
4. Publish only after a separate explicit approval, then verify checks, deployment and public pages through the existing release workflow.

This first pass does not enable automatic guide scheduling. Discuss the inventory, approval boundary, frequency, failure handling and pause mechanism separately after owner review.
