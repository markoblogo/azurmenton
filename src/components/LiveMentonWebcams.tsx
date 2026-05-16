import { WindyWebcamEmbed } from "@/components/webcams/WindyWebcamEmbed";
import { externalWebcamLinks, webcamSectionCopy, windyMentonWebcam } from "@/content/webcams";
import type { Locale } from "@/i18n/locales";

export function LiveMentonWebcams({ locale }: { locale: Locale }) {
  const copy = webcamSectionCopy[locale];

  return (
    <section aria-labelledby="live-menton-title" className="border-y border-[#dfd2b8] bg-[#f7efe1]">
      <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)] lg:items-stretch">
        <div>
          <WindyWebcamEmbed webcam={windyMentonWebcam} fallbackTitle={copy.fallbackTitle} fallbackCta={copy.cta} />
        </div>

        <div className="flex flex-col justify-between border border-[#dfd2b8] bg-[#fffaf0] p-6">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#b49353]">{copy.eyebrow}</p>
            <h2 id="live-menton-title" className="mt-3 serif-heading text-3xl leading-tight text-[#173f36] sm:text-4xl">
              {copy.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#5c5044]">{copy.intro}</p>

            <dl className="mt-6 grid gap-3 border-y border-[#dfd2b8] py-5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="font-bold uppercase tracking-[0.12em] text-[#71665b]">{copy.sourceLabel}</dt>
                <dd className="text-right text-[#173f36]">{windyMentonWebcam.provider}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-bold uppercase tracking-[0.12em] text-[#71665b]">{copy.locationLabel}</dt>
                <dd className="text-right text-[#173f36]">{windyMentonWebcam.locationLabel}</dd>
              </div>
            </dl>

            <p className="mt-4 text-xs leading-5 text-[#71665b]">{copy.timelapseNote}</p>
            <p className="mt-2 text-xs leading-5 text-[#71665b]">{copy.note}</p>
          </div>

          <a
            className="mt-6 inline-flex w-fit border border-[#c6a66a] px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#173f36] hover:bg-[#f3ead7]"
            href={windyMentonWebcam.externalUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {copy.cta}
          </a>
        </div>
      </div>

      {externalWebcamLinks.length > 0 ? (
        <div className="border-t border-[#dfd2b8] px-5 py-5 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <h3 className="serif-heading text-2xl leading-tight text-[#173f36]">{copy.otherTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5c5044]">{copy.otherIntro}</p>
            </div>
            <ul className="grid gap-2 text-sm sm:grid-cols-3 lg:min-w-[520px]">
              {externalWebcamLinks.map((link) => (
                <li key={link.externalUrl}>
                  <a
                    className="flex h-full flex-col border border-[#dfd2b8] bg-[#fffaf0] px-4 py-3 text-[#173f36] hover:border-[#c6a66a] hover:bg-[#f3ead7]"
                    href={link.externalUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#b49353]">{link.provider}</span>
                    <span className="mt-1 leading-5">{link.title[locale]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
