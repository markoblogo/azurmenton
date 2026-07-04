import { destinationTransport, transportModeLabels } from "@/content/transport";
import type { Locale } from "@/i18n/locales";

const copy = {
  en: { eyebrow: "Transport helper", title: "Check the route before you go", intro: "These are planning notes, not live timetables. Always confirm current trains, buses and last returns before leaving Menton." },
  fr: { eyebrow: "Aide transport", title: "Verifiez le trajet avant de partir", intro: "Ces notes servent a preparer le trajet, ce ne sont pas des horaires en direct. Confirmez toujours trains, bus et derniers retours avant de quitter Menton." },
  it: { eyebrow: "Aiuto trasporti", title: "Controlla il percorso prima di partire", intro: "Sono note di pianificazione, non orari live. Verifica sempre treni, autobus e ultimi rientri prima di lasciare Mentone." },
  uk: { eyebrow: "Транспортна підказка", title: "Перевірте маршрут перед виїздом", intro: "Це нотатки для планування, а не live-розклад. Завжди перевіряйте потяги, автобуси й останнє повернення перед виїздом з Ментона." },
} satisfies Record<Locale, Record<string, string>>;

export function TransportHelperBlock({ locale, destinationIds = ["monaco", "nice", "ventimiglia"] }: { locale: Locale; destinationIds?: string[] }) {
  const labels = copy[locale];
  const items = destinationTransport.filter((item) => destinationIds.includes(item.id));

  if (!items.length) return null;

  return (
    <section className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-6">
      <p className="text-[0.64rem] font-bold uppercase tracking-[0.18em] text-[#b49353]">{labels.eyebrow}</p>
      <h2 className="mt-3 serif-heading text-3xl leading-none text-[#173f36]">{labels.title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5c5044]">{labels.intro}</p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="border border-[#dfd2b8] bg-[#f8f3ea] p-4">
            <h3 className="serif-heading text-2xl leading-tight text-[#173f36]">{item.destination[locale]}</h3>
            <div className="mt-4 grid gap-3">
              {item.options.slice(0, 2).map((option) => (
                <div key={`${item.id}-${option.mode}`} className="border-l-2 border-[#c6a66a] pl-3">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#173f36]">{transportModeLabels[option.mode][locale]} · {option.timeLabel[locale]}</p>
                  <p className="mt-1 text-xs leading-5 text-[#5c5044]">{option.note[locale]}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs italic leading-5 text-[#71665b]">{item.practicalNote[locale]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
