import { afterEach, describe, expect, it } from "vitest";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const { main } = require("../../scripts/events-assets.cjs");
const directories: string[] = [];
type FixtureEvent = { id: string; slug: string; title: string; startDate?: string; occurrenceSlug?: string; sourceUrl?: string; media?: { image?: string; inheritedFromEventId?: string } };

afterEach(async () => {
  await Promise.all(directories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

async function fixture(filename: string) {
  const root = await mkdtemp(path.join(tmpdir(), "events-assets-test-"));
  directories.push(root);
  const assets = path.join(root, "assets");
  await mkdir(assets);
  await sharp({ create: { width: 20, height: 12, channels: 3, background: "#54a2ba" } }).png().toFile(path.join(assets, filename));
  const options = {
    publishedEventsPath: path.join(root, "events.json"),
    legacyImagesPath: path.join(root, "legacy.json"),
    imageOverridesPath: path.join(root, "overrides.json"),
    publicEventsDir: path.join(root, "images"),
    reportDir: path.join(root, "reports"),
    rivieraEvents: [
      { id: "monaco-yacht-show-2026", slug: "monaco-yacht-show-2026", title: "Monaco Yacht Show", startDate: "2026-09-23", media: { image: "/images/events/old.jpg" } },
      { id: "monaco-yacht-show-2027", slug: "monaco-yacht-show", occurrenceSlug: "monaco-yacht-show-2027", title: "Monaco Yacht Show", startDate: "2027-09-22", sourceUrl: "https://example.com" },
    ] as FixtureEvent[],
  };
  await writeFile(options.publishedEventsPath, "[]\n");
  await writeFile(options.legacyImagesPath, "{}\n");
  await writeFile(options.imageOverridesPath, "[]\n");
  return { assets, options };
}

describe("published and legacy event illustration assets", () => {
  it("matches the correct edition and applies a legacy image without touching the older edition", async () => {
    const { assets, options } = await fixture("monaco-yacht-show-2027.png");
    const report = await main(["--published-events", "--assets-dir", assets, "--apply"], options);
    expect(report.matched[0]).toMatchObject({ eventId: "monaco-yacht-show-2027", catalog: "legacy" });
    const images = JSON.parse(await readFile(options.legacyImagesPath, "utf8"));
    expect(images["monaco-yacht-show-2027"].image).toBe("/images/events/monaco-yacht-show-2027.webp");
    expect(images["monaco-yacht-show-2026"]).toBeUndefined();
    expect((await sharp(path.join(options.publicEventsDir, "monaco-yacht-show-2027.webp")).metadata())).toMatchObject({ width: 1200, height: 720 });
  });

  it("refuses ambiguous editions and respects existing images with explicit selection", async () => {
    const { assets, options } = await fixture("Monaco Yacht Show.png");
    const ambiguous = await main(["--published-events", "--assets-dir", assets, "--report-only"], options);
    expect(ambiguous.unmatchedAssetFiles).toHaveLength(1);
    const covered = await main(["--published-events", "--assets-dir", assets, "--event-id", "monaco-yacht-show-2026", "--apply"], options);
    expect(covered.alreadyCoveredAssetFiles).toHaveLength(1);
    expect(JSON.parse(await readFile(options.legacyImagesPath, "utf8"))).toEqual({});
  });

  it("continues to apply images to JSON-catalogue events using their slug", async () => {
    const { assets, options } = await fixture("new-event-2027.png");
    const event = { id: "new-event-2027-abc123", slug: "new-event-2027", title: "New Event", sourceUrl: "https://example.com" };
    await writeFile(options.publishedEventsPath, JSON.stringify([event]));
    options.rivieraEvents.push({ ...event, startDate: "2027-09-01", media: undefined });
    const report = await main(["--published-events", "--assets-dir", assets, "--apply"], options);
    expect(report.matched[0]).toMatchObject({ eventId: event.id, catalog: "published" });
    const published = JSON.parse(await readFile(options.publishedEventsPath, "utf8"));
    expect(published[0].media.image).toBe("/images/events/new-event-2027.webp");
    expect(JSON.parse(await readFile(options.legacyImagesPath, "utf8"))).toEqual({});
  });

  it("allows a selected inherited illustration to be replaced without touching its source", async () => {
    const { assets, options } = await fixture("new-cover.png");
    options.rivieraEvents[1].media = { image: "/images/events/old.jpg", inheritedFromEventId: "monaco-yacht-show-2026" };
    const report = await main(["--published-events", "--assets-dir", assets, "--event-id", "monaco-yacht-show-2027", "--replace-inherited", "--apply"], options);
    expect(report.matched[0].eventId).toBe("monaco-yacht-show-2027");
    expect(options.rivieraEvents[0].media?.image).toBe("/images/events/old.jpg");
  });
});
