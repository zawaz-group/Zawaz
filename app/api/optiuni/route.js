import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../lib/db";
import { readSanitizedBody } from "../../lib/security";

export async function GET() {
  const data = await readDb("optiuni");
  return NextResponse.json(data);
}

export async function PUT(req) {
  try {
    const body = await readSanitizedBody(req);
    await writeDb("optiuni", body);
    return NextResponse.json(body);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
