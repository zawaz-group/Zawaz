"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCos } from "../context/CosContext";
import { Cart } from "./icons";

/**
 * Butonul de coș din colțul din dreapta jos. Apare doar când în coș este ceva.
 * Stă în dreapta jos, pe locul butonului „Înapoi sus” cât timp acesta nu se vede
 * (în capul paginii); când săgeata apare, la derulare, coșul se mută lin în stânga ei.
 */
export default function FloatingCart() {
  const { numarArticole, deschideCos } = useCos();
  const pathname = usePathname();
  const [derulat, setDerulat] = useState(false);

  useEffect(() => {
    const onScroll = () => setDerulat(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Nu are sens în admin și pe pagina coșului, unde coșul e deja afișat.
  if (pathname.startsWith("/admin") || pathname === "/cos") return null;

  const vizibil = numarArticole > 0;

  return (
    <button
      type="button"
      aria-label={`Deschide coșul (${numarArticole})`}
      aria-hidden={!vizibil}
      tabIndex={vizibil ? 0 : -1}
      onClick={deschideCos}
      // 1.75rem = locul butonului „Înapoi sus”; când acesta apare, coșul trece lângă el, la stânga.
      style={{ right: derulat ? "5.75rem" : "1.75rem" }}
      className={`fixed bottom-[1.75rem] z-50 grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full border border-gold/70 bg-gradient-to-b from-[#ffd868] to-[#e3a92a] text-forest-950 shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.55),0_0_1.25rem_rgba(244,200,74,0.35)] transition-[right,opacity,transform,box-shadow] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-[0_0.75rem_2rem_rgba(0,0,0,0.6),0_0_1.75rem_rgba(244,200,74,0.55)] ${
        vizibil ? "scale-100 opacity-100" : "pointer-events-none scale-50 opacity-0"
      }`}
    >
      <Cart className="h-[52%] w-[52%]" strokeWidth={1.8} />
      <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-forest-950 px-1 text-[0.6875rem] font-extrabold text-gold-bright ring-2 ring-gold-bright">
        {numarArticole}
      </span>
    </button>
  );
}
