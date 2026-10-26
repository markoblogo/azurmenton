#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
const publicEventsDir = path.join(root, "public", "images", "events");
const publishedEventsPath = path.join(root, "src", "content", "events", "published", "events.json");
const imageOverridesPath = path.join(root, "src", "content", "events", "overrides", "image-overrides.json");
const legacyImagesPath = path.join(root, "src", "content", "events", "overrides", "legacy-event-images.json");

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
  const eventNormalized = normalizeText(`${event.title} ${event.slug} ${event.id} ${event.occurrenceSlug || ""}`);
  if (!assetNormalized) return 0;
  const assetYears = assetNormalized.match(/\b20\d{2}\b/g) || [];
  const eventYears = eventNormalized.match(/\b20\d{2}\b/g) || (event.startDate ? [event.startDate.slice(0, 4)] : []);
  if (assetYears.length && (!eventYears.length || !assetYears.some((year) => eventYears.includes(year)))) return 0;
  if ([event.id, event.occurrenceSlug].some((value) => value && normalizeText(value) === assetNormalized) ||
      (assetYears.length > 0 && event.slug && normalizeText(event.slug) === assetNormalized)) return 2;
  if (eventNormalized.includes(assetNormalized) || assetNormalized.includes(normalizeText(event.title))) return 1;
  const assetTokens = tokens(assetBase);
  const eventTokens = new Set(tokens(`${event.title} ${event.slug} ${event.id} ${event.occurrenceSlug || ""}`));
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

