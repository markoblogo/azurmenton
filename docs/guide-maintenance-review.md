# Weekly Guide Maintenance Review

Purpose: a human-reviewed queue, not an automated editing or publishing system. Run weekly in the project thread; never change articles, claims, bookings, images, messages, source timestamps or repository files during the scheduled review.

## Inputs

1. Run `npm run guides:health -- --today YYYY-MM-DD --out /tmp/azur-guide-health-review.json`, using the current Europe/Paris date. The output file is temporary and is not committed.
2. Run `npm run content:report` for missing media, unresolved references and map obligations. Check `docs/audits/` for recent verified reviews before proposing repeated work.
3. Use the tracked pilot evidence in `src/content/guides/provenance/verification-pilot.json`, authority profiles in `src/content/guide-authority.ts`, and relevant existing place/programme links as starting points. Inspect actual page claims and live official or first-party sources before calling a fact changed. An editorial review date does not certify every claim.
4. Use current read-only Search Console or Plausible data only when available; record the period and source. Missing credentials or unavailable data are `UNKNOWN`, not zero. Do not require analytics access or modify tracking settings.

## Review and report

- Select up to five actionable guides, giving priority to guest safety, access, transport, booking relevance, high-volatility facts and available traffic evidence. Recent checks can supersede the automated ranking, but only for the facts actually checked.
- For each, include the public guide URL, reason for selection, specific affected claim or evidence gap, authoritative source URL, date checked, finding and a proposed manual action. Mark an unavailable source or unresolved contradiction explicitly. A source homepage or an old cached result alone does not establish a change.
- Separately list any discovered missing place illustrations with the location name and guide URL; request illustrations from the owner. Do not reuse unrelated media.
- Separate confirmed change, review due, unavailable/ambiguous evidence and new-guide ideas. New ideas require demand and duplicate checks and remain proposals.
- The report must never write editorial files, publish, commit, push, submit URLs, change booking configuration or contact external parties. Any implementation is a separate owner-approved task.

## Limitations

`guides:health` does not fetch external sources; its classification is a starting signal, not proof that a guide is incorrect. Its `CURRENT` pilot label can cover only recorded claims, not an entire guide. Missing verification dates or `PROVENANCE_WEAK` do not prove facts are stale, and title completeness does not verify translations. Existing reviewed-at data and live source checks must be interpreted separately. Reports are informational and require editorial judgment.

## Baseline

On 27 October 2026, the local report covered 90 guides: 69 `PROVENANCE_WEAK`, 16 `UNKNOWN` and five marked `CURRENT` by limited pilot evidence. These are metadata classifications, not counts of incorrect guides. The priority sort now places high-volatility guides first within each status. Start with a small, evidence-backed batch rather than treating the full queue as an editing backlog.
