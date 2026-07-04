# Weekly Digest

`/[locale]/events/this-week` is the foundation for a human-reviewed “This week near Menton” page. It belongs under Events because it is a rolling planning surface for current local events and ideas, not an evergreen guide article.

## Source Of Truth

Weekly digests live in `src/content/weekly-digests.ts`.

Each digest stores:
- locale and slug
- date range
- title and summary
- reviewed items with source URLs
- `lastChecked`
- `sourceStatus`: `draft`, `reviewed`, or `published`

Only `reviewed` and `published` digests are eligible for public display. Drafts remain hidden from the public page.

## Human Review Rule

AI may help draft weekly content, but it must not auto-publish. Before a digest is marked `reviewed` or `published`, a human should verify:

- event dates and times
- official source URLs
- ticket or reservation notes
- train, bus, walking, or driving notes from Menton
- whether the item is still useful for short-stay guests

Use `npm run weekly:draft` only as a safe reminder stub. It does not fetch the internet, write files, or publish content.

## Validation

Run:

```bash
npm run weekly:validate
```

The validator fails when public digests are missing date ranges, titles, summaries, item source URLs, or valid related guide/event references.

## Lifecycle

The public route is intended as a rolling weekly page. Old weekly digests should either be removed from public display, archived with `noindex`, or replaced by the current reviewed digest. Do not leave stale “this week” content live.
