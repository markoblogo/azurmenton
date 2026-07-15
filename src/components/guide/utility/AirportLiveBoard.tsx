"use client";

import { useId, useState } from "react";

import type { AirportLiveBoardUtilityBlock } from "@/content/guide";
import { getAirportLiveBoards, type AirportLiveBoard as AirportBoard } from "@/content/utility/airports";
import type { Locale } from "@/i18n/locales";
import { bookingFunnelEvents, trackBookingFunnelEvent } from "@/lib/analytics";

type BoardType = "arrivals" | "departures";

const labels: Record<Locale, Record<"title" | "description" | "arrivals" | "departures" | "load" | "privacy" | "verify" | "embedUnavailable" | "transport" | "external" | "supported" | "externalOnly", string>> = {
  en: { title: "Official airport flight boards", description: "Compare practical airports for Menton and open official current flight information.", arrivals: "Arrivals", departures: "Departures", load: "Load official live board", privacy: "Loading this board connects to the airport's website.", verify: "Flight information can change. Verify important updates with your airline.", embedUnavailable: "This official board opens on the airport website.", transport: "Open Menton airport transfer guide", external: "Open official board", supported: "Official board available here", externalOnly: "Official external board" },
  fr: { title: "Tableaux de vols officiels", description: "Comparez les aeroports pratiques pour Menton et ouvrez les informations de vol officielles.", arrivals: "Arrivees", departures: "Departs", load: "Charger le tableau officiel", privacy: "Le chargement de ce tableau vous connecte au site de l'aeroport.", verify: "Les informations de vol peuvent changer. Verifiez les mises a jour importantes avec votre compagnie.", embedUnavailable: "Ce tableau officiel s'ouvre sur le site de l'aeroport.", transport: "Ouvrir le guide aeroport-Menton", external: "Ouvrir le tableau officiel", supported: "Tableau officiel disponible ici", externalOnly: "Tableau officiel externe" },
  it: { title: "Tabelloni voli ufficiali", description: "Confronta gli aeroporti pratici per Mentone e apri le informazioni ufficiali sui voli.", arrivals: "Arrivi", departures: "Partenze", load: "Carica il tabellone ufficiale", privacy: "Il caricamento del tabellone collega al sito dell'aeroporto.", verify: "Le informazioni sul volo possono cambiare. Verifica gli aggiornamenti importanti con la compagnia aerea.", embedUnavailable: "Questo tabellone ufficiale si apre sul sito dell'aeroporto.", transport: "Apri la guida aeroporto-Mentone", external: "Apri il tabellone ufficiale", supported: "Tabellone ufficiale disponibile qui", externalOnly: "Tabellone ufficiale esterno" },
  uk: { title: "Офіційні табло рейсів", description: "Порівняйте практичні аеропорти для Ментона та відкрийте офіційну актуальну інформацію про рейси.", arrivals: "Прильоти", departures: "Вильоти", load: "Завантажити офіційне табло", privacy: "Завантаження табло з'єднує вас із сайтом аеропорту.", verify: "Інформація про рейси може змінюватися. Важливі оновлення перевіряйте в авіакомпанії.", embedUnavailable: "Це офіційне табло відкривається на сайті аеропорту.", transport: "Відкрити гід з аеропорту до Ментона", external: "Відкрити офіційне табло", supported: "Офіційне табло доступне тут", externalOnly: "Офіційне зовнішнє табло" },
};

function localized(value: string | Record<Locale, string> | undefined, locale: Locale) {
  return typeof value === "string" ? value : value?.[locale] ?? value?.en;
}

function boardUrl(airport: AirportBoard, type: BoardType) {
  return type === "arrivals" ? airport.arrivalsUrl : airport.departuresUrl;
}

