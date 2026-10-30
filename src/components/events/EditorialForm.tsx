"use client";
import { useEffect, useRef, useState, type ReactNode, type FormEvent } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import { correctionFromHash, correctionReasons, type EditorialContext } from "@/lib/editorial-context";

const correctionCopy = {
  en: { subject: "Place or event", reason: "What changed?", reasons: ["Closed / cancelled", "Opening hours", "Address / venue", "Dates / times", "Other"] },
  fr: { subject: "Lieu ou événement", reason: "Qu'est-ce qui a changé ?", reasons: ["Fermeture / annulation", "Horaires d'ouverture", "Adresse / lieu", "Dates / heures", "Autre"] },
  it: { subject: "Luogo o evento", reason: "Che cosa è cambiato?", reasons: ["Chiusura / annullamento", "Orari di apertura", "Indirizzo / sede", "Date / orari", "Altro"] },
  uk: { subject: "Місце або подія", reason: "Що змінилося?", reasons: ["Закриття / скасування", "Години роботи", "Адреса / місце", "Дати / час", "Інше"] },
};

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
  const [context, setContext] = useState<EditorialContext | null>(null);
  const details = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const read = () => {
      const next = correctionFromHash(window.location.hash);
      if (!next) return;
      setContext(next); setType("correction"); setStatus("idle");
      if (details.current) details.current.open = true;
      document.getElementById("suggest-event")?.scrollIntoView({ block: "start" });
    };
    read(); window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);
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
  return <section id="suggest-event" className="scroll-mt-40 border-y border-[#dfd4c1] py-8">
    <details ref={details}><summary className="cursor-pointer py-3 text-xl font-semibold text-[#173f36]">{c[0]}</summary>
    {status === "success" ? <p role="status" className="py-4">{c[14]}</p> : <form method="post" action="/api/editorial-submission" onSubmit={submit} className="grid gap-4 py-5 sm:grid-cols-2">
      <label className="grid gap-2 sm:col-span-2">{c[0]}<select name="type" value={type} onChange={e => setType(e.target.value)} className="min-h-11 border p-2"><option value="event">{c[1]}</option><option value="correction">{c[2]}</option></select></label>
      {([["name", c[3], "text"], ["email", c[4], "email"], ...(type === "event" ? [["title", c[5], "text"], ["date", c[6], "date"], ["venue", c[7], "text"], ["organiser", c[8], "text"], ["source", c[9], "url"]] : [])] as string[][]).map(([name, label, inputType]) => <label key={name} className="grid min-w-0 gap-2">{label}<input name={name} type={inputType} required maxLength={name === "email" ? 254 : 1000} className="min-h-11 w-full min-w-0 border p-2" /></label>)}
      {type === "correction" ? <>
        <label className="grid min-w-0 gap-2 sm:col-span-2">{c[10]}<input key={context?.page ?? "page"} name="page" type="url" defaultValue={context?.page ?? ""} required maxLength={1000} className="min-h-11 w-full min-w-0 border p-2" /></label>
        <label className="grid min-w-0 gap-2">{correctionCopy[locale].subject}<input key={context?.subject ?? "subject"} name="subject" defaultValue={context?.subject ?? ""} maxLength={200} className="min-h-11 w-full min-w-0 border p-2" /></label>
        <label className="grid min-w-0 gap-2">{correctionCopy[locale].reason}<select name="reason" required defaultValue="" className="min-h-11 w-full min-w-0 border p-2"><option value="" disabled>—</option>{correctionReasons.map((reason, index) => <option key={reason} value={reason}>{correctionCopy[locale].reasons[index]}</option>)}</select></label>
      </> : null}
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
