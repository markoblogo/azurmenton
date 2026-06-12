#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const manifestPath = path.join(projectRoot, "public/images/generated-manifest.json");

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
let failures = 0;

for (const item of manifest) {
  for (const output of item.outputs ?? []) {
    try {
      await access(path.join(projectRoot, output));
    } catch {
      failures += 1;
      console.error(`missing derivative for ${item.source}: ${output}`);
    }
  }
}

if (failures) {
  process.exitCode = 1;
} else {
  console.log(`image derivative manifest ok (${manifest.length} sources)`);
}
