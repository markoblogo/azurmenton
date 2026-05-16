import Link from "next/link";
import type { Route } from "next";
import type { Locale } from "@/i18n/locales";
import { walkingCategoryLabels, walkingCategoryNotes, walkingCategoryOrder, walkingDistanceItems } from "@/content/walking-distances";

const labels = {
  en: { title: "Walking-distance map from the centre", intro: "Approximate walks from Promenade du Soleil / Casino Barrière. Use this as orientation, not a live navigation map.", place: "Place", time: "Walk", note: "Note", map: "Map", verify: "Check current details", quick: "Can you stay in Menton without a car?", quickAnswer: "Yes. If you stay in central Menton near the seafront, most daily plans can be done on foot: beaches, the old town, the market, cafés and the train station are close. A car is useful for hill villages, luggage-heavy trips or more remote gardens, but not essential for a beach-focused stay.", practical: "Practical walking notes", walkingVsTransport: "Walking vs public transport", walkingVsTransportText: "Walk for the seafront, old town, beaches and market. Use the train for Monaco, Nice and Ventimiglia. Consider bus or taxi for gardens, hill villages, late returns and luggage.", transportGuide: "Public transport in Menton", tips: ["Menton is linear and stretches along the sea.", "The promenade is the easiest orientation line.", "The old town climbs uphill, especially toward Saint-Michel and the cemetery viewpoint.", "Comfortable shoes are useful, and summer hill walks are easier in the morning or evening.", "During festivals or parades, access and traffic rules can change."], transport: "For farther gardens or Italy, check current transport information before travelling." },
  fr: { title: "Carte des distances a pied depuis le centre", intro: "Marches approximatives depuis Promenade du Soleil / Casino Barriere. Utilisez ces informations comme orientation, pas comme carte en direct.", place: "Lieu", time: "Marche", note: "Note", map: "Carte", verify: "Verifier les details", quick: "Peut-on sejourner a Menton sans voiture?", quickAnswer: "Oui. En logeant au centre de Menton pres du front de mer, la plupart des plans quotidiens se font a pied: plages, vieille ville, marche, cafes et gare sont proches. Une voiture aide pour les villages en hauteur, les bagages ou certains jardins plus eloignes, mais elle n'est pas indispensable pour un sejour plage.", practical: "Notes pratiques pour marcher", walkingVsTransport: "A pied ou transports publics", walkingVsTransportText: "Marchez pour le front de mer, la vieille ville, les plages et le marche. Prenez le train pour Monaco, Nice et Vintimille. Envisagez bus ou taxi pour jardins, villages en hauteur, retours tardifs et bagages.", transportGuide: "Transports publics a Menton", tips: ["Menton est lineaire et s'etire le long de la mer.", "La promenade est le repere le plus simple.", "La vieille ville monte, surtout vers Saint-Michel et le point de vue du cimetiere.", "Des chaussures confortables sont utiles; en ete, montez plutot matin ou soir.", "Pendant les festivals ou parades, acces et circulation peuvent changer."], transport: "Pour les jardins plus eloignes ou l'Italie, verifiez les informations de transport actuelles avant de partir." },
  it: { title: "Mappa delle distanze a piedi dal centro", intro: "Camminate approssimative da Promenade du Soleil / Casino Barrière. Usale come orientamento, non come navigazione live.", place: "Luogo", time: "A piedi", note: "Nota", map: "Mappa", verify: "Controlla dettagli", quick: "Si puo stare a Mentone senza auto?", quickAnswer: "Si. Se soggiorni nel centro di Mentone vicino al lungomare, la maggior parte dei piani quotidiani si fa a piedi: spiagge, centro storico, mercato, caffe e stazione sono vicini. L'auto aiuta per borghi collinari, bagagli o giardini piu lontani, ma non e essenziale per un soggiorno di mare.", practical: "Note pratiche per camminare", walkingVsTransport: "A piedi o trasporto pubblico", walkingVsTransportText: "Cammina per lungomare, centro storico, spiagge e mercato. Usa il treno per Monaco, Nizza e Ventimiglia. Valuta bus o taxi per giardini, borghi collinari, rientri tardi e bagagli.", transportGuide: "Trasporti pubblici a Mentone", tips: ["Mentone e lineare e si estende lungo il mare.", "Il lungomare e la linea di orientamento piu semplice.", "Il centro storico sale, soprattutto verso Saint-Michel e il belvedere del cimitero.", "Scarpe comode sono utili; in estate le salite sono meglio al mattino o alla sera.", "Durante festival o parate, accessi e traffico possono cambiare."], transport: "Per giardini piu lontani o l'Italia, controlla le informazioni di trasporto aggiornate prima di partire." },
  uk: { title: "Карта піших відстаней від центру", intro: "Орієнтовні прогулянки від Promenade du Soleil / Casino Barrière. Це схема для орієнтації, а не жива навігаційна карта.", place: "Місце", time: "Пішки", note: "Нотатка", map: "Мапа", verify: "Перевірити деталі", quick: "Чи можна жити в Ментоні без авто?", quickAnswer: "Так. Якщо зупинитися в центрі Ментона біля набережної, більшість щоденних планів можна робити пішки: пляжі, старе місто, ринок, кав'ярні й вокзал поруч. Авто корисне для гірських сіл, поїздок з великим багажем або віддаленіших садів, але не є необхідним для пляжного відпочинку.", practical: "Практичні нотатки для прогулянок", walkingVsTransport: "Пішки чи громадським транспортом", walkingVsTransportText: "Пішки зручно гуляти набережною, старим містом, пляжами й ринком. Потяг підходить для Монако, Ніцци та Вентімільї. Автобус або таксі корисні для садів, гірських сіл, пізнього повернення й багажу.", transportGuide: "Громадський транспорт у Ментоні", tips: ["Ментон лінійний і тягнеться вздовж моря.", "Набережна - найпростіша лінія орієнтації.", "Старе місто піднімається вгору, особливо до Saint-Michel і панорамного цвинтаря.", "Зручне взуття корисне; влітку підйоми краще планувати зранку або ввечері.", "Під час фестивалів або парадів доступ і правила руху можуть змінюватися."], transport: "Для віддаленіших садів або Італії перевіряйте актуальну транспортну інформацію перед поїздкою." },
};

