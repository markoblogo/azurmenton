import { cache } from "react";
import { connection } from "next/server";
import { guideArticles } from "@/content/guide";
import { places } from "@/content/places";
import { contentCollections } from "@/content/content-map";
import { mergeGuideSnapshot } from "./guide-runtime-model";
import { readGuideHead, readGuideSnapshot } from "./guide-blob-store";

// React cache pins a single head for metadata and rendering within one request.
export const getRuntimeContent = cache(async () => {
  await connection();
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) return { guideArticles, places, contentCollections, revision: 0, runtimeSlugs: [] as string[] };
  const previewHash = !process.env.VERCEL ? process.env.GUIDE_RUNTIME_PREVIEW_HASH : undefined;
  if (previewHash) {
    const snapshot = await readGuideSnapshot(previewHash);
    return { ...mergeGuideSnapshot(guideArticles, places, contentCollections, snapshot), revision: 0, runtimeSlugs: snapshot.publications.map(p => p.article.slug) };
  }
  const current = await readGuideHead();
  if (!current) return { guideArticles, places, contentCollections, revision: 0, runtimeSlugs: [] as string[] };
  const snapshot = await readGuideSnapshot(current.head.hash);
  return { ...mergeGuideSnapshot(guideArticles, places, contentCollections, snapshot), revision: current.head.revision, runtimeSlugs: snapshot.publications.map(p => p.article.slug) };
});
