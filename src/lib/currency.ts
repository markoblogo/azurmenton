import { unstable_cache } from "next/cache";

export type SupportedReferenceCurrency = "GBP" | "USD" | "CHF" | "UAH";

export type EuroReferenceRate = {
  currency: SupportedReferenceCurrency;
  rate: number | null;
};

export type EuroReferenceRates = {
  provider: string;
  updatedAt: string;
  base: "EUR";
  rates: EuroReferenceRate[];
};

const supportedCurrencies: SupportedReferenceCurrency[] = ["GBP", "USD", "CHF", "UAH"];

async function fetchEuroReferenceRates(): Promise<EuroReferenceRates | null> {
  try {
    const response = await fetch("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml", {
      next: { revalidate: 60 * 60 * 12 },
    });

    if (!response.ok) return null;

    const xml = await response.text();
    const updatedAtMatch = xml.match(/time=['"]([^'"]+)['"]/);

    const rates = supportedCurrencies.map((currency) => {
      const match = xml.match(new RegExp(`currency=['"]${currency}['"]\\s+rate=['"]([^'"]+)['"]`));
      return {
        currency,
        rate: match ? Number(match[1]) : null,
      };
    });

    return {
      provider: "European Central Bank",
      updatedAt: updatedAtMatch ? `${updatedAtMatch[1]}T16:00:00.000Z` : new Date().toISOString(),
      base: "EUR",
      rates,
    };
  } catch {
    return null;
  }
}

const getCachedEuroReferenceRates = unstable_cache(fetchEuroReferenceRates, ["eur-reference-rates"], {
  revalidate: 60 * 60 * 12,
});

export async function getEuroReferenceRates() {
  return getCachedEuroReferenceRates();
}
