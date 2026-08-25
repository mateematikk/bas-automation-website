import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroDiagram } from "@/components/HeroDiagram";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-radial-glow pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="animate-fade-up">
          <p className="mb-4 inline-flex items-center rounded-full border border-border bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-accent uppercase shadow-sm">
            Автоматизація бізнесу на BAS
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl lg:leading-[1.12]">
            Автоматизуємо бізнес на BAS та об&apos;єднуємо всі ваші системи в одну
            екосистему
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Впровадження BAS, інтеграції, автоматизація процесів, сервери та
            технічна підтримка для малого та середнього бізнесу.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#contacts" size="lg">
              Отримати консультацію
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="#services" variant="secondary" size="lg">
              Наші послуги
            </Button>
          </div>
          <p className="mt-6 max-w-md text-sm text-muted">
            Ми не просто програмуємо BAS. Ми допомагаємо прибрати ручну роботу,
            з&apos;єднати системи та побудувати зрозумілий автоматизований процес.
          </p>
        </div>

        <div className="animate-fade-up [animation-delay:120ms]">
          <HeroDiagram />
        </div>
      </Container>
    </section>
  );
}
