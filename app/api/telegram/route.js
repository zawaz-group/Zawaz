import { NextResponse } from "next/server";
import { getStatusKeyboard } from "./telegramUtils.js";

export { getStatusKeyboard };

export async function POST(req) {
  const body = await req.json();
  const { mesaj, orderId } = body;

  if (!mesaj) return NextResponse.json({ error: "No message" }, { status: 400 });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: mesaj,
      parse_mode: "HTML",
      reply_markup: orderId ? getStatusKeyboard(orderId) : undefined,
    }),
  });

  const data = await res.json();
  if (!data.ok) return NextResponse.json({ error: data.description }, { status: 500 });
  return NextResponse.json({ ok: true });
}