const categoryIcons: Record<string, string> = {
  beaches: "~",
  "old-town": "^",
  "museums-market": "+",
  "gardens-nature": "*",
  "italy-border": "IT",
  "central-essentials": "0",
  "train-day-trips": "→",
};

export function WalkingDistanceGuide({ locale }: { locale: Locale }) {
  const copy = labels[locale];

  return (
    <div className="space-y-6">
      <section className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-7">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#b49353]">Quick answer</p>
        <h2 className="mt-3 serif-heading text-3xl leading-none text-[#173f36]">{copy.quick}</h2>
        <p className="mt-4 text-base leading-8 text-[#5c5044]">{copy.quickAnswer}</p>
      </section>

      <section className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-7">
        <div className="max-w-3xl">
          <h2 className="serif-heading text-4xl leading-none text-[#173f36]">{copy.title}</h2>
          <p className="mt-3 text-sm leading-7 text-[#5c5044]">{copy.intro}</p>
        </div>
        <nav className="mt-5 flex flex-wrap gap-2" aria-label="Walking categories">
          {walkingCategoryOrder.map((category) => (
            <a key={category} href={`#walk-${category}`} className="border border-[#dfd2b8] px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:border-[#173f36]">
              {walkingCategoryLabels[category][locale]}
            </a>
          ))}
        </nav>
      </section>

      <section className="grid gap-4 md:grid-cols-[0.42fr_1fr]">
        <div className="border border-[#173f36] bg-[#173f36] p-5 text-white sm:p-6">
          <h2 className="serif-heading text-3xl leading-none">{copy.walkingVsTransport}</h2>
          <Link className="mt-4 inline-flex border border-[#c6a66a] px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-white/10" href={`/${locale}/guide/public-transport-in-menton` as Route}>
            {copy.transportGuide}
          </Link>
        </div>
        <div className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-6">
          <p className="text-sm leading-7 text-[#5c5044]">{copy.walkingVsTransportText}</p>
        </div>
      </section>

      {walkingCategoryOrder.map((category) => {
        const items = walkingDistanceItems.filter((item) => item.category === category);
        return (
          <section id={`walk-${category}`} key={category} className="scroll-mt-24 border border-[#dfd2b8] bg-[#fffaf0]">
            <div className="grid gap-5 border-b border-[#dfd2b8] p-5 sm:p-6 lg:grid-cols-[0.32fr_1fr]">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-[#c6a66a] text-xs font-bold text-[#173f36]">{categoryIcons[category]}</span>
                <div>
                  <h3 className="serif-heading text-3xl leading-none text-[#173f36]">{walkingCategoryLabels[category][locale]}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#71665b]">{walkingCategoryNotes[category][locale]}</p>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {items.map((item) => (
                  <article key={item.id} className="border border-[#eadfc9] bg-white/60 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-semibold leading-snug text-[#173f36]">{item.name}</h4>
                        {item.address ? <p className="mt-1 text-xs text-[#71665b]">{item.address}</p> : null}
                      </div>
                      <span className="shrink-0 border border-[#c6a66a] px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#173f36]">{item.walkingTime}</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#5c5044]">{item.direction ? `${item.direction[locale]} · ` : ""}{item.note[locale]}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      {item.googleMapsUrl ? <Link className="text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#0b6f8f] underline-offset-4 hover:underline" href={item.googleMapsUrl as Route} target="_blank" rel="noopener noreferrer">{copy.map}</Link> : null}
                      {item.sourceStatus === "needs_verification" ? <span className="text-[0.64rem] italic text-[#71665b]">{copy.verify}</span> : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="grid gap-4 md:grid-cols-[0.45fr_1fr]">
        <div className="border border-[#dfd2b8] bg-[#173f36] p-5 text-white sm:p-6">
          <h2 className="serif-heading text-3xl leading-none">{copy.practical}</h2>
          <p className="mt-4 text-sm leading-7 text-[#e8dcc9]">{copy.transport}</p>
        </div>
        <div className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-6">
          <ul className="grid gap-3 text-sm leading-6 text-[#5c5044] md:grid-cols-2">
            {copy.tips.map((tip) => <li key={tip} className="border-l-2 border-[#c6a66a] pl-3">{tip}</li>)}
          </ul>
        </div>
      </section>
    </div>
  );
}
