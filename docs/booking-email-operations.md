# Booking email operations

## Evidence, not delivery assumptions

The server logs `booking_email` with a generated `requestId`, elapsed time,
and the provider message ID when available. The same request ID is attached
to the email as a header and a Resend tag. No guest payload or recipient
addresses are included in these application logs.

- `attempt_started`: the sender was entered, not proof of provider acceptance.
- `provider_accepted`: Resend accepted the request, not proof of Inbox delivery.
- `not_configured`: required server configuration is absent.
- `provider_rejected`: the provider returned an HTTP error.
- `delivery_unknown`: timeout/network failure; investigate before resending.

There is no automatic retry after ambiguous delivery and no durable booking
queue. An isolated start record without a terminal record can indicate an
interrupted invocation.

## Telegram copies and alerts

Set server-only `BOOKING_ALERT_TELEGRAM_BOT_TOKEN` and
`BOOKING_ALERT_TELEGRAM_CHAT_ID` in the deployment environment. The bot must
be allowed to message that chat. On 2026-10-26 the owner created
`@azurmenton_alerts_bot`, started it, and approved private enquiry copies to
their own account. Both variables were saved as Production secrets in Vercel;
live delivery still requires a post-deployment test. Never paste tokens into
public issues or commit them.

After each validated enquiry email attempt, the application attempts one
Telegram copy with a three-second timeout. It contains the enquiry details
and the email outcome; failures are prominently labelled. It is plain text,
with link previews disabled, and bounded below Telegram's message limit.
Telegram errors do not replace the booking result; they produce a redacted
`booking_alert` failure log. Invalid/anti-spam-rejected requests do not reach
this sender. Telegram acceptance is not proof that the owner read the copy.

These private bot messages contain guest personal data and are not secret
chats. Keep access restricted to the owner; honour deletion requests for both
mail and Telegram copies. The four localized privacy pages disclose this
channel. Do not forward copies to groups or add tracking/payment data. The
bot is a one-way notification channel, not a guest support inbox.
Late bounces/delays after provider acceptance, interrupted invocations and a
complete site outage are not covered by this hook. They need a separately
verified provider webhook/external monitor. No durable alert queue is present.

## Investigate one request

1. Find `booking_email` in Vercel runtime logs and correlate its `requestId`.
2. Open the returned `providerMessageId` in Resend. Check both primary and copy
   recipients and delivery/bounce details, rather than the form thank-you screen.
3. Alternatively run `npm run booking:email-status -- <message-UUID>` with a
   locally configured `RESEND_READ_API_KEY` permitted to retrieve sent emails.
   This command only performs a GET and prints status and recipient counts.
   Do not commit the key or put it in a command-line argument. It does not load
   `.env.local` automatically.
4. A message-level Delivered event is not proof that every recipient saw it in
   Inbox. Confirm a copy with the owner when investigating missing mail.

Failures/unknown status exit nonzero. Sent/queued states remain pending, even
when the lookup command succeeds. Never disable anti-spam for a delivery test.

## Domain authentication

On 2026-10-26, Cloudflare and public DNS confirmed `_dmarc.azurmenton.com`
TXT `v=DMARC1; p=none`. This does not enforce quarantine/rejection and has no
aggregate-report recipient (`rua`). SPF/DKIM records existing in DNS alone do
not establish alignment for every message; check received authentication
headers before tightening policy. No other DNS records were changed.

Next operational gate: test delivery after deployment, then add a verified
provider webhook for asynchronous delivery issues. Telegram's API contract:
https://core.telegram.org/bots/api#sendmessage.
