type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`border border-[#dfd4c1] bg-[#fffdf8]/88 ${className}`}>
      {children}
    </div>
  );
}
