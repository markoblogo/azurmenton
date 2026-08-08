# Guide freshness observatory

Run the deterministic report-only pass with:

```bash
npm run guides:health
npm run guides:health -- --today=2026-08-08
```

The command inventories the typed guide records and writes machine-readable output to `build/guides-health/guides-health.json`. It does not fetch sources, edit guides, rewrite translations, publish, or change public behavior.

The first model is intentionally guide-level. It separates:

- `contentDate` / `contentAgeDays`: the available publication-age signal, not proof of current facts;
- `volatility`: low, medium, or high practical-information risk by guide category;
- `evidenceDate`: currently absent from the guide model unless supplied by future metadata;
- `status`: `CURRENT`, `REVIEW_DUE`, `STALE`, `PROVENANCE_WEAK`, or `UNKNOWN`;
- localization completeness from the four required locales, while localization drift remains `UNKNOWN` because per-locale provenance is not modeled.

Current guide records do not support claim-level freshness. A single guide can contain stable narrative and volatile hours, prices, schedules, or seasonal advice. The report therefore flags guide-level attention and records claim-level freshness as a capability gap rather than pretending all claims share one age.
