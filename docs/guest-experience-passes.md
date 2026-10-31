# Guest Experience: Four Bounded Passes

Owner approved implementation and testing of each pass, followed by discussion before moving on. No paid services. Scheduled guide publication is a later discussion, not authorization to publish automatically.

## 1. Apartment Guest Guides

Implemented and owner-reviewed. Publication of passes 1-3 was approved on 31 October 2026; the owner also approved releasing pass 4's registry/report and pilot on that date.

- `/[locale]/apartments/[slug]/guest-guide` for each of the three existing apartments, in EN/FR/IT/UK.
- Arrival, check-in, groceries, first evening and departure. Titles, photos and amenities reuse apartment content; guide and place links resolve canonical records.
- Public-safe content only. No access codes, private entrance instructions, booking records or personal guest data. `noindex, follow`; excluded from sitemap intentionally. No secret-link access-control claims.
- Check-in times, key handover, late arrival/departure and luggage storage require host confirmation; nothing invented. Panoramic studio parking follows the existing booking rule: unavailable. Other parking remains conditional, not included automatically.
- Shopping options are central examples, not verified nearest shops. No new walking-time or opening-hour promises. No new places or illustrations.
- Review with the host: are these sections useful, and which additional non-sensitive apartment-specific instructions may be made public? Sensitive information stays in the existing private booking conversation.
- Unit coverage: canonical references, all apartments/locales, parking rule, no arbitrary fallback apartment. Browser coverage: twelve localized pages, links, images, no nested main/overflow, noindex, apartment entry link, unknown apartment 404.
- Browser coverage includes all twelve apartment/locale combinations, 320px overflow checks and desktop/mobile screenshots. No real guest request is sent by these checks.

## 2. Contextual Accommodation Recommendations

Implemented and owner-approved, including extension to other appropriate guides/events. Extends the existing recommendations, not a second booking flow:

- The family guide recommends the existing four-guest terrace apartment, states its capacity and asks guests to confirm cot/access needs. Studios are not presented as interchangeable family accommodation.
- The winter hub compares full-kitchen/separate-bedroom and compact two-guest options. Longer stays require individual availability, pricing and terms; no invented monthly price, discount or heating claim.
- All event detail pages can reuse the existing contextual cards. Short, verified, confirmed events offer a separate explicit request link per apartment: check-in on opening day, checkout the morning after the last day. The range is a suggestion, not available inventory, confirmed tickets or a booking.
- No automatic period for invalid, conflicting, unverified, past-start dates, programmes longer than seven nights or events with separate sessions. Guests choose their dates. Event pages revalidate hourly, and the form retains its existing date validation.
- Prefill reuses the existing booking form and source attribution. It does not submit a request or overwrite the device-only saved trip. Dates remain URL/form context, never added to custom analytics properties.
- Four-language copy and responsive one/two/three-card layouts. Existing photos only; no paid service or new apartment/place records.
- The shared guide resolver now uses existing article/section apartment links for all 101 current guides. Curated family/winter scenarios keep priority; no family or long-stay intent is guessed from stray keywords. Event detail pages already use the shared resolver, including the date-safety rules above.
- Tests cover family/winter fit, canonical guide links, date-safety boundaries, explicit form prefill, unchanged device-only trip data and image loading. Review examples: family guide, winter hub and St John's Jazz on 6 November.

## 3. Optional Editorial uMap

The owner approved retaining uMap as an optional editorial tool, not a replacement for the site map. `npm run map:umap -- <route-id> <locale>` exports canonical reviewed points and opens an unsaved preview. Popups contain a summary of at most 96 characters and localized links to the place and full route/access notes; complete text and provenance remain in the export. See [editorial uMap workflow](umap-trial.md). No iframe or saved provider map is added by the command.

The trial also corrected the canonical Promenade du Soleil pin from an inland position to the regional tourist board's published area coordinate. Guide recommendation coverage is 101/101 for this release, based on existing content links. Release checks include unit tests, preflight, typecheck, lint, production build and browser checks; GitHub/Vercel and public-route verification are separate evidence.

## 4. Editorial Queue

Local metadata registry and `npm run editorial:report` implemented over existing guide intake/event publishing artifacts. Tasks support guides, events, weekly editions, details and places without copying their content. Technical snapshots, explicit owner decisions, repository presence and historical public-verification evidence are separate. Existing publication proposals and past event candidates do not pollute the active queue; ambiguous matches remain blocked. No inbox import, dashboard or automatic publisher. See [registry workflow and manual status rules](editorial-queue.md). The owner approved releasing this bounded implementation on 31 October; further automation remains a separate decision.

The first real pilot registers four priorities and excludes one test artifact. Official sources for the 6-12 November weekly edition were checked; the owner explicitly approved this specific edition for its date window. Its content is staged for release, but the task remains `approved`, not publicly verified during that future window. See [pilot evidence](audits/2026-10-31-editorial-queue-pilot.md). Scheduled guide publication remains a separate discussion.

## Later: Scheduled Guide Publication

Discuss after the four passes. Owner has a backlog of guides with covers. Requirements still to agree: approved content inventory, translations, publication frequency/timezone, validation gates, failure handling, deployment verification and emergency pause. No scheduler enabled in this pass.

## Release Validation: 31 October 2026

Local release checks passed: 427 unit tests, all 71 browser tests, production Webpack build (including TypeScript), lint, content/funnel preflight, image-derivative check and production dependency audit (zero reported vulnerabilities). Real uMap checks passed EN/FR/IT/UK at 1440px, 390px and 320px, with compact popups fitting the viewport and no provider save. GitHub CI, deployment and public routes must be verified separately for the pushed commit. Generated `build/`, browser output and Python bytecode are not release sources.
