# Manual Blob Guide Publication

## Contract

### Same-Origin Publisher

The authenticated `/api/guides/manage` lane adapts the current ABVXsite runtime-writing pattern: this computer calls `azurmenton.com`; the server calls Blob. Direct access from the computer to `vercel.com` is not needed for ordinary guide/image publication after the engine is deployed. This does not guarantee every hotel network will allow AzurMenton, and it is not offline publication.

The separate server-only `GUIDE_PUBLISH_TOKEN` grants content operations, not Vercel account access. Configure it only for Production; Preview writes fail closed. The local ignored `.env.guide-publisher.local` contains only this operator credential and must be private (0600). Do not use another site's token or copy provider credentials into requests. GET exposes the current snapshot only after authentication; POST accepts bounded JSON and verified WebP bytes, never remote URLs to fetch. Existing snapshot validation, reciprocal graph derivation and conditional activation remain authoritative.

```sh
npm run guide:remote -- status --env .env.guide-publisher.local
npm run guide:remote -- stage --packages content/guide-publications --slug <slug> --receipt build/private-guide-ops/<slug>-stage.json --approve --env .env.guide-publisher.local
npm run guide:remote -- activate --hash <staged-hash> --expected-revision <revision> --request-id <stable-id> --receipt build/private-guide-ops/<slug>-activate.json --approve --env .env.guide-publisher.local
npm run guide:remote -- image --slug <slug> --place <place-id> --file /absolute/image.png --expected-image <current-path-or-none> --receipt build/private-guide-ops/<slug>-image.json --approve --env .env.guide-publisher.local
npm run guide:remote -- rollback --hash <prior-hash> --expected-revision <revision> --request-id <stable-id> --receipt build/private-guide-ops/<slug>-rollback.json --approve --env .env.guide-publisher.local
```

Stage/image store an immutable candidate only; activate/rollback change the public pointer. Omit `--place` for a cover. `--approve` authorizes transmission; without it a request is prepared but not sent (preparation still reads current status). Every write first saves the exact command and target origin to an ignored private request file; a receipt is saved after success. After an ambiguous network response, use `guide:remote retry --receipt <same-path> --approve --env .env.guide-publisher.local`; never issue a fresh activation ID blindly. A stale version returns 409 for inspection. The API limit is 4 MB JSON; local WebP preparation limits an image to 2.5 MB. Keep source files unchanged.

Direct Blob CLI below remains an operator recovery path. Its write-endpoint probe uses no credential, refuses bad TLS/redirects, times out after 10 seconds, and defaults SDK retries to one. A command has a 120-second overall deadline; after an activation timeout inspect current status before retrying. Normal remote publications do not run this Vercel-host probe.

The isolated private Vercel Blob store holds immutable SHA-256 snapshots and WebP media under `guides/v1/`. A small `head.json` selects the visible version with a monotonic revision. Writes require the authenticated same-origin publisher or the direct operator recovery CLI; there is no unauthenticated writer, scheduler or autonomous editorial approval. Never share another project's token/store.

Guide detail/metadata, catalogue/collections, sitemap, search overlay, related guide/place cards, map, favourites, trip planner and curated stay/guest/event references read a versioned graph per request. Static typed content is used when credentials/head are absent. Once configured, read/integrity failures fail visibly, not with a silent stale fallback. Pagefind handles unchanged content; a lexical runtime overlay suppresses overridden guide results and supplies current guide/place text. This is not semantic search or a second editorial database.

Requests already in flight can complete on their pinned version. New requests read the head from origin (`useCache: false`); metadata/body share a React request cache. There is no process-wide content mutation or indefinite head cache. Immutable media may be cached permanently. New mapped locations still require the reviewed-coordinate workflow; the publisher cannot invent map points or edit apartment/event records.

Standard guide source packages live under `content/guide-publications/<slug>/`: metadata, four Markdown locales and sources. This directory is not imported into the application build. Covers upload during staging, so a new guide needs no import, registration or Pagefind build. Code/schema changes still need the normal deployment. Build-backed packages remain supported separately.

Prepared single-frame WebP derivatives within the existing limits are transmitted byte-for-byte, without a second lossy encode. PNG/JPEG sources still receive one bounded WebP conversion. Server integrity, format and size checks remain unchanged. This optimization affects image preparation, not translation or source review.

