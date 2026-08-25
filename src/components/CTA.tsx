import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-gradient-to-br from-navy via-slate-900 to-slate-800 px-6 py-12 text-center shadow-xl shadow-slate-900/10 sm:px-10 sm:py-16">
          <div
            className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-accent/25 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-28 -left-10 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Не знаєте, що саме потрібно автоматизувати?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Розкажіть нам про свій бізнес — ми допоможемо знайти процеси, які
              варто автоматизувати.
            </p>
            <Button href="#contacts" size="lg" className="mt-8">
              Обговорити задачу
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
