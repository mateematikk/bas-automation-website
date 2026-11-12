import {
  Brain,
  Layers,
  Network,
  ServerCog,
  Target,
  MessageCircle,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

const advantages = [
  {
    title: "Починаємо з бізнес-процесів",
    description:
      "Спочатку процеси й ролі в компанії — потім технічне рішення.",
    icon: Brain,
  },
  {
    title: "Автоматизуємо комплексно",
    description:
      "BAS, ШІ-агенти, інтеграції та підтримка в одному проєкті.",
    icon: Layers,
  },
  {
    title: "Працюємо з BAS і зовнішніми системами",
    description:
      "CRM, сайти, маркетплейси, доставка, електронний документообіг.",
    icon: Network,
  },
  {
    title: "Підтримуємо серверну інфраструктуру",
    description:
      "Налаштовуємо доступ, резервне копіювання та стабільну роботу BAS.",
    icon: ServerCog,
  },
  {
    title: "Узгоджуємо пріоритети",
    description:
      "Рекомендуємо лише те, що дає відчутний ефект для вашої команди.",
    icon: Target,
  },
  {
    title: "Пояснюємо зрозумілою мовою",
    description:
      "Складні технічні рішення — без жаргону для власника й бухгалтера.",
    icon: MessageCircle,
  },
] as const;

export function Advantages() {
  return (
    <Section
      id="about"
      eyebrow="Чому ми"
      title="BAS Expert — компанія з автоматизації бізнесу"
      description="Допомагаємо малим і середнім компаніям налагодити облік на BAS, поєднати сервіси та впровадити ШІ-агентів. Беремо участь у всьому циклі — від аналізу задачі до супроводу системи."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {advantages.map((item) => (
          <Card key={item.title}>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <item.icon className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
