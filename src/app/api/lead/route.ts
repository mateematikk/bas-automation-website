import { NextResponse } from "next/server";
import { submitLead, validateLead } from "@/lib/lead";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Некоректний запит." },
      { status: 400 },
    );
  }

  const validated = validateLead(body);
  if (!validated.ok) {
    return NextResponse.json(
      { ok: false, message: validated.message },
      { status: 400 },
    );
  }

  const result = await submitLead(validated.data);

  return NextResponse.json(result, {
    status: result.ok ? 200 : 502,
  });
}
