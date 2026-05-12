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
- `/[locale]/events`
- `/[locale]/faq`
- `/[locale]/contact`
- `/[locale]/privacy`
- `/[locale]/legal`

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

The current implementation uses:

- server action: `src/app/actions/booking-request.ts`
- placeholder API route: `src/app/api/booking-request/route.ts`

Both only log the request for now. They are intentionally isolated so they can later connect to email, Telegram, Airtable, Supabase, Smoobu, Lodgify, or another booking engine.

## Content

- `src/config/site.ts` - domain and site-level config
- `src/content/apartments.ts` - apartment data and image gallery placeholders
- `src/content/pages.ts` - guide, events, FAQ, legal/privacy/contact content
- `src/content/navigation.ts` - navigation labels
- `src/content/translations.ts` - reusable interface text
- `public/images/` - replaceable local image placeholders

English is the source language. French, Italian, and Ukrainian currently use the same structure with editable placeholder text.

## SEO

The app includes:

- localized metadata
- canonical URLs for `https://azurmenton.com`
- hreflang alternates including `x-default`
- `sitemap.xml`
- `robots.txt`
- JSON-LD for the home page and apartment pages
- `next/image` for local placeholder assets

## Deployment

- Expected target: Vercel
- Domain: `azurmenton.com`
- DNS managed through Cloudflare

Do not configure DNS, deploy, or connect production services from local development unless explicitly requested.
