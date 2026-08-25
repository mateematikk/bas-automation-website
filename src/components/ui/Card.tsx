import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6",
        hover &&
          "transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
