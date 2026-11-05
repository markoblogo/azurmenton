import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";
const { availablePlaceImages } = createRequire(import.meta.url)("../../scripts/lib/guide-image-coverage.cjs");

describe("bounded image coverage probes", () => {
  it("deduplicates files, bounds parallel reads and preserves input order", async () => {
    let active = 0, peak = 0, calls = 0;
    const images = Array.from({ length: 12 }, (_, i) => `/images/${i}.png`);
    const stat = async () => { calls++; active++; peak = Math.max(peak, active); await new Promise(resolve => setTimeout(resolve, 2)); active--; return { isFile: () => true }; };
    expect(await availablePlaceImages("/repo", [...images, images[0]], { stat, concurrency: 3 })).toEqual(images);
    expect(calls).toBe(12);
    expect(peak).toBe(3);
  });
  it("omits missing files and directories but propagates access failures", async () => {
    const stat = async (file: string) => { if (file.endsWith("missing.png")) throw Object.assign(new Error("missing"), { code: "ENOENT" }); return { isFile: () => !file.endsWith("directory") }; };
    expect(await availablePlaceImages("/repo", ["/images/a.png", "/images/missing.png", "/images/directory"], { stat })).toEqual(["/images/a.png"]);
    await expect(availablePlaceImages("/repo", ["/images/a.png"], { stat: async () => { throw Object.assign(new Error("denied"), { code: "EACCES" }); } })).rejects.toThrow("denied");
  });
  it("rejects escaped paths before any filesystem probe", async () => {
    let calls = 0;
    await expect(availablePlaceImages("/repo", ["/images/a.png", "/../secret"], { stat: async () => { calls++; return { isFile: () => true }; } })).rejects.toThrow("inside public");
    expect(calls).toBe(0);
  });
});
