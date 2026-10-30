import type { Locale } from "@/i18n/locales";

export const correctionReasons = ["closed", "hours", "address", "dates", "other"] as const;
export type EditorialContext = { page: string; subject: string };

export function editorialContext(page: string, subject: string): EditorialContext | null {
  if (page.length > 1000 || subject.length > 200) return null;
  try {
    const url = new URL(page);
    if (url.origin !== "https://azurmenton.com" || url.username || url.password) return null;
    if (!/^\/(en|fr|it|uk)\/(guide|events)(\/|$)/.test(url.pathname)) return null;
    url.search = "";
    return { page: url.href, subject: subject.trim() };
  } catch { return null; }
}

export function correctionHref(locale: Locale, path: string, subject: string): string {
  const context = editorialContext(`https://azurmenton.com${path}`, subject);
  if (!context) return `/${locale}/events#suggest-event`;
  // Fragment stays out of server logs, canonical URLs and analytics page paths.
  return `/${locale}/events#suggest-event?${new URLSearchParams({ page: context.page, subject: context.subject })}`;
}

export function correctionFromHash(hash: string): EditorialContext | null {
  if (!hash.startsWith("#suggest-event?") || hash.length > 4000) return null;
  const params = new URLSearchParams(hash.slice("#suggest-event?".length));
  return editorialContext(params.get("page") ?? "", params.get("subject") ?? "");
}
