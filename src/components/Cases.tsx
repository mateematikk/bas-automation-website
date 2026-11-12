import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

/**
 * Демонстраційні кейси — замініть title/summary/tags на реальні історії клієнтів.
 * Не містять вигаданих метрик економії.
 */
export const demoCases = [
  {
    id: "shop-bas",
    title: "Інтеграція інтернет-магазину з BAS",
    summary:
      "Автоматичне створення замовлень у BAS зі сайту, оновлення статусів і синхронізація номенклатури.",
    tags: ["Сайт", "BAS", "Обмін даними"],
  },
  {
    id: "warehouse",
    title: "Автоматизація обліку та складу",
    summary:
      "Налаштування складського обліку, резервів і документів руху для прозорих залишків.",
    tags: ["Склад", "BAS Малий бізнес"],
  },
  {
    id: "nova-poshta",
    title: "Інтеграція Нової пошти",
    summary:
      "Формування ТТН, статуси відправлень і зменшення ручного введення в логістиці.",
    tags: ["Нова пошта", "Логістика"],
  },
  {
    id: "documents",
    title: "Автоматичне формування документів",
    summary:
      "Ланцюжок від замовлення до рахунків і актів з мінімумом повторного введення.",
    tags: ["Документи", "Бухгалтерія"],
  },
  {
    id: "marketplace",
    title: "Синхронізація маркетплейсу з BAS",
    summary:
      "Замовлення та залишки між маркетплейсом і BAS без дублювання в таблицях.",
    tags: ["Маркетплейси", "Інтеграції"],
  },
] as const;

export function Cases() {
  return (
    <Section
      id="cases"
      eyebrow="Сценарії автоматизації"
      title="Типові сценарії, які ми вирішуємо"
      description="Приклади процесів, які можна автоматизувати у вашій компанії. Склад робіт визначаємо після знайомства з поточною системою."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {demoCases.map((item) => (
          <Card key={item.id} className="flex h-full flex-col">
            <div className="mb-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="font-display text-lg font-semibold text-navy">
              {item.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              {item.summary}
            </p>
            <a
              href="#contacts"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-hover"
            >
              Схожа задача?
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </Card>
        ))}
      </div>
    </Section>
  );
}
