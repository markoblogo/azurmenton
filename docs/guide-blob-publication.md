# Manual Blob Guide Publication

## Contract

The isolated private Vercel Blob store holds immutable SHA-256 snapshots and WebP media under `guides/v1/`. A small `head.json` selects the visible version with a monotonic revision. The authenticated local CLI is the only writer: no public write endpoint, scheduler or autonomous editorial approval. Never share another project's token/store.

Guide detail/metadata, catalogue/collections, sitemap, search overlay, related guide/place cards, map, favourites, trip planner and curated stay/guest/event references read a versioned graph per request. Static typed content is used when credentials/head are absent. Once configured, read/integrity failures fail visibly, not with a silent stale fallback. Pagefind handles unchanged content; a lexical runtime overlay suppresses overridden guide results and supplies current guide/place text. This is not semantic search or a second editorial database.

Requests already in flight can complete on their pinned version. New requests read the head from origin (`useCache: false`); metadata/body share a React request cache. There is no process-wide content mutation or indefinite head cache. Immutable media may be cached permanently. New mapped locations still require the reviewed-coordinate workflow; the publisher cannot invent map points or edit apartment/event records.

Standard guide source packages live under `content/guide-publications/<slug>/`: metadata, four Markdown locales and sources. This directory is not imported into the application build. Covers upload during staging, so a new guide needs no import, registration or Pagefind build. Code/schema changes still need the normal deployment. Build-backed packages remain supported separately.

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
