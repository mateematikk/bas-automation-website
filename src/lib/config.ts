/**
 * Центральна конфігурація сайту.
 * Контакти та URL можна перевизначити через environment variables.
 */

export const siteConfig = {
  name: "BAS Expert",
  legalName: "BAS Expert",
  tagline: "Автоматизація бізнесу на BAS",
  description:
    "BAS Expert — автоматизація бізнесу на BAS, програмування 1С, налаштування облікових систем, ШІ-агенти та інтеграції з CRM, сайтами й сервісами.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") || "",
  locale: "uk_UA",

  contacts: {
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
    phoneHref:
      process.env.NEXT_PUBLIC_CONTACT_PHONE_HREF || "",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    telegram:
      process.env.NEXT_PUBLIC_CONTACT_TELEGRAM || "",
    telegramLabel:
      process.env.NEXT_PUBLIC_CONTACT_TELEGRAM_LABEL || "Telegram",
  },

  nav: [
    { label: "Послуги", href: "/#services" },
    { label: "ШІ-агенти", href: "/#ai-agents" },
    { label: "Інтеграції", href: "/#integrations" },
    { label: "Про компанію", href: "/#about" },
    { label: "Контакти", href: "/#contacts" },
  ] as const,
} as const;

export type SiteConfig = typeof siteConfig;
