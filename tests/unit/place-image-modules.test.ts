import { describe, expect, it } from "vitest";
import { mkdtemp, mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { readPlaceModules, preparePlaceImageModulePatches, applyPlaceImageModulePatches } = require("../../scripts/lib/place-image-modules.cjs");
const bundle = { updates: [{ placeId: "sample", imagePublicPath: "/images/guide/sample.png", alreadySatisfied: false }] };
describe("module-owned place illustration patches", () => {
  it("finds a separately imported module and patches compact id lines", async () => {
    const root = await mkdtemp(join(tmpdir(), "place-image-modules-"));
    try {
      const content = join(root, "src/content");
      await mkdir(content, { recursive: true });
      await writeFile(join(content, "places.ts"), 'import { other } from "./other-places";\nexport const places = [...other];\n');
      await writeFile(join(content, "other-places.ts"), 'export const other = [{ id: "sample", name: "Sample", imageAlt: "Kept" }];\n');
      const plan = preparePlaceImageModulePatches(await readPlaceModules(root), bundle);
      expect(plan.patches).toHaveLength(1);
      expect(plan.patches[0].updated).toContain('image: "/images/guide/sample.png", name: "Sample"');
      expect(await applyPlaceImageModulePatches(plan)).toEqual({ verifiedPlaceIds: ["sample"], failedPlaceIds: [] });
      expect(await readFile(join(content, "other-places.ts"), "utf8")).toContain('imageAlt: "Kept"');
      const stale = preparePlaceImageModulePatches(new Map([["a.ts", 'const p = [{id: "sample", name: "S"}];']]), bundle);
      stale.patches[0].file = join(content, "other-places.ts");
      await expect(applyPlaceImageModulePatches(stale)).rejects.toThrow("changed during");
    } finally { await rm(root, { recursive: true, force: true }); }
  });
  it("rejects absent, duplicate or already illustrated objects before processing", () => {
    expect(() => preparePlaceImageModulePatches(new Map(), bundle)).toThrow("found 0");
    expect(() => preparePlaceImageModulePatches(new Map([["a.ts", 'const p = [{id:"sample", name:"S"}, {id:"sample", name:"T"}];']]), bundle)).toThrow("found 2");
    expect(() => preparePlaceImageModulePatches(new Map([["a.ts", 'const p = [{id:"sample", image:"existing.png"}];']]), bundle)).toThrow("Refusing to replace");
    expect(() => preparePlaceImageModulePatches(new Map([["a.ts", 'const p = [{id:"sample", "image":"existing.png"}];']]), bundle)).toThrow("Refusing to replace");
    expect(() => preparePlaceImageModulePatches(new Map([["a.ts", 'const p = [{...defaults, id:"sample", name:"S"}];']]), bundle)).toThrow("Dynamic place");
    expect(() => preparePlaceImageModulePatches(new Map([["a.ts", 'const p = [{id:"sample", name:"S"}];']]), { updates: [...bundle.updates, ...bundle.updates] })).toThrow("Duplicate image update");
  });
});
