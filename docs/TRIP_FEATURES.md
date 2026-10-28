# Trip Features Delivery

Status: implementation locally verified; owner approved the combined release with homepage rotation on 28 October 2026. Provider deployment and public-route verification are required after push.

## Delivery Gates

1. Favourites: device-only hearts for guides, events and places; collection page; shareable snapshot; navigation entry; browser checks; Plausible goals.
2. My trip: locally saved dates, party, car and interests; explicit edit/reset; optional booking form prefill without submission.
3. For your dates: confirmed date-overlapping events and editorial guide recommendations; seasonal limitations must not imply verified opening hours.
4. Release: four-locale and mobile checks, tests, documentation, one approved publication with homepage changes, public verification.

## Current Implementation

- Versioned local favourites storage and heart controls exist.
- `/[locale]/favourites` resolves saved IDs to published content and stable place anchors, including a rendered event-venue fallback when no guide contains the place.
- Shared snapshots use the URL fragment and never replace the recipient's local list automatically.
- `favourite_added` / `favourite_removed` emit only after a successful local write; props are locale, contentType and contentId. No trip details or guest identifiers.
- Favourites and trip links are available in site navigation/footer; place sharing resolves to a rendered guide card.
- My trip saves/clears a validated device-only profile in four locales, with date-overlapping confirmed events. Departure day is excluded, matching the overnight stay window.
- Guide ranking uses explicit editorial profiles, interests, travelling with children, seasonal/month relevance and car-free alternatives. It is not a guarantee of opening hours, transport or slope conditions.
- Booking prefill requires an explicit click and transfers only dates and adult/child counts. Existing apartment, parking, contact and message fields are not overwritten. Expired dates or party sizes unsupported by the form are not applied. Applying different dates hides the old selected-stay summary and resets the prior availability override.
- The three Plausible goals (`favourite_added`, `favourite_removed`, `trip_prefill_used`) were saved and verified on 28 October 2026. Custom-property reporting is subscription-gated; per-place breakdown remains unavailable without a separate decision. No paid upgrade was performed.
- Local verification on 28 October 2026: 342 unit tests passed, six browser tests passed on a production build, including four locales and 320/390/1024/1280/1536px layouts. Lint and content preflight passed. The Webpack production build passed. Owner approved commit, push and publication; public rollout verification follows deployment. Real production analytics receipt remains a post-release check, not something the local stubbed tests prove.

## Measurement Boundary

Save/remove actions measure interactions, not exact numbers of people or current installed-device totals. Repeated toggles, analytics blocking and device changes affect counts. Favourites work without analytics. Do not claim booking uplift without comparable conversion evidence.

## Local Verification

`tests/unit/trip-recommendations.test.ts` covers season boundaries, departure-day exclusion, explicit profile references, car-aware ordering and booking prefill bounds. `tests/e2e/trip-favourites.spec.ts` covers persistence, share snapshots, non-destructive recipient behaviour, explicit booking prefill, locale/mobile layouts and real place anchors. Browser tests stub Plausible and block non-local network requests; they never submit a booking.

To test an already running local server: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3108 PLAYWRIGHT_REUSE_SERVER=1 npx playwright test tests/e2e/trip-favourites.spec.ts --workers=1`. The normal CI default remains port 3100.

On this Mac, Turbopack build failed because its CSS worker could not bind a helper port (`Operation not permitted`). Local production verification uses the supported `npx next build --webpack` fallback; the project's normal build command and production deployment settings are unchanged.
