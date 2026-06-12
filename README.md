# Azur Menton

Production website for **Azur Menton**, a family-run direct booking site for three beachfront or beachside apartments in central Menton, France.

The site is multilingual, SEO-focused, image-led, and built around a manual direct booking request flow. It also includes an editorial Menton guide, a Riviera events calendar, apartment comparison pages, legal pages, and practical planning content for guests visiting Menton, Monaco, Nice and the nearby Riviera.

Current production domain: `https://azurmenton.com`

## Stack

- Next.js `16.2.6` App Router
- React `19.2.4`
- TypeScript
- Tailwind CSS `4`
- Local TypeScript content files
- Static generation where possible
- Daily revalidation for events pages
- Resend-based email delivery for booking requests
- Open-Meteo weather and marine forecast data
- Cloudflare Turnstile bot protection for booking requests
- Plausible and Vercel Analytics
- Vitest unit tests and Playwright smoke tests
- Sharp-based image derivative pipeline
- GitHub Actions CI
- Vercel-compatible deployment

Important: this project uses a newer Next.js version with changed conventions. Before changing Next.js APIs or framework behavior, read the relevant local docs in `node_modules/next/dist/docs/`.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The root path redirects to `/en`.

Useful checks:

```bash
npm run lint
npm run typecheck
npm test
npm run images:check
npm run build
```

Optional checks:

```bash
npm run test:e2e
npm run images:generate
npm run seo:validate
```

Production preview after a build:

```bash
npm run start -- --hostname 127.0.0.1 --port 3000
```

Do not commit generated build output, local `.env.local` files or private API keys.

## Environment

Create a local `.env.local` from `.env.example` when needed.

```bash
NEXT_PUBLIC_SITE_URL=https://azurmenton.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
NEXT_PUBLIC_PLAUSIBLE_API_HOST=
NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

WEATHER_PROVIDER=open-meteo
WEATHER_LATITUDE=43.7745
WEATHER_LONGITUDE=7.4975

RESEND_API_KEY=
BOOKING_REQUEST_TO_EMAIL=
BOOKING_REQUEST_FROM_EMAIL=
```

`RESEND_API_KEY` must never be committed. In production, booking request delivery needs `RESEND_API_KEY` and `BOOKING_REQUEST_TO_EMAIL` set in Vercel.
Turnstile is enabled only when both `TURNSTILE_SECRET_KEY` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` are configured. Plausible is enabled when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` or a site-specific `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC` is configured. Production currently uses Plausible's managed script URL through `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC`; do not paste raw analytics snippets into layout files.

For Resend, the sending domain must be verified in Resend before `BOOKING_REQUEST_FROM_EMAIL` can use that domain reliably. Keep `RESEND_SETUP.md` updated with the current production sender and manual test result.

## Locales and Routes

Supported locales:

- `/en`
- `/fr`
- `/it`
- `/uk`

Main routes:

- `/[locale]`
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

The localized layout renders the main navigation, footer, sticky CTA and locale-aware content. The footer includes a subtle flag-based language switcher that preserves the current path when changing language.

The root path redirects to `/en`.

## Apartments

The apartment collection is defined in `src/content/apartments.ts`.

Current apartment slugs:

- `sea-view-balcony-studio`
- `beachside-family-apartment`
- `panoramic-sea-view-studio`

Apartment pages include:

- image-led hero and gallery
- localized descriptions and SEO
- amenities and practical positioning
- related guide links
- direct booking CTAs
- subtle viewport-only photo shine animation on visible imagery

Apartment photography is stored under:

- `public/images/apartments/sea-view-balcony-studio/`
- `public/images/apartments/beachside-family-apartment/`
- `public/images/apartments/panoramic-sea-view-studio/`

Homepage hero and apartment cards also use selected apartment images from `public/images/home/` and apartment galleries. Avoid reusing the same title images in both the main hero slideshow and the small inset slideshow.

When replacing apartment photos, keep these surfaces in sync:

