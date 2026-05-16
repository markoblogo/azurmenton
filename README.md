<img src="./public/images/brand/azurmenton.png" alt="Azur Menton" width="220" />

# Azur Menton

Production website for Azur Menton, a small family-run short-term rental brand for three beachfront or beachside apartments in central Menton, France.

The site is static-first, multilingual, SEO-focused, and designed for a temporary direct request-to-book flow before a channel manager such as Smoobu or Lodgify is connected.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static pages where possible
- Simple TypeScript content files
- Vercel-compatible deployment

## Routes

- `/en`, `/fr`, `/it`, `/uk`
- `/[locale]/apartments`
- `/[locale]/apartments/[slug]`
- `/[locale]/check-availability`
- `/[locale]/guide`
- `/[locale]/guide/[slug]`
- `/[locale]/events`
- `/[locale]/events/[slug]`
- `/[locale]/faq`
- `/[locale]/contact`
- `/[locale]/privacy`
- `/[locale]/legal`
- `/[locale]/cookies`
- `/[locale]/booking-terms`

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000. The root path redirects to `/en`.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Booking Flow

The booking page is a manual request form, not instant booking. It collects:

- apartment
- check-in and check-out dates
- adults and children
- parking need
- preferred language
- name, email, phone or WhatsApp
- message
- required privacy acknowledgement for responding to the booking request

The current implementation uses:

- server action: `src/app/actions/booking-request.ts`
- API route: `src/app/api/booking-request/route.ts`
- email helper: `src/lib/resend.ts`

In production, request delivery requires `RESEND_API_KEY` and `BOOKING_REQUEST_TO_EMAIL` to be set in Vercel. If email delivery is not configured or fails, the form returns an error and asks the guest to contact by email or WhatsApp instead of pretending the request was delivered. The booking logic remains isolated so it can later connect to Telegram, Airtable, Supabase, Smoobu, Lodgify, or another booking engine.

Current guest contact details:
- Email: `petraetpaul@gmail.com`
- Phone / WhatsApp: `+33 6 24 71 65 65`

## Weather Widget

The homepage uses `src/lib/weather.ts` and `src/components/weather/WeatherWidget.tsx` to fetch Menton weather server-side from Open-Meteo with a two-hour cache. It shows current temperature, sea surface temperature, condition, wind, rain chance, a five-day forecast, provider label and a graceful fallback if the provider is unavailable. Sea temperature comes from the Open-Meteo Marine API and is treated as a planning indicator, not a swimming safety guarantee.

Configure provider and Menton coordinates with:

```bash
WEATHER_PROVIDER=open-meteo
WEATHER_LATITUDE=43.7745
WEATHER_LONGITUDE=7.4975
```

Open-Meteo is the first provider because it does not require a key for prototyping. Review provider terms before production launch or heavier commercial use.

## Legal Pages

The site includes locale routes for:

- Legal Notice: `/[locale]/legal`
- Privacy Policy: `/[locale]/privacy`
- Cookie Policy: `/[locale]/cookies`
- Booking Terms: `/[locale]/booking-terms`

The French version is treated as the primary compliance draft. Owner, publisher, registration and registered office details are populated from the SCI Petra et Paul Kbis extract. Hosting provider details, mediator, payment, cancellation, tourist tax, deposit and retention periods still require final legal/business confirmation before production launch.

## Content

- `src/config/site.ts` - domain and site-level config
- `src/content/apartments.ts` - apartment data and image gallery metadata
- `src/content/guide.ts` - Menton guide landing and article content
- `src/content/events.ts` - event landing and evergreen event-planning content
- `src/content/pages.ts` - FAQ and simple contact/legal content
- `src/content/navigation.ts` - navigation labels
- `src/content/translations.ts` - reusable interface text
- `public/images/` - local brand, apartment and guide assets

English is the source language. French, Italian, and Ukrainian use the same content structure and should be refined by a native speaker before final launch. Exact event dates are intentionally omitted until sourced dates can be added with a `sourceUrl`.

## SEO

The app includes:

- localized metadata
- canonical URLs for `https://azurmenton.com`
- hreflang alternates including `x-default`
- `sitemap.xml`
- `robots.txt`
- JSON-LD for the home page, apartment pages, guide/event articles, FAQ and breadcrumbs
- `next/image` for local brand, apartment and guide assets

After deployment, verify the domain in Google Search Console, submit `https://azurmenton.com/sitemap.xml`, and check indexing coverage, hreflang issues, mobile usability and Core Web Vitals. Do not add analytics or tracking pixels unless cookie compliance is handled.

See `LAUNCH_CHECKLIST.md` for the production SEO and launch checklist.

## Deployment

- Expected target: Vercel
- Domain: `azurmenton.com`
- DNS managed through Cloudflare

See `DEPLOYMENT.md` for first production deployment steps.

Do not configure DNS, deploy, or connect production services from local development unless explicitly requested.
