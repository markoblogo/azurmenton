# Contributing

Azur Menton is a production booking and local-guide site. Small, sourced changes are easier to review than broad rewrites.

1. Open an issue for a material product or content change.
2. Create a focused branch and preserve EN/FR/IT/UK behavior.
3. Run `npm ci`, then the narrow regression checks appropriate to the change. Run `npm run docs:check` for documentation changes.
4. Before a release, run `npm run release:check` (or `-- --webpack` locally). It retains check receipts and starts a fresh production test server on port 3100. CI and public deployment verification remain separate.
5. Explain the public behavior and evidence in the pull request.

Do not invent availability, prices, ratings, event dates, opening hours, official affiliations, or transport guarantees. Follow [docs/content-operations.md](docs/content-operations.md) for guide and event changes. Never include real booking data, iCal URLs, API keys, or private operational reports in a contribution.

The application code and tooling are MIT-licensed. Apartment facts, editorial content, photographs, illustrations, guest data, and Azur Menton branding are excluded from that grant unless a file says otherwise; see [NOTICE.md](NOTICE.md).
