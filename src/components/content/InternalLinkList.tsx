import Link from "next/link";
import type { Route } from "next";
import { Card } from "@/components/ui/Card";
import type { RelatedLink } from "@/content/guide";
import type { Locale } from "@/i18n/locales";

export function InternalLinkList({
  links,
  locale,
  title = "Related planning guides",
}: {
  links: RelatedLink[];
  locale: Locale;
  title?: string;
}) {
  if (!links.length) {
    return null;
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-[#17313a]">{title}</h2>
      <ul className="mt-4 grid gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className="text-sm font-semibold text-[#0b6f8f] hover:text-[#075a75]"
              href={`/${locale}${link.href}` as Route}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
