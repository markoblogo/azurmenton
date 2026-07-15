# Content Operations Checklist

Use this checklist when adding or changing guide articles, places, events or apartment-facing local recommendations.

## Before Editing

- Confirm whether the content is a guide, place, event, apartment link update or a combination.
- Search nearby existing content before creating new objects.
- Reuse existing places, guide articles, events and apartments when the connection is editorially useful.
- Do not invent dates, ticket prices, schedules, ratings, opening hours or official rules.
- Keep English as the source editorial language and localize French, Italian and Ukrainian naturally.

## Guide Articles

- Add or update the article in `src/content/guide.ts`.
- Provide all localized fields: title, SEO title, SEO description, excerpt, cover alt text, headings, body copy and bullets.
- Add a cover image before publishing unless the task explicitly says to leave it empty temporarily.
- Link relevant existing places through `relatedPlaces` and section-level `relatedPlaceIds`.
- Add genuinely useful `relatedArticles`, `relatedEvents` and `relatedApartments`.
- Add apartment CTAs for practical stay guides, beach/sea-view guides, family guides, transport guides and seasonal comfort guides.
- Add the guide to `src/content/guide-intents.ts` when it supports an existing search intent cluster.
- If the guide is useful for a ready-made trip scenario, update `src/content/planning/stay-plans.ts`.
- If the guide depends on Monaco, Nice, Ventimiglia/Italy or car-free movement, confirm that a transport helper block appears naturally.

## Places

- Create or update place objects in `src/content/places.ts`.
- Add localized `shortNote`, `bestFor`, image alt text and source status.
- Add image paths only after optimized assets are present under `public/images/`.
- Add `googleMapsUrl`, `googleMapsSearchUrl` or `programmeUrl` when available and useful.
- Keep `relatedArticleIds` aligned with guide references.
- Do not add backlinks only because a place card appears in a section; add them when the article is a real editorial match.
- Confirm that useful public places still fit the filters on `src/app/[locale]/map/page.tsx`; add a new map category only when several places need it.
- Keep map filters in `src/content/planning/map-taxonomy.ts`; do not create broad labels such as culture or family when a concrete place type exists.
- For waterfront, old-town and apartment markers, record a reviewed coordinate source, URL and date. Do not apply a blanket latitude/longitude offset to make markers look land-side: verify each affected landmark at map zoom instead.
- For every newly added local place that fits a map category, set `requiresMapReview: true` on the place or add it to the map-review required set. It must then have either a reviewed entry in `src/content/planning/place-map-points.ts` or an explicit, dated exclusion in `src/content/planning/place-map-exclusions.ts`. Never substitute an approximate point for an unresolved address. `npm run content:lint` fails when required coverage is missing; run `npm run map:report` to track both the active batch and the historic backlog.
- Apartment markers may use the public building address at `building` precision when the host confirms it. Never publish an apartment or unit number; retain `host_verified` provenance in `src/content/planning/apartment-map-points.ts`.

## Stay Plans and Transport

- Keep stay plans compact: trip intent, useful guides, useful places, relevant apartments and transport destinations.
- Do not turn stay plans into a second blog system; link to the full stay or guide page for detail.
- Use `src/content/transport.ts` for curated transport notes and official timetable/route links. Do not add live SNCF, Trenitalia or bus data without a separate API, caching and source-review pass.
- Keep transport copy cautious: check current schedules, last returns and event-day access before travelling.

## Events

- Create or update event objects in `src/content/riviera-events.ts`.
- Use verified official sources where possible.
- Set `seriesSlug`, `occurrenceYear`, `recurrence` and `dateStatus` so recurring events can be refreshed without rewriting evergreen descriptions.
- Use `dateStatus: "confirmed"` only with real published dates. Use `dates_pending` or `estimated_annual_window` when dates are annual, provisional or not officially confirmed.
- Keep major annual detail pages pointed at the next useful occurrence, not a stale past date.
- Use selected occurrence aliases for high-booking pages, for example `/events/monaco-grand-prix-2027`, while keeping the stable series slug.
- Run `npm run events:review` when changing events or guide-event links; treat high-risk items as blockers unless they are explicitly intentional.
- Mark annual events awaiting official dates with an explicit freshness profile instead of deleting them.
- Keep expired annual events archived when they are useful for next-year refreshes.
- Add apartment links for event detail pages when the event can drive accommodation demand.
- Add new events without illustrations as `mediaStatus: "missing"` or leave media empty so the existing placeholder renders until optimized images are supplied.

## Images

- Put source images through the project image derivative workflow.
- Keep generated derivatives and manifests in sync.
- Prefer WebP or AVIF for editorial and utility images; do not publish multi-megabyte PNG exports when a visually equivalent optimized asset is available.
- Keep radio utility images below 500 KiB. `npm run content:audit` enforces this limit for stations used by published guides.
- Use descriptive alt text in every locale.
- Avoid broken placeholders on published guide covers.

## Guide Utility Blocks

- Define reusable block configuration in guide metadata and typed data under `src/content/utility/`; do not duplicate the same utility dataset in article copy.
- Keep a utility block in the main reading column when it is central to the guide and leave related articles or booking CTAs secondary.
- Use `utilityBlocksAfterSectionIndex` or `transportHelperAfterSectionIndex` only when a guide needs a deliberate reading order. A central tool belongs before explanatory sections; transport helpers should follow the decision context instead of displacing it.
- Use `audioStreamUrl` only for a direct HTTPS audio stream. General station or web-player pages belong in `websiteUrl`, not in the native audio player.
- When adding a new stream origin, update the CSP media/connect allowlist and its tests together.
- Keep HLS support dynamically imported so guides without an HLS player do not pay its JavaScript cost.
- Airport boards require official arrivals/departures URLs and an external fallback for each airport. Embed an airport only after browser testing confirms it is permitted; retain the visible privacy notice, source attribution and the matching `frame-src` allowlist entry.

## Internal Linking

- Add existing relevant places to new articles.
- Add new places to older articles only where naturally useful.
- Update `relatedPlaces`, section-level `relatedPlaceIds` and place `relatedArticleIds` together.
- Use `guideCoverageSlugs` for the specialised guide that should absorb a newly added place, such as a new wine bar in the wine guide. Every coverage guide must render the place as a top-level or section-level card; `npm run content:report` flags `Canonical guide coverage gaps` before publication. `relatedArticleIds` remain broad editorial backlinks, not an instruction to add a card to every linked article.
- When a specialised guide declares `canonicalPlaceTypes`, every linked place of that type must be shown there and declare the same coverage slug. Use this only where the type is genuinely unambiguous; restaurant, market and lifestyle links still require editorial judgement.
- Check whether the article belongs in an intent cluster.
- Check whether it belongs in a living guide collection in `src/content/content-map.ts`. Add an item to the compact intent map only when it answers a meaningful guest or search question; do not inflate the count with near-duplicate queries.
- Check whether the article needs apartment-aware linking.

## Preflight

Run the relevant checks before committing:

```bash
npm run content:lint
npm run content:audit
npm run content:report
npm run images:check
npm run preflight
```

`npm run preflight` includes content schema lint, weekly digest validation and the booking funnel contract report.

For larger changes also run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run preflight:postbuild
```
