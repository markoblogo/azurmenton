# Menton Holiday Budget Guide And Illustration Intake

Slug: `menton-holiday-budget`. Owner approved publication after successful checks, including the cover and illustration-import fix. Public verification remains a separate gate. Original Word/image retained in the existing intake workflow; no originals deleted.

EN retains the supplied prose and nine tables with corrections. FR/IT/UK are natural editorial localizations with the same 14 sections and table shapes. They are not sentence-for-sentence transcriptions. Daily EUR40/85/155, component sums, stay-length multiplication, weekly total and two-adult totals have four-locale arithmetic regression coverage. Accommodation, associated tourist tax, travel to Menton, airport transfers, car costs and exceptional purchases are excluded. This is an editorial spending model, not surveyed expenditure or a guaranteed package.

## Source Review

Checked 4 November 2026:

- [Zest fares](https://www.zestbus.fr/tarifs/) and [6 July 2026 change notice](https://www.zestbus.fr/news/les-tarifs-zestbus-evoluent-a-partir-du-6-juillet-2026/): single EUR2, day EUR5, seven days EUR13, La Navette EUR1. Single validity is one hour, connections included, no return; specified exceptions apply. Shuttle is a distinct product.
- [TER Sud, SudAzur Explore](https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/tarifs-cartes/bons-plans/pass-sudazur-explore): EUR35/50/80 for 3/7/14 days. Coverage is participating networks in Alpes-Maritimes/Monaco; the listed coastal train scope ends at Menton Garavan, not Ventimiglia. No blanket promise of Italian validity or automatic savings.
- [Serre de la Madone](https://serredelamadone.fr/en/plan-your-visit/): published adult EUR10 self-guided/EUR15 guided, advance reservation for guided visits. Footer states November and December 2026 closure, overriding the generic daily-hours panel. Prices are reference tariffs, not currently bookable admission or proof of a reopening date.
- Restaurant, supermarket, private-beach and other activity ranges remain illustrative planning allowances, not independently verified venue quotes. Removed the supplied assertion that private-beach rates had been verified. No statistically proven city-price ranking is claimed. Replaced the truncated malformed tourism link with direct operator sources and removed literal `<escape>` tags.

Reused Halles du Marché, Menton station, Sablettes and Serre de la Madone with existing illustrations, section references and reciprocal place links. Added useful reciprocal article links and the existing practical-stay intent. No new place, guessed coordinate, event or feature surface. Garden access remains explicitly restricted; supplied cover is labelled artistic, not a menu or quoted meal.

## Illustration Improvement

The importer now checks actual files inside `public` before resolving coverage. A path assigned in canonical metadata is not proof the file exists. A non-mutating metadata view feeds matching, missing-only selection and target suggestions consistently. Existing files remain protected by missing-only; no canonical fields are cleared by this check. Regression test was red before implementation, then green with existing asset/workflow/release tests.

Targeted processing is retained: no whole-library generation. Each processed image's local report now records actual timestamps, duration and source/derivative bytes. One controlled cover pass exercised the new path: **1751 ms**, source **2520497 bytes**, AVIF+WebP **299261 bytes combined**. This measures encoding/copying that asset, not total publication latency or browser transfer. No old illustration was regenerated during this run.

## Timings And Gates

Observed task start: **2026-11-04T21:25:28Z**, 22:25:28 Europe/Paris. Intake, research and importer work overlapped. At **21:40:40Z**, four localized sources compiled with aligned tables. At **21:49:00Z**, schema, typecheck, 44 focused tests and image integrity had passed, and owner approval had been received. These are wall-clock milestones, not exclusive active-labour durations. Precise approval-wait duration UNKNOWN.

| Stage | Evidence / state |
| --- | --- |
| Preparation | Existing packet with frozen document/cover and preparation-step timestamps |
| Localization and research | 14 sections, nine tables; completed before final-tree QA |
| Narrow tests | New guide red before insertion, green afterward; missing-image regression red then green; release/check-order tests included up front |
| Image processing | One controlled targeted pass: 1751 ms; manifest 235 sources |
| Full local QA | Required input-bound receipt in ignored `workflow/checks.json` |
| CI/preview | Mandatory; provider timestamps recorded separately |
| Production/public | Exact merged SHA, production alias, all locales/media/table/links required |

The complete timing ledger remains in ignored `build/guide-intake/menton-holiday-budget/workflow/publication-timing.json`. No second unchanged full-suite run is planned solely to repeat the already-proven receipt reuse benchmark from Rebecca. If inputs change, actual affected checks rerun. The remaining full CI/deployment requirement is not bypassed for illustrations.

Next improvement should follow measured evidence, not remove approval, tariff checks, asset integrity or domain verification. Fine-grained historical stage durations not recorded are UNKNOWN. No new automation, paid service, booking or external message.

First full pass stopped at the content-audit unit gate before build: adding the guide to practical-stay intent required a backlink from its canonical useful-apps guide. Added the natural practical-planning article relationship through the existing reciprocal-link loop; no assertion was weakened. The failed receipt is retained separately. Updated the manual narrow-test checklist to include the existing content-audit test whenever guide/intent membership changes. This is a measured rerun blocker, not concealed as successful QA.
