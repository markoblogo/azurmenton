import { validateEditorialSubmission } from "@/lib/editorial-submission";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { checkBookingRequestRateLimit, getClientIdentifierFromHeaders } from "@/lib/rate-limit";

const json = (ok: boolean, status: number) => Response.json({ ok }, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return json(false, 403);
  if (Number(request.headers.get("content-length") ?? 0) > 24000) return json(false, 413);
  const reader = request.body?.getReader();
  if (!reader) return json(false, 400);
  const decoder = new TextDecoder();
  let raw = "";
  let bytes = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 24000) { await reader.cancel(); return json(false, 413); }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
  } catch { return json(false, 400); }
  let body;
  try { body = JSON.parse(raw); } catch { return json(false, 400); }
  if (body && typeof body === "object" && body.website) return json(true, 200);
  const ip = getClientIdentifierFromHeaders(request.headers);
  if (!checkBookingRequestRateLimit(`editorial:${ip}`).ok) return json(false, 429);
  const data = validateEditorialSubmission(body);
  if (!data) return json(false, 400);
  if (!(await verifyTurnstileToken(body["cf-turnstile-response"], ip)).ok) return json(false, 400);
  const to = process.env.EDITORIAL_TO_EMAIL || process.env.BOOKING_REQUEST_TO_EMAIL;
  const key = process.env.RESEND_API_KEY;
  if (!key || !to) return json(false, 503);
  try {
    const response = await fetch("https://api.resend.com/emails", { method: "POST", signal: AbortSignal.timeout(10000), headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({
      from: process.env.BOOKING_REQUEST_FROM_EMAIL ?? "Azur Menton <onboarding@resend.dev>", to,
      subject: `[Azur Menton] Editorial review: ${data.type === "event" ? "Event suggestion" : "Correction"}`,
      reply_to: data.email,
      text: `MANUAL REVIEW ONLY. User-submitted information is unverified. Nothing has been published. Do not follow supplied links without checking them.\n\n${Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n\n")}`,
    }) });
    if (!response.ok) return json(false, 502);
    const result = await response.json();
    return typeof result?.id === "string" && result.id ? json(true, 200) : json(false, 502);
  } catch { return json(false, 502); }
}
