#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { places } = require("../src/content/places.ts");
const { placeMapExclusions } = require("../src/content/planning/place-map-exclusions.ts");
const { placeMapPoints } = require("../src/content/planning/place-map-points.ts");
const { mapPlaceTypes } = require("../src/content/planning/map-taxonomy.ts");

const eligible = places.filter((place) => mapPlaceTypes.has(place.type));
const pointIds = new Set(placeMapPoints.map((point) => point.placeId));
const exclusionIds = new Set(placeMapExclusions.map((exclusion) => exclusion.placeId));
const reviewedPointIds = new Set(placeMapPoints.filter((point) => point.review).map((point) => point.placeId));
const required = eligible.filter((place) => place.requiresMapReview);
const unresolvedRequired = required.filter((place) => !pointIds.has(place.id) && !exclusionIds.has(place.id));
const unmapped = eligible.filter((place) => !pointIds.has(place.id) && !exclusionIds.has(place.id));

console.log("Map coverage report");
console.log(`Eligible places: ${eligible.length}`);
console.log(`Mapped: ${pointIds.size}`);
console.log(`Explicit exclusions: ${exclusionIds.size}`);
console.log(`Reviewed map points: ${reviewedPointIds.size}`);
console.log(`Map-review required: ${required.length}`);
console.log(`Required coverage gaps: ${unresolvedRequired.length}`);
console.log(`Historic unmapped backlog: ${unmapped.length}`);

if (unresolvedRequired.length) {
  console.log("\nRequired coverage gaps:");
  for (const place of unresolvedRequired) console.log(`- ${place.id} (${place.name})`);
}

if (placeMapExclusions.length) {
  console.log("\nExplicit exclusions:");
  for (const exclusion of placeMapExclusions) console.log(`- ${exclusion.placeId}: ${exclusion.reason} (${exclusion.checkedOn})`);
}
