# Event health observatory

Run the deterministic, report-only event health pass with:

```bash
npm run events:health
npm run events:health -- --today=2026-08-08
```

The command reads published event records, the configured source registry, and committed event batch `sourceRuns`. It does not fetch external sources, publish, delete, or edit event content. The machine-readable artifact is written to `build/events-health/events-health.json`.

Health states are deliberately conservative:

- `CURRENT`: confirmed event with recent evidence;
- `STALE`: confirmed event evidence exceeds its source-aware threshold;
- `EXPIRED`: event end date has passed;
- `SOURCE_STALE`: the last successful source observation exceeds its configured threshold;
- `NEEDS_REVIEW`: dates or provenance are not fully confirmed;
- `UNKNOWN`: the repository has insufficient evidence to classify the event/source.

An unobserved source with zero future events is reported as `UNKNOWN` and `NO_EVIDENCE_OF_FAILURE`; it is never treated as proof that no events exist. Cancellation detection is not implemented because the current source adapters do not provide a reliable cancellation signal.
