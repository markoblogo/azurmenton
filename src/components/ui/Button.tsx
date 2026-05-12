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
    "border border-[#173f36] bg-[#173f36] text-white hover:bg-[#102f28] focus-visible:outline-[#173f36]",
  secondary:
    "border border-[#c6a66a] bg-transparent text-[#173f36] hover:bg-[#f3ead7] focus-visible:outline-[#c6a66a]",
};

export function Button({
  children,
  href,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const className = `inline-flex min-h-11 items-center justify-center px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]}`;

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
