"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/locales";
import {
  bookingFunnelEvents,
  sourcePageTypeFromPathname,
  sourceSlugFromPathname,
  trackBookingFunnelEvent,
} from "@/lib/analytics";

const labels: Record<Locale, { title: string; native: string; copy: string; copied: string; whatsapp: string; email: string }> = {
  en: { title: "Share", native: "Share", copy: "Copy link", copied: "Copied", whatsapp: "WhatsApp", email: "Email" },
  fr: { title: "Partager", native: "Partager", copy: "Copier le lien", copied: "Copie", whatsapp: "WhatsApp", email: "Email" },
  it: { title: "Condividi", native: "Condividi", copy: "Copia link", copied: "Copiato", whatsapp: "WhatsApp", email: "Email" },
  uk: { title: "Поділитися", native: "Поділитися", copy: "Копіювати", copied: "Скопійовано", whatsapp: "WhatsApp", email: "Email" },
};

export function ShareActions({ locale, title, url }: { locale: Locale; title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const copy = labels[locale];
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const shareProps = {
    locale,
    sourcePageType: sourcePageTypeFromPathname(pathname),
    sourceSlug: sourceSlugFromPathname(pathname) || "share",
  };

  async function shareNative() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await copyLink();
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      await copyLink();
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="border border-[#dfd2b8] bg-[#fffaf0] p-4">
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{copy.title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            void shareNative();
          }}
          className="inline-flex min-h-9 items-center border border-[#173f36] bg-[#173f36] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white hover:bg-[#102f28] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f36]"
        >
          {copy.native}
        </button>
        <button
          type="button"
          onClick={() => {
            void copyLink();
          }}
          className="inline-flex min-h-9 items-center border border-[#c6a66a] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f36]"
        >
          {copied ? copy.copied : copy.copy}
        </button>
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          onClick={() => trackBookingFunnelEvent(bookingFunnelEvents.whatsappClick, shareProps)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-9 items-center border border-[#dfd2b8] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f36]"
        >
          {copy.whatsapp}
        </a>
        <a
          href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
          onClick={() => trackBookingFunnelEvent(bookingFunnelEvents.emailClick, shareProps)}
          className="inline-flex min-h-9 items-center border border-[#dfd2b8] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#173f36] hover:bg-[#f3ead7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f36]"
        >
          {copy.email}
        </a>
      </div>
    </div>
  );
}
