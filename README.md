# Azur Menton

Production website project for Azur Menton, a family-run short-term rental brand for three apartments in central Menton, France.

The site is built as a static-first multilingual Next.js application. It presents the apartments, prepares SEO-friendly travel and events content, and supports manual booking requests. Booking is currently request-to-book only: there is no instant booking, payment flow, live availability calendar, or channel manager integration yet.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- ESLint
- Vercel-compatible deployment

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

## Deployment Notes

- Expected deployment target: Vercel
- Production domain: `azurmenton.com`
- DNS is managed through Cloudflare
- Do not configure Cloudflare or deploy automatically from local work unless explicitly requested

## Booking Notes

Direct booking is currently manual request-to-book. The placeholder form at `/[locale]/check-availability` has no backend submission, email provider, payment handling, or channel manager connection.

Later integration may use Smoobu, Lodgify, or another channel manager.

## Project Structure

- `src/app/[locale]` - locale-based routes for `en`, `fr`, `it`, and `uk`
- `src/components` - shared layout and UI primitives
- `src/config/site.ts` - domain, locale, and navigation labels
- `src/content` - placeholder content data for apartments and pages
- `src/lib/seo.ts` - canonical URL and hreflang metadata helpers
- `src/lib/structured-data.ts` - reserved utility for future JSON-LD

## Content Still Needed

- Confirmed apartment names, descriptions, amenities, capacity, and house notes
- Apartment photo source files and preferred ordering
- Final booking form requirements and backend/email provider choice
- Menton guide and events content with verified dates/details
- Legal owner/publication details and privacy policy wording
