# Guide provenance and verification loop

`npm run guides:verify -- --pilot` reads the bounded pilot dossier at `src/content/guides/provenance/verification-pilot.json` and writes `build/guides-verification/guides-verification.json`. It makes no network requests by default and never edits guide content.

The sidecar records source type, authority, checked date, shared locale coverage, claim-level observation, result, confidence and reviewer. Results are `CONFIRMED`, `CHANGE_DETECTED`, `UNVERIFIABLE`, `SOURCE_UNAVAILABLE`, `AMBIGUOUS` or `HUMAN_REVIEW_REQUIRED`.

The command emits `REVIEW_UPDATE` proposals for non-confirmed or changed claims. The boundary is deliberately explicit:

`VERIFY -> PROPOSE -> HUMAN/EDITORIAL APPROVAL -> UPDATE`

`npm run guides:health -- --today=2026-08-08` consumes the same sidecar. A pilot guide becomes `CURRENT` only when every recorded claim is high-confidence `CONFIRMED` with no detected change. This is guide-local evidence, not a shared platform framework, scheduler or automatic publication gate.

Pilot cadence recommendation: high-volatility guides should be rechecked before peak-season use and after a known change signal; medium-volatility guides periodically and before seasonal planning; low-volatility guides on change or at a long review interval. Exact intervals remain editorial policy until more observations exist.

The pilot covers six guides. It is sufficient to demonstrate a future Living Menton publication eligibility signal, but not sufficient to admit all 87 guides: `UNKNOWN` and `PROVENANCE_WEAK` remain explicit exclusion/review states.
