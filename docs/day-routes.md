# Editorial Day Routes

Implemented on 30 October 2026. The owner approved publishing the accumulated route-planning batch on the same date. Local verification below is separate from the release commit's GitHub/Vercel checks and live-domain verification.

## Scope

Five existing stay scenarios have structured `dayRoute` details. The Cocteau scenario is added to the same `stayPlans` collection; there is no new catalogue, detail route or storage system.

| Scenario | Existing guide surfaces |
| --- | --- |
| Old-town morning | `menton-old-town`, `menton-one-day-itinerary` |
| Cool-weather family half-day | `menton-with-kids-family-guide` |
| Monaco without a car | `monaco-events-from-menton` |
| Ventimiglia market morning | `italian-riviera-day-trip-from-menton`, `best-markets-near-menton-market-days-in-france-and-italy` |
| Cocteau walk | `jean-cocteau-menton-walking-route` |

`DayRouteCard` renders the same data in `/[locale]/stay` (collapsed practical details) and those guides (expanded). Where a detailed route exists, it replaces the smaller authority-profile day-plan teaser, not the article or its author/source information. Stop links use the existing canonical place-anchor resolver. No new places or illustrations are needed.

## Data Boundaries

- `durationMinutes`, per-stop `visitMinutes` and effort are editorial estimates. Transport scope is explicit per route; there is no measured distance or turn-by-turn navigation.
- `steps: present` records a known obstacle; `not-assessed` must never display as no stairs. Whole-route access is `partial` or `not-assessed`, independent of individual building access.
- All five routes retain `childAgeStatus: not-verified`. No age suitability, accessible toilet or pushchair guarantee is inferred from family relevance.
- Optional stops may be omitted. A dated source review does not guarantee a venue is open on the visitor's dates. No weather-dependent automatic recommendations are introduced.
- The large Wunderman museum remains an exterior-only stop, distinct from the Bastion. The Bastion's 1 November holiday closure remains explicit.
- The municipal Condamine notice describes indoor-hall works with planned completion in February 2027; do not treat that target as confirmed reopening.
- The Ventimiglia covered market is distinct from the Friday outdoor market. The latter is a conditional extension described in timing advice, not an invented place card.

## Source Review

30 October 2026: official Menton tourist-office old-town, Halles, Cocteau, Wedding Hall tour and Palais de l'Europe listings; Ventimiglia tourist-office markets; Monaco municipality's Condamine notice; Oceanographic Museum practical information; official SNCF planner. Specific source links are stored with each route and visible in every locale. The museum's Bastion page blocked direct retrieval (403); its indexed notice corroborates the published closing days already recorded in the Cocteau guide. This is not an independent on-site accessibility inspection.

## Verification And Next Boundary

Unit checks cover attached profiles, real illustrated places, localized fields, source/date shape, ordered unique stops, estimates and closure/uncertainty regressions. Browser checks cover native disclosure without JavaScript in four locales, real anchor destinations and 320/390/1440 px layouts.

Local production-build verification on 30 October 2026: Webpack build and TypeScript passed (889 generated pages); all three new browser scenarios passed. Native disclosure was exercised without JavaScript in EN/FR/IT/UK; every displayed stop link resolved to a unique rendered place anchor. Desktop and mobile route screenshots were inspected. Existing illustrations are reused; no image gap was introduced. These checks establish local behaviour, not deployment status.

