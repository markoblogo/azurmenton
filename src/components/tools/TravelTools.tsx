import Link from "next/link";
import type { Route } from "next";
import { AirportLiveBoard } from "@/components/guide/utility/AirportLiveBoard";
import { LocalRadioBlock } from "@/components/guide/utility/LocalRadioBlock";
import { MarineConditionsBlock } from "@/components/guide/utility/MarineConditionsBlock";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { WeatherWidget } from "@/components/weather/WeatherWidget";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getGuideArticle } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { destinationTransport, transportModeLabels } from "@/content/transport";
import {
  getTravelTool,
  getTravelToolSources,
  getTravelToolsForGuide,
  localizeText,
  travelToolCategories,
  travelToolSectionCopy,
  type TravelTool,
  type TravelToolMetricStatus,
  type TravelToolSlug,
} from "@/content/travel-tools";
import type { Locale } from "@/i18n/locales";
import { getEuroReferenceRates } from "@/lib/currency";
import { absoluteUrl, localizedPath } from "@/lib/seo";
import { getMentonRightNow, weatherLabel } from "@/lib/weather";
import { breadcrumbJsonLd } from "@/lib/structured-data";

const ui = {
  en: {
    weather: "Weather",
    sea: "Sea",
    wind: "Wind",
    uv: "UV",
    airQuality: "Air quality",
    feelsLike: "Feels like",
    humidity: "Humidity",
    windGusts: "Wind gusts",
    uvMax: "UV max",
    waterQuality: "Water quality",
    officialChecks: "Official checks",
    officialBathingPortal: "Official French bathing-water portal",
    flights: "Flights",
    officialBoards: "Official boards",
    niceAirportFirst: "Nice airport first",
    transport: "Transport",
    trainBusLinks: "Train + bus links",
    routeShortcuts: "Official route shortcuts",
    driving: "Driving",
    parkingEv: "Parking + EV",
    noFakeParking: "Static fallback, no fake live spaces",
    services: "Services",
    taxiToiletsBikes: "Taxi + toilets + bikes",
    verifiedUtilityLayer: "Static verified utility layer",
    safety: "Safety",
    emergencyNumbers: "112 / 15 / 17 / 18",
    warningLinks: "Official warning links",
    radio: "Radio",
    localStreams: "Local streams",
    playAfterInteraction: "Play after user interaction",
    guides: "Guides",
    drivingTitle: "Driving and parking around Menton",
    drivingText: "Separate private guest parking from public fallback parking. Treat EV points as practical station data, not guaranteed live availability.",
    trafficMap: "Traffic map",
    localServicesTitle: "Local services that save time",
    localServicesText: "For live taxi dispatch, use official or tourism-listed numbers. For toilets, pharmacies and bike options, treat this as a curated practical layer.",
    mentonStationTaxi: "Menton station taxi",
    niceAirportTaxi: "Nice airport taxi",
    monacoTaxi: "Monaco taxi service",
    drinkingFountains: "Drinking fountains",
    drinkingFountainsText: "No reliable curated drinking-fountain registry is published in the repo yet. This stays an intentional gap rather than pretending every public fountain is potable.",
    openMap: "Open useful places map",
    emergencyTitle: "Emergency numbers",
    emergencyText: "This page is not an emergency service. Call the official number directly when you need urgent help.",
    euroEmergency: "European emergency number",
    medicalEmergency: "Medical emergency in France",
    police: "Police in France",
    fire: "Fire brigade in France",
    smsEmergency: "SMS/app emergency access in France",
    italyEmergency: "Cross-border emergency number in Italy",
    wildfireRisk: "Wildfire risk",
    wildfireTitle: "Official Meteo-France forest vigilance",
    wildfireText: "Use the official warning page rather than a site-generated risk score.",
    severeWeather: "Severe weather",
    severeWeatherTitle: "Official weather vigilance",
    severeWeatherText: "Check official warning levels before hikes, beach days or longer drives.",
    beachesTitle: "Official bathing water quality",
    beachesText: "For Menton beach analysis, use the French Ministry bathing-water portal. It is better than pretending we hold a perfect local live quality feed.",
    openWaterMap: "Open official water quality map",
    alpesBathingSites: "Alpes-Maritimes bathing sites",
    beachFlags: "Beach flags",
    beachFlagsText: "Check the flag displayed at the beach when no reliable timestamped feed exists.",
    jellyfish: "Jellyfish",
    jellyfishText: "No report is not the same as no jellyfish. Treat unofficial reports cautiously.",
    tide: "Tide",
    tideText: "Mediterranean tidal range here is limited, so tide stays a secondary note rather than a headline tool.",
    eurReference: "EUR reference conversion",
    eurText: "France, Monaco and Italy use the euro. This tool uses reference rates for planning only; your bank or card rate can differ.",
    checkCurrency: "Check",
    referenceDate: "Reference date",
    ratesUnavailable: "Reference rates temporarily unavailable.",
    uahNote: "UAH may be unavailable in the ECB reference feed; compare with your card provider when needed.",
  },
  fr: {
    weather: "Meteo",
    sea: "Mer",
    wind: "Vent",
    uv: "UV",
    airQuality: "Qualite de l’air",
    feelsLike: "Ressenti",
    humidity: "Humidite",
    windGusts: "Rafales",
    uvMax: "UV max",
    waterQuality: "Qualite de l’eau",
    officialChecks: "Controles officiels",
    officialBathingPortal: "Portail officiel des baignades",
    flights: "Vols",
    officialBoards: "Tableaux officiels",
    niceAirportFirst: "Nice aeroport d’abord",
    transport: "Transport",
    trainBusLinks: "Train + bus",
    routeShortcuts: "Liens officiels utiles",
    driving: "Voiture",
    parkingEv: "Parking + EV",
    noFakeParking: "Fallback statique, pas de fausse disponibilite live",
    services: "Services",
    taxiToiletsBikes: "Taxi + toilettes + velo",
    verifiedUtilityLayer: "Couche pratique verifiee",
    safety: "Securite",
    emergencyNumbers: "112 / 15 / 17 / 18",
    warningLinks: "Alertes officielles",
    radio: "Radio",
    localStreams: "Flux locaux",
    playAfterInteraction: "Lecture apres interaction",
    guides: "Guides",
    drivingTitle: "Voiture et parking autour de Menton",
    drivingText: "Distinguer le parking prive invite des parkings publics de secours. Les bornes EV restent une information pratique, pas une promesse live.",
    trafficMap: "Carte trafic",
    localServicesTitle: "Services locaux qui font gagner du temps",
    localServicesText: "Pour un taxi live, utilisez les numeros officiels. Pour toilettes, pharmacies et velo, cette page reste une couche pratique verifiee.",
    mentonStationTaxi: "Taxi gare de Menton",
    niceAirportTaxi: "Taxi aeroport de Nice",
    monacoTaxi: "Service taxi Monaco",
    drinkingFountains: "Fontaines a boire",
    drinkingFountainsText: "Aucun registre fiable des fontaines potables n’est encore publie dans le repo. Mieux vaut garder ce trou explicitement.",
    openMap: "Ouvrir la carte utile",
    emergencyTitle: "Numeros d’urgence",
    emergencyText: "Cette page n’est pas un service d’urgence. Appelez le numero officiel directement si vous avez besoin d’aide.",
    euroEmergency: "Numero d’urgence europeen",
    medicalEmergency: "Urgence medicale en France",
    police: "Police en France",
    fire: "Pompiers en France",
    smsEmergency: "Acces urgence SMS/app en France",
    italyEmergency: "Numero d’urgence en Italie",
    wildfireRisk: "Risque incendie",
    wildfireTitle: "Vigilance forets Meteo-France",
    wildfireText: "Utilisez la page officielle plutot qu’un score invente par le site.",
    severeWeather: "Alerte meteo",
    severeWeatherTitle: "Vigilance meteo officielle",
    severeWeatherText: "Verifier le niveau officiel avant plage, rando ou long trajet.",
    beachesTitle: "Qualite officielle des eaux de baignade",
    beachesText: "Pour Menton, utilisez le portail officiel du ministere. Il vaut mieux qu’une pseudo-donnee locale parfaite.",
    openWaterMap: "Ouvrir la carte officielle",
    alpesBathingSites: "Sites de baignade des Alpes-Maritimes",
    beachFlags: "Drapeaux de plage",
    beachFlagsText: "Verifier le drapeau sur place lorsqu’aucun flux fiable n’existe.",
    jellyfish: "Meduses",
    jellyfishText: "Pas de signalement ne veut pas dire absence de meduses.",
    tide: "Maree",
    tideText: "La maree mediterraneenne reste limitee ici; cela reste une note secondaire.",
    eurReference: "Conversion EUR de reference",
    eurText: "France, Monaco et Italie utilisent l’euro. Cet outil reste indicatif; votre banque peut appliquer un autre taux.",
    checkCurrency: "Verifier",
    referenceDate: "Date de reference",
    ratesUnavailable: "Taux de reference temporairement indisponibles.",
    uahNote: "UAH peut etre absent du flux BCE; comparez avec votre fournisseur de carte si besoin.",
  },
  it: {
    weather: "Meteo",
    sea: "Mare",
    wind: "Vento",
    uv: "UV",
    airQuality: "Qualita dell’aria",
    feelsLike: "Percepita",
    humidity: "Umidita",
    windGusts: "Raffiche",
    uvMax: "UV max",
    waterQuality: "Qualita dell’acqua",
    officialChecks: "Controlli ufficiali",
    officialBathingPortal: "Portale ufficiale balneazione",
    flights: "Voli",
    officialBoards: "Tabelloni ufficiali",
    niceAirportFirst: "Prima Nizza aeroporto",
    transport: "Trasporti",
    trainBusLinks: "Treno + bus",
    routeShortcuts: "Link ufficiali utili",
    driving: "Auto",
    parkingEv: "Parcheggi + EV",
    noFakeParking: "Fallback statico, niente posti live inventati",
    services: "Servizi",
    taxiToiletsBikes: "Taxi + bagni + bici",
    verifiedUtilityLayer: "Livello pratico verificato",
    safety: "Sicurezza",
    emergencyNumbers: "112 / 15 / 17 / 18",
    warningLinks: "Avvisi ufficiali",
    radio: "Radio",
    localStreams: "Stream locali",
    playAfterInteraction: "Play dopo interazione",
    guides: "Guide",
    drivingTitle: "Auto e parcheggi intorno a Mentone",
    drivingText: "Separa il parcheggio privato ospiti dai parcheggi pubblici di supporto. Le colonnine EV restano dati pratici, non disponibilita live garantita.",
    trafficMap: "Mappa traffico",
    localServicesTitle: "Servizi locali che fanno risparmiare tempo",
    localServicesText: "Per taxi live usa i numeri ufficiali. Per bagni, farmacie e bici, questa pagina resta un livello pratico verificato.",
    mentonStationTaxi: "Taxi stazione Mentone",
    niceAirportTaxi: "Taxi aeroporto di Nizza",
    monacoTaxi: "Servizio taxi Monaco",
    drinkingFountains: "Fontanelle",
    drinkingFountainsText: "Nel repo non esiste ancora un registro affidabile delle fontanelle potabili. Meglio lasciare il gap esplicito.",
    openMap: "Apri mappa utile",
    emergencyTitle: "Numeri di emergenza",
    emergencyText: "Questa pagina non e un servizio di emergenza. Chiama direttamente il numero ufficiale quando serve.",
    euroEmergency: "Numero di emergenza europeo",
    medicalEmergency: "Emergenza medica in Francia",
    police: "Polizia in Francia",
    fire: "Vigili del fuoco in Francia",
    smsEmergency: "Accesso emergenza SMS/app in Francia",
    italyEmergency: "Numero di emergenza in Italia",
    wildfireRisk: "Rischio incendi",
    wildfireTitle: "Vigilanza boschi Meteo-France",
    wildfireText: "Usa la pagina ufficiale invece di un punteggio inventato dal sito.",
    severeWeather: "Allerta meteo",
    severeWeatherTitle: "Vigilanza meteo ufficiale",
    severeWeatherText: "Controlla il livello ufficiale prima di spiaggia, escursioni o lunghi spostamenti.",
    beachesTitle: "Qualita ufficiale delle acque di balneazione",
    beachesText: "Per Mentone usa il portale ufficiale francese. Meglio di fingere un feed locale perfetto.",
    openWaterMap: "Apri mappa ufficiale",
    alpesBathingSites: "Siti balneazione Alpes-Maritimes",
    beachFlags: "Bandiere spiaggia",
    beachFlagsText: "Controlla la bandiera in spiaggia quando non esiste un feed affidabile.",
    jellyfish: "Meduse",
    jellyfishText: "Nessuna segnalazione non significa assenza di meduse.",
    tide: "Marea",
    tideText: "L’escursione di marea mediterranea qui e limitata; resta una nota secondaria.",
    eurReference: "Conversione EUR di riferimento",
    eurText: "Francia, Monaco e Italia usano l’euro. Questo strumento e solo indicativo; la tua banca puo applicare un tasso diverso.",
    checkCurrency: "Controlla",
    referenceDate: "Data di riferimento",
    ratesUnavailable: "Tassi di riferimento temporaneamente non disponibili.",
    uahNote: "UAH potrebbe non essere presente nel feed BCE; confronta con il provider della carta se serve.",
  },
  uk: {
    weather: "Погода",
    sea: "Море",
    wind: "Вітер",
    uv: "UV",
    airQuality: "Якість повітря",
    feelsLike: "Відчувається як",
    humidity: "Вологість",
    windGusts: "Пориви вітру",
    uvMax: "UV max",
    waterQuality: "Якість води",
    officialChecks: "Офіційні перевірки",
    officialBathingPortal: "Офіційний портал якості води",
    flights: "Рейси",
    officialBoards: "Офіційні табло",
    niceAirportFirst: "Спершу Ніцца аеропорт",
    transport: "Транспорт",
    trainBusLinks: "Потяг + автобус",
    routeShortcuts: "Офіційні маршрутні лінки",
    driving: "Авто",
    parkingEv: "Паркінги + EV",
    noFakeParking: "Статичний fallback, без вигаданих live-місць",
    services: "Сервіси",
    taxiToiletsBikes: "Таксі + туалети + велосипеди",
    verifiedUtilityLayer: "Перевірений практичний шар",
    safety: "Безпека",
    emergencyNumbers: "112 / 15 / 17 / 18",
    warningLinks: "Офіційні попередження",
    radio: "Радіо",
    localStreams: "Локальні потоки",
    playAfterInteraction: "Відтворення після взаємодії",
    guides: "Гайди",
    drivingTitle: "Авто і паркінги навколо Ментона",
    drivingText: "Відокремлюйте приватний паркінг для гостей від публічного fallback. EV-точки тут показані як практична довідка, а не гарантія live-доступності.",
    trafficMap: "Карта трафіку",
    localServicesTitle: "Локальні сервіси, що економлять час",
    localServicesText: "Для таксі використовуйте офіційні номери. Туалети, аптеки та велосипеди тут зібрані як перевірений практичний шар.",
    mentonStationTaxi: "Таксі станція Ментон",
    niceAirportTaxi: "Таксі аеропорт Ніцца",
    monacoTaxi: "Служба таксі Монако",
    drinkingFountains: "Питні фонтани",
    drinkingFountainsText: "У репозиторії ще немає надійного реєстру питних фонтанів. Краще лишити цей пробіл явним, ніж удавати точність.",
    openMap: "Відкрити корисну карту",
    emergencyTitle: "Екстрені номери",
    emergencyText: "Ця сторінка не є екстреною службою. У разі нагальної потреби телефонуйте напряму за офіційним номером.",
    euroEmergency: "Європейський номер екстреної допомоги",
    medicalEmergency: "Медична допомога у Франції",
    police: "Поліція у Франції",
    fire: "Пожежна служба у Франції",
    smsEmergency: "SMS/app доступ до екстреної допомоги у Франції",
    italyEmergency: "Номер екстреної допомоги в Італії",
    wildfireRisk: "Ризик пожеж",
    wildfireTitle: "Офіційна карта лісової пильності Meteo-France",
    wildfireText: "Користуйтеся офіційною сторінкою, а не вигаданим risk score від сайту.",
    severeWeather: "Негода",
    severeWeatherTitle: "Офіційна метеопильність",
    severeWeatherText: "Перевіряйте офіційні попередження перед пляжем, походом або довшою поїздкою.",
    beachesTitle: "Офіційна якість води для купання",
    beachesText: "Для пляжів Ментона використовуйте офіційний французький портал. Це краще, ніж удавати ідеальний локальний live-feed.",
    openWaterMap: "Відкрити офіційну карту води",
    alpesBathingSites: "Пляжі Alpes-Maritimes",
    beachFlags: "Пляжні прапори",
    beachFlagsText: "Перевіряйте прапор на пляжі, якщо немає надійного timestamped feed.",
    jellyfish: "Медузи",
    jellyfishText: "Відсутність повідомлення не означає відсутність медуз.",
    tide: "Приплив",
    tideText: "Для цього узбережжя припливи залишаються другорядною приміткою, а не центральним інструментом.",
    eurReference: "Довідкова конвертація EUR",
    eurText: "Франція, Монако та Італія використовують євро. Інструмент лише орієнтовний; ваш банк або картка можуть дати інший курс.",
    checkCurrency: "Перевірте",
    referenceDate: "Дата довідки",
    ratesUnavailable: "Довідкові курси тимчасово недоступні.",
    uahNote: "UAH може бути відсутня у фіді ECB; за потреби звіряйтеся зі своїм банком або карткою.",
  },
} as const;

