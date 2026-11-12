import {
  BriefcaseBusiness,
  Code2,
  Cable,
  Server,
  Lightbulb,
  ArrowRight,
  Bot,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const services = [
  {
    title: "Впровадження BAS",
    href: "/services/bas-automation",
    description:
      "Впровадження BAS Малий бізнес і BAS Бухгалтерія. Налаштування продажів, закупівель, складу та бухгалтерського обліку.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Програміст 1С та BAS",
    href: "/services/programmist-1c",
    description:
      "Розробка додаткової функціональності під унікальні бізнес-процеси — без зайвої складності в інтерфейсі.",
    icon: Code2,
  },
  {
    title: "ШІ-агенти для бізнесу",
    href: "/services/ai-agents",
    description: "Розробка агентів для обробки заявок, підготовки документів і роботи з базою знань. Підключення до BAS, CRM та Telegram.",
    icon: Bot,
  },
  {
    title: "Інтеграції",
    href: "/services/integrations",
    description:
      "Обмін даними між BAS, CRM, сайтами, маркетплейсами, Новою поштою, M.E.Doc, Вчасно та іншими сервісами.",
    icon: Cable,
  },
  {
    title: "Сервери",
    href: "/#contacts",
    description:
      "Встановлення, налаштування та адміністрування серверної інфраструктури для стабільної роботи BAS.",
    icon: Server,
  },
  {
    title: "Консалтинг",
    href: "/#contacts",
    description:
      "Аналіз бізнес-процесів і пошук точок автоматизації, які реально економлять час команди.",
    icon: Lightbulb,
  },
] as const;

export function Services() {
  return (
    <Section
      id="services"
      className="bg-white"
      eyebrow="Наші послуги"
      title="BAS, ШІ-агенти та інтеграції для вашого бізнесу"
      description="Впроваджуємо облікові системи, програмуємо потрібні доопрацювання та автоматизуємо роботу між сервісами."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="flex h-full flex-col">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white">
              <service.icon className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="font-display text-xl font-semibold text-navy">
              {service.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">
              {service.description}
            </p>
            <a
              href={service.href}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              {service.href.startsWith("/services/") ? "Детальніше" : "Обговорити"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </Card>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Button href="#contacts" size="lg">
          Отримати консультацію
        </Button>
      </div>
    </Section>
  );
}
