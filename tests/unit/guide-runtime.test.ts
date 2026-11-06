import { describe, expect, it, vi, beforeEach } from "vitest";
import { guideArticles } from "@/content/guide";
import { places } from "@/content/places";
import { contentCollections } from "@/content/content-map";
import { mergeGuideSnapshot, replacePlacePrimaryImage, setPublicationPlace, validateSnapshot, type GuideSnapshot } from "@/lib/guide-runtime-model";
import { isRuntimeSearchReplacement, runtimeSearchRows, matchRuntimeSearch } from "@/lib/guide-runtime-search";
import { placeSharePath } from "@/lib/place-share-target";

const fixture = (): GuideSnapshot => {
  const article = structuredClone(guideArticles.find(a => a.slug === "menton-sundays-public-holidays")!);
  return { version: 1, publications: [{ article, places: [], collections: ["practical-stay"], sources: "Owner manuscript and official source review" }] };
};
describe("runtime publication graph", () => {
  it("matches the static guide exactly, without mutating imported content", () => {
    const snapshot = fixture();
    const before = JSON.stringify({ guideArticles, places, contentCollections });
    const graph = mergeGuideSnapshot(guideArticles, places, contentCollections, snapshot);
    expect(graph.guideArticles.find(a => a.slug === snapshot.publications[0].article.slug)).toEqual(snapshot.publications[0].article);
    expect(JSON.stringify({ guideArticles, places, contentCollections })).toBe(before);
  });
  it("registers a new guide once and derives discovery and reciprocal relations", () => {
    const snapshot = fixture();
    const a = snapshot.publications[0].article;
    a.id = a.slug = "runtime-pilot-guide";
    const graph = mergeGuideSnapshot(guideArticles, places, contentCollections, snapshot);
    expect(graph.guideArticles.filter(g => g.slug === a.slug)).toHaveLength(1);
    expect(graph.contentCollections.find(c => c.id === "practical-stay")?.includeGuideSlugs).toContain(a.slug);
    expect(graph.places.find(p => p.id === a.relatedPlaces![0])?.relatedArticleIds).toContain(a.slug);
    expect(graph.guideArticles.find(g => g.slug === a.relatedArticles![0])?.relatedArticles).toContain(a.slug);
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      const rows = runtimeSearchRows(graph.guideArticles, graph.places, [a.slug], locale);
      expect(matchRuntimeSearch(rows, [a.title[locale]])[0].url).toBe(`/${locale}/guide/${a.slug}`);
    }
  });
  it("changes an image in all guides and rolls back by selecting the old snapshot", () => {
    const old = fixture();
    const next = structuredClone(old);
    const place = structuredClone(places.find(p => p.id === old.publications[0].article.relatedPlaces![0])!);
    place.image = `/guide-media/${"a".repeat(64)}.webp`;
    next.publications[0].places.push(place);
    expect(mergeGuideSnapshot(guideArticles, places, contentCollections, next).places.find(p => p.id === place.id)?.image).toBe(place.image);
    expect(mergeGuideSnapshot(guideArticles, places, contentCollections, old).places.find(p => p.id === place.id)?.image).not.toBe(place.image);
  });
  it("rejects bad locales, duplicate guides, unknown relations and unsafe media", () => {
    const missing = fixture(); delete (missing.publications[0].article.title as Partial<Record<string, string>>).uk;
    expect(() => validateSnapshot(missing)).toThrow();
    const duplicate = fixture(); duplicate.publications.push(duplicate.publications[0]);
    expect(() => validateSnapshot(duplicate)).toThrow();
    const unknown = fixture(); unknown.publications[0].article.relatedPlaces = ["nonexistent"];
    expect(() => mergeGuideSnapshot(guideArticles, places, contentCollections, unknown)).toThrow("Unknown place");
    const media = fixture(); media.publications[0].article.coverImage = "https://attacker.invalid/image.png";
    expect(() => validateSnapshot(media)).toThrow("Unsupported publication media");
    const category = fixture(); category.publications[0].article.category = "invalid" as never;
    expect(() => validateSnapshot(category)).toThrow("category");
    const labels = fixture(); labels.publications[0].article.tags = undefined as never;
    expect(() => validateSnapshot(labels)).toThrow("labels");
    const badPlace = fixture(); badPlace.publications[0].places = [{ ...places[0], type: undefined } as never];
    expect(() => validateSnapshot(badPlace)).toThrow("Invalid place");
  });
  it("keeps bullets searchable and suppresses shared places by identity", () => {
    const snapshot = fixture(); const a = snapshot.publications[0].article;
    a.sections[0].bullets = [{ en: "uniquebullet", fr: "unique", it: "unico", uk: "унікальне" }];
    const graph = mergeGuideSnapshot(guideArticles, places, contentCollections, snapshot);
    const rows = runtimeSearchRows(graph.guideArticles, graph.places, [a.slug], "en");
    expect(matchRuntimeSearch(rows, ["uniquebullet"])[0].url).toBe(`/en/guide/${a.slug}`);
    const place = rows.find(r => r.placeId)!;
    expect(isRuntimeSearchReplacement(`/en/guide/other#place-${place.placeId}`, rows, [a.slug], "en")).toBe(true);
  });
  it("resolves a second runtime guide and edits shared places without stale copies", () => {
    const snapshot = fixture(); const first = snapshot.publications[0];
    first.article.id = first.article.slug = "runtime-first";
    const second = structuredClone(first); second.article.id = second.article.slug = "runtime-second";
    second.article.relatedArticles = ["runtime-first"];
    const place = structuredClone(places.find(p => p.id === first.article.relatedPlaces![0])!);
    first.places = [structuredClone(place)]; second.places = [structuredClone(place)];
    snapshot.publications.push(second);
    expect(() => mergeGuideSnapshot(guideArticles, places, contentCollections, snapshot)).not.toThrow();
    place.image = `/guide-media/${"b".repeat(64)}.webp`;
    setPublicationPlace(snapshot, "runtime-first", place);
    expect(second.places).toHaveLength(0);
    expect(mergeGuideSnapshot(guideArticles, places, contentCollections, snapshot).places.find(p => p.id === place.id)?.image).toBe(place.image);
  });
  it("keeps a place searchable when its old canonical guide drops the card", () => {
    const article = structuredClone(guideArticles.find(a => a.slug === "pharmacies-in-menton-and-nice-airport")!);
    const id = "pharmacie-lafayette-des-jardins";
    article.relatedPlaces = article.relatedPlaces?.filter(p => p !== id);
    for (const section of article.sections) section.relatedPlaceIds = section.relatedPlaceIds?.filter(p => p !== id);
    const graph = mergeGuideSnapshot(guideArticles, places, contentCollections, { version: 1, publications: [{ article, places: [], collections: [], sources: "Reviewed fixture" }] });
    const rows = runtimeSearchRows(graph.guideArticles, graph.places, [article.slug], "en");
    const replacement = rows.find(row => row.placeId === id);
    expect(replacement?.url).toContain("useful-numbers-emergency-contacts-menton#place-");
    expect(placeSharePath(id, "en", graph)).toBe(replacement?.url);
  });
  it("updates the visible primary gallery image without removing remaining images", () => {
    const place = { ...structuredClone(places[0]), image: "/images/old.jpg", images: ["/images/primary.jpg", "/images/second.jpg"] };
    const changed = replacePlacePrimaryImage(place, `/guide-media/${"c".repeat(64)}.webp`);
    expect(changed.images).toEqual([changed.image, "/images/second.jpg"]);
    expect(place.images[0]).toBe("/images/primary.jpg");
  });
});

