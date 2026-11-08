import { expect, it, vi } from "vitest";
import sharp from "sharp";
import { guideArticles } from "@/content/guide";
import { createGuidePublisher } from "@/lib/guide-publisher-api";
import { guideDigest } from "@/lib/guide-blob-store";
import type { GuideHead, GuideSnapshot } from "@/lib/guide-runtime-model";

const token = "test-only-owner-token-not-production-123456";
const article = structuredClone(guideArticles.find(a => a.slug === "best-beaches-in-menton")!);
const publication = { article, places: [], collections: [], sources: "Approved fixture" };
function setup() {
  let head: GuideHead | null = null;
  const snapshots = new Map<string, GuideSnapshot>();
  const store = {
    guideDigest,
    readGuideHead: vi.fn(async () => head ? { head, etag: "test" } : null),
    readGuideSnapshot: vi.fn(async (digest: string) => {
      if (!snapshots.has(digest)) throw Error("private-storage-error");
      return structuredClone(snapshots.get(digest)!);
    }),
    writeGuideSnapshot: vi.fn(async (snapshot: GuideSnapshot) => {
      const digest = guideDigest(JSON.stringify(snapshot)); snapshots.set(digest, structuredClone(snapshot)); return digest;
    }),
    storeGuideImage: vi.fn(async (bytes: Uint8Array) => `/guide-media/${guideDigest(bytes)}.webp`),
    activateGuideSnapshot: vi.fn(async (digest: string, revision: number, requestId: string) => {
      if (head?.requestId === requestId && head.hash === digest) return head;
      if ((head?.revision ?? 0) !== revision) throw Error("Publication revision changed");
      head = { version: 1, revision: revision + 1, hash: digest, previousHash: head?.hash ?? null, requestId };
      return head;
    }),
    readGuideBlob: vi.fn(),
  };
  const handler = createGuidePublisher({ token, store, environment: "local" });
  const request = (body: unknown) => new Request("http://localhost/api/guides/manage", { method: "POST", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" }, body: JSON.stringify(body) });
  return { handler, request, store, snapshots };
}

it("authenticates before accessing storage and disables Preview", async () => {
  const { handler, store } = setup();
  expect((await handler(new Request("http://localhost/api/guides/manage"))).status).toBe(401);
  expect(store.readGuideHead).not.toHaveBeenCalled();
  const preview = createGuidePublisher({ token, store, environment: "preview" });
  expect((await preview(new Request("http://localhost"))).status).toBe(503);
});

it("stages media and complete graphs, activates, retries, images and rolls back", async () => {
  const { handler, request, store } = setup();
  const bytes = await sharp({ create: { width: 2, height: 2, channels: 3, background: "red" } }).webp().toBuffer();
  const asset = { sha256: guideDigest(bytes), base64: bytes.toString("base64") };
  const stage = await handler(request({ action: "stage", expectedRevision: 0, publication, asset }));
  expect(stage.status).toBe(200);
  const staged = await stage.json();
  expect(store.activateGuideSnapshot).not.toHaveBeenCalled();
  const activate = { action: "activate", hash: staged.hash, expectedRevision: 0, requestId: "fixture-add" };
  expect((await (await handler(request(activate))).json()).head.revision).toBe(1);
  expect((await (await handler(request(activate))).json()).head.revision).toBe(1);
  const place = article.relatedPlaces![0];
  const snapshot = await store.readGuideSnapshot(staged.hash);
  const basePlaces = await import("@/content/places");
  const old = basePlaces.places.find(p => p.id === place)!;
  const expectedImage = old.images?.length ? old.images[0] : old.image ?? null;
  const image = await handler(request({ action: "image", expectedRevision: 1, slug: article.slug, place, expectedImage, asset }));
  expect(image.status).toBe(200);
  const replacement = await image.json();
  const withImage = await store.readGuideSnapshot(replacement.hash);
  expect(withImage.publications[0].places[0].image).toMatch(/^\/guide-media\//);
  expect(snapshot.publications[0].places).toEqual([]);
  expect((await handler(request({ action: "activate", hash: replacement.hash, expectedRevision: 1, requestId: "fixture-image" }))).status).toBe(200);
  expect((await (await handler(request({ action: "rollback", hash: staged.hash, expectedRevision: 2, requestId: "fixture-rollback" }))).json()).head.revision).toBe(3);
});

it("rejects stale writers and unsafe media without storing", async () => {
  const { handler, request, store } = setup();
  expect((await handler(request({ action: "stage", expectedRevision: 8, publication }))).status).toBe(409);
  expect((await handler(request({ action: "stage", expectedRevision: 0, publication, asset: { sha256: "a".repeat(64), base64: Buffer.from("not an image").toString("base64") } }))).status).toBe(400);
  expect(store.writeGuideSnapshot).not.toHaveBeenCalled();
  expect(store.storeGuideImage).not.toHaveBeenCalled();
  expect((await handler(request({ action: "stage", expectedRevision: 0, publication: { ...publication, article: { ...article, relatedPlaces: ["nonexistent-place"] } } }))).status).toBe(400);
});

it("bounds input, rejects invalid JSON and hides provider errors", async () => {
  const { handler, request, store } = setup();
  expect((await handler(request({ filler: "x".repeat(4_000_001) }))).status).toBe(400);
  const invalid = new Request("http://localhost", { method: "POST", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" }, body: "{" });
  expect((await handler(invalid)).status).toBe(400);
  store.readGuideHead.mockRejectedValueOnce(new Error("private-storage-token"));
  const response = await handler(new Request("http://localhost", { headers: { authorization: `Bearer ${token}` } }));
  expect(response.status).toBe(503);
  expect(await response.text()).not.toContain("private-storage-token");
});
