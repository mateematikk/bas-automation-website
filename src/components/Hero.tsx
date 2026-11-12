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
            BAS Expert · Автоматизація для вашої компанії
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl lg:leading-[1.12]">
            Автоматизація бізнесу на BAS.{" "}
            <span className="mt-2 block text-accent">ШІ-агенти для щоденних задач.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            BAS Expert впроваджує та налаштовує облікові системи, розробляє
            ШІ-агентів і з’єднує BAS з CRM, сайтами та сервісами вашого бізнесу.
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
            Від замовлення клієнта до обліку та звітності — допомагаємо команді
            працювати з узгодженими даними та скорочувати ручні операції.
          </p>
        </div>

        <div className="animate-fade-up [animation-delay:120ms]">
          <HeroDiagram />
        </div>
      </Container>
    </section>
  );
}
