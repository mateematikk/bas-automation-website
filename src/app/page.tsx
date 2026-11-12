import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AutomationAreas } from "@/components/AutomationAreas";
import { Services } from "@/components/Services";
import { Integrations } from "@/components/Integrations";
import { Problems } from "@/components/Problems";
import { Process } from "@/components/Process";
import { Advantages } from "@/components/Advantages";
import { Industries } from "@/components/Industries";
import { Cases } from "@/components/Cases";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { AIAgents } from "@/components/AIAgents";
import { StructuredData } from "@/components/StructuredData";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

export const metadata = {
  ...pageMetadata({ title: "Автоматизація бізнесу на BAS та ШІ-агенти", description: siteConfig.description, path: "/" }),
  title: { absolute: "BAS Expert — автоматизація бізнесу на BAS та ШІ-агенти" },
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <Services />
        <AIAgents />
        <Integrations />
        <AutomationAreas />
        <Problems />
        <Process />
        <Advantages />
        <Industries />
        <Cases />
        <CTA />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.url || undefined,
          email: siteConfig.contacts.email || undefined,
          telephone: siteConfig.contacts.phone || undefined,
          sameAs: siteConfig.contacts.telegram ? [siteConfig.contacts.telegram] : undefined,
          knowsAbout: ["BAS", "Автоматизація бізнесу", "Програмування 1С", "ШІ-агенти", "Інтеграції облікових систем"],
        }}
      />
    </>
  );
}
