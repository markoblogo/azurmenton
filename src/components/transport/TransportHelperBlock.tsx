import Link from "next/link";
import type { Route } from "next";
import { destinationTransport, transportModeLabels } from "@/content/transport";
import type { Locale } from "@/i18n/locales";

const copy = {
  en: { eyebrow: "Transport helper", title: "Check the route before you go", intro: "Open the current train, bus or station information before leaving Menton. These links are more reliable than a static timetable copied into the guide.", actions: "Useful links", notes: "Planning notes" },
  fr: { eyebrow: "Aide transport", title: "Verifiez le trajet avant de partir", intro: "Ouvrez les informations actuelles de train, bus ou gare avant de quitter Menton. Ces liens sont plus fiables qu'un horaire statique copie dans le guide.", actions: "Liens utiles", notes: "Notes pratiques" },
  it: { eyebrow: "Aiuto trasporti", title: "Controlla il percorso prima di partire", intro: "Apri le informazioni aggiornate su treni, bus o stazione prima di lasciare Mentone. Questi link sono piu affidabili di un orario statico copiato nella guida.", actions: "Link utili", notes: "Note pratiche" },
  uk: { eyebrow: "Транспортна підказка", title: "Перевірте маршрут перед виїздом", intro: "Відкрийте актуальну інформацію про потяги, автобуси або станцію перед виїздом з Ментона. Ці посилання надійніші за статичний розклад у гіді.", actions: "Корисні посилання", notes: "Нотатки для планування" },
} satisfies Record<Locale, Record<string, string>>;

const destinationThemes = {
  monaco: {
    card: "border-[#d8c28e] bg-[#fff8e7]",
    icon: "border-[#c6a66a] bg-[#f8ebc8] text-[#956f2d]",
    action: "border-[#c6a66a] bg-[#fff8e7] text-[#956f2d] shadow-[0_3px_0_#ead9ad] hover:bg-[#956f2d]",
  },
  nice: {
    card: "border-[#a8d6dc] bg-[#f2fbfb]",
    icon: "border-[#4ea8c0] bg-[#dff3f5] text-[#247d8b]",
    action: "border-[#4ea8c0] bg-[#effafb] text-[#247d8b] shadow-[0_3px_0_#c5e3e5] hover:bg-[#247d8b]",
  },
  ventimiglia: {
    card: "border-[#c9b0c9] bg-[#fbf4fa]",
    icon: "border-[#9f739e] bg-[#f1e4f0] text-[#80577e]",
    action: "border-[#9f739e] bg-[#fbf4fa] text-[#80577e] shadow-[0_3px_0_#dfc9de] hover:bg-[#80577e]",
  },
} as const;

type DestinationId = keyof typeof destinationThemes;

