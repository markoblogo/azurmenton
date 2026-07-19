# Product Context

Last reviewed: 2026-07-19

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
- Events, hours, prices, routes, and official programmes need current source support. Annual-series pages may use cautious windows when exact dates are not confirmed.
- Analytics uses aggregate booking-funnel context only. Never put names, email addresses, phone numbers, or message text into analytics.
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
