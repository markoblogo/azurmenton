"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import type { WindyWebcam } from "@/content/webcams";

export function WindyWebcamEmbed({
  webcam,
  fallbackTitle,
  fallbackCta,
}: {
  webcam: WindyWebcam;
  fallbackTitle: string;
  fallbackCta: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptFailed, setScriptFailed] = useState(false);
  const [embedMissing, setEmbedMissing] = useState(false);
  const windyAnchorName = { name: "windy-webcam-timelapse-player" };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;
      const hasRenderedPlayer = Boolean(container.querySelector("iframe, video, canvas, img"));
      setEmbedMissing(!hasRenderedPlayer);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [webcam.webcamId]);

  const showFallback = scriptFailed || embedMissing;

  return (
    <div className="relative min-h-[280px] overflow-hidden border border-[#dfd2b8] bg-[#0f2f2a] sm:min-h-[360px]">
      <div ref={containerRef} className="min-h-[280px] w-full sm:min-h-[360px]">
        <a
          {...windyAnchorName}
          data-id={webcam.webcamId}
          data-play={webcam.playMode}
          data-loop={webcam.loop ? "1" : "0"}
          data-auto-play={webcam.autoPlay ? "1" : "0"}
          data-force-full-screen-on-overlay-play="0"
          data-interactive={webcam.interactive ? "1" : "0"}
          href={webcam.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>

      {showFallback ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#fffaf0] p-6 text-center">
          <p className="serif-heading text-2xl leading-tight text-[#173f36]">{fallbackTitle}</p>
          <a
            className="inline-flex border border-[#c6a66a] px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#173f36] hover:bg-[#f3ead7]"
            href={webcam.externalUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {fallbackCta}
          </a>
        </div>
      ) : null}

      <Script
        id={`windy-webcam-player-${webcam.webcamId}`}
        src={webcam.playerScriptUrl}
        strategy="afterInteractive"
        onError={() => setScriptFailed(true)}
      />
    </div>
  );
}
