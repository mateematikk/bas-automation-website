/**
 * Центральна конфігурація сайту.
 * Контакти та URL можна перевизначити через environment variables.
 */

export const siteConfig = {
  name: "Інтегра",
  legalName: "Інтегра",
  tagline: "Автоматизація бізнесу на BAS",
  description:
    "Впровадження BAS Малий бізнес і BAS Бухгалтерія, інтеграції з маркетплейсами, Новою поштою, M.E.Doc, Вчасно, CRM та сайтами. Підтримка й сервери для малого та середнього бізнесу.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://integra.example.com",
  locale: "uk_UA",

  contacts: {
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+380 XX XXX XX XX",
    phoneHref:
      process.env.NEXT_PUBLIC_CONTACT_PHONE_HREF || "tel:+380000000000",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@integra.example.com",
    telegram:
      process.env.NEXT_PUBLIC_CONTACT_TELEGRAM || "https://t.me/your_username",
    telegramLabel:
      process.env.NEXT_PUBLIC_CONTACT_TELEGRAM_LABEL || "@your_username",
  },

  nav: [
    { label: "Послуги", href: "#services" },
    { label: "Інтеграції", href: "#integrations" },
    { label: "Про нас", href: "#about" },
    { label: "Як працюємо", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Контакти", href: "#contacts" },
  ] as const,
} as const;

export type SiteConfig = typeof siteConfig;
