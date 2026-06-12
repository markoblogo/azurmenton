"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroSlide = {
  src: string;
  objectPosition?: string;
};

type HeroImageSlidesProps = {
  mainSlides: HeroSlide[];
  insetSlides: HeroSlide[];
};

function useRotatingIndex(length: number, intervalMs: number, initialDelayMs: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (length < 2) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      setIndex((current) => (current + 1) % length);
      interval = window.setInterval(() => {
        setIndex((current) => (current + 1) % length);
      }, intervalMs);
    }, initialDelayMs);

    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [initialDelayMs, intervalMs, length]);

  return index;
}

export function HeroImageSlides({ mainSlides, insetSlides }: HeroImageSlidesProps) {
  const mainIndex = useRotatingIndex(mainSlides.length, 8200, 5200);
  const insetIndex = useRotatingIndex(insetSlides.length, 4300, 1800);

  return (
    <div className="relative lg:pt-[3.35rem] xl:pt-[3.7rem]" aria-hidden="true">
      <div className="relative ml-auto max-w-[680px] overflow-hidden border border-[#dfd4c1] bg-white p-3">
        <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[1/1]">
          {mainSlides.map((slide, index) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt=""
              fill
              fetchPriority={index === 0 ? "high" : "auto"}
              loading={index === 0 ? "eager" : "lazy"}
              quality={90}
              sizes="(min-width: 1280px) 54vw, (min-width: 1024px) 50vw, 100vw"
              className={`next-fill-cover object-cover transition-opacity duration-[1600ms] ease-out ${index === mainIndex ? "opacity-100" : "opacity-0"}`}
              style={{ objectPosition: slide.objectPosition ?? "50% 50%" }}
            />
          ))}
        </div>
      </div>
      <div className="absolute -bottom-7 -left-7 hidden w-60 overflow-hidden border border-[#dfd4c1] bg-[#fbf7ef] p-3 shadow-[0_18px_45px_rgba(23,63,54,0.12)] md:block xl:-left-9 xl:w-64">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {insetSlides.map((slide, index) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt=""
              fill
              loading={index === 0 ? "eager" : "lazy"}
              quality={90}
              sizes="224px"
              className={`next-fill-cover object-cover transition-opacity duration-[1100ms] ease-out ${index === insetIndex ? "opacity-100" : "opacity-0"}`}
              style={{ objectPosition: slide.objectPosition ?? "50% 50%" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
