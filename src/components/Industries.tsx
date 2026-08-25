import {
  Store,
  Boxes,
  Factory,
  Truck,
  ShoppingBag,
  Wrench,
  Share2,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

const industries = [
  {
    title: "Інтернет-магазини",
    description: "Замовлення з сайту в BAS без ручного переносу.",
    icon: Store,
  },
  {
    title: "Дистриб'ютори",
    description: "Закупівлі, склади та відвантаження в єдиному контурі.",
    icon: Boxes,
  },
  {
    title: "Виробничі компанії",
    description: "Матеріали, випуск і облік під виробничий цикл.",
    icon: Factory,
  },
  {
    title: "Оптова торгівля",
    description: "Прайс-листи, резерви та контроль дебіторки.",
    icon: Truck,
  },
  {
    title: "Роздрібна торгівля",
    description: "Каса, склади магазинів і актуальні залишки.",
    icon: ShoppingBag,
  },
  {
    title: "Сервісні компанії",
    description: "Заявки, роботи, матеріали й фінансовий облік.",
    icon: Wrench,
  },
  {
    title: "Мультиканальні продажі",
    description: "Сайт, маркетплейси й офлайн — в одній картині.",
    icon: Share2,
  },
] as const;

export function Industries() {
  return (
    <Section
      id="industries"
      className="bg-white"
      eyebrow="Кому ми допомагаємо"
      title="Для компаній, де важливі швидкість і точність даних"
      description="Працюємо з малим і середнім бізнесом, де BAS має стати центром операцій, а не ще однією таблицею."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {industries.map((item) => (
          <Card key={item.title} className="h-full">
            <item.icon className="mb-3 h-6 w-6 text-accent" aria-hidden />
            <h3 className="text-base font-semibold text-navy">{item.title}</h3>
            <p className="mt-2 text-sm text-muted">{item.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
