import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../lib/db";
import { readSanitizedBody } from "../../lib/security";

export async function GET() {
  const data = await readDb("categorii");
  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    const body = await readSanitizedBody(req);
    const categorii = await readDb("categorii");
    categorii.push(body);
    await writeDb("categorii", categorii);
    return NextResponse.json(body, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
