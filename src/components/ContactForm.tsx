"use client";

import { useRef, useState } from "react";
import type { ComponentProps, FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, Phone, Send } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<FormState>({ kind: "idle" });
  const submitting = useRef(false);
  const feedbackRef = useRef<HTMLParagraphElement>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    const form = event.currentTarget;
    const values = new FormData(form);
    setState({ kind: "loading" });
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.get("name"),
          phone: values.get("phone"),
          email: values.get("email"),
          company: values.get("company"),
          message: values.get("message"),
          website: values.get("website"),
          source: window.location.pathname.slice(0, 160),
        }),
        signal: AbortSignal.timeout(15_000),
      });
      const data: unknown = await response.json();
      if (!data || typeof data !== "object" || !("ok" in data) || !("message" in data) || typeof data.message !== "string") {
        throw new Error("Unexpected response");
      }
      if (!response.ok || data.ok !== true) {
        setState({ kind: "error", message: data.message });
        feedbackRef.current?.focus();
        return;
      }
      setState({ kind: "success", message: data.message });
      form.reset();
    } catch {
      setState({ kind: "error", message: "Не вдалося підтвердити відправлення. Перевірте з’єднання або зв’яжіться з нами через контакти компанії." });
      feedbackRef.current?.focus();
    } finally {
      submitting.current = false;
    }
  }

  return (
    <Section id="contacts" eyebrow="Контакти BAS Expert" title="Обговорімо вашу задачу" description="Розкажіть про облікову систему, інтеграцію або процес, який хочете автоматизувати. Підготуємо наступні кроки.">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={onSubmit} aria-busy={state.kind === "loading"} className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Ім’я" name="name" required minLength={2} maxLength={100} autoComplete="name" />
            <Field label="Телефон" name="phone" type="tel" inputMode="tel" required minLength={7} maxLength={40} autoComplete="tel" placeholder="+380…" />
            <Field label="Email" name="email" type="email" required maxLength={254} autoComplete="email" spellCheck={false} className="sm:col-span-2" />
            <Field label="Назва компанії" name="company" maxLength={160} autoComplete="organization" className="sm:col-span-2" />
            <div className="sm:col-span-2">
              <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-graphite">Опишіть задачу <span className="text-accent">*</span></label>
              <textarea id="contact-message" name="message" required minLength={5} maxLength={2000} rows={5} className={inputClass} placeholder="Наприклад, інтегрувати BAS з інтернет-магазином або створити ШІ-агента…" />
            </div>
          </div>
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">Надсилаючи заявку, ви погоджуєтеся на обробку зазначених даних BAS Expert для відповіді на ваше звернення.</p>
          <Button type="submit" size="lg" className="mt-6" disabled={state.kind === "loading"}>
            {state.kind === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden />Надсилаємо…</> : <>Надіслати заявку<Send className="h-4 w-4" aria-hidden /></>}
          </Button>
          <p ref={feedbackRef} tabIndex={-1} role="status" aria-live="polite" aria-atomic="true" className={cn("mt-4 flex items-start gap-2 text-sm leading-relaxed", state.kind === "success" ? "text-success" : "text-danger")}>
            {state.kind === "success" && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />}
            {(state.kind === "success" || state.kind === "error") && state.message}
          </p>
        </form>
        <aside className="flex flex-col gap-4">
          {siteConfig.contacts.telegram && <ContactCard title="Telegram" value={siteConfig.contacts.telegramLabel} href={siteConfig.contacts.telegram} icon={<Send className="h-5 w-5" aria-hidden />} />}
          {siteConfig.contacts.email && <ContactCard title="Email" value={siteConfig.contacts.email} href={`mailto:${siteConfig.contacts.email}`} icon={<Mail className="h-5 w-5" aria-hidden />} />}
          {siteConfig.contacts.phone && <ContactCard title="Телефон" value={siteConfig.contacts.phone} href={siteConfig.contacts.phoneHref || `tel:${siteConfig.contacts.phone.replace(/[^+\d]/g, "")}`} icon={<Phone className="h-5 w-5" aria-hidden />} />}
          <div className="rounded-2xl border border-border bg-accent-soft/40 p-6">
            <h3 className="text-lg font-semibold text-navy">Що допоможе оцінити задачу</h3>
            <ul className="mt-4 list-disc space-y-3 pl-4 text-sm leading-relaxed text-muted">
              <li>Назва та версія вашої BAS або іншої облікової системи.</li>
              <li>Процес, який забирає найбільше часу команди.</li>
              <li>Сервіси, які потрібно з’єднати, та очікуваний результат.</li>
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}

const inputClass = "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-navy shadow-sm transition-colors placeholder:text-slate-500 hover:border-slate-400 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-ring/40";

function Field({ label, className, ...props }: ComponentProps<"input"> & { label: string; name: string }) {
  return (
    <div className={className}>
      <label htmlFor={`contact-${props.name}`} className="mb-1.5 block text-sm font-medium text-graphite">{label}{props.required && <span className="text-accent"> *</span>}</label>
      <input {...props} id={`contact-${props.name}`} className={inputClass} />
    </div>
  );
}

function ContactCard({ title, value, href, icon }: { title: string; value: string; href: string; icon: React.ReactNode }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="rounded-2xl border border-border bg-white p-5 shadow-sm transition-colors hover:border-accent">
      <div className="mb-2 flex items-center gap-2 text-sm text-muted">{icon}{title}</div>
      <p className="break-words font-semibold text-navy">{value}</p>
    </a>
  );
}
