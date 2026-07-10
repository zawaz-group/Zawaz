import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../../lib/db";
import { readSanitizedBody } from "../../../lib/security";

export async function PUT(req, { params }) {
  try {
    const { slug } = await params;
    const body = await readSanitizedBody(req);
    const categorii = await readDb("categorii");
    const idx = categorii.findIndex(c => c.slug === slug);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    categorii[idx] = { ...categorii[idx], ...body, slug };
    await writeDb("categorii", categorii);
    return NextResponse.json(categorii[idx]);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { slug } = await params;
    const categorii = await readDb("categorii");
    const filtered = categorii.filter(c => c.slug !== slug);
    await writeDb("categorii", filtered);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
