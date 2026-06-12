# Search Console and Schema Validation

Use this checklist after production deploys that change metadata, schema, routes or indexing behavior.

## Automated Check

Run:

```bash
npm run seo:validate
```

Optional:

```bash
SEO_VALIDATE_BASE_URL=https://your-preview-url.vercel.app npm run seo:validate
```

The script fetches representative public pages and checks:

- HTTP success
- canonical URL
- localized `hreflang` alternates including `x-default`
- expected JSON-LD types for home, apartment listing, apartment detail, check availability and FAQ pages

## Manual Google Checks

1. Open Google Search Console for `azurmenton.com`.
2. Submit or resubmit `https://azurmenton.com/sitemap.xml`.
3. Use URL Inspection for:
   - `https://azurmenton.com/en`
   - `https://azurmenton.com/en/apartments`
   - `https://azurmenton.com/en/apartments/sea-view-balcony-studio`
   - `https://azurmenton.com/en/check-availability`
   - `https://azurmenton.com/en/faq`
4. Run Google's Rich Results Test for apartment detail and FAQ pages.
5. Review Page indexing, International targeting/hreflang signals where available, and Core Web Vitals after Google has recrawled.

Do not add `Event` schema unless exact official event date, location and source data is verified.
