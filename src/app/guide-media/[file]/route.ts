import { guideDigest, readGuideBlob } from "@/lib/guide-blob-store";

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!/^[a-f0-9]{64}\.webp$/.test(file)) return new Response(null, { status: 404 });
  const media = await readGuideBlob(`media/${file}`, 4_000_000);
  if (!media) return new Response(null, { status: 404 });
  if (guideDigest(media.bytes) !== file.slice(0, 64)) return new Response(null, { status: 503 });
  return new Response(new Uint8Array(media.bytes), { headers: { "Content-Type": "image/webp", "Cache-Control": "public, max-age=31536000, immutable", "X-Content-Type-Options": "nosniff" } });
}
