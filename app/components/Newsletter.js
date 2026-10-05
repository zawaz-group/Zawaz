"use client";

import { useState } from "react";
import { esc, trimiteTelegram } from "../lib/telegram-client";
import { ArrowRight, Crown, Mail } from "./icons";

export default function Newsletter() {
  const [stare, setStare] = useState("idle"); // idle | sending | sent | error

  const trimite = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    if (!email) return;
    setStare("sending");
    const ok = await trimiteTelegram(`📬 <b>Abonare nouă la newsletter</b>\n📧 ${esc(email)}`);
    setStare(ok ? "sent" : "error");
    if (ok) form.reset();
  };

  return (
    <section aria-labelledby="newsletter-title" className="relative border-y border-gold/30 lg:h-[15.8vw]">
      <div className="mx-5 flex flex-col gap-8 py-10 lg:mx-0 lg:block lg:py-0">
        {/* titlu */}
        <div className="lg:absolute lg:left-[5.2vw] lg:top-[2vw]">
          <h2
            id="newsletter-title"
            className="relative inline-block -rotate-3 font-display text-[max(36px,4.3vw)] font-extrabold italic uppercase leading-[0.92] text-white drop-shadow-[0_0.375rem_1.125rem_rgba(0,0,0,0.6)]"
          >
            <span className="block">Fii primul</span>
            <span className="block lg:ml-[1.3vw]">
              care <span className="gold-text">află!</span>
            </span>
            <Crown className="absolute -top-[1.2vw] left-[100%] ml-[0.3vw] hidden h-[2.8vw] w-[3.2vw] rotate-6 lg:block" />
          </h2>
          <p className="mt-3 max-w-[30rem] text-[0.9375rem] leading-snug text-white/90 lg:mt-[1.1vw] lg:max-w-[26vw] lg:text-[max(13px,1.1vw)]">
            Abonează-te la noutăți și primești informații despre modele noi, oferte speciale și idei creative.
          </p>
        </div>

        {/* formular */}
        <form onSubmit={trimite} className="lg:absolute lg:left-[32.6vw] lg:top-[5.9vw] lg:w-[35.4vw]">
          <div className="flex h-14 overflow-hidden rounded-xl border border-gold/50 bg-black/55 backdrop-blur-sm transition focus-within:border-gold-bright focus-within:shadow-[0_0_1rem_rgba(31,106,54,0.7)] lg:h-[3.4vw] lg:rounded-[0.7vw]">
            <label className="flex flex-1 items-center gap-3 pl-4 lg:gap-[0.9vw] lg:pl-[1.3vw]">
              <Mail className="h-6 w-6 shrink-0 text-white lg:h-[1.5vw] lg:w-[1.5vw]" />
              <span className="sr-only">Adresa de email</span>
              <input
                type="email"
                name="email"
                required
                placeholder="Introdu adresa ta de email..."
                className="w-full min-w-0 bg-transparent text-[0.875rem] text-white outline-none placeholder:text-white/65 lg:text-[max(12px,0.82vw)]"
              />
            </label>
            <button
              type="submit"
              disabled={stare === "sending"}
              className="flex shrink-0 items-center gap-3 bg-gradient-to-b from-[#ffd868] to-[#e3a92a] px-5 text-[0.9375rem] font-extrabold text-forest-950 transition hover:brightness-110 disabled:opacity-70 lg:gap-[0.7vw] lg:px-[1.9vw] lg:text-[max(13px,1vw)]"
            >
              {stare === "sending" ? "Se trimite…" : "Mă abonez"}
              <ArrowRight className="h-[1.2em] w-[1.2em]" />
            </button>
          </div>
          <label className="mt-3 flex items-start gap-3 text-[0.75rem] leading-snug text-white/75 lg:mt-[1.3vw] lg:gap-[0.9vw] lg:text-[max(10px,0.74vw)]">
            <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-[#f4c84a] lg:h-[1.05vw] lg:w-[1.05vw]" />
            <span>
              Sunt de acord să primesc noutăți, oferte și idei creative din partea Paradox Craft.
              <br className="hidden lg:block" /> Promitem că nu îți vom trimite spam.
            </span>
          </label>
          <p role="status" className={`mt-2 text-[0.8125rem] font-semibold lg:text-[max(11px,0.8vw)] ${stare === "error" ? "text-[#ff7a6e]" : "text-gold-bright"}`}>
            {stare === "sent" && "Mulțumim! Te vom anunța despre noutăți."}
            {stare === "error" && "Nu am putut trimite abonarea. Încearcă din nou."}
          </p>
        </form>
      </div>
    </section>
  );
}
