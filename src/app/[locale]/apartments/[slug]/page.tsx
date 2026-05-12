import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApartmentGallery } from "@/components/apartments/ApartmentGallery";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { apartments, getApartment, type Apartment } from "@/content/apartments";
import { t } from "@/content/translations";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { imageObjectPosition } from "@/lib/apartment-images";
import { absoluteUrl, createMetadata, localizedPath } from "@/lib/seo";
import { breadcrumbJsonLd, vacationRentalJsonLd } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

type ApartmentPageStory = {
  tagline: string;
  experience: string;
  inside: string;
  goodToKnow: string[];
  appreciate: string[];
  location: string[];
  faq: Array<{ question: string; answer: string }>;
  amenityGroups: Array<{ title: string; items: string[] }>;
  glanceExtra: Array<{ label: string; value: string }>;
};

const pageCopy: Record<
  Locale,
  {
    eyebrow: string;
    atAGlance: string;
    experienceTitle: string;
    insideTitle: string;
    appreciateTitle: string;
    amenitiesTitle: string;
    locationTitle: string;
    goodToKnowTitle: string;
    relatedTitle: string;
    faqTitle: string;
    insideHeading: string;
    amenitiesHeading: string;
    locationHeading: string;
    finalTitle: string;
    finalText: string;
    compare: string;
    beaches: string;
    withoutCar: string;
    lemonFestival: string;
    dayTrips: string;
  }
> = {
  en: {
    eyebrow: "Azur Menton apartment",
    atAGlance: "At a glance",
    experienceTitle: "Why this apartment",
    insideTitle: "Inside the apartment",
    appreciateTitle: "What guests appreciate",
    amenitiesTitle: "Amenities, grouped simply",
    locationTitle: "Location notes",
    goodToKnowTitle: "Good to know",
    relatedTitle: "Plan around this stay",
    faqTitle: "Apartment FAQ",
    insideHeading: "A practical seaside base",
    amenitiesHeading: "Comfort without overclaiming",
    locationHeading: "Central Menton, close to the sea",
    finalTitle: "Tell us your dates and we will confirm availability directly.",
    finalText:
      "This is a direct booking request, not instant confirmation. We will reply with availability and the best direct offer.",
    compare: "Compare apartments",
    beaches: "Beaches in Menton",
    withoutCar: "Menton without a car",
    lemonFestival: "Lemon Festival stays",
    dayTrips: "Riviera day trips",
  },
  fr: {
    eyebrow: "Appartement Azur Menton",
    atAGlance: "En un coup d'oeil",
    experienceTitle: "Pourquoi choisir cet appartement",
    insideTitle: "A l'interieur",
    appreciateTitle: "Ce que les voyageurs apprecient",
    amenitiesTitle: "Equipements par categorie",
    locationTitle: "Notes sur l'emplacement",
    goodToKnowTitle: "Bon a savoir",
    relatedTitle: "Preparer ce sejour",
    faqTitle: "Questions sur l'appartement",
    insideHeading: "Une base pratique au bord de mer",
    amenitiesHeading: "Du confort, sans promesses exagerees",
    locationHeading: "Menton centre, pres de la mer",
    finalTitle: "Envoyez-nous vos dates et nous confirmerons la disponibilite directement.",
    finalText:
      "Il s'agit d'une demande de reservation directe, pas d'une confirmation instantanee. Nous repondons avec la disponibilite et la meilleure offre directe.",
    compare: "Comparer les appartements",
    beaches: "Plages de Menton",
    withoutCar: "Menton sans voiture",
    lemonFestival: "Sejour pendant la Fete du Citron",
    dayTrips: "Excursions Riviera",
  },
  it: {
    eyebrow: "Appartamento Azur Menton",
    atAGlance: "In breve",
    experienceTitle: "Perche scegliere questo appartamento",
    insideTitle: "Dentro l'appartamento",
    appreciateTitle: "Cosa apprezzano gli ospiti",
    amenitiesTitle: "Servizi per categoria",
    locationTitle: "Note sulla posizione",
    goodToKnowTitle: "Da sapere",
    relatedTitle: "Organizza il soggiorno",
    faqTitle: "Domande sull'appartamento",
    insideHeading: "Una base pratica sul mare",
    amenitiesHeading: "Comfort senza promesse eccessive",
    locationHeading: "Mentone centrale, vicino al mare",
    finalTitle: "Raccontaci le tue date e confermeremo direttamente la disponibilita.",
    finalText:
      "Questa e una richiesta diretta, non una conferma immediata. Risponderemo con disponibilita e migliore offerta diretta.",
    compare: "Confronta appartamenti",
    beaches: "Spiagge di Mentone",
    withoutCar: "Mentone senza auto",
    lemonFestival: "Soggiorni per la Festa del Limone",
    dayTrips: "Gite sulla Riviera",
  },
  uk: {
    eyebrow: "Апартаменти Azur Menton",
    atAGlance: "Коротко",
    experienceTitle: "Чому обрати ці апартаменти",
    insideTitle: "Усередині",
    appreciateTitle: "Що цінують гості",
    amenitiesTitle: "Зручності за категоріями",
    locationTitle: "Про локацію",
    goodToKnowTitle: "Важливо знати",
    relatedTitle: "Сплануйте перебування",
    faqTitle: "Питання про апартаменти",
    insideHeading: "Практична база біля моря",
    amenitiesHeading: "Комфорт без перебільшень",
    locationHeading: "Центральний Ментон, близько до моря",
    finalTitle: "Надішліть нам дати, і ми напряму підтвердимо доступність.",
    finalText:
      "Це прямий запит на бронювання, а не миттєве підтвердження. Ми відповімо щодо доступності та найкращої прямої пропозиції.",
    compare: "Порівняти апартаменти",
    beaches: "Пляжі Ментона",
    withoutCar: "Ментон без авто",
    lemonFestival: "Поїздка на Фестиваль лимонів",
    dayTrips: "Подорожі Рив'єрою",
  },
};

