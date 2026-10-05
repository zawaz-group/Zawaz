"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const INTERVAL = 5000;

/** Bannerele adăugate din admin (Hero Slider), care se schimbă singure la 5 secunde. */
export default function HeroSlider({ slides }) {
  const [activ, setActiv] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => setActiv((s) => (s + 1) % slides.length), INTERVAL);
    return () => clearInterval(id);
    // `activ` în dependențe: la un click pe puncte, intervalul pornește de la zero.
  }, [slides.length, activ]);

  return (
    <>
      {slides.map((s, i) => (
        <Link
          key={s.id}
          href={s.link || "/produse"}
          aria-hidden={activ !== i}
          tabIndex={activ === i ? 0 : -1}
          className={`absolute inset-0 transition-opacity duration-700 ${activ === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          {s.img && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={s.img} alt={s.alt || "Ofertă specială"} className="h-full w-full object-cover object-center" />
          )}
        </Link>
      ))}

      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-2 z-10 flex justify-center gap-2 lg:bottom-[1.2vw]">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Banner ${i + 1}`}
              aria-current={activ === i}
              onClick={() => setActiv(i)}
              className={`h-2 rounded-full transition-all duration-300 ${activ === i ? "w-6 bg-gold-bright" : "w-2 bg-white/50 hover:bg-white/80"}`}
            />
          ))}
        </div>
      )}
    </>
  );
}
