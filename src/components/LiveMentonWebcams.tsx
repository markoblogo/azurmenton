import { Card } from "@/components/ui/Card";
import { mentonWebcams, webcamSectionCopy } from "@/content/webcams";
import type { Locale } from "@/i18n/locales";

export function LiveMentonWebcams({ locale }: { locale: Locale }) {
  const copy = webcamSectionCopy[locale];

  return (
    <section aria-labelledby="live-menton-title">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0b6f8f]">
            Live Menton
          </p>
          <h2 id="live-menton-title" className="mt-2 text-3xl font-semibold tracking-tight text-[#17313a]">
            {copy.title}
          </h2>
          <p className="mt-3 max-w-2xl text-[#5c5044]">{copy.intro}</p>
        </div>
        <p className="max-w-sm text-sm leading-6 text-[#6b5f50]">{copy.note}</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {mentonWebcams.map((webcam) => (
          <Card key={webcam.externalUrl} className="p-5">
            <div className="flex min-h-full flex-col">
              <div className="flex items-start gap-3">
                <div
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e7f2f4] text-xs font-semibold text-[#0b6f8f]"
                >
                  Live
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#17313a]">{webcam.title[locale]}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#6b5f50]">
                    {webcam.locationLabel[locale]}
                  </p>
                </div>
              </div>
              <p className="mt-4 flex-1 text-sm leading-6 text-[#5c5044]">
                {webcam.description[locale]}
              </p>
              <p className="mt-4 text-xs font-semibold text-[#6b5f50]">
                Source: {webcam.sourceName}
              </p>
              <a
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-[#d9cdbd] bg-white/70 px-4 py-2.5 text-sm font-semibold text-[#17313a] transition hover:border-[#0b6f8f] hover:text-[#0b6f8f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b6f8f]"
                href={webcam.externalUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {copy.cta}
              </a>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
