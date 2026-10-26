# Reliability and evidence review - 26 October 2026

## Scope and completion boundaries

This is a partial implementation and evidence record, not certification of every
fact in all 90 guides. No guide is marked freshly verified just because its
sources respond, translations exist, or tests pass. Whole-guide verification
remains distinct from the bounded claim checks below.

## Implemented

- Constrained booking grid tracks so long content cannot widen the mobile page.
- Added mobile overflow regression checks for EN, FR, IT and UK.
- Email delivery has a 10-second deadline and returns controlled failures for
  network errors/timeouts; no automatic retry after ambiguous delivery. Provider
  error bodies are not logged. This does not provide durable lead storage.
- Restored the owner-approved BCC default removed in commit 3f18569 on
  13 September. Missing/blank BOOKING_REQUEST_BCC_EMAIL no longer silently
  drops the operational copy; a nonblank override still wins. Regression tests
  cover missing, empty and whitespace overrides. Production receipt must be
  tested after deployment; local tests do not establish delivery.
- Fete du Citron occurrence copy now agrees with confirmed dates in all locales.
  Added a confirmed-occurrence copy regression and fixed the live SEO validator.
- Updated vulnerable development dependencies within existing package ranges.
  npm 10 audit/update crashed with edgesOut; npm 11 lock-only update succeeded.
  Preserved native libc filters rather than accepting npm metadata loss.
- Added a dated official TER works notice to the transport guide, with a source
  link. Its stated end date is 11 December 2026; review/remove after that date.

## Search evidence

GSC API, domain property azurmenton.com, web search, 26 September–23 October 2026
compared with 29 August–25 September 2026:

| Metric | Current | Previous |
| --- | ---: | ---: |
| Clicks | 285 | 393 |
| Impressions | 12,569 | 17,776 |
| CTR | 2.267% | 2.211% |
| Average position | 8.760 | 8.451 |

This does not establish causation or seasonality. Do not interpret search clicks
as bookings. Top current pages include souvenir shops (24 clicks), cheap eats
(20), ice cream (19), seafood (18), pastries (14), coffee (13) and pizza (13).
Prioritize provenance and useful apartment transitions on these existing pages
before producing more pages solely to reach the roadmap's 100-guide target.

Plausible Stats credentials were absent from the checked local configuration.
CrUX returned notConfigured (missing API key), not a passing or failing field
Core Web Vitals assessment.

## Mobile Lighthouse baseline (live site, before deployment)

Single simulated-mobile runs, default Lighthouse settings, headless Chrome.
These are lab measurements, not field INP or p75 Core Web Vitals. Repeat after
deployment; do not compare a localhost build score directly with production.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| /en/check-availability | 80 | 92 | 100 | 100 | 4.8 s | 0 | 40 ms |
| /en/events | 80 | 92 | 100 | 100 | 4.8 s | 0 | 100 ms |
| /en/guide | 67 | 93 | 100 | 92 | 3.7 s | 0 | 560 ms |

Booking LCP was a hero paragraph, not an apartment photo: roughly 87% of its
LCP was render delay. Investigate render/font dependencies before changing image
quality. Guide catalogue main-thread blocking warrants client-payload profiling.
Contrast, touch targets and accessible-name findings remain open.

Raw local artifacts: /tmp/menton-lighthouse-booking.json,
/tmp/menton-lighthouse-events.json, /tmp/menton-lighthouse-guide.json.

## Bounded official-source checks

- Fete du Citron: https://www.fete-du-citron.com/ confirms 13–28 February 2027.
  Corrected the contradictory occurrence text, not the already-correct dates.
- Airport access: https://www.nice.aeroport.fr/acces/trains confirms the
  Saint-Augustin connection and airport tram access. It currently describes a
  seven-minute pedestrian route; guide estimates are not guaranteed timings.
- Airport bus: https://www.nice.aeroport.fr/acces/transports-en-commun is the
  operator reference. The guide's quoted fare range is not independently verified
  by this check and must not receive a fresh verification stamp.
- Public transport / car-free stays / Italian day trips:
  https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/se-deplacer/info-trafic/travaux/travaux-entre-nice-vintimille
  confirms overnight works through 11 December, 22:00–06:00 Sunday–Thursday.
  https://www.sncf-connect.com/train/trajet/menton/vintimille confirms direct TER
  service. Exact departures must remain travel-date specific.
