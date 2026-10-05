/*
 * Trimiterea unui mesaj către botul Telegram al magazinului, prin /api/telegram
 * (același canal pe care vin comenzile și mesajele din pagina de contact).
 * Botul trimite cu parse_mode HTML, deci textul scris de vizitator trebuie
 * escapat înainte să intre într-un mesaj.
 */

export function esc(text) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Întoarce true doar dacă mesajul a ajuns la bot — formularele nu mai
// afișează "trimis" când cererea a eșuat.
export async function trimiteTelegram(mesaj) {
  try {
    const res = await fetch("/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mesaj }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
