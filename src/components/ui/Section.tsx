import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function Section({
  id,
  children,
  className,
  containerClassName,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionProps) {
  const isDark = tone === "dark";

  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", className)}>
      <Container className={containerClassName}>
        {(eyebrow || title || description) && (
          <div
            className={cn(
              "mb-10 max-w-2xl sm:mb-12 lg:mb-14",
              align === "center" && "mx-auto text-center",
            )}
          >
            {eyebrow && (
              <p
                className={cn(
                  "mb-3 text-sm font-semibold tracking-wide uppercase",
                  isDark ? "text-sky-300" : "text-accent",
                )}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={cn(
                  "font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.5rem] lg:leading-tight",
                  isDark ? "text-white" : "text-navy",
                )}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={cn(
                  "mt-4 text-base leading-relaxed sm:text-lg",
                  isDark ? "text-slate-300" : "text-muted",
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
