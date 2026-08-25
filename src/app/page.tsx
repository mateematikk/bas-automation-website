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

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <AutomationAreas />
        <Services />
        <Integrations />
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
    </>
  );
}
