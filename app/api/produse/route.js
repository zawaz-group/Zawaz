import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../lib/db";
import { readSanitizedBody } from "../../lib/security";

export async function GET() {
  const data = await readDb("produse");
  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    const body = await readSanitizedBody(req);
    const produse = await readDb("produse");
    const nou = { ...body, id: body.id || Date.now().toString() };
    produse.push(nou);
    await writeDb("produse", produse);
    return NextResponse.json(nou, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
