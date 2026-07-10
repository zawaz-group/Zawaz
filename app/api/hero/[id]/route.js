import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../../lib/db";
import { readSanitizedBody } from "../../../lib/security";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await readSanitizedBody(req);
    const data = await readDb("hero");
    const idx = data.findIndex(i => i.id === id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    data[idx] = { ...data[idx], ...body, id };
    await writeDb("hero", data);
    return NextResponse.json(data[idx]);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const data = await readDb("hero");
    const filtered = data.filter(i => i.id !== id);
    await writeDb("hero", filtered);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
