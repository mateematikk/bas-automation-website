import { Bot, FileText, MessagesSquare, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";

const scenarios = [
  { icon: MessagesSquare, title: "Звернення клієнтів", text: "Агент збирає дані, уточнює запит і передає заявку менеджеру в CRM або Telegram." },
  { icon: FileText, title: "Документи й дані", text: "Витягує реквізити, готує дані для BAS і передає результат співробітнику на перевірку." },
  { icon: Bot, title: "Помічник команди", text: "Знаходить відповіді в інструкціях компанії та допомагає працювати з внутрішньою базою знань." },
];

export function AIAgents() {
  return (
    <Section id="ai-agents" className="bg-navy text-white" tone="dark" eyebrow="Штучний інтелект у бізнес-процесах" title="ШІ-агенти, підключені до ваших систем" description="Розробляємо агентів під конкретні задачі. Поєднуємо мовні моделі, дані компанії та API BAS, CRM і месенджерів.">
      <div className="grid gap-5 md:grid-cols-3">
        {scenarios.map((item) => (
          <article key={item.title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
            <item.icon className="mb-5 h-7 w-7 text-sky-300" aria-hidden />
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.text}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <p className="max-w-xl text-sm leading-relaxed text-slate-300">Починаємо з пілотного сценарію. Узгоджуємо права доступу, перевірку результатів і дії, що потребують підтвердження людини.</p>
        <Link href="/services/ai-agents" className="inline-flex shrink-0 items-center gap-2 font-semibold text-sky-300 hover:text-white">Детальніше про ШІ-агентів <ArrowUpRight className="h-4 w-4" aria-hidden /></Link>
      </div>
    </Section>
  );
}
