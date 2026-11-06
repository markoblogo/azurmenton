#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
require("./lib/register-ts-content.cjs").registerTypescriptContent(root);
const { compileGuideMarkdown } = require("../src/lib/guide-markdown.ts");
const locales = ["en", "fr", "it", "uk"];
const directory = path.join(root, "src/content/guide-packages");
const output = path.join(root, "src/content/guide-packages.generated.json");
const fail = message => { throw new Error(message); };
const text = (value, label) => {
  if (!value || typeof value !== "object" || locales.some(l => typeof value[l] !== "string" || !value[l].trim())) fail(`${label}: four translations required`);
};
function compile(packageDirectory = directory) {
  const packages = [];
  for (const entry of fs.readdirSync(packageDirectory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.isDirectory() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.name)) fail(`Invalid package: ${entry.name}`);
    const dir = path.join(packageDirectory, entry.name);
    const allowed = new Set(["metadata.json", "sources.md", ...locales.map(l => `${l}.md`)]);
    for (const file of fs.readdirSync(dir)) if (!allowed.has(file)) fail(`${entry.name}: unexpected file ${file}`);
    const meta = JSON.parse(fs.readFileSync(path.join(dir, "metadata.json"), "utf8"));
    const a = meta.article;
    if (meta.version !== 1 || !a || a.id !== entry.name || a.slug !== entry.name || a.sections) fail(`${entry.name}: invalid metadata`);
    const metaKeys = new Set(["version", "article", "introHeading", "sectionOverrides", "collections", "assets", "sources"]);
    const articleKeys = new Set(["id", "slug", "title", "seoTitle", "seoDescription", "excerpt", "category", "tags", "bestFor", "duration", "publishedOn", "sourceStatus", "coverImage", "coverImageAlt", "visualTheme", "visualStatus", "locationTags", "relatedPlaces", "relatedArticles", "relatedApartments", "practicalTips", "featured"]);
    if (Object.keys(meta).some(k => !metaKeys.has(k)) || Object.keys(a).some(k => !articleKeys.has(k))) fail(`${entry.name}: unsupported metadata field`);
    for (const key of ["tags", "bestFor", "locationTags", "relatedPlaces", "relatedArticles", "relatedApartments", "practicalTips"]) if (!Array.isArray(a[key])) fail(`${entry.name}.${key}: array required`);
    for (const key of ["tags", "bestFor", "practicalTips"]) a[key].forEach((value, index) => text(value, `${entry.name}.${key}[${index}]`));
    for (const key of ["locationTags", "relatedPlaces", "relatedArticles", "relatedApartments"]) if (a[key].some(value => typeof value !== "string" || !value.trim())) fail(`${entry.name}.${key}: invalid value`);
    if (!["food-markets", "beaches", "walks-views", "with-children", "nightlife-drinks", "photo-spots", "itineraries", "day-trips", "events", "practical"].includes(a.category) || !["editorial", "needs_verification", "verified"].includes(a.sourceStatus)) fail(`${entry.name}: invalid category or sourceStatus`);
    if (a.duration && !["45 to 90 minutes", "1 hour", "1-2 hours", "half-day", "full-day", "2-3 days", "evening", "flexible", "reference"].includes(a.duration)) fail(`${entry.name}: invalid duration`);
    if (a.publishedOn && !/^\d{4}-\d{2}-\d{2}$/.test(a.publishedOn)) fail(`${entry.name}: invalid publication date`);
    text(a.coverImageAlt, `${entry.name}.coverImageAlt`);
    for (const key of ["title", "seoTitle", "seoDescription", "excerpt"]) text(a[key], `${entry.name}.${key}`);
    text(meta.introHeading, `${entry.name}.introHeading`);
    if (meta.sources !== "sources.md" || !fs.readFileSync(path.join(dir, meta.sources), "utf8").trim()) fail(`${entry.name}: missing sources`);
    if (!Array.isArray(meta.assets) || !meta.assets.includes(a.coverImage)) fail(`${entry.name}: cover missing from assets`);
    for (const asset of meta.assets) {
      if (typeof asset !== "string" || !/^\/images\/[a-zA-Z0-9/_-]+\.(png|jpg|jpeg|webp|avif)$/.test(asset) || !fs.existsSync(path.join(root, "public", asset))) fail(`${entry.name}: missing or invalid asset ${asset}`);
    }
    const records = compileGuideMarkdown(Object.fromEntries(locales.map(l => [l, fs.readFileSync(path.join(dir, `${l}.md`), "utf8")])));
    if (!Array.isArray(meta.sectionOverrides) || meta.sectionOverrides.length !== records.length || !Array.isArray(meta.collections)) fail(`${entry.name}: invalid sections or collections`);
    const allowedOverrides = new Set(["relatedPlaceIds", "guideLinkSlug", "guideLinkLabel"]);
    for (const item of meta.sectionOverrides) {
      if (!item || typeof item !== "object" || Object.keys(item).some(k => !allowedOverrides.has(k))) fail(`${entry.name}: unsupported section override`);
      if (item.guideLinkLabel) text(item.guideLinkLabel, `${entry.name}.guideLinkLabel`);
      if (Boolean(item.guideLinkSlug) !== Boolean(item.guideLinkLabel)) fail(`${entry.name}: incomplete guide link`);
      if (item.relatedPlaceIds && (!Array.isArray(item.relatedPlaceIds) || item.relatedPlaceIds.some(id => !a.relatedPlaces?.includes(id)))) fail(`${entry.name}: section place absent from guide`);
    }
    packages.push({ ...meta, records });
  }
  const { guideArticles } = require("../src/content/guide.ts");
  const { places } = require("../src/content/places.ts");
  const { contentCollections } = require("../src/content/content-map.ts");
  const { apartments } = require("../src/content/apartments.ts");
  const packageSlugs = new Set(packages.map(pkg => pkg.article.slug));
  const previous = fs.existsSync(output) ? JSON.parse(fs.readFileSync(output, "utf8")) : [];
  const previousSlugs = new Set(previous.map(pkg => pkg.article.slug));
  const guides = new Set([...guideArticles.filter(guide => !previousSlugs.has(guide.slug)).map(guide => guide.slug), ...packageSlugs]);
  const placeIds = new Set(places.map(place => place.id));
  const collectionIds = new Set(contentCollections.map(collection => collection.id));
  for (const pkg of packages) {
    const article = pkg.article;
    for (const id of article.relatedPlaces ?? []) if (!placeIds.has(id)) fail(`${article.slug}: unknown place ${id}`);
    for (const id of article.relatedApartments ?? []) if (!apartments.some(apartment => apartment.slug === id)) fail(`${article.slug}: unknown apartment ${id}`);
    for (const slug of article.relatedArticles ?? []) if (!guides.has(slug) || slug === article.slug) fail(`${article.slug}: invalid related guide ${slug}`);
    for (const section of pkg.sectionOverrides) if (section.guideLinkSlug && !guides.has(section.guideLinkSlug)) fail(`${article.slug}: unknown section guide ${section.guideLinkSlug}`);
    for (const id of pkg.collections) if (!collectionIds.has(id)) fail(`${article.slug}: unknown collection ${id}`);
    const matching = guideArticles.filter(guide => guide.slug === article.slug).length;
    if (matching > 1 || (matching && !previousSlugs.has(article.slug))) fail(`${article.slug}: duplicate guide`);
  }
  return JSON.stringify(packages, null, 2) + "\n";
}
if (require.main === module) {
  try {
    const result = compile();
    if (process.argv.includes("--check")) {
      if (!fs.existsSync(output) || fs.readFileSync(output, "utf8") !== result) fail("Generated packages are stale; run npm run guide:package");
      console.log("Guide packages up to date");
    } else { fs.writeFileSync(output, result); console.log("Guide packages compiled; no publication performed"); }
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = { compile };
