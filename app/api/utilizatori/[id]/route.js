import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../../lib/db";
import { readSanitizedBody } from "../../../lib/security";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await readSanitizedBody(req);
    const list = await readDb("utilizatori");
    const idx = list.findIndex(u => u.id === id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    // If the password field is left empty, keep the existing one.
    const { parola, ...rest } = body;
    const merged = { ...list[idx], ...rest, id };
    if (parola) merged.parola = parola;
    list[idx] = merged;
    await writeDb("utilizatori", list);
    const { parola: _, ...safe } = list[idx];
    return NextResponse.json(safe);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const list = await readDb("utilizatori");
    const filtered = list.filter(u => u.id !== id);
    await writeDb("utilizatori", filtered);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
