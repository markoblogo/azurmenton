import Link from "next/link";
import type { Route } from "next";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
};

const variants = {
  primary:
    "bg-[#0b6f8f] text-white shadow-sm hover:bg-[#075a75] focus-visible:outline-[#0b6f8f]",
  secondary:
    "border border-[#d9cdbd] bg-white/70 text-[#17313a] hover:border-[#0b6f8f] hover:text-[#0b6f8f] focus-visible:outline-[#0b6f8f]",
};

export function Button({
  children,
  href,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const className = `inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]}`;

  if (href) {
    return (
      <Link className={className} href={href as Route}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} type={type}>
      {children}
    </button>
  );
}
