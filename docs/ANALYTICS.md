# Analytics Contract

Azur Menton uses Plausible for lightweight booking funnel events and Vercel Analytics for Web Vitals. Events must remain locale-agnostic and must not include personal data.

## Event Names

- `check_availability_view`
- `apartment_discovery`
- `apartment_detail_view`
- `guide_cta_click`
- `event_cta_click`
- `apartment_cta_click`
- `booking_form_start`
- `inquiry_intent`
- `booking_request_submit_success`
- `booking_request_submit_error`
- `whatsapp_click`
- `email_click`
- `airport_board_loaded`
- `airport_board_failed`
- `airport_arrivals_external_click`
- `airport_departures_external_click`
- `airport_transport_guide_click`

## Safe Props

- `locale`
- `page_type`, `page_path` for the current page context
- `sourcePageType`: `home`, `apartment`, `guide`, `event`, `stay` or `other`
- `sourceSlug`
- `sourceGuideSlug`
- `sourceEventSlug`
- `sourceApartmentSlug`
- allowlisted acquisition context: `utm_source`, `utm_medium`, `utm_campaign`
- `apartmentPreference`
- `visitingForEvent`
- `dateFlexibility`
- airport board context: `airportCode`, `boardType`, `embedMode`
- aggregate form context: `parking`, `preferred_language`, `has_dates`, `has_email`, `has_phone`, `has_message`, `guests`, `stay_nights`, `lead_time_days`

## Privacy Notes

Never send names, email addresses, phone numbers or free-text message content to analytics. Contact fields may only be represented as booleans such as `has_email` or `has_phone`. Airport-board events describe only the airport, arrivals/departures view and embed mode; they do not collect travel identity or itinerary details.

## Funnel Interpretation

Plausible pageviews represent content views. `apartment_discovery` records a natural content recommendation click into an apartment detail page; `apartment_detail_view` records that destination while retaining the originating guide/event context. Use CTA events, `check_availability_view`, `inquiry_intent`/`booking_form_start`, `booking_request_submit_success` and `booking_request_submit_error` to measure drop-off by locale, source context, allowlisted UTM campaign and apartment preference. The current system has no booking database or confirmed-booking signal, so `booking_request_submit_success` means a request was accepted by the existing application action, not a confirmed reservation.

Run `npm run booking:funnel` to print the current event/property contract.

## Local Funnel Dashboard

`npm run booking:dashboard` queries the Plausible Stats API only when run with a local `PLAUSIBLE_STATS_API_KEY` and `PLAUSIBLE_SITE_ID`. It prints aggregate funnel-event counts and successful-request breakdowns by locale, source page type, source slug, apartment preference and allowlisted UTM dimensions. A landing page/referrer remains an aggregate Plausible concern; the application preserves only explicit source and UTM context.

The script is deliberately local and read-only: do not put the Stats API key in public browser variables or Vercel runtime variables. Use `npm run booking:dashboard -- --period=91d` for a wider review window. It does not create a guest database, retrieve raw events, or query PII.

In Plausible, create goals for the canonical funnel events and use its goal-funnel view for visitor-level step analysis. The CLI report complements that view with the approved source-attribution breakdowns.

## Observation period

After deployment, observe the baseline before adding a new provider or dashboard. Compare content-view/pageview volume, apartment discovery-to-detail continuity, inquiry intent, and accepted-request events by locale/source/UTM. Keep the observation period read-only and aggregate; do not infer confirmed revenue without an external confirmed-booking source.
