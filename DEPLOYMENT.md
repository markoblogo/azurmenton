# Azur Menton Deployment

## Target

- Deployment platform: Vercel
- GitHub repository: https://github.com/markoblogo/azurmenton
- Production domain: https://azurmenton.com
- DNS provider: Cloudflare

Do not commit secrets. Do not deploy, connect the domain or change Cloudflare DNS from local development unless explicitly requested.

## Vercel Setup

1. Import `https://github.com/markoblogo/azurmenton` into Vercel.
2. Use the Next.js framework preset.
3. Build command: `npm run build` or Vercel's detected default.
4. Output directory: leave as the default for Next.js.
5. Add environment variables from `.env.example`.
6. Deploy a preview first and test the routes listed in `LAUNCH_CHECKLIST.md`.
7. Add production domains:
   - `azurmenton.com`
   - `www.azurmenton.com`
8. Configure `www` redirect to the apex domain if desired.

## Required Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=https://azurmenton.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
NEXT_PUBLIC_PLAUSIBLE_API_HOST=
NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
RESEND_API_KEY=
BOOKING_REQUEST_TO_EMAIL=
BOOKING_REQUEST_FROM_EMAIL=
```

`RESEND_API_KEY` must be configured in Vercel for booking requests to be delivered by email. Without it, the form will show an error and ask guests to contact by email or WhatsApp instead of silently dropping the request.

Weather variables are reserved for a future weather widget and may remain blank if that feature is not enabled:

```bash
WEATHER_PROVIDER=
WEATHER_LATITUDE=
WEATHER_LONGITUDE=
```

## Cloudflare DNS

Follow the exact DNS values shown by Vercel for the project.

- Add the apex record for `azurmenton.com` according to Vercel instructions.
- Add the `www` CNAME according to Vercel instructions.
- Keep Vercel-related records DNS only / gray cloud unless there is a specific reason to proxy them.
- Add any TXT verification record if Vercel asks for it.
- Do not delete existing MX or email-related DNS records.

## Post-Launch Checks

- `https://azurmenton.com` loads.
- `https://www.azurmenton.com` redirects as intended.
- `/en`, `/fr`, `/it`, `/uk` work.
- `/sitemap.xml` and `/robots.txt` work.
- Apartment pages and galleries work.
- Booking request form delivers an email, or the fallback error/contact path is clear.
- Mobile layout works.
- Browser console has no production errors.
- Google Search Console domain verification is completed.
- Sitemap is submitted in Google Search Console.
