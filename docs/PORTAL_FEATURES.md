# Editorial And Trip Planning Features

Implemented 30 October 2026. Publication requires the normal commit, CI and deployment checks; local verification alone is not public-release evidence.

## Menton In Detail

`src/content/menton-details.ts` contains short, source-linked observations about an actual place, not another full-guide catalogue. The first entry covers the Cocteau wedding room, points to its existing illustrated place card and walking guide, and renders in the guide landing page after Guide Finder. It does not alter the four hero picks or NEW guide slot, create an extra indexable detail URL, or require a new image. EN/FR/IT/UK are required.

## This Week Near Menton

The existing `/[locale]/events/this-week` page is reused. `weekly-edition-2026-10-30.ts` supplies the first explicitly curated edition for 30 October–5 November 2026: Vivaldi Gloria in Menton, Halloween in Beausoleil, and Jimmy Gnecco/OURS in Monaco. The editorial value is why to choose each outing and how to think about the return journey, not a duplicate event calendar.

Titles, dates, verified wall times, places and sources resolve from the existing event records. `weeklyEventDateLabel` formats structured occurrence dates instead of copying prose date labels. Related events, guides and real place-card anchors are linked. Completed, unconfirmed, conflicting or out-of-window events are omitted; an expired/empty edition is not presented as current. Empty pages are noindex/follow and excluded from sitemap. Sitemap revalidates hourly so time-sensitive eligibility is not frozen until a new deployment.

Add a new edition only after checking official programmes and duplicate coverage. Supply editorial reasons and return-travel advice in all four languages, reference canonical existing IDs, run `npm run weekly:validate`, and review the page. Do not generate or publish an edition automatically or silently advance the previous edition's dates.

Sources for the first edition:
- https://www.menton-riviera-merveilles.fr/offres/vivaldi-gloria-menton-fr-6754351/
- https://www.menton-riviera-merveilles.fr/offres/halloween-au-centre-culturel-prince-hereditaire-jacques-beausoleil-fr-6854033/
- https://www.grimaldiforum.com/fr/agenda-manifestations-monaco/thursday-live-sessions-jimmy-gnecco-ours

## Newsletter Interest: Manual Requests Only

The owner selected **requests to the existing editorial mailbox**, not a provider contact database or newsletter delivery. The four-language form on the weekly page uses the existing `/api/editorial-submission` transport, consent, Turnstile, same-origin checks, size bound and rate limit. Native fallback uses POST, never a GET query containing an email address.

Only email, locale, subscribe/withdraw action, explicit consent text/version and server receipt timestamp reach the editorial mailbox through Resend. No newsletter, confirmation, broadcast, contact-list registration, Telegram copy or subscriber email is triggered. Extra trip/age fields are stripped. Success means a request accepted for manual handling, not verified email ownership or an active subscription.

Operator responsibilities:
1. Keep requests separate from booking enquiries; deduplicate by email and retain the consent record.
2. Process withdrawal requests manually, checking ownership where necessary before disclosing or deleting data. Do not send marketing to an unverified address.
3. Remove pending requests within six months unless renewed permission is obtained. Apply removal to mailbox copies too; the website does not run mailbox deletion jobs.
4. Before any mailing launch, separately approve email verification, a subscriber store, unsubscribe handling, current privacy terms, a sending provider and editorial approval gates. No broadcast endpoint or scheduled mailing is implemented.

Consent guidance: https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique-sms-mms-et-automate-dappel . This implementation is not a legal compliance certification.

## Common Visit Rules And Child Ages

Optional `childAges` in the existing version-1 local trip profile records ages during the trip, 0–17, with null for unknown. There are no names or dates of birth. Legacy profiles remain valid; shrinking the group truncates ages without reassigning positions. Ready-made routes and custom days survive profile updates. Ages are excluded from shared collections, booking prefill and analytics.

`Place.visitRules` stores source-backed rules with `sourceUrl` and `checkedOn`; absence is unknown. Shared localized `conditions`, stairs and minimum-age notes are reused by route stops, public place cards and the trip catalogue. Nine stops across the five ready-made routes have sourced visit information. The Oceanographic Museum's explicit all-age general admission is stored as minimum age zero; ticket-price bands are never treated as entry restrictions. Other unsourced ages and pushchair policies remain unverified. Building access does not certify the whole walking route. See [day-routes.md](day-routes.md#shared-stop-conditions).

This is an incremental shared-data migration, not a claim that all facts in all guides have been centralized. Add rules to the place record, then reuse the helper instead of copying new restrictions into guides. Existing hours and visitor-access labels remain shared. Review dates never advance automatically.

## Optional Nearby Order

Three to twelve stops, all with reviewed coordinates and an explicitly recorded single city, may receive a walking-order suggestion. The first stop stays fixed. Leaflet's existing geodesic distance API is loaded only on click; a bounded nearest-neighbour heuristic is offered only if it improves the straight-line total. No routing API, geocoding request, location permission or new dependency is used.

The preview is not saved until the visitor applies it. Apply/undo reread the current plan and reject a changed order or a different stop set; no point is silently inserted, dropped or moved to another date. Manual ordering remains available. Different cities, unknown geographic data and transit/driving modes do not offer this suggestion.

This is **not** a globally optimal tour, pedestrian-access guarantee, road-distance calculation, opening-hours schedule, live navigation or safety assessment. Review every leg in external Maps before following it. Exact route optimisation and live schedule-conflict detection remain deferred.
