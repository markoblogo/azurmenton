"use client";
import { useState } from "react";
import { MapPinned, TriangleAlert } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import type { PlaceDay, PlanPlace } from "@/lib/trip-place-days";
import { dayGeography, dayNavigation, type TravelMode } from "@/lib/trip-navigation";
import { tripAgeChecks } from "@/lib/trip-age-checks";
import { PlaceOrderSuggestion } from "./PlaceOrderSuggestion";

const ageCopy = {
  en:{unknown:"Some children's ages are unknown. Add them in My trip if useful.",unverified:"Age rules are not verified for all these places. Check with the venue before booking for children.",below:"A published minimum age may not fit your group. Check before booking:"},
  fr:{unknown:"L'âge de certains enfants est inconnu. Vous pouvez le préciser dans Mon séjour.",unverified:"Les conditions d'âge de certains lieux ne sont pas vérifiées. Contactez les lieux avant de réserver pour les enfants.",below:"Un âge minimum publié peut ne pas convenir à votre groupe. Vérifiez avant de réserver :"},
  it:{unknown:"Alcune età dei bambini non sono indicate. Puoi aggiungerle in Il mio viaggio.",unverified:"I limiti d'età non sono verificati per tutti questi luoghi. Contatta le sedi prima di prenotare per bambini.",below:"Un'età minima pubblicata potrebbe non essere adatta al gruppo. Verifica prima di prenotare:"},
  uk:{unknown:"Вік деяких дітей невідомий. За бажанням додайте його в «Моїй поїздці».",unverified:"Вікові умови перевірені не для всіх місць. Уточніть їх у закладах перед бронюванням для дітей.",below:"Оприлюднений мінімальний вік може не підходити вашій групі. Перевірте перед бронюванням:"},
};

const labels = {
  en: { cities: "Stops in different cities: allow for transport and the return journey.", unknown: "Some cities are not recorded. Check the location of each stop.", info: "Visitor information to check", mode: "Travel mode", walking: "Walking", driving: "Driving", transit: "Public transport", open: "Open in Google Maps", part: "Stops", missing: "A complete map link needs reviewed coordinates for every stop. Open the place cards to check locations.", caution: "The map opens only when you choose a link. It receives these stop coordinates, not trip dates or group details. Check access and the suggested journey; this is not an optimised or step-free route.", one: "Add a second stop to open a route." },
  fr: { cities: "Étapes dans plusieurs villes : prévoyez les transports et le retour.", unknown: "Certaines villes ne sont pas renseignées. Vérifiez chaque lieu.", info: "Informations de visite à vérifier", mode: "Mode de transport", walking: "À pied", driving: "En voiture", transit: "Transports en commun", open: "Ouvrir dans Google Maps", part: "Étapes", missing: "Le lien complet nécessite des coordonnées vérifiées pour chaque étape. Consultez les fiches des lieux.", caution: "La carte ne s'ouvre qu'au clic. Elle reçoit les coordonnées, pas les dates ni la composition du groupe. Vérifiez l'accès et le trajet proposé ; ce parcours n'est ni optimisé ni garanti sans marches.", one: "Ajoutez une deuxième étape pour ouvrir un trajet." },
  it: { cities: "Tappe in città diverse: considera i trasporti e il ritorno.", unknown: "Alcune città non sono indicate. Verifica ogni luogo.", info: "Informazioni di visita da verificare", mode: "Mezzo di trasporto", walking: "A piedi", driving: "In auto", transit: "Trasporto pubblico", open: "Apri in Google Maps", part: "Tappe", missing: "Il collegamento completo richiede coordinate verificate per ogni tappa. Controlla le schede dei luoghi.", caution: "La mappa si apre solo al clic. Riceve le coordinate, non le date o i dettagli del gruppo. Verifica accesso e percorso; non è un itinerario ottimizzato né garantito senza scale.", one: "Aggiungi una seconda tappa per aprire un percorso." },
  uk: { cities: "Зупинки в різних містах: залиште час на транспорт і повернення.", unknown: "Для деяких місць місто не зазначене. Перевірте кожну зупинку.", info: "Умови відвідування для перевірки", mode: "Спосіб пересування", walking: "Пішки", driving: "Автомобілем", transit: "Громадський транспорт", open: "Відкрити в Google Maps", part: "Зупинки", missing: "Для повного посилання потрібні перевірені координати кожної зупинки. Перегляньте картки місць.", caution: "Карта відкривається лише після натискання. Вона отримує координати, а не дати чи склад групи. Перевірте доступ і запропонований шлях: маршрут не оптимізований і не гарантовано без сходів.", one: "Додайте другу зупинку, щоб відкрити маршрут." },
};

