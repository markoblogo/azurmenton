"use client";

import Link from "next/link";
import type { Route } from "next";
import type { BookingFunnelEvent, BookingFunnelProps } from "@/lib/analytics";
import { trackBookingFunnelEvent } from "@/lib/analytics";

type TrackedLinkProps = {
  children: React.ReactNode;
  className?: string;
  eventName: BookingFunnelEvent;
  href: string;
  props?: BookingFunnelProps;
  rel?: string;
  target?: string;
};

export function TrackedLink({
  children,
  className,
  eventName,
  href,
  props,
  rel,
  target,
}: TrackedLinkProps) {
  const handleClick = () => {
    trackBookingFunnelEvent(eventName, props);
  };
  const safeRel = target === "_blank" ? Array.from(new Set([...(rel?.split(/\s+/).filter(Boolean) ?? []), "noopener", "noreferrer"])).join(" ") : rel;

  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a className={className} href={href} onClick={handleClick} rel={safeRel} target={target}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href as Route} onClick={handleClick} rel={safeRel} target={target}>
      {children}
    </Link>
  );
}
