import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../lib/db";
import { readSanitizedBody } from "../../lib/security";

export async function GET() {
  const data = await readDb("faq");
  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    const body = await readSanitizedBody(req);
    const data = await readDb("faq");
    const item = { ...body, id: body.id || `faq${Date.now()}` };
    data.push(item);
    await writeDb("faq", data);
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
