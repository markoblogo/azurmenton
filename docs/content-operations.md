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
- For every newly published guide, set `publishedOn` in `YYYY-MM-DD` format. The guide landing page uses the latest `publishedOn` value for the dedicated `NEW` slot automatically; do not use manual landing flags.
- Add a cover image before publishing unless instructed to leave it empty temporarily.
- Link relevant existing places through `relatedPlaces` and section-level `relatedPlaceIds`.
- Add genuinely useful `relatedArticles`, `relatedEvents` and `relatedApartments`.
- Add apartment CTAs for practical stay guides, beach/sea-view guides, family guides, transport guides and seasonal comfort guides.
- For a high-intent guide in `src/content/guide-authority.ts`, select an honest editorial review date, use only useful official/primary source links, and choose a compact plan template that helps the guest act without duplicating the article.
- Do not add an authority profile simply for visual weight. It is for maintained pages where the review date and practical source context can be defended.
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
- Keep the public `/[locale]/events` page visitor-first: quick periods, custom stay dates, Menton/Monaco/Nice/Ventimiglia/Sanremo, interests and seasonal highlights. Filtering is shareable through URL parameters such as `period`, `from`, `to`, `location`, `interest` and `q`.
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
- Keep future ingestion source configuration in `src/content/event-sources.ts`; do not add a scraper until an official RSS, iCal, API, JSON-LD or clearly permissible structured source is confirmed.
- Future ingestion candidates should pass through `src/lib/event-discovery.ts` primitives for normalization, deterministic dedupe and review-required output. Uncertain fuzzy matches must remain review candidates, not silent deletes.

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

## Travel Tools Surfaces

The public Travel Tools hub is maintained in `src/components/tools/TravelTools.tsx` and should stay a compact planning surface. Keep the order intentional: conditions, time/rates, transport, then safety.

- Use the shared weather and marine data surfaces for the hub and their expanded detail pages; do not create a second editorial weather article inside the tools page.
- Keep the transport hub composed of route guidance, official airport-board links/embeds and cautious source notes. It is not a live SNCF, bus or airline API.
- `RadioConsole` is a hub-only player. It reads the typed Menton station catalog and includes only stations with a direct `audioStreamUrl`; website-only stations remain external links. Do not change the radio guide's per-station cards when polishing the hub.
- External radio and airport providers can reject, redirect or change their streams. Keep clear unavailable/error states and never claim that an external stream is guaranteed.
- Cross-origin airport iframes may display provider-owned cookie banners. Do not try to style them from Azur Menton; use an official external-board fallback when embedding is not permitted or usable.
- When adding a new audio origin, update the CSP media/connect allowlist and its tests. HLS support stays dynamically imported.

## Internal Linking

- Add existing relevant places to new articles.
- Add new places to older articles only where naturally useful.
- Update `relatedPlaces`, section-level `relatedPlaceIds` and place `relatedArticleIds` together.
- Use `guideCoverageSlugs` for the specialised guide that should absorb a newly added place, such as a new wine bar in the wine guide. Every coverage guide must render the place as a top-level or section-level card; `npm run content:report` flags `Canonical guide coverage gaps` before publication. `relatedArticleIds` remain broad editorial backlinks, not an instruction to add a card to every linked article.
- When a specialised guide declares `canonicalPlaceTypes`, every linked place of that type must be shown there and declare the same coverage slug. Use this only where the type is genuinely unambiguous; restaurant, market and lifestyle links still require editorial judgement.
- Check whether the article belongs in an intent cluster.
- Check whether it belongs in a living guide collection in `src/content/content-map.ts`. Add an item to the compact intent map only when it answers a meaningful guest or search question; do not inflate the count with near-duplicate queries.
- Check whether the article needs apartment-aware linking.

## SEO Priority And Monitoring

- Every published guide, stay page and event needs a localized SEO title and description; content lint enforces these baseline fields.
- Keep canonical URLs stable. For annual events, use the current occurrence route and let the series URL redirect; never create two self-canonical pages for the same occurrence.
- Do not add every new page to the Search Console monitoring cohort. Add one only when it has direct booking relevance or established search demand, and remove one only during a deliberate review.
- Maintain the bounded cohort in `src/content/seo-monitoring.ts`. It must contain 5-10 canonical URLs and pass `npm run seo:priorities`.
- After production, inspect or request indexing only for the relevant canonical URL. Do not bulk-submit archives, utility pages or every new article.
- At the next 3-4 week review, compare indexed status, canonical conflicts, impressions, CTR and average position before making another SEO change.

## Preflight

Run the relevant checks before committing:

```bash
npm run guide:new -- --from /absolute/path/to/draft.txt [--cover /absolute/path/to/cover.png]
npm run guide:match -- --slug <slug>
npm run guide:structure -- --slug <slug>
npm run guide:link-plan -- --slug <slug>
npm run guide:check -- --slug <slug>
npm run guide:assets -- --slug <slug> [--assets-dir /absolute/path/to/assets]
npm run guide:assets -- --slug <slug> [--assets-dir /absolute/path/to/assets] --strict
npm run guide:assets -- --published-guide <guide-slug> [--assets-dir /absolute/path/to/assets] --missing-only --report-only
npm run guide:assets -- --published-guide <guide-slug> [--assets-dir /absolute/path/to/assets] --missing-only --report-only --fail-on-unmatched
npm run guide:assets -- --published-guide <guide-slug> [--assets-dir /absolute/path/to/assets] --missing-only --apply-places-patch-safe
npm run guide:apply -- --slug <slug>
npm run guide:publish -- --slug <slug>
npm run guide:patch -- --slug <slug>
npm run guide:review -- --slug <slug>
npm run content:lint
npm run content:audit
npm run content:report
npm run images:check
npm run preflight
```

For the guide automation chain, see `docs/guide-automation.md`.

Use `guide:assets -- --strict` once the owner has supplied the full final image package and the pass should fail on unused files or unresolved expected cover/place assets.

For already published guides, use the post-publish asset path instead of re-running the intake plan blindly:

```bash
npm run guide:assets -- --published-guide <guide-slug> --assets-dir /absolute/path/to/assets --missing-only --report-only
npm run guide:assets -- --published-guide <guide-slug> --assets-dir /absolute/path/to/assets --missing-only --apply-places-patch-safe
```

This mode reads the real place cards already rendered by the published guide, skips places that already have images, reports any still-missing places, and can fail on leftover files with `--fail-on-unmatched`.

`--apply-places-patch-safe` is the narrow auto-merge path for already-published guides: after matching copied assets, it validates the target `id:` anchors in `src/content/places.ts`, updates only the corresponding `image:` fields, and then runs a short verify pass by `placeId` so the handoff shows what was actually confirmed. Use `--report-only` when you want the report without mutating `places.ts`.

After the manual merge, use `build/guide-intake/<slug>/review/owner-checklist.md` as the required visual handoff instead of an ad hoc spot-check.

`npm run preflight` includes content schema lint, weekly digest validation and the booking funnel contract report.

For larger changes also run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run preflight:postbuild
```
