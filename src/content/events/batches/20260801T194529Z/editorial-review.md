# Editorial review for event batch 20260801T194529Z

Reviewed on: 2026-08-01

Source batch: `src/content/events/batches/20260801T194529Z/batch.json`

Previous audit batch kept unchanged: `src/content/events/batches/20260801T191748Z/batch.json`

## Review summary

- Reviewed candidate records: 116 total.
- Prepared after Sanremo consolidation: 8.
- Borderline after consolidation: 23.
- Excluded: 6.
- Duplicate fragments consolidated: 79.
- Recommended first publication count after owner-rule correction: 4 new events + 1 existing-event enrichment.
- Published events written: 4 new events in `src/content/events/published/events.json`.
- Existing event enriched: `matisse-yves-saint-laurent-nice-2026` in `src/content/riviera-events.ts`.

## Sanremo multi-day resolution

The previous batch fragmented source events because Sanremo records used synthetic `sourceEventId` values that included the date. The same event page and title could therefore produce one candidate per day.

The workflow now consolidates records with the same stable source identity:

- source id;
- normalized title;
- source URL;
- city;
- venue.

It keeps the earliest `startDate` and latest `endDate`, then records later daily fragments as duplicates.

Consolidated prepared examples:

- `XII Festival Dei Boschi`: 2026-08-01 to 2026-08-02; 1 fragment removed.
- `Ruins`: 2026-08-01 to 2026-08-30; 29 fragments removed.
- `Pina Festival 2026`: 2026-08-06 to 2026-08-09; 3 fragments removed.
- `III Festival Int.le Scacchi "Città di Sanremo"`: 2026-10-16 to 2026-10-18; 2 fragments removed.

Additional borderline Sanremo multi-day fragments were also consolidated and kept out of the publishable list.

## Publication result

Owner rules applied before publishing:

- If an event already exists, the existing card is canonical and may only be enriched.
- New events must not reuse unrelated existing Azur Menton event images.
- If no owner-approved or rights-safe source image is attached, the event is published without an image so the missing illustration remains visible.

Published as new event records:

- `vikings-l-odyssee-jusqu-aux-confins-du-monde-cites-immersives-nice-2026-02-06`
- `nice-classic-festival-nice-2026-07-21`
- `la-farandole-festival-international-de-folklore-de-nice-nice-2026-08-12`
- `pina-festival-2026-sanremo-2026-08-06`

Not published as a duplicate:

- `henri-matisse-yves-saint-laurent-le-beau-la-mode-et-le-bonheur-nice-2026-06-17-1vsh8o1`

Reason: `matisse-yves-saint-laurent-nice-2026` already exists as a static canonical event. It was enriched instead.

## Published / updated selection

### 1. Vikings : L'Odyssée jusqu'aux confins du monde - Cités Immersives

ID: `vikings-l-odyssee-jusqu-aux-confins-du-monde-cites-immersives-nice-2026-02-06-1v7n4wz`

City: Nice

Date: 2026-02-06 to 2026-08-30

Venue: official JSON-LD gives address `1 rue Massenet, 06000 Nice`; venue name is not currently stored in the batch.

Category: exhibition

Editorial scope: destination-worthy

Why publish: a large immersive exhibition in central Nice is a plausible rainy-day/day-trip option from Menton.

Image status: missing. No unrelated existing project image was reused.

Warnings: replace generated summary; add venue/address from source metadata before publish if possible.

### 2. Henri Matisse - Yves Saint Laurent. Le beau, la mode et le bonheur

ID: `henri-matisse-yves-saint-laurent-le-beau-la-mode-et-le-bonheur-nice-2026-06-17-1vsh8o1`

City: Nice

Date: 2026-06-17 to 2026-09-28

Venue: Musée Matisse, `164 avenue des Arènes de Cimiez, 06000 Nice`.

Category: exhibition

Editorial scope: destination-worthy

Why publish: major museum exhibition with clear visitor value for a Nice day trip.

Image status: existing canonical project illustration on the already-published static card.

Result: not published as a harvested duplicate; existing static card enriched with programme URL, last verification date, travel note and detail content.

### 3. Nice Classic Festival

ID: `nice-classic-festival-nice-2026-07-21-1g5hamd`

City: Nice

Date: 2026-07-21 to 2026-08-09

Venue: Cloître du Monastère de Cimiez, Nice.

Category: music

Editorial scope: destination-worthy

Why publish: named classical music festival in Nice during the travel season; relevant for culture-oriented Menton guests.

Image status: missing. No unrelated existing project image was reused.