export function AirportLiveBoard({ block, locale }: { block: AirportLiveBoardUtilityBlock; locale: Locale }) {
  const airports = getAirportLiveBoards(block.airportIds);
  const [airportId, setAirportId] = useState(airports[0]?.id ?? "");
  const [boardType, setBoardType] = useState<BoardType>("arrivals");
  const [loaded, setLoaded] = useState(false);
  const tabId = useId();
  const copy = labels[locale];
  const airport = airports.find((candidate) => candidate.id === airportId) ?? airports[0];

  if (!airport) return null;

  const canEmbed = airport.embedMode === "supported";
  const url = boardUrl(airport, boardType);
  const props = { locale, airportCode: airport.code, boardType, embedMode: airport.embedMode, sourceGuideSlug: "airports-near-menton-live-flights" };
  const selectAirport = (nextId: string) => {
    setAirportId(nextId);
    setLoaded(false);
  };
  const selectBoardType = (nextType: BoardType) => {
    setBoardType(nextType);
    setLoaded(false);
  };
  const openTransportGuide = () => {
    trackBookingFunnelEvent(bookingFunnelEvents.airportTransportGuideClick, props);
  };

  return (
    <article className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-7">
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#b49353]">{airport.code}</p>
      <h2 className="mt-2 serif-heading text-3xl leading-none text-[#173f36]">{localized(block.title, locale) ?? copy.title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5c5044]">{localized(block.description, locale) ?? copy.description}</p>

      <div role="tablist" aria-label={copy.title} className="mt-5 flex flex-wrap gap-2">
        {airports.map((candidate) => (
          <button key={candidate.id} type="button" role="tab" aria-selected={candidate.id === airport.id} aria-controls={`${tabId}-${candidate.id}`} onClick={() => selectAirport(candidate.id)} className={`min-h-10 border px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f36] ${candidate.id === airport.id ? "border-[#173f36] bg-[#173f36] text-white" : "border-[#c6a66a] text-[#173f36] hover:bg-[#f3ead7]"}`}>
            {candidate.code}
          </button>
        ))}
      </div>

      <section id={`${tabId}-${airport.id}`} role="tabpanel" className="mt-5 border border-[#e6d9c6] bg-white/65 p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-[#173f36]">{airport.name[locale]}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#5c5044]">{airport.summary[locale]}</p>
          </div>
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#71665b]">{canEmbed ? copy.supported : copy.externalOnly}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={airport.name[locale]}>
          {(["arrivals", "departures"] as const).map((type) => (
            <button key={type} type="button" onClick={() => selectBoardType(type)} className={`min-h-10 border px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f36] ${boardType === type ? "border-[#173f36] bg-[#173f36] text-white" : "border-[#c6a66a] text-[#173f36] hover:bg-[#f3ead7]"}`}>
              {copy[type]}
            </button>
          ))}
        </div>

        {canEmbed && !loaded ? (
          <div className="mt-4 flex min-h-48 flex-col justify-center border border-dashed border-[#c6a66a] bg-[#f8f3ea] p-5">
            <p className="text-sm leading-6 text-[#5c5044]">{copy.privacy}</p>
            <button type="button" onClick={() => { trackBookingFunnelEvent(bookingFunnelEvents.airportBoardLoadClick, props); setLoaded(true); }} className="mt-4 inline-flex w-fit min-h-10 items-center border border-[#173f36] bg-[#173f36] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white hover:bg-[#245548] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f36]">
              {copy.load}
            </button>
          </div>
        ) : null}

        {canEmbed && loaded ? (
          <div className="mt-4 aspect-[4/3] min-h-[28rem] overflow-hidden border border-[#dfd2b8] bg-[#f8f3ea] sm:min-h-[34rem]">
            <iframe title={`${airport.name[locale]} ${copy[boardType].toLowerCase()}`} src={url} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="h-full w-full border-0" onLoad={() => trackBookingFunnelEvent(bookingFunnelEvents.airportBoardLoaded, props)} onError={() => trackBookingFunnelEvent(bookingFunnelEvents.airportBoardFailed, props)} />
          </div>
        ) : null}

        {!canEmbed ? <p className="mt-4 text-sm leading-6 text-[#5c5044]">{copy.embedUnavailable}</p> : null}
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={airport.arrivalsUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackBookingFunnelEvent(bookingFunnelEvents.airportArrivalsExternalClick, { ...props, boardType: "arrivals" })} className="inline-flex min-h-10 items-center border border-[#c6a66a] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f36]">{copy.arrivals}: {copy.external}</a>
          <a href={airport.departuresUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackBookingFunnelEvent(bookingFunnelEvents.airportDeparturesExternalClick, { ...props, boardType: "departures" })} className="inline-flex min-h-10 items-center border border-[#c6a66a] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f36]">{copy.departures}: {copy.external}</a>
          <a href={`/${locale}/guide/how-to-get-to-menton-from-nice-airport`} onClick={openTransportGuide} className="inline-flex min-h-10 items-center border border-[#173f36] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f36]">{copy.transport}</a>
        </div>
        <p className="mt-4 text-xs leading-5 text-[#71665b]">{airport.transportNote[locale]} {copy.verify}</p>
      </section>
    </article>
  );
}