export function TransportHelperBlock({ locale, destinationIds = ["monaco", "nice", "ventimiglia"], compact = false }: { locale: Locale; destinationIds?: string[]; compact?: boolean }) {
  const labels = copy[locale];
  const items = destinationTransport.filter((item) => destinationIds.includes(item.id));

  if (!items.length) return null;

  return (
    <section className={`border border-[#dfd2b8] bg-[#fffaf0] ${compact ? "p-4" : "p-5 sm:p-6"}`}>
      {!compact ? (
        <>
          <p className="text-[0.64rem] font-bold uppercase tracking-[0.18em] text-[#b49353]">{labels.eyebrow}</p>
          <h2 className="mt-3 serif-heading text-3xl leading-none text-[#173f36]">{labels.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5c5044]">{labels.intro}</p>
        </>
      ) : null}
      <div className={`grid gap-3 ${compact ? "md:grid-cols-3" : "mt-5 md:grid-cols-3"}`}>
        {items.map((item) => (
          <article key={item.id} className={`border-2 ${destinationThemes[item.id as DestinationId]?.card ?? "border-[#dfd2b8] bg-[#f8f3ea]"} ${compact ? "grid gap-3 p-3" : "p-4"}`}>
            <div className="flex items-start gap-3">
              <DestinationIcon destinationId={item.id} />
              <div>
                <h3 className={`serif-heading leading-tight text-[#173f36] ${compact ? "text-xl" : "text-2xl"}`}>{item.destination[locale]}</h3>
                {compact ? (
                  <p className="mt-1 text-xs leading-5 text-[#5c5044]">{item.options[0]?.note[locale]}</p>
                ) : null}
              </div>
            </div>
            <p className={`${compact ? "sr-only" : "mt-3"} text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[#b49353]`}>{labels.actions}</p>
            <div className={compact ? "grid grid-cols-3 gap-2" : "flex flex-wrap gap-2"}>
              {item.actionLinks.map((action) => (
                <Link
                  key={action.url}
                  className={`group relative grid aspect-square place-items-center rounded-sm border-2 transition hover:-translate-y-0.5 hover:text-white hover:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f36] ${destinationThemes[item.id as DestinationId]?.action ?? "border-[#4ea8c0] bg-[#eaf6f7] text-[#216e78] shadow-[0_3px_0_#c5e3e5] hover:border-[#173f36] hover:bg-[#173f36]"} ${compact ? "w-full" : "h-12 w-12"}`}
                  href={action.url as Route}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${action.label[locale]}: ${action.note[locale]}`}
                >
                  <TransportActionIcon label={action.label.en} />
                  <span className="sr-only">{action.label[locale]}</span>
                  <span className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[calc(100%+0.45rem)] whitespace-nowrap border border-[#173f36] bg-[#173f36] px-2 py-1 text-[0.6rem] font-bold uppercase tracking-[0.08em] text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    {action.label[locale]}
                  </span>
                </Link>
              ))}
            </div>
            {!compact ? (
              <>
                <p className="mt-3 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[#b49353]">{labels.notes}</p>
                <div className="mt-3 grid gap-2">
                  {item.options.slice(0, 2).map((option) => (
                    <div key={`${item.id}-${option.mode}`} className="border-l-2 border-[#c6a66a] pl-3">
                      <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#173f36]">{transportModeLabels[option.mode][locale]} · {option.timeLabel[locale]}</p>
                      <p className="mt-1 text-xs leading-5 text-[#5c5044]">{option.note[locale]}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
            {!compact ? <p className="mt-4 text-xs italic leading-5 text-[#71665b]">{item.practicalNote[locale]}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function DestinationIcon({ destinationId }: { destinationId: string }) {
  const theme = destinationThemes[destinationId as DestinationId] ?? { icon: "border-[#c6a66a] bg-[#fffaf0] text-[#173f36]" };

  return (
    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-sm border-2 ${theme.icon}`} aria-hidden="true">
      {destinationId === "monaco" ? (
        <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m16 4 2 4 4.5.6-3.2 3.1.8 4.4-4.1-2.1-4.1 2.1.8-4.4-3.2-3.1L14 8l2-4Z" />
          <path d="M7 27V18h5v9M14 27V14h5v13M21 27V20h5v7M5 27h22" />
        </svg>
      ) : null}
      {destinationId === "nice" ? (
        <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="16" cy="10" r="4" />
          <path d="M16 3v2M16 15v2M9 10h2M21 10h2M11 5l1.5 1.5M21 15l-1.5-1.5M6 25c4-4 8-4 12 0s8 4 8 0M7 28h18" />
        </svg>
      ) : null}
      {destinationId === "ventimiglia" ? (
        <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 27h20M8 27V14l8-5 8 5v13M12 27V17h3v10M17 17h3v10M10 13h12" />
          <path d="M13 7h6M16 4v3" />
        </svg>
      ) : null}
      {!destinationThemes[destinationId as DestinationId] ? <TransportFallbackIcon /> : null}
    </span>
  );
}

function TransportFallbackIcon() {
  return (
    <span aria-hidden="true">
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4h12a2 2 0 0 1 2 2v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2Z" />
        <path d="M8 17 6 21" />
        <path d="m16 17 2 4" />
        <path d="M8 8h8" />
        <path d="M8 12h8" />
      </svg>
    </span>
  );
}

function TransportActionIcon({ label }: { label: string }) {
  const normalized = label.toLowerCase();
  if (normalized.includes("bus")) {
    return (
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="7" y="5" width="18" height="21" rx="3" />
        <path d="M7 16h18M11 10h10M11 21h.01M21 21h.01M10 26l-2 3M22 26l2 3" />
      </svg>
    );
  }
  if (normalized.includes("ter") || normalized.includes("station") || normalized.includes("sheet")) {
    return (
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 24h16M10 24V9l6-3 6 3v15M13 13h6M13 17h6M13 21h6" />
        <path d="M6 27h20" />
      </svg>
    );
  }
  return (
    <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 21h22M8 21V9h16v12M11 9V6h10v3M11 25h.01M21 25h.01" />
      <path d="M8 15h16" />
    </svg>
  );
}
