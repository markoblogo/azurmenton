import { Container } from "@/components/ui/Container";

type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <div className="border-b border-[#eadfce] bg-[#fff3df]">
      <Container>
        <div className="max-w-3xl py-12 sm:py-16">
          {eyebrow ? (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#0b6f8f]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-3xl font-semibold tracking-tight text-[#17313a] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-base leading-7 text-[#5c5044] sm:text-lg">{description}</p>
        </div>
      </Container>
    </div>
  );
}
