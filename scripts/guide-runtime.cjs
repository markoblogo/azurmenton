#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
require("./lib/register-ts-content.cjs").registerTypescriptContent(root);
const { guideArticles } = require("../src/content/guide.ts");
const { places } = require("../src/content/places.ts");
const { contentCollections } = require("../src/content/content-map.ts");
const { mergeGuideSnapshot, replacePlacePrimaryImage, setPublicationPlace } = require("../src/lib/guide-runtime-model.ts");
const store = require("../src/lib/guide-blob-store.ts");

async function main() {
  const args = process.argv.slice(2);
  const command = args.shift();
  const options = {};
  while (args.length) {
    const key = args.shift();
    if (!key.startsWith("--")) throw Error("Expected named option");
    options[key.slice(2)] = args[0] && !args[0].startsWith("--") ? args.shift() : true;
  }
  if (options.env) process.loadEnvFile(options.env);
  const start = Date.now();
  function packagePublication(graph) {
    const packages = JSON.parse(require("./guide-package.cjs").compile(path.resolve(options.packages), { runtime: true, graph }));
    const pkg = packages.find(p => p.article.slug === options.slug);
    if (!pkg) throw Error("Package slug not found");
    return { article: require("../src/content/guide-packages.ts").buildPackagedGuide(pkg), places: [], collections: pkg.collections, sources: fs.readFileSync(path.join(options.packages, options.slug, "sources.md"), "utf8") };
  }
  if (command === "check") {
    const publication = packagePublication();
    mergeGuideSnapshot(guideArticles, places, contentCollections, { version: 1, publications: [publication] });
    console.log(JSON.stringify({ status: "checked-local-only", slug: publication.article.slug, sections: publication.article.sections.length, durationMs: Date.now() - start })); return;
  }
  const current = await store.readGuideHead();
  if (command === "status") { console.log(JSON.stringify(current?.head ?? { revision: 0 })); return; }
  let snapshot = current ? await store.readGuideSnapshot(current.head.hash) : { version: 1, publications: [] };
  if (command === "export") {
    const article = guideArticles.find(a => a.slug === options.slug);
    if (!article || !options.out || !options.sources) throw Error("export requires --slug --out --sources");
    fs.writeFileSync(options.out, JSON.stringify({ article, places: [], collections: [], sources: fs.readFileSync(options.sources, "utf8") }, null, 2) + "\n", { flag: "wx" });
    return;
  }
  if (command === "stage") {
    let publication;
    if (options.packages) {
      publication = packagePublication(mergeGuideSnapshot(guideArticles, places, contentCollections, snapshot));
    } else publication = JSON.parse(fs.readFileSync(options.packet, "utf8"));
    const previous = snapshot.publications.find(p => p.article.slug === publication.article.slug);
    publication.places = [...(previous?.places ?? []).filter(p => !publication.places.some(next => next.id === p.id)), ...publication.places];
    snapshot.publications = snapshot.publications.filter(p => p.article.slug !== publication.article.slug);
    snapshot.publications.push(publication);
    for (const place of [...publication.places]) setPublicationPlace(snapshot, publication.article.slug, place);
    mergeGuideSnapshot(guideArticles, places, contentCollections, snapshot);
    if (publication.article.coverImage?.startsWith("/images/")) {
      const bytes = await require("sharp")(path.join(root, "public", publication.article.coverImage)).webp({ quality: 85 }).toBuffer();
      publication.article.coverImage = await store.storeGuideImage(bytes);
    }
  } else if (command === "image") {
    const publication = snapshot.publications.find(p => p.article.slug === options.slug);
    if (!publication || !options.file) throw Error("image requires an existing runtime guide and --file");
    let target = publication.article;
    if (options.place) {
      const existing = mergeGuideSnapshot(guideArticles, places, contentCollections, snapshot).places.find(p => p.id === options.place);
      const linked = new Set([...(publication.article.relatedPlaces ?? []), ...publication.article.sections.flatMap(s => s.relatedPlaceIds ?? [])]);
      if (!existing || !linked.has(options.place)) throw Error("Place not linked to guide");
      target = structuredClone(existing);
    }
    if (!target) throw Error("Place not in publication");
    const field = options.place ? "image" : "coverImage";
    const visibleImage = options.place && target.images?.length > 1 ? target.images[0] : target[field];
    if (visibleImage !== (options["expected-image"] === "none" ? undefined : options["expected-image"])) throw Error("Image changed: supply exact --expected-image");
    const bytes = await require("sharp")(options.file, { limitInputPixels: 8192 * 8192 }).resize({ width: 1680, withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
    if (bytes.length > 4_000_000) throw Error("Image too large");
    target[field] = await store.storeGuideImage(bytes);
    if (options.place) setPublicationPlace(snapshot, options.slug, replacePlacePrimaryImage(target, target[field]));
  } else if (command === "activate" || command === "rollback") {
    if (!options.approve || !options.hash || !options["request-id"] || options["expected-revision"] === undefined) throw Error("Activation requires --approve --hash --expected-revision --request-id");
    snapshot = await store.readGuideSnapshot(options.hash);
    mergeGuideSnapshot(guideArticles, places, contentCollections, snapshot);
    const head = await store.activateGuideSnapshot(options.hash, Number(options["expected-revision"]), options["request-id"]);
    console.log(JSON.stringify({ ...head, durationMs: Date.now() - start })); return;
  } else throw Error("Commands: status, export, stage, image, activate, rollback");
  mergeGuideSnapshot(guideArticles, places, contentCollections, snapshot);
  const hash = await store.writeGuideSnapshot(snapshot);
  console.log(JSON.stringify({ status: "staged-not-public", hash, expectedRevision: current?.head.revision ?? 0, durationMs: Date.now() - start }));
}
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
