# Editorial Registry: First Real Batch

Date: 31 October 2026, Europe/Paris. Pilot: the existing 6-12 November edition, not a new duplicate weekly page.

## Priorities Registered

1. High: verify and approve the 6-12 November weekly edition for its existing date window.
2. High: recheck Menton's Christmas programme before changing the undated umbrella. The earlier winter review found last year's programme; the current task records that evidence gap, not newly confirmed dates. Nice/Monaco villages are already represented and must not be republished as discoveries.
3. Normal: prepare the Sanremo International Guitar Festival proposal from the November review, with a fresh date/venue/duplicate check and owner approval before insertion.
4. Normal: prepare the following weekly edition for 13-19 November from canonical events. No selection or approval is assumed.

The empty `untitled-guide` intake has no editorial sections and its preamble contains Vitest worker imports. It is rejected as a technical artifact, not deleted or published. Rejected status is technical triage, not a fabricated owner publishing decision.

## Pilot Source Review

All four sources were retrieved during this pass. Ticket inventory, age eligibility, step-free routes and exact return trains were not checked or promised.

| Selection | Official evidence checked | Result |
| --- | --- | --- |
| St John's Jazz, Menton | [Tourist office](https://www.menton-riviera-merveilles.fr/offres/st-johns-jazz-menton-fr-6856620/) | 6 November 2026, 18:30, 31 avenue Carnot; Manu LePrince with Manu Carre/Ben Prischi. Adult EUR15/student EUR10 listed. Existing edition and venue agree. |
| Note d'aMare, Bordighera | [Official destination page](https://www.visitbordighera.it/eventi/note-damare-concerto-finale) | 8 November 2026, 17:00, Teatro Giancarlo Golzi; free entry. Retain the seat/return-travel caveats. |
| Stand Up Monaco | [Grimaldi Forum event page](https://grimaldiforum.com/fr/agenda-manifestations-monaco/stand-up-monaco-9-novembre-2026) | 9 November 2026, separate 19:00/21:00 performances, Indigo; EUR35, about 75 minutes. Replace the canonical generic welcome-page source with this precise programme URL. Existing sessions and venue remain unchanged. |
| Quiet Halles morning | [Tourist office](https://www.menton-riviera-merveilles.fr/menton-et-le-littoral/nos-incontournables/marche-des-halles/) | The 1898 pediment and multicoloured ceramics are supported. This is an ordinary morning suggestion, not an invented event or guaranteed step-free visit. |

## Gate Record

- Intake: reused `src/content/weekly-edition-2026-11-06.ts`; four alternatives, canonical event/place/guide references and existing illustrations. No new venue or illustration request.
- In progress: reviewed official sources and compared dates, sessions and venue identity; corrected the overly broad Monaco source URL.
- Review: checked EN/FR/IT/UK content and the Paris-date selection rules. This edition must not replace the current 30 October issue before 6 November. No request or booking is submitted.
- Approved: owner explicitly replied **yes** to the four-item 6-12 November edition in project chat, response to `call_cdf1552e63a742c7875af7a5cbb61ebe`, on 31 October. The registry records this actual approval, not technical readiness inferred as approval.
- Public verification of the future edition: pending. The existing resolver is date-bounded; owner approval does not make the future edition currently visible or enable a generic automatic publisher. Verify the domain during 6-12 November, then record actual public evidence separately.

Release follow-up: after this pilot the owner explicitly authorised publishing the accumulated registry/report block on 31 October, including commit/push and deployment verification. This is not approval for the remaining event proposals, a new scheduler or early display of the November edition. GitHub/Vercel and current public-page results are release evidence, separate from checking the future edition in its actual window.

The weekly task intentionally stays `approved`, not `published`. No `publication` evidence has been invented. Technical status in the general report may remain `unknown` where no source-workflow readiness artifact exists; the checks here are documented evidence, not a generated publish report.

## Workflow Correction

Only automatically discovered old publication proposals are suppressed as `repository-present`. An explicit registered publication task stays active even if its content is already staged in code. Otherwise a future approved weekly edition disappears from the operator's working list before its public window has opened. `notBefore` still prevents an early release recommendation; no automatic transition to `published` occurs when the date arrives.

## Verification

Regression coverage checks the staged-but-not-yet-public registry case, real approval reference, all four locale selections at the opening boundary, canonical links/media and the exact Monaco programme source. Command outcomes are recorded after local verification; local tests are not deployment or public-site evidence.

Local outcomes: 441 unit tests passed; the 18 focused registry/weekly tests passed, including a further rerun of the registry tests after the operator-action refinement. TypeScript, lint, content/SEO/weekly/funnel preflight and diff whitespace checks passed. The refreshed general report has four active tasks, 38 automatically discovered repository-present tasks, three past candidates and one rejected artifact. Four locales retain the current edition on 31 October and select the approved edition from Paris midnight on 6 November; expired outings disappear and the edition ends after 12 November. No production browser or deployment result is claimed here.
