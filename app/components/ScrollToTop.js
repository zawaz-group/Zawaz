"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "./icons";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Înapoi sus"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-[1.75rem] right-[1.75rem] z-50 grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full border border-gold/70 bg-gradient-to-b from-[#ffd868] to-[#e3a92a] text-forest-950 shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.55),0_0_1.25rem_rgba(244,200,74,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0.75rem_2rem_rgba(0,0,0,0.6),0_0_1.75rem_rgba(244,200,74,0.55)] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ChevronUp className="h-[55%] w-[55%]" />
    </button>
  );
}
