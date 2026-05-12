# Azur Menton Launch Checklist

## Deployment

- [ ] Domain points to the production deployment.
- [ ] HTTPS works for `https://azurmenton.com`.
- [ ] `https://azurmenton.com/sitemap.xml` returns the production sitemap.
- [ ] `https://azurmenton.com/robots.txt` allows public crawling and references the sitemap.

## Pages

- [ ] `/en`, `/fr`, `/it`, `/uk` homepages work.
- [ ] All apartment listing and detail pages work.
- [ ] All guide and events pages work.
- [ ] FAQ, contact, legal, privacy, cookie policy and booking terms pages work.
- [ ] Footer links and language switcher links work.

## Booking

- [ ] Booking request form submits successfully in production.
- [ ] Privacy acknowledgement checkbox is required and not pre-checked.
- [ ] Host receives booking request notifications.
- [ ] No fake prices, ratings, reviews or availability are displayed.

## Legal And Content

- [ ] Legal placeholders are replaced with verified owner/business details.
- [ ] Payment, deposit, cancellation, tourist tax and mediation details are completed.
- [ ] Exact event dates are added only with source URLs.
- [ ] French, Italian and Ukrainian `TODO_TRANSLATE` guide/event content is finalized.

## SEO And Quality

- [ ] Canonicals and hreflang links are checked after deployment.
- [ ] Open Graph previews show valid apartment-specific images where relevant.
- [ ] Structured data is tested with Google's Rich Results Test or Schema Markup Validator.
- [ ] Mobile layout is tested on real devices.
- [ ] Apartment images and alt text are checked.
- [ ] Lighthouse basic pass is completed.
- [ ] Google Search Console domain verification is completed.
- [ ] Sitemap is submitted in Google Search Console.
- [ ] Indexing coverage, hreflang issues, mobile usability and Core Web Vitals are reviewed after launch.
- [ ] Analytics is added only if needed and only with cookie compliance.
