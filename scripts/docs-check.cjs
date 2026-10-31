#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("node:path");
const { checkDocumentation, documentationFiles } = require("./lib/docs-check.cjs");
const root = path.resolve(__dirname, "..");
const files = documentationFiles(root);
const errors = checkDocumentation(root, files, require("../package.json").scripts);
console.log(`Documentation: ${files.length} files; ${errors.length} broken links/commands. Historical docs/archive is excluded.`);
for (const error of errors) console.error(`- ${error}`);
if (errors.length) process.exitCode = 1;
