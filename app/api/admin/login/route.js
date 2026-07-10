import { NextResponse } from "next/server";
import { readDb } from "../../../lib/db";

// Authenticate an admin against the stored administrators.
// Passwords are checked on the server and are never sent back to the client.
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Cerere invalidă" }, { status: 400 });
  }

  const email = (body?.email || "").trim().toLowerCase();
  const parola = body?.parola ?? "";

  if (!email || !parola) {
    return NextResponse.json(
      { ok: false, error: "Email și parolă sunt obligatorii." },
      { status: 400 }
    );
  }

  const admins = await readDb("utilizatori");
  const user = (admins || []).find(
    (u) => (u.email || "").trim().toLowerCase() === email && u.parola === parola
  );

  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Email sau parolă incorectă." },
      { status: 401 }
    );
  }

  // Return only safe fields — never the password.
  return NextResponse.json({
    ok: true,
    user: { id: user.id, nume: user.nume, email: user.email, rol: user.rol },
  });
}
