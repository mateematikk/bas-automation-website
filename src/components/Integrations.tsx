import { Section } from "@/components/ui/Section";

const integrations = [
  "BAS",
  "M.E.Doc",
  "Вчасно",
  "Нова пошта",
  "Prom",
  "Rozetka",
  "CRM",
  "Google Sheets",
  "Telegram",
  "Сайти",
  "Інтернет-магазини",
] as const;

export function Integrations() {
  return (
    <Section
      id="integrations"
      eyebrow="Інтеграції"
      title="З'єднуємо системи, які раніше працювали окремо"
      description="Налаштовуємо інтеграції BAS із CRM, інтернет-магазинами, маркетплейсами, доставкою та електронним документообігом через доступні API й механізми обміну."
      align="center"
    >
      <div className="mx-auto mb-10 max-w-3xl rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <div className="rounded-2xl bg-navy px-6 py-4 font-display text-xl font-semibold text-white">
            BAS
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-accent uppercase">
            <span className="hidden h-px w-8 bg-accent/40 sm:block" />
            ↔ API ↔
            <span className="hidden h-px w-8 bg-accent/40 sm:block" />
          </div>
          <div className="rounded-2xl border border-accent/30 bg-accent-soft px-6 py-4 font-display text-lg font-semibold text-accent">
            Зовнішні сервіси
          </div>
        </div>
        <p className="mt-5 text-center text-sm text-muted sm:text-base">
          Замовлення, залишки, документи, статуси доставок і клієнтські дані
          рухаються між системами без ручного копіювання.
        </p>
      </div>

      <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {integrations.map((name) => (
          <li
            key={name}
            className="flex min-h-[4.5rem] items-center justify-center rounded-2xl border border-border bg-white px-3 py-4 text-center text-sm font-semibold text-graphite shadow-sm transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-md"
          >
            {name}
          </li>
        ))}
      </ul>
    </Section>
  );
}
