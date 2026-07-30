"use client";

import { useMemo, useState } from "react";
import type { EuroReferenceRates, SupportedReferenceCurrency } from "@/lib/currency";

const customOptions: SupportedReferenceCurrency[] = ["JPY", "CAD", "AUD", "SEK", "NOK", "PLN", "GBP", "CHF", "UAH", "USD"];

function currencySymbol(currency: string) {
  return currency === "USD" ? "$" : currency === "GBP" ? "£" : currency === "JPY" ? "¥" : currency === "CHF" ? "Fr" : currency === "UAH" ? "₴" : currency === "CAD" ? "C$" : currency === "AUD" ? "A$" : currency.slice(0, 1);
}

function Coin({ currency }: { currency: string }) {
  const symbol = currencySymbol(currency);

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#c9a665] bg-[radial-gradient(circle_at_32%_28%,#fff6cc,#d2ac61_72%)] font-serif-display font-semibold text-[#604b26] shadow-[inset_2px_2px_3px_rgba(255,255,255,0.65),inset_-2px_-2px_3px_rgba(103,69,24,0.28)] sm:h-20 sm:w-20" aria-hidden="true">
      <span
        className={`drop-shadow-[0_2px_1px_rgba(255,255,255,0.55)] ${
          symbol.length > 1 ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"
        }`}
        style={{ textShadow: "1px 1px 0 #fff1b6, 2px 2px 0 #9a6d2d, 3px 3px 2px rgba(77,50,15,0.35)" }}
      >
        {symbol}
      </span>
    </div>
  );
}

export function EuroRatesWidget({ locale, rates }: { locale: string; rates: EuroReferenceRates | null }) {
  const [customCurrency, setCustomCurrency] = useState<SupportedReferenceCurrency>("JPY");
  const labels: Record<string, string> = {
    en: "Reference currency rates",
    fr: "Taux de change de reference",
    it: "Tassi di cambio di riferimento",
    uk: "Довідкові курси валют",
  };
  const notes: Record<string, string> = {
    en: "Reference values for planning only. Your bank or card provider may use a different rate.",
    fr: "Valeurs de reference BCE pour planifier uniquement. Votre banque peut appliquer un autre taux.",
    it: "Valori BCE indicativi per la pianificazione. La banca puo applicare un tasso diverso.",
    uk: "Довідкові значення ECB лише для планування. Ваш банк або картка можуть застосувати інший курс.",
  };
  const unavailable: Record<string, string> = {
    en: "Unavailable",
    fr: "Indisponible",
    it: "Non disponibile",
    uk: "Недоступно",
  };
  const fixedCurrencies: SupportedReferenceCurrency[] = ["USD", "GBP", "UAH", "CHF"];
  const rateMap = useMemo(() => new Map((rates?.rates ?? []).map((rate) => [rate.currency, rate.rate])), [rates]);
  const valueFor = (currency: SupportedReferenceCurrency) => rateMap.get(currency);
  const cards = [...fixedCurrencies, customCurrency];

  return (
    <section className="relative overflow-hidden border-y border-[#dfd4c1] bg-[#f7efe0]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_16%,rgba(109,190,207,0.22),transparent_30%),linear-gradient(135deg,rgba(255,250,232,0.96),rgba(240,246,240,0.88))]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl p-5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#b07820]">EUR reference</p>
            <h2 className="mt-2 serif-heading text-3xl leading-none text-[#173f36]">{labels[locale] ?? labels.en}</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#5c5044]">{notes[locale] ?? notes.en}</p>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map((currency, index) => {
            const rate = valueFor(currency);
            return (
              <div key={`${currency}-${index}`} className={`border border-white/80 p-4 ${index === 0 ? "bg-[#fff9ed]" : "bg-white/62"}`}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <Coin currency="EUR" />
                    <span className="text-xl font-semibold text-[#b49353]">→</span>
                    <Coin currency={currency} />
                  </div>
                </div>
                <p className="mt-4 border border-[#173f36] bg-[#173f36] px-3 py-2 font-mono text-2xl font-semibold tracking-[0.04em] text-[#f8eecf] shadow-[inset_0_0_12px_rgba(255,255,255,0.08)]">{typeof rate === "number" ? rate.toFixed(4) : unavailable[locale] ?? unavailable.en}</p>
                {index === cards.length - 1 ? (
                  <label className="mt-3 block">
                    <span className="sr-only">Select a reference currency</span>
                    <select value={customCurrency} onChange={(event) => setCustomCurrency(event.target.value as SupportedReferenceCurrency)} className="w-full border border-[#d9bf89] bg-[#fffdf8] px-2 py-2 text-xs font-semibold text-[#173f36]">
                      {customOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </label>
                ) : (
                  <p className="mt-3 text-base font-semibold uppercase tracking-[0.12em] text-[#71665b]">{currency}</p>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs leading-5 text-[#71665b]">{rates ? `${rates.provider} · ${new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(rates.updatedAt))}` : "Reference rates temporarily unavailable."}</p>
      </div>
    </section>
  );
}
