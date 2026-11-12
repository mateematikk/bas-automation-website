import { NextResponse } from "next/server";
import { submitLead, validateLead } from "@/lib/lead";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ ok: false, message: "Недопустиме джерело запиту." }, { status: 403 });
  }
  let body: unknown;
  try {
    const text = await request.text();
    if (new TextEncoder().encode(text).length > 16_384) {
      return NextResponse.json({ ok: false, message: "Запит завеликий." }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, message: "Некоректний запит." }, { status: 400 });
  }
  if (body && typeof body === "object" && "website" in body && body.website) {
    return NextResponse.json({ ok: false, message: "Некоректні дані форми." }, { status: 400 });
  }
  const validated = validateLead(body);
  if (!validated.ok) {
    return NextResponse.json({ ok: false, message: validated.message }, { status: 400 });
  }
  const result = await submitLead(validated.data);
  return NextResponse.json({ ok: result.ok, message: result.message }, {
    status: result.ok ? 200 : result.status,
  });
}
