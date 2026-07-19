import type { LocalizedGuideAuthorityProfile } from "@/content/guide-authority";

type Props = {
  profile: LocalizedGuideAuthorityProfile;
  locale: "en" | "fr" | "it" | "uk";
  labels: { author: string; checked: string; sources: string };
};

export function GuideAuthorityPanel({ profile, locale, labels }: Props) {
  const checkedDate = new Date(`${profile.reviewedAt}T12:00:00Z`).toLocaleDateString({ en: "en-GB", fr: "fr-FR", it: "it-IT", uk: "uk-UA" }[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <section className="border border-[#dfd2b8] bg-[#fffaf0] p-5" aria-label={profile.author}>
      <div className="grid gap-4 text-sm leading-6 text-[#5c5044]">
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{labels.author}</p>
          <p className="mt-1 text-[#173f36]">{profile.author}</p>
        </div>
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{labels.checked}</p>
          <p className="mt-1 text-[#173f36]">{checkedDate}</p>
        </div>
        <div className="border-t border-[#dfd2b8] pt-4">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{labels.sources}</p>
          <div className="mt-2 grid gap-2">
            {profile.sources.map((source) => (
              <a key={source.url} className="text-sm font-semibold text-[#173f36] underline-offset-4 hover:underline" href={source.url} target="_blank" rel="noopener noreferrer">
                {source.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 border-t border-[#dfd2b8] pt-4 text-xs italic leading-5 text-[#71665b]">{profile.reviewNote}</p>
    </section>
  );
}
