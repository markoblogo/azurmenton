#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");
const [routeId = "family-menton", locale = "en"] = process.argv.slice(2);
if (!/^[a-z0-9-]+$/.test(routeId) || !["en", "fr", "it", "uk"].includes(locale)) throw new Error("Invalid route or locale");
const dir = path.resolve(__dirname, `../build/umap-trial/${routeId}/${locale}`);
const trial = JSON.parse(fs.readFileSync(path.join(dir, "trial.json"), "utf8"));

(async () => {
  const browser = await chromium.launch({ headless: true });
  const evidence = { provider: new URL(trial.previewUrl).origin, saved: false, blockedWrites: [], views: [] };
  let page;
  try {
    const context = await browser.newContext();
    await context.routeWebSocket("**/*", socket => socket.close());
    await context.route("**/*", route => {
      const request = route.request();
      if (!["GET", "HEAD"].includes(request.method())) {
        evidence.blockedWrites.push({ method: request.method(), origin: new URL(request.url()).origin });
        return route.abort();
      }
      return route.continue();
    });
    page = await context.newPage();
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      const navigation = await page.goto(trial.previewUrl, { waitUntil: "domcontentloaded", timeout: 45_000 });
      const response = navigation ?? await page.reload({ waitUntil: "domcontentloaded" });
      if (response.status() !== 200) throw new Error(`uMap HTTP ${response.status()}`);
      await page.waitForFunction(count => document.querySelectorAll(".leaflet-marker-icon").length === count, trial.stops.features.length, { timeout: 30_000 });
      await page.waitForTimeout(500);
      async function allStopsInView() {
        return page.evaluate(count => {
          const markers = [...document.querySelectorAll(".leaflet-marker-icon")];
          return markers.length === count && markers.every(marker => {
            const rect = marker.getBoundingClientRect();
            return rect.x >= 45 && rect.y >= 80 && rect.right <= innerWidth - 45 && rect.bottom <= innerHeight - 80;
          });
        }, trial.stops.features.length);
      }
      for (let step = 0; step < 6 && !await allStopsInView(); step++) {
        await page.getByRole("button", { name: "Zoom out", exact: true }).click();
        await page.waitForTimeout(300);
      }
      if (!await allStopsInView()) throw new Error("Not all route stops fit the viewport");
      await page.locator(".leaflet-marker-icon").first().click();
      const popup = page.locator(".leaflet-popup");
      await popup.waitFor({ state: "visible" });
      await page.waitForFunction(() => getComputedStyle(document.querySelector(".leaflet-popup")).opacity === "1");
      if (await popup.locator(`a[href^="https://azurmenton.com/${locale}/guide/"]`).count() !== 2) throw new Error("Place/route links missing from popup");
      const popupBox = await popup.boundingBox();
      if (!popupBox || popupBox.height > 340 || popupBox.width > width || popupBox.x < 0 || popupBox.y < 0 || popupBox.x + popupBox.width > width || popupBox.y + popupBox.height > 900) throw new Error("Popup does not fit viewport");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (overflow > 0) throw new Error(`uMap overflows at ${width}px`);
      await page.waitForFunction(() => [...document.querySelectorAll("img.leaflet-tile")].some(image => image.complete && image.naturalWidth > 0), undefined, { timeout: 20_000 });
      await page.screenshot({ path: path.join(dir, `umap-${width}.png`), animations: "disabled" });
      evidence.views.push({ width, markers: trial.stops.features.length, allStopsInViewBeforePopup: true, popupLink: true, popupHeight: popupBox.height, popupFits: true, tileLoaded: true, overflow });
    }
    // Import a separate, explicitly schematic layer via the actual uMap editor.
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForFunction(count => document.querySelectorAll(".leaflet-marker-icon").length === count, trial.stops.features.length);
    await page.getByText("Edit", { exact: true }).click();
    await page.getByText("Save", { exact: true }).waitFor({ state: "visible" });
    await page.keyboard.press("Control+i");
    const file = page.locator('input[type="file"]').first();
    await file.waitFor({ state: "attached", timeout: 10_000 });
    await file.setInputFiles(path.join(dir, "schematic-order.geojson"));
    await page.getByRole("button", { name: /^import data$/i }).click();
    await page.waitForFunction(() => document.querySelectorAll(".leaflet-overlay-pane path").length > 0, undefined, { timeout: 10_000 });
    evidence.schematicLayerImported = true;
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(dir, "umap-editor.png"), animations: "disabled" });
    fs.writeFileSync(path.join(dir, "browser-evidence.json"), JSON.stringify(evidence, null, 2) + "\n");
    console.log(JSON.stringify(evidence));
  } catch (error) {
    if (page) {
      await page.screenshot({ path: path.join(dir, "umap-last-state.png") });
      evidence.lastState = (await page.locator("body").innerText()).slice(-3000);
    }
    fs.writeFileSync(path.join(dir, "browser-evidence.json"), JSON.stringify({ ...evidence, error: error.message }, null, 2) + "\n");
    throw error;
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
