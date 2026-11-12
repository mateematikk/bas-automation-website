import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { StructuredData } from "@/components/StructuredData";
import { services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return pageMetadata({ title: service.title, description: service.description, path: `/services/${slug}` });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 py-10 sm:py-16">
        <Container>
          <nav aria-label="Хлібні крихти" className="mb-8 flex flex-wrap gap-2 text-sm text-muted"><Link href="/" className="hover:text-accent">Головна</Link><span aria-hidden>/</span><Link href="/#services" className="hover:text-accent">Послуги</Link><span aria-hidden>/</span><span className="text-navy">{service.title}</span></nav>
          <article className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">BAS Expert</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-5xl">{service.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">{service.intro}</p>
            <h2 className="mt-12 text-2xl font-semibold text-navy">Які задачі вирішуємо</h2>
            <ul className="mt-5 list-disc space-y-3 pl-5 leading-relaxed text-graphite">{service.tasks.map((task) => <li key={task}>{task}</li>)}</ul>
            <h2 className="mt-12 text-2xl font-semibold text-navy">{service.heading}</h2>
            <p className="mt-5 leading-relaxed text-muted">{service.details}</p>
            <p className="mt-4 leading-relaxed text-muted">{service.result}</p>
            <Button href="/#contacts" size="lg" className="mt-8">Обговорити задачу</Button>
          </article>
          <aside className="mt-16 border-t border-border pt-8">
            <h2 className="text-xl font-semibold text-navy">Інші послуги BAS Expert</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">{services.filter((item) => item.slug !== slug).map((item) => <li key={item.slug}><Link href={`/services/${item.slug}`} className="text-accent underline-offset-4 hover:underline">{item.title}</Link></li>)}</ul>
          </aside>
        </Container>
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.description,
            serviceType: service.title,
            provider: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url || undefined,
            },
            url: siteConfig.url ? `${siteConfig.url}/services/${slug}` : undefined,
          }}
        />
      </main>
      <Footer />
    </>
  );
}