export function DayPlanChecks({ day, places, locale, hasCar, childCount=0, childAges, applyOrder }: { day: PlaceDay; places: PlanPlace[]; locale: Locale; hasCar: boolean; childCount?: number; childAges?: (number|null)[]; applyOrder?:(before:string[],after:string[])=>boolean }) {
  const c = labels[locale];
  const [mode, setMode] = useState<TravelMode>(hasCar ? "driving" : "walking");
  const geography = dayGeography(day, places);
  const links = dayNavigation(day, places, mode);
  const info = day.placeIds.flatMap(id => { const place = places.find(item => item.id === id); return place?.visitorInfo ? [place] : []; });
  const age=tripAgeChecks(childCount,childAges,day.placeIds.flatMap(id=>{const place=places.find(item=>item.id===id);return place?[place]:[{id,title:id,href:""}];}));
  return <div className="mt-4 min-w-0 space-y-3 text-sm leading-6" data-day-plan-checks>
    {childCount>0 ? <div className="space-y-2 border-l-2 border-[#b88e43] pl-3 text-[#765621]" data-child-age-checks>{age.unknownAges ? <p>{ageCopy[locale].unknown}</p>:null}{age.unverifiedPlaces.length ? <p>{ageCopy[locale].unverified}</p>:null}{age.belowMinimum.length ? <p>{ageCopy[locale].below} {age.belowMinimum.map(id=>places.find(place=>place.id===id)?.title).join(" · ")}</p>:null}</div>:null}
    {geography.cities.length > 1 ? <p className="flex items-start gap-2 text-[#765621]"><TriangleAlert aria-hidden="true" className="mt-1 size-4 shrink-0" /><span>{c.cities} {geography.cities.join(" · ")}</span></p> : null}
    {geography.unknown ? <p className="text-[#765621]">{c.unknown}</p> : null}
    {info.length ? <details><summary className="min-h-11 cursor-pointer py-2 font-semibold">{c.info}</summary><ul className="space-y-2">{info.map(place => <li key={place.id}><a href={place.href} className="font-semibold underline">{place.title}</a>: {place.visitorInfo}</li>)}</ul></details> : null}
    <label className="block max-w-64">{c.mode}<select value={mode} onChange={event => setMode(event.target.value as TravelMode)} className="mt-1 block min-h-11 w-full border border-[#9bb7b5] bg-white px-3 py-2 text-base">{(["walking", "driving", "transit"] as const).map(value => <option key={value} value={value}>{c[value]}</option>)}</select></label>
    {mode==="walking"&&applyOrder?<PlaceOrderSuggestion day={day} places={places} locale={locale} apply={applyOrder} />:null}
    {links.length ? <div className="flex flex-wrap gap-3">{links.map(link => <a key={link.from} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 border border-[#9bb7b5] px-3 py-2 font-semibold text-[#155b6c]"><MapPinned aria-hidden="true" className="size-5 shrink-0" />{c.open}{links.length > 1 ? ` · ${c.part} ${link.from}–${link.to}` : ""}</a>)}</div> : <p>{day.placeIds.length < 2 ? c.one : c.missing}</p>}
    {links.length ? <p className="text-[#586660]">{c.caution}</p> : null}
  </div>;
}
