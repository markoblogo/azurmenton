import Link from "next/link";
import type { Route } from "next";
import { MessageSquareWarning } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import { correctionHref } from "@/lib/editorial-context";

const labels = { en: "Report a change", fr: "Signaler un changement", it: "Segnala una modifica", uk: "Повідомити про зміну" };

export function ReportChangeLink({ locale, path, title }: { locale: Locale; path: string; title: string }) {
  return <Link prefetch={false} href={correctionHref(locale, path, title) as Route} className="mt-3 inline-flex min-h-11 items-center gap-2 py-2 text-sm text-[#155b6c] underline underline-offset-4"><MessageSquareWarning aria-hidden="true" className="size-4 shrink-0" />{labels[locale]}</Link>;
}
