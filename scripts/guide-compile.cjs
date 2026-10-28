#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");
const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);
const { compileGuideMarkdown } = require("../src/lib/guide-markdown.ts");
const arg = name => process.argv[process.argv.indexOf(name) + 1];
const slug = process.argv.includes("--slug") ? arg("--slug") : "";
const prefix = process.argv.includes("--prefix") ? arg("--prefix") : slug;
if (![slug, prefix].every(value => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value))) throw new Error("Use --slug <public-slug> [--prefix <source-prefix>]");
const folder = path.join(root, "src/content/guide-data");
const sources = Object.fromEntries(["en", "fr", "it", "uk"].map(locale => [locale, fs.readFileSync(path.join(folder, `${prefix}-${locale}.md`), "utf8")]));
const records = compileGuideMarkdown(sources);
fs.writeFileSync(path.join(folder, `${slug}.json`), JSON.stringify(records, null, 2) + "\n");
console.log(`Compiled ${records.length} blocks in EN/FR/IT/UK; locale sections and tables aligned. No publication performed.`);
