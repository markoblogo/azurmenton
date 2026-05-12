import { Container } from "@/components/ui/Container";

type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <div className="border-b border-[#dfd4c1] bg-[#f6efe3]">
      <Container>
        <div className="max-w-4xl py-14 sm:py-20">
          {eyebrow ? (
            <p className="editorial-label mb-4">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="serif-heading text-5xl leading-[0.98] text-[#173f36] sm:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#5f574c] sm:text-lg">{description}</p>
        </div>
      </Container>
    </div>
  );
}
