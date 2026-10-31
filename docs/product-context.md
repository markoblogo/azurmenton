# Product Context

Last reviewed: 2026-10-31

## Product

Azur Menton is a multilingual direct-booking site for three central Menton apartments. It combines apartment presentation, manual availability requests, and practical local guides for guests planning a stay.

## Audience And Jobs

- Prospective guests comparing a direct stay in Menton with other Riviera options.
- Guests planning beaches, walks, practical errands, car-free travel, seasonal stays, and day trips.
- The site should reduce planning uncertainty and make a booking request easy without implying instant confirmation.

## Conversion Action

Primary: a manual availability or booking request. Secondary: a useful guide, apartment, event, map, WhatsApp, or email interaction that meaningfully supports that request.

## Proof And Limits

- Product facts, apartment details, guide content, events, places, and local recommendations live in typed `src/content/` modules.
- Booking requests are not confirmations; availability and final terms require human handling.
- Read-only stay-window previews may be shown from connected external iCal exports, but they remain planning guidance only and must never imply instant confirmation or write back to external channels.
- Homepage and FAQ copy must describe those previews consistently in every supported locale; do not claim that the site has no availability view.
- Events, hours, prices, routes, and official programmes need current source support. Annual-series pages may use cautious windows when exact dates are not confirmed.
- Event calendar downloads contain verified hours or date-only planning entries; they are not subscriptions and do not receive automatic cancellation updates. Separate sessions require an explicit choice. Public editorial submissions are unverified email proposals for manual moderation, not automatic publication or booking requests.
- Analytics uses aggregate booking-funnel context only. Never put names, email addresses, phone numbers, or message text into analytics.
- The local trip/favourites release batch keeps saved preferences on the visitor's device. Shared collection links contain content IDs, not trip dates or party details. Booking prefill is explicitly user-triggered and never sends a request automatically. See `docs/TRIP_FEATURES.md` for implementation and release status.
- Public apartment guest guides contain preparation advice and existing local content, never codes, unit details or private arrival instructions. Host-specific arrangements require confirmation; public guest-guide pages are noindex, not access-controlled private pages.
- Contextual recommendations use existing apartment links and verified facts. Short confirmed events may suggest request dates after an explicit click; this never confirms availability, changes the saved trip or sends a booking. Longer-stay prices and conditions require a personal reply.
- uMap is an optional editor-side export/preview tool over canonical route data, not the site's main map or a second place database. Saving/embedding an external map remains a separate approval.
- A local editorial metadata registry/report coordinates existing workflows without copying content or importing private submissions. Pipeline readiness, owner approval, canonical presence and public verification remain distinct. No scheduled guide publication or automatic publisher is enabled. See `docs/editorial-queue.md`.
- Manual guide packets wrap existing preparation/check/image commands and retain input-bound local QA receipts. Post-publication illustrations remain supported. A loopback-only runtime trial is not connected to production content, Pagefind, maps or hosted storage. See `docs/guide-manual-workflow.md`; no new automatic publication authority is implied.
- Any future CortexABV guest chat is a separate read-only, guide-grounded surface. It cannot check or change availability, price, payment, booking, guest records, or site content; unsupported or current operational questions must abstain or hand off.

## Language And Claim Boundaries

- Use practical, calm, locally useful language. English is the editorial source; translations must remain natural.
- Do not invent availability, ratings, reviews, distances, opening hours, ticket prices, transport guarantees, official affiliations, or event programmes.
- Do not add review or aggregate-rating structured data without maintained real data.

## Source Surfaces

- `README.md`, `AGENTS.md`, `docs/content-operations.md`, `docs/ANALYTICS.md`, `docs/LEAD_OPERATIONS.md`, and `docs/cortex-abv-guest-ai-boundary.md`.
- `src/content/`, `src/lib/structured-data.ts`, and booking request routes.

## Maintenance

Refresh after material changes to apartments, booking flow, content model, analytics contract, or public positioning. Drafts and recurring review outputs remain proposal-first until explicitly approved.
