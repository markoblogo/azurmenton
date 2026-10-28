import { getEventDetail, getCanonicalEventDetailSlug } from "@/content/riviera-events";
import { eventCalendarFile } from "@/lib/event-calendar";
import { isLocale } from "@/i18n/locales";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = new URL(request.url).searchParams.get("locale") ?? "en";
  if (!isLocale(locale)) return new Response("Invalid locale", { status: 400 });
  const canonical = getCanonicalEventDetailSlug(slug);
  const event = canonical ? getEventDetail(canonical) : undefined;
  const sessionId = new URL(request.url).searchParams.get("session") ?? undefined;
  const body = event ? eventCalendarFile(event, locale, sessionId) : null;
  if (!body) return new Response("Confirmed event dates unavailable", { status: 404 });
  return new Response(body, { headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": `attachment; filename="${canonical}${sessionId ? `-${sessionId}` : ""}.ics"`, "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex" } });
}