Production same-origin acceptance on 8 November: [Picnic publication, image update and rollback](audits/2026-11-08-same-origin-picnic-publication.md). Ordinary publication no longer needs local Vercel/Blob account access; the site and its server-side Blob connection must still be reachable.

## Prepare And Stage

Retain original files, verify primary sources, review translations and obtain owner approval. Keep credentials in an ignored private environment file, never command arguments/logs. Production env pulls can return `[SENSITIVE]` placeholders; they are not usable credentials. The connected development token must access the same isolated store. Do not create a new store on authentication failure.

```sh
npm run guide:runtime -- check --packages content/guide-publications --slug new-years-eve-menton
npm run guide:runtime -- stage --packages content/guide-publications --slug new-years-eve-menton --env /absolute/private.env
npm run guide:runtime -- status --env /absolute/private.env
```

Staging returns a snapshot hash, expected revision and elapsed milliseconds; it does not move the head. Local browser acceptance can set `GUIDE_RUNTIME_PREVIEW_HASH` before starting the existing production build with a valid Blob token. This override is ignored on Vercel and never read from URL parameters. Inspect all locales, mobile layout, links, search, collection, sitemap and image decoding.

## Activate And Verify

```sh
npm run guide:runtime -- activate --hash <staged-sha256> --expected-revision <revision> --request-id <unique-id> --approve --env /absolute/private.env
```

Activation uses the head ETag (`ifMatch`); first activation refuses overwrite. Stale revisions fail. Repeating the latest request ID/hash is idempotent; different content under that request ID fails. Snapshots/media are stored first. An interrupted upload can leave an unreferenced immutable object, not a partly published graph. Retain objects for rollback.

Check `/api/guide-revision`, four locale pages, catalogue, search, sitemap and a reciprocal older guide. Compare deployment SHA before/after: content-only publication must not create a deployment. Record actual publication time separately from editorial review, translation, image encoding and owner wait.

Reusable browser acceptance (no build, no writes):

```sh
node scripts/guide-runtime-browser.cjs --base-url https://azurmenton.com --slug new-years-eve-menton --related-slug menton-sundays-public-holidays
```

## Later Images And Rollback

The image command stages a snapshot, not a live edit. Supply the exact current image path, or `none` for an empty image; the place must belong to the guide. It locally encodes the supplied file to WebP, preserves other images and uploads a content-addressed object. Omit `--place` for the cover. Retain source files.

```sh
npm run guide:runtime -- image --slug <guide-slug> --place <place-id> --file /absolute/image.png --expected-image <path-or-none> --env /absolute/private.env
npm run guide:runtime -- activate --hash <new-sha256> --expected-revision <revision> --request-id <unique-id> --approve --env /absolute/private.env
npm run guide:runtime -- rollback --hash <prior-sha256> --expected-revision <revision> --request-id <unique-id> --approve --env /absolute/private.env
```

Rollback selects a retained immutable snapshot as a new revision; it never decrements the counter or deletes history. A later code deployment still overlays active Blob publications: reconcile an overridden guide explicitly rather than assuming Git wins. A reviewed empty snapshot can return to build content through guarded activation; do not delete the head blindly.

`export --slug <existing-slug> --out /absolute/packet.json --sources /absolute/sources.md --env /absolute/private.env` freezes an existing typed guide for controlled migration. Generic packet staging is an operator capability, not untrusted web intake. Only new/explicitly changed place records belong in a packet; do not copy every shared place into every guide.

## Tests And Boundaries

Tests cover static parity, immutable inputs, new registration, reciprocal links, collections/search, images/rollback, malformed inputs, integrity failure and ETag/stale-write protection. The initial integration needs full release checks; later content needs package/source/browser checks, not a rebuild just to refresh discovery.

Public `/guide-media/<sha256>.webp` serves only bounded checksummed images, not arbitrary Blob paths, manuscripts, source notes or secrets. `/api/guide-search` exposes searchable published text; `/api/guide-revision` exposes revision, active slugs and deployment SHA. Blob usage follows provider billing; no free-usage promise or plan change is made.

Annual New Year review uses the existing October/November editorial review in [guide-maintenance-review.md](guide-maintenance-review.md). No automatic date rollover or publication authority is implied.

Production acceptance and measured publication/image/rollback cycle: [6 November 2026 audit](audits/2026-11-06-blob-guide-publication.md). Git archive commits still follow ordinary CI/deployment rules; they are not required for each Blob activation. Static content/health reports remain baseline-only: also inspect `/api/guide-revision` and current runtime guides during editorial reviews.
