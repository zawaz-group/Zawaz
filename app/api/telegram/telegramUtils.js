export function getStatusKeyboard(orderId, currentStatus = "asteptare") {
  const statuses = [
    { id: "contactat", label: "📞 Contactat" },
    { id: "gandeste", label: "🤔 Se gândește" },
    { id: "pregatire", label: "🔨 În pregătire" },
    { id: "livrare", label: "🚚 Spre livrare" },
  ];
  return {
    inline_keyboard: [
      statuses.slice(0, 2).map(s => ({
        text: s.id === currentStatus ? `☑️ ${s.label}` : s.label,
        callback_data: `set:${orderId}:${s.id}`,
      })),
      statuses.slice(2).map(s => ({
        text: s.id === currentStatus ? `☑️ ${s.label}` : s.label,
        callback_data: `set:${orderId}:${s.id}`,
      })),
      [
        { text: "✅ Livrat", callback_data: `ask:${orderId}:livrat:${currentStatus}` },
        { text: "❌ Anulat", callback_data: `ask:${orderId}:anulat:${currentStatus}` },
      ],
    ],
  };
}

export const statusLabels = {
  asteptare: "⏳ În așteptare",
  contactat: "📞 Contactat",
  gandeste: "🤔 Se gândește",
  pregatire: "🔨 În pregătire",
  livrare: "🚚 Spre livrare",
  livrat: "✅ LIVRAT",
  anulat: "❌ ANULAT",
};