- apartment `gallery` metadata in `src/content/apartments.ts`
- apartment hero/supporting collage image selection
- apartment comparison cards
- homepage hero slideshows
- homepage/apartments page collage imagery
- gallery preview composition

## Direct Booking Flow

The booking page is a manual request flow, not instant booking. It collects:

- requested apartment
- check-in and check-out dates
- adults and children
- parking need
- preferred language
- name, email, phone or WhatsApp
- message
- required privacy acknowledgement

Key files:

- `src/components/booking/BookingRequestForm.tsx`
- `src/app/actions/booking-request.ts`
- `src/app/api/booking-request/route.ts`
- `src/lib/booking-request.ts`
- `src/lib/rate-limit.ts`
- `src/lib/resend.ts`
- `src/lib/turnstile.ts`

If email delivery is not configured or fails, the form returns an error and asks the guest to contact by email or WhatsApp. The site must not pretend that a request was delivered when delivery failed.

For production Resend setup and the manual test checklist, see `RESEND_SETUP.md`.

The API route includes:

- JSON body size limit
- no-store JSON responses
- in-memory per-client rate limiting
- a honeypot field for bot submissions
- optional Cloudflare Turnstile validation when production keys are configured
- server-side validation with localized client-facing messages
- safe logging that avoids dumping full guest messages into logs

Guest contact details are configured in `src/config/site.ts`:

- Email: `petraetpaul@gmail.com`
- WhatsApp: `+33 6 24 71 65 65`

## Menton Guide

The guide section is a searchable, filterable editorial guide and local blog for guests.

Key files:

- `src/content/guide.ts`
- `src/content/places.ts`
- `src/content/walking-distances.ts`
- `src/content/transport.ts`
- `src/components/guide/GuideExplorer.tsx`
- `src/components/guide/GuideVisual.tsx`
- `src/components/guide/PlaceCard.tsx`
- `src/components/guide/WalkingDistanceGuide.tsx`
- `src/components/guide/PublicTransportGuide.tsx`

Guide articles include beaches, food, markets, old town walks, day trips, no-car planning, public transport, nightlife and practical stay planning.

Place cards support:

- name, type and area/address
- Google Maps search links
- cautious opening-hours labels
- related guide article links
- owned local imagery or editorial placeholders

Do not scrape Google Maps photos, hotlink third-party images, use unofficial screenshots, or invent ratings/opening hours. See `docs/archive/GUIDE_IMAGE_STRATEGY.md` for the current image policy and future Google Places API notes.

Guide images are stored in:

- `public/images/guide/`
- `docs/archive/GUIDE_IMAGE_MAPPING.md`

## Events Calendar

The events section is an interactive Riviera calendar for Menton, Monaco, Nice and nearby destinations.

Key files:

- `src/content/riviera-events.ts`
- `src/content/events.ts`
- `src/lib/events.ts`
- `src/components/events/EventsCalendar.tsx`
- `src/components/events/EventImage.tsx`
- `src/app/[locale]/events/page.tsx`
- `src/app/[locale]/events/[slug]/page.tsx`

Event behavior:

- confirmed upcoming/current events appear in the main calendar
- events with exact dates are hidden after they end
- undated planning guides appear in a separate dates-to-confirm section
- past confirmed events are available through helper logic, but are not shown in the main list by default
- events pages revalidate daily

Date status logic lives in `src/lib/events.ts` and uses date-only comparison to avoid timezone bugs.

Event data includes source status fields:

- `verified`
- `needs_verification`
- `official_source_needed`

Do not invent exact dates, ticket prices, routes, opening hours or official rules. If details are not verified, keep public wording cautious.

Event illustrations are stored in:

- `public/images/events/`
- `docs/archive/EVENT_IMAGE_MAPPING_NOTES.md`
- `docs/archive/IMAGE_EVENT_AUDIT.md`

They are project illustrations, not documentary event photos.

## Visual Effects

Subtle image shine is handled by:

- `src/components/media/PhotoShineObserver.tsx`
- `.photo-shine-*` rules in `src/app/globals.css`

