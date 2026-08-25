import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Container } from "@/components/ui/Container";

const serviceLinks = [
  { label: "BAS Малий бізнес", href: "#services" },
  { label: "BAS Бухгалтерія", href: "#services" },
  { label: "Інтеграції", href: "#integrations" },
  { label: "Сервери", href: "#services" },
  { label: "Консалтинг", href: "#services" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white pt-12 pb-8">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-sm font-bold text-white">
                І
              </span>
              <span className="font-display text-lg font-semibold text-navy">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Автоматизація бізнесу на BAS, інтеграції з зовнішніми сервісами та
              підтримка систем для малого й середнього бізнесу.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-navy">Навігація</p>
            <ul className="mt-3 space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-navy">Послуги</p>
            <ul className="mt-3 space-y-2">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-navy">Контакти</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <a
                  href={siteConfig.contacts.telegram}
                  className="hover:text-accent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram: {siteConfig.contacts.telegramLabel}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contacts.email}`}
                  className="hover:text-accent"
                >
                  {siteConfig.contacts.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contacts.phoneHref}
                  className="hover:text-accent"
                >
                  {siteConfig.contacts.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}. Усі права захищено.
          </p>
          <p>Автоматизація бізнесу на BAS · Україна</p>
        </div>
      </Container>
    </footer>
  );
}
