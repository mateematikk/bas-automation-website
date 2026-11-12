import { AlertCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

const problems = [
  "Менеджери вручну переносять замовлення?",
  "Дані дублюються у декількох системах?",
  "Бухгалтер витрачає години на ручний облік?",
  "Склад не бачить актуальні залишки?",
  "Замовлення з сайту потрібно вручну переносити в BAS?",
  "Система працює повільно або нестабільно?",
] as const;

export function Problems() {
  return (
    <Section
      id="problems"
      className="bg-navy text-white"
      tone="dark"
      eyebrow="Проблеми, які ми вирішуємо"
      title="Впізнаєте свій день?"
      description="Повторне введення даних забирає час команди та збільшує ризик помилок в обліку."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => (
          <div
            key={problem}
            className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:bg-white/10 sm:p-5"
          >
            <AlertCircle
              className="mt-0.5 h-5 w-5 shrink-0 text-sky-300"
              aria-hidden
            />
            <p className="text-sm font-medium leading-relaxed text-slate-100 sm:text-base">
              {problem}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-sky-400/20 bg-gradient-to-br from-sky-500/15 to-transparent p-6 sm:p-8">
        <p className="font-display text-xl font-semibold text-white sm:text-2xl">
          Об’єднуємо замовлення, документи та облік в узгоджений процес.
        </p>
        <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          Спочатку розбираємо, як насправді працює бізнес. Потім проєктуємо
          обмін даними так, щоб команда менше клікала й більше продавала та
          обліковувала.
        </p>
        <Button href="#contacts" className="mt-6" size="lg">
          Отримати консультацію
        </Button>
      </div>
    </Section>
  );
}
