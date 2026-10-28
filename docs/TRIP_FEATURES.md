# Trip Features Delivery

Status: the original trip/favourites release (`660ee02`) was deployed and its public routes verified on 28 October 2026. The navigation/card refinements and event features were subsequently pushed in `538dd02`; that push alone is not proof of a successful CI run or production deployment.

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
- Favourites and trip links are available in the primary navigation row below the brand/languages. Favourites is a text menu entry. Place actions use small outlined icons over the preview; guide/event detail save controls are integrated into the sharing panel. Place sharing resolves to a rendered card.
- My trip saves/clears a validated device-only profile in four locales, with date-overlapping confirmed events. Departure day is excluded, matching the overnight stay window.
- Guide ranking uses explicit editorial profiles, interests, travelling with children, seasonal/month relevance and car-free alternatives. It is not a guarantee of opening hours, transport or slope conditions.
- Booking prefill requires an explicit click and transfers only dates and adult/child counts. Existing apartment, parking, contact and message fields are not overwritten. Expired dates or party sizes unsupported by the form are not applied. Applying different dates hides the old selected-stay summary and resets the prior availability override.
- The three Plausible goals (`favourite_added`, `favourite_removed`, `trip_prefill_used`) were saved and verified on 28 October 2026. Custom-property reporting is subscription-gated; per-place breakdown remains unavailable without a separate decision. No paid upgrade was performed.
- Verification for `538dd02` on 28 October 2026: 356 unit tests and eight targeted production-build browser scenarios passed, including trip/favourites regression, calendar/session downloads, month filters, editorial intake and mobile navigation. TypeScript, lint, content preflight and the Webpack build passed. Real production analytics receipt and editorial email delivery are separate checks; local stubbed tests do not prove either.

## Measurement Boundary

Save/remove actions measure interactions, not exact numbers of people or current installed-device totals. Repeated toggles, analytics blocking and device changes affect counts. Favourites work without analytics. Do not claim booking uplift without comparable conversion evidence.

## Local Verification

`tests/unit/trip-recommendations.test.ts` covers season boundaries, departure-day exclusion, explicit profile references, car-aware ordering and booking prefill bounds. `tests/e2e/trip-favourites.spec.ts` covers persistence, share snapshots, non-destructive recipient behaviour, explicit booking prefill, locale/mobile layouts and real place anchors. Browser tests stub Plausible and block non-local network requests; they never submit a booking.

To test an already running local server: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3108 PLAYWRIGHT_REUSE_SERVER=1 npx playwright test tests/e2e/trip-favourites.spec.ts --workers=1`. The normal CI default remains port 3100.

On this Mac, Turbopack build failed because its CSS worker could not bind a helper port (`Operation not permitted`). Local production verification uses the supported `npx next build --webpack` fallback; the project's normal build command and production deployment settings are unchanged.
