"use client";

import { useEffect } from "react";

const surfaceClass = "photo-shine-surface";
const visibleClass = "photo-shine-visible";

export function PhotoShineObserver() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const surfaces = new Set<HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle(visibleClass, entry.isIntersecting);
        }
      },
      {
        rootMargin: "80px 0px",
        threshold: 0.18,
      },
    );

    const observeImages = () => {
      const images = Array.from(document.querySelectorAll<HTMLImageElement>("main img[data-nimg]"));

      for (const image of images) {
        const surface = image.parentElement;

        if (!surface || surface instanceof HTMLPictureElement || surfaces.has(surface)) {
          continue;
        }

        if (surface.closest("header, footer, nav")) {
          continue;
        }

        const bounds = surface.getBoundingClientRect();

        if (bounds.width < 160 || bounds.height < 120) {
          continue;
        }

        surface.classList.add(surfaceClass);
        surfaces.add(surface);
        observer.observe(surface);
      }
    };

    let animationFrame = window.requestAnimationFrame(observeImages);
    const mutationObserver = new MutationObserver(() => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(observeImages);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      mutationObserver.disconnect();
      observer.disconnect();
      surfaces.forEach((surface) => {
        surface.classList.remove(surfaceClass, visibleClass);
      });
    };
  }, []);

  return null;
}
