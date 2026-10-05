"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Crown, Star } from "./icons";

const PE_PAGINA = 3;

/**
 * Recenziile din admin, câte trei pe pagină; cardul din mijloc e „evidențiat”
 * (ridicat, cu bordură aurie și strălucire). Cu mai mult de trei recenzii apar săgeți.
 */
export default function Reviews({ reviews }) {
  const [start, setStart] = useState(0);

  if (!reviews?.length) return null;

  const n = reviews.length;
  const vizibile = n <= PE_PAGINA ? reviews : Array.from({ length: PE_PAGINA }, (_, i) => reviews[(start + i) % n]);
  const mergi = (dir) => setStart((s) => (s + dir * PE_PAGINA + n) % n);

  return (
    <section id="recenzii" className="mx-5 scroll-mt-24 py-10 lg:ml-[9.8vw] lg:mr-[9.7vw] lg:py-[2.2vw]">
      <div className="lg:text-center">
        <div className="inline-flex items-center gap-3">
          <h2 className="text-[max(18px,1.43vw)] font-extrabold uppercase tracking-[0.02em]">
            Ce spun <span className="text-gold-bright">clienții noștri</span>
          </h2>
          <Crown className="h-7 w-8 -translate-y-1" />
        </div>
        <svg viewBox="0 0 220 12" className="mt-2 block h-3 w-44 lg:mx-auto lg:h-[0.8vw] lg:w-[12vw]" fill="none" aria-hidden>
          <path d="M2 8C50 3 120 2 178 5" stroke="#2fb35a" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M100 9C140 6 180 5 218 2" stroke="#f4c84a" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <ul className="hide-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 lg:mt-[2.4vw] lg:items-stretch lg:gap-[1.8vw]">
        {vizibile.map((r, i) => {
          const featured = vizibile.length === PE_PAGINA && i === 1;
          const rating = Math.max(0, Math.min(5, r.rating ?? 5));
          return (
            <li
              key={`${r.id ?? r.nume}-${i}`}
              className={`group relative w-[82%] shrink-0 snap-center overflow-hidden rounded-2xl p-[1px] transition duration-300 hover:-translate-y-1 md:w-auto lg:rounded-[1.1vw] ${
                featured
                  ? "bg-gradient-to-b from-gold-bright via-gold/40 to-brand shadow-[0_0_2.5rem_rgba(244,200,74,0.22)] lg:-translate-y-[0.8vw] lg:hover:-translate-y-[1.1vw]"
                  : "bg-gradient-to-b from-gold/45 via-gold/10 to-brand/60 shadow-[0_0_1.5rem_rgba(31,106,54,0.3)]"
              }`}
            >
              <div className="relative h-full overflow-hidden rounded-[calc(1rem-1px)] bg-gradient-to-b from-[#0b1a12] to-[#04100b] p-6 lg:rounded-[calc(1.1vw-1px)] lg:px-[1.8vw] lg:pb-[1.8vw] lg:pt-[2vw]">
                <span aria-hidden className="pointer-events-none absolute -right-2 -top-6 select-none font-sans text-[9rem] font-black leading-none text-gold-bright/15 lg:-right-[0.5vw] lg:-top-[1.8vw] lg:text-[max(120px,9.5vw)]">
                  ”
                </span>
                <div className="pointer-events-none absolute -bottom-1/3 -left-1/4 h-2/3 w-2/3 rounded-full bg-[radial-gradient(closest-side,rgba(31,106,54,0.35),transparent)]" aria-hidden />

                <div className="relative flex gap-0.5 text-gold-bright" role="img" aria-label={`${rating} din 5 stele`}>
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star
                      key={s}
                      className={`h-5 w-5 lg:h-[1.3vw] lg:w-[1.3vw] ${s < rating ? "drop-shadow-[0_0_0.4rem_rgba(244,200,74,0.6)]" : "opacity-25"}`}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </div>

                <blockquote className="relative mt-4 text-[0.9375rem] leading-relaxed text-white/90 lg:mt-[1.2vw] lg:text-[max(13px,1.02vw)]">{r.text}</blockquote>

                <div className="relative mt-6 flex items-center gap-3 border-t border-gold/20 pt-4 lg:mt-[1.6vw] lg:gap-[0.9vw] lg:pt-[1.1vw]">
                  <span aria-hidden className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-bright via-gold to-[#9a7418] p-[2px] lg:h-[3.3vw] lg:w-[3.3vw]">
                    <span className="relative grid h-full w-full place-items-center overflow-hidden rounded-full bg-forest-950 font-extrabold text-gold-bright">
                      {r.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={r.avatar} alt="" loading="lazy" className="h-full w-full object-cover" />
                      ) : (
                        (r.nume || "?").charAt(0).toUpperCase()
                      )}
                    </span>
                  </span>
                  <div className="text-[0.9375rem] font-bold text-white lg:text-[max(13px,1vw)]">{r.nume}</div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {n > PE_PAGINA && (
        <div className="mt-6 flex items-center justify-center gap-4 lg:mt-[2vw]">
          <button type="button" aria-label="Recenziile anterioare" onClick={() => mergi(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-forest-950/90 text-white transition hover:border-gold hover:text-gold-bright lg:h-[3vw] lg:w-[3vw]">
            <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />
          </button>
          <button type="button" aria-label="Recenziile următoare" onClick={() => mergi(1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-forest-950/90 text-white transition hover:border-gold hover:text-gold-bright lg:h-[3vw] lg:w-[3vw]">
            <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
          </button>
        </div>
      )}
    </section>
  );
}