export async function TravelToolPage({ locale }: { locale: Locale }) {
  const copy = travelToolSectionCopy[locale];
  const text = ui[locale];
  const rightNow = await getMentonRightNow();

  return (
    <>
      <Section className="bg-[#fffaf0] py-8 sm:py-10">
        <Container>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
            <div className="border border-[#dfd2b8] bg-[#fffdf8] p-5 sm:p-6">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{copy.rightNowTitle}</p>
              <h2 className="mt-3 serif-heading text-4xl leading-none text-[#173f36]">{copy.rightNowTitle}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5c5044]">{copy.rightNowDescription}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                <MetricCard label={text.weather} value={rightNow.weather ? `${rightNow.weather.temperature}°C` : copy.unavailable} detail={rightNow.weather ? weatherLabel(rightNow.weather.weatherCode) : undefined} status={rightNow.weather ? "live" : "unavailable"} locale={locale} />
                <MetricCard label={text.sea} value={typeof rightNow.marine?.seaTemperature === "number" ? `${rightNow.marine.seaTemperature}°C` : copy.unavailable} detail={typeof rightNow.marine?.waveHeight === "number" ? `${rightNow.marine.waveHeight} m` : undefined} status={rightNow.marine ? "live" : "unavailable"} locale={locale} />
                <MetricCard label={text.wind} value={typeof rightNow.weather?.windSpeed === "number" ? `${rightNow.weather.windSpeed} km/h` : copy.unavailable} detail={typeof rightNow.weather?.windGusts === "number" ? `${text.windGusts} ${rightNow.weather.windGusts} km/h` : undefined} status={rightNow.weather ? "live" : "unavailable"} locale={locale} />
                <MetricCard label={text.uv} value={typeof rightNow.airQuality?.uvIndex === "number" ? rightNow.airQuality.uvIndex.toFixed(1) : typeof rightNow.weather?.uvIndexMax === "number" ? rightNow.weather.uvIndexMax.toFixed(1) : copy.unavailable} detail={typeof rightNow.airQuality?.uvIndexMax === "number" ? `max ${rightNow.airQuality.uvIndexMax.toFixed(1)}` : typeof rightNow.weather?.uvIndexMax === "number" ? `max ${rightNow.weather.uvIndexMax.toFixed(1)}` : undefined} status={rightNow.airQuality || typeof rightNow.weather?.uvIndexMax === "number" ? "live" : "unavailable"} locale={locale} />
                <MetricCard label={text.airQuality} value={typeof rightNow.airQuality?.europeanAqi === "number" ? `${rightNow.airQuality.europeanAqi}` : copy.unavailable} detail={typeof rightNow.airQuality?.pm2_5 === "number" ? `PM2.5 ${rightNow.airQuality.pm2_5}` : undefined} status={rightNow.airQuality ? "live" : "unavailable"} locale={locale} />
              </div>
            </div>
            <div className="border border-[#dfd2b8] bg-[#fffdf8] p-5 sm:p-6">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{copy.moneyTimeTitle}</p>
              <h2 className="mt-3 serif-heading text-3xl leading-none text-[#173f36]">{copy.moneyTimeTitle}</h2>
              <p className="mt-4 text-sm leading-7 text-[#5c5044]">{copy.moneyTimeNote}</p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <MiniExternalCard title="Menton / Monaco / Nice" body="Europe/Paris" href={`/${locale}/tools/currency` as Route} cta={copy.fullTool} />
                <MiniExternalCard title="Water and weather" body="See live sea, air and UV context together before leaving the apartment." href={`/${locale}/tools/weather` as Route} cta={copy.fullTool} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f8f3ea] py-6 sm:py-8">
        <Container>
          <div className="mb-6 max-w-3xl">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{copy.categoryTitle}</p>
            <h2 className="mt-3 serif-heading text-4xl leading-none text-[#173f36]">{copy.categoryTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-[#5c5044]">{copy.categoryDescription}</p>
          </div>
          <div className="space-y-4">
            {travelToolCategories.map((category) => (
              <div key={category.slug} className="border border-[#dfd2b8] bg-[#fffdf8] p-4 sm:p-5">
                <div className="max-w-3xl">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{localizeText(category.title, locale)}</p>
                  <p className="mt-2 text-sm leading-7 text-[#5c5044]">{localizeText(category.description, locale)}</p>
                </div>
                <div className="mt-4 grid gap-3 lg:grid-cols-2 xl:grid-cols-4">
                  {category.toolSlugs.map((toolSlug) => {
                    const tool = getTravelTool(toolSlug);
                    if (!tool) return null;
                    return <TravelToolCard key={tool.slug} locale={locale} tool={tool} rightNow={rightNow} compact={false} />;
                  })}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

export async function TravelToolDetailPage({ locale, slug }: { locale: Locale; slug: TravelToolSlug }) {
  const tool = getTravelTool(slug);
  if (!tool) return null;
  const copy = travelToolSectionCopy[locale];
  const text = ui[locale];
  const sources = getTravelToolSources(tool.sourceIds);
  const rightNow = await getMentonRightNow();
  const pageUrl = absoluteUrl(localizedPath(locale, `tools/${tool.slug}`));

  return (
    <>
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: "Azur Menton", url: absoluteUrl(localizedPath(locale)) },
          { name: copy.title, url: absoluteUrl(localizedPath(locale, "tools")) },
          { name: localizeText(tool.title, locale), url: pageUrl },
        ])}
      />
      <Section className="border-b border-[#dfd2b8] bg-[#f8f3ea] py-12 sm:py-16">
        <Container>
          <Link href={`/${locale}/tools` as Route} className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#b49353] hover:text-[#173f36]">{copy.title}</Link>
          <h1 className="mt-4 max-w-5xl serif-heading text-5xl leading-[0.96] text-[#173f36] sm:text-6xl">{localizeText(tool.title, locale)}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#5c5044]">{localizeText(tool.intro, locale)}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <ToolStateBadge locale={locale} status={stateToStatus(tool.state)} />
            {sources[0] ? <span className="inline-flex min-h-9 items-center border border-[#dfd2b8] bg-[#fffdf8] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#71665b]">{copy.source}: {sources[0].providerLabel}</span> : null}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#fffaf0] py-8 sm:py-10">
        <Container>
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
            <div className="space-y-6">{await renderToolContent(locale, slug, rightNow)}</div>
            <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
              <div className="border border-[#dfd2b8] bg-[#fffdf8] p-5">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{copy.source}</p>
                <div className="mt-4 space-y-3 text-sm leading-6 text-[#5c5044]">
                  {sources.map((source) => (
                    <div key={source.id} className="border border-[#e6d9c6] bg-white/65 p-3">
                      <p className="font-semibold text-[#173f36]">{source.providerLabel}</p>
                      <p className="mt-1 text-xs leading-5 text-[#71665b]">{source.attribution}</p>
                      <p className="mt-2 text-xs leading-5 text-[#71665b]">Cache: {source.cacheDuration}</p>
                      <a href={source.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-9 items-center border border-[#c6a66a] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7]">Official source</a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-[#dfd2b8] bg-[#fffdf8] p-5">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{text.guides}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tool.relatedGuideSlugs.map((guideSlug) => {
                    const guide = getGuideArticle(guideSlug);
                    const label = guide ? guide.title[locale] : guideSlug;
                    return <Link key={guideSlug} href={`/${locale}/guide/${guideSlug}` as Route} className="inline-flex min-h-9 items-center border border-[#dfd2b8] px-3 py-2 text-xs font-semibold text-[#173f36] hover:bg-[#f3ead7]">{label}</Link>;
                  })}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}

export function GuideTravelToolsPanel({ locale, guideSlug }: { locale: Locale; guideSlug: string }) {
  const tools = getTravelToolsForGuide(guideSlug);
  if (!tools.length) return null;
  const copy = travelToolSectionCopy[locale];

  return (
    <section className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-7">
      <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{copy.guidePanelTitle}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5c5044]">{copy.guidePanelText}</p>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => <TravelToolCard key={tool.slug} locale={locale} tool={tool} compact rightNow={null} />)}
      </div>
    </section>
  );
}

function TravelToolCard({ locale, tool, compact, rightNow }: { locale: Locale; tool: TravelTool; compact: boolean; rightNow: Awaited<ReturnType<typeof getMentonRightNow>> | null }) {
  const copy = travelToolSectionCopy[locale];
  const metric = summarizeMetric(tool.slug, locale, rightNow);

  return (
    <Link href={`/${locale}/tools/${tool.slug}` as Route} className="group block h-full">
      <div className="h-full border border-[#dfd2b8] bg-white/70 p-4 transition group-hover:border-[#c6a66a] group-hover:bg-[#fffdf8]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{localizeText(tool.title, locale)}</p>
            <p className={`mt-3 ${compact ? "text-sm leading-6" : "text-sm leading-7"} text-[#5c5044]`}>{localizeText(compact ? tool.compactDescription : tool.valueProposition, locale)}</p>
          </div>
          <ToolStateBadge locale={locale} status={metric?.status ?? stateToStatus(tool.state)} />
        </div>
        {metric ? (
          <div className="mt-4 border border-[#e6d9c6] bg-[#fffdf8] px-3 py-3">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#b49353]">{metric.label}</p>
            <p className="mt-1 text-lg font-semibold text-[#173f36]">{metric.value}</p>
            {metric.detail ? <p className="mt-1 text-xs leading-5 text-[#71665b]">{metric.detail}</p> : null}
          </div>
        ) : null}
        <span className="mt-4 inline-flex min-h-9 items-center border border-[#c6a66a] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#173f36] group-hover:bg-[#f3ead7]">{compact ? copy.compactView : copy.fullTool}</span>
      </div>
    </Link>
  );
}

function ToolStateBadge({ locale, status }: { locale: Locale; status: TravelToolMetricStatus }) {
  const copy = travelToolSectionCopy[locale];
  const label = {
    live: copy.live,
    delayed: copy.delayed,
    seasonal: copy.seasonal,
    external: copy.external,
    unavailable: copy.unavailable,
  }[status];
  const tone = {
    live: "border-[#173f36] bg-[#173f36] text-white",
    delayed: "border-[#c6a66a] bg-[#f3ead7] text-[#173f36]",
    seasonal: "border-[#d8c28e] bg-white text-[#8a6d39]",
    external: "border-[#dfd2b8] bg-white text-[#71665b]",
    unavailable: "border-[#dfc4b6] bg-white text-[#8b5b4c]",
  }[status];
  return <span className={`inline-flex min-h-8 items-center border px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] ${tone}`}>{label}</span>;
}

function MetricCard({ label, value, detail, status, locale }: { label: string; value: string; detail?: string; status: TravelToolMetricStatus; locale: Locale }) {
  return (
    <div className="border border-[#e6d9c6] bg-[#fffdf8] p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#b49353]">{label}</p>
        <ToolStateBadge locale={locale} status={status} />
      </div>
      <p className="mt-2 text-xl font-semibold text-[#173f36]">{value}</p>
      {detail ? <p className="mt-1 text-xs leading-5 text-[#71665b]">{detail}</p> : null}
    </div>
  );
}

function MiniExternalCard({ title, body, href, cta }: { title: string; body: string; href: Route; cta: string }) {
  return (
    <div className="border border-[#e6d9c6] bg-[#fffdf8] p-4">
      <p className="text-sm font-semibold text-[#173f36]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[#5c5044]">{body}</p>
      <Link href={href} className="mt-3 inline-flex min-h-9 items-center border border-[#c6a66a] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7]">{cta}</Link>
    </div>
  );
}

function summarizeMetric(slug: TravelToolSlug, locale: Locale, rightNow: Awaited<ReturnType<typeof getMentonRightNow>> | null) {
  const text = ui[locale];
  if (!rightNow) return null;
  switch (slug) {
    case "weather":
      if (!rightNow.weather) return { label: text.weather, value: travelToolSectionCopy[locale].unavailable, status: "unavailable" as const };
      return { label: text.weather, value: `${rightNow.weather.temperature}°C`, detail: weatherLabel(rightNow.weather.weatherCode), status: "live" as const };
    case "sea":
      if (!rightNow.marine) return { label: text.sea, value: travelToolSectionCopy[locale].unavailable, status: "unavailable" as const };
      return { label: text.sea, value: typeof rightNow.marine.seaTemperature === "number" ? `${rightNow.marine.seaTemperature}°C` : travelToolSectionCopy[locale].unavailable, detail: typeof rightNow.marine.waveHeight === "number" ? `${rightNow.marine.waveHeight} m` : undefined, status: "live" as const };
    case "beaches":
      return { label: text.waterQuality, value: text.officialChecks, detail: text.officialBathingPortal, status: "external" as const };
    case "currency":
      return { label: "EUR", value: "GBP / USD / CHF / UAH", detail: "Reference-rate conversion", status: "live" as const };
    case "flights":
      return { label: text.flights, value: text.officialBoards, detail: text.niceAirportFirst, status: "delayed" as const };
    case "transport":
      return { label: text.transport, value: text.trainBusLinks, detail: text.routeShortcuts, status: "delayed" as const };
    case "driving":
      return { label: text.driving, value: text.parkingEv, detail: text.noFakeParking, status: "external" as const };
    case "local-services":
      return { label: text.services, value: text.taxiToiletsBikes, detail: text.verifiedUtilityLayer, status: "external" as const };
    case "safety":
      return { label: text.safety, value: text.emergencyNumbers, detail: text.warningLinks, status: "seasonal" as const };
    case "radio":
      return { label: text.radio, value: text.localStreams, detail: text.playAfterInteraction, status: "live" as const };
    default:
      return null;
  }
}

function stateToStatus(state: TravelTool["state"]): TravelToolMetricStatus {
  switch (state) {
    case "live":
      return "live";
    case "hybrid":
      return "delayed";
    case "seasonal":
      return "seasonal";
    case "external":
    case "static":
      return "external";
    default:
      return "unavailable";
  }
}

async function renderToolContent(locale: Locale, slug: TravelToolSlug, rightNow: Awaited<ReturnType<typeof getMentonRightNow>>) {
  switch (slug) {
    case "weather":
      return (
        <>
          <WeatherWidget locale={locale} />
          <InfoGrid items={[
            [ui[locale].feelsLike, typeof rightNow.weather?.feelsLike === "number" ? `${rightNow.weather.feelsLike}°C` : "—"],
            [ui[locale].humidity, typeof rightNow.weather?.humidity === "number" ? `${rightNow.weather.humidity}%` : "—"],
            [ui[locale].windGusts, typeof rightNow.weather?.windGusts === "number" ? `${rightNow.weather.windGusts} km/h` : "—"],
            [ui[locale].uvMax, typeof rightNow.airQuality?.uvIndexMax === "number" ? rightNow.airQuality.uvIndexMax.toFixed(1) : typeof rightNow.weather?.uvIndexMax === "number" ? rightNow.weather.uvIndexMax.toFixed(1) : "—"],
            [ui[locale].airQuality, typeof rightNow.airQuality?.europeanAqi === "number" ? `${rightNow.airQuality.europeanAqi}` : "—"],
          ]} />
        </>
      );
    case "sea":
      return <MarineConditionsBlock locale={locale} block={{ type: "marineConditions" }} />;
    case "flights":
      return <AirportLiveBoard locale={locale} block={{ type: "airportLiveBoard" }} />;
    case "radio":
      return <LocalRadioBlock locale={locale} block={{ type: "localRadio", region: "menton" }} />;
    case "currency": {
      const rates = await getEuroReferenceRates();
      return <CurrencyPanel locale={locale} rates={rates} />;
    }
    case "transport":
      return <TransportPanel locale={locale} />;
    case "driving":
      return <DrivingPanel locale={locale} />;
    case "local-services":
      return <LocalServicesPanel locale={locale} />;
    case "safety":
      return <SafetyPanel locale={locale} />;
    case "beaches":
      return <BeachesPanel locale={locale} />;
    default:
      return null;
  }
}

function InfoGrid({ items }: { items: Array<[string, string]> }) {
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map(([label, value]) => (
        <div key={label} className="border border-[#dfd2b8] bg-[#fffdf8] p-4">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{label}</p>
          <p className="mt-2 text-lg font-semibold text-[#173f36]">{value}</p>
        </div>
      ))}
    </section>
  );
}

function TransportPanel({ locale }: { locale: Locale }) {
  return (
    <div className="space-y-4">
      {destinationTransport.map((destination) => (
        <section key={destination.id} className="border border-[#dfd2b8] bg-[#fffdf8] p-5">
          <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{destination.destination[locale]}</h2>
          <p className="mt-3 text-sm leading-7 text-[#5c5044]">{destination.practicalNote[locale]}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {destination.options.map((option, index) => (
              <div key={`${destination.id}-${index}`} className="border border-[#e6d9c6] bg-white/65 p-3">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#b49353]">{transportModeLabels[option.mode][locale]}</p>
                <p className="mt-2 font-semibold text-[#173f36]">{option.timeLabel[locale]}</p>
                <p className="mt-2 text-sm leading-6 text-[#5c5044]">{option.note[locale]}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {destination.actionLinks.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center border border-[#c6a66a] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7]">{link.label[locale]}</a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function DrivingPanel({ locale }: { locale: Locale }) {
  const text = ui[locale];
  const places = getPlaces(["parking-vieille-ville-sablettes", "parking-hotel-de-ville-menton", "parking-saint-roch-menton", "parking-gare-sncf-menton", "parking-place-darmes-menton", "rue-prato-ev-charger-menton", "avenue-cernuschi-ev-charger-menton"]);
  return (
    <section className="space-y-4">
      <div className="border border-[#dfd2b8] bg-[#fffdf8] p-5">
        <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{text.drivingTitle}</h2>
        <p className="mt-3 text-sm leading-7 text-[#5c5044]">{text.drivingText}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="https://www.waze.com/live-map" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center border border-[#c6a66a] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7]">{text.trafficMap}</a>
          <a href="https://www.bison-fute.gouv.fr/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center border border-[#c6a66a] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7]">Bison Fute</a>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {places.map((place) => (
          <div key={place.id} className="border border-[#dfd2b8] bg-[#fffdf8] p-4">
            <p className="font-semibold text-[#173f36]">{place.name}</p>
            <p className="mt-2 text-sm leading-6 text-[#5c5044]">{place.shortNote[locale]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LocalServicesPanel({ locale }: { locale: Locale }) {
  const text = ui[locale];
  const places = getPlaces(["public-toilets-fossan-beach-menton", "public-toilets-vieille-ville-menton", "public-toilets-place-darmes-menton", "pharmacie-lafayette-des-jardins", "pharmacie-victoria-menton", "pharmacie-saint-roman", "pharmacie-hanbury", "parapharmacie-dietetique-menton", "r-bike-menton", "bike-trip-atelier-velo-riviera"]);
  return (
    <div className="space-y-4">
      <section className="border border-[#dfd2b8] bg-[#fffdf8] p-5">
        <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{text.localServicesTitle}</h2>
        <p className="mt-3 text-sm leading-7 text-[#5c5044]">{text.localServicesText}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <a href="tel:+33492104702" className="border border-[#e6d9c6] bg-white/65 p-4 text-sm font-semibold text-[#173f36]">{text.mentonStationTaxi}<br /><span className="font-normal text-[#5c5044]">+33 4 92 10 47 02</span></a>
          <a href="tel:+33493137878" className="border border-[#e6d9c6] bg-white/65 p-4 text-sm font-semibold text-[#173f36]">{text.niceAirportTaxi}<br /><span className="font-normal text-[#5c5044]">+33 4 93 13 78 78</span></a>
          <a href="tel:+37793150101" className="border border-[#e6d9c6] bg-white/65 p-4 text-sm font-semibold text-[#173f36]">{text.monacoTaxi}<br /><span className="font-normal text-[#5c5044]">+377 93 15 01 01</span></a>
        </div>
      </section>
      <section className="border border-[#dfd2b8] bg-[#fffdf8] p-5">
        <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{text.drinkingFountains}</h2>
        <p className="mt-3 text-sm leading-7 text-[#5c5044]">{text.drinkingFountainsText}</p>
        <Link href={`/${locale}/map` as Route} className="mt-4 inline-flex min-h-10 items-center border border-[#c6a66a] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7]">{text.openMap}</Link>
      </section>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {places.map((place) => (
          <div key={place.id} className="border border-[#dfd2b8] bg-[#fffdf8] p-4">
            <p className="font-semibold text-[#173f36]">{place.name}</p>
            <p className="mt-2 text-sm leading-6 text-[#5c5044]">{place.shortNote[locale]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SafetyPanel({ locale }: { locale: Locale }) {
  const text = ui[locale];
  return (
    <div className="space-y-4">
      <section className="border border-[#dfd2b8] bg-[#fffdf8] p-5">
        <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{text.emergencyTitle}</h2>
        <p className="mt-3 text-sm leading-7 text-[#5c5044]">{text.emergencyText}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {[
            ["112", text.euroEmergency],
            ["15", text.medicalEmergency],
            ["17", text.police],
            ["18", text.fire],
            ["114", text.smsEmergency],
            ["112 Italy", text.italyEmergency],
          ].map(([number, label]) => (
            <a key={number} href={`tel:${number.replace(/\s+/g, "")}`} className="border border-[#e6d9c6] bg-white/65 p-4 text-sm font-semibold text-[#173f36]">
              {number}
              <br />
              <span className="font-normal text-[#5c5044]">{label}</span>
            </a>
          ))}
        </div>
      </section>
      <section className="grid gap-3 md:grid-cols-2">
        <a href="https://meteofrance.com/meteo-des-forets" target="_blank" rel="noopener noreferrer" className="border border-[#dfd2b8] bg-[#fffdf8] p-5">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#b49353]">{text.wildfireRisk}</p>
          <p className="mt-2 font-semibold text-[#173f36]">{text.wildfireTitle}</p>
          <p className="mt-2 text-sm leading-6 text-[#5c5044]">{text.wildfireText}</p>
        </a>
        <a href="https://vigilance.meteofrance.fr/en" target="_blank" rel="noopener noreferrer" className="border border-[#dfd2b8] bg-[#fffdf8] p-5">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#b49353]">{text.severeWeather}</p>
          <p className="mt-2 font-semibold text-[#173f36]">{text.severeWeatherTitle}</p>
          <p className="mt-2 text-sm leading-6 text-[#5c5044]">{text.severeWeatherText}</p>
        </a>
      </section>
    </div>
  );
}

function BeachesPanel({ locale }: { locale: Locale }) {
  const text = ui[locale];
  return (
    <div className="space-y-4">
      <section className="border border-[#dfd2b8] bg-[#fffdf8] p-5">
        <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{text.beachesTitle}</h2>
        <p className="mt-3 text-sm leading-7 text-[#5c5044]">{text.beachesText}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="https://baignades.sante.gouv.fr/baignades/editorial/en/accueil.html" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center border border-[#173f36] bg-[#173f36] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white hover:bg-[#235246]">{text.openWaterMap}</a>
          <a href="https://baignades.sante.gouv.fr/baignades/navigAccessible.do?annee=null&com=0&idCarte=fra&listeActive=com&objectId=06&site=0&x=28&y=10" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center border border-[#c6a66a] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7]">{text.alpesBathingSites}</a>
        </div>
      </section>
      <section className="grid gap-3 md:grid-cols-3">
        <div className="border border-[#dfd2b8] bg-[#fffdf8] p-5">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#b49353]">{text.beachFlags}</p>
          <p className="mt-2 text-sm leading-6 text-[#5c5044]">{text.beachFlagsText}</p>
        </div>
        <div className="border border-[#dfd2b8] bg-[#fffdf8] p-5">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#b49353]">{text.jellyfish}</p>
          <p className="mt-2 text-sm leading-6 text-[#5c5044]">{text.jellyfishText}</p>
        </div>
        <div className="border border-[#dfd2b8] bg-[#fffdf8] p-5">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#b49353]">{text.tide}</p>
          <p className="mt-2 text-sm leading-6 text-[#5c5044]">{text.tideText}</p>
        </div>
      </section>
    </div>
  );
}

function CurrencyPanel({ locale, rates }: { locale: Locale; rates: Awaited<ReturnType<typeof getEuroReferenceRates>> }) {
  const text = ui[locale];
  const fallbackRates = [
    { currency: "GBP", rate: null },
    { currency: "USD", rate: null },
    { currency: "CHF", rate: null },
    { currency: "UAH", rate: null },
  ];
  return (
    <div className="space-y-4">
      <section className="border border-[#dfd2b8] bg-[#fffdf8] p-5">
        <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{text.eurReference}</h2>
        <p className="mt-3 text-sm leading-7 text-[#5c5044]">{text.eurText}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {(rates?.rates ?? fallbackRates).map((rate) => (
            <div key={rate.currency} className="border border-[#e6d9c6] bg-white/65 p-4">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#b49353]">1 EUR</p>
              <p className="mt-2 text-xl font-semibold text-[#173f36]">{rate.rate ? `${rate.rate.toFixed(4)} ${rate.currency}` : `${text.checkCurrency} ${rate.currency}`}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-[#71665b]">{rates ? `${text.referenceDate}: ${new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(new Date(rates.updatedAt))}.` : text.ratesUnavailable} {text.uahNote}</p>
      </section>
    </div>
  );
}
