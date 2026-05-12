type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

export function Section({ children, className = "" }: SectionProps) {
  return <section className={`py-14 sm:py-20 ${className}`}>{children}</section>;
}
