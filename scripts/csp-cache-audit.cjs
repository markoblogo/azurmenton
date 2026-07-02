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
const hasProductionUnsafeInline = securityHeaders.includes("'unsafe-inline'");
const excludesStaticAssets = ["_next/static", "_next/image", "images/"].every((needle) => proxy.includes(needle));
const imagesImmutable = nextConfig.includes('source: "/images/:path*"') && nextConfig.includes("max-age=31536000") && nextConfig.includes("immutable");
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
console.log(`- production unsafe-inline present: ${hasProductionUnsafeInline ? "yes" : "no"}`);
console.log(`- proxy excludes static asset paths: ${excludesStaticAssets ? "yes" : "no"}`);
console.log(`- /images immutable cache header configured: ${imagesImmutable ? "yes" : "no"}`);
console.log("");
console.log("Dynamic contributors");
for (const file of headersConsumers) console.log(`- headers(): ${file}`);
for (const file of nonceConsumers.filter((file) => !headersConsumers.includes(file))) console.log(`- nonce import: ${file}`);
console.log(`- Pages/components rendering JSON-LD scripts: ${jsonLdPages.length}`);
console.log("");
console.log("Conclusion");
console.log("- Current nonce CSP is intentionally secure but makes HTML page responses dynamic.");
console.log("- Static assets and generated metadata routes remain cacheable; image assets receive immutable cache headers.");
console.log("- Do not replace nonce CSP with unsafe-inline. A future optimization should first test a split policy for pages without inline JSON-LD/scripts or move selected structured data to cacheable route handlers.");

if (!hasNonceCsp || hasProductionUnsafeInline || !excludesStaticAssets || !imagesImmutable) {
  process.exitCode = 1;
}
