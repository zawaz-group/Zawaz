"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCos } from "../context/CosContext";
import { imaginePrincipala } from "../lib/imagini";
import { Cart, Close, Minus, Plus } from "./icons";

/** Sertarul coșului, deschis din header. Aceeași logică de coș ca înainte, cu aspectul din design. */
export default function CosDrawer({ open, onClose }) {
  const { cos, stergeItem, actualizeazaCantitate, total, numarArticole } = useCos();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      {open && <div onClick={onClose} className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-[2px]" />}
      <aside
        aria-hidden={!open}
        aria-label="Coșul de cumpărături"
        className={`fixed right-0 top-0 z-[201] flex h-dvh w-[35rem] max-w-[95vw] flex-col border-l border-gold/30 bg-[#06100c] shadow-[-0.25rem_0_2rem_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out ${open ? "translate-x-0" : "pointer-events-none translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-gold/20 px-6 py-5">
          <span className="text-[1.125rem] font-extrabold uppercase tracking-[0.04em]">
            Coșul tău <span className="text-gold-bright">({numarArticole})</span>
          </span>
          <button type="button" aria-label="Închide coșul" onClick={onClose} className="text-white transition hover:text-gold-bright">
            <Close className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-4">
          {cos.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 pt-16 text-white/60">
              <Cart className="h-14 w-14 text-gold/60" strokeWidth={1.2} />
              <p className="text-[0.9375rem]">Coșul tău este gol.</p>
            </div>
          ) : (
            cos.map((item) => {
              const img = imaginePrincipala(item.produs);
              return (
                <div key={item.key} className="flex items-start gap-3.5 border-b border-white/10 pb-4">
                  {img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <Link href={`/produse/${item.produs.id}`} onClick={onClose} className="block aspect-[1336/1096] w-[6.5rem] shrink-0 overflow-hidden rounded-lg border border-gold/25 bg-[radial-gradient(70%_70%_at_50%_45%,rgba(244,200,74,0.1),transparent_75%),linear-gradient(180deg,#0b120e,#050a07)]">
                      <img src={img} alt={item.produs.name} className="h-full w-full object-contain p-[4%]" />
                    </Link>
                  )}
                  <div className="flex flex-1 flex-col gap-1.5">
                    <Link href={`/produse/${item.produs.id}`} onClick={onClose} className="text-[0.875rem] font-bold leading-snug text-white transition hover:text-gold-bright">{item.produs.name}</Link>
                    {item.culoare && <p className="text-[0.75rem] text-white/60">Culoare: {item.culoare}</p>}
                    {item.marime && <p className="text-[0.75rem] text-white/60">Mărime: {item.marime}</p>}
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center overflow-hidden rounded-lg border border-gold/30">
                        <button type="button" aria-label="Scade cantitatea" onClick={() => actualizeazaCantitate(item.key, item.cantitate - 1)} className="grid h-8 w-8 place-items-center text-gold-bright transition hover:bg-brand/50">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-[0.875rem] font-semibold">{item.cantitate}</span>
                        <button type="button" aria-label="Crește cantitatea" onClick={() => actualizeazaCantitate(item.key, item.cantitate + 1)} className="grid h-8 w-8 place-items-center text-gold-bright transition hover:bg-brand/50">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[0.875rem] font-extrabold text-gold-bright">{(item.produs.price * item.cantitate).toLocaleString("ro-RO")} lei</span>
                        <button type="button" aria-label={`Șterge ${item.produs.name} din coș`} onClick={() => stergeItem(item.key)} className="text-white/60 transition hover:text-gold-bright">
                          <Close className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-gold/20 px-6 py-5">
          {cos.length > 0 && (
            <div className="flex justify-between text-[1rem] font-extrabold">
              <span>Total</span>
              <span className="text-gold-bright">{total.toLocaleString("ro-RO")} lei</span>
            </div>
          )}
          <Link href={cos.length > 0 ? "/cos" : "/produse"} onClick={onClose} className="btn-gold h-12 px-6 text-[0.875rem] uppercase tracking-[0.06em]">
            {cos.length > 0 ? "Finalizează comanda" : "Continuă cumpărăturile"}
          </Link>
        </div>
      </aside>
    </>
  );
}
