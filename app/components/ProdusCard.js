"use client";

import Link from "next/link";
import { useState } from "react";
import { useCos } from "../context/CosContext";
import { imaginePrincipala } from "../lib/imagini";
import { Check, Cart, Heart } from "./icons";

/**
 * Cardul de produs din design. `grande` = varianta din carusel, cu text și buton mai mari pe telefon
 * (titlu scurt, buton de coș rotund pe telefon).
 */
export default function ProdusCard({ produs, grande = false }) {
  const [liked, setLiked] = useState(false);
  const [adaugat, setAdaugat] = useState(false);
  const { adaugaInCos } = useCos();

  const imagine = imaginePrincipala(produs);
  const culoare = produs.culori?.[0] || null;
  const areReducere = !!produs.oldPrice && produs.oldPrice > produs.price;
  const procent = areReducere ? Math.round((1 - produs.price / produs.oldPrice) * 100) : 0;
  const esteNou = produs.tags?.includes("produse-noi");
  const href = `/produse/${produs.id}`;

  const handleCart = () => {
    adaugaInCos(produs, culoare, null);
    setAdaugat(true);
    setTimeout(() => setAdaugat(false), 1800);
  };

  const text = grande ? "text-[1.125rem] sm:text-[0.9375rem]" : "text-[0.8125rem]";

  return (
    <div className="group flex h-full flex-col">
      <div className="relative aspect-[1336/1096] overflow-hidden rounded-xl border border-gold/15 bg-[radial-gradient(70%_70%_at_50%_45%,rgba(244,200,74,0.1),transparent_75%),linear-gradient(180deg,#0b120e,#050a07)] shadow-[0_0_1.125rem_rgba(31,106,54,0.25)] transition group-hover:border-gold/50">
        <Link href={href} aria-label={produs.name} className="absolute inset-0">
          {imagine && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imagine}
              alt={`${produs.name} — Paradox Craft`}
              loading="lazy"
              className="h-full w-full object-contain p-[3%] transition-transform duration-500 group-hover:scale-[1.04]"
            />
          )}
        </Link>

        {(esteNou || areReducere) && (
          <div className="pointer-events-none absolute left-1 top-1 flex flex-col items-start gap-1 lg:left-2 lg:top-2">
            {esteNou && (
              <span className="rounded-full bg-brand px-2 py-0.5 text-[0.5625rem] font-extrabold uppercase tracking-[0.06em] text-white sm:text-[0.625rem]">Nou</span>
            )}
            {areReducere && (
              <span className="rounded-full bg-[#e03c2f] px-2 py-0.5 text-[0.5625rem] font-extrabold text-white sm:text-[0.625rem]">-{procent}%</span>
            )}
          </div>
        )}

        <button
          type="button"
          aria-label={liked ? `Scoate ${produs.name} de la favorite` : `Adaugă ${produs.name} la favorite`}
          aria-pressed={liked}
          onClick={() => setLiked((v) => !v)}
          className={`absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/50 backdrop-blur transition hover:text-gold-bright lg:right-2 lg:top-2 lg:h-8 lg:w-8 ${liked ? "text-gold-bright" : "text-white"}`}
        >
          <Heart className="h-3.5 w-3.5 lg:h-[1.125rem] lg:w-[1.125rem]" fill={liked ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="mt-2 flex flex-1 items-start justify-between gap-1 lg:mt-3 lg:gap-2">
        <div className="min-w-0">
          <h3 className={`line-clamp-2 font-semibold leading-snug text-white lg:text-[max(12px,0.9vw)] ${text}`}>
            <Link href={href} className="transition hover:text-gold-bright">{produs.name}</Link>
          </h3>
          <p className={`mt-0.5 flex flex-wrap items-baseline gap-x-2 font-extrabold text-gold-bright lg:text-[max(12px,0.9vw)] ${text}`}>
            <span>{produs.price.toLocaleString("ro-RO")} lei</span>
            {areReducere && <span className="text-[0.85em] font-semibold text-white/50 line-through">{produs.oldPrice.toLocaleString("ro-RO")} lei</span>}
          </p>
        </div>
        <button
          type="button"
          aria-label={`Adaugă ${produs.name} în coș`}
          onClick={handleCart}
          className={`grid shrink-0 place-items-center transition hover:shadow-[0_0_0.875rem_rgba(31,106,54,0.8)] ${
            adaugat
              ? "bg-brand text-white"
              : "border border-gold/50 bg-brand/40 text-gold-bright hover:bg-brand"
          } ${grande ? "h-12 w-12 rounded-xl sm:h-9 sm:w-9 sm:rounded-lg" : "h-9 w-9 rounded-lg"}`}
        >
          {adaugat ? (
            <Check className={grande ? "h-6 w-6 sm:h-[1.125rem] sm:w-[1.125rem]" : "h-[1.125rem] w-[1.125rem]"} />
          ) : (
            <Cart className={grande ? "h-6 w-6 sm:h-[1.125rem] sm:w-[1.125rem]" : "h-[1.125rem] w-[1.125rem]"} />
          )}
        </button>
      </div>
    </div>
  );
}
