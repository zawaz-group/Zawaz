import { NextResponse } from "next/server";

export async function GET(req) {
  const host = req.headers.get("host");
  const webhookUrl = `https://${host}/api/telegram/webhook`;
  const token = process.env.TELEGRAM_BOT_TOKEN;

  const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: webhookUrl }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
