import type { Locale } from "@/i18n/locales";

type LocalizedText = Record<Locale, string>;
type GuideApartmentPath = {
  afterSectionIndex: number;
  title: LocalizedText;
  text: LocalizedText;
  apartments: [string, string];
};

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const centralApartments: [string, string] = ["sea-view-balcony-studio", "beachside-family-apartment"];

export const guideApartmentPaths: Record<string, GuideApartmentPath> = {
  "best-souvenir-shops-menton-monaco-nice": {
    afterSectionIndex: 0,
    title: t("A central base for your Menton walks", "Un pied-a-terre central pour vos balades a Menton", "Una base centrale per le passeggiate a Mentone", "Центральна база для прогулянок Ментоном"),
    text: t("Stay by the seafront and explore the shops and old town on foot.", "Sejournez en bord de mer et explorez les boutiques et la vieille ville a pied.", "Soggiorna sul lungomare e scopri negozi e centro storico a piedi.", "Зупиніться біля моря та досліджуйте крамниці й старе місто пішки."),
    apartments: centralApartments,
  },
  "cheap-eats-menton-budget-lunch": {
    afterSectionIndex: 0,
    title: t("A flexible base for meals in Menton", "Un pied-a-terre souple pour vos repas a Menton", "Una base flessibile per i pasti a Mentone", "Зручна база для харчування в Ментоні"),
    text: t("Mix local lunches with meals at your apartment. The family apartment has a full kitchen and terrace.", "Alternez dejeuners en ville et repas a l'appartement. L'appartement familial dispose d'une cuisine equipee et d'une terrasse.", "Alterna pranzi in citta e pasti in appartamento. L'appartamento per famiglie ha una cucina attrezzata e una terrazza.", "Поєднуйте обіди в місті з їжею в апартаментах. У сімейних апартаментах є обладнана кухня й тераса."),
    apartments: ["beachside-family-apartment", "sea-view-balcony-studio"],
  },
  "best-ice-cream-menton": {
    afterSectionIndex: 0,
    title: t("Stay close to the sea and town", "Sejournez pres de la mer et du centre", "Soggiorna vicino al mare e al centro", "Зупиніться біля моря та центру"),
    text: t("Enjoy beach time and old-town ice-cream walks from a central beachfront base.", "Profitez de la plage et des balades glacees en vieille ville depuis le front de mer central.", "Goditi la spiaggia e le passeggiate con gelato nel centro storico da una base sul lungomare centrale.", "Поєднуйте пляж і прогулянки за морозивом у старому місті, зупинившись біля центральної набережної."),
    apartments: centralApartments,
  },
  "best-seafood-restaurants-menton": {
    afterSectionIndex: 0,
    title: t("Bring the market back to your apartment", "Rapportez le marche a votre appartement", "Porta il mercato nel tuo appartamento", "Смакуйте покупки з ринку в апартаментах"),
    text: t("Plan seafood dinners out or a meal at home. The family apartment has a full kitchen and private terrace.", "Prevoyez un diner de fruits de mer en ville ou un repas chez vous. L'appartement familial dispose d'une cuisine equipee et d'une terrasse privee.", "Organizza una cena di pesce fuori o un pasto a casa. L'appartamento per famiglie ha una cucina attrezzata e una terrazza privata.", "Плануйте вечерю з морепродуктами в ресторані або вдома. У сімейних апартаментах є обладнана кухня й приватна тераса."),
    apartments: ["beachside-family-apartment", "sea-view-balcony-studio"],
  },
};