The observer targets large `next/image` photos inside `main`, skips header/footer/navigation imagery, and toggles animation only when a photo surface is visible. It also respects `prefers-reduced-motion`.

Keep this effect restrained. It should feel like an occasional Mediterranean light glint, not a constant animation layer.

## Weather Widget

The homepage weather widget uses:

- `src/lib/weather.ts`
- `src/components/weather/WeatherWidget.tsx`

It fetches Menton weather server-side from Open-Meteo with a two-hour cache and includes:

- current air temperature
- sea surface temperature
- condition
- wind
- rain chance
- five-day forecast
- graceful fallback

Sea temperature comes from the Open-Meteo Marine API and is a planning indicator, not a swimming safety guarantee.
The cache duration is centralized in `weatherRevalidateSeconds` and should stay aligned across weather and marine fetches.

## Images and Media Policy

Local images live under `public/images/`.

Current image groups:

- `public/images/home/`
- `public/images/apartments/`
- `public/images/guide/`
- `public/images/events/`

Use `next/image` for site imagery. Do not hotlink third-party images, scrape Google Maps, add unsafe external scripts, embed random social widgets, or imply that illustrations are official event photos.

Large opaque PNGs should be converted to quality JPEG only after visual comparison. As of 2026-06-12, `public/images` is about 65 MB, has 134 local image files, includes 12 generated WebP/AVIF derivative files, and has no local image over 1.5 MB.
Use `npm run images:generate` to create WebP and AVIF derivatives for selected hero/LCP images under `generated/` folders before wiring them into rendering paths.
Use `npm run images:check` in CI or before deployment to verify the derivative manifest still matches the committed generated files.

`next.config.ts` restricts allowed image qualities to `75` and `90`; use one of those values when adding `next/image` calls with explicit quality.

For Next.js 16 hero/LCP imagery, prefer `preload` or `fetchPriority="high"` over the deprecated `priority` prop. Use `loading="eager"` only for the first visible slideshow image or other true above-the-fold candidates.

Image audit and mapping documents:

- `docs/archive/IMAGE_AUDIT.md`
- `docs/archive/IMAGE_AUDIT_AFTER_RECOPY.md`
- `docs/archive/IMAGE_SOURCE_COMPARISON.md`
- `docs/archive/HOME_IMAGE_COMPARISON.md`
- `docs/archive/GUIDE_IMAGE_MAPPING.md`
- `docs/archive/GUIDE_IMAGE_STRATEGY.md`
- `docs/archive/EVENT_IMAGE_MAPPING_NOTES.md`
- `docs/archive/IMAGE_EVENT_AUDIT.md`

## Security and Reliability

Security-related configuration lives primarily in:

- `next.config.ts`
- `src/proxy.ts`
- `src/app/api/booking-request/route.ts`
- `src/lib/booking-request.ts`
- `src/lib/rate-limit.ts`
- `src/lib/resend.ts`
- `src/lib/security-headers.ts`
- `src/lib/turnstile.ts`

Current baseline:

- `poweredByHeader` disabled
- nonce-based Content Security Policy generated in `proxy.ts`
- HSTS
- frame denial
- strict referrer policy
- restrictive permissions policy
- immutable cache headers for local images
- no third-party embeds except explicitly reviewed services: Cloudflare Turnstile, Plausible and Vercel Analytics
- no public API keys committed

The CSP must not use `unsafe-inline` in production. Nonce-based CSP is generated per request in `src/proxy.ts`; this makes App Router page responses dynamic, which is the expected tradeoff for strict nonce CSP in this project. If script or style behavior changes, test all App Router pages, metadata, fonts, analytics and interactive forms carefully.

Run `npm audit --omit=dev` periodically. The project currently uses a `postcss` override to keep the dependency tree on a patched version.

CI runs on pushes and pull requests to `main` and currently covers install, lint, typecheck, unit tests, image derivative manifest validation and production build.

## SEO and Structured Data

