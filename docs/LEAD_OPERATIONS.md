# Lead Operations

Azur Menton uses a manual request-to-book flow. A submitted form is a lead, not a booking confirmation.

## Scope

- Form data is delivered to the host inbox through Resend; the operational BCC receives the same request.
- The website stores no CRM record and sends no personal data to Plausible or Vercel Analytics.
- Any private lead tracker belongs to the owner account, not the public site or repository.

## Intake

1. Treat each email with the `[Azur Menton] Booking request:` subject as a new lead.
2. Reply in the guest's preferred language where practical.
3. Confirm availability manually before mentioning an offer, price or booking outcome.
4. Keep the request in one inbox thread so the original dates, apartment preference, event and flexibility remain visible.

## Suggested Private Statuses

Use inbox labels or a private tracker only:

- `New` - not yet assessed.
- `Replied` - first human response sent.
- `Availability checked` - dates and apartment options reviewed.
- `Offer sent` - an actual manual offer was sent.
- `Follow-up due` - no answer after the agreed owner follow-up window.
- `Closed` - booked elsewhere, unavailable, declined or no response.

## Response Standard

- Aim for a first human reply within two hours during the owner's response window; otherwise reply by the next local morning.
- A first reply should acknowledge dates, guest count, apartment preference and any parking/event/flexibility context.
- Do not promise availability, a price, resident-access permissions, parking, transfers or event tickets before checking them.
- For a flexible request, offer only verified alternative dates or apartments.

## Weekly Review

1. Run `npm run booking:dashboard -- --period=28d` locally when a Plausible Stats API key is available.
2. Compare `check_availability_view`, `booking_form_start` and `booking_request_submit_success` by locale, source and apartment preference.
3. Review the five strongest source slugs and the largest form-start-to-success drop-off.
4. Change one or two page-level CTAs or practical explanations, then review again after a full period. Do not react to a single low-volume week.

## Privacy

The dashboard is restricted to aggregate non-PII dimensions: locale, source page type, source slug and apartment preference. Names, emails, phones, message text and exact guest identity stay inside the host's booking-email workflow and must never be passed to analytics or committed to the repository.
