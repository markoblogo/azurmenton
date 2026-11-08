import { createHash, timingSafeEqual } from "node:crypto";
import sharp from "sharp";
import { guideArticles } from "@/content/guide";
import { places } from "@/content/places";
import { contentCollections } from "@/content/content-map";
import * as blob from "./guide-blob-store";
import { mergeGuideSnapshot, replacePlacePrimaryImage, setPublicationPlace, validHash, validateSnapshot, type GuidePublication, type GuideSnapshot } from "./guide-runtime-model";

class InputError extends Error {}
const hash = (value: string) => createHash("sha256").update(value).digest();
const response = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
function ensure(ok: unknown, message: string): asserts ok { if (!ok) throw new InputError(message); }
const validateGraph = (snapshot: GuideSnapshot) => {
  try { return mergeGuideSnapshot(guideArticles, places, contentCollections, snapshot); }
  catch { throw new InputError("Invalid publication graph"); }
};
async function boundedJson(request: Request) {
  ensure(request.headers.get("content-type")?.split(";")[0] === "application/json", "JSON required");
  const reader = request.body?.getReader();
  ensure(reader, "Body required");
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.length;
      ensure(size <= 4_000_000, "Request exceeds 4 MB");
      chunks.push(value);
    }
  } finally { await reader.cancel(); reader.releaseLock(); }
  try { return JSON.parse(Buffer.concat(chunks).toString()); }
  catch { throw new InputError("Invalid JSON"); }
}
async function imageBytes(asset: { sha256?: string; base64?: string }) {
  ensure(asset && validHash(asset.sha256) && typeof asset.base64 === "string", "Image hash and bytes required");
  const bytes = Buffer.from(asset.base64, "base64");
  ensure(bytes.length > 12 && bytes.length <= 2_500_000 && bytes.toString("base64") === asset.base64 && blob.guideDigest(bytes) === asset.sha256, "Image integrity failure");
  ensure(bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP", "WebP required");
  try {
    const info = await sharp(bytes, { limitInputPixels: 8192 * 8192 }).metadata();
    ensure(info.format === "webp" && info.width && info.width <= 1680 && info.height && info.height <= 8192 && (info.pages ?? 1) === 1, "Invalid image dimensions");
  } catch { throw new InputError("Invalid WebP image"); }
  return bytes;
}

export function createGuidePublisher({ store = blob, token = process.env.GUIDE_PUBLISH_TOKEN, environment = process.env.VERCEL_ENV ?? "local" } = {}) {
  return async (request: Request) => {
    if (!token || token.length < 32 || !["local", "production"].includes(environment)) return response({ error: "Publisher disabled" }, 503);
    if (!timingSafeEqual(hash(request.headers.get("authorization") ?? ""), hash(`Bearer ${token}`))) return response({ error: "Unauthorized" }, 401);
    const start = Date.now();
    try {
      if (request.method === "GET") {
        const current = await store.readGuideHead();
        const snapshot = current ? await store.readGuideSnapshot(current.head.hash) : { version: 1 as const, publications: [] };
        return response({ head: current?.head ?? null, snapshot });
      }
      if (request.method !== "POST") return response({ error: "Method not allowed" }, 405);
      const command = await boundedJson(request);
      ensure(command && typeof command === "object", "Command required");
      ensure(["stage", "image", "activate", "rollback"].includes(command.action), "Unknown action");
      ensure(Number.isSafeInteger(command.expectedRevision) && command.expectedRevision >= 0, "Expected revision required");
      if (["activate", "rollback"].includes(command.action)) {
        ensure(validHash(command.hash) && typeof command.requestId === "string" && /^[\w.-]{1,80}$/.test(command.requestId), "Hash and stable request ID required");
        const snapshot = await store.readGuideSnapshot(command.hash);
        validateGraph(snapshot);
        // The store handles latest-request idempotency before its conditional head write.
        const head = await store.activateGuideSnapshot(command.hash, command.expectedRevision, command.requestId);
        return response({ status: "ACTIVE", head, durationMs: Date.now() - start });
      }
      const current = await store.readGuideHead();
      if ((current?.head.revision ?? 0) !== command.expectedRevision) return response({ error: "Revision changed; inspect status" }, 409);
      const snapshot: GuideSnapshot = structuredClone(current ? await store.readGuideSnapshot(current.head.hash) : { version: 1, publications: [] });
      if (command.action === "stage") {
        const publication: GuidePublication = command.publication;
        try { validateSnapshot({ version: 1, publications: [publication] }); }
        catch { throw new InputError("Invalid publication"); }
        const previous = snapshot.publications.find(p => p.article.slug === publication.article.slug);
        publication.places = [...(previous?.places ?? []).filter(p => !publication.places.some(next => next.id === p.id)), ...publication.places];
        snapshot.publications = snapshot.publications.filter(p => p.article.slug !== publication.article.slug);
        snapshot.publications.push(publication);
        for (const place of [...publication.places]) setPublicationPlace(snapshot, publication.article.slug, place);
        validateGraph(snapshot);
        if (command.asset) publication.article.coverImage = await store.storeGuideImage(await imageBytes(command.asset));
      } else {
        const publication = snapshot.publications.find(p => p.article.slug === command.slug);
        ensure(publication, "Runtime guide required");
        const graph = validateGraph(snapshot);
        if (command.place) {
          const linked = new Set([...(publication.article.relatedPlaces ?? []), ...publication.article.sections.flatMap(s => s.relatedPlaceIds ?? [])]);
          const place = graph.places.find(p => p.id === command.place);
          ensure(place && linked.has(command.place), "Place not linked to guide");
          const visible = place.images?.length ? place.images[0] : place.image;
          if ((visible ?? null) !== command.expectedImage) return response({ error: "Image changed; inspect status" }, 409);
          const image = await store.storeGuideImage(await imageBytes(command.asset));
          setPublicationPlace(snapshot, command.slug, replacePlacePrimaryImage(place, image));
        } else {
          if ((publication.article.coverImage ?? null) !== command.expectedImage) return response({ error: "Image changed; inspect status" }, 409);
          publication.article.coverImage = await store.storeGuideImage(await imageBytes(command.asset));
        }
      }
      validateGraph(snapshot);
      const digest = await store.writeGuideSnapshot(snapshot);
      return response({ status: "STAGED", hash: digest, expectedRevision: command.expectedRevision, durationMs: Date.now() - start });
    } catch (error) {
      if (error instanceof InputError) return response({ error: error.message }, 400);
      if (error instanceof Error && /revision changed|Concurrent publication|request ID conflict|precondition/i.test(error.message)) return response({ error: "Publication conflict; inspect status" }, 409);
      return response({ error: "Storage unavailable; inspect status and retain request ID" }, 503);
    }
  };
}
