#!/usr/bin/env node

import path from "node:path";
import { generateManifest, loadTargets } from "./lib/image-derivatives.mjs";

const projectRoot = process.cwd();
const manifestPath = path.join(projectRoot, "public/images/generated-manifest.json");
const targets = await loadTargets(path.join(projectRoot, "scripts/lib/image-derivative-targets.json"));
await generateManifest(projectRoot, targets, manifestPath);
console.log(`generated ${path.relative(projectRoot, manifestPath)}`);
