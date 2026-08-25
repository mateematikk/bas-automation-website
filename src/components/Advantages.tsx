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
    title: "Розуміємо бізнес, а не лише код",
    description:
      "Спочатку процеси й ролі в компанії — потім технічне рішення.",
    icon: Brain,
  },
  {
    title: "Автоматизуємо комплексно",
    description:
      "BAS, інтеграції, обмін даними та підтримка в одному контурі.",
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
      "Стабільна робота системи — частина впровадження, а не «післязавтра».",
    icon: ServerCog,
  },
  {
    title: "Не нав'язуємо зайву автоматизацію",
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
      title="Партнер з автоматизації, а не «налаштували і зникли»"
      description="Наша задача — щоб система працювала в реальному бізнесі щодня, а не лише на демо."
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
