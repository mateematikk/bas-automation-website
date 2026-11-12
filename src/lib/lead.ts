export type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  company?: string;
  message: string;
  source?: string;
};

export type LeadResult =
  | { ok: true; message: string }
  | { ok: false; message: string; status: 502 | 503 };

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL?.trim();
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if ((!token || !chatId) && (token || chatId || !webhookUrl)) {
    console.error("[lead]", { event: "delivery_not_configured" });
    return {
      ok: false,
      status: 503,
      message: "Приймання заявок тимчасово недоступне. Спробуйте пізніше або скористайтеся контактами компанії.",
    };
  }

  const deliveries: { channel: string; promise: Promise<void> }[] = [];
  if (token && chatId) {
    deliveries.push({ channel: "telegram", promise: sendTelegram(token, chatId, payload) });
  }
  if (webhookUrl) {
    deliveries.push({ channel: "webhook", promise: sendWebhook(webhookUrl, payload) });
  }
  const results = await Promise.allSettled(deliveries.map((delivery) => delivery.promise));
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      // Fetch errors may contain the bot token. Log only the delivery channel.
      console.error("[lead]", { event: "delivery_failed", channel: deliveries[index].channel });
    }
  });

  // The first delivery is Telegram when configured, otherwise the CRM webhook.
  if (results[0]?.status !== "fulfilled") {
    return {
      ok: false,
      status: 502,
      message: "Не вдалося підтвердити доставку заявки. Спробуйте пізніше або зв’яжіться з нами напряму.",
    };
  }
  return { ok: true, message: "Заявку надіслано до BAS Expert. Ми зв’яжемося з вами для обговорення задачі." };
}

async function sendWebhook(url: string, payload: LeadPayload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, receivedAt: new Date().toISOString() }),
    signal: AbortSignal.timeout(10_000),
    redirect: "error",
  });
  if (!response.ok) throw new Error("Webhook delivery failed");
}

async function sendTelegram(token: string, chatId: string, payload: LeadPayload) {
  const text = [
    "Нова заявка · BAS Expert",
    `Ім’я: ${payload.name}`,
    `Телефон: ${payload.phone}`,
    `Email: ${payload.email}`,
    payload.company ? `Компанія: ${payload.company}` : "",
    payload.source ? `Сторінка: ${payload.source}` : "",
    "",
    "Задача",
    payload.message,
  ].filter(Boolean).join("\n");
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, link_preview_options: { is_disabled: true } }),
    signal: AbortSignal.timeout(10_000),
    redirect: "error",
  });
  if (!response.ok) throw new Error("Telegram delivery failed");
  const result: unknown = await response.json();
  if (!result || typeof result !== "object" || !("ok" in result) || result.ok !== true) {
    throw new Error("Telegram rejected the message");
  }
}

export function validateLead(body: unknown):
  | { ok: true; data: LeadPayload }
  | { ok: false; message: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, message: "Некоректні дані форми." };
  }
  const name = "name" in body && typeof body.name === "string" ? body.name.trim() : "";
  const phone = "phone" in body && typeof body.phone === "string" ? body.phone.trim() : "";
  const email = "email" in body && typeof body.email === "string" ? body.email.trim() : "";
  const company = "company" in body && typeof body.company === "string" ? body.company.trim() : "";
  const message = "message" in body && typeof body.message === "string" ? body.message.trim() : "";
  const source = "source" in body && typeof body.source === "string" ? body.source.trim() : "";

  if (name.length < 2 || name.length > 100) {
    return { ok: false, message: "Вкажіть ім’я від 2 до 100 символів." };
  }
  if (phone.length > 40 || !/^[+\d\s().-]+$/.test(phone) || phone.replace(/\D/g, "").length < 7) {
    return { ok: false, message: "Вкажіть коректний телефон." };
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Вкажіть коректний email." };
  }
  if (message.length < 5 || message.length > 2000) {
    return { ok: false, message: "Опишіть задачу від 5 до 2000 символів." };
  }
  if (company.length > 160 || source.length > 160) {
    return { ok: false, message: "Перевищено допустиму довжину поля." };
  }
  return { ok: true, data: { name, phone, email, company: company || undefined, message, source: source || undefined } };
}
