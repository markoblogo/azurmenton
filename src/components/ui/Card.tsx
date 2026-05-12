type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-lg border border-[#e4d8c7] bg-white/82 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
