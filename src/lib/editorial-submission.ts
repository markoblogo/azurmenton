import { correctionReasons } from "./editorial-context";
import { validateNewsletterInterest } from "./newsletter-interest";

export function validateEditorialSubmission(input: unknown) {
  if (!input || typeof input !== "object") return null;
  const value = input as Record<string, unknown>;
  if(value.type==="newsletter")return validateNewsletterInterest(value);
  const keys = ["type", "name", "email", "title", "date", "venue", "organiser", "source", "page", "message", "privacy", "subject", "reason"] as const;
  const data = Object.fromEntries(keys.map(key => [key, typeof value[key] === "string" ? value[key].trim() : ""])) as Record<typeof keys[number], string>;
  if (Object.values(data).some(v => v.length > 4000) || !["event", "correction"].includes(data.type) || !data.name || data.name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254 || data.message.length < 10 || data.privacy !== "accepted") return null;
  const httpsUrl = (v: string) => { try { const u = new URL(v); return u.protocol === "https:" && !u.username && !u.password; } catch { return false; } };
  if (data.type === "event" && (!data.title || !/^\d{4}-\d{2}-\d{2}$/.test(data.date) || !Number.isFinite(Date.parse(data.date)) || new Date(data.date).toISOString().slice(0, 10) !== data.date || !data.venue || !data.organiser || !httpsUrl(data.source))) return null;
  if (data.type === "correction" && (!httpsUrl(data.page) || new URL(data.page).hostname !== "azurmenton.com")) return null;
  if (data.subject.length > 200 || (data.reason && !correctionReasons.some(reason => reason === data.reason))) return null;
  if (data.type === "correction" && !data.reason) data.reason = "other";
  return data;
}
