# Content Map and Guide Collections

`src/content/content-map.ts` is the compact planning layer for the growing Guide. It is not a CMS or a second article catalogue.

## Guide collections

Collections are visible on `/[locale]/guide` and route visitors into the existing Guide Finder. They group current articles by stable guest interest, while `includeGuideSlugs` keeps genuinely useful cross-category guides in the right collection.

When adding a guide, prefer its existing `GuideCategory`. Update a collection only when the connection is editorially useful. Keep the main navigation unchanged.

## Intent map

`contentIntentMap` records the highest-value guest/search questions as `covered` or `planned`, with a simple priority. A covered item must point to an existing guide. Keep it deliberately short: it is a decision aid for the next content pass, not a keyword dump.

## Curated trip plans

`src/content/planning/stay-plans.ts` holds six compact, human-curated stay scenarios. Each plan must connect to a primary guide, useful places, a cautious transport note and relevant apartments. The Guide uses the plans as an entry point; `/[locale]/stay` remains the fuller catalogue. Do not add an AI itinerary generator or a separate route for every plan.

## Validation

`npm run content:audit` verifies collection IDs, guide references and covered intent targets. Run it with the normal content preflight when changing articles or collections.