Warnings: replace generated summary; dates are near-term, so verify schedule before real publish.

### 4. La Farandole - Festival International de Folklore de Nice

ID: `la-farandole-festival-international-de-folklore-de-nice-nice-2026-08-12-1w8g0e8`

City: Nice

Date: 2026-08-12 to 2026-08-16

Venue: Divers lieux de Nice.

Category: music

Editorial scope: destination-worthy

Why publish: international folklore festival, useful as a distinct evening/day-trip event from Menton.

Image status: missing. No unrelated existing project image was reused.

Warnings: replace generated summary; generic multi-venue map link should be avoided unless a precise venue is available.

### 5. Pina Festival 2026

ID: `pina-festival-2026-sanremo-2026-08-06-1ugqw8n`

City: Sanremo

Date: 2026-08-06 to 2026-08-09

Venue: not stored in the batch.

Category: music

Editorial scope: destination-worthy

Why publish: named multi-day festival in Sanremo, close enough to Menton to be a plausible Italian Riviera evening/day-trip event.

Image status: missing. No unrelated existing project image was reused.

Warnings: hold if venue/time cannot be extracted before publish; source page is accessible but has weak metadata in the stored batch.

## Hold for manual review

- `xii-festival-dei-boschi-sanremo-2026-08-01-1rjfqad` — unclear visitor value from Menton and no stored venue/time/price.
- `ruins-sanremo-2026-08-01-1eowh7` — title is too ambiguous for publication; source page needs manual understanding before any card exists.
- `iii-festival-int-le-scacchi-citta-di-sanremo-sanremo-2026-10-16-14lhscu` — chess festival may be relevant to a niche audience but is not a strong general visitor event without more context.
- `explore-nice-major-events:7930941` / Soirées estivales 2026 — broad programme page; needs manual curation into specific destination-worthy items.
- `explore-nice-major-events:7570425` / Tour de France Femmes — likely important, but current automated relevance marked it borderline; verify if the Nice stage is useful from Menton before promoting.
- Sanremo Summer Symphony entries — potentially useful, but currently borderline because they need clearer programme/venue/date details and should not be bulk-published.
- Sanremo sport/community/fair records — keep out until a specific event is strong enough for a Menton-based visitor.

## Exclude

Exclude from this batch:

- `Les Nocturnes de la Villa Ephrussi de Rothschild`
- `Les Nuits de la Villa`
- `Natura 2000 Exhibition in Haute Tinée`
- `Great Venetian Night`
- `Festival Saint Jazz Cap Ferrat - 14th edition`
- `Isolienne Trail Challenge`

Reason: current parser classified these as missing or outside the supported visitor area. Do not durably exclude by source identity until the source-location parser is improved; some may become useful later if location is correctly mapped and the event meets the destination-worthy threshold.

## Image review

- Four new event records publish with no `media` field.
- Nice source pages expose remote official images in JSON-LD, but third-party imagery is not copied into the site without approval.
- Required owner illustrations if visual cards are desired: Vikings / Cites Immersives, Nice Classic Festival, La Farandole, Pina Festival.

## Localization review

- Localized titles preserve proper names.
- Summaries/editorial notes are currently English fallback text across locales.
- No locale was found to invent different dates, times, venue, price or booking requirements.
- Do not publish these records as-is if polished multilingual copy is required; use the first publish as a curated, factual short-card layer after summary cleanup.

## Google Maps review

- Nice candidates can be enriched with source JSON-LD venue/address.
- La Farandole has `Divers lieux de Nice`; avoid a precise map CTA.
- Sanremo candidates do not have enough stored venue/address information for reliable maps.

## Recommended dry-run command

```bash
npm run events:publish -- --batch 20260801T194529Z --ids vikings-l-odyssee-jusqu-aux-confins-du-monde-cites-immersives-nice-2026-02-06-1v7n4wz,nice-classic-festival-nice-2026-07-21-1g5hamd,la-farandole-festival-international-de-folklore-de-nice-nice-2026-08-12-1w8g0e8,pina-festival-2026-sanremo-2026-08-06-1ugqw8n --dry-run
```

## Corresponding real command

```bash
npm run events:publish -- --batch 20260801T194529Z --ids vikings-l-odyssee-jusqu-aux-confins-du-monde-cites-immersives-nice-2026-02-06-1v7n4wz,nice-classic-festival-nice-2026-07-21-1g5hamd,la-farandole-festival-international-de-folklore-de-nice-nice-2026-08-12-1w8g0e8,pina-festival-2026-sanremo-2026-08-06-1ugqw8n
```