- Halles: https://www.menton.fr/Marche-des-Halles-Municipales.html confirms daily
  opening days; it does not substantiate every stall, price or recommended hour.
- Beaches: https://www.menton-riviera-merveilles.fr/menton-et-le-littoral/les-plages/
  supports the Sablettes family/access description. No live beach flags verified.
- Old town / area choice:
  https://www.menton-riviera-merveilles.fr/menton-et-le-littoral/nos-incontournables/vieille-ville-de-menton/
  supports the basilica, ramps and cemetery route, not individual apartment claims.
- Supermarkets: https://www.carrefour.fr/magasin/ville/menton-06083 lists four
  Carrefour City locations. This does not verify the other retailers or prices.
- Emergency numbers: https://www.service-public.gouv.fr/particuliers/vosdroits/F33954
  confirms 15, 17, 18, 112, 114 and maritime 196. This is not medical advice.
- MarediModa: https://maredimoda.com/en/cannes-e/ confirms 27–29 October 2026
  and professional-visitor-only access.
- Halloween Eze: https://ville-eze.fr/evenements/halloween-3/ confirms 31 October
  2026; no additional programme was inferred.
- Monte-Carlo Jazz: official SBM page returned 403. SOURCE_UNAVAILABLE, not
  cancelled or absent.
- Monaco National Day: https://journaldemonaco.gouv.mc/Editos/Fete-Nationale
  confirms annual 19 November. Repository currently jumps to 2027; review the
  2026 occurrence/programme before changing a published edition or creating one.

These checks cover representative claims relevant to 12 priority guides and
nearby events; they do NOT complete a fact-by-fact review of those guides.

### Follow-up: claim-level checks

- Halles du Marche: Menton town lists the covered market every day,
  07:30–13:00. Updated the guide's hours and removed the implication that the
  hall continues after lunch. Individual stall and holiday hours remain
  unverified. Source: https://www.menton.fr/Marche-des-Halles-Municipales.html
- Nice Airport arrival: the airport lists seven minutes on foot from T1 exit
  A0 to Nice Saint-Augustin, plus a free tram connection from T2 to Grand
  Arenas. Added the source and a luggage/walking buffer; journey duration,
  taxi estimates and airport-bus fares were not reverified here.
  Source: https://www.nice.aeroport.fr/en/directions/train
- Airport bus 80: airport lists T2 bay 1, T1 Shuttle Parking, online tickets
  and on-board contactless bank-card payment. ZOU's September 2026 timetable
  page lists line 80. Added both direct source links and retained a current-
  conditions caveat. Sources: https://www.nice.aeroport.fr/en/directions/public-transport
  and https://zou.maregionsud.fr/fiches-horaires-des-bus-zou/alpes-maritimes
- Public transport: SNCF lists a full interruption on the Nice–Monaco–
  Ventimiglia / Nice–Tende routes on 10–11 November 2026, with limited road
  replacement. Added a dated warning with the official works link. Recheck and
  remove or archive the dated notice after the disruption.
  Source: https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/se-deplacer/info-trafic/travaux
- Luggage storage: the airport's specific storage page still lists daily
  08:00–21:00, €19 per bag and €21 for oversized items. A broader service-
  centre page lists different general hours; do not assume those are storage
  hours. No editorial change needed on this claim.
  Source: https://www.nice.aeroport.fr/en/services/pratical-services/luggage-storage

These checks cover selected claims in four guides, not whole-guide verification.
The guides retain their existing verification status.

### Priority-guide follow-up: 26 October 2026

- Fete du Citron practical guide: organiser confirms 13–28 February 2027;
  under-six and eligible disability-card visitors still need an admission
  ticket, and animals are excluded from the exhibition, parade route and
  Palais de l'Europe. Added a dated, localized access note and direct source.
  https://www.fete-du-citron.com/?lang=en
- Supermarkets: Carrefour's own directory lists four Menton stores, but its
  directory and store pages report conflicting hours for some locations.
  Added a direct directory link and a warning to check the individual store;
  other chains and holiday hours remain unverified.
  https://www.carrefour.fr/magasin/ville/menton-06083
- Beaches / family / summer: tourism office confirms Rondelli is accessible
  from Menton Garavan station and the dog beach is unsupervised. This does not
  verify current flags, seasonal supervision or every listed beach.
  https://www.menton-riviera-merveilles.fr/menton-et-le-littoral/les-plages/
