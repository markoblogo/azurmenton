# Azur Menton

[![CI](https://github.com/markoblogo/azurmenton/actions/workflows/ci.yml/badge.svg)](https://github.com/markoblogo/azurmenton/actions/workflows/ci.yml)

Multilingual direct-booking and local travel site for three Menton apartments.
English, French, Italian and Ukrainian; Next.js App Router, React, TypeScript and Tailwind CSS.

[Live site](https://azurmenton.com) · [Apartments](https://azurmenton.com/en/apartments) · [Guides](https://azurmenton.com/en/guide) · [Events](https://azurmenton.com/en/events)

![Azur Menton apartment terrace](public/images/home/TerraceParkingApartment.jpg)

## What Is Live

- Apartment pages, public-safe guest guides, read-only availability previews and personally confirmed booking requests.
- Linked guides, places and Riviera events, with an interactive map and multilingual Pagefind search.
- Event filters, list/month calendar, verified-session calendar downloads and manually moderated suggestions/corrections.
- Device-only My trip and favourites: saved routes, personal day plans, optional child ages, cautious access warnings and external navigation.
- Weather, sea, clocks, exchange rates, transport, airport boards and radio tools; seasonal home selections and approved weekly editorial editions.

Availability is guidance, not a reservation. Shared favourites contain content IDs, not private trip details. Public guest guides never contain access codes. Subscription-interest forms collect editorial requests only: no newsletter is being sent. Telegram verification remains postponed.

## Start Locally

Node.js 20.9+ is required; use Node.js 22 to match the main CI job. Python 3 is needed only for Word intake.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000` (redirects to `/en`). For optional services, use the documented keys in [.env.example](.env.example) in an untracked `.env.local`. Never commit credentials, real calendar feeds, guest data or private operational reports.

## Check And Release

```bash
npm run release:check
# Restricted local build environments may need:
npm run release:check -- --webpack
```

This checks native dependency metadata, production dependency security, documentation, lint, types, unit tests, content/SEO preflight, images, production build, browser tests and post-build CSP/cache rules. Results and logs stay under ignored `build/release/`. It does not publish, send mail, create tags or change bookings. The production browser test server uses port 3100; stop any existing server there first.

Individual checks remain available: `npm run docs:check`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run preflight`, `npm run images:check`, `npm run build`, `npm run test:e2e`, `npm run preflight:postbuild`.

Follow the [release checklist](LAUNCH_CHECKLIST.md) and [deployment runbook](DEPLOYMENT.md). Local checks, GitHub CI, the deployed commit and public behavior are separate evidence. See [CHANGELOG.md](CHANGELOG.md) for release history.

## Publish Content Manually

```bash
npm run guide:workflow -- prepare --from /absolute/guide.docx --cover /absolute/cover.png
# Review facts, matches and links; prepare all four translations and insert reviewed content.
npm run guide:workflow -- bundle --slug <intake-slug>
npm run guide:workflow -- check --slug <intake-slug>
# Later, add the owner's illustrations without replacing existing images:
npm run guide:workflow -- assets --slug <intake-slug> --assets-dir /absolute/images
```

Word, Markdown and plain text are supported. Guide selection, translation, review and publication remain manual. New-place placeholders require an explicit owner illustration request. Original sources are retained until verified publication. `guide:runtime-trial` is a loopback-only experiment, not a production content store.

[Guide workflow](docs/guide-manual-workflow.md) · [Content rules](docs/content-operations.md) · [Event workflow](docs/events-publication-workflow.md) · [Editorial registry](docs/editorial-queue.md)

Useful editorial reports: `npm run content:report`, `npm run events:review`, `npm run editorial:report`, `npm run guides:verify`, `npm run seo:priorities`. Reports do not constitute approval or publication. Do not ingest, publish, send messages or modify live settings without the corresponding authorization.

## Where Things Live

- `src/app/[locale]/`: localized public routes; `src/app/api/`: server endpoints.
- `src/content/`: canonical apartment, guide, place, event and editorial data; `src/content/guide-data/`: multilingual long-form sources.
- `src/components/` and `src/lib/`: shared UI, booking, availability, search, planning and validation.
- `scripts/`: editorial and release tools; `tests/unit/` and `tests/e2e/`: regression coverage.
- `public/images/`: approved media and generated derivatives; generated Pagefind output and local evidence are not tracked.

## Documentation And Boundaries

Use the [documentation index](docs/README.md) to select the relevant runbook instead of loading every historical audit. Read [AGENTS.md](AGENTS.md) before edits and [product context](docs/product-context.md) before changing conversion claims, SEO or booking analytics. [ROADMAP](docs/ROADMAP.md) tracks outcomes, not automatic publication authority.

Booking delivery uses Resend; previews use server-only iCal feeds. Analytics uses aggregate non-PII context. Source-backed hours, prices, dates and accessibility rules can become stale: unknown remains unknown. Search rebuilds with the site and does not yet correct spelling mistakes.

See [contribution guidance](CONTRIBUTING.md), [security reporting](SECURITY.md), [license](LICENSE) and [content/brand exclusions](NOTICE.md). Application code is MIT; editorial content, illustrations, photographs, apartment facts, guest data and branding are not automatically covered by that grant.
