import Image from "next/image";
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
  travelToolSectionCopy,
  type TravelTool,
  type TravelToolMetricStatus,
  type TravelToolSlug,
} from "@/content/travel-tools";
import type { Locale } from "@/i18n/locales";
import { getEuroReferenceRates } from "@/lib/currency";
import { EuroRatesWidget } from "@/components/tools/EuroRatesWidget";
import { WorldClocks } from "@/components/tools/WorldClocks";
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
    conditionsTitle: "Detailed weather, sea and beaches",
    conditionsText: "A single planning layer for air temperature, sea temperature, 16-day outlook, waves, rain, UV, air quality and honest beach-safety context.",
    climateOverview: "Menton enjoys one of the French Riviera’s most pleasant microclimates, with around 316 sunny days a year and a sheltered position between the Mediterranean Sea and the Alps. Summers are typically warm rather than oppressive, with average daytime temperatures of around 25°C (77°F) in July and August, while refreshing sea breezes keep the coast comfortable even on hotter days. Spring arrives early with mild temperatures, flowers and citrus trees in bloom, making it ideal for hiking and sightseeing. Autumn often stays warm enough for swimming well into October, and winters are remarkably gentle, with January averaging around 11°C (52°F) and sunshine remaining a regular companion. Whether you’re planning beach days, coastal walks or outdoor cafés, Menton offers one of Europe’s longest and most reliable seasons for enjoying life outside.",
    currentConditions: "Current conditions",
    nextDays: "16-day outlook",
    forecastHint: "Scroll for the remaining days",
    weatherToolCta: "Weather",
    seaToolCta: "Sea",
    beachesToolCta: "Beaches",
    wavesNow: "Waves now",
    swellNow: "Swell",
    wavePeriod: "Wave period",
    seaForecast: "Sea",
    rainForecast: "Rain",
    updated: "Updated",
    provider: "Provider",
    seaUnavailable: "Sea data unavailable",
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
    conditionsTitle: "Meteo, mer et plages en detail",
    conditionsText: "Une seule couche pratique pour temperature de l’air, temperature de la mer, tendance sur 16 jours, vagues, pluie, UV, qualite de l’air et contexte plage honnête.",
    climateOverview: "Menton profite de l’un des microclimats les plus agreables de la Cote d’Azur, avec environ 316 jours de soleil par an et une position abritee entre la Mediterranee et les Alpes. Les etes sont generalement chauds sans etre accablants, avec des temperatures moyennes d’environ 25 °C en juillet et aout. Les brises marines rafraichissent la cote, meme pendant les journees les plus chaudes. Le printemps arrive tot, avec des temperatures douces, des fleurs et des agrumes en floraison, ce qui en fait une excellente saison pour randonner et visiter. L’automne reste souvent assez doux pour se baigner jusqu’en octobre, tandis que les hivers sont remarquablement clements, avec une moyenne de 11 °C en janvier et un soleil regulier. Que vous prepariez des journees a la plage, des promenades cotieres ou des terrasses, Menton offre l’une des saisons de plein air les plus longues et les plus fiables d’Europe.",
    currentConditions: "Conditions actuelles",
    nextDays: "Prevision 16 jours",
    forecastHint: "Faites defiler pour voir les autres jours",
    weatherToolCta: "Meteo",
    seaToolCta: "Mer",
    beachesToolCta: "Plages",
    wavesNow: "Vagues",
    swellNow: "Houle",
    wavePeriod: "Periode",
    seaForecast: "Mer",
    rainForecast: "Pluie",
    updated: "Mise a jour",
    provider: "Source",
    seaUnavailable: "Donnees mer indisponibles",
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
    conditionsTitle: "Meteo, mare e spiagge in dettaglio",
    conditionsText: "Un unico livello pratico per temperatura dell’aria, temperatura del mare, prospettiva a 16 giorni, onde, pioggia, UV, qualita dell’aria e contesto spiagge onesto.",
    climateOverview: "Menton gode di uno dei microclimi piu piacevoli della Costa Azzurra, con circa 316 giorni di sole all’anno e una posizione riparata tra il Mediterraneo e le Alpi. Le estati sono generalmente calde ma non opprimenti, con temperature diurne medie intorno ai 25 °C in luglio e agosto. Le brezze marine rendono piacevole la costa anche nelle giornate piu calde. La primavera arriva presto, con temperature miti, fiori e agrumi in fiore: e una stagione ideale per escursioni e visite. L’autunno resta spesso abbastanza caldo per nuotare fino a ottobre, mentre gli inverni sono sorprendentemente miti, con una media di 11 °C a gennaio e sole frequente. Che stiate programmando giornate in spiaggia, passeggiate sul litorale o aperitivi all’aperto, Menton offre una delle stagioni all’aperto piu lunghe e affidabili d’Europa.",
    currentConditions: "Condizioni attuali",
    nextDays: "Prossimi 16 giorni",
    forecastHint: "Scorri per vedere gli altri giorni",
    weatherToolCta: "Meteo",
    seaToolCta: "Mare",
    beachesToolCta: "Spiagge",
    wavesNow: "Onde",
    swellNow: "Mareggiata",
    wavePeriod: "Periodo",
    seaForecast: "Mare",
    rainForecast: "Pioggia",
    updated: "Aggiornato",
    provider: "Fonte",
    seaUnavailable: "Dati mare non disponibili",
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
    conditionsTitle: "Погода, море і пляжі в деталях",
    conditionsText: "Єдиний практичний шар для температури повітря, температури моря, 16-денного прогнозу, хвиль, опадів, UV, якості повітря та чесного пляжного контексту.",
    climateOverview: "Ментон має один із найприємніших мікрокліматів Лазурового узбережжя: близько 316 сонячних днів на рік і захищене розташування між Середземним морем та Альпами. Влітку тут зазвичай тепло, але не задушливо: середня денна температура в липні та серпні становить близько 25 °C. Свіжі морські бризи роблять узбережжя комфортним навіть у спекотні дні. Весна приходить рано, приносячи м’яку погоду, квіти та цвітіння цитрусових, тому це чудовий час для прогулянок і огляду пам’яток. Восени часто достатньо тепло для купання аж до жовтня, а зими напрочуд м’які: середня температура січня близько 11 °C, і сонячні дні залишаються звичними. Незалежно від того, чи плануєте ви пляжний відпочинок, прогулянки узбережжям або каву просто неба, Ментон пропонує один із найдовших і найнадійніших сезонів для відпочинку на свіжому повітрі в Європі.",
    currentConditions: "Поточні умови",
    nextDays: "Прогноз на 16 днів",
    forecastHint: "Прокрутіть, щоб побачити решту днів",
    weatherToolCta: "Погода",
    seaToolCta: "Море",
    beachesToolCta: "Пляжі",
    wavesNow: "Хвилі",
    swellNow: "Свел",
    wavePeriod: "Період хвилі",
    seaForecast: "Море",
    rainForecast: "Опади",
    updated: "Оновлено",
    provider: "Джерело",
    seaUnavailable: "Дані моря недоступні",
  },
} as const;

