import { createRequire } from "node:module";
import sharp from "sharp";
import { expect, it } from "vitest";

const { prepareGuideImage } = createRequire(import.meta.url)("../../scripts/lib/guide-publisher-assets.cjs");

it("reuses a valid prepared WebP byte for byte", async () => {
  const input = await sharp({ create: { width: 40, height: 20, channels: 3, background: "red" } }).webp().toBuffer();
  const result = await prepareGuideImage(input);
  expect(Buffer.from(result.base64, "base64")).toEqual(input);
  expect(result.sha256).toMatch(/^[a-f0-9]{64}$/);
});

it("converts a source PNG to a bounded WebP", async () => {
  const input = await sharp({ create: { width: 1800, height: 900, channels: 3, background: "green" } }).png().toBuffer();
  const result = await prepareGuideImage(input);
  const info = await sharp(Buffer.from(result.base64, "base64")).metadata();
  expect(info).toMatchObject({ format: "webp", width: 1680, height: 840 });
});

it("rejects invalid data and checks encoded size even for an existing WebP", async () => {
  await expect(prepareGuideImage(Buffer.from("not an image"))).rejects.toThrow();
  const input = await sharp({ create: { width: 40, height: 20, channels: 3, background: "blue" } }).webp().toBuffer();
  await expect(prepareGuideImage(input, { maxBytes: 1 })).rejects.toThrow(/2.5 MB/);
});
