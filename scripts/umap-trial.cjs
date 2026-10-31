#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");
const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);
const { buildUmapTrial } = require("../src/lib/umap-trial.ts");
const { locales } = require("../src/i18n/locales.ts");
const [routeId = "family-menton", locale = "en"] = process.argv.slice(2);
if (!locales.includes(locale)) throw new Error("Unsupported locale");
const trial = buildUmapTrial(routeId, locale);
const dir = path.join(root, "build", "umap-trial", routeId, locale);
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "stops.geojson"), JSON.stringify(trial.stops, null, 2) + "\n");
fs.writeFileSync(path.join(dir, "schematic-order.geojson"), JSON.stringify(trial.schematic, null, 2) + "\n");
fs.writeFileSync(path.join(dir, "trial.json"), JSON.stringify(trial, null, 2) + "\n");
const escape = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
fs.writeFileSync(path.join(dir, "index.html"), `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Editorial uMap preview</title><style>body{font:18px/1.6 system-ui;max-width:800px;margin:40px auto;padding:0 20px;color:#173f36}a{display:block;padding:12px 0;color:#0b6f8f}img{max-width:100%;height:auto}</style><h1>${escape(trial.title)}</h1><p>Editorial preview only. No saved or published uMap map. The preview sends public stop coordinates and compact editorial notes to the selected uMap instance; no guest or trip data.</p><p>${escape(trial.accessNote)}</p><a href="${escape(trial.previewUrl)}" rel="noopener noreferrer">Open unsaved uMap preview</a><a href="${escape(trial.originalGuideUrl)}">Original route on Azur Menton</a><a href="http://localhost:3102/${locale}/map">Existing local map</a><a href="stops.geojson">Canonical stops and full notes: GeoJSON</a><a href="schematic-order.geojson">Optional schematic stop order: NOT walking directions</a><p>The optional line is a separate import, never a verified street path. Saving or embedding a public map requires separate editorial approval. This command never saves a map.</p></html>\n`);
console.log(`uMap editorial export: ${trial.stops.features.length} reviewed stops; no provider write`);
console.log(`Open ${path.join(dir, "index.html")}`);
