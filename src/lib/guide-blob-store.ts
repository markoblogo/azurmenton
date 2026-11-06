import { createHash } from "node:crypto";
import { get, put } from "@vercel/blob";
import { validHash, validateSnapshot, type GuideHead, type GuideSnapshot } from "./guide-runtime-model";

const prefix = "guides/v1/";
export const guideDigest = (value: string | Uint8Array) => createHash("sha256").update(value).digest("hex");
export async function readGuideBlob(path: string, maxBytes = 16_000_000) {
  const result = await get(prefix + path, { access: "private", useCache: false, abortSignal: AbortSignal.timeout(15_000) });
  if (!result) return null;
  if (result.statusCode !== 200 || result.blob.size > maxBytes) throw Error("Invalid guide Blob size/status");
  const reader = result.stream.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > maxBytes) throw Error("Guide Blob exceeds limit");
      chunks.push(value);
    }
  } finally { await reader.cancel(); }
  return { bytes: Buffer.concat(chunks), etag: result.blob.etag };
}
export async function readGuideHead() {
  const result = await readGuideBlob("head.json", 4096);
  if (!result) return null;
  const head = JSON.parse(result.bytes.toString()) as GuideHead;
  if (head.version !== 1 || !Number.isSafeInteger(head.revision) || head.revision < 1 || !validHash(head.hash) || (head.previousHash !== null && !validHash(head.previousHash))) throw Error("Invalid guide publication head");
  return { head, etag: result.etag };
}
export async function readGuideSnapshot(hash: string) {
  if (!validHash(hash)) throw Error("Invalid guide revision hash");
  const result = await readGuideBlob(`snapshots/${hash}.json`);
  if (!result || guideDigest(result.bytes) !== hash) throw Error("Guide publication integrity failure");
  const snapshot = JSON.parse(result.bytes.toString()) as GuideSnapshot;
  validateSnapshot(snapshot);
  return snapshot;
}
export async function writeGuideSnapshot(snapshot: GuideSnapshot) {
  validateSnapshot(snapshot);
  const bytes = JSON.stringify(snapshot);
  if (Buffer.byteLength(bytes) > 16_000_000) throw Error("Guide snapshot too large");
  const hash = guideDigest(bytes);
  const path = `snapshots/${hash}.json`;
  const existing = await readGuideBlob(path);
  if (existing) {
    if (guideDigest(existing.bytes) !== hash) throw Error("Conflicting guide snapshot");
  } else await put(prefix + path, bytes, { access: "private", addRandomSuffix: false, contentType: "application/json" });
  return hash;
}
export async function activateGuideSnapshot(hash: string, expectedRevision: number, requestId: string) {
  if (!/^[\w.-]{1,80}$/.test(requestId)) throw Error("Invalid publication request ID");
  await readGuideSnapshot(hash);
  const current = await readGuideHead();
  if (current?.head.requestId === requestId) {
    if (current.head.hash !== hash) throw Error("Publication request ID conflict");
    return current.head;
  }
  if ((current?.head.revision ?? 0) !== expectedRevision) throw Error("Publication revision changed; inspect before retrying");
  const head: GuideHead = { version: 1, revision: expectedRevision + 1, hash, previousHash: current?.head.hash ?? null, requestId };
  await put(prefix + "head.json", JSON.stringify(head), { access: "private", addRandomSuffix: false, contentType: "application/json", cacheControlMaxAge: 60, ...(current ? { ifMatch: current.etag } : { allowOverwrite: false }) });
  const verified = await readGuideHead();
  if (verified?.head.hash !== hash || verified.head.revision !== head.revision) throw Error("Concurrent publication: inspect head");
  return head;
}
export async function storeGuideImage(bytes: Uint8Array) {
  const hash = guideDigest(bytes);
  const path = `media/${hash}.webp`;
  const existing = await readGuideBlob(path, 4_000_000);
  if (existing) {
    if (guideDigest(existing.bytes) !== hash) throw Error("Conflicting guide image");
  } else await put(prefix + path, Buffer.from(bytes), { access: "private", addRandomSuffix: false, contentType: "image/webp" });
  return `/guide-media/${hash}.webp`;
}
