"use client";
import { useState, type ReactNode, type FormEvent } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/locales";

const copy = {
  en: ["Suggest an event / report an error", "Event suggestion", "Correction", "Name", "Email", "Event title", "Date", "Venue", "Organiser", "Official source (https://)", "Page to correct (https://azurmenton.com/…)", "Details", "I agree to the processing of this message and my contact details for editorial review.", "Send for review", "Received for manual review. Nothing is published automatically.", "Could not send. Please retry or use the contact page.", "Privacy"],
  fr: ["Proposer un événement / signaler une erreur", "Proposition d'événement", "Correction", "Nom", "E-mail", "Titre de l'événement", "Date", "Lieu", "Organisateur", "Source officielle (https://)", "Page à corriger (https://azurmenton.com/…)", "Précisions", "J'accepte le traitement de ce message et de mes coordonnées pour examen éditorial.", "Envoyer pour examen", "Reçu pour examen manuel. Aucune publication automatique.", "Envoi impossible. Réessayez ou utilisez la page de contact.", "Confidentialité"],
  it: ["Proponi un evento / segnala un errore", "Proposta di evento", "Correzione", "Nome", "Email", "Titolo dell'evento", "Data", "Luogo", "Organizzatore", "Fonte ufficiale (https://)", "Pagina da correggere (https://azurmenton.com/…)", "Dettagli", "Acconsento al trattamento del messaggio e dei recapiti per la revisione editoriale.", "Invia per revisione", "Ricevuto per revisione manuale. Nessuna pubblicazione automatica.", "Invio non riuscito. Riprova o usa la pagina contatti.", "Privacy"],
  uk: ["Запропонувати подію / повідомити про помилку", "Пропозиція події", "Виправлення", "Ім'я", "Електронна пошта", "Назва події", "Дата", "Місце проведення", "Організатор", "Офіційне джерело (https://)", "Сторінка для виправлення (https://azurmenton.com/…)", "Подробиці", "Погоджуюся на обробку повідомлення та контактних даних для редакційного розгляду.", "Надіслати на розгляд", "Отримано для ручної перевірки. Автоматичної публікації немає.", "Не вдалося надіслати. Спробуйте знову або скористайтеся сторінкою контактів.", "Конфіденційність"],
};

export function EditorialForm({ locale, children }: { locale: Locale; children?: ReactNode }) {
  const c = copy[locale];
  const [type, setType] = useState("event");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const response = await fetch("/api/editorial-submission", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      setStatus(response.ok && result.ok ? "success" : "error");
      if (response.ok && result.ok) form.reset();
      else (window as unknown as { turnstile?: { reset: () => void } }).turnstile?.reset();
    } catch { setStatus("error"); }
  }
  return <section id="suggest-event" className="border-y border-[#dfd4c1] py-8">
    <details><summary className="cursor-pointer py-3 text-xl font-semibold text-[#173f36]">{c[0]}</summary>
    {status === "success" ? <p role="status" className="py-4">{c[14]}</p> : <form onSubmit={submit} className="grid gap-4 py-5 sm:grid-cols-2">
      <label className="grid gap-2 sm:col-span-2">{c[0]}<select name="type" value={type} onChange={e => setType(e.target.value)} className="min-h-11 border p-2"><option value="event">{c[1]}</option><option value="correction">{c[2]}</option></select></label>
      {([["name", c[3], "text"], ["email", c[4], "email"], ...(type === "event" ? [["title", c[5], "text"], ["date", c[6], "date"], ["venue", c[7], "text"], ["organiser", c[8], "text"], ["source", c[9], "url"]] : [["page", c[10], "url"]])] as string[][]).map(([name, label, inputType]) => <label key={name} className="grid min-w-0 gap-2">{label}<input name={name} type={inputType} required maxLength={name === "email" ? 254 : 1000} className="min-h-11 w-full min-w-0 border p-2" /></label>)}
      <label className="grid gap-2 sm:col-span-2">{c[11]}<textarea name="message" required minLength={10} maxLength={4000} rows={4} className="w-full border p-2" /></label>
      <div hidden aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
      <label className="flex items-start gap-2 sm:col-span-2"><input type="checkbox" name="privacy" value="accepted" required className="mt-1" />{c[12]}</label>
      <Link href={`/${locale}/privacy`} className="underline">{c[16]}</Link>
      <div className="sm:col-span-2">{children}</div>
      <button disabled={status === "sending"} className="min-h-11 bg-[#173f36] px-4 py-3 text-white disabled:opacity-50">{c[13]}{status === "sending" ? "…" : ""}</button>
      {status === "error" ? <p role="alert">{c[15]} <Link href={`/${locale}/contact`} className="underline">{c[4]}</Link></p> : null}
    </form>}
    </details>
  </section>;
}