- Old town / one-day / three-day itineraries: tourism office lists the old
  cemetery as free, normally 07:00–17:00. No individual route or exceptional
  closure is confirmed by this check.
  https://www.menton-riviera-merveilles.fr/offres/cimetiere-du-vieux-chateau-menton-fr-3051918/
- Italian Riviera / day trips / car-free: SNCF shows direct TER trips from
  Menton Garavan to Ventimiglia for the checked date. This is not a guarantee
  of frequency, service or travel time on other dates.
  https://www.sncf-connect.com/train/horaires/menton/vintimille

These are specific checks, not full reviews of the linked guides or all 20
authority profiles. The remaining guide claims, including ice-cream venues,
public toilets, car rental, accommodation-area and airport-board details,
still require individual primary-source checks. No global review date was
advanced and existing provenance statuses remain unchanged.

## Open gates

1. Real email: one owner-authorized TEST API attempt returned 400 anti-spam.
   The owner subsequently submitted the normal browser form and saw success,
   but reports no copy in a.biletskiy@gmail.com. Connected Gmail searches,
   including spam/trash, also found no test message. Owner screenshots show
   this exact AUDIT-20261026 message in Resend with Delivered to
   petraetpaul@gmail.com at 16:52 and the owner address in Reply-To. This rules
   out the silent honeypot branch for this submission. Primary delivery is
   provider-confirmed; owner-copy delivery was initially UNCONFIRMED. Reply-To is not
   BCC. The owner reports that copies arrived previously. Git history confirms
   commit 3f18569 removed the fallback recipient introduced by 4dfd490. The
   fallback was restored and deployed in 9da5a65. A subsequent owner test was
   found in the owner's Gmail Inbox at 16:13:34 UTC (17:13 Paris). This confirms
   that test's copy delivery, not guaranteed delivery of every future request.
   Resend also flags a missing/invalid DMARC record, but this alone does not
   establish the cause of the missing copy. Vercel runtime-log access returned 403 and environment
   metadata access returned 404 during the initial investigation.
   Follow-up: public DNS now resolves `_dmarc.azurmenton.com` to
   `v=DMARC1; p=none`. This is non-enforcing and has no aggregate-report mailbox.
   Test marker: AUDIT-20261026. Do not disable Turnstile or repeat submissions.
2. Plausible: configure read-only Stats access or use the owner's dashboard.
3. Full 90-guide verification: enumerate claims, compare against primary sources,
   record CONFIRMED / CHANGE_DETECTED / SOURCE_UNAVAILABLE / UNVERIFIABLE per
   claim, then localize corrections. Existing health counters are not proof.
4. Performance: repeat production Lighthouse, obtain CrUX when configured,
   profile catalogue hydration and address the accessibility findings.
5. Booking anti-abuse: process-local rate limiting is not a distributed limit.
   Verify hosting/WAF protection before selecting a shared limiter.

## Local validation after dependency installation

- npm ci --ignore-scripts: passed.
- npm audit --audit-level=high: zero vulnerabilities (including development).
- npm test after the BCC restoration: 214 tests passed across 38 files.
- npm run typecheck, npm run lint, npm run preflight: passed.
- Final production build: passed (800 static pages).
- Initial booking browser run: blocked by development-server startup timeout
  on the slow external filesystem; no browser assertion result from that run.
- Retried against the successful production build: all 12 booking-flow browser
  tests passed, including overflow checks in all four locales. This build
  preceded the final BCC-default restoration; it validates layout, not delivery.

## Follow-up: delivery operations

- Redacted request correlation, Resend message IDs and explicit accepted /
  rejected / unknown outcomes replace payload-derived operational logs.
- Added a read-only message-status command and bounded optional Telegram
  copies for validated enquiries, including email failures. Owner explicitly
  approved guest enquiry copies to a private chat; localized privacy notices
  were updated. Bot/chat Production secrets are configured; live delivery
  still needs a post-deployment test.
- Removed the client catalogue's runtime import of the full guide content
  module. Filter labels now arrive as props. No measured performance gain is
  claimed until a successful build and route-level browser measurement.
- 227 unit tests across 40 files passed; typecheck, lint (including new files)
  and preflight passed. Public
  DMARC lookup confirmed `v=DMARC1; p=none`.
- Turbopack build was blocked by local process/port restrictions, including
  the retry. The alternative `npm run build -- --webpack` passed, generating
  800 static pages. Default Turbopack and a deployed release are not verified
  by that alternative build.
