# Portal Technical Audit — 30 October 2026

## Scope And Baseline

Repository `markoblogo/azurmenton`, main baseline `270e88f18ee9595d9728c7cd96ff1df1fddf52b0`. This pass covers editorial additions, mailbox-only newsletter interest, contextual corrections, shared visit rules, optional child ages and personal-day navigation/order suggestions. No real booking, email, subscriber import or Telegram test was sent. Commit/CI/deployment evidence must be checked separately after release; local checks are not publication proof.

## Findings And Repairs

1. Event status, JSON-LD eligibility and indexing disagreed around Paris midnight when the server used UTC; date arithmetic also depended on host timezone. They now share Paris date keys and UTC calendar arithmetic, with boundary regression tests.
2. The new weekly page inherited low-contrast labels and a shared booking CTA with conflicting light/dark backgrounds. Labels were darkened/enlarged, the CTA now owns one explicit dark background, and its secondary button uses a dedicated light-text variant without changing buttons on light surfaces. Browser assertions guard computed background and secondary-link colour.
3. Editorial/waitlist forms needed an explicit native POST fallback so unhydrated submission cannot put email into a GET URL. They still require JavaScript and anti-spam verification to submit successfully; this is not a no-JavaScript form implementation.
4. Mobile event date filters could exceed narrow containers; they now stack below the small-screen breakpoint. The guide mini-map link now describes its map destination instead of saying only “More”.
5. Empty/expired weekly editions are noindex/follow and absent from sitemap. Sitemap eligibility revalidates hourly. Weekly picks resolve dates, times, sources and places from canonical event records and reject unverified/conflicting/expired events.

## Verification

- Unit suite: 398 tests across 82 files passed on the final source.
- Browser coverage: all 53 scenarios passed in the final complete run, including 320/390px layouts, four locales, local persistence, preview/apply/undo, mocked subscription/withdrawal and correction errors, real search result anchors, and public content without JavaScript. The legacy correction selector was updated for the new reason dropdown.
- After the last secondary-button contrast repair, the 19 affected booking/editorial/correction/search/navigation browser scenarios passed again on a rebuilt production bundle; CI also runs the entire suite on the published commit.
- Public guide/events/stay content, canonical/hreflang and private-page indexing guards are checked without JavaScript. Filter URLs preserve canonical targets. This is representative coverage, not every URL or query combination.
- Typecheck, lint, production webpack build, content/SEO/weekly/funnel preflight, image checks and CSP checks passed. Local restricted-network weather lookups produced fallback warnings during the build; they did not fail the build or prove current weather data availability.
- Full dependency audit, including development dependencies: zero reported vulnerabilities at audit time. This does not certify application security.
- Read-only event review: 110 records, 72 review items, zero high-risk/missing-source/stale-source flags and nine pending-review records. Many remaining flags concern historical guide links: an archive link is not automatically a broken link. Editorial review remains required.

## Mobile Lighthouse

Lighthouse 12.8.2, mobile defaults, local production webpack build, Chromium on macOS, one run per page. External analytics/provider hosts blocked. No comparison to earlier differently configured runs or field Core Web Vitals is implied.

Initial observations, before the contrast/link-label repairs:

| Page | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/en/guide` | 86 | 100 | 96 | 92 | 3.8s | 110ms | 0 |
| `/en/events/this-week` | 91 | 96 | 96 | 100 | 3.5s | 70ms | See local JSON |
| `/en/my-trip` | 91 | 100 | 96 | 69 | 3.4s | 120ms | See local JSON |

Private My trip intentionally has noindex: its SEO score is not a request to index private planning pages. Local Best Practices deductions include the unavailable local `/_vercel/insights/script.js`, not proof of a production asset failure. Initial reports: `/private/tmp/menton-lh-{guide,weekly,trip}.json`. Final repaired-page measurements are recorded in the release follow-up below.

Final repaired-page checks:

| Page | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/en/guide` | 88 | 100 | 96 | 100 | 3.9s | See JSON | See JSON |
| `/en/events/this-week` | 93 | 100 | 96 | 100 | 3.1s | 60ms | 0 |

The contrast and descriptive-link audits now pass. Reports: `/private/tmp/menton-lh-guide-final.json` and `/private/tmp/menton-lh-weekly-release.json`. Performance varies between single local runs (one intermediate weekly run reached 98); these numbers do not establish a controlled speed improvement. Catalogue LCP remains a measured optimisation opportunity.

## Residual Work And Claim Boundaries

- Lab LCP remains above 2.5s in these single runs. Profile hero/font delivery and serialized catalogue data next; do not claim real-user CWV failure or improvement without field measurements.
- Automated accessibility scores do not replace keyboard, screen-reader or real-device review. No blanket WCAG compliance claim is made.
- Shared mutable facts are only incrementally centralized: one sourced stairs rule, explicit city labels for the existing route stops, and consumers for verified minimum ages. No numeric venue age restriction was invented; most remain unverified.
- Nearby order is an opt-in, fixed-first-stop, straight-line heuristic for 3–12 reviewed single-city walking stops, not an optimal accessible street route or opening-hours scheduler.
- Newsletter requests reach the editorial mailbox only. Ownership is unverified; withdrawal, deduplication and the six-month pending-request limit require manual handling. No newsletter delivery, confirmation or subscription database is enabled.
- No independent factual audit of every guide/place, real email-delivery verification, load test, penetration test, field CWV/INP study or Telegram repair was performed in this pass.

Operational instructions: [Portal features](../PORTAL_FEATURES.md), [Day routes](../day-routes.md), [Content operations](../content-operations.md).
