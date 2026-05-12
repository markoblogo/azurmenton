export const locales = ["en", "fr", "it", "uk"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Francais",
  it: "Italiano",
  uk: "Ukrainian",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