const stories: Record<string, Record<Locale, ApartmentPageStory>> = {
  "sea-view-balcony-studio": {
    en: {
      tagline:
        "A bright beachfront balcony studio for guests who want to wake up close to the Mediterranean and stay right by the beach.",
      experience:
        "This studio is for guests who choose Menton for the sea. Open the balcony doors, start the morning with coffee above the promenade, and keep the beach, cafes and old town within easy walking distance.",
      inside:
        "The apartment is a studio-style space with a double bed, sofa bed for an additional guest, dining corner, kitchenette and private bathroom. It works best for a couple, while the sofa bed gives flexibility for one extra guest.",
      goodToKnow: [
        "Direct requests are confirmed manually by the host.",
        "Private on-site parking may be available by reservation and extra charges may apply.",
        "The studio works best for two guests, with flexibility for one additional guest on the sofa bed.",
      ],
      appreciate: [
        "Private balcony with sea view for coffee, reading or watching the seafront.",
        "Beachfront position with the promenade, cafes and old town close on foot.",
        "Simple studio layout with practical amenities for a seaside stay.",
        "Family-run direct communication before confirmation.",
      ],
      location: [
        "Beachfront setting in central Menton, close to the Mediterranean promenade.",
        "Cafes, restaurants and the old town are reachable on foot.",
        "Parking should be requested in advance if needed.",
      ],
      faq: [
        {
          question: "Is this apartment best for couples?",
          answer: "Yes. It is designed around a couple-friendly studio layout and balcony sea view.",
        },
        {
          question: "Does it have a balcony?",
          answer: "Yes. The private balcony is one of the main reasons to choose this studio.",
        },
        {
          question: "Is parking guaranteed?",
          answer: "No. Private parking may be available by reservation and extra charges may apply.",
        },
      ],
      amenityGroups: [
        { title: "Comfort", items: ["Air conditioning", "Free Wi-Fi", "Lift access"] },
        { title: "Kitchen", items: ["Kitchenette", "Dining corner"] },
        { title: "Bathroom / laundry", items: ["Private bathroom", "Washing machine"] },
        { title: "Outdoor / view", items: ["Private balcony", "Mediterranean sea view"] },
      ],
      glanceExtra: [
        { label: "View", value: "Sea-view balcony" },
        { label: "Best for", value: "Couples" },
      ],
    },
    fr: {
      tagline:
        "Un studio lumineux en front de mer pour les voyageurs qui veulent se reveiller pres de la Mediterranee et rester tout pres de la plage.",
      experience:
        "Ce studio s'adresse aux voyageurs qui choisissent Menton pour la mer. Ouvrez les portes du balcon, commencez la matinee avec un cafe au-dessus de la promenade et gardez la plage, les cafes et la vieille ville a distance de marche.",
      inside:
        "L'appartement est un espace studio avec lit double, canape-lit pour un voyageur supplementaire, coin repas, kitchenette et salle de bain privee. Il convient surtout a un couple, avec une flexibilite pour une personne en plus.",
      goodToKnow: [
        "Les demandes directes sont confirmees manuellement par l'hote.",
        "Un parking prive sur place peut etre disponible sur reservation et avec frais supplementaires.",
        "Le studio convient surtout a deux personnes, avec un canape-lit pour un voyageur supplementaire.",
      ],
      appreciate: [
        "Balcon prive avec vue mer pour le cafe, la lecture ou observer le front de mer.",
        "Adresse en front de mer avec promenade, cafes et vieille ville accessibles a pied.",
        "Plan studio simple avec les equipements pratiques pour un sejour au bord de mer.",
        "Communication directe avec une equipe familiale avant confirmation.",
      ],
      location: [
        "Situation en front de mer dans le centre de Menton, proche de la promenade mediterraneenne.",
        "Cafes, restaurants et vieille ville sont accessibles a pied.",
        "Le parking doit etre demande a l'avance si necessaire.",
      ],
      faq: [
        { question: "L'appartement convient-il surtout aux couples ?", answer: "Oui. Le studio est pense autour d'un sejour a deux avec balcon et vue mer." },
        { question: "Y a-t-il un balcon ?", answer: "Oui. Le balcon prive est l'un des principaux atouts du studio." },
        { question: "Le parking est-il garanti ?", answer: "Non. Un parking prive peut etre disponible sur reservation, avec frais supplementaires possibles." },
      ],
      amenityGroups: [
        { title: "Confort", items: ["Climatisation", "Wi-Fi gratuit", "Ascenseur"] },
        { title: "Cuisine", items: ["Kitchenette", "Coin repas"] },
        { title: "Salle de bain / linge", items: ["Salle de bain privee", "Lave-linge"] },
        { title: "Exterieur / vue", items: ["Balcon prive", "Vue sur la Mediterranee"] },
      ],
      glanceExtra: [
        { label: "Vue", value: "Balcon avec vue mer" },
        { label: "Ideal pour", value: "Couples" },
      ],
    },
    it: {
      tagline:
        "Un luminoso studio fronte mare per chi vuole svegliarsi vicino al Mediterraneo e stare proprio accanto alla spiaggia.",
      experience:
        "Questo studio e per gli ospiti che scelgono Mentone per il mare. Apri le porte del balcone, inizia la mattina con un caffe sopra la passeggiata e tieni spiaggia, caffe e centro storico a pochi passi.",
      inside:
        "L'appartamento e uno spazio studio con letto matrimoniale, divano letto per un ospite in piu, angolo pranzo, kitchenette e bagno privato. Funziona al meglio per una coppia, con flessibilita per una terza persona.",
      goodToKnow: [
        "Le richieste dirette sono confermate manualmente dall'host.",
        "Il parcheggio privato in loco puo essere disponibile su prenotazione e con costi aggiuntivi.",
        "Lo studio e ideale per due ospiti, con divano letto per un ospite aggiuntivo.",
      ],
      appreciate: [
        "Balcone privato con vista mare per colazione, lettura o osservare il lungomare.",
        "Posizione fronte mare con passeggiata, caffe e centro storico raggiungibili a piedi.",
        "Layout semplice da studio con servizi pratici per un soggiorno al mare.",
        "Comunicazione diretta con una gestione familiare prima della conferma.",
      ],
      location: [
        "Posizione fronte mare nel centro di Mentone, vicino alla passeggiata mediterranea.",
        "Caffe, ristoranti e centro storico sono raggiungibili a piedi.",
        "Il parcheggio va richiesto in anticipo se necessario.",
      ],
      faq: [
        { question: "E adatto soprattutto alle coppie?", answer: "Si. Lo studio e pensato per un soggiorno di coppia con balcone e vista mare." },
        { question: "Ha un balcone?", answer: "Si. Il balcone privato e uno dei motivi principali per scegliere questo studio." },
        { question: "Il parcheggio e garantito?", answer: "No. Il parcheggio privato puo essere disponibile su prenotazione e con costi aggiuntivi." },
      ],
      amenityGroups: [
        { title: "Comfort", items: ["Aria condizionata", "Wi-Fi gratuito", "Ascensore"] },
        { title: "Cucina", items: ["Kitchenette", "Angolo pranzo"] },
        { title: "Bagno / lavanderia", items: ["Bagno privato", "Lavatrice"] },
        { title: "Esterno / vista", items: ["Balcone privato", "Vista Mediterraneo"] },
      ],
      glanceExtra: [
        { label: "Vista", value: "Balcone vista mare" },
        { label: "Ideale per", value: "Coppie" },
      ],
    },
    uk: {
      tagline:
        "Світла студія на першій лінії для гостей, які хочуть прокидатися поруч із Середземним морем і жити біля пляжу.",
      experience:
        "Ця студія для тих, хто обирає Ментон заради моря. Відчиніть двері на балкон, почніть ранок з кави над променадом і залишайте пляж, кафе та старе місто в пішій доступності.",
      inside:
        "Це студія з двоспальним ліжком, диваном-ліжком для додаткового гостя, обіднім кутком, kitchenette та приватною ванною кімнатою. Найкраще підходить для пари, але дає гнучкість для ще одного гостя.",
      goodToKnow: [
        "Прямі запити підтверджуються господарем вручну.",
        "Приватне паркування на місці може бути доступне за попереднім бронюванням і за додаткову плату.",
        "Студія найкраще підходить для двох, з можливістю розмістити ще одного гостя на дивані-ліжку.",
      ],
      appreciate: [
        "Приватний балкон з видом на море для кави, читання або спостереження за набережною.",
        "Розташування біля моря, звідки легко дійти до променаду, кафе та старого міста.",
        "Просте планування студії з практичними зручностями для відпочинку біля моря.",
        "Пряма комунікація з сімейною командою до підтвердження.",
      ],
      location: [
        "Перша лінія в центральному Ментоні, поруч із середземноморським променадом.",
        "Кафе, ресторани та старе місто доступні пішки.",
        "Паркування варто запитувати заздалегідь.",
      ],
      faq: [
        { question: "Це найкраще для пари?", answer: "Так. Студія спроєктована навколо перебування удвох, балкона та виду на море." },
        { question: "Є балкон?", answer: "Так. Приватний балкон - одна з головних переваг цієї студії." },
        { question: "Паркування гарантоване?", answer: "Ні. Приватне паркування може бути доступне за бронюванням і за додаткову плату." },
      ],
      amenityGroups: [
        { title: "Комфорт", items: ["Кондиціонер", "Безкоштовний Wi-Fi", "Ліфт"] },
        { title: "Кухня", items: ["Kitchenette", "Обідній куток"] },
        { title: "Ванна / прання", items: ["Приватна ванна кімната", "Пральна машина"] },
        { title: "Зовні / вид", items: ["Приватний балкон", "Вид на Середземне море"] },
      ],
      glanceExtra: [
        { label: "Вид", value: "Балкон з видом на море" },
        { label: "Найкраще для", value: "Пар" },
      ],
    },
  },
  "beachside-family-apartment": {
    en: {
      tagline:
        "A more spacious beachside apartment for families, two couples or longer stays, with private terrace, full kitchen and parking by reservation.",
      experience:
        "This is the most practical apartment in the Azur Menton collection. It gives you more space, a private terrace for breakfast outdoors, a separate bedroom, a living room with sofa bed and a full kitchen for longer stays.",
      inside:
        "The apartment has one bedroom, a living room with sofa bed, dining area, private bathroom and a fully equipped kitchen with dishwasher, oven, microwave and washing machine.",
      goodToKnow: [
        "Parking is a major advantage in central Menton, but it should be requested in advance and may depend on availability or conditions.",
        "The apartment is beachside, but it should not be considered a direct sea-view apartment.",
        "Direct requests are confirmed manually by the host.",
      ],
      appreciate: [
        "A private terrace for breakfast, reading or an easy evening outdoors.",
        "More interior space than the studios, with one bedroom and a living room sofa bed.",
        "A full kitchen for families or longer stays.",
        "Parking by reservation, useful in central Menton.",
      ],
      location: [
        "Beachside central Menton location, with the sea a short walk away.",
        "Cafes, restaurants, shops, the old town and Menton train station can be reached on foot.",
        "Parking should be discussed before arrival because conditions may vary.",
      ],
      faq: [
        { question: "Is it suitable for families?", answer: "Yes. It is the most practical Azur Menton apartment for families or longer stays." },
        { question: "Does it have parking?", answer: "Parking may be available by reservation and should be requested in advance." },
        { question: "Is there a sea view?", answer: "No. It is positioned around space, terrace, parking and beach proximity, not a direct sea view." },
      ],
      amenityGroups: [
        { title: "Comfort", items: ["Air conditioning", "Free Wi-Fi", "One bedroom plus living room"] },
        { title: "Kitchen", items: ["Fully equipped kitchen", "Dishwasher", "Oven", "Microwave"] },
        { title: "Bathroom / laundry", items: ["Private bathroom", "Washing machine"] },
        { title: "Outdoor / parking", items: ["Private terrace", "Parking by reservation"] },
      ],
      glanceExtra: [
        { label: "Outdoor", value: "Private terrace" },
        { label: "Parking", value: "By reservation" },
      ],
    },
    fr: {
      tagline:
        "Un appartement plus spacieux pres de la plage pour familles, deux couples ou longs sejours, avec terrasse privee, cuisine complete et parking sur reservation.",
      experience:
        "C'est l'appartement le plus pratique de la collection Azur Menton. Il offre plus d'espace, une terrasse privee pour le petit-dejeuner dehors, une chambre separee, un salon avec canape-lit et une cuisine complete pour les sejours plus longs.",
      inside:
        "L'appartement comprend une chambre, un salon avec canape-lit, un coin repas, une salle de bain privee et une cuisine entierement equipee avec lave-vaisselle, four, micro-ondes et lave-linge.",
      goodToKnow: [
        "Le parking est un vrai avantage dans le centre de Menton, mais il doit etre demande a l'avance et peut dependre des disponibilites ou conditions.",
        "L'appartement est proche de la plage, mais ne doit pas etre presente comme un appartement avec vue mer directe.",
        "Les demandes directes sont confirmees manuellement par l'hote.",
      ],
      appreciate: [
        "Terrasse privee pour le petit-dejeuner, la lecture ou une soiree simple dehors.",
        "Plus d'espace interieur que les studios, avec chambre et salon avec canape-lit.",
        "Cuisine complete pour les familles ou les longs sejours.",
        "Parking sur reservation, utile dans le centre de Menton.",
      ],
      location: [
        "Adresse centrale pres de la plage, avec la mer a quelques minutes a pied.",
        "Cafes, restaurants, commerces, vieille ville et gare de Menton sont accessibles a pied.",
        "Le parking doit etre discute avant l'arrivee car les conditions peuvent varier.",
      ],
      faq: [
        { question: "Convient-il aux familles ?", answer: "Oui. C'est l'appartement Azur Menton le plus pratique pour les familles ou les longs sejours." },
        { question: "Y a-t-il un parking ?", answer: "Un parking peut etre disponible sur reservation et doit etre demande a l'avance." },
        { question: "Y a-t-il une vue mer ?", answer: "Non. L'appartement est presente pour son espace, sa terrasse, son parking et sa proximite de la plage." },
      ],
      amenityGroups: [
        { title: "Confort", items: ["Climatisation", "Wi-Fi gratuit", "Une chambre plus salon"] },
        { title: "Cuisine", items: ["Cuisine equipee", "Lave-vaisselle", "Four", "Micro-ondes"] },
        { title: "Salle de bain / linge", items: ["Salle de bain privee", "Lave-linge"] },
        { title: "Exterieur / parking", items: ["Terrasse privee", "Parking sur reservation"] },
      ],
      glanceExtra: [
        { label: "Exterieur", value: "Terrasse privee" },
        { label: "Parking", value: "Sur reservation" },
      ],
    },
    it: {
      tagline:
        "Un appartamento piu spazioso vicino alla spiaggia per famiglie, due coppie o soggiorni lunghi, con terrazza privata, cucina completa e parcheggio su prenotazione.",
      experience:
        "E l'appartamento piu pratico della collezione Azur Menton. Offre piu spazio, una terrazza privata per colazione all'aperto, una camera separata, soggiorno con divano letto e cucina completa per soggiorni piu lunghi.",
      inside:
        "L'appartamento ha una camera, soggiorno con divano letto, zona pranzo, bagno privato e cucina completamente attrezzata con lavastoviglie, forno, microonde e lavatrice.",
      goodToKnow: [
        "Il parcheggio e un grande vantaggio nel centro di Mentone, ma va richiesto in anticipo e puo dipendere da disponibilita o condizioni.",
        "L'appartamento e vicino alla spiaggia, ma non va descritto come appartamento con vista mare diretta.",
        "Le richieste dirette sono confermate manualmente dall'host.",
      ],
      appreciate: [
        "Terrazza privata per colazione, lettura o una serata tranquilla all'aperto.",
        "Piu spazio interno rispetto agli studio, con camera e soggiorno con divano letto.",
        "Cucina completa per famiglie o soggiorni lunghi.",
        "Parcheggio su prenotazione, utile nel centro di Mentone.",
      ],
      location: [
        "Posizione centrale vicino alla spiaggia, con il mare a pochi passi.",
        "Caffe, ristoranti, negozi, centro storico e stazione di Mentone sono raggiungibili a piedi.",
        "Il parcheggio va concordato prima dell'arrivo perche le condizioni possono variare.",
      ],
      faq: [
        { question: "E adatto alle famiglie?", answer: "Si. E l'appartamento Azur Menton piu pratico per famiglie o soggiorni lunghi." },
        { question: "Ha parcheggio?", answer: "Il parcheggio puo essere disponibile su prenotazione e va richiesto in anticipo." },
        { question: "C'e vista mare?", answer: "No. L'appartamento e valorizzato per spazio, terrazza, parcheggio e vicinanza alla spiaggia." },
      ],
      amenityGroups: [
        { title: "Comfort", items: ["Aria condizionata", "Wi-Fi gratuito", "Una camera piu soggiorno"] },
        { title: "Cucina", items: ["Cucina attrezzata", "Lavastoviglie", "Forno", "Microonde"] },
        { title: "Bagno / lavanderia", items: ["Bagno privato", "Lavatrice"] },
        { title: "Esterno / parcheggio", items: ["Terrazza privata", "Parcheggio su prenotazione"] },
      ],
      glanceExtra: [
        { label: "Esterno", value: "Terrazza privata" },
        { label: "Parcheggio", value: "Su prenotazione" },
      ],
    },
    uk: {
      tagline:
        "Просторіші апартаменти біля пляжу для сімей, двох пар або довших перебувань, з приватною терасою, повною кухнею та паркуванням за бронюванням.",
      experience:
        "Це найпрактичніші апартаменти в колекції Azur Menton. Тут більше простору, приватна тераса для сніданку надворі, окрема спальня, вітальня з диваном-ліжком і повна кухня для довших поїздок.",
      inside:
        "В апартаментах є одна спальня, вітальня з диваном-ліжком, обідня зона, приватна ванна кімната та повністю обладнана кухня з посудомийною машиною, духовкою, мікрохвильовкою і пральною машиною.",
      goodToKnow: [
        "Паркування є важливою перевагою в центрі Ментона, але його потрібно запитувати заздалегідь; умови можуть залежати від доступності.",
        "Апартаменти розташовані біля пляжу, але їх не слід описувати як апартаменти з прямим видом на море.",
        "Прямі запити підтверджуються господарем вручну.",
      ],
      appreciate: [
        "Приватна тераса для сніданку, читання або спокійного вечора надворі.",
        "Більше простору, ніж у студіях: окрема спальня і вітальня з диваном-ліжком.",
        "Повна кухня для сімей або довших перебувань.",
        "Паркування за бронюванням, корисне в центральному Ментоні.",
      ],
      location: [
        "Центральне розташування біля пляжу, море за кілька хвилин пішки.",
        "Кафе, ресторани, магазини, старе місто та вокзал Ментона доступні пішки.",
        "Паркування варто обговорити до приїзду, бо умови можуть змінюватися.",
      ],
      faq: [
        { question: "Підходить для сімей?", answer: "Так. Це найпрактичніші апартаменти Azur Menton для сімей або довших перебувань." },
        { question: "Є паркування?", answer: "Паркування може бути доступне за бронюванням, його потрібно запитувати заздалегідь." },
        { question: "Є вид на море?", answer: "Ні. Ці апартаменти цінні простором, терасою, паркуванням і близькістю до пляжу." },
      ],
      amenityGroups: [
        { title: "Комфорт", items: ["Кондиціонер", "Безкоштовний Wi-Fi", "Одна спальня плюс вітальня"] },
        { title: "Кухня", items: ["Повністю обладнана кухня", "Посудомийна машина", "Духовка", "Мікрохвильовка"] },
        { title: "Ванна / прання", items: ["Приватна ванна кімната", "Пральна машина"] },
        { title: "Зовні / паркування", items: ["Приватна тераса", "Паркування за бронюванням"] },
      ],
      glanceExtra: [
        { label: "Зовні", value: "Приватна тераса" },
        { label: "Паркування", value: "За бронюванням" },
      ],
    },
  },
  "panoramic-sea-view-studio": {
    en: {
      tagline:
        "A compact beachfront studio where the wide Mediterranean view is the reason to book.",
      experience:
        "The view is the highlight here. This compact studio is made for guests who want a simple seaside base with the Mediterranean in front of them, the beach nearby and Menton's cafes and old town within walking distance.",
      inside:
        "The studio is designed for two guests, with a double bed, balcony, equipped kitchenette, private bathroom and washing machine. It is simple, practical and view-first.",
      goodToKnow: [
        "This is a compact studio, best for couples or solo travellers.",
        "It suits guests who value the sea view and beachfront location more than extra space.",
        "Direct requests are confirmed manually by the host.",
      ],
      appreciate: [
        "Wide Mediterranean view from the balcony.",
        "Compact, simple base for two guests by the water.",
        "Kitchenette and washing machine for practical stays.",
        "Easy access to beach, promenade, cafes and old town.",
      ],
      location: [
        "Beachfront central Menton setting, close to the promenade.",
        "Old town, cafes and restaurants are easy to reach on foot.",
        "A practical base for Riviera day trips without turning the stay into a car-focused trip.",
      ],
      faq: [
        { question: "Is the studio spacious?", answer: "No. It is compact and best for guests who prioritise the sea view and location." },
        { question: "What is the main advantage?", answer: "The wide Mediterranean view from the balcony is the main reason to choose it." },
        { question: "Is it good for two guests?", answer: "Yes. The studio is designed for two guests with one double bed." },
      ],
      amenityGroups: [
        { title: "Comfort", items: ["Air conditioning", "Free Wi-Fi", "Double bed"] },
        { title: "Kitchen", items: ["Equipped kitchenette", "Simple meals and breakfast"] },
        { title: "Bathroom / laundry", items: ["Private bathroom", "Washing machine"] },
        { title: "Outdoor / view", items: ["Private balcony", "Panoramic Mediterranean sea view"] },
      ],
      glanceExtra: [
        { label: "View", value: "Panoramic sea view" },
        { label: "Best for", value: "Two guests" },
      ],
    },
    fr: {
      tagline:
        "Un studio compact en front de mer ou la large vue sur la Mediterranee est la raison principale de reserver.",
      experience:
        "Ici, la vue est l'atout principal. Ce studio compact s'adresse aux voyageurs qui veulent une base simple au bord de mer, la Mediterranee devant eux, la plage tout pres et les cafes comme la vieille ville accessibles a pied.",
      inside:
        "Le studio est concu pour deux personnes, avec lit double, balcon, kitchenette equipee, salle de bain privee et lave-linge. Il est simple, pratique et centre sur la vue.",
      goodToKnow: [
        "C'est un studio compact, ideal pour couples ou voyageurs solo.",
        "Il convient aux voyageurs qui privilegient la vue mer et l'emplacement en front de mer plutot que l'espace.",
        "Les demandes directes sont confirmees manuellement par l'hote.",
      ],
      appreciate: [
        "Large vue sur la Mediterranee depuis le balcon.",
        "Base simple et compacte pour deux personnes au bord de l'eau.",
        "Kitchenette et lave-linge pour un sejour pratique.",
        "Acces facile a la plage, la promenade, les cafes et la vieille ville.",
      ],
      location: [
        "Adresse en front de mer dans le centre de Menton, proche de la promenade.",
        "Vieille ville, cafes et restaurants sont facilement accessibles a pied.",
        "Base pratique pour des excursions sur la Riviera sans rendre le sejour dependant de la voiture.",
      ],
      faq: [
        { question: "Le studio est-il spacieux ?", answer: "Non. Il est compact et convient aux voyageurs qui privilegient la vue mer et l'emplacement." },
        { question: "Quel est son principal atout ?", answer: "La large vue sur la Mediterranee depuis le balcon." },
        { question: "Convient-il a deux personnes ?", answer: "Oui. Le studio est concu pour deux personnes avec un lit double." },
      ],
      amenityGroups: [
        { title: "Confort", items: ["Climatisation", "Wi-Fi gratuit", "Lit double"] },
        { title: "Cuisine", items: ["Kitchenette equipee", "Repas simples et petit-dejeuner"] },
        { title: "Salle de bain / linge", items: ["Salle de bain privee", "Lave-linge"] },
        { title: "Exterieur / vue", items: ["Balcon prive", "Vue panoramique sur la Mediterranee"] },
      ],
      glanceExtra: [
        { label: "Vue", value: "Vue mer panoramique" },
        { label: "Ideal pour", value: "Deux voyageurs" },
      ],
    },
    it: {
      tagline:
        "Uno studio compatto fronte mare dove l'ampia vista sul Mediterraneo e il motivo principale per prenotare.",
      experience:
        "Qui la vista e il punto forte. Questo studio compatto e pensato per chi vuole una base semplice sul mare, con il Mediterraneo davanti, la spiaggia vicina e caffe e centro storico raggiungibili a piedi.",
      inside:
        "Lo studio e pensato per due ospiti, con letto matrimoniale, balcone, kitchenette attrezzata, bagno privato e lavatrice. E semplice, pratico e orientato alla vista.",
      goodToKnow: [
        "E uno studio compatto, ideale per coppie o viaggiatori singoli.",
        "E adatto a chi preferisce vista mare e posizione fronte mare rispetto allo spazio extra.",
        "Le richieste dirette sono confermate manualmente dall'host.",
      ],
      appreciate: [
        "Ampia vista sul Mediterraneo dal balcone.",
        "Base semplice e compatta per due ospiti vicino all'acqua.",
        "Kitchenette e lavatrice per soggiorni pratici.",
        "Facile accesso a spiaggia, passeggiata, caffe e centro storico.",
      ],
      location: [
        "Posizione fronte mare nel centro di Mentone, vicino alla passeggiata.",
        "Centro storico, caffe e ristoranti sono facilmente raggiungibili a piedi.",
        "Base pratica per gite sulla Riviera senza rendere il soggiorno dipendente dall'auto.",
      ],
      faq: [
        { question: "Lo studio e spazioso?", answer: "No. E compatto e ideale per chi privilegia vista mare e posizione." },
        { question: "Qual e il vantaggio principale?", answer: "L'ampia vista sul Mediterraneo dal balcone." },
        { question: "Va bene per due ospiti?", answer: "Si. Lo studio e pensato per due ospiti con un letto matrimoniale." },
      ],
      amenityGroups: [
        { title: "Comfort", items: ["Aria condizionata", "Wi-Fi gratuito", "Letto matrimoniale"] },
        { title: "Cucina", items: ["Kitchenette attrezzata", "Pasti semplici e colazione"] },
        { title: "Bagno / lavanderia", items: ["Bagno privato", "Lavatrice"] },
        { title: "Esterno / vista", items: ["Balcone privato", "Vista panoramica Mediterraneo"] },
      ],
      glanceExtra: [
        { label: "Vista", value: "Vista mare panoramica" },
        { label: "Ideale per", value: "Due ospiti" },
      ],
    },
    uk: {
      tagline:
        "Компактна студія на першій лінії, де широкий вид на Середземне море є головною причиною бронювання.",
      experience:
        "Головне тут - вид. Ця компактна студія створена для гостей, яким потрібна проста база біля моря: Середземне море перед очима, пляж поруч, кафе та старе місто в пішій доступності.",
      inside:
        "Студія розрахована на двох гостей: двоспальне ліжко, балкон, обладнана kitchenette, приватна ванна кімната і пральна машина. Вона проста, практична і насамперед про вид.",
      goodToKnow: [
        "Це компактна студія, найкраще для пари або solo travellers.",
        "Підходить гостям, які цінують вид на море та першу лінію більше, ніж додатковий простір.",
        "Прямі запити підтверджуються господарем вручну.",
      ],
      appreciate: [
        "Широкий вид на Середземне море з балкона.",
        "Проста компактна база для двох гостей біля води.",
        "Kitchenette і пральна машина для практичного перебування.",
        "Легкий доступ до пляжу, променаду, кафе та старого міста.",
      ],
      location: [
        "Перша лінія в центральному Ментоні, поруч із променадом.",
        "Старе місто, кафе та ресторани легко доступні пішки.",
        "Практична база для поїздок Рив'єрою без акценту на автомобіль.",
      ],
      faq: [
        { question: "Студія простора?", answer: "Ні. Вона компактна і найкраще підходить тим, хто обирає вид на море та локацію." },
        { question: "Головна перевага?", answer: "Широкий вид на Середземне море з балкона." },
        { question: "Підходить для двох?", answer: "Так. Студія розрахована на двох гостей з одним двоспальним ліжком." },
      ],
      amenityGroups: [
        { title: "Комфорт", items: ["Кондиціонер", "Безкоштовний Wi-Fi", "Двоспальне ліжко"] },
        { title: "Кухня", items: ["Обладнана kitchenette", "Прості страви та сніданок"] },
        { title: "Ванна / прання", items: ["Приватна ванна кімната", "Пральна машина"] },
        { title: "Зовні / вид", items: ["Приватний балкон", "Панорамний вид на Середземне море"] },
      ],
      glanceExtra: [
        { label: "Вид", value: "Панорамний вид на море" },
        { label: "Найкраще для", value: "Двох гостей" },
      ],
    },
  },
};

