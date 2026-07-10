import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../../lib/db";
import { readSanitizedBody } from "../../../lib/security";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await readSanitizedBody(req);
    const produse = await readDb("produse");
    const idx = produse.findIndex(p => p.id === id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    produse[idx] = { ...produse[idx], ...body, id };
    await writeDb("produse", produse);
    return NextResponse.json(produse[idx]);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const produse = await readDb("produse");
    const filtered = produse.filter(p => p.id !== id);
    await writeDb("produse", filtered);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
