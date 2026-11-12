import { afterEach, test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const source = await readFile(new URL("../src/lib/lead.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { submitLead, validateLead } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
const keys = ["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID", "LEAD_WEBHOOK_URL"];
const originalEnv = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
const originalFetch = globalThis.fetch;
const lead = { name: "Тест", phone: "+380501234567", email: "test@example.com", company: "BAS Expert", message: "Тестове звернення", source: "/" };

function configure(values = {}) {
  keys.forEach((key) => delete process.env[key]);
  Object.assign(process.env, values);
}

afterEach(() => {
  globalThis.fetch = originalFetch;
  keys.forEach((key) => {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  });
});

test("an unconfigured site returns 503 and never claims delivery", async () => {
  configure();
  globalThis.fetch = () => { throw new Error("Unexpected network call"); };
  const result = await submitLead(lead);
  assert.equal(result.ok, false);
  assert.equal(result.status, 503);
});

test("partial Telegram configuration is rejected even with a CRM", async () => {
  configure({ TELEGRAM_BOT_TOKEN: "test-token", LEAD_WEBHOOK_URL: "https://crm.example.test/leads" });
  const result = await submitLead(lead);
  assert.equal(result.ok, false);
  assert.equal(result.status, 503);
});

test("Telegram receives all contact fields as plain text", async () => {
  configure({ TELEGRAM_BOT_TOKEN: "test-token", TELEGRAM_CHAT_ID: "123" });
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "https://api.telegram.org/bottest-token/sendMessage");
    const body = JSON.parse(options.body);
    assert.equal(body.chat_id, "123");
    assert.equal(body.parse_mode, undefined);
    for (const value of Object.values(lead)) assert.ok(body.text.includes(value));
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json({ ok: true });
  };
  assert.equal((await submitLead(lead)).ok, true);
});

test("Telegram API rejection inside HTTP 200 returns a delivery error", async () => {
  configure({ TELEGRAM_BOT_TOKEN: "test-token", TELEGRAM_CHAT_ID: "123" });
  globalThis.fetch = async () => Response.json({ ok: false });
  assert.equal((await submitLead(lead)).status, 502);
});

test("network timeout returns a delivery error", async () => {
  configure({ TELEGRAM_BOT_TOKEN: "test-token", TELEGRAM_CHAT_ID: "123" });
  globalThis.fetch = async () => { throw new DOMException("Timeout", "TimeoutError"); };
  assert.equal((await submitLead(lead)).status, 502);
});

test("a CRM failure preserves successful primary Telegram delivery", async () => {
  configure({ TELEGRAM_BOT_TOKEN: "test-token", TELEGRAM_CHAT_ID: "123", LEAD_WEBHOOK_URL: "https://crm.example.test/leads" });
  globalThis.fetch = async (url) => url.includes("api.telegram.org") ? Response.json({ ok: true }) : new Response("", { status: 500 });
  assert.equal((await submitLead(lead)).ok, true);
});

test("a successful CRM does not hide a failed Telegram delivery", async () => {
  configure({ TELEGRAM_BOT_TOKEN: "test-token", TELEGRAM_CHAT_ID: "123", LEAD_WEBHOOK_URL: "https://crm.example.test/leads" });
  globalThis.fetch = async (url) => new Response("", { status: url.includes("api.telegram.org") ? 403 : 200 });
  assert.equal((await submitLead(lead)).status, 502);
});

test("webhook-only delivery remains supported", async () => {
  configure({ LEAD_WEBHOOK_URL: "https://crm.example.test/leads" });
  globalThis.fetch = async (_url, options) => {
    assert.equal(JSON.parse(options.body).email, lead.email);
    return new Response("", { status: 200 });
  };
  assert.equal((await submitLead(lead)).ok, true);
});

test("validation rejects malformed, missing and oversized fields", () => {
  for (const body of [null, [], {}, { ...lead, name: {} }, { ...lead, phone: "not-a-phone" }, { ...lead, email: "invalid" }, { ...lead, name: "a".repeat(101) }, { ...lead, message: "a".repeat(2001) }, { ...lead, company: "a".repeat(161) }]) {
    assert.equal(validateLead(body).ok, false);
  }
  assert.equal(validateLead({ ...lead, name: "  Тест  " }).data.name, "Тест");
});

test("maximum valid fields fit within Telegram's 4096-character message limit", async () => {
  configure({ TELEGRAM_BOT_TOKEN: "test-token", TELEGRAM_CHAT_ID: "123" });
  const maximum = { name: "Я".repeat(100), phone: "1".repeat(40), email: `${"a".repeat(249)}@a.co`, company: "Я".repeat(160), source: "/".repeat(160), message: "Я".repeat(2000) };
  assert.equal(validateLead(maximum).ok, true);
  globalThis.fetch = async (_url, options) => {
    assert.ok(JSON.parse(options.body).text.length <= 4096);
    return Response.json({ ok: true });
  };
  assert.equal((await submitLead(maximum)).ok, true);
});
