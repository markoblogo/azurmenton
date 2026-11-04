# La Baie des Anges Guide Preparation

Slug: `la-baie-des-anges-jacques-demy-riviera-filming-locations`.

Status: owner approved publication after successful checks; not yet published. The supplied Word document and colour cover are frozen in the existing ignored intake packet. No originals moved or deleted. EN retains the supplied article, with source/access corrections and service notes removed. FR/IT/UK are editorial localizations with the same 18 sections and four tables, not line-for-line transcriptions of the short repeated sentences.

## Evidence And Boundaries

- [Ciné-Tamaris](https://cine-tamaris.fr/jacques-demy/la-baie-des-anges-1962/), checked 2026-11-04: Nice, Monte-Carlo and Paris, 17 September–28 October 1962; casino cooperation in Cannes, Monte-Carlo and Juan-les-Pins, the latter representing Enghien. This does not authenticate every doorway or interior.
- [CNC](https://www.cnc.fr/professionnels/visas-et-classification/26732) and [Criterion](https://www.criterion.com/films/27935-bay-of-angels): 1963 release and 84 minutes. Ciné-Tamaris lists 79; the [departmental portal](https://portail-savoirs.departement06.fr/annuaire-general/la-baie-des-anges-film-de-jacques-demy) lists 90. Preserve the conflict rather than claiming one verified duration.
- [Cinémathèque restoration account](https://www.cinematheque.fr/article/30.html): opening tracking shot in Nice and 4K scan/2K treatment. Search extraction available; direct request returned 503. [Casino operator](https://www.montecarlosbm.com/en/casino-monaco/casino-monte-carlo) returned 403. Current prices/admission are not verified. The exact Old Nice room address, Villefranche scenes and present casino-room matches remain unconfirmed.
- [City of Nice garden record](https://www.nice.fr/lieux/jardin-albert-1er/): bandstand closure 2–9 November 2026 for marathon installation, not a blanket garden closure. [City walking/cycling guide](https://www.nice.fr/uploads/media/default/0001/01/NFC_decouvrir-le-vieux-nice-en-velo.PDF) identifies the central public-space geography. [Cannes heritage inventory](https://dossiersinventaire.maregionsud.fr/dossier/IA06000111) records the former casino/replacement; no surviving historical interior promised.
- [TER Sud](https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur): overnight Nice–Ventimiglia works 22:00–06:00 Sunday–Thursday through 10 December 2027. Date-specific returns still require checking. Proposed durations are editorial estimates, not surveyed accessibility.

Four new public-space cards: Jardin Albert Ier, Place Masséna, Vieux-Nice, Quai des États-Unis. The owner supplied illustrations for all four during preparation. The first Quai image evoked the Negresco/Promenade des Anglais, so it was not imported; the owner supplied a replacement showing the Old Nice waterfront. All are labelled artistic, not verified film stills. Garden/square coordinates are explicitly excluded pending review; the two walk records are outside current map taxonomy, without fabricated points. Vieux-Nice also supports the existing Romain Gary day itinerary. Other existing illustrated Monaco/Villefranche places are reused only in their relevant sections; Villefranche remains a clearly thematic extension. All article links have reciprocal links.

## Publication Timing

Observed intake-task start: **2026-11-04T17:47:33Z** (18:47:33 Europe/Paris). This run overlaps finalization of workflow tooling; do not treat it as a clean benchmark or infer active labour from elapsed time. Granular start times not captured are `UNKNOWN`, not reconstructed.

| Stage | Observed evidence / duration | State |
| --- | --- | --- |
| Source reading and research | Began after task-start timestamp; exact separate duration UNKNOWN; overlapped prior workflow check | Done |
| Intake and cover | Existing prepare command succeeded; first fine-grained duration UNKNOWN | Done |
| Editing, localization, content graph | Work observed through 2026-11-04T18:16:09Z; not an exclusive timed interval | Local preparation |
| Local QA | First successful suite: 592035 ms, build 274766 ms, browser 28493 ms; 549 tests, 123 files. Retained in workflow/checks-first-pass.json. Cache fix then receives focused regression coverage and mandatory full CI | Local pass; final CI pending |
| Owner approval wait | Owner approved after checks; precise wait interval UNKNOWN | Approved |
| CI/preview, merge/production | Provider timestamps required | Approved after successful checks |
| Public verification | Public browser receipt plus exact deployment SHA required | Not performed |

## Blockers And Next Improvement

1. Prior workflow repeat changed execution environment: cache correctly invalidated; the default environment then rejected the loopback listener (`EPERM`) after build. Approximately ten minutes of overlapping elapsed time, not measured exclusive lost labour. First permitted-environment full verification had passed. Use one stable permitted environment from the outset; do not rerun a whole suite just to diagnose browser permissions.
2. Wrong Criterion URL and casino 403/restoration direct 503: corrected link, preserved source-access limits; no repeated retries or invented verification. Exact time lost UNKNOWN.
3. Local schema mistakes caught by narrow tests: unsupported duration label and one merged translated comparison-table row. Corrected before full QA. Exact time lost UNKNOWN. Next improvement: validate metadata enums and table shapes before importing a newly authored module.
4. Content graph additions exposed a map taxonomy mismatch and an older Romain Gary fixed-card-count test. Fixed the actual map eligibility and extended the test to the new shared illustration, retaining its existing asset assertions. An early full pass was stopped after its unit failure, before build. Run focused content/schema and adjacent guide tests before the full suite next time.
5. A same-environment repeat still missed cache. Two independently launched environment-hash samples identified only `CODEX_TOOL_CALL_ID` changing. The invocation label was incorrectly treated as build input; it is now explicitly excluded, with a regression test. Real configuration/secret changes still invalidate receipts. The redundant repeat was stopped; no unmeasured repeat-speed claim is made. This is the priority improvement delivered in this batch.

After publication, append actual QA/provider/public timestamps, total observed elapsed time (with interruptions), and the single largest avoidable delay. Owner and provider waits must remain separate. No new automation or reduced approval gate is introduced.
