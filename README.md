# Інтегра — сайт автоматизації бізнесу на BAS

Сучасний корпоративний лендинг для компанії, яка впроваджує BAS, будує інтеграції та супроводжує бізнес-системи.

## Стек

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Lucide Icons

## Запуск локально

```bash
npm install
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000).

## Збірка

```bash
npm run build
npm start
```

## Environment variables

Скопіюйте `.env.example` у `.env.local` і заповніть значення:

| Змінна | Призначення |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical / SEO URL сайту |
| `NEXT_PUBLIC_CONTACT_PHONE` | Телефон (відображення) |
| `NEXT_PUBLIC_CONTACT_PHONE_HREF` | `tel:` посилання |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email |
| `NEXT_PUBLIC_CONTACT_TELEGRAM` | Посилання на Telegram |
| `NEXT_PUBLIC_CONTACT_TELEGRAM_LABEL` | Підпис Telegram |
| `LEAD_WEBHOOK_URL` | Webhook / CRM endpoint для заявок |
| `TELEGRAM_BOT_TOKEN` | Токен Telegram-бота |
| `TELEGRAM_CHAT_ID` | Chat ID для заявок |

Без каналів доставки форма все одно працює: заявки логуються на сервері.

## Деплой на Vercel

1. Завантажте репозиторій на GitHub.
2. Імпортуйте проєкт у [Vercel](https://vercel.com).
3. Додайте environment variables.
4. Deploy.

## Структура

- `src/app` — layout, homepage, SEO, API
- `src/components` — секції лендингу
- `src/components/ui` — UI-примітиви
- `src/lib` — config, lead abstraction, utils