export async function TravelToolPage({ locale }: { locale: Locale }) {
  const rightNow = await getMentonRightNow();
  const rates = await getEuroReferenceRates();

  return (
    <>
      <Section className="bg-[#fffaf0] py-8 sm:py-10">
        <Container>
          <UnifiedConditionsPanel locale={locale} rightNow={rightNow} />
        </Container>
      </Section>

      <Section className="bg-[#f8f3ea] py-6 sm:py-8">
        <Container>
          <div className="space-y-5">
            <WorldClocks locale={locale} />
            <EuroRatesWidget locale={locale} rates={rates} />
          </div>
        </Container>
      </Section>

      <Section className="bg-[#fffaf0] py-8 sm:py-10">
        <Container>
          <SafetyPanel locale={locale} />
        </Container>
      </Section>
    </>
  );
}

function ToolSources({ label, sources }: { label: string; sources: ReturnType<typeof getTravelToolSources> }) {
  return (
    <div className="border border-[#dfd2b8] bg-[#fffdf8] p-5">
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{label}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {sources.map((source) => (
          <div key={source.id} className="border border-[#e6d9c6] bg-white/65 p-4">
            <p className="font-semibold text-[#173f36]">{source.providerLabel}</p>
            <p className="mt-1 text-sm leading-6 text-[#71665b]">{source.attribution}</p>
            <p className="mt-2 text-xs leading-5 text-[#71665b]">Cache: {source.cacheDuration}</p>
            <a href={source.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-9 items-center border border-[#c6a66a] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7]">Official source</a>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolGuides({ label, locale, guideSlugs }: { label: string; locale: Locale; guideSlugs: string[] }) {
  return (
    <div className="border border-[#dfd2b8] bg-[#fffdf8] p-5">
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{label}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {guideSlugs.map((guideSlug) => {
          const guide = getGuideArticle(guideSlug);
          const label = guide ? guide.title[locale] : guideSlug;
          return <Link key={guideSlug} href={`/${locale}/guide/${guideSlug}` as Route} className="inline-flex min-h-9 items-center border border-[#dfd2b8] px-3 py-2 text-xs font-semibold text-[#173f36] hover:bg-[#f3ead7]">{label}</Link>;
        })}
      </div>
    </div>
  );
}

export async function TravelToolDetailPage({ locale, slug }: { locale: Locale; slug: TravelToolSlug }) {
  const tool = getTravelTool(slug);
  if (!tool) return null;
  const copy = travelToolSectionCopy[locale];
  const text = ui[locale];
  const sources = getTravelToolSources(tool.sourceIds);
  const isWeatherDetail = slug === "weather";
  const rightNow = await getMentonRightNow(isWeatherDetail ? 16 : 5);
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
          <div className={isWeatherDetail ? "grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)]" : ""}>
            <div>
              <Link href={`/${locale}/tools` as Route} className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#b49353] hover:text-[#173f36]">{copy.title}</Link>
              <h1 className="mt-4 max-w-5xl serif-heading text-5xl leading-[0.96] text-[#173f36] sm:text-6xl">{localizeText(tool.title, locale)}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#5c5044]">{localizeText(tool.intro, locale)}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <ToolStateBadge locale={locale} status={stateToStatus(tool.state)} />
                {sources[0] ? <span className="inline-flex min-h-9 items-center border border-[#dfd2b8] bg-[#fffdf8] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#71665b]">{copy.source}: {sources[0].providerLabel}</span> : null}
              </div>
            </div>
            {isWeatherDetail ? (
              <div className="relative aspect-[4/3] overflow-hidden border border-[#dfd2b8] bg-[#eaf8fb] shadow-[0_18px_50px_rgba(31,105,126,0.12)]">
                <Image src="/images/tools/weather.png" alt="Menton weather over the Mediterranean" fill priority sizes="(min-width: 1024px) 36vw, 100vw" className="object-cover" />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#fffaf0] py-8 sm:py-10">
        <Container>
          {isWeatherDetail ? (
            <>
              <UnifiedConditionsPanel locale={locale} rightNow={rightNow} extended />
              <section className="mt-8 border border-[#dfd2b8] bg-[#fffdf8] px-5 py-6 sm:px-8 sm:py-7">
                <p className="max-w-4xl text-base leading-8 text-[#51483f] sm:text-lg sm:leading-9">{text.climateOverview}</p>
              </section>
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <ToolSources label={copy.source} sources={sources} />
                <ToolGuides label={text.guides} locale={locale} guideSlugs={tool.relatedGuideSlugs} />
              </div>
            </>
          ) : (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
              <div className="space-y-6">{await renderToolContent(locale, slug, rightNow)}</div>
              <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
                <ToolSources label={copy.source} sources={sources} />
                <ToolGuides label={text.guides} locale={locale} guideSlugs={tool.relatedGuideSlugs} />
              </aside>
            </div>
          )}
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

function weatherGlyphTone(code?: number) {
  if (typeof code !== "number") return "partly";
  if (code === 0) return "sun";
  if ([1, 2].includes(code)) return "partly";
  if (code === 3) return "cloud";
  if ([45, 48].includes(code)) return "mist";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  if ([95, 96, 99].includes(code)) return "storm";
  return "partly";
}

function waveTone(height?: number) {
  if (typeof height !== "number") return "calm";
  if (height < 0.2) return "flat";
  if (height < 0.6) return "calm";
  if (height < 1.2) return "breezy";
  return "stormy";
}

function formatToolDay(locale: Locale, value: string) {
  return new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short" }).format(new Date(value));
}

function beachFlagTone(waveHeight?: number, rainChance?: number) {
  if (typeof waveHeight === "number" && waveHeight >= 1.2) return "red";
  if (typeof rainChance === "number" && rainChance >= 60) return "red";
  if (typeof waveHeight === "number" && waveHeight >= 0.6) return "yellow";
  if (typeof rainChance === "number" && rainChance >= 30) return "yellow";
  return "green";
}

function WeatherGlyphPanel({ code, compact = false }: { code?: number; compact?: boolean }) {
  const tone = weatherGlyphTone(code);
  const sizeClass = compact ? "h-12 w-12" : "h-24 w-24";

  if (tone === "sun") {
    return (
      <svg className={sizeClass} viewBox="0 0 96 96" aria-hidden="true">
        <g stroke="#f3a42d" strokeLinecap="round" strokeWidth="5">
          <path d="M48 6v12" />
          <path d="M48 78v12" />
          <path d="M6 48h12" />
          <path d="M78 48h12" />
          <path d="m18 18 8.5 8.5" />
          <path d="m69.5 69.5 8.5 8.5" />
          <path d="m78 18-8.5 8.5" />
          <path d="m26.5 69.5-8.5 8.5" />
        </g>
        <circle cx="48" cy="48" r="23" fill="#e98524" />
        <circle cx="43" cy="42" r="17" fill="#f7bd3c" />
        <circle cx="38" cy="36" r="7" fill="#fff4a8" opacity="0.9" />
      </svg>
    );
  }

  if (tone === "partly") {
    return (
      <svg className={sizeClass} viewBox="0 0 96 96" aria-hidden="true">
        <circle cx="34" cy="34" r="16" fill="#f7bd3c" />
        <path
          d="M26 63h40c8 0 14-5 14-12 0-7-5-12-12-13-3-9-11-15-21-15-11 0-20 7-22 18-7 1-12 6-12 11 0 7 6 11 13 11Z"
          fill="#f8fbff"
          stroke="#d5e2e8"
          strokeWidth="3"
        />
        <path d="M22 72h48" stroke="#6fc2d4" strokeLinecap="round" strokeWidth="4" />
      </svg>
    );
  }

  if (tone === "rain" || tone === "storm") {
    return (
      <svg className={sizeClass} viewBox="0 0 96 96" aria-hidden="true">
        <path
          d="M24 57h44c10 0 17-6 17-15 0-8-6-14-14-15-4-12-14-20-27-20-15 0-27 10-30 24C6 33 0 39 0 47c0 7 7 10 24 10Z"
          fill="#ecf5f8"
          stroke="#b9d5dd"
          strokeWidth="3"
          transform="translate(6 8)"
        />
        {tone === "storm" ? (
          <path d="M50 54 39 73h11l-4 15 17-22H52l6-12Z" fill="#f7bd3c" />
        ) : (
          <g stroke="#1f9bb8" strokeLinecap="round" strokeWidth="4">
            <path d="M30 67 25 80" />
            <path d="M48 67 43 80" />
            <path d="M66 67 61 80" />
          </g>
        )}
      </svg>
    );
  }

  if (tone === "mist") {
    return (
      <svg className={sizeClass} viewBox="0 0 96 96" aria-hidden="true">
        <circle cx="30" cy="26" r="13" fill="#f7bd3c" opacity="0.85" />
        <g stroke="#9cc8d3" strokeLinecap="round" strokeWidth="5">
          <path d="M18 44h56" />
          <path d="M12 58h68" />
          <path d="M24 72h44" />
        </g>
      </svg>
    );
  }

  if (tone === "snow") {
    return (
      <svg className={sizeClass} viewBox="0 0 96 96" aria-hidden="true">
        <path
          d="M24 57h44c10 0 17-6 17-15 0-8-6-14-14-15-4-12-14-20-27-20-15 0-27 10-30 24C6 33 0 39 0 47c0 7 7 10 24 10Z"
          fill="#f8fbff"
          stroke="#c8dce3"
          strokeWidth="3"
          transform="translate(6 8)"
        />
        <g fill="#80cde0">
          <circle cx="34" cy="74" r="3" />
          <circle cx="50" cy="81" r="3" />
          <circle cx="66" cy="74" r="3" />
        </g>
      </svg>
    );
  }

  return (
    <svg className={sizeClass} viewBox="0 0 96 96" aria-hidden="true">
      <path
        d="M22 64h48c10 0 17-6 17-15 0-8-6-14-14-15-4-12-14-20-27-20-15 0-27 10-30 24C8 40 2 46 2 54c0 7 7 10 20 10Z"
        fill="#eef6f5"
        stroke="#bdd6d0"
        strokeWidth="3"
      />
    </svg>
  );
}

function SeaGlyphPanel({ waveHeight, compact = false }: { waveHeight?: number; compact?: boolean }) {
  const tone = waveTone(waveHeight);
  const sizeClass = compact ? "h-12 w-12" : "h-20 w-20";

  return (
    <svg className={sizeClass} viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="48" cy="20" r="10" fill="#8ed0de" opacity="0.35" />
      <g fill="none" strokeLinecap="round" strokeWidth="5">
        <path d="M12 46c8-7 16-7 24 0s16 7 24 0 16-7 24 0 16 7 24 0" stroke="#6bbcd0" />
        <path d="M12 58c8-7 16-7 24 0s16 7 24 0 16-7 24 0 16 7 24 0" stroke="#4ea8c0" />
        <path d="M12 70c8-7 16-7 24 0s16 7 24 0 16-7 24 0 16 7 24 0" stroke="#2c90ad" />
      </g>
      {tone === "flat" ? <path d="M20 56h56" stroke="#6bbcd0" strokeWidth="4" strokeLinecap="round" /> : null}
      {tone === "breezy" ? <path d="M56 34c6 0 8 4 8 8" stroke="#4ea8c0" strokeWidth="4" strokeLinecap="round" /> : null}
      {tone === "stormy" ? <path d="M52 26 44 42h8l-4 14 14-18h-8l5-12Z" fill="#f7bd3c" /> : null}
    </svg>
  );
}

function BeachFlagGlyph({ tone }: { tone: "green" | "yellow" | "red" }) {
  const fill = tone === "green" ? "#5ea66b" : tone === "yellow" ? "#f0c14b" : "#d96b5a";

  return (
    <svg className="h-16 w-16" viewBox="0 0 96 96" aria-hidden="true">
      <path d="M26 16v64" stroke="#8b6a44" strokeWidth="5" strokeLinecap="round" />
      <path d="M29 22h34l-8 12 8 12H29Z" fill={fill} stroke={fill} strokeLinejoin="round" strokeWidth="3" />
      <path d="M18 82h18" stroke="#8b6a44" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function detailValue(value: number | undefined, unit: string, digits = 0) {
  if (typeof value !== "number") return "—";
  return `${digits > 0 ? value.toFixed(digits) : Math.round(value)}${unit}`;
}

type MetricKind = "feelsLike" | "humidity" | "wind" | "gusts" | "uv" | "air" | "waves" | "swell";

function metricTone(kind: MetricKind, value?: number) {
  if (typeof value !== "number") return "muted";
  if (kind === "feelsLike") return value < 10 ? "cool" : value < 24 ? "mild" : value < 32 ? "warm" : "hot";
  if (kind === "humidity") return value < 40 ? "dry" : value < 70 ? "balanced" : value < 85 ? "humid" : "very-humid";
  if (kind === "wind" || kind === "gusts") return value < 12 ? "calm" : value < 28 ? "breezy" : value < 50 ? "strong" : "stormy";
  if (kind === "uv") return value <= 2 ? "low" : value <= 5 ? "moderate" : value <= 7 ? "high" : value <= 10 ? "very-high" : "extreme";
  if (kind === "air") return value <= 50 ? "good" : value <= 100 ? "moderate" : value <= 150 ? "sensitive" : "unhealthy";
  return waveTone(value);
}

function MetricGlyph({ kind, value }: { kind: MetricKind; value?: number }) {
  const tone = metricTone(kind, value);
  const colors: Record<string, string> = {
    cool: "#5baac0",
    mild: "#73b9c6",
    warm: "#e98524",
    hot: "#d75d40",
    dry: "#c9a24e",
    balanced: "#73b9a8",
    humid: "#4ea8c0",
    "very-humid": "#2c789b",
    calm: "#73b9c6",
    breezy: "#4ea8c0",
    strong: "#e0a13a",
    stormy: "#d75d40",
    low: "#73b9a8",
    moderate: "#e0b04f",
    high: "#e98524",
    "very-high": "#d75d40",
    extreme: "#a94b55",
    good: "#5ea66b",
    sensitive: "#e98524",
    unhealthy: "#d75d40",
    flat: "#73b9c6",
    "muted": "#b9b09e",
  };
  const color = colors[tone] ?? "#4ea8c0";

  return (
    <svg className="h-14 w-14 shrink-0" viewBox="0 0 64 64" aria-hidden="true">
      {kind === "feelsLike" ? (
        <>
          <path d="M31 10a7 7 0 0 0-7 7v22a12 12 0 1 0 14 0V17a7 7 0 0 0-7-7Z" fill="none" stroke={color} strokeWidth="4" />
          <path d="M31 25v22" stroke={color} strokeLinecap="round" strokeWidth="5" />
          <circle cx="31" cy="48" r="7" fill={color} />
        </>
      ) : null}
      {kind === "humidity" ? (
        <path d="M32 8C26 18 16 28 16 39a16 16 0 0 0 32 0C48 28 38 18 32 8Z" fill="none" stroke={color} strokeWidth="4" />
      ) : null}
      {kind === "wind" || kind === "gusts" ? (
        <g fill="none" stroke={color} strokeLinecap="round" strokeWidth="4">
          <path d="M8 23h31c7 0 7-10 0-10-3 0-5 2-6 4" />
          <path d="M8 33h43c7 0 7-10 0-10-3 0-5 2-6 4" />
          <path d="M8 43h27c7 0 7 10 0 10-3 0-5-2-6-4" />
        </g>
      ) : null}
      {kind === "uv" ? (
        <>
          <circle cx="32" cy="32" r="12" fill={color} />
          <g stroke={color} strokeLinecap="round" strokeWidth="4">
            <path d="M32 7v8M32 49v8M7 32h8M49 32h8M14 14l6 6M44 44l6 6M50 14l-6 6M20 44l-6 6" />
          </g>
        </>
      ) : null}
      {kind === "air" ? (
        <g fill="none" stroke={color} strokeLinecap="round" strokeWidth="4">
          <path d="M10 24h24c7 0 7-10 0-10-3 0-5 2-6 4" />
          <path d="M10 36h38" />
          <path d="M10 48h25c7 0 7-10 0-10" />
        </g>
      ) : null}
      {kind === "waves" || kind === "swell" ? (
        <g fill="none" stroke={color} strokeLinecap="round" strokeWidth="4">
          <path d="M8 25c8-7 16-7 24 0s16 7 24 0" />
          <path d="M8 37c8-7 16-7 24 0s16 7 24 0" />
          <path d="M8 49c8-7 16-7 24 0s16 7 24 0" />
        </g>
      ) : null}
    </svg>
  );
}

function UnifiedConditionsPanel({ locale, rightNow, extended = false }: { locale: Locale; rightNow: Awaited<ReturnType<typeof getMentonRightNow>>; extended?: boolean }) {
  const copy = travelToolSectionCopy[locale];
  const text = ui[locale];
  const weather = rightNow.weather;
  const marine = rightNow.marine;
  const air = rightNow.airQuality;
  const forecast = weather?.forecast ?? [];
  const detailCards = [
    { label: text.feelsLike, value: weather?.feelsLike, formatted: detailValue(weather?.feelsLike, "°C"), kind: "feelsLike", tone: "sand" },
    { label: text.humidity, value: weather?.humidity, formatted: detailValue(weather?.humidity, "%"), kind: "humidity", tone: "sand" },
    { label: text.wind, value: weather?.windSpeed, formatted: detailValue(weather?.windSpeed, " km/h"), kind: "wind", tone: "sand" },
    { label: text.windGusts, value: weather?.windGusts, formatted: detailValue(weather?.windGusts, " km/h"), kind: "gusts", tone: "sand" },
    {
      label: text.uv,
      value: typeof air?.uvIndex === "number" ? air.uvIndex : weather?.uvIndexMax,
      formatted:
        typeof air?.uvIndex === "number"
          ? air.uvIndex.toFixed(1)
          : typeof weather?.uvIndexMax === "number"
            ? weather.uvIndexMax.toFixed(1)
            : "—",
      kind: "uv",
      tone: "sea",
    },
    { label: text.airQuality, value: air?.europeanAqi, formatted: typeof air?.europeanAqi === "number" ? `${air.europeanAqi}` : "—", kind: "air", tone: "sea" },
    { label: text.wavesNow, value: marine?.waveHeight, formatted: detailValue(marine?.waveHeight, " m", 1), kind: "waves", tone: "sea" },
    { label: text.swellNow, value: marine?.swellWaveHeight, formatted: detailValue(marine?.swellWaveHeight, " m", 1), kind: "swell", tone: "sea" },
  ] as const;

  return (
    <section className="relative overflow-hidden border-y border-[#dfd4c1] bg-[#f7efe0]">
      <div
        className="absolute inset-0 opacity-90"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(140deg, rgba(255,244,205,0.96) 0%, rgba(209,235,239,0.82) 42%, rgba(251,247,239,0.86) 70%), radial-gradient(circle at 18% 18%, rgba(247,189,60,0.42), transparent 26%), linear-gradient(180deg, transparent 68%, rgba(61,156,180,0.14) 69%, rgba(61,156,180,0.06) 80%, transparent 81%)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-6 px-5 py-8 sm:px-6 lg:px-8">
        <div className="border border-white/60 bg-[#fbf7ef]/72 p-5 shadow-[0_18px_50px_rgba(31,105,126,0.10)] backdrop-blur-sm sm:p-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#b07820]">{copy.rightNowTitle}</p>
          <h2 className="mt-3 serif-heading text-4xl leading-none text-[#173f36]">{text.conditionsTitle}</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-[#5c5044]">{text.conditionsText}</p>

          <div className={`mt-6 grid gap-5 ${extended ? "grid-cols-1" : "xl:grid-cols-[0.82fr_1.18fr]"}`}>
            <div className="relative overflow-hidden border border-white/70 bg-white/58 p-6 shadow-[0_18px_50px_rgba(31,105,126,0.12)] backdrop-blur-sm sm:p-8">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#f7bd3c]/28 blur-2xl" aria-hidden="true" />
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#b07820]">{text.currentConditions}</p>
              <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_0.95fr]">
                <div className="flex items-center gap-5">
                  <WeatherGlyphPanel code={weather?.weatherCode} />
                  <div>
                    <p className="font-serif-display text-7xl font-semibold leading-none text-[#173f36]">
                      {weather ? `${weather.temperature}°C` : copy.unavailable}
                    </p>
                    <p className="mt-2 text-base font-semibold text-[#4f615c]">
                      {weather ? weatherLabel(weather.weatherCode) : copy.unavailable}
                    </p>
                  </div>
                </div>
                <div className="border border-white/70 bg-[#eaf8fb]/78 px-4 py-4">
                  <div className="flex items-center gap-4">
                    <SeaGlyphPanel waveHeight={marine?.waveHeight} />
                    <div>
                      <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#0b6f8f]">{text.sea}</p>
                      <p className="mt-2 text-3xl font-semibold text-[#173f36]">
                        {typeof marine?.seaTemperature === "number" ? `${marine.seaTemperature}°C` : "—"}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[#58706d]">
                        {typeof marine?.waveHeight === "number" ? `${detailValue(marine.waveHeight, " m", 1)} · ${text.wavesNow}` : text.seaUnavailable}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 max-w-sm border border-white/70 bg-[#fff9ed]/76 px-4 py-4">
                <div>
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b07820]">{text.wavePeriod}</p>
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <p className="text-3xl font-semibold text-[#173f36]">{detailValue(marine?.swellWavePeriod, " s", 1)}</p>
                    <MetricGlyph kind="swell" value={marine?.swellWaveHeight} />
                  </div>
                  <p className="mt-1 text-xs leading-5 text-[#58706d]">
                    {typeof marine?.swellWaveHeight === "number" ? `${detailValue(marine.swellWaveHeight, " m", 1)} · ${text.swellNow}` : text.seaUnavailable}
                  </p>
                </div>
              </div>
            </div>

            <div className={`flex min-w-0 flex-col border border-white/60 bg-[#fbf7ef]/72 p-4 shadow-[0_18px_50px_rgba(31,105,126,0.10)] backdrop-blur-sm sm:p-5 ${extended ? "" : "justify-between"}`}>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#b07820]">{text.nextDays}</p>
                  {extended ? <p className="text-xs text-[#71665b]">{text.forecastHint}</p> : null}
                </div>
                <div className={extended ? "mt-4 flex min-w-0 snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]" : "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5"}>
                  {forecast.map((day) => (
                    <div
                      key={day.date}
                      className={`${extended ? "w-[9.25rem] shrink-0 snap-start" : ""} border border-white/80 bg-white/70 p-3 text-center shadow-[0_10px_24px_rgba(31,105,126,0.08)]`}
                    >
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#6c7169]">{formatToolDay(locale, day.date)}</p>
                      <div className="mt-3 flex justify-center">
                        <WeatherGlyphPanel code={day.weatherCode} compact />
                      </div>
                      <p className="mt-3 text-base font-semibold text-[#1b2c2d]">
                        {day.high}° / {day.low}°
                      </p>
                      <div className="mt-3 flex justify-center">
                        <BeachFlagGlyph tone={beachFlagTone(day.waveHeight, day.rainChance)} />
                      </div>
                      {typeof day.seaTemperature === "number" ? <p className="mt-2 text-xs font-medium text-[#58706d]">{text.seaForecast}: {day.seaTemperature.toFixed(1)}°C</p> : null}
                      {typeof day.rainChance === "number" ? <p className="mt-1 text-xs font-medium text-[#58706d]">{text.rainForecast}: {day.rainChance}%</p> : null}
                      {typeof day.waveHeight === "number" ? <p className="mt-1 text-xs font-medium text-[#58706d]">{text.wavesNow}: {day.waveHeight.toFixed(1)} m</p> : null}
                      {typeof day.windSpeedMax === "number" ? <p className="mt-1 text-xs font-medium text-[#58706d]">{text.wind}: {day.windSpeedMax} km/h</p> : null}
                      {typeof day.uvIndexMax === "number" ? <p className="mt-1 text-xs font-medium text-[#58706d]">{text.uv}: {day.uvIndexMax.toFixed(1)}</p> : null}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-5 text-[#695f51]">
                  {text.updated}: {new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(new Date(weather?.updatedAt ?? marine?.updatedAt ?? new Date().toISOString()))} · {text.provider}: {weather?.provider ?? marine?.provider ?? "Open-Meteo"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {detailCards.map((card) => (
              <div
                key={card.label}
                className={`border px-4 py-4 ${
                  card.tone === "sea" ? "border-white/70 bg-[#eaf8fb]/78" : "border-white/70 bg-[#fff9ed]/76"
                }`}
              >
                <p className={`text-[0.62rem] font-bold uppercase tracking-[0.16em] ${card.tone === "sea" ? "text-[#0b6f8f]" : "text-[#b07820]"}`}>{card.label}</p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <p className="text-2xl font-semibold text-[#173f36]">{card.formatted}</p>
                  <MetricGlyph kind={card.kind} value={card.value} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 border-t border-white/80 pt-5">
            <Link href={`/${locale}/tools/weather` as Route} className="inline-flex min-h-10 items-center border border-[#173f36] bg-[#173f36] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white hover:bg-[#235246]">{text.weatherToolCta}</Link>
            <Link href={`/${locale}/tools/sea` as Route} className="inline-flex min-h-10 items-center border border-[#c6a66a] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7]">{text.seaToolCta}</Link>
            <Link href={`/${locale}/tools/beaches` as Route} className="inline-flex min-h-10 items-center border border-[#c6a66a] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7]">{text.beachesToolCta}</Link>
          </div>
        </div>
      </div>
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
