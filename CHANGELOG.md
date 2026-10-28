# Changelog

## Repository Update - 2026-10-28

- Added verified event time/venue fields, calendar downloads and separate performance selection.
- Added a filtered month calendar and a localized event suggestion/correction form with manual email moderation; no automatic publication.
- Restored the two-row primary navigation and integrated favourite/share controls into cards and detail actions.
- Added a report-only time-coverage audit for the full event inventory and refreshed confirmed schedules from official sources.
- Updated privacy disclosures, configuration examples and operating documentation. Code pushed in `538dd02`; CI, deployment and real email delivery must be verified separately.

## 0.2.1 - 2026-09-13

- Rechecked the priority event backlog against official sources, corrected three 2027 schedules, refreshed verified records, and explicitly archived ended annual listings without published next dates.
- Reduced the event review gate from 19 high-risk findings to zero.
- Recorded the first measured Search Console and Plausible baseline and configured the canonical Plausible booking goals.

## 0.2.0 - 2026-09-13

- Updated Next.js, React, media, image, test, and styling dependencies; production audit now reports no known vulnerabilities.
- Localized the homepage FAQ in EN/FR/IT/UK and aligned availability copy with the read-only planning previews.
- Fixed `llms.txt` line breaks and removed an expired event from featured status.
- Made booking-request BCC explicit instead of relying on a personal-address fallback.
- Added production browser tests, hardened CI, Dependabot, contribution guidance, security reporting, ownership, and licensing boundaries.

## 0.1.0

- Initial multilingual direct-booking platform, apartment pages, Menton guide, events, maps, travel tools, and manual booking request flow.
