import {
  ShoppingCart,
  Package,
  Warehouse,
  Calculator,
  Factory,
  Truck,
  Users,
  BarChart3,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

const areas = [
  {
    title: "Продажі",
    description:
      "Замовлення, рахунки, ціни та контроль воронки продажів в одній системі.",
    icon: ShoppingCart,
  },
  {
    title: "Закупівлі",
    description:
      "Постачальники, замовлення постачальникам і прозорий рух товарів.",
    icon: Package,
  },
  {
    title: "Склад",
    description:
      "Залишки, переміщення, резервування та актуальна картина по складах.",
    icon: Warehouse,
  },
  {
    title: "Бухгалтерія",
    description:
      "Облік, податки, звітність і зменшення ручного введення документів.",
    icon: Calculator,
  },
  {
    title: "Виробництво",
    description:
      "Калькуляції, випуск продукції та контроль матеріалів у процесі.",
    icon: Factory,
  },
  {
    title: "Логістика",
    description:
      "Доставки, ТТН і статус відправлень без дублювання даних.",
    icon: Truck,
  },
  {
    title: "CRM та клієнти",
    description:
      "Історія взаємодій, статуси угод і синхронізація з BAS.",
    icon: Users,
  },
  {
    title: "Управлінський облік",
    description:
      "Звіти для рішень: маржа, витрати, канали продажів і динаміка.",
    icon: BarChart3,
  },
] as const;

export function AutomationAreas() {
  return (
    <Section
      id="automation"
      eyebrow="Що ми автоматизуємо"
      title="Ключові процеси вашого бізнесу"
      description="Окремі модулі чи наскрізний контур — будуємо автоматизацію під реальні сценарії роботи команди."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {areas.map((area) => (
          <Card key={area.title} className="h-full">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <area.icon className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="text-lg font-semibold text-navy">{area.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {area.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
