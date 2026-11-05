# Katherine Mansfield Guide: Evidence And Timing

## Scope

Owner supplied the Word guide and cover and approved publication after successful checks on EN/FR/IT/UK, including the pre-Menton composition correction, November garden closure and artistic-cover disclosure. No bookings, messages to third parties, paid services or automatic publishing.

Slug: `katherine-mansfield-menton-stories-isola-bella`. Twenty sections and three tables with 7, 9 and 6 rows in every locale. English retains the supplied prose with reviewed corrections; natural localized editions retain the sections, chronological and reading distinctions, tables, FAQ and practical limits. Remove editorial preamble and Russian production notes. New place records are unnecessary: reuse five existing illustrated places (Isola Bella, Garavan station, boulevard de Garavan, promenade Reine Astrid, Val Rahmeh), reciprocal place/article links, existing Books, Film & Art collection, and a contextual link from Janet Frame's Mansfield section.

## Source Review: 5 November 2026

- [Katherine Mansfield Society chronology](https://katherinemansfieldsociety.org/katherine-mansfield-resources/timeline-biography/): first 1920 stays, September Isola Bella, Bliss publication 2 December 1920, departure in May 1921, later Swiss writing including The Garden Party and At the Bay. Composition is not fictional setting; collection publication is not the date of every constituent story.
- [Te Ara biography](https://teara.govt.nz/en/biographies/3m42/mansfield-katherine): January 1920 The Man Without a Temperament precedes the move from Ospedaletti to Menton later that month. Correct the source's implication that it was composed during the first Menton stay. [Read NZ](https://www.read-nz.org/writers-files/writer/mansfield-katherine): Isola Bella productivity, Poison, Miss Brill, The Stranger, Daughters; London Mercury appearance May 1921 and subsequent Swiss stories. Secondary table entries remain associated with the period, not newly audited manuscript histories.
- [Te Ara photograph](https://teara.govt.nz/en/photograph/44341/katherine-mansfield-at-menton): Ida Baker, Isola Bella, 1920, Alexander Turnbull Library collection PAColl-3907, reference 1/4-059883-F. Reuse requires library permission: link only, do not reproduce. Supplied cover is artistic; neither its pictured book nor portrait is asserted to be a verified real edition/authenticated archival photograph.
- [National Library research guide](https://natlib.govt.nz/guides/katherine-mansfield) and [Society stories](https://katherinemansfieldsociety.org/katherine-mansfield-resources/stories/): useful reading/research entry points. Free reading links support the guide's practical reading itinerary without requiring a purchase.
- [Arts Foundation fellowship](https://www.thearts.co.nz/awards/katherine-mansfield-menton-fellowship) and existing sourced Frame guide: fellowship starts with 1970 award; Frame 1974, posthumous novel 2013. Omit the unneeded 1969 founding detail rather than assume it verified. [Writing from the Cellar chapter listing](https://academic.oup.com/edinburgh-scholarship-online/book/30137/chapter-abstract/257078794) located, but full chapter and supplied Cambridge endpoint unavailable in this check. Room distinction is retained from supplied research/existing guide, with the access limitation explicit; no claim of newly inspecting an original study.
- [Garavan tourist-office walk](https://www.menton-riviera-merveilles.co.uk/offers/stroll-in-garavan-the-babylonian-dream-menton-en-3097471/): neighbourhood context, not proof of private interior access or exact literary settings. One-to-two-hour public-street route is editorial, not personally measured, step-free or reconstructed daily movements. No new entrances or coordinates guessed.
- [Val Rahmeh official closure notice](https://www.jardinbotaniquevalrahmehmenton.fr/fr/actualites/le-jardin-val-rahmeh-menton-ferme-pour-travaux-en-novembre): closed 2–27 November 2026 inclusive. Not a visit option during this window; future dates require rechecking. Contextual garden extension, not a documented Mansfield writing place.

## Measured Preparation

| Stage | Observed evidence |
| --- | --- |
| Request start | 2026-11-05T09:29:51Z, Europe/Paris 10:29:51 |
| Cover encoding | 09:32:19.253Z–09:32:22.566Z; 3,312 ms; 2,552,262 input bytes; 289,641 combined AVIF/WebP bytes |
| Focused checks | 4 files, 51 tests passed; content schema 131 guides/653 places passed; types passed |
| Image readiness | 5 covered cards, 0 missing, 0 copy operations; report-only coverage probe 10 ms |
| Full QA / CI / merge / public | Pending at source freeze; exact receipts and total recorded locally after domain verification |
| Active labour / individual research interval | UNKNOWN; not inferred from elapsed wall time |

## Optimization

Image-existence probes in `guide:assets` previously ran sequentially across the library. Extracted a bounded eight-worker helper: paths validated before any I/O, identical deduplication/order, missing files/directories omitted and access/other errors still fail. Both report-only/apply reports retain actual coverage timing. Regression coverage includes bounded concurrency, deterministic deduplication, missing/directory cases, error propagation and path escape before I/O. Initial test failed without the helper; implementation passed existing asset tests and new tests.

Warm-filesystem benchmark, same actual 652 existing files, alternating serial/eight-worker order over four rounds after warm-up:

- Serial samples: 11.58, 12.46, 13.31, 13.47 ms; median 12.885 ms.
- Eight-worker samples: 4.47, 4.57, 5.29, 5.29 ms; median 4.93 ms.
- Identical coverage in all rounds. About 2.6x faster for this probe only; roughly 8 ms saved, not minutes of publication. Actual report-only probe 10 ms includes its own environment/cache conditions.

More meaningful process savings: determine existing image coverage early, reuse five images, prepare the cover once, avoid a redundant apply-cover request and whole-library derivative regeneration, and overlap immutable-tree local verification with CI/preview. All fact, approval, schema, security, build, image and browser gates remain. Next candidate: separately measure source-fingerprint overhead versus build/translation time before selecting another optimization. No cache bypass or timestamp-only substitution for content hashes.

## Status Boundary

This source-tree audit records preparation and approval, not publication success. Merge waits for final local and remote checks; production identity and all four public locale pages must then pass. Detailed source paths, benchmark/report JSON and publication timers remain in ignored local files rather than a second public content database.
