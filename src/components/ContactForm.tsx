"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Mail, Phone, Send } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

const initial = {
  name: "",
  phone: "",
  email: "",
  company: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState(initial);
  const [state, setState] = useState<FormState>("idle");
  const [feedback, setFeedback] = useState("");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          source: "contact-form",
        }),
      });
      const data = (await res.json()) as { ok: boolean; message: string };

      if (!res.ok || !data.ok) {
        setState("error");
        setFeedback(data.message || "Не вдалося надіслати заявку.");
        return;
      }

      setState("success");
      setFeedback(data.message);
      setValues(initial);
    } catch {
      setState("error");
      setFeedback("Помилка мережі. Спробуйте ще раз.");
    }
  };

  return (
    <Section
      id="contacts"
      eyebrow="Контакти"
      title="Залиште заявку на консультацію"
      description="Опишіть задачу своїми словами — ми повернемось із уточненнями та пропозицією наступних кроків."
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8"
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Ім'я"
              name="name"
              value={values.name}
              onChange={onChange}
              required
              autoComplete="name"
            />
            <Field
              label="Телефон"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={onChange}
              required
              autoComplete="tel"
              placeholder="+380..."
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={onChange}
              required
              autoComplete="email"
              className="sm:col-span-2"
            />
            <Field
              label="Назва компанії"
              name="company"
              value={values.company}
              onChange={onChange}
              autoComplete="organization"
              className="sm:col-span-2"
            />
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-graphite"
              >
                Опишіть задачу <span className="text-accent">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={values.message}
                onChange={onChange}
                className={inputClass}
                placeholder="Наприклад: потрібно інтегрувати інтернет-магазин із BAS і Новою поштою..."
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button type="submit" size="lg" disabled={state === "loading"}>
              {state === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Надсилаємо...
                </>
              ) : (
                <>
                  Надіслати заявку
                  <Send className="h-4 w-4" aria-hidden />
                </>
              )}
            </Button>
            {feedback && (
              <p
                role="status"
                className={cn(
                  "flex items-start gap-2 text-sm",
                  state === "success" ? "text-success" : "text-danger",
                )}
              >
                {state === "success" && (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                )}
                {feedback}
              </p>
            )}
          </div>
        </form>

        <aside className="flex flex-col gap-4">
          <ContactCard
            title="Telegram"
            value={siteConfig.contacts.telegramLabel}
            href={siteConfig.contacts.telegram}
          />
          <ContactCard
            title="Email"
            value={siteConfig.contacts.email}
            href={`mailto:${siteConfig.contacts.email}`}
            icon={<Mail className="h-5 w-5" aria-hidden />}
          />
          <ContactCard
            title="Телефон"
            value={siteConfig.contacts.phone}
            href={siteConfig.contacts.phoneHref}
            icon={<Phone className="h-5 w-5" aria-hidden />}
          />
          <p className="rounded-2xl border border-border bg-accent-soft/40 p-4 text-sm leading-relaxed text-muted">
            Зазвичай відповідаємо протягом робочого дня. Якщо задача термінова —
            напишіть у Telegram або зателефонуйте.
          </p>
        </aside>
      </div>
    </Section>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-navy shadow-sm transition-colors placeholder:text-slate-400 hover:border-slate-300 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-ring/40";

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-graphite"
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

function ContactCard({
  title,
  value,
  href,
  icon,
}: {
  title: string;
  value: string;
  href: string;
  icon?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group rounded-2xl border border-border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
    >
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted">
        {icon}
        {title}
      </div>
      <p className="text-base font-semibold text-navy group-hover:text-accent">
        {value}
      </p>
    </a>
  );
}
