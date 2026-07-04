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
          <article key={item.id} className="border border-[#dfd2b8] bg-[#f8f3ea] p-4">
            <h3 className={`serif-heading leading-tight text-[#173f36] ${compact ? "text-xl" : "text-2xl"}`}>{item.destination[locale]}</h3>
            <p className="mt-3 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[#b49353]">{labels.actions}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.actionLinks.map((action) => (
                <Link
                  key={action.url}
                  className="inline-flex min-h-9 items-center border border-[#173f36] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#173f36] hover:text-white"
                  href={action.url as Route}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={action.note[locale]}
                >
                  {action.label[locale]}
                </Link>
              ))}
            </div>
            <p className="mt-3 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[#b49353]">{labels.notes}</p>
            <div className="mt-3 grid gap-2">
              {item.options.slice(0, compact ? 1 : 2).map((option) => (
                <div key={`${item.id}-${option.mode}`} className="border-l-2 border-[#c6a66a] pl-3">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#173f36]">{transportModeLabels[option.mode][locale]} · {option.timeLabel[locale]}</p>
                  <p className="mt-1 text-xs leading-5 text-[#5c5044]">{option.note[locale]}</p>
                </div>
              ))}
            </div>
            {!compact ? <p className="mt-4 text-xs italic leading-5 text-[#71665b]">{item.practicalNote[locale]}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
