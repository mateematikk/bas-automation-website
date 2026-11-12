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

class DeliveryError extends Error {
  constructor(
    reason: string,
    readonly upstreamStatus: number,
  ) {
    super(reason);
  }
}

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
      const error: unknown = result.reason;
      // Only our fixed error codes are logged. Native fetch errors can contain
      // the bot token or other credentials in their URL and message.
      let reason = "network_error";
      if (error instanceof DeliveryError) reason = error.message;
      else if (error instanceof Error && error.name === "TimeoutError") reason = "timeout";
      console.error("[lead]", {
        event: "delivery_failed",
        channel: deliveries[index].channel,
        reason,
        upstreamStatus: error instanceof DeliveryError ? error.upstreamStatus : undefined,
      });
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
  if (!response.ok) throw new DeliveryError("webhook_rejected", response.status);
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
  const result: unknown = await response.json().catch(() => null);
  if (response.ok && result && typeof result === "object" && "ok" in result && result.ok === true) return;

  const description = result && typeof result === "object" && "description" in result && typeof result.description === "string"
    ? result.description.toLowerCase()
    : "";
  let reason = "telegram_rejected";
  if (response.status === 401) reason = "invalid_bot_token";
  else if (description.includes("chat not found")) reason = "chat_not_found";
  else if (description.includes("bot was blocked")) reason = "bot_blocked";
  else if (response.status === 403) reason = "chat_access_denied";
  else if (response.status === 429) reason = "rate_limited";
  throw new DeliveryError(reason, response.status);
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
