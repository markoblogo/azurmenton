/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs/promises");
const path = require("node:path");
const ts = require("typescript");

// Follow only local value imports reachable from the canonical place registry.
async function readPlaceModules(root) {
  const content = path.join(root, "src/content");
  const sources = new Map();
  async function visit(file) {
    if (sources.has(file)) return;
    if (!(await fs.lstat(file)).isFile()) throw Error(`Unsupported place module: ${file}`);
    const source = await fs.readFile(file, "utf8");
    sources.set(file, source);
    const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    for (const node of tree.statements) {
      if (!ts.isImportDeclaration(node) || node.importClause?.isTypeOnly || !ts.isStringLiteral(node.moduleSpecifier)) continue;
      const specifier = node.moduleSpecifier.text;
      if (!specifier.startsWith(".")) continue;
      const candidate = path.resolve(path.dirname(file), specifier + ".ts");
      if (!candidate.startsWith(content + path.sep)) continue;
      try { await fs.lstat(candidate); } catch (error) { if (error.code === "ENOENT") continue; throw error; }
      await visit(candidate);
    }
  }
  await visit(path.join(content, "places.ts"));
  return sources;
}

function preparePlaceImageModulePatches(sources, bundle) {
  const trees = [...sources].map(([file, source]) => ({ file, source, tree: ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true) }));
  const changes = new Map();
  const skippedAlreadySatisfiedPlaceIds = [];
  const seen = new Set();
  for (const update of bundle.updates) {
    if (seen.has(update.placeId)) throw Error(`Duplicate image update for ${update.placeId}`);
    seen.add(update.placeId);
    if (update.alreadySatisfied) { skippedAlreadySatisfiedPlaceIds.push(update.placeId); continue; }
    const matches = [];
    for (const entry of trees) {
      function visit(node) {
        if (ts.isObjectLiteralExpression(node)) {
          const ids = node.properties.filter(p => ts.isPropertyAssignment(p) && (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) && p.name.text === "id" && ts.isStringLiteral(p.initializer) && p.initializer.text === update.placeId);
          if (ids.length) matches.push({ ...entry, node });
        }
        ts.forEachChild(node, visit);
      }
      visit(entry.tree);
    }
    if (matches.length !== 1) throw Error(`Expected one owning place object for ${update.placeId}; found ${matches.length}`);
    const { file, source, node } = matches[0];
    if (node.properties.some(p => ts.isSpreadAssignment(p) || (p.name && ts.isComputedPropertyName(p.name)))) throw Error(`Dynamic place properties for ${update.placeId}`);
    const images = node.properties.filter(p => ts.isPropertyAssignment(p) && (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) && p.name.text === "image");
    if (images.length) throw Error(`Refusing to replace existing image for ${update.placeId}`);
    const id = node.properties.find(p => ts.isPropertyAssignment(p) && (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) && p.name.text === "id");
    const insertion = id.end;
    // The id property already has a comma in ordinary object literals.
    if (source[insertion] !== ",") throw Error(`Unsupported place id layout for ${update.placeId}`);
    const edits = changes.get(file) ?? { file, source, edits: [], placeIds: [] };
    edits.edits.push({ offset: insertion + 1, text: `\n    image: ${JSON.stringify(update.imagePublicPath)},` });
    edits.placeIds.push(update.placeId);
    changes.set(file, edits);
  }
  const patches = [...changes.values()].map(change => {
    let updated = change.source;
    for (const edit of change.edits.sort((a, b) => b.offset - a.offset)) updated = updated.slice(0, edit.offset) + edit.text + updated.slice(edit.offset);
    return { file: change.file, source: change.source, updated, placeIds: change.placeIds };
  });
  return { patches, skippedAlreadySatisfiedPlaceIds };
}

async function applyPlaceImageModulePatches(plan) {
  // Check every source before any writes; never overwrite an intervening edit.
  for (const patch of plan.patches) if (await fs.readFile(patch.file, "utf8") !== patch.source) throw Error(`Place module changed during image processing: ${patch.file}`);
  for (const patch of plan.patches) await fs.writeFile(patch.file, patch.updated);
  for (const patch of plan.patches) if (await fs.readFile(patch.file, "utf8") !== patch.updated) throw Error(`Place image post-apply verification failed: ${patch.file}`);
  return { verifiedPlaceIds: plan.patches.flatMap(p => p.placeIds).concat(plan.skippedAlreadySatisfiedPlaceIds), failedPlaceIds: [] };
}

module.exports = { readPlaceModules, preparePlaceImageModulePatches, applyPlaceImageModulePatches };
