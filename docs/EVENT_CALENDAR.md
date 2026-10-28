# Event Calendar Export

Event detail pages offer calendar downloads for verified, confirmed dates without date conflicts. Google Calendar is offered when both endpoints are known; Apple Calendar and Outlook can import the `.ics` download, including start-only performances. No calendar account access is requested.

- `startDate` / `endDate` remain inclusive editorial dates. Exports use exclusive date-only end dates.
- Optional `schedule` stores verified `startTime`, optional `endTime`, `Europe/Paris`, the source URL and verification date. Never infer times from prose, invent a duration, or copy an occurrence's schedule into next year's event. DST gaps and ambiguous repeated hours fail closed.
- Optional `venue` stores a verified name, address, source URL and existing `placeId`. Do not treat the first related place as the venue: festivals may span several towns.
- Missing structured times produce a date-only planning entry, not a claim that the venue is open all day. Multiple performances use `sessions`: stable `id`, `date`, optional `endDate`, and the same verified time/provenance fields as `schedule`. Each date must fall inside the parent event date range. The visitor explicitly chooses a performance; no default aggregate download is available. Each session has its own stable UID across locales. Approximate durations are not converted into exact end times.
- Export URLs are `/api/events/<canonical-slug>/calendar?locale=en` (also `fr`, `it`, `uk`). UID is stable across languages. Calendar responses are not cached or indexed.
- This is a saved snapshot, not a subscription. Changes/cancellations are not automatically delivered. The downloaded description includes the event page and official source.

Initial timed/venue example: Vivaldi Gloria, 31 October 2026 at 18:30, St John's Anglican Church, 31 avenue Carnot, Menton. Verified against the official tourist office listing on 28 October 2026; no end time was published, so none is exported.

## Near-Term Source Review: 28 October 2026

- [Menton Halloween](https://www.menton-riviera-merveilles.fr/offres/menton-fete-halloween-menton-fr-6063164/): 30 October, 13:30-16:00, Jardins Bioves. Structured start/end and venue added.
- [Jimmy Gnecco / OURS](https://www.grimaldiforum.com/fr/agenda-manifestations-monaco/thursday-live-sessions-jimmy-gnecco-ours): 5 November, aperomix from 18:30, live performance 20:30, Espace Indigo, Grimaldi Forum. Calendar start is the start of the whole evening; the localized programme label, including the concert time, is retained in the download. End unknown.
- [St Johns Jazz](https://www.menton-riviera-merveilles.fr/offres/st-johns-jazz-menton-fr-6856620/): 6 November, 18:30, St John's, 31 avenue Carnot. End unknown.
- [Stand Up Monaco](https://grimaldiforum.com/fr/agenda-manifestations-monaco/stand-up-monaco-9-novembre-2026): 9 November, separate performances at 19:00 and 21:00, Espace Indigo. Two selectable sessions (`1900`, `2100`); source reconfirmed on 28 October 2026. Do not export 19:00-21:00 as a single show. The source's approximate 75-minute duration does not establish exact ends, so these sessions offer start-only ICS downloads.

For session downloads append `&session=<id>` to the calendar URL. Missing, unknown or duplicated session IDs fail closed; arbitrary dates/times supplied in a URL cannot change the export. The parent Event JSON-LD keeps its date range rather than pretending one performance covers both shows.
- Note d'aMare, Bordighera, 8 November: existing source could not be retrieved; do not promote its prose time/address to freshly verified structured fields. Recheck required. Multi-town festivals likewise retain date-only ranges, not the time of one individual performance.

Run `npx vitest run tests/unit/event-calendar.test.ts` for date ranges, timezone/DST, localization, venue references and download route checks. No additional Event JSON-LD is injected by the calendar control.
