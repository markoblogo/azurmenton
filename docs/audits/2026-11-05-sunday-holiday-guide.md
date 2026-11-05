# Sunday and Public-Holiday Guide

## Scope and Approval

- Slug: `menton-sundays-public-holidays`; EN/FR/IT/UK.
- Intake started 5 November 2026 at 20:07:06 UTC. Timing artifacts remain in the ignored intake packet; final duration must be measured after public verification.
- Owner explicitly approved publication after successful checks, including the corrected hours, holiday exceptions, closure notices and measured search-output experiment.
- Supplied DOCX retained in the packet; full English article and localized versions compiled into 18 aligned blocks, four tables and eight FAQ answers. Cover is an artistic project illustration, not documentary evidence of market access.
- Twelve existing illustrated place cards reused. No new places, bookings, private arrival instructions, messages or paid services.

## Primary Evidence Checked 5 November 2026

- [Municipal Halles](https://www.menton.fr/Marche-des-Halles-Municipales.html): daily 07:30–13:00. Individual stall attendance and holiday exceptions are not guaranteed.
- Carrefour branches: [Félix Faure](https://www.carrefour.fr/magasin/city-menton-felix-faure), [Sospel](https://www.carrefour.fr/magasin/city-menton-sospel), [Thiers](https://www.carrefour.fr/magasin/city-menton-thiers). Ordinary Sundays respectively 08:00–21:00, 08:30–19:50, 07:00–21:00. Separate 11 November 2026 hours respectively 07:00–22:00, 07:00–22:00, 07:00–21:00; not a reusable Sunday schedule.
- Intermarche: [Hyper](https://www.intermarche.com/magasins/01296/menton-06500/infos-pratiques), [Castagnins](https://www.intermarche.com/magasins/01298/menton-06500/infos-pratiques). Ordinary Sunday 08:30–12:30. Exceptional 11 November opening announced without distinct hours in the retrieved notice. Castagnins also lists closure on 25 December 2026 and 1 January 2027.
- [Service Public](https://www.service-public.gouv.fr/particuliers/vosdroits/F2405): national holidays and special 1 May employment rules. Not a universal shop-opening calendar; no individual legal advice.
- [Pedestrian Sundays](https://www.menton-riviera-merveilles.fr/offres/dimanches-pietons-menton-fr-6426314/): 8 November and 13 December 2026 upcoming; Sunday 06:00 to Monday 06:00, designated Promenade du Soleil section from rue d'Adhemar de Lantagnac to jardin Elisee Reclus; weather-dependent, not the whole waterfront.
- [Val Rahmeh operator notice](https://www.jardinbotaniquevalrahmehmenton.fr/fr/actualites/le-jardin-val-rahmeh-menton-ferme-pour-travaux-en-novembre): works closure 2–27 November 2026 inclusive overrides ordinary Sunday hours, including 8, 15 and 22 November.
- [TER works notice](https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/se-deplacer/info-trafic/travaux/travaux-entre-nice-vintimille): through 10 December 2027, 22:00–06:00 Sunday–Thursday nights. Sunday evening included; verify exact journey and replacement coverage. [Zest](https://www.zestbus.fr/) remains the local timetable source; no fixed frequency or last-return promise.

## Process Experiment

The previous search `outputMs` combined Pagefind export (`getFiles()`) and filesystem writes. New instrumentation splits `exportMs` and `writeMs`, retaining aggregate `outputMs` and unchanged indexing/write behavior.

Compared synchronous output against eight bounded writers on the same 6,491-file retained Pagefind snapshot: 1,182 ms versus 1,214 ms. All resulting files matched byte-for-byte. This warm-cache-sensitive ordered pair does not show a speedup: concurrency code and experimental tests were removed, not shipped. Snapshot includes retained old files and is not the current export count. Raw result is `build/guide-intake/menton-sundays-public-holidays/search-output-benchmark.json`.

No gates removed. Before freeze: focused guide, content-graph and image tests, lint, whitespace review. Full verification uses the existing webpack profile and immutable-input receipts. Public publication requires current GitHub checks, exact production deployment SHA and four-locale/domain/media verification. Those outcomes are recorded separately after they actually complete; this document does not pre-claim them.
