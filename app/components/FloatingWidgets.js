"use client";

import { useEffect, useState } from "react";
import { CONTACT } from "../lib/contact";
import { Phone } from "./icons";

/**
 * Butonul de apel, plutitor deasupra butonului „Înapoi sus”; apare după ce vizitatorul derulează pagina.
 */
export default function FloatingWidgets() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={CONTACT.phoneHref}
      aria-label={`Sună-ne: ${CONTACT.phone}`}
      className={`fixed bottom-[5.75rem] right-[1.75rem] z-50 flex items-center gap-3 rounded-full border border-gold/50 bg-[#06100c]/90 p-1.5 shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.55),0_0_1.25rem_rgba(31,106,54,0.45)] backdrop-blur-md transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-gold-bright md:pr-5 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="grid h-[2.75rem] w-[2.75rem] shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#2f9a52] to-brand text-white">
        <Phone className="h-5 w-5" />
      </span>
      <span className="hidden leading-tight md:block">
        <span className="block text-[0.6875rem] text-white/70">Ai nevoie de ajutor?</span>
        <span className="block text-[1rem] font-extrabold text-gold-bright">{CONTACT.phone}</span>
      </span>
    </a>
  );
}
