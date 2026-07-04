import type { Locale } from "@/i18n/locales";

export type LocalizedText = Record<Locale, string>;
export type GuestPerkVisibility = "guest_only" | "public";

export type GuestPerk = {
  id: string;
  partnerId: string;
  title: LocalizedText;
  description: LocalizedText;
  validFrom?: string;
  validUntil?: string;
  voucherCode?: string;
  visibility: GuestPerkVisibility;
  requiresBooking: boolean;
  terms?: LocalizedText;
};

const t = (en: string, fr = en, it = en, uk = en): LocalizedText => ({ en, fr, it, uk });

export const guestPerks: GuestPerk[] = [
  {
    id: "example-welcome-sample",
    partnerId: "example-menton-producer",
    title: t("Draft welcome sample"),
    description: t("Placeholder guest-only sample for future validation. Not displayed publicly."),
    visibility: "guest_only",
    requiresBooking: true,
    terms: t("Draft placeholder only. Details must be confirmed before guest use."),
  },
];
