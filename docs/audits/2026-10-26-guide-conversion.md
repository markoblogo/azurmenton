# Guide-to-apartment paths - 26 October 2026

## Selection evidence

GSC Wizard, domain property `sc-domain:azurmenton.com`, web search, last 28 settled days through 24 October 2026 (Google reporting date basis America/Los_Angeles). The four selected English URLs had:

| Guide | Google clicks | Impressions |
| --- | ---: | ---: |
| Souvenir shops | 24 | 532 |
| Cheap eats | 20 | 415 |
| Ice cream | 19 | 701 |
| Seafood | 18 | 405 |

The owner-authenticated Plausible dashboard inspected earlier on 26 October showed these same pages among its top pages under `Last 28 days`: 29, 26, 19 and 28 unique visitors respectively. This earlier dashboard snapshot was not refreshed in this pass; its precise window and timezone were not independently confirmed. Plausible visitors and Google Search clicks have different definitions and potentially different date boundaries: do not add them or use them as a conversion funnel. Counts are small and do not establish intent to book or page-level conversion performance.

## Change and measurement

Each selected article now has one compact, localized contextual link group after its first section, leading to two relevant existing apartments. Apartment links preserve `sourcePageType`, `sourceSlug`, `sourceGuideSlug` and `sourceApartmentSlug` through the existing attribution helper. Their existing `guide_cta_click` event includes `ctaPlacement: guide_inline`; these are clicks, not booking requests or confirmations. The existing page content, final booking CTA and unrelated guides remain unchanged.

For a future review, compare like-for-like date ranges and page/locale definitions, inspect aggregate `guide_cta_click` events and their placement where Plausible exposes the property, and separately inspect actual `booking_request_submit_success` events and delivery. Do not interpret small counts, test submissions or a click on an apartment as confirmed bookings. There is no randomized control, so a before/after change cannot prove causation.
