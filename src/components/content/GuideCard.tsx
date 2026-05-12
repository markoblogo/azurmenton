import Link from "next/link";
import type { Route } from "next";
import { Card } from "@/components/ui/Card";
import type { GuidePageContent } from "@/content/guide";
import type { Locale } from "@/i18n/locales";

export function GuideCard({ page, locale }: { page: GuidePageContent; locale: Locale }) {
  return (
    <Card className="p-6 transition hover:-translate-y-0.5 hover:border-[#0b6f8f]">
      <h2 className="text-xl font-semibold text-[#17313a]">
        <Link href={`/${locale}/guide/${page.slug}` as Route}>{page.title}</Link>
      </h2>
      <p className="mt-3 text-sm leading-6 text-[#5c5044]">{page.intro}</p>
      <Link
        className="mt-5 inline-flex text-sm font-semibold text-[#0b6f8f] hover:text-[#075a75]"
        href={`/${locale}/guide/${page.slug}` as Route}
      >
        Read guide
      </Link>
    </Card>
  );
}
