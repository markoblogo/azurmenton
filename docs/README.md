# Documentation Index

Current entrypoints are below. Dated audits, reports and reviews record observations on their stated date, not current operating instructions or fresh evidence. `archive/` holds superseded image notes. Preserve provenance, source documents and private local packets.

## Product And Engineering

- [Product context](product-context.md), [roadmap](ROADMAP.md): goals, claim boundaries and deferred work.
- [Development](../CONTRIBUTING.md), [release checklist](../LAUNCH_CHECKLIST.md), [deployment](../DEPLOYMENT.md), [security](../SECURITY.md).
- [Native dependencies](ci-native-dependencies.md), [CSP/cache checks](csp-cache-audit.md), [release audit](audits/2026-10-31-release-readiness.md).
- [Local TokenEconomizer](token-economizer.md): optional Codex tooling, repository scope and activation limits; not a website dependency.

## Guides, Places And Media

- [Content rules](content-operations.md): linking, images, maps and sources.
- [Manual guide packet](guide-manual-workflow.md): preferred guide/translation/later-image path.
- [Individual commands](guide-automation.md): diagnostic reference, not a competing workflow.
- [Content map](content-map.md), [migration history](content-migration-notes.md), [maintenance](guide-maintenance-review.md).
- [Source verification](guides-verification-loop.md), [guide health](guides-health-observatory.md), [uMap](umap-trial.md).

## Events And Editorial Work

- [Publication](events-publication-workflow.md), [calendar/time rules](EVENT_CALENDAR.md), [discovery and submissions](EVENT_DISCOVERY_AND_INTAKE.md).
- [Venue sources](events-small-venues-sources.md), [event health](events-health-observatory.md), [unified queue](editorial-queue.md).
- [Weekly digest](WEEKLY_DIGEST.md): preparation, not automatic distribution.

## Booking And Guest Features

- [Email setup](../RESEND_SETUP.md), [delivery/alerts](booking-email-operations.md).
- [Trip and favourites](TRIP_FEATURES.md), [day routes](day-routes.md), [portal features](PORTAL_FEATURES.md).
- [Guest guides/contextual stays](guest-experience-passes.md), [lead handling](LEAD_OPERATIONS.md), [partners](PARTNER_OUTREACH.md).

## Measurement And Experiments

- [Analytics](ANALYTICS.md), [SEO monitoring](SEO_MONITORING.md), [Search Console](search-console-validation.md).
- [Dated measured baseline](MEASURED_BASELINE_2026-09-13.md): historical, not today's traffic or bookings.
- [Guest-AI boundary](cortex-abv-guest-ai-boundary.md), [fallback reference](fallback-provider-pool.md), [Vercel skills trial](vercel-agent-skills-pilot.md): experiments/references, not enabled capabilities.

Run `npm run docs:check` for local Markdown links and documented npm script names. It does not validate external websites, every factual claim or dated metric. Generated `build/` evidence and public `reports/guide-assets-postpublish/` records have different privacy purposes; never copy private packets into public reports.
