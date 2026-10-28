/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("node:path");
const fs = require("node:fs");
require("./lib/register-ts-content.cjs").registerTypescriptContent();
const { guideArticles } = require("../src/content/guide.ts");
const { places } = require("../src/content/places.ts");
const { rivieraEvents, getEventTitle, getEventDetail } = require("../src/content/riviera-events.ts");
const { getUpcomingEvents } = require("../src/lib/events.ts");
const { selectPlaceGuide, placeAnchorId } = require("../src/lib/search-place-targets.ts");

const localized = (value, locale) => typeof value === "string" ? value : value?.[locale] || "";

async function main() {
  const { createIndex } = await import("pagefind");
  const { index } = await createIndex();
  const known = new Set(places.map((place) => place.id));
  const targets = places.map((place) => ({ place, guide: selectPlaceGuide(place, guideArticles, known) })).filter((target) => target.guide);
  const events = getUpcomingEvents(rivieraEvents).filter((event) => getEventDetail(event.slug) && (event.endDate || event.startDate));
  const urls = new Set();
  const add = async (url, language, title, content, type, endDate = "") => {
    if (urls.has(url)) throw new Error(`Duplicate search URL: ${url}`);
    urls.add(url);
    const result = await index.addCustomRecord({ url, language, content, meta: { title, type, endDate }, filters: { type: [type] } });
    if (result.errors?.length) throw new Error(JSON.stringify(result.errors));
  };
  for (const locale of ["en", "fr", "it", "uk"]) {
    for (const guide of guideArticles) {
      const text = [localized(guide.title, locale), localized(guide.excerpt, locale), ...guide.sections.flatMap((section) => [localized(section.heading, locale), ...section.body.map((item) => localized(item, locale)), ...(section.bullets || []).map((item) => localized(item, locale))])].join(" ");
      await add(`/${locale}/guide/${guide.slug}`, locale, localized(guide.title, locale), text, "guide");
    }
    for (const { place, guide } of targets) {
      const text = [place.name, localized(place.shortNote, locale), localized(place.area, locale), place.address, ...place.bestFor.map((item) => localized(item, locale))].filter(Boolean).join(" ");
      await add(`/${locale}/guide/${guide.slug}#${placeAnchorId(place.id)}`, locale, place.name, text, "place");
    }
    for (const event of events) {
      const title = getEventTitle(event, locale);
      await add(`/${locale}/events/${event.slug}`, locale, title, [title, localized(event.shortDescription, locale), event.city].filter(Boolean).join(" "), "event", event.endDate || event.startDate);
    }
  }
  const output = await index.getFiles();
  if (output.errors?.length) throw new Error(JSON.stringify(output.errors));
  const outputPath = path.join(process.cwd(), "public/pagefind");
  for (const file of output.files) {
    const destination = path.join(outputPath, file.path);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, file.content);
  }
  console.log(`Search index: ${guideArticles.length} guides, ${targets.length} places, ${events.length} events per language; ${places.length - targets.length} places without a rendered card excluded.`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
