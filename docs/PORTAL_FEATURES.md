# Editorial And Trip Planning Features

Implemented 30 October 2026. Publication requires the normal commit, CI and deployment checks; local verification alone is not public-release evidence.

## Menton In Detail

`src/content/menton-details.ts` contains short, source-linked observations about an actual place, not another full-guide catalogue. The first entry covers the Cocteau wedding room, points to its existing illustrated place card and walking guide, and renders in the guide landing page after Guide Finder. It does not alter the four hero picks or NEW guide slot, create an extra indexable detail URL, or require a new image. EN/FR/IT/UK are required.

## This Week Near Menton

The existing `/[locale]/events/this-week` page is reused. `weekly-edition-2026-10-30.ts` supplies the first explicitly curated edition for 30 October–5 November 2026: Vivaldi Gloria in Menton, Halloween in Beausoleil, and Jimmy Gnecco/OURS in Monaco. The editorial value is why to choose each outing and how to think about the return journey, not a duplicate event calendar.

Titles, dates, verified wall times, places and sources resolve from the existing event records. `weeklyEventDateLabel` formats structured occurrence dates instead of copying prose date labels. Related events, guides and real place-card anchors are linked. Completed, unconfirmed, conflicting or out-of-window events are omitted; an expired/empty edition is not presented as current. Empty pages are noindex/follow and excluded from sitemap. Sitemap revalidates hourly so time-sensitive eligibility is not frozen until a new deployment.

Add a new edition only after checking official programmes and duplicate coverage. Supply editorial reasons and return-travel advice in all four languages, reference canonical existing IDs, run `npm run weekly:validate`, and review the page. Do not generate or publish an edition automatically or silently advance the previous edition's dates.

The second approved edition, `weekly-edition-2026-11-06.ts`, covers 6-12 November 2026 in all four languages. It selects St John's Jazz (6 November), Note d'aMare in Bordighera (8 November), and Stand Up Monaco (9 November), plus a non-event Halles morning. The existing Paris-date resolver keeps the first edition through 5 November and selects the second from 6 November; completed events disappear without removing the continuing local morning suggestion. No new public preview endpoint or auto-publishing mechanism was added.

The detail collection now contains three observations: Cocteau's wedding room, the Halles facade and Fontana Rosa's literary ceramics. All reuse existing illustrated places and full guides. The shared guide-link label is neutral rather than incorrectly calling every destination a Cocteau walk.

## Weekly Editorial Review

The existing Codex heartbeat `azur-menton` was expanded on 31 October 2026 rather than duplicated. It runs Mondays at 09:00 Europe/Paris in the owner's project chat and is report-only:

1. Recheck published events for dates, sessions, venues, access, cancellations, stale links and missing covers, using official sources.
2. Search small local events for the next three calendar months and major cultural/sporting events for the next twelve months, covering Menton, the French Riviera, neighbouring villages and nearby Italy. Compare published records and existing pending/borderline batches before calling an item new.
3. Propose the next weekly edition, 2-3 source-backed Menton-in-detail observations, and gaps in existing route content. Check already prepared future editions before proposing another for the same dates.
4. Deliver a weekly editorial shortlist with sources, checked dates, uncertainties, relevant content links, image needs and one priority action. No source means unconfirmed, not permission to infer last year's dates.

The schedule lives in Codex, not a Vercel cron or repository publishing job. It does not edit files, commit/push, publish, contact organisers or guests, send newsletters, change bookings or touch Telegram. Publication remains a separate owner-approved action. The independent guide-maintenance, roadmap and 30 November ski-season reviews are unchanged.

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

`Place.visitRules` stores source-backed rules with `sourceUrl` and `checkedOn`; absence is unknown. Shared localized `conditions`, stairs and minimum-age notes are reused by route stops, public place cards and the trip catalogue. Twelve stops across the five ready-made routes have sourced visit information, including scoped street approaches; they are not twelve certified accessible stops. The Oceanographic Museum's explicit all-age general admission is stored as minimum age zero; ticket-price bands are never treated as entry restrictions. Other unsourced ages and pushchair policies remain unverified. Building access, lifts and an external route listing do not certify the whole walking route or live lift operation. See [day-routes.md](day-routes.md#shared-stop-conditions).

This is an incremental shared-data migration, not a claim that all facts in all guides have been centralized. Add rules to the place record, then reuse the helper instead of copying new restrictions into guides. Existing hours and visitor-access labels remain shared. Review dates never advance automatically.

## Optional Nearby Order

Three to twelve stops, all with reviewed coordinates and an explicitly recorded single city, may receive a walking-order suggestion. The first stop stays fixed. Leaflet's existing geodesic distance API is loaded only on click; a bounded nearest-neighbour heuristic is offered only if it improves the straight-line total. No routing API, geocoding request, location permission or new dependency is used.

The preview is not saved until the visitor applies it. Apply/undo reread the current plan and reject a changed order or a different stop set; no point is silently inserted, dropped or moved to another date. Manual ordering remains available. Different cities, unknown geographic data and transit/driving modes do not offer this suggestion.

This is **not** a globally optimal tour, pedestrian-access guarantee, road-distance calculation, opening-hours schedule, live navigation or safety assessment. Review every leg in external Maps before following it. Exact route optimisation and live schedule-conflict detection remain deferred.
