import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET() {
  const { blobs } = await list({
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  const urls = blobs.map(b => b.url);
  return NextResponse.json(urls);
}
