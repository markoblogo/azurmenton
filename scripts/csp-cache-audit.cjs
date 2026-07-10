#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const exists = (relativePath) => fs.existsSync(path.join(root, relativePath));

function findFiles(directory, predicate, found = []) {
  for (const entry of fs.readdirSync(path.join(root, directory), { withFileTypes: true })) {
    const relativePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      findFiles(relativePath, predicate, found);
    } else if (predicate(relativePath)) {
      found.push(relativePath);
    }
  }

  return found;
}

const securityHeaders = read("src/lib/security-headers.ts");
const proxy = read("src/proxy.ts");
const nextConfig = read("next.config.ts");
const radioPlayer = read("src/components/guide/utility/LocalRadioBlock.tsx");
const sourceFiles = findFiles("src", (file) => /\.(ts|tsx)$/.test(file));
const headersConsumers = sourceFiles.filter((file) => read(file).includes("headers()"));
const nonceConsumers = sourceFiles.filter((file) => read(file).includes("nonceHeaderName"));
const jsonLdPages = sourceFiles.filter((file) => read(file).includes("<JsonLdScript"));
const prerenderManifestPath = ".next/prerender-manifest.json";
const prerenderManifest = exists(prerenderManifestPath) ? JSON.parse(read(prerenderManifestPath)) : null;
const appPathsManifest = exists(".next/server/app-paths-manifest.json") ? JSON.parse(read(".next/server/app-paths-manifest.json")) : {};
const appPageRoutes = Object.keys(appPathsManifest)
  .filter((route) => route.endsWith("/page"))
  .filter((route) => !route.startsWith("/_global-error") && !route.startsWith("/_not-found"));
const prerenderedRoutes = prerenderManifest ? Object.keys(prerenderManifest.routes).filter((route) => route !== "/_global-error") : [];

const hasNonceCsp = securityHeaders.includes("'nonce-${nonce}'") || securityHeaders.includes("`'nonce-${nonce}'`");
const hasStrictDynamic = securityHeaders.includes("'strict-dynamic'");
const scriptDirectiveSource = securityHeaders.match(/\[\s*"script-src"[\s\S]*?\.join\(" "\)/)?.[0] ?? "";
const hasProductionScriptUnsafeInline = scriptDirectiveSource.includes("'unsafe-inline'");
const allowsFrameworkStyleAttributes = securityHeaders.includes('"style-src-attr \'unsafe-inline\'"');
const excludesStaticAssets = ["_next/static", "_next/image", "images/"].every((needle) => proxy.includes(needle));
const imagesImmutable = nextConfig.includes('source: "/images/:path*"') && nextConfig.includes("max-age=31536000") && nextConfig.includes("immutable");
const hlsLoadsOnDemand = radioPlayer.includes('import("hls.js")') && !/import\s+Hls\s+from\s+["']hls\.js["']/.test(radioPlayer);
const dynamicAppPagePatterns = appPageRoutes.length;

console.log("Azur Menton CSP/cache performance audit");
console.log("");
console.log("Build cache shape");
console.log(`- App page route patterns using dynamic HTML: ${dynamicAppPagePatterns}`);
console.log(`- Cacheable generated routes: ${prerenderedRoutes.length}`);
console.log("");
console.log("CSP posture");
console.log(`- Nonce-based CSP: ${hasNonceCsp ? "yes" : "no"}`);
console.log(`- strict-dynamic enabled: ${hasStrictDynamic ? "yes" : "no"}`);
console.log(`- production script unsafe-inline present: ${hasProductionScriptUnsafeInline ? "yes" : "no"}`);
console.log(`- framework style attributes allowed explicitly: ${allowsFrameworkStyleAttributes ? "yes" : "no"}`);
console.log(`- proxy excludes static asset paths: ${excludesStaticAssets ? "yes" : "no"}`);
console.log(`- /images immutable cache header configured: ${imagesImmutable ? "yes" : "no"}`);
console.log(`- HLS player code loaded on demand: ${hlsLoadsOnDemand ? "yes" : "no"}`);
console.log("");
console.log("Dynamic contributors");
for (const file of headersConsumers) console.log(`- headers(): ${file}`);
for (const file of nonceConsumers.filter((file) => !headersConsumers.includes(file))) console.log(`- nonce import: ${file}`);
console.log(`- Pages/components rendering JSON-LD scripts: ${jsonLdPages.length}`);
console.log("");
console.log("Conclusion");
console.log("- Current nonce CSP is intentionally secure but makes HTML page responses dynamic.");
console.log("- Static assets and generated metadata routes remain cacheable; image assets receive immutable cache headers.");
console.log("- HLS playback support is loaded only when a guide renders an HLS station and the browser lacks native HLS.");
console.log("- Do not add unsafe-inline to production script-src. A future optimization should first test a split policy for pages without inline JSON-LD/scripts or move selected structured data to cacheable route handlers.");

if (!hasNonceCsp || hasProductionScriptUnsafeInline || !allowsFrameworkStyleAttributes || !excludesStaticAssets || !imagesImmutable || !hlsLoadsOnDemand) {
  process.exitCode = 1;
}
