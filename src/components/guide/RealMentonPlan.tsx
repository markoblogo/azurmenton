import type { LocalizedGuideAuthorityProfile } from "@/content/guide-authority";

type Props = {
  plan: LocalizedGuideAuthorityProfile["plan"];
  label: string;
};

export function RealMentonPlan({ plan, label }: Props) {
  return (
    <section className="border border-[#d8c698] bg-[#f3ead7] p-5 sm:p-6">
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{label}</p>
      <h2 className="mt-2 serif-heading text-3xl leading-none text-[#173f36]">{plan.title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5c5044]">{plan.intro}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {plan.steps.map((step) => (
          <div key={step.label} className="border-l-2 border-[#c6a66a] pl-3">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-[#8b6d36]">{step.label}</p>
            <p className="mt-1 text-sm leading-6 text-[#5c5044]">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