const localizedFacts: Record<
  string,
  Record<Locale, { bedrooms: string; beds: string; bathrooms: string; size: string; guests: string }>
> = {
  "sea-view-balcony-studio": {
    en: { bedrooms: "Studio", beds: "1 double bed and 1 sofa bed", bathrooms: "1 bathroom", size: "27 m²", guests: "Up to 3" },
    fr: { bedrooms: "Studio", beds: "1 lit double et 1 canape-lit", bathrooms: "1 salle de bain", size: "27 m²", guests: "Jusqu'a 3" },
    it: { bedrooms: "Studio", beds: "1 letto matrimoniale e 1 divano letto", bathrooms: "1 bagno", size: "27 m²", guests: "Fino a 3" },
    uk: { bedrooms: "Студія", beds: "1 двоспальне ліжко і 1 диван-ліжко", bathrooms: "1 ванна кімната", size: "27 m²", guests: "До 3" },
  },
  "beachside-family-apartment": {
    en: { bedrooms: "1 bedroom", beds: "1 double bed and 1 sofa bed", bathrooms: "1 bathroom", size: "54 m²", guests: "Up to 4" },
    fr: { bedrooms: "1 chambre", beds: "1 lit double et 1 canape-lit", bathrooms: "1 salle de bain", size: "54 m²", guests: "Jusqu'a 4" },
    it: { bedrooms: "1 camera", beds: "1 letto matrimoniale e 1 divano letto", bathrooms: "1 bagno", size: "54 m²", guests: "Fino a 4" },
    uk: { bedrooms: "1 спальня", beds: "1 двоспальне ліжко і 1 диван-ліжко", bathrooms: "1 ванна кімната", size: "54 m²", guests: "До 4" },
  },
  "panoramic-sea-view-studio": {
    en: { bedrooms: "Studio", beds: "1 double bed", bathrooms: "1 bathroom", size: "25 m²", guests: "Up to 2" },
    fr: { bedrooms: "Studio", beds: "1 lit double", bathrooms: "1 salle de bain", size: "25 m²", guests: "Jusqu'a 2" },
    it: { bedrooms: "Studio", beds: "1 letto matrimoniale", bathrooms: "1 bagno", size: "25 m²", guests: "Fino a 2" },
    uk: { bedrooms: "Студія", beds: "1 двоспальне ліжко", bathrooms: "1 ванна кімната", size: "25 m²", guests: "До 2" },
  },
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    apartments.map((apartment) => ({
      locale,
      slug: apartment.slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const apartment = getApartment(slug);

  return createMetadata({
    locale: safeLocale,
    path: `apartments/${slug}`,
    title: apartment?.seoTitle[safeLocale] ?? "Apartment",
    description: apartment?.seoDescription[safeLocale],
    image: apartment?.cardImage,
  });
}

function imageByFile(apartment: Apartment, fileName: string) {
  return apartment.gallery.find((image) => image.src.endsWith(fileName)) ?? apartment.gallery[0];
}

function heroImages(apartment: Apartment) {
  if (apartment.slug === "sea-view-balcony-studio") {
    return [
      imageByFile(apartment, "04-open-plan-studio-layout.jpeg"),
      imageByFile(apartment, "01-balcony-coffee-sea-view.jpeg"),
      imageByFile(apartment, "02-sea-view-from-balcony.jpeg"),
    ];
  }

  if (apartment.slug === "beachside-family-apartment") {
    return [
      imageByFile(apartment, "01-private-terrace-breakfast.jpeg"),
      imageByFile(apartment, "02-living-room-terrace-access.jpeg"),
      imageByFile(apartment, "03-comfortable-bedroom.jpeg"),
    ];
  }

  return [
    imageByFile(apartment, "01-balcony-breakfast-sea-view.jpeg"),
    imageByFile(apartment, "02-wide-sea-view-from-balcony.jpeg"),
    imageByFile(apartment, "03-bright-studio-double-bed.jpeg"),
  ];
}

export default async function ApartmentPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const apartment = getApartment(slug);

  if (!apartment) {
    notFound();
  }

  const labels = t[safeLocale];
  const copy = pageCopy[safeLocale];
  const story = stories[apartment.slug][safeLocale];
  const facts = localizedFacts[apartment.slug][safeLocale];
  const apartmentUrl = absoluteUrl(localizedPath(safeLocale, `apartments/${apartment.slug}`));
  const [hero, supportingOne, supportingTwo] = heroImages(apartment);

  const glanceItems = [
    { label: labels.guests, value: facts.guests },
    { label: labels.size, value: facts.size },
    { label: labels.beds, value: facts.beds },
    { label: labels.bathrooms, value: facts.bathrooms },
    ...story.glanceExtra,
  ];

  return (
    <>
      <JsonLdScript
        data={vacationRentalJsonLd({
          name: apartment.name[safeLocale],
          description: apartment.seoDescription[safeLocale],
          url: apartmentUrl,
          image: apartment.gallery.slice(0, 8).map((image) => absoluteUrl(image.src)),
          accommodationCategory: apartment.structuredData.accommodationCategory,
          occupancy: apartment.structuredData.occupancy,
          rooms: apartment.structuredData.numberOfRooms,
          sizeSqm: apartment.sizeSqm,
          amenities: apartment.amenities.map((amenity) => amenity[safeLocale]),
        })}
      />
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl(localizedPath(safeLocale)) },
          { name: labels.compareApartments, url: absoluteUrl(localizedPath(safeLocale, "apartments")) },
          { name: apartment.shortName[safeLocale], url: apartmentUrl },
        ])}
      />

      <section className="overflow-hidden border-b border-[#dfd4c1] bg-[#fbf7ef]">
        <Container>
          <div className="grid gap-12 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-20">
            <div>
              <p className="editorial-label">{copy.eyebrow}</p>
              <h1 className="serif-heading mt-4 max-w-4xl text-5xl leading-[0.94] text-[#173f36] sm:text-7xl">
                {apartment.name[safeLocale]}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5f574c]">{story.tagline}</p>
              <div className="mt-8 grid max-w-2xl grid-cols-2 border-y border-[#dfd4c1] text-sm sm:grid-cols-3">
                {glanceItems.slice(0, 6).map((item) => (
                  <div key={`${item.label}-${item.value}`} className="border-r border-[#dfd4c1] px-3 py-4 last:border-r-0">
                    <p className="text-xs uppercase tracking-[0.12em] text-[#756a5a]">{item.label}</p>
                    <p className="mt-1 font-semibold text-[#173f36]">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href={`/${safeLocale}/check-availability`}>{labels.checkAvailability}</Button>
                <Button href={`/${safeLocale}/apartments`} variant="secondary">
                  {copy.compare}
                </Button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[680px]">
              <figure className="ml-auto max-w-[580px] border border-[#dfd4c1] bg-white p-3">
                <Image
                  src={hero.src}
                  alt={hero.alt[safeLocale]}
                  width={900}
                  height={680}
                  quality={90}
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className={`aspect-[4/3] w-full object-cover ${imageObjectPosition(apartment, hero)}`}
                />
              </figure>
              <figure className="absolute -bottom-8 -left-2 hidden w-44 border border-[#dfd4c1] bg-[#fbf7ef] p-2 shadow-[0_18px_45px_rgba(23,63,54,0.12)] md:block">
                <Image
                  src={supportingOne.src}
                  alt={supportingOne.alt[safeLocale]}
                  width={520}
                  height={620}
                  quality={90}
                  sizes="176px"
                  className={`aspect-[4/5] w-full object-cover ${imageObjectPosition(apartment, supportingOne)}`}
                />
              </figure>
              <figure className="absolute -right-4 top-6 hidden w-36 border border-[#dfd4c1] bg-[#fbf7ef] p-2 shadow-[0_18px_45px_rgba(23,63,54,0.10)] lg:block">
                <Image
                  src={supportingTwo.src}
                  alt={supportingTwo.alt[safeLocale]}
                  width={480}
                  height={560}
                  quality={90}
                  sizes="144px"
                  className={`aspect-[3/4] w-full object-cover ${imageObjectPosition(apartment, supportingTwo)}`}
                />
              </figure>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.66fr_0.34fr]">
            <div>
              <p className="editorial-label">{copy.experienceTitle}</p>
              <h2 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36] sm:text-6xl">
                {apartment.shortName[safeLocale]}
              </h2>
              <p className="mt-7 max-w-3xl text-lg leading-9 text-[#5f574c]">{story.experience}</p>
            </div>
            <aside className="border-y border-[#dfd4c1] py-6">
              <h2 className="serif-heading text-3xl text-[#173f36]">{copy.atAGlance}</h2>
              <dl className="mt-5 grid gap-4 text-sm">
                {glanceItems.map((item) => (
                  <div key={`${item.label}-${item.value}`} className="grid grid-cols-[0.36fr_0.64fr] gap-4 border-b border-[#eadfce] pb-3 last:border-b-0">
                    <dt className="text-[#756a5a]">{item.label}</dt>
                    <dd className="font-semibold text-[#173f36]">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-[#dfd4c1] bg-[#f6efe3]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
            <div>
              <p className="editorial-label">{copy.insideTitle}</p>
              <h2 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36] sm:text-5xl">
                {copy.insideHeading}
              </h2>
            </div>
            <div className="grid gap-7 md:grid-cols-2">
              <p className="text-base leading-8 text-[#5f574c]">{story.inside}</p>
              <div className="border-l border-[#c6a66a] pl-6">
                <h3 className="serif-heading text-3xl text-[#173f36]">{copy.appreciateTitle}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-[#5f574c]">
                  {story.appreciate.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <ApartmentGallery apartment={apartment} locale={safeLocale} />
        </Container>
      </Section>

      <Section className="bg-[#fff3df]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr]">
            <div>
              <p className="editorial-label">{copy.amenitiesTitle}</p>
              <h2 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36] sm:text-5xl">
                {copy.amenitiesHeading}
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden border border-[#dfd4c1] bg-[#dfd4c1] md:grid-cols-2">
              {story.amenityGroups.map((group) => (
                <div key={group.title} className="bg-[#fbf7ef] p-6">
                  <h3 className="serif-heading text-2xl text-[#173f36]">{group.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-[#5f574c]">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="editorial-label">{copy.locationTitle}</p>
              <h2 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36] sm:text-5xl">
                {copy.locationHeading}
              </h2>
              <ul className="mt-6 space-y-4 text-base leading-8 text-[#5f574c]">
                {story.location.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="border border-[#dfd4c1] bg-[#fffdf8] p-6">
              <h2 className="serif-heading text-3xl text-[#173f36]">{copy.goodToKnowTitle}</h2>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-[#5f574c]">
                {story.goodToKnow.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-[#dfd4c1] bg-[#f6efe3]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
            <div>
              <p className="editorial-label">{copy.relatedTitle}</p>
              <h2 className="serif-heading mt-3 text-4xl text-[#173f36]">{copy.faqTitle}</h2>
            </div>
            <div className="grid gap-4">
              {story.faq.map((item) => (
                <div key={item.question} className="border-b border-[#dfd4c1] pb-5">
                  <h3 className="font-semibold text-[#173f36]">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5f574c]">{item.answer}</p>
                </div>
              ))}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Button href={`/${safeLocale}/guide/best-beaches-in-menton`} variant="secondary">
                  {copy.beaches}
                </Button>
                <Button href={`/${safeLocale}/guide/menton-without-a-car`} variant="secondary">
                  {copy.withoutCar}
                </Button>
                <Button href={`/${safeLocale}/events/menton-lemon-festival`} variant="secondary">
                  {copy.lemonFestival}
                </Button>
                <Button href={`/${safeLocale}/guide/day-trips-from-menton`} variant="secondary">
                  {copy.dayTrips}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#111615]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="serif-heading text-4xl leading-tight text-white sm:text-6xl">{copy.finalTitle}</h2>
            <p className="mt-5 text-base leading-7 text-white/72">{copy.finalText}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={`/${safeLocale}/check-availability`}>{labels.checkAvailability}</Button>
              <Link
                className="inline-flex min-h-11 items-center justify-center border border-white/35 px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                href={`/${safeLocale}/apartments`}
              >
                {copy.compare}
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
