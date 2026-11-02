# November Editorial Corrections

Scope: owner-approved local corrections from the 2 November report-only reviews.
No new candidate events, guides, images, subscriptions or bookings are introduced.
Local preparation is not a production release; commit, push and deployment remain separate.

## Sources And Changes

- [Marathon regulations, article 2](https://www.marathon06.com/2026/dl/MAM2026_reglement-individuel.pdf), checked 2 November: replace the incorrect 08:03 main-field claim with the five official waves, 07:57 / 08:00 / 08:25 / 08:50 / 09:15. Preserve the assigned wave groups in all four languages. Reuse the session selector for calendar export; no implicit handisport start, finish time or new event card.
- [Monaco municipality](https://www.mairie.mc/la-foire-attractions), checked 2 November: update the existing `amusement-park-monaco` occurrence to 16 October-19 November 2026, verified source and existing illustrated Port Hercule / Quai Albert Ier venue. Remove its obsolete awaiting-programme profile. Daily opening varies by stand, weekday and holiday; retain date-only export and the 18 November exception in visitor advice. Existing media stays unchanged.
- [Zestbus](https://www.zestbus.fr/les-nouveautes-du-reseau-zestbus-au-06-juillet-2026), checked 2 November: the central navette costs EUR1 from 6 July. Remove contradictory free-shuttle claims from the transport guide, SEO description and shared transport option in EN/FR/IT/UK. Retain the stable legacy option ID; its wording does not define the current fare.
- [SNCF interruption notice](https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/se-deplacer/info-trafic/travaux/nice-monaco-vintimille-nice-breil-tende), checked 2 November: add the direct notice to the existing guide warning for 10-11 November. Resumption differs by direction; do not promise a universal 17:30 restart or replacement-bus capacity.
- [ASL Arenas works notice](https://www.arenasnice.fr/travaux/travaux-promenade-des-anglais-a-partir-du-28-septembre/), checked 2 November: place the Pont du Mercantour road restriction in shared airport visit conditions, visible wherever that place card is rendered. The phase runs from 2 October 2026 to March 2027; it does not close every airport route from Menton. No invented delay estimate.
- [Nice municipality: Parc Phoenix](https://www.nice.fr/lieux/parc-phoenix/), checked 2 November: shared winter opening label and dated condition, 1 October-31 March, 09:30-18:00, ticket office one hour earlier. Exceptional closures and separate activities still require checks.
- [Parc Alpha operator](https://www.puremontagne.fr/en/to-see/parc-alpha), checked 2 November: shared condition records reservations and the published calendar through 11 November 2026. Missing later dates do not establish closure; no winter availability is invented.

## Deliberately Unchanged

- Monaco triathlon remains pending because organiser and federation sources conflict.
- Fire-safety advice remains cautious: direct prefecture retrieval failed; no additional permission or current restriction is inferred from the end of the summer vigilance period.
- Missing provenance labels and 23 weak-link report signals are not 23 proven errors. No broad relabelling, artificial links or blanket verification dates.
- The next weekly edition and proposed event shortlist still need separate editorial approval. No analytics or automation configuration is changed.

## Verification

Regression coverage checks five calendar waves and UTC conversion in all locales,
the fair's inclusive dates/date-only export, pending triathlon status, absence of
free-navette copy in the guide/SEO, and dated shared airport/park conditions.
Record test and preflight outcomes separately from any future deployed/public checks.

Local results: 61 focused unit tests pass; TypeScript, targeted ESLint, content
schema lint, docs check (78 files, no broken links/commands) and diff whitespace
checks pass. Events review retains zero high-risk findings (75 review items).
The new browser scenario passes on 390px layouts in EN/FR/IT/UK: five selectable
waves, UTC calendar download, confirmed fair/date-only download and visible
shared airport/park notes. Mobile screenshot reviewed. The first Turbopack
startup hit a slow-filesystem timeout; a temporary webpack test config outside
the repository allowed the scenario to complete. The existing calendar smoke
test hit its 30-second cold API compilation limit, then passed on a separate
180-second-limit retry (1.5 minutes including server startup). Both browser
scenarios now pass; no claim of production build, CI or public deployment is made.

Incidental development warnings report apartment images requesting quality 88
outside the configured [75, 90] list. This pre-existing image-configuration issue
is outside this content-correction pass; no image configuration was changed.
