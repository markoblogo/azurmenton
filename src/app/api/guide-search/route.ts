import { getRuntimeContent } from "@/lib/guide-runtime";
import { runtimeSearchRows } from "@/lib/guide-runtime-search";
import { isLocale } from "@/i18n/locales";
export async function GET(request: Request) {
  const locale = new URL(request.url).searchParams.get("locale");
  if (!isLocale(locale ?? "")) return new Response(null, { status: 400 });
  const graph = await getRuntimeContent();
  return Response.json({ revision: graph.revision, slugs: graph.runtimeSlugs, rows: runtimeSearchRows(graph.guideArticles, graph.places, graph.runtimeSlugs, locale as "en" | "fr" | "it" | "uk") }, { headers: { "Cache-Control": "no-store" } });
}
