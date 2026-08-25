export type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  company?: string;
  message: string;
  source?: string;
};

export type LeadResult = {
  ok: boolean;
  message: string;
};

/**
 * Abstraction layer для відправки заявок.
 * Підключіть Telegram / Email / CRM / Webhook через env — без зміни форми.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  const deliveries: Promise<void>[] = [];

  if (webhookUrl) {
    deliveries.push(sendWebhook(webhookUrl, payload));
  }

  if (telegramToken && telegramChatId) {
    deliveries.push(sendTelegram(telegramToken, telegramChatId, payload));
  }

  // Якщо канал не налаштовано — заявка все одно «приймається»
  // (лог у сервері для локальної розробки / подальшої інтеграції).
  if (deliveries.length === 0) {
    console.info("[lead] Отримано заявку (канали доставки не налаштовані):", {
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      company: payload.company,
      source: payload.source,
    });
    return {
      ok: true,
      message: "Заявку прийнято. Ми зв'яжемося з вами найближчим часом.",
    };
  }

  try {
    await Promise.all(deliveries);
    return {
      ok: true,
      message: "Заявку надіслано. Ми зв'яжемося з вами найближчим часом.",
    };
  } catch (error) {
    console.error("[lead] Помилка доставки:", error);
    return {
      ok: false,
      message: "Не вдалося надіслати заявку. Спробуйте ще раз або напишіть нам напряму.",
    };
  }
}

async function sendWebhook(url: string, payload: LeadPayload) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      receivedAt: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    throw new Error(`Webhook failed: ${res.status}`);
  }
}

async function sendTelegram(
  token: string,
  chatId: string,
  payload: LeadPayload,
) {
  const text = [
    "🆕 Нова заявка з сайту",
    "",
    `Ім'я: ${payload.name}`,
    `Телефон: ${payload.phone}`,
    `Email: ${payload.email}`,
    payload.company ? `Компанія: ${payload.company}` : null,
    payload.source ? `Джерело: ${payload.source}` : null,
    "",
    "Задача:",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Telegram failed: ${res.status}`);
  }
}

export function validateLead(body: unknown): {
  ok: true;
  data: LeadPayload;
} | {
  ok: false;
  message: string;
} {
  if (!body || typeof body !== "object") {
    return { ok: false, message: "Некоректні дані форми." };
  }

  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const email = String(data.email ?? "").trim();
  const company = String(data.company ?? "").trim();
  const message = String(data.message ?? "").trim();
  const source = String(data.source ?? "").trim();

  if (name.length < 2) {
    return { ok: false, message: "Вкажіть ім'я." };
  }
  if (phone.length < 7) {
    return { ok: false, message: "Вкажіть коректний телефон." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Вкажіть коректний email." };
  }
  if (message.length < 5) {
    return { ok: false, message: "Коротко опишіть задачу." };
  }

  return {
    ok: true,
    data: {
      name,
      phone,
      email,
      company: company || undefined,
      message,
      source: source || undefined,
    },
  };
}