SEO utilities live in:

- `src/lib/seo.ts`
- `src/lib/structured-data.ts`
- `src/components/seo/JsonLd.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`

The app includes:

- localized metadata
- canonical URLs for `https://azurmenton.com`
- hreflang alternates including `x-default`
- sitemap and robots routes
- JSON-LD for relevant page types, including `LodgingBusiness`, `VacationRental`, `FAQPage`, `CollectionPage`, `ItemList`, `ContactPage`, articles and breadcrumbs
- breadcrumbs where useful
- Article/WebPage-style schema for guide and seasonal event guides

Apartment `VacationRental` schema must keep Google-required fields valid: stable `identifier`, `geo`, and `containsPlace`. Do not add `review` or `aggregateRating` unless real review/rating data exists and can be kept accurate.

Do not add Event schema unless exact official event date/location/source data is verified.

The `azurmenton.com` domain property is verified in Google Search Console through Cloudflare DNS. After deployment, resubmit `https://azurmenton.com/sitemap.xml` when schema or route coverage changes, inspect priority URLs, and monitor indexing, hreflang, mobile usability and Core Web Vitals. Use `docs/search-console-validation.md` for the validation checklist and `npm run seo:validate` for a quick live schema/canonical/hreflang smoke test.

## Analytics and Funnel Events

Analytics is intentionally limited to privacy-friendly product signals:

- Plausible pageviews and funnel events
- Vercel Analytics for Core Web Vitals
- no broad third-party marketing tags

Canonical funnel event names:

- `check_availability_view`
- `booking_form_start`
- `booking_request_submit_success`
- `booking_request_submit_error`

Keep event names stable and locale-agnostic.

## Tests and CI

Automated coverage is intentionally small and focused on commercial risk:

- Vitest unit tests for booking validation and structured data builders
- Playwright smoke tests for homepage-to-booking navigation, CSP, booking validation UI and a localized booking route
- GitHub Actions workflow in `.github/workflows/ci.yml`

Run `npm run test:e2e` locally only when a browser-backed smoke check is needed; normal CI does not run Playwright yet.

## Legal Pages

Legal content lives in `src/content/legal.ts`.

Routes:

- `/[locale]/legal`
- `/[locale]/privacy`
- `/[locale]/cookies`
- `/[locale]/booking-terms`

The French version is the primary compliance draft. Owner, publisher, registration and registered office details are populated from the SCI Petra et Paul Kbis extract. Hosting provider details, mediator, payment, cancellation, tourist tax, deposit and retention periods still require final legal/business review before production launch.

## Project Structure

```text
src/app/                 App Router routes, metadata, sitemap and API route
src/components/          UI, layout, content, booking, guide, events and weather components
src/config/              Site-level config
src/content/             Typed content data for apartments, guide, events, places and legal pages
src/i18n/                Locale definitions
src/lib/                 SEO, structured data, events freshness, weather, booking and email helpers
public/images/           Local project images and illustrations
scripts/                 Utility scripts
tests/                   Unit and Playwright smoke tests
```

## Content Editing Notes

- English is the source editorial language.
- French, Italian and Ukrainian should remain natural localized versions, not placeholder or mixed-language text.
- Do not leave `TODO_TRANSLATE` or visible placeholder strings.
- Do not delete old event data just because it has expired; freshness logic hides it from the public upcoming list.
- Do not invent dates, prices, ratings, schedules or opening hours.
- Prefer structured content updates over hardcoded page text.
- When replacing apartment photos, update gallery metadata, preview order, hero image references and any homepage slideshow references.

## Deployment

Expected target: Vercel  
Production domain: `azurmenton.com`  
DNS: Cloudflare

See `DEPLOYMENT.md` for first production deployment steps and `docs/search-console-validation.md` for post-deploy SEO validation.

Do not configure DNS, deploy, connect production services or add tracking from local development unless explicitly requested.

## Current Public Credit

The footer contains a subtle site credit link to `https://abvx.xyz`.
