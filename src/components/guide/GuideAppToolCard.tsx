import Link from "next/link";
import type { Route } from "next";
import type { LocalizedGuideAppTool } from "@/content/guide";
import type { Locale } from "@/i18n/locales";
import { GuideVisual } from "@/components/guide/GuideVisual";

const labels = {
  en: { app: "App", useFor: "Use for", bestFor: "Best for", ios: "iOS", android: "Android" },
  fr: { app: "Application", useFor: "Utilite", bestFor: "Ideal pour", ios: "iOS", android: "Android" },
  it: { app: "App", useFor: "Serve per", bestFor: "Ideale per", ios: "iOS", android: "Android" },
  uk: { app: "Застосунок", useFor: "Для чого", bestFor: "Найкраще для", ios: "iOS", android: "Android" },
};

export function GuideAppToolCard({ tool, locale }: { tool: LocalizedGuideAppTool; locale: Locale }) {
  const copy = labels[locale];

  return (
    <article className="overflow-hidden border border-[#dfd2b8] bg-[#fffaf0]">
      <GuideVisual
        image={tool.image}
        imageAlt={tool.imageAlt}
        locale={locale}
        theme={tool.visualTheme ?? "transport"}
        label={copy.app}
        className="aspect-[4/1.65]"
        expandable={Boolean(tool.image)}
      />
      <div className="p-5">
        <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#b49353]">{copy.app}</p>
        <h3 className="mt-2 serif-heading text-xl leading-tight text-[#173f36]">{tool.name}</h3>
        <p className="mt-3 text-sm leading-6 text-[#5c5044]">
          <span className="font-semibold text-[#173f36]">{copy.useFor}: </span>
          {tool.useFor}
        </p>
        <p className="mt-2 text-xs leading-5 text-[#71665b]">
          <span className="font-bold uppercase tracking-[0.12em] text-[#173f36]">{copy.bestFor}: </span>
          {tool.bestFor}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {tool.iosUrl ? (
            <Link className="inline-flex min-h-10 items-center justify-center border border-[#c6a66a] px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]" href={tool.iosUrl as Route} target="_blank" rel="noopener noreferrer">
              {copy.ios}
            </Link>
          ) : null}
          {tool.androidUrl ? (
            <Link className="inline-flex min-h-10 items-center justify-center border border-[#c6a66a] px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]" href={tool.androidUrl as Route} target="_blank" rel="noopener noreferrer">
              {copy.android}
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
