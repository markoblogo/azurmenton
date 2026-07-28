# Azur Menton

[![CI](https://github.com/markoblogo/azurmenton/actions/workflows/ci.yml/badge.svg)](https://github.com/markoblogo/azurmenton/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)

Azur Menton is a multilingual direct-booking site for three central Menton apartments. The public surface combines apartment pages, a practical local guide, Riviera events, stay-planning pages, a useful-places map, and a manual booking funnel.

Production: [https://azurmenton.com](https://azurmenton.com)

## What matters

- Booking is manual. The site never promises instant confirmation.
- Availability previews are read-only planning guidance from external iCal feeds.
- Guide, stay and event content exist to support direct booking intent, not compete with it.
- Content is typed in-repo; there is no CMS.

Product and claim boundaries live in:

- [docs/product-context.md](docs/product-context.md)
- [docs/ROADMAP.md](docs/ROADMAP.md)

## Stack

- Next.js 16 App Router
- React 19
- strict TypeScript
- Tailwind CSS 4
- Vitest + optional Playwright
- Resend for booking-request email delivery
- Cloudflare Turnstile, honeypot, rate limiting, CSP
- Plausible + Vercel Analytics
- Sharp-based image derivative pipeline

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Root redirects to `/en`.

## Core commands

Daily engineering checks:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Content and SEO checks:

```bash
npm run preflight
npm run content:report
npm run events:review
npm run seo:priorities
```

Additional checks when relevant:

```bash
npm run content:audit
npm run images:check
npm run seo:validate
npm run test:e2e
npm run preflight:postbuild
```

## Environment

Use `.env.local` from `.env.example` when needed.

Key variables:

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
BOOKING_REQUEST_BCC_EMAIL=

WEATHER_PROVIDER=open-meteo
WEATHER_LATITUDE=43.7745
WEATHER_LONGITUDE=7.4975

AZUR_ICAL_SEA_VIEW_BALCONY_STUDIO=
AZUR_ICAL_TERRACE_PARKING_APARTMENT=
AZUR_ICAL_PANORAMIC_SEA_VIEW_STUDIO=
```

Important:

- never commit real iCal URLs;
- never expose iCal URLs client-side;
- keep Plausible Stats API keys local-only;
- do not commit `.env.local`.

## Main route families

Supported locales: `en`, `fr`, `it`, `uk`.

- `/[locale]`
- `/[locale]/apartments`
- `/[locale]/apartments/[slug]`
- `/[locale]/check-availability`
- `/[locale]/guide`
- `/[locale]/guide/[slug]`
- `/[locale]/stay`
- `/[locale]/stay/[slug]`
- `/[locale]/events`
- `/[locale]/events/[slug]`
- `/[locale]/events/this-week`
- `/[locale]/map`
- `/[locale]/partners`
- `/[locale]/faq`
- `/[locale]/contact`
- `/llms.txt`

## Key subsystems

### Booking and availability

- Manual request flow: `src/components/booking/`, `src/app/actions/booking-request.ts`, `src/app/api/booking-request/route.ts`
- Read-only availability layer: `src/lib/availability/`, `src/components/availability/`, `src/app/api/availability/`

Current booking UX includes:

- availability hub on `/[locale]/check-availability`;
- nearest available stay windows;
- selected-stay prefill into the request form;
- repeated server-side date validation before submit;
- compact availability previews on apartment detail pages;
- compact next-availability hints on the apartment listing page.

Do not expose provider URLs, booking titles, guest names, summaries, or booking notes.

### Apartments

Source of truth: `src/content/apartments.ts`

Current slugs:

- `sea-view-balcony-studio`
- `beachside-family-apartment`
- `panoramic-sea-view-studio`

### Guide, places and map

Main content files:

- `src/content/guide.ts`
- `src/content/guide-intents.ts`
- `src/content/places.ts`
- `src/content/stay-pages.ts`

Main UI:

- `src/app/[locale]/guide/page.tsx`
- `src/components/guide/`
- `src/components/places/UsefulPlacesMap.tsx`

The guide portal is not a plain article list. It includes editorial selections, planning clusters, finder/search entry points, compact catalogues, map previews and apartment-aware recommendations.

### Events

Main files:

- `src/content/riviera-events.ts`
- `src/content/event-occurrences.ts`
- `src/components/events/EventsCalendar.tsx`

Events use a pragmatic annual-series model with confirmed, pending and estimated states. Keep stale annual events archived for future refresh; do not invent dates.

### Guide automation

The guide workflow is now partially automated and remains review-first:

```bash
npm run guide:new
npm run guide:check
npm run guide:assets
npm run guide:apply
npm run guide:publish
npm run guide:patch
npm run guide:review
```

Detailed usage:

- [docs/guide-automation.md](docs/guide-automation.md)
- [docs/content-operations.md](docs/content-operations.md)

This pipeline prepares and validates guide/place/link/image work. It does not blindly auto-publish.

## SEO, analytics and structured data

Main files:

- `src/lib/seo.ts`
- `src/lib/structured-data.ts`
- `src/lib/analytics.ts`

The site emits:

- localized metadata;
- canonical + hreflang links;
- sitemap and robots;
- JSON-LD for lodging, vacation rental, article, FAQ, breadcrumb and related page types.

Keep analytics non-PII. Funnel events are for attribution and drop-off analysis, not guest profiling.

Useful docs:

- [docs/ANALYTICS.md](docs/ANALYTICS.md)
- [docs/SEO_MONITORING.md](docs/SEO_MONITORING.md)
- [docs/search-console-validation.md](docs/search-console-validation.md)

## Security and performance

Main files:

- `next.config.ts`
- `src/proxy.ts`
- `src/lib/security-headers.ts`

Notes:

- CSP is nonce-based and intentionally keeps App Router responses dynamic.
- `npm run preflight:postbuild` runs the current CSP/cache audit.
- `next/image` plus generated derivatives are the default media path.

See:

- [docs/csp-cache-audit.md](docs/csp-cache-audit.md)

## Repo layout

```text
src/app/            App Router pages and API routes
src/components/     UI and feature components
src/content/        Typed site content
src/i18n/           Locale definitions
src/lib/            Booking, SEO, analytics, availability, security helpers
public/images/      Local media assets
scripts/            Validation, reporting and automation scripts
tests/              Unit and E2E tests
docs/               Operational docs
```

## Operational rules

- English is the editorial source language.
- Keep FR/IT/UK natural; do not leave placeholder translations.
- Do not invent dates, prices, ratings, opening hours or official rules.
- Keep partner/perk content separate from core booking paths.
- Prefer structured content updates over hardcoded page copy.
- Use the docs before making content, SEO or booking-flow changes.

## Primary docs

- [docs/product-context.md](docs/product-context.md)
- [docs/content-operations.md](docs/content-operations.md)
- [docs/guide-automation.md](docs/guide-automation.md)
- [docs/ANALYTICS.md](docs/ANALYTICS.md)
- [docs/LEAD_OPERATIONS.md](docs/LEAD_OPERATIONS.md)
- [docs/WEEKLY_DIGEST.md](docs/WEEKLY_DIGEST.md)
- [docs/ROADMAP.md](docs/ROADMAP.md)
