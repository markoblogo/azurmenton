# Joy House Guide: Preparation And Timing

## Scope

Owner requested publication on EN/FR/IT/UK, continuing timing and workflow improvements. Supplied Word source and cover remain preserved in the ignored intake packet. Owner also supplied a separate Torre Clementina illustration during preparation. No scheduler, paid service, bookings or third-party messages.

Canonical slug: `joy-house-les-felins-villa-torre-clementina`. Publication date is 5 November in Europe/Paris: preparation crossed midnight. Nineteen sections and two tables (7 and 12 rows) in each locale. English retains the supplied article; natural localized editions retain the sections, tables, practical boundaries and FAQ. Editorial metadata and Russian production notes are not public prose.

## Evidence And Boundaries

Sources checked 4–5 November 2026:

- [Gaumont](https://www.gaumont.com/fr/film/les-felins): 1964, 97-minute edition, Clément, cast and black-and-white format. [Fondation René Clément](https://fondationreneclement.fr/filmographie/les-felins/) transcribes the original credits, including Day Keene, Henri Decaë and the screenplay names; its screenplay listing differs from Gaumont's James Poe entry. Article follows the original-credit transcription, not a silently harmonized list. [Jane Fonda](https://www.janefonda.com/joy-house/) confirms title and character names; its fictional Monte Carlo synopsis is not used as the real villa's address.
- [Regional tourism](https://provence-alpes-cotedazur.com/cote-dazur/decouvrir/la-cote-dazur-celebre-decor-de-cinema/) identifies Torre Clementina as a Les Félins location. [POP PA00080959](https://pop.culture.gouv.fr/notice/merimee/PA00080959) and [Culture Ministry](https://www.culture.gouv.fr/regions/drac-provence-alpes-cote-d-azur/politique-et-actions-culturelles/architecture-contemporaine-remarquable-en-provence-alpes-cote-d-azur/le-label-architecture-contemporaine-remarquable-en-provence-alpes-cote-d-azur/label-acr-alpes-maritimes/roquebrune-cap-martin/roquebrune-cap-martin-propriete-dite-villa-torre-clementina) establish Ernesta Stern/Maria Star, Hesse, Maïnella, post-1904 history, avenue Impératrice-Eugénie and protection of 11 February 1991.
- [2023 Paris Match exhibition catalogue, pp. 8–9](https://www.oetkerhotels.com/media/66765/hotelducapedenroc-exposition-parismatch2023.pdf): François Pagès photo caption announces filming to start on 2 October 1963. The supplied source already distinguishes this from the photo date; retain that distinction. Link, do not reproduce archive photos. Exact shots and present-day interiors not audited.
- [Tourist-office trail](https://www.menton-riviera-merveilles.co.uk/offers/sentier-le-corbusier-little-footpath-along-the-coastline-roquebrune-cap-martin-en-3051235/): historical route context does not prove today's full opening. Public paths only; no private entry, clear-view guarantee or step-free claim. Distances and outing times are estimates, not personal measurements.
- [Churchill project](https://www.roquebrune-cap-martin.fr/16547-avenue-winston-churchill.htm) and [March 2025 council minutes, p. 22](https://www.roquebrune-cap-martin.fr/cms_viewFile.php?idtf=194561&path=20250314_ConseilMunicipal_ProcesVerbal1403.pdf): planned end-2026 works, not verified current closures/completion. [Cap Moderne](https://capmoderne.monuments-nationaux.fr/visiter/informations-pratiques): 1 April–31 October 2026, ordinary individual EUR19, required booking. That season has ended; future visits unconfirmed. Separate architectural extension, not an asserted film location.

New private-estate card has an explicit unverified-coordinate map exclusion, not a guessed public entrance. Reuses illustrated coastal walk, E-1027 and Cypris; adds the new villa to the older Cypris comparison section, with reciprocal article/place links and existing Books, Film & Art collection membership. Supplied images are artistic illustrations, not documentary views or film stills.

## Observed Timing

| Stage | Observed interval or duration |
| --- | --- |
| Request start | 2026-11-04T22:44:01Z |
| Intake packet completed | 2026-11-04T22:48:54.808Z |
| Cover derivatives | 2,787 ms; 3,400,890 input bytes; 542,104 combined AVIF/WebP bytes |
| Villa derivatives | 2,667 ms; 3,587,234 input bytes; 628,397 combined AVIF/WebP bytes |
| Localizations compiled | 2026-11-04T23:09Z, 19 aligned blocks, two tables |
| Local full QA / CI / production / public | Pending at source-tree freeze; final exact receipts kept in ignored workflow packet |
| Owner or external waiting / active labour | Not inferred from wall time |

The two derivative durations total 5,454 ms. They are not the total publication time. Final observed wall time, check durations and overlaps must be reported from actual receipts after public verification, not predicted here.

## Improvements And Blockers

1. Existing narrow content-audit gate is retained before full QA, catching reciprocal graph mistakes before a long build. Full final-tree local checks and remote CI/preview can overlap; merge waits for both.
2. Headless-only Chromium install is documented by Playwright and regression-tested against both launch paths. All dependencies, security, build and browser gates remain. Baseline run 41922162618 spent 407 seconds fetching Ubuntu fonts at 53.7 kB/s, then about 8 seconds downloading browsers. Skipping the unused 186.8 MiB full Chromium saves that download, not the font bottleneck. Actual gain awaits CI; no cache-speed claim.
3. Place image imported with explicit ID, missing-only protection and local derivatives; no whole-library regeneration. First attempt redundantly asked to apply an already processed cover and was safely rejected; recovered with a place-only command. Exact lost interval not measured. Added the distinction to the operator instructions.
4. Compiler immediately caught an empty title block caused by a redundant introductory H2; removed the H2 in all four Markdown sources. The focused guide test initially expected 1991 in body text although English places it in a table; fixed the test to inspect the table without weakening the article claim.

Next measurable candidate: investigate Ubuntu dependency mirror throughput if it remains slow in this run. Do not drop system packages or browser checks simply to improve the timer. Production publication is not claimed by this preparation audit; it requires successful checks and deployed SHA/domain evidence.
