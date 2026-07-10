import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../lib/db";
import { readSanitizedBody } from "../../lib/security";

export async function GET() {
  const data = await readDb("blog");
  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    const body = await readSanitizedBody(req);
    const data = await readDb("blog");
    const slug = body.slug || (body.titlu || "articol-" + Date.now())
      .toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const newItem = { ...body, slug };
    const filtered = data.filter(i => i.slug !== slug);
    filtered.push(newItem);
    await writeDb("blog", filtered);
    return NextResponse.json(newItem);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
