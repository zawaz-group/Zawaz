import { NextResponse } from "next/server";
import { getStatusKeyboard, statusLabels } from "../telegramUtils.js";

const token = () => process.env.TELEGRAM_BOT_TOKEN;

async function answerCallback(callbackQueryId, text = "✅") {
  await fetch(`https://api.telegram.org/bot${token()}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callback_query_id: callbackQueryId, text }),
  });
}

async function editMessage(chatId, messageId, text, keyboard) {
  await fetch(`https://api.telegram.org/bot${token()}/editMessageText`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text,
      parse_mode: "HTML",
      reply_markup: keyboard,
    }),
  });
}

export async function POST(req) {
  const body = await req.json();
  const cq = body.callback_query;
  if (!cq) return NextResponse.json({ ok: true });

  const { id: callbackId, message, data } = cq;
  const chatId = message.chat.id;
  const messageId = message.message_id;
  const originalText = message.text || "";

  // set:orderId:status
  if (data.startsWith("set:")) {
    const [, orderId, status] = data.split(":");
    const cleanText = originalText.replace(/\n📌 Status:.*$/m, "");
    const newText = cleanText + `\n📌 Status: ${statusLabels[status]}`;
    await editMessage(chatId, messageId, newText, getStatusKeyboard(orderId, status));
    await answerCallback(callbackId, statusLabels[status]);
    return NextResponse.json({ ok: true });
  }

  // ask:orderId:action:currentStatus — cere confirmare pentru Livrat/Anulat
  if (data.startsWith("ask:")) {
    const [, orderId, action, currentStatus] = data.split(":");
    const actionLabel = action === "livrat" ? "✅ Livrat" : "❌ Anulat";
    const confirmKeyboard = {
      inline_keyboard: [[
        { text: `✅ Da, marchează ${actionLabel}`, callback_data: `confirmed:${orderId}:${action}` },
        { text: "↩️ Înapoi", callback_data: `back:${orderId}:${currentStatus}` },
      ]],
    };
    await editMessage(chatId, messageId, originalText, confirmKeyboard);
    await answerCallback(callbackId, `Confirmă ${actionLabel}?`);
    return NextResponse.json({ ok: true });
  }

  // confirmed:orderId:action — final, ireversibil
  if (data.startsWith("confirmed:")) {
    const [, , action] = data.split(":");
    const emoji = action === "livrat" ? "✅" : "❌";
    const label = action === "livrat" ? "LIVRAT" : "ANULAT";
    const cleanText = originalText.replace(/\n📌 Status:.*$/m, "");
    const newText = cleanText + `\n📌 Status: ${emoji} ${label}`;
    await editMessage(chatId, messageId, newText, { inline_keyboard: [] });
    await answerCallback(callbackId, `${emoji} Marcat ca ${label}`);
    return NextResponse.json({ ok: true });
  }

  // back:orderId:currentStatus
  if (data.startsWith("back:")) {
    const [, orderId, currentStatus] = data.split(":");
    await editMessage(chatId, messageId, originalText, getStatusKeyboard(orderId, currentStatus || "asteptare"));
    await answerCallback(callbackId, "↩️ Înapoi");
    return NextResponse.json({ ok: true });
  }

  await answerCallback(callbackId);
  return NextResponse.json({ ok: true });
}
