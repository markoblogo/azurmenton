# Event Discovery And Editorial Intake

## Public Interface

- `/[locale]/events` offers List / Month using the same filtered confirmed events. Month is lazy-loaded FullCalendar Standard 6 (MIT), month view only. Navigation does not reset filters; date filters still apply when moving between months. Unknown-date and conflicting-date events are not placed on arbitrary calendar days. All-day bars represent event dates, not continuous opening hours. Open the detail page to select a performance or export exact verified times.
- The one native editorial form accepts an event suggestion or correction. It is localized in EN/FR/IT/UK. Event proposals require date, venue, organiser and official HTTPS source; corrections require an Azur Menton page URL. Both require a name, reply email, message and privacy consent.
- Suggestions are never written into published content or automatically approved. They are emailed for human review. Moderator checks provenance, duplicate events, venue/place links, rights and dates through the existing event publication workflow.

## Delivery And Privacy

`POST /api/editorial-submission` uses existing Resend credentials and sender. Optional `EDITORIAL_TO_EMAIL` overrides the fallback `BOOKING_REQUEST_TO_EMAIL`. Missing configuration or failed provider response returns an error, not a success message. This is an email-based moderation inbox, not a separate persistent dashboard. No Telegram integration or automatic reply is added.

Same-origin requests, bounded request bodies, validated fields, honeypot, existing Turnstile and a separate editorial rate-limit bucket protect the endpoint. Rate limits are process-local, as in the current booking implementation; do not describe them as a distributed guarantee. Submission content is untrusted; links are not fetched by the server. Contact details and message text are not sent to analytics. The privacy page describes this processing in all four locales. Browser/unit tests mock delivery; real inbox delivery remains an owner check after deployment.

## Time Coverage Review

`npm run events:timing -- --fetch-sources` inventories all 110 event records, including the additional seasonal page, and writes `docs/reports/event-timing-audit.json`. It retrieves existing source/programme URLs and records same-date structured-data candidates without changing content. A retrieved page or a matching date is not proof of an exact performance time. Midnight timestamps may be date placeholders. Absent JSON-LD does not mean that the programme lacks times; manual review remains necessary.

On 28 October 2026 eight events have verified structured times and one has two selectable sessions. Three additional schedules were manually confirmed against the official tourist office: Halloween Beausoleil (31 October, 14:00-22:00), En finir avec la peur (29 November, 15:30-16:30), Parade de Noel Beausoleil (4 December, 18:00-19:15). The [2026 Nice-Cannes Marathon regulations](https://www.marathon06.com/2026/dl/MAM2026_reglement-individuel.pdf) additionally confirm successive starts: 07:57 wheelchair race, 08:00 elite, from 08:03 main field. Export starts with the first wave and retains all three in the localized programme label; no finish time is invented. Source URLs and verification dates are stored with each schedule. The remaining records are explicitly classified rather than assigned invented hours. Failed source retrieval is an open editorial item, not verification.

## Navigation And Saved Items

The primary menu is a separate row below the brand/languages at every breakpoint. Favourites is a text link, not an isolated heart in navigation. Card save controls use a consistent small outlined heart with a 44px target; place actions sit over the preview without narrowing the heading. Guide/event detail save controls sit within the share action panel. Storage and analytics semantics are unchanged.
