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
