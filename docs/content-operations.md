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

## Places

- Create or update place objects in `src/content/places.ts`.
- Add localized `shortNote`, `bestFor`, image alt text and source status.
- Add image paths only after optimized assets are present under `public/images/`.
- Add `googleMapsUrl`, `googleMapsSearchUrl` or `programmeUrl` when available and useful.
- Keep `relatedArticleIds` aligned with guide references.
- Do not add backlinks only because a place card appears in a section; add them when the article is a real editorial match.

## Events

- Create or update event objects in `src/content/riviera-events.ts`.
- Use verified official sources where possible.
- Mark annual events awaiting official dates with an explicit freshness profile instead of deleting them.
- Keep expired annual events archived when they are useful for next-year refreshes.
- Add apartment links for event detail pages when the event can drive accommodation demand.

## Images

- Put source images through the project image derivative workflow.
- Keep generated derivatives and manifests in sync.
- Use descriptive alt text in every locale.
- Avoid broken placeholders on published guide covers.

## Internal Linking

- Add existing relevant places to new articles.
- Add new places to older articles only where naturally useful.
- Update `relatedPlaces`, section-level `relatedPlaceIds` and place `relatedArticleIds` together.
- Check whether the article belongs in an intent cluster.
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

For larger changes also run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run preflight:postbuild
```

