/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("node:path");

function projectChecks(root, { webpack = false, release = false } = {}) {
  const npm = script => [process.platform === "win32" ? "npm.cmd" : "npm", "run", script];
  const node = (id, file) => ({ id, argv: [process.execPath, path.join(root, "scripts", file)] });
  const buildArtifacts = [path.join(root, ".next/BUILD_ID"), path.join(root, ".next/build-manifest.json"), path.join(root, "public/pagefind")];
  return [
    ...(release ? [node("native-lockfile", "check-native-lockfile.mjs"), { id: "dependency-audit", argv: [process.platform === "win32" ? "npm.cmd" : "npm", "audit", "--audit-level=moderate"], alwaysRun: true }] : []),
    ...[["docs", "docs:check"], ["lint", "lint"], ["typecheck", "typecheck"], ["unit", "test"], ["preflight", "preflight"], ["images", "images:check"]].map(([id, script]) => ({ id, argv: npm(script) })),
    { id: "build", argv: [...npm("build"), ...(webpack ? ["--", "--webpack"] : [])], artifacts: buildArtifacts },
    ...(release ? [{ id: "browser", argv: [...npm("test:e2e"), "--", process.env.CI ? "--workers=1" : "--workers=2"], artifacts: [buildArtifacts[0]] }] : []),
    { id: "postbuild", argv: npm("preflight:postbuild"), artifacts: [buildArtifacts[0]] },
  ];
}
module.exports = { projectChecks };
