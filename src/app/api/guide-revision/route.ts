import { getRuntimeContent } from "@/lib/guide-runtime";
export async function GET() {
  const graph = await getRuntimeContent();
  return Response.json({ revision: graph.revision, guides: graph.runtimeSlugs, deployment: process.env.VERCEL_GIT_COMMIT_SHA ?? "local" }, { headers: { "Cache-Control": "no-store" } });
}