vi.mock("@vercel/blob", () => ({ get: vi.fn(), put: vi.fn() }));
import { get, put } from "@vercel/blob";
import { activateGuideSnapshot, guideDigest, readGuideSnapshot } from "@/lib/guide-blob-store";
const response = (value: unknown, etag = "etag-1") => {
  const bytes = Buffer.from(JSON.stringify(value));
  return { statusCode: 200, stream: new ReadableStream({ start(c) { c.enqueue(bytes); c.close(); } }), blob: { size: bytes.length, etag } };
};
describe("Blob integrity and atomic activation", () => {
  beforeEach(() => vi.resetAllMocks());
  it("rejects a checksum mismatch", async () => {
    vi.mocked(get).mockResolvedValue(response(fixture()) as never);
    await expect(readGuideSnapshot("0".repeat(64))).rejects.toThrow("integrity");
  });
  it("uses origin reads and ETag compare-and-swap for activation", async () => {
    const snapshot = fixture(); const hash = guideDigest(JSON.stringify(snapshot));
    const old = { version: 1, revision: 1, hash, previousHash: null, requestId: "before" };
    const next = { ...old, revision: 2, previousHash: hash, requestId: "after" };
    vi.mocked(get).mockResolvedValueOnce(response(snapshot) as never).mockResolvedValueOnce(response(old) as never).mockResolvedValueOnce(response(next) as never);
    await expect(activateGuideSnapshot(hash, 1, "after")).resolves.toEqual(next);
    expect(put).toHaveBeenCalledWith("guides/v1/head.json", JSON.stringify(next), expect.objectContaining({ ifMatch: "etag-1", allowOverwrite: true, access: "private" }));
    expect(get).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ useCache: false }));
  });
  it("rejects stale revisions without a write", async () => {
    const snapshot = fixture(); const hash = guideDigest(JSON.stringify(snapshot));
    vi.mocked(get).mockResolvedValueOnce(response(snapshot) as never).mockResolvedValueOnce(response({ version: 1, revision: 2, hash, previousHash: null, requestId: "other" }) as never);
    await expect(activateGuideSnapshot(hash, 1, "stale")).rejects.toThrow("revision changed");
    expect(put).not.toHaveBeenCalled();
  });
  it("retries the latest activation idempotently without writing", async () => {
    const snapshot = fixture(); const hash = guideDigest(JSON.stringify(snapshot));
    const head = { version: 1, revision: 1, hash, previousHash: null, requestId: "same" };
    vi.mocked(get).mockResolvedValueOnce(response(snapshot) as never).mockResolvedValueOnce(response(head) as never);
    await expect(activateGuideSnapshot(hash, 0, "same")).resolves.toEqual(head);
    expect(put).not.toHaveBeenCalled();
  });
});