async function main(args = process.argv.slice(2), options = {}) {
  const paths = {
    publicEventsDir: options.publicEventsDir || publicEventsDir,
    publishedEventsPath: options.publishedEventsPath || publishedEventsPath,
    imageOverridesPath: options.imageOverridesPath || imageOverridesPath,
    legacyImagesPath: options.legacyImagesPath || legacyImagesPath,
    reportDir: options.reportDir || path.join(root, "build", "events-assets-postpublish"),
  };
  const assetsDir = readArg("--assets-dir", args);
  const apply = args.includes("--apply");
  const reportOnly = args.includes("--report-only") || !apply;
  const missingOnly = args.includes("--missing-only") || args.includes("--published-events");
  const failOnUnmatched = args.includes("--fail-on-unmatched");
  const selectedEventId = readArg("--event-id", args);
  const replaceInherited = args.includes("--replace-inherited");

  if (!assetsDir) {
    console.log("Usage: npm run events:assets -- --published-events --assets-dir /abs/dir [--event-id ID] [--apply] [--missing-only] [--fail-on-unmatched]");
    process.exitCode = 1;
    return;
  }

  const resolvedAssetsDir = path.resolve(assetsDir);
  const events = JSON.parse(await fs.readFile(paths.publishedEventsPath, "utf8"));
  let rivieraEvents = options.rivieraEvents;
  if (!rivieraEvents) {
    registerTypescriptContent(root);
    rivieraEvents = require("../src/content/riviera-events.ts").rivieraEvents;
  }
  const publishedIds = new Set(events.map((event) => event.id));
  const allEvents = rivieraEvents;
  const legacyImages = JSON.parse(await fs.readFile(paths.legacyImagesPath, "utf8"));
  const imageOverrides = await readJson(paths.imageOverridesPath, []);
  const assetFiles = await listAssetFiles(resolvedAssetsDir);
  if (selectedEventId && (assetFiles.length !== 1 || allEvents.filter((event) => event.id === selectedEventId).length !== 1)) {
    throw new Error("--event-id requires exactly one image and one matching event id");
  }
  if (replaceInherited && !selectedEventId) throw new Error("--replace-inherited requires --event-id");
  const hasCoveredImage = (event) => Boolean(event.media?.image && !(replaceInherited && event.media.inheritedFromEventId));
  const targetEvents = allEvents.filter((event) => (!selectedEventId || event.id === selectedEventId) && (!missingOnly || !hasCoveredImage(event)));
  const unmatchedAssetFiles = [];
  const alreadyCoveredAssetFiles = [];
  const matched = [];
  const usedEventIds = new Set();

  for (const assetFile of assetFiles) {
    const ranked = allEvents
      .filter((event) => (!selectedEventId || event.id === selectedEventId) && !usedEventIds.has(event.id))
      .map((event) => ({ event, score: selectedEventId ? 2 : scoreAssetForEvent(assetFile, event) }))
      .sort((left, right) => right.score - left.score);
    const best = ranked[0];
    if (!best || best.score < 0.55 || (ranked[1] && ranked[1].score === best.score)) {
      unmatchedAssetFiles.push(assetFile);
      continue;
    }
    if (missingOnly && hasCoveredImage(best.event)) {
      alreadyCoveredAssetFiles.push(assetFile);
      continue;
    }
    usedEventIds.add(best.event.id);
    if (!/^[a-z0-9-]+$/.test(best.event.id)) throw new Error(`Unsafe event id: ${best.event.id}`);
    const destinationKey = publishedIds.has(best.event.id) ? best.event.slug : best.event.id;
    if (!/^[a-z0-9-]+$/.test(destinationKey)) throw new Error(`Unsafe event image name: ${destinationKey}`);
    const destinationFile = `${destinationKey}.webp`;
    matched.push({
      assetFile,
      eventSlug: best.event.slug,
      eventId: best.event.id,
      catalog: publishedIds.has(best.event.id) ? "published" : "legacy",
      eventTitle: best.event.title,
      score: Number(best.score.toFixed(2)),
      sourcePath: path.join(resolvedAssetsDir, assetFile),
      destinationPath: path.join(paths.publicEventsDir, destinationFile),
      publicPath: `/images/events/${destinationFile}`,
    });
  }

  const publishedEventsStillWithoutImage = targetEvents
    .filter((event) => !usedEventIds.has(event.id))
    .map((event) => ({ id: event.id, slug: event.slug, title: event.title }));
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

  await fs.mkdir(paths.reportDir, { recursive: true });
  await fs.writeFile(path.join(paths.reportDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);

  if (failOnUnmatched && unmatchedAssetFiles.length) {
    console.log(`events:assets blocked: ${unmatchedAssetFiles.length} unmatched asset file(s).`);
    process.exitCode = 1;
    return;
  }

  if (!reportOnly && matched.length) {
    await fs.mkdir(paths.publicEventsDir, { recursive: true });
    if (new Set(matched.map((item) => item.destinationPath)).size !== matched.length) {
      throw new Error("Multiple events would write the same image; choose an event explicitly");
    }
    for (const item of matched) {
      try {
        await fs.access(item.destinationPath);
        throw new Error(`Refusing to overwrite existing image: ${item.destinationPath}`);
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
    }
    for (const item of matched) {
      await sharp(item.sourcePath)
        .rotate()
        .resize({ width: 1200, height: 720, fit: "cover", position: "center" })
        .webp({ quality: 82 })
        .toFile(item.destinationPath);
      const event = allEvents.find((candidate) => candidate.id === item.eventId);
      const media = eventMediaFor(event, item.publicPath);
      if (item.catalog === "legacy") legacyImages[event.id] = media;
      else events.find((candidate) => candidate.id === event.id).media = media;
      const override = {
        eventSlug: item.catalog === "legacy" ? event.id : event.slug,
        sourceUrl: event.sourceUrl,
        localPath: item.publicPath,
        kind: "azur-editorial",
        rightsStatus: "manual-approved",
        alt: media.imageAlt?.en ?? `${event.title} event image`,
        sourceName: "Azur Menton",
        credit: "Azur Menton",
        rightsNote: "Owner-approved Azur Menton event illustration.",
        approvedAt: new Date().toISOString(),
        locked: true,
      };
      const overrideIndex = imageOverrides.findIndex((candidate) => candidate.eventSlug === override.eventSlug);
      if (overrideIndex === -1) imageOverrides.push(override);
      else imageOverrides[overrideIndex] = { ...imageOverrides[overrideIndex], ...override };
    }
    if (matched.some((item) => item.catalog === "published")) await fs.writeFile(paths.publishedEventsPath, `${JSON.stringify(events, null, 2)}\n`);
    if (matched.some((item) => item.catalog === "legacy")) await fs.writeFile(paths.legacyImagesPath, `${JSON.stringify(legacyImages, null, 2)}\n`);
    await fs.mkdir(path.dirname(paths.imageOverridesPath), { recursive: true });
    await fs.writeFile(paths.imageOverridesPath, `${JSON.stringify(imageOverrides, null, 2)}\n`);
  }

  console.log(`events:assets ${apply ? "applied" : "report-only"}`);
  console.log(`matched=${matched.length} unmatched=${unmatchedAssetFiles.length} alreadyCovered=${alreadyCoveredAssetFiles.length} stillMissing=${publishedEventsStillWithoutImage.length}`);
  for (const item of matched) console.log(`- ${item.assetFile} -> ${item.eventSlug}`);
  if (unmatchedAssetFiles.length) console.log(`unmatched: ${unmatchedAssetFiles.join(", ")}`);
  return report;
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = { main, scoreAssetForEvent };
