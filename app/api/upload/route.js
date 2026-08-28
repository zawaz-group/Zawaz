import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

const MAX_BYTES = 10 * 1024 * 1024; // 10MB — o poza facuta cu telefonul poate depasi usor limita implicita a Vercel Blob

export async function POST(req) {
  // Orice eroare de-a lungul acestei rute trebuie sa se intoarca tot ca JSON:
  // fara try/catch, o exceptie (token lipsa, fisier prea mare, retea) lasa
  // raspunsul gol, iar `res.json()` din admin pica cu "Unexpected end of
  // JSON input" in loc de un mesaj clar pentru utilizator.
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) return NextResponse.json({ error: "Niciun fișier trimis." }, { status: 400 });

    if (typeof file.size === "number" && file.size > MAX_BYTES) {
      return NextResponse.json({ error: `Fișierul e prea mare (max ${MAX_BYTES / 1024 / 1024}MB).` }, { status: 413 });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: "Stocarea imaginilor nu este configurată (BLOB_READ_WRITE_TOKEN lipsă)." }, { status: 500 });
    }

    const filename = file.name.replace(/\s+/g, "_");
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error("[api/upload]", err);
    // Corpul cererii a depasit limita de buffer si a fost trunchiat, asa ca
    // multipart-ul a ramas fara boundary-ul de final. Nu e o eroare interna
    // oarecare: singura cauza practica e un fisier prea mare.
    const trunchiat = /FormData|boundary/i.test(err?.message || "");
    return trunchiat
      ? NextResponse.json({ error: "Fișierul e prea mare pentru a fi încărcat. Folosește o imagine mai mică." }, { status: 413 })
      : NextResponse.json({ error: "Încărcarea a eșuat. Încearcă din nou." }, { status: 500 });
  }
}
