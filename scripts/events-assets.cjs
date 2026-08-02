#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const publicEventsDir = path.join(root, "public", "images", "events");
const publishedEventsPath = path.join(root, "src", "content", "events", "published", "events.json");
const imageOverridesPath = path.join(root, "src", "content", "events", "overrides", "image-overrides.json");

function readArg(name, args = process.argv.slice(2)) {
  const index = args.indexOf(name);
  if (index === -1) return undefined;
  return args[index + 1];
}

function normalizeText(value) {
  return String(value)
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/['’`]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokens(value) {
  return normalizeText(value).split(/\s+/).filter((token) => token.length > 1);
}

function scoreAssetForEvent(assetName, event) {
  const assetBase = path.basename(assetName, path.extname(assetName));
  const assetNormalized = normalizeText(assetBase);
  const eventNormalized = normalizeText(`${event.title} ${event.slug}`);
  if (!assetNormalized) return 0;
  if (eventNormalized.includes(assetNormalized) || assetNormalized.includes(normalizeText(event.title))) return 1;
  const assetTokens = tokens(assetBase);
  const eventTokens = new Set(tokens(`${event.title} ${event.slug}`));
  if (!assetTokens.length) return 0;
  const matched = assetTokens.filter((token) => eventTokens.has(token)).length;
  return matched / assetTokens.length;
}

function eventMediaFor(event, publicPath) {
  const imageAlt = event.titleLocalized ?? {
    en: event.title,
    fr: event.title,
    it: event.title,
    uk: event.title,
  };
  const fallbackAlt = {
    en: `${event.title} event near Menton`,
    fr: `${event.title} pres de Menton`,
    it: `${event.title} vicino a Mentone`,
    uk: `${event.title} біля Ментона`,
  };
  for (const locale of ["en", "fr", "it", "uk"]) {
    if (!imageAlt[locale] || imageAlt[locale].trim().length < 8) imageAlt[locale] = fallbackAlt[locale];
  }

  return {
    image: publicPath,
    imageAlt,
    imageCaption: {
      en: "Azur Menton event illustration.",
      fr: "Illustration d'evenement Azur Menton.",
      it: "Illustrazione evento Azur Menton.",
      uk: "Ілюстрація події Azur Menton.",
    },
    mediaType: "project_illustration",
    mediaStatus: "available",
    mediaSourceName: "Azur Menton",
    mediaRightsNote: "Owner-approved Azur Menton event illustration.",
  };
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

async function listAssetFiles(assetsDir) {
  const entries = await fs.readdir(assetsDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .filter((name) => /\.(png|jpe?g|webp|avif)$/i.test(name))
    .sort();
}

async function main(args = process.argv.slice(2)) {
  const assetsDir = readArg("--assets-dir", args);
  const apply = args.includes("--apply");
  const reportOnly = args.includes("--report-only") || !apply;
  const missingOnly = args.includes("--missing-only") || args.includes("--published-events");
  const failOnUnmatched = args.includes("--fail-on-unmatched");

  if (!assetsDir) {
    console.log("Usage: npm run events:assets -- --published-events --assets-dir /abs/dir [--apply] [--missing-only] [--fail-on-unmatched]");
    process.exitCode = 1;
    return;
  }

  const resolvedAssetsDir = path.resolve(assetsDir);
  const events = JSON.parse(await fs.readFile(publishedEventsPath, "utf8"));
  const imageOverrides = await readJson(imageOverridesPath, []);
  const targetEvents = events.filter((event) => !missingOnly || !event.media?.image);
  const assetFiles = await listAssetFiles(resolvedAssetsDir);
  const unmatchedAssetFiles = [];
  const alreadyCoveredAssetFiles = [];
  const matched = [];
  const usedEventSlugs = new Set();

  for (const assetFile of assetFiles) {
    const ranked = targetEvents
      .filter((event) => !usedEventSlugs.has(event.slug))
      .map((event) => ({ event, score: scoreAssetForEvent(assetFile, event) }))
      .sort((left, right) => right.score - left.score);
    const best = ranked[0];
    if (!best || best.score < 0.55) {
      const covered = events.find((event) => event.media?.image && scoreAssetForEvent(assetFile, event) >= 0.55);
      if (covered) alreadyCoveredAssetFiles.push(assetFile);
      else unmatchedAssetFiles.push(assetFile);
      continue;
    }
    usedEventSlugs.add(best.event.slug);
    const destinationFile = `${best.event.slug}.webp`;
    matched.push({
      assetFile,
      eventSlug: best.event.slug,
      eventTitle: best.event.title,
      score: Number(best.score.toFixed(2)),
      sourcePath: path.join(resolvedAssetsDir, assetFile),
      destinationPath: path.join(publicEventsDir, destinationFile),
      publicPath: `/images/events/${destinationFile}`,
    });
  }

  const publishedEventsStillWithoutImage = targetEvents
    .filter((event) => !usedEventSlugs.has(event.slug))
    .map((event) => ({ slug: event.slug, title: event.title }));
  const report = {
    mode: "published-events",
    apply,
    reportOnly,
    missingOnly,
    counts: {
      matched: matched.length,
      unmatched: unmatchedAssetFiles.length,
      alreadyCovered: alreadyCoveredAssetFiles.length,
      stillMissing: publishedEventsStillWithoutImage.length,
    },
    matched,
    unmatchedAssetFiles,
    alreadyCoveredAssetFiles,
    publishedEventsStillWithoutImage,
    persistentDecisionPath: "src/content/events/overrides/image-overrides.json",
  };

  const reportDir = path.join(root, "build", "events-assets-postpublish");
  await fs.mkdir(reportDir, { recursive: true });
  await fs.writeFile(path.join(reportDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);

  if (failOnUnmatched && unmatchedAssetFiles.length) {
    console.log(`events:assets blocked: ${unmatchedAssetFiles.length} unmatched asset file(s).`);
    process.exitCode = 1;
    return;
  }

  if (!reportOnly) {
    await fs.mkdir(publicEventsDir, { recursive: true });
    for (const item of matched) {
      await sharp(item.sourcePath)
        .rotate()
        .resize({ width: 1200, height: 720, fit: "cover", position: "center" })
        .webp({ quality: 82 })
        .toFile(item.destinationPath);
      const event = events.find((candidate) => candidate.slug === item.eventSlug);
      event.media = eventMediaFor(event, item.publicPath);
      const override = {
        eventSlug: event.slug,
        sourceUrl: event.sourceUrl,
        localPath: item.publicPath,
        kind: "azur-editorial",
        rightsStatus: "manual-approved",
        alt: event.media.imageAlt?.en ?? `${event.title} event image`,
        sourceName: "Azur Menton",
        credit: "Azur Menton",
        rightsNote: "Owner-approved Azur Menton event illustration.",
        approvedAt: new Date().toISOString(),
        locked: true,
      };
      const overrideIndex = imageOverrides.findIndex((candidate) => candidate.eventSlug === event.slug);
      if (overrideIndex === -1) imageOverrides.push(override);
      else imageOverrides[overrideIndex] = { ...imageOverrides[overrideIndex], ...override };
    }
    await fs.writeFile(publishedEventsPath, `${JSON.stringify(events, null, 2)}\n`);
    await fs.mkdir(path.dirname(imageOverridesPath), { recursive: true });
    await fs.writeFile(imageOverridesPath, `${JSON.stringify(imageOverrides, null, 2)}\n`);
  }

  console.log(`events:assets ${apply ? "applied" : "report-only"}`);
  console.log(`matched=${matched.length} unmatched=${unmatchedAssetFiles.length} alreadyCovered=${alreadyCoveredAssetFiles.length} stillMissing=${publishedEventsStillWithoutImage.length}`);
  for (const item of matched) console.log(`- ${item.assetFile} -> ${item.eventSlug}`);
  if (unmatchedAssetFiles.length) console.log(`unmatched: ${unmatchedAssetFiles.join(", ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
