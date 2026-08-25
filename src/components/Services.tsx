import {
  BriefcaseBusiness,
  BookOpenCheck,
  Code2,
  Cable,
  Server,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const services = [
  {
    title: "BAS Малий бізнес",
    description:
      "Впровадження, налаштування, адаптація та супровід BAS Малий бізнес під ваші процеси продажів, закупівель і складу.",
    icon: BriefcaseBusiness,
  },
  {
    title: "BAS Бухгалтерія",
    description:
      "Автоматизація бухгалтерського та податкового обліку: первинка, звітність і узгодженість даних між відділами.",
    icon: BookOpenCheck,
  },
  {
    title: "Доопрацювання BAS",
    description:
      "Розробка додаткової функціональності під унікальні бізнес-процеси — без зайвої складності в інтерфейсі.",
    icon: Code2,
  },
  {
    title: "Інтеграції",
    description:
      "Обмін даними між BAS, CRM, сайтами, маркетплейсами, Новою поштою, M.E.Doc, Вчасно та іншими сервісами.",
    icon: Cable,
  },
  {
    title: "Сервери",
    description:
      "Встановлення, налаштування та адміністрування серверної інфраструктури для стабільної роботи BAS.",
    icon: Server,
  },
  {
    title: "Консалтинг",
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
      title="Повний цикл роботи з BAS і інтеграціями"
      description="Від аналізу процесів до впровадження, доопрацювань і підтримки — один підрядник за екосистему."
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
              href="#contacts"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              Обговорити
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