- All 16 browser regressions passed against the final local Webpack
  production build, including booking/mobile layout and four-locale guide
  search (search, no results, reset).

See [email operations](../booking-email-operations.md) for remaining delivery
coverage limits. This follow-up does not close the full 90-guide fact audit,
Plausible access or field Core Web Vitals measurement gates above.

## Local catalogue payload follow-up

The guide landing mini-map now receives only the place and apartment fields
needed to render its markers, in the selected language. The full map retains
its existing data. On the same local production server, uncompressed HTML was
436,268 to 412,083 bytes for `/en/guide` and 503,907 to 480,864 bytes for
`/uk/guide`. These are byte measurements, not Lighthouse or field LCP results;
the release and live measurements must be checked separately.

Two apartment markers at the same building overlap at the mini-map's initial
zoom. The optimization preserves their positions and does not resolve that
pre-existing interaction limitation.

## Priority source follow-up: 26 October 2026

- Ice cream: the [tourist office](https://www.menton-riviera-merveilles.fr/offres/puro-piacere-glacier-menton-fr-3776123/) and [business register](https://annuaire-entreprises.data.gouv.fr/etablissement/84005478700014) list Puro Piacere at 2 Avenue Boyer; its place card and map point were corrected. The point is an official address geocode, not a verified entrance. [Demontis](https://glacierdemontis.fr/contact/) lists 8 Rue Saint-Michel, but its own pages disagree about opening hours; visitors should check directly. The tourism office also lists [Tutti Frutti at 24 Rue Saint-Michel](https://www.menton-riviera-merveilles.fr/offres/tutti-frutti-glacier-menton-fr-3776126/) and includes the other guide venues in its [family directory](https://www.menton-riviera-merveilles.fr/sinspirer/a-chacun-ses-merveilles/decouvrir-en-famille/); listings do not independently establish current opening times.
- Public toilets: the [Place d'Armes listing](https://www.menton-riviera-merveilles.fr/offres/toilettes-publiques-place-darmes-menton-fr-3158086/) locates it opposite Hotel Le Dauphin, whose [address](https://hoteldauphin-menton.com/fr/hotel/) is on the western seafront, not in Garavan. The point remains excluded from the map pending verified coordinates. The official toilet listings warn that hours are not guaranteed and some records were last updated in 2021; they do not establish current access.
- Car rental: [Nice Airport](https://www.nice.aeroport.fr/services/location-de-voiture) locates its rental centre behind parking P5 near Terminal 2. Pickup, return and late-arrival arrangements must be confirmed with the operator; [Rent A Car](https://www.rentacar.fr/agences/491-menton) lists its Menton branch at 4 Avenue Cochrane. This is a targeted review, not a verification of every agency or claim in the three guides.
- Plausible: the authenticated dashboard was inspected read-only on 26 October, with its `Last 28 days` filter. It displayed 547 unique visitors, 574 visits and 805 pageviews; the ice-cream guide had 19 visitors in the page breakdown. The selected window's precise timezone and boundaries were not independently confirmed. Goal events and test submissions are not proof of reservations or email delivery. API credentials and field Core Web Vitals remain unverified.

## Remaining priority guides: targeted follow-up

- Airport guide: [Nice Airport's train access page](https://www.nice.aeroport.fr/en/directions/train) and official [arrivals](https://www.nice.aeroport.fr/en/flights/arrivals) and [departures](https://www.nice.aeroport.fr/en/flights/departures) pages were linked from the guide. Genoa's [official board](https://www.airport.genova.it/en/to-fly-2-2/) and [Turin's board](https://www.aeroportoditorino.it/en/tofly/flights/departs-arrivals) expose arrivals and departures; Marseille's [arrivals](https://www.marseille-airport.com/flights-and-destinations/flights/todays-arrivals) page also responds. The existing Cuneo link timed out during this check, so its live board is unverified; no conclusion about airport operations or iframe playback follows.
- Monaco events guide: [SNCF's timetable](https://www.sncf-connect.com/en-en/train/timetables/menton/monaco) shows direct trains for the checked day; return times, event services and works vary by date. Linked the timetable and the TER works page without promising a frequency or last train.
- Accommodation-area guide: the [tourism office](https://www.menton-riviera-merveilles.fr/offres/plage-rondelli-menton-fr-3051231/) places Rondelli near Port de Garavan; it does not verify apartment distances or seasonal beach conditions. Corrected the Victoria Beach description to distinguish the studio from the family apartment, using the existing apartment records as the project source of truth. These are claim-level checks, not complete verification of any guide.
- Event illustrations: the owner-supplied Monaco Yacht Show 2027 image was added to the existing event. At that time the post-publication asset script only read the JSON publication catalogue, so the image was registered through the legacy event illustration mapping. The follow-up extends asset matching to both catalogues and adds guarded annual illustration inheritance; see [events publication](../events-publication-workflow.md).

## Mobile accessibility and performance follow-up

On 26 October, single simulated-mobile Lighthouse runs against the live site before this patch reported: booking performance 87, accessibility 92, LCP 3.6 s and TBT 100 ms; guide performance 41, accessibility 93, LCP 5.4 s and TBT 1,500 ms; events performance 60, accessibility 92, LCP 5.0 s and TBT 730 ms. These are individual lab runs, not field Core Web Vitals or a stable trend.

The patch increases language-switch touch targets and aligns their accessible names with visible labels, improves flagged booking/event/guide contrast, corrects responsive availability-card image sizes, and delays the guide preview map until it approaches the viewport. The map remains available after scrolling and filtering. Against the local production build, separate mobile accessibility runs reported 100 on booking, events and guide, with no contrast, accessible-name mismatch or touch-target findings in those runs. The guide audit did not cover map markers after scrolling. These local checks do not establish production performance improvements. Repeat on the deployed commit, and obtain field data separately. The compact map's geographically overlapping markers remain an accessibility risk when the map is opened.

## High-traffic food and shopping guides: claim-level follow-up

Checked 26 October 2026. These checks are limited to the named claims, not a full verification of five guides or their translations, menus, pricing, opening hours, or every venue.

- Souvenirs: the tourist office lists [Au Pays du Citron's shop at 22 Rue Saint-Michel](https://www.menton-riviera-merveilles.fr/offres/au-pays-du-citron-menton-fr-4008482/) and separately identifies [Maison Gannac's 10 Rue Saint-Michel boutique and Super-Garavan domaine](https://www.menton-riviera-merveilles.fr/aventures-merveilleuses/citrons-et-merveilles/). Corrected the place cards and souvenir walk; domaine visit access remains to be confirmed.
- Budget lunch: [Mon Goût](https://www.menton-riviera-merveilles.fr/offres/restaurant-mon-gout-menton-fr-5072583/) is listed at 4 Rue Prato with Lebanese food; corrected the name and address. The point remains excluded from the map because coordinates have not been independently verified. [Mitron Bakery](https://www.menton-riviera-merveilles.fr/offres/boulangerie-mitron-bakery-menton-fr-3727629/) lists 8 Rue Piéta and a Halles presence; hours and prices were not revalidated.
- Seafood: the tourist office identifies [Lyõde at 8 Promenade de la Mer](https://www.menton-riviera-merveilles.fr/offres/restaurant-lyode-menton-fr-5072581/) as a seafood and oyster restaurant. Its [Le Cabanon listing](https://www.menton-riviera-merveilles.fr/offres/restaurant-le-cabanon-roquebrune-cap-martin-fr-3051195/) says temporarily closed but contains conflicting date ranges. Added a dated warning and source; reopening is not established.
- Coffee: the tourist office lists [Edwige Coffee at 3 Rue Palmaro](https://www.menton-riviera-merveilles.fr/offres/coffee-shop-edwige-coffee-menton-fr-3051528/) and [Eunoia at Port de Garavan](https://www.menton-riviera-merveilles.fr/offres/coffee-shop-brunch-eunoia-coffee-menton-fr-4212299/). Their listings caution that hours are not guaranteed. Fixed two Ukrainian wording defects, but the entire localization was not reviewed.
- Pizza: the tourist office lists [Pecora Negra at Sablettes](https://www.menton-riviera-merveilles.fr/offres/restaurant-pecora-negra-menton-fr-3051694/), [Pizz'Alex at 3 Avenue Cernuschi](https://www.menton-riviera-merveilles.fr/offres/pizzeria-pizzalex-menton-menton-fr-3051979/) and [Bocca Fina at 2 Promenade Val du Carei](https://www.menton-riviera-merveilles.fr/offres/pizzeria-bocca-fina-pizza-menton-menton-fr-5006883/). Service, menu, delivery, opening hours and pricing should be confirmed directly.
