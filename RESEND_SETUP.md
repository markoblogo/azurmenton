# Resend setup for booking requests

Azur Menton sends direct booking requests through Resend when the production environment variables are configured.

## 1. Verify the sending domain

1. Open Resend and add the domain `azurmenton.com`.
2. Add the DNS records Resend gives you for domain verification and email authentication.
3. Wait until Resend shows the domain as verified.

Do not use an unverified personal sender for production booking mail. The recommended sender is:

```txt
Azur Menton <booking@azurmenton.com>
```

## 2. Create an API key

Create a Resend API key with permission to send email. Store it only in Vercel environment variables, never in the repository.

Required production variables:

```txt
RESEND_API_KEY=...
BOOKING_REQUEST_TO_EMAIL=petraetpaul@gmail.com
BOOKING_REQUEST_FROM_EMAIL="Azur Menton <booking@azurmenton.com>"
```

## 3. Set variables in Vercel

Add the variables in the Vercel project environment settings for Production. Redeploy after saving them.

## 4. Test the booking flow

Submit a real booking request from `/en/check-availability` with an obvious test message, for example:

```txt
TEST REQUEST - please confirm that Resend delivery works. Do not treat this as a real booking.
```

Expected result:

- The website shows the normal success message.
- The host inbox receives the email.
- The Resend dashboard shows a delivered email event.
- Replying to the email should target the guest email because the request uses `reply_to`.

If the website shows a failure message, check:

- `RESEND_API_KEY` exists in Vercel Production.
- `BOOKING_REQUEST_TO_EMAIL` is set.
- `BOOKING_REQUEST_FROM_EMAIL` uses a verified domain.
- The latest deployment was created after env vars were saved.
- The Resend dashboard logs for rejection, domain, or permission errors.

WhatsApp is not sent automatically by the site. The phone/WhatsApp field is included in the booking email so the host can reply manually.
