import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const lock = JSON.parse(readFileSync(new URL("../package-lock.json", import.meta.url), "utf8"));
assert.equal(lock.packages[""].dependencies.sharp, "0.35.5");
const sharpPackages = Object.entries(lock.packages).filter(([path]) => path.includes("/@img/sharp-") || path === "node_modules/sharp");
assert.ok(sharpPackages.length > 1, "Sharp native packages must exist");
for (const [path, pkg] of sharpPackages) assert.notEqual(pkg.dev, true, `${path} must survive --omit=dev`);
let libcCount = 0;
for (const [path, pkg] of Object.entries(lock.packages)) {
  if (!pkg.os?.includes("linux")) continue;
  // These published variants declare libc; arm gnueabihf packages may not.
  if (!/(?:-gnu|-musl)$/.test(path) && !path.includes("/@img/sharp-")) continue;
  const expected = path.includes("musl") ? "musl" : "glibc";
  assert.deepEqual(pkg.libc, [expected], `${path} lost its published libc filter`);
  libcCount++;
}
assert.ok(libcCount > 0, "No libc-filtered packages checked");
console.log(`Native lockfile verified: ${sharpPackages.length} production Sharp packages, ${libcCount} libc filters`);
