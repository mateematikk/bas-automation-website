import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { services } from "@/lib/services";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white pt-12 pb-8">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-sm font-bold text-white">BE</span>
              <span className="font-display text-lg font-semibold text-navy">BAS Expert</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">Автоматизація бізнесу на BAS, ШІ-агенти та інтеграції з сервісами вашої компанії.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-navy">Компанія</p>
            <ul className="mt-3 space-y-2">
              {siteConfig.nav.map((item) => <li key={item.href}><Link href={item.href} className="text-sm text-muted hover:text-accent">{item.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-navy">Послуги</p>
            <ul className="mt-3 space-y-2">
              {services.map((item) => <li key={item.slug}><Link href={`/services/${item.slug}`} className="text-sm text-muted hover:text-accent">{item.title}</Link></li>)}
              <li><Link href="/ru/uslugi" lang="ru" hrefLang="ru" className="text-sm text-muted hover:text-accent">Услуги на русском</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-navy">Зв’язатися з BAS Expert</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {siteConfig.contacts.telegram && <li><a href={siteConfig.contacts.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{siteConfig.contacts.telegramLabel}</a></li>}
              {siteConfig.contacts.email && <li><a href={`mailto:${siteConfig.contacts.email}`} className="break-words hover:text-accent">{siteConfig.contacts.email}</a></li>}
              {siteConfig.contacts.phone && <li><a href={siteConfig.contacts.phoneHref || `tel:${siteConfig.contacts.phone.replace(/[^+\d]/g, "")}`} className="hover:text-accent">{siteConfig.contacts.phone}</a></li>}
              <li><Link href="/#contacts" className="text-accent hover:underline">Обговорити задачу</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} BAS Expert. Усі права захищено.</p>
          <p>BAS · ШІ-агенти · Інтеграції</p>
        </div>
      </Container>
    </footer>
  );
}
