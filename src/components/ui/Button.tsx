import Link from "next/link";
import type { Route } from "next";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  disabled?: boolean;
};

export const buttonVariants = {
  primary:
    "border border-[#173f36] bg-[#173f36] text-white hover:bg-[#102f28] focus-visible:outline-[#173f36]",
  secondary:
    "border border-[#c6a66a] bg-transparent text-[#173f36] hover:bg-[#f3ead7] focus-visible:outline-[#c6a66a]",
};

export function Button({
  children,
  className = "",
  disabled = false,
  href,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const classes = `inline-flex min-h-11 items-center justify-center px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${buttonVariants[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link className={classes} href={href as Route}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} type={type}>
      {children}
    </button>
  );
}
