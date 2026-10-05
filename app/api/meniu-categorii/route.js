import { NextResponse } from "next/server";
import { categoriiSite } from "../../lib/categorii-site";
import { readDb } from "../../lib/db";

// Se schimbă din admin; nu are voie să fie ținut în cache.
export const dynamic = "force-dynamic";

export async function GET() {
  const [produse, optiuni, categorii] = await Promise.all([readDb("produse"), readDb("optiuni"), readDb("categorii")]);
  return NextResponse.json(categoriiSite(produse, optiuni, categorii));
}
