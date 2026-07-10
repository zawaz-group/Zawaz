import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const filename = file.name.replace(/\s+/g, "_");
  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: true,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return NextResponse.json({ url: blob.url });
}
