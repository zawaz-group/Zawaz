"use client";

import { useState } from "react";
import { esc, trimiteTelegram } from "../lib/telegram-client";
import { ArrowRight, Crown } from "./icons";

const produse = ["Pușculiță", "Decor", "Stativ telefon", "Altceva"];

const label = "mb-1.5 block text-[0.75rem] font-semibold text-white/80 lg:mb-[0.4vw] lg:text-[max(10px,0.72vw)]";

/** Formularul „model personalizat”: cererea ajunge la magazin pe Telegram, ca mesajele din pagina de contact. */
export default function CustomOrder() {
  const [produs, setProdus] = useState(produse[0]);
  const [stare, setStare] = useState("idle"); // idle | sending | sent | error

  const trimite = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const design = String(data.get("design") ?? "").trim();

    setStare("sending");
    const ok = await trimiteTelegram(
      [
        "🎨 <b>Cerere de model personalizat</b>",
        `👤 <b>Nume:</b> ${esc(data.get("name"))}`,
        `📞 <b>Contact:</b> ${esc(data.get("contact"))}`,
        `📦 <b>Produs:</b> ${esc(produs)}`,
        design ? `💬 <b>Design dorit:</b> ${esc(design)}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );
    setStare(ok ? "sent" : "error");
    if (ok) form.reset();
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gold/25 bg-forest-950/70 p-5 shadow-[0_0_1.5rem_rgba(31,106,54,0.3)] backdrop-blur-sm lg:rounded-[1.1vw] lg:p-[2vw]">
      <div aria-hidden className="pointer-events-none absolute -right-[10%] -top-[30%] h-[70%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(244,200,74,0.18),transparent)]" />
      <div className="relative flex items-start gap-3">
        <h2 className="font-display text-[max(30px,2.7vw)] font-extrabold italic uppercase leading-[0.95] text-white">
          Vrei un model <span className="gold-text">personalizat?</span>
        </h2>
        <Crown className="h-[max(1.5rem,2.2vw)] w-[max(1.75rem,2.5vw)] shrink-0 -translate-y-1 rotate-6" />
      </div>
      <p className="relative mt-3 max-w-[34rem] text-[0.875rem] leading-relaxed text-white/80 lg:mt-[0.9vw] lg:text-[max(12px,0.9vw)]">
        Spune-ne ce produs vrei și cum să arate. Transformăm ideea ta într-un model unic, făcut doar pentru tine.
      </p>

      <form onSubmit={trimite} className="relative mt-5 space-y-4 lg:mt-[1.4vw] lg:space-y-[1.1vw]">
        <fieldset>
          <legend className={label}>Ce produs dorești?</legend>
          <div className="flex flex-wrap gap-2 lg:gap-[0.6vw]">
            {produse.map((p) => (
              <label key={p} className="cursor-pointer">
                <input type="radio" name="product" value={p} checked={produs === p} onChange={() => setProdus(p)} className="peer sr-only" />
                <span className="block rounded-full border border-gold/30 bg-black/40 px-4 py-2 text-[0.8125rem] font-semibold text-white transition hover:border-gold/70 peer-checked:border-gold-bright peer-checked:bg-gradient-to-b peer-checked:from-[#ffd868] peer-checked:to-[#e3a92a] peer-checked:text-forest-950 peer-focus-visible:outline-2 peer-focus-visible:outline-gold-bright lg:px-[1.1vw] lg:py-[0.5vw] lg:text-[max(11px,0.8vw)]">
                  {p}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="co-design" className={label}>
            Ce design vrei? <span className="font-normal text-white/50">(opțional)</span>
          </label>
          <textarea
            id="co-design"
            name="design"
            rows={4}
            placeholder="Ex.: mașina mea preferată, portretul unui prieten, logo-ul firmei, o temă din jocul tău favorit…"
            className="field resize-y lg:text-[max(12px,0.85vw)]"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-[1.1vw]">
          <div>
            <label htmlFor="co-name" className={label}>
              Numele tău
            </label>
            <input id="co-name" name="name" required autoComplete="name" placeholder="Ion Popescu" className="field lg:text-[max(12px,0.85vw)]" />
          </div>
          <div>
            <label htmlFor="co-contact" className={label}>
              Telefon sau email
            </label>
            <input id="co-contact" name="contact" required autoComplete="tel" placeholder="+373 …" className="field lg:text-[max(12px,0.85vw)]" />
          </div>
        </div>

        <button
          type="submit"
          disabled={stare === "sending"}
          className="btn-gold h-12 gap-3 px-7 text-[0.9375rem] lg:h-[3vw] lg:px-[2vw] lg:text-[max(12px,0.95vw)]"
        >
          {stare === "sending" ? "Se trimite…" : "Trimite"}
          <ArrowRight className="h-[1.2em] w-[1.2em]" />
        </button>

        <p role="status" className={`text-[0.8125rem] font-semibold lg:text-[max(11px,0.8vw)] ${stare === "error" ? "text-[#ff7a6e]" : "text-gold-bright"}`}>
          {stare === "sent" && "Mulțumim! Am primit cererea și te contactăm în curând."}
          {stare === "error" && "Cererea nu a putut fi trimisă. Încearcă din nou sau scrie-ne pe WhatsApp."}
        </p>
      </form>
    </div>
  );
}
