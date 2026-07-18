# SEO Monitoring

## Purpose

This is a small human-reviewed monitoring loop for the site's most valuable canonical pages. It does not submit URLs, change indexing, or make decisions from Search Console automatically.

The current set lives in `src/content/seo-monitoring.ts`. Keep it between five and ten URLs so a review remains useful and comparable.

## Before A Review

After a production deployment, inspect only the listed canonical URLs in Google Search Console. Request indexing only for a genuinely changed URL when it is useful; do not bulk-submit guides, events, archives or service pages.

`npm run seo:priorities` validates that every target still resolves to its canonical route. It is part of `npm run preflight` and CI.

## Four-Week Review

Use the baseline date printed by `npm run seo:priorities`, then review after 21-35 days. For each target, record:

- indexed status and any canonical conflict;
- impressions;
- clicks and CTR;
- average position;
- material title, description, internal-link or event-status changes since the baseline.

Compare trends, not a single day. Search Console data can lag after publication and indexing changes.

## Rules For New Content

- Every published guide, stay page and event must keep localized SEO title and description, canonical routing and hreflang coverage. Content lint and live SEO validation already enforce these contracts.
- For an annual event, use the canonical occurrence route, not a duplicate series URL. Pending dates must remain honest and must not receive invented Event schema.
- Add a new target only when it has direct booking relevance or proven search demand; remove a target only at a deliberate review point.
- Do not add every new page to this set. The intent is a stable comparison cohort, not a sitemap replacement.
- Keep useful past events archived unless they are misleading; avoid mass `noindex` as a substitute for content quality.

## Related Checks

```bash
npm run seo:priorities
npm run content:lint
npm run content:audit
npm run content:report
npm run seo:validate
```
