# First evening in Menton: publication preparation

Checked: 3 November 2026, Europe/Paris. Owner explicitly approved publication after successful checks in this chat. Approval is separate from local QA, CI, deployment and public verification.

## Input And Editorial Scope

- Owner's Word and cover: `Your First Evening in Menton_ What to Do After a Late Arrival.docx`, `Your First Evening in Menton.png`. Frozen originals and hashes are retained in ignored `build/guide-intake/first-evening-menton-late-arrival/workflow/originals/`; no source deletion or relocation.
- Twelve numbered chapters, nine FAQ entries and two tables (five arrival scenarios, four shops), English source with narrow factual corrections and natural FR/IT/UK adaptations. Metadata preamble is excluded from reader copy. Cover is explicitly an illustration, not a verified luggage route, apartment entrance or promise of restaurant service.
- No private codes, apartment-specific access instructions, personal contacts or unit numbers published. Generic advice asks guests to obtain those privately. Self-check-in, groceries, transfer, cot and late-arrival arrangements require explicit host agreement. No bookings, external messages, new service or automation.
- Eight places: two existing stations, two existing waterfront places, two existing grocery cards and two new Carrefour cards. Existing `carrefour-express-menton` retains its stable ID but uses the current City Amiral Courbet name at the same 7 Rue Amiral Courbet address. No second card for that address.
- New Thiers and Sospel shops also appear in the existing supermarket guide with reciprocal coverage and clear source conflicts. Sospel means the Menton branch on Avenue de Sospel, not Sospel village. No illustration is assigned until the owner supplies one. Both have dated coordinate-unverified map exclusions, not guessed pins.
- Existing apartment guest guides link to the new first-evening article. Airport, transport, grocery, family, quiet-evening, car-free, accommodation and practical-contact guides are connected reciprocally. Eight deliberate related guides are retained; broad automatic suggestions based on incidental station/waterfront backlinks are rejected, not added for volume.

## Primary Sources

| Source | Checked fact and handling |
| --- | --- |
| [SNCF overnight works](https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/se-deplacer/info-trafic/travaux/travaux-entre-nice-vintimille) | Now lists works through 10 December 2027, 22:00–06:00 Sunday-to-Thursday nights. Corrected draft's 11 December 2026 endpoint. Notice distinguishes Ventimiglia–Monaco coaches and regional bus alternatives; no direct airport coach or individual departure promised. Menton Gare Routière is not the rail platform. |
| [SNCF 10–11 November interruption](https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/se-deplacer/info-trafic/travaux/nice-monaco-vintimille-nice-breil-tende) | Direction-specific restarts on 11 November and limited coach seats; linked explicitly rather than presenting one reopening time for every direction. No seat or ticket acceptance verified for an individual guest. |
| [Menton station](https://www.sncf-connect.com/gares/menton) | Public building hours exist; not train availability. No station opening hours copied as a last-train guarantee. Garavan remains an existing eastern-station reference; its attempted SNCF Connect page was unavailable, not evidence of closure. |
| [Carrefour Félix Faure](https://www.carrefour.fr/magasin/city-menton-felix-faure) | 35 Avenue Félix Faure. Weekly grid: 07:00–22:00 Monday–Saturday, 08:00–21:00 Sunday. Exceptions separate. |
| [Carrefour Thiers](https://www.carrefour.fr/magasin/city-menton-thiers) | 6 Avenue de Thiers. Weekly grid 07:00–21:00 daily. Corrected draft's 22:00. |
| [Carrefour Amiral Courbet](https://www.carrefour.fr/magasin/city-menton-amiral-courbet) | 7 Rue Amiral Courbet. Grid 07:00–21:00 Monday–Saturday, 08:00–21:00 Sunday. Corrected draft's 23:00. Existing shop card reused under current City name. |
| [Carrefour Sospel](https://www.carrefour.fr/magasin/city-menton-sospel), [Menton directory](https://www.carrefour.fr/magasin/ville/menton-06083) | 25–27 Avenue de Sospel, Menton. Weekly grid closes 21:50 Monday–Saturday and 19:50 Sunday, but banner/nearby-store references show 22:00. Conflict is visible in the guide and card: confirm directly, never silently select the later time. |
| Same Carrefour branch pages | Some advertise grocery delivery. This proves an advertised service only, not delivery to an apartment now, at 23:00 or with requested products. No order placed. |
| [City of Menton: Sablettes](https://www.menton.fr/L-esplanade-des-Sablettes.html) | Supports developed pedestrian space, lighting infrastructure and public seating. No current night inspection, guaranteed lighting, toilet hours or late kitchen inferred. Promenade walk is optional and short, not a certified safe or step-free night route. |

## Adjacent Corrections

The same outdated overnight-works end date existed in the linked public-transport guide and Christmas guide. Updated only that warning in EN/FR/IT/UK, retaining date-specific journey checks. Christmas source Markdown and compiled JSON remain synchronized. Its older programme-review date is not advanced: this is a transport-source correction, not a re-verification of every Christmas event. Existing date-specific 10–11 November transport alert remains separate.

## QA And Manual Packet Boundary

- Missing-guide unit regression reproduced before insertion. Subsequent 14 scoped tests pass after updating the Christmas expectation to the newly verified endpoint. Tests cover language/table structure, privacy/service limits, source conflicts, eight place links, two pending illustrations, old-guide coverage and apartment guest links.
- The standard packet completed all seven preparation stages. Final editorial curation then rejected six broad automatic link suggestions. Its original `packet.json` remains a preparation snapshot, not a falsely refreshed final receipt: strict packet reuse must reject the changed plan hash.
- Use the supported individual-command/manual path for this exceptional curation: canonical `guide:review` plus the unchanged shared project checks, recorded with input fingerprints and real outcomes in `workflow/manual-checks.json`. Do not claim the original packet's earlier hashes cover this curated final plan. A later bundle can reintroduce proposals and requires editorial review.
- Browser, CI, provider and public verification remain distinct gates; actual logs/results are retained locally. User visual acceptance is not inferred from test success.
- Owner image request: Carrefour City Menton Thiers and Carrefour City Menton Sospel, linked in `/en/guide/first-evening-menton-late-arrival` and `/en/guide/supermarkets-in-menton`.
