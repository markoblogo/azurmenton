# Flea Markets Guide Publication

Owner-selected Word and cover; canonical slug `flea-markets-brocantes-vintage-menton`. Twenty sections and three tables in EN/FR/IT/UK. English retains the complete article, grouping short paragraphs for reading; translations preserve all market distinctions, schedules, practical checks, itineraries and FAQ. Service metadata is excluded from the article. The supplied cover is an imagined project illustration, not documentary evidence of an actual market or its layout.

## Sources Checked: 2 November 2026

- [Menton municipality](https://www.menton.fr/Rue-pietonne-et-marches.html): Mail du Bastion brocante on Fridays and second/fourth Sundays. Vintage & Collectors at Place du Cap / Quai Bonaparte has a dated 2026 list, including 27–29 December, 09:00–18:00. The general second-weekend wording does not consistently match the dated list; do not infer other editions or repair malformed dates by guessing.
- [Menton tourist office](https://www.menton-riviera-merveilles.fr/offres/marche-des-antiquaires-brocanteurs-menton-fr-3051283/): address Mail du Bastion & Place aux Herbes. Narrative 07:00–18:00 versus structured Friday timetable 09:00–17:00. Keep the conflict visible rather than selecting one authoritative opening time.
- [Nice tourism: Saleya](https://www.explorenicecotedazur.com/evenement/marche-a-la-brocante-saleya/): Monday 07:00–18:00, approximately 180 dealers. [Municipal market regulation](https://www.nice.fr/ressources/arrete-des-marches-artistes-artisans-brocante-du-cours-saleya-et-de-la-place-pierre-gautier/) supports holiday exceptions; no guarantee of every holiday Monday.
- [Nice tourism: Puces](https://www.explorenicecotedazur.com/evenement/marche-aux-puces/): Rue Robilante, Tuesday–Sunday; October 2026–May 2027 10:00–18:00 and June–September 2027 10:00–19:00. No individual dealer attendance guarantee. Distinct from Monday Saleya.
- [Ventimiglia municipal tourism: Friday market](https://ventimiglia.it/en/markets/friday-market/): seafront, Fridays from 07:00; general clothing, leather goods and household shopping, not predominantly antiques. Closing time not established here.
- [Ventimiglia market overview](https://ventimiglia.it/en/explore/taste-and-shopping/markets/): separately mentions historic-centre antiques but supplies no reliable upcoming recurring calendar. Confirm directly with IAT; do not create a dated event or fabricated exact location. [U Desbaratu](https://ventimiglia.it/en/markets/u-desbaratu/): annual shopkeepers' clearance, first Sunday of August; require edition confirmation, not an invented 2027 event.
- [EU personal purchases and VAT](https://europa.eu/youreurope/citizens/consumers/shopping/vat/index_en.htm), [French cultural-goods export guidance](https://www.douane.gouv.fr/demarche/exporter-des-biens-culturels), [French customs territory](https://www.douane.gouv.fr/lexique/territoire-douanier), [Italian Ministry of Culture export office](https://sabap-to.cultura.gov.it/servizi/ufficio-esportazione/): ordinary personal purchases and protected cultural goods are separate cases; Monaco's relationship with France does not remove cultural restrictions. General visitor guidance only, no value/age thresholds or clearance for a particular object. The ADM cultural-goods page returned HTTP 403; use the accessible ministry source rather than claim its contents were read.

Brocabrac and Vide-greniers.org are discovery directories, not confirmation of individual events. Durations, bargaining examples and shipping-cost examples are editorial estimates, not seller quotations. No new dated events are imported from this evergreen guide.

## Graph And Illustration Queue

Reuse existing illustrated Place du Cap, Quai Bonaparte, Cours Saleya antiques and Halles cards. Do not use the food-market Saleya card for the Monday antiques or the covered Ventimiglia food market for Friday seafront shopping. Add reciprocal related-guide links to market, souvenir, bookshop, Italian excursion, day-trip and old-town guides. Extend the existing market overview with a focused brocante section and the Friday-market card in its already relevant section.

Three new market places have official URLs, distinct stable IDs and explicit dated coordinate-unverified map exclusions. No guessed markers or copied unrelated cover images. Illustration requests:

- Menton Brocante — Mail du Bastion, Menton, `menton-brocante-mail-du-bastion.png` (place).
- Marché aux Puces de Nice, Nice, `marche-aux-puces-nice.png` (place).
- Ventimiglia Friday Market, Ventimiglia, `ventimiglia-friday-market.png` (place).

Existing illustrations remain unchanged. Source Word and cover remain at their original paths; frozen copies and the manually reviewed publication packet are local under ignored `build/guide-intake/`. No deletion, automatic scheduling or production runtime-content migration.

## Verification

- New regression suite initially failed because the guide module did not yet exist; after insertion, guide/Markdown/previous-guide tests passed (12 tests). Content audit and publication tests passed (26 tests).
- TypeScript, content schema lint (109 guides / 623 places / 119 events), image derivatives (180 sources), documentation and whitespace checks passed.
- Manual packet bundle: insertion-ready true; post-insertion review: zero errors, three expected pending-image warnings, seven map obligations satisfied. Preparation/readiness are not evidence of deployment.
- Local Chromium mobile verification passed in EN/FR/IT/UK: decoded cover, three tables and expected row counts, market cards, source links, no visible Markdown debris or horizontal overflow. Desktop width also passed. Existing unrelated apartment image quality-88 warnings remain; no image configuration change is bundled here.
- CI, preview, merge SHA and public route/media verification are separate publication gates. Actual run results are reported to the owner; do not infer them from this checklist.
