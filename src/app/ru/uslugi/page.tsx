import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { StructuredData } from "@/components/StructuredData";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

const description = "BAS Expert — услуги программиста 1С и BAS, автоматизация бизнеса, настройка учетных систем, создание ИИ-агентов и интеграции с CRM и сервисами.";

export const metadata = pageMetadata({ title: "Программист 1С и BAS — автоматизация бизнеса", description, path: "/ru/uslugi", locale: "ru_UA" });

const offers = [
  {
    title: "Программист 1С и BAS",
    text: "Помогаем компаниям, которым нужен программист 1С или BAS для развития и поддержки учетной системы. Разрабатываем расширения, внешние обработки, отчеты и печатные формы. Разбираемся с ошибками в документах и обменах, адаптируем конфигурацию под рабочие процессы сотрудников.",
    detail: "Перед изменениями изучаем версию конфигурации и существующие доработки. Согласовываем примеры данных и ожидаемый результат. Проверяем изменения на копии базы, затем планируем обновление рабочей системы и объясняем пользователям порядок работы.",
    href: "/services/programmist-1c",
  },
  {
    title: "Автоматизация бизнеса и настройка учетных систем",
    text: "Внедряем и настраиваем BAS Малий бізнес и BAS Бухгалтерія. Организуем учет продаж, закупок, товаров, взаиморасчетов и финансов. Настраиваем справочники, права доступа, документы и управленческие отчеты. Помогаем перенести начальные остатки и проверить данные перед запуском.",
    detail: "Начинаем с анализа движения заказа, товара, оплаты и документов. Определяем, где сотрудники повторно вводят информацию и каких отчетов не хватает руководителю. На этой основе согласовываем план автоматизации, этапы и критерии приемки работ.",
    href: "/services/bas-automation",
  },
  {
    title: "Создание ИИ-агентов для автоматизации",
    text: "Разрабатываем ИИ-агентов для первичной обработки заявок, поиска по базе знаний компании, подготовки ответов и извлечения данных из документов. Подключаем BAS, CRM, Telegram и другие сервисы через доступные API. Агент передает обращения ответственному сотруднику и помогает подготовить информацию для дальнейшей работы.",
    detail: "Для запуска выбираем конкретный сценарий и источники данных. Согласовываем права доступа, действия, требующие подтверждения человека, и передачу сложных случаев менеджеру. Проверяем пилот на примерах ваших задач и оцениваем результат перед подключением рабочих систем.",
    href: "/services/ai-agents",
  },
  {
    title: "Интеграции BAS с сервисами",
    text: "Настраиваем обмен с CRM, сайтами и интернет-магазинами, Prom, Rozetka, Новой почтой, M.E.Doc, Вчасно, Google Sheets и Telegram. Синхронизируем заказы, товары, цены, остатки и статусы. Возможности интеграции уточняем по API сервиса и версии вашей конфигурации.",
    detail: "Определяем главное хранилище данных, правила сопоставления товаров и контрагентов, направление и частоту обмена. Проверяем повторную отправку, обработку ошибок и восстановление синхронизации. Для заявок с сайта можно настроить уведомления в Telegram.",
    href: "/services/integrations",
  },
];

export default function RussianServicesPage() {
  return (
    <>
      <Header />
      <main id="main-content" lang="ru" className="flex-1 py-10 sm:py-16">
        <Container>
          <Link href="/" lang="uk" hrefLang="uk" className="text-sm font-semibold text-accent hover:underline">Головна українською</Link>
          <div className="mt-8 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">BAS Expert</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-5xl">Программист 1С и BAS. Автоматизация бизнеса.</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">BAS Expert помогает настроить учетные системы, связать сервисы компании и внедрить ИИ-агентов в ежедневные процессы. Работаем с задачами малого и среднего бизнеса — от отдельного отчета до комплексной автоматизации.</p>
            <Button href="/#contacts" size="lg" className="mt-8">Обсудить задачу</Button>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {offers.map((offer) => (
              <article key={offer.href} className="rounded-2xl border border-border bg-white p-6 sm:p-8">
                <h2 className="text-2xl font-semibold text-navy">{offer.title}</h2>
                <p className="mt-5 leading-relaxed text-muted">{offer.text}</p>
                <p className="mt-4 leading-relaxed text-muted">{offer.detail}</p>
                <Link href={offer.href} lang="uk" hrefLang="uk" className="mt-6 inline-block font-semibold text-accent hover:underline">Подробнее об услуге на украинском →</Link>
              </article>
            ))}
          </div>
          <section className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-semibold text-navy">Как заказать настройку BAS или услуги программиста 1С</h2>
            <p className="mt-5 leading-relaxed text-muted">Опишите задачу, укажите название учетной системы и сервисы, которые нужно подключить. Для доработки полезны пример документа, отчета или описание ошибки. После знакомства с задачей согласуем объем работ, стоимость, сроки и порядок проверки результата.</p>
            <Button href="/#contacts" size="lg" className="mt-6">Оставить заявку</Button>
          </section>
        </Container>
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Программист 1С и BAS — автоматизация бизнеса",
            description,
            provider: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url || undefined,
            },
            url: siteConfig.url ? `${siteConfig.url}/ru/uslugi` : undefined,
          }}
        />
      </main>
      <Footer />
    </>
  );
}
