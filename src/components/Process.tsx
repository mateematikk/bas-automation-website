import { Section } from "@/components/ui/Section";

const steps = [
  {
    num: "01",
    title: "Аналіз",
    description: "Вивчаємо ваш бізнес та існуючі процеси.",
  },
  {
    num: "02",
    title: "Проєктування",
    description: "Формуємо рішення та план автоматизації.",
  },
  {
    num: "03",
    title: "Впровадження",
    description: "Налаштовуємо BAS, інтеграції та ШІ-агентів.",
  },
  {
    num: "04",
    title: "Тестування",
    description: "Перевіряємо обмін даними та бізнес-сценарії.",
  },
  {
    num: "05",
    title: "Підтримка",
    description: "Супроводжуємо систему після запуску.",
  },
] as const;

export function Process() {
  return (
    <Section
      id="process"
      className="bg-white"
      eyebrow="Як ми працюємо"
      title="Прозорий процес від першої розмови до супроводу"
      description="Узгоджуємо задачі, обсяг робіт та критерії приймання. Перевіряємо результат на ваших робочих сценаріях."
    >
      {/* Mobile: vertical timeline */}
      <ol className="relative space-y-6 border-l border-border pl-6 md:hidden">
        {steps.map((step) => (
          <li key={step.num} className="relative">
            <span className="absolute top-1.5 -left-[1.9rem] flex h-7 w-7 items-center justify-center rounded-full border border-border bg-white text-xs font-bold text-accent shadow-sm">
              {step.num}
            </span>
            <h3 className="text-lg font-semibold text-navy">{step.title}</h3>
            <p className="mt-1 text-sm text-muted">{step.description}</p>
          </li>
        ))}
      </ol>

      {/* Desktop: horizontal process */}
      <ol className="relative hidden md:grid md:grid-cols-5 md:gap-4">
        {steps.map((step) => (
          <li key={step.num} className="relative flex flex-col items-start">
            <span className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-white font-display text-sm font-bold text-accent shadow-sm">
              {step.num}
            </span>
            <h3 className="text-lg font-semibold text-navy">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