UI reference: [ordered itinerary stops](https://www.lazyweb.com/agentic-search/7febadf7-7112-43ce-86ab-221158c6e8ca), adapted to the existing design rather than a separate planner interface.

## Saving To My Trip

`SaveDayRoute` uses the existing device-only version-1 trip profile. An optional `dayRoutes` array contains only `{routeId, date}` entries (maximum 60), never copied route text, URLs, contact details or server-side data. Legacy profiles remain valid; malformed route entries do not invalidate valid trip dates. Removed catalogue entries show as unavailable and remain removable without creating a guessed link.

The visitor first saves trip dates, then explicitly picks a date from arrival through the day before departure, excluding past days in Paris time. Saving the same route/day again is idempotent. My trip renders localized public catalogue metadata, allows moving/removing assignments and synchronizes changes across tabs. Each mutation rereads the current profile before one storage write. Route-only updates preserve unsaved trip-form edits; saving profile changes preserves the latest assignments. Date changes never silently move or delete routes: out-of-window entries show a warning. Clearing the whole trip clears its assignments in the same removal.

`tests/unit/trip-day-routes.test.ts` covers bounds, legacy/corrupt inputs, date limits, duplicate saves, moving/removing, storage failures and booking-prefill privacy. `tests/e2e/trip-day-routes.spec.ts` covers persistence, cross-tab synchronization, preserved edits/assignments, changed-date warnings, unavailable storage, unknown routes and four-language mobile layouts.

Local verification: 377 unit tests passed; production build, TypeScript, lint and content preflight passed. All 15 combined ready-made route, personal-day and existing trip/favourites browser scenarios passed, including the existing explicit booking-prefill flow. Test storage and bookings were isolated; no real request was sent.

## Personal Days From Favourites

`PlaceDayPlanner` appears on the visitor's own Favourites and My trip. It selects only actual favourite places with a real rendered-card target, not guides/events, and rechecks favourites before saving. Shared collections never expose this editor or silently import plans. The public catalogue is resolved on the server; only IDs and dates are persisted on the device, not URLs, copied descriptions or guest details.

The existing version-1 trip profile gains optional `placeDays: [{date, placeIds}]`. Its bounded parser preserves stop order, deduplicates per day, strips unknown fields and tolerates malformed entries without discarding valid trip dates. Limits: 30 personal days, 12 stops/day and 120 stops total. The raw profile limit is 40 KB for both bounded plan arrays. Each update rereads current storage and performs one write; no second storage system is introduced. Profile edits preserve both plan arrays, and plan-only changes do not discard unsaved profile fields.

Storage events synchronize tabs, but localStorage is still last-writer-wins for truly simultaneous writes, not a database transaction or cross-device sync.

Adding appends to an existing day without duplicating stops. Up/down controls change order manually. Moving onto an occupied day merges destination stops first, then new unique stops, and fails without deleting the source if limits/dates are invalid. Removing the last stop removes the empty day. Removing a favourite does not erase the plan; unavailable places remain removable without a guessed link. Clearing the trip removes both day-plan types but not favourites.

Date validation uses the same arrival-to-day-before-departure window and Paris calendar day as ready-made routes. Changed trip dates retain plans with warnings. Six or more stops and a ready-made route on the same date produce editorial advisories only; they do not prove overload, account for opening times or calculate distances/travel times. No city is inferred from a place name or unreviewed coordinates.

Verification is covered by `tests/unit/trip-place-days.test.ts` and `tests/e2e/trip-place-days.spec.ts`: selection order, duplicate/limit bounds, merge/reorder/remove, storage failure, stale selection, cross-tab form preservation, date warnings, privacy of shared links and four-language mobile layouts. Existing trip, favourites and booking-prefill checks remain required.

Optional device-only child-age inputs and source-backed visit advisories are supported. Actual schedule-conflict detection and guaranteed route optimisation remain out of scope. A nearby walking-order preview can be explicitly applied/undone for eligible single-city plans; it never automatically overwrites a plan. See [PORTAL_FEATURES.md](PORTAL_FEATURES.md). No booking request, analytics configuration or Telegram setting is changed.

## Context And External Navigation

Personal days offer walking, driving and public-transport links to Google Maps. Only coordinates with an existing map review are exported. Missing coordinates or unavailable places disable the complete route rather than silently dropping a stop. Mobile-compatible segments contain at most five stops with overlapping endpoints; transit uses individual legs because Maps URLs do not support transit waypoints. Manual stop order is retained. Approximate area/landside points are not audited entrances or step-free directions. Maps receives stop coordinates only after an explicit link click, never trip dates or party details. Reference: [Google Maps URLs](https://developers.google.com/maps/documentation/urls/get-started).

Different-city advisories use explicit labels in `src/content/planning/place-cities.ts`, initially covering the five reviewed routes. No city is inferred from names or coordinates; missing labels produce an uncertainty notice. Existing place hours and visitor-access notes are shown for checking, not interpreted as a real-time opening or schedule-conflict guarantee.
