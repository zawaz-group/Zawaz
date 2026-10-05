"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Crown } from "./icons";
import ProdusCard from "./ProdusCard";

/** Carusel de produse din design („Pușculițe populare”), refolosit pentru populare, noi și reduceri. */
export default function ProductCarousel({ products, title, accent, href, id }) {
  const track = useRef(null);

  if (!products?.length) return null;

  const scroll = (dir) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div id={id} className="mx-4 scroll-mt-24 pb-6 pt-8 sm:mx-5 lg:ml-[3.65vw] lg:mr-[4.95vw] lg:pb-[1vw] lg:pt-[1.5vw]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="whitespace-nowrap text-[1.25rem] lg:text-[max(18px,1.43vw)] font-extrabold uppercase tracking-[0.02em]">
            {title} <span className="text-gold-bright">{accent}</span>
          </h2>
          <Crown className="h-7 w-8 -translate-y-1" />
        </div>
        <Link href={href} className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[0.8125rem] font-bold text-white transition hover:text-gold-bright lg:text-[max(13px,0.9vw)]">
          <span>
            Vezi toate<span className="max-sm:hidden"> produsele</span>
          </span>{" "}
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

      <div className="relative mt-4">
        <button
          type="button"
          aria-label="Înapoi"
          onClick={() => scroll(-1)}
          className="absolute -left-3 top-[24%] z-10 grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-forest-950/90 text-white shadow-lg backdrop-blur transition hover:border-gold hover:text-gold-bright lg:top-[28%] lg:-left-[2.4vw] lg:h-[3.2vw] lg:w-[3.2vw]"
        >
          <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />
        </button>
        <button
          type="button"
          aria-label="Înainte"
          onClick={() => scroll(1)}
          className="absolute -right-3 top-[24%] z-10 grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-forest-950/90 text-white shadow-lg backdrop-blur transition hover:border-gold hover:text-gold-bright lg:top-[28%] lg:-right-[2.4vw] lg:h-[3.2vw] lg:w-[3.2vw]"
        >
          <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
        </button>

        <ul ref={track} className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-pl-0 lg:gap-[1.1vw]">
          {products.map((p) => (
            <li key={p.id} className="w-[46%] shrink-0 snap-start sm:w-[30%] md:w-[22%] lg:w-[calc((100%-5*1.1vw)/6)]">
              <ProdusCard produs={p} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
