"use client";

import { useRef, useState } from "react";
import { Crown, Pause, Play } from "./icons";

const pasi = [
  { n: 1, title: "Adaugă monedele", text: "Introdu monedele de 10 Lei în fanta specială.", video: "/videos/pas-1.mp4" },
  { n: 2, title: "Urmărește progresul", text: "Monedele se aliniază frumos în interior.", video: "/videos/pas-2.mp4" },
  { n: 3, title: "Economisește cu stil", text: "Când pușculița se umple, poți scoate monedele ușor.", video: "/videos/pas-3.mp4" },
];

// Un singur videoclip rulează la un moment dat.
let current = null;

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;

function VideoCard({ n, title, text, video }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(null);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      if (current && current !== el) current.pause();
      current = el;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  return (
    <article className="group relative w-[84%] shrink-0 snap-center overflow-hidden rounded-xl md:w-auto border border-gold/20 bg-forest-950/80 shadow-[0_0_1.25rem_rgba(31,106,54,0.3)] transition hover:border-gold/60 lg:aspect-[273/200] lg:bg-black">
      <div className="relative aspect-[4/3] overflow-hidden bg-black lg:absolute lg:inset-0 lg:aspect-auto">
        <video
          ref={ref}
          // #t=0.1 → afișează un cadru ca imagine de copertă, fără să descarce tot clipul
          src={`${video}#t=0.1`}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`Pasul ${n}: ${title}`}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:from-black/90 lg:via-black/20 lg:to-black/10" />

        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pauză: ${title}` : `Redă: ${title}`}
          className="absolute inset-0 grid place-items-center focus-visible:outline-2 focus-visible:outline-gold-bright"
        >
          <span
            className={`grid h-14 w-14 place-items-center rounded-full border-2 border-white/90 bg-black/35 text-white backdrop-blur-sm transition duration-300 group-hover:scale-110 group-hover:border-gold-bright group-hover:text-gold-bright lg:h-[3.4vw] lg:w-[3.4vw] ${
              playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
          >
            {playing ? <Pause className="h-[42%] w-[42%]" /> : <Play className="ml-[6%] h-[42%] w-[42%]" />}
          </span>
        </button>

        {duration !== null && (
          <span className="pointer-events-none absolute bottom-2 right-2 rounded bg-black/65 px-2 py-0.5 text-[0.75rem] font-semibold text-white lg:bottom-[0.9vw] lg:right-[0.9vw] lg:rounded-md lg:px-2 lg:py-1 lg:text-[max(10px,0.72vw)]">
            {fmt(duration)}
          </span>
        )}
      </div>

      <div className="pointer-events-none p-3.5 lg:absolute lg:inset-x-0 lg:bottom-0 lg:p-[0.9vw] lg:pr-[4.5vw]">
        <h3 className="text-[1.0625rem] font-bold leading-tight text-white lg:text-[max(13px,0.95vw)]">
          <span className="text-gold-bright">{n}.</span> {title}
        </h3>
        <p className="mt-1 text-[0.875rem] leading-snug text-white/80 lg:mt-0.5 lg:text-[max(10px,0.7vw)]">{text}</p>
      </div>
    </article>
  );
}

export default function HowItWorks() {
  return (
    <section id="cum-functioneaza" className="mx-4 scroll-mt-24 py-8 sm:mx-5 lg:ml-[9.8vw] lg:mr-[9.7vw] lg:py-[2.2vw]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-[4.2vw]">
        <div className="lg:w-[21.5vw] lg:shrink-0">
          <h2 className="relative inline-block -rotate-3 font-display text-[max(30px,2.6vw)] font-extrabold italic uppercase leading-[0.95] tracking-[-0.01em] text-white drop-shadow-[0_0.375rem_1.125rem_rgba(0,0,0,0.6)] max-lg:rotate-0 max-lg:font-sans max-lg:text-[1.875rem] max-lg:not-italic max-lg:tracking-[0.02em] lg:whitespace-nowrap">
            Cum <span className="gold-text">funcționează?</span>
            <Crown className="absolute -top-[0.7rem] left-[102%] h-[2rem] w-[2.3rem] rotate-6 lg:-top-[1.1vw] lg:h-[max(1.5rem,2.2vw)] lg:w-[max(1.75rem,2.5vw)]" />
          </h2>
          <p className="mt-3 max-w-[28rem] text-[1.125rem] leading-relaxed text-white/85 lg:mt-[1vw] lg:max-w-[21vw] lg:text-[max(13px,0.92vw)]">
            Descoperă în 3 pași cât de simplu și distractiv poți economisi cu pușculițele noastre.
          </p>
          <svg viewBox="0 0 170 14" className="mt-3 hidden h-[0.9rem] w-[10rem] lg:mt-[0.8vw] lg:block lg:h-[0.9vw] lg:w-[10.6vw]" aria-hidden>
            <path d="M2 11 168 3l-6 3-100 7Z" fill="#f4c84a" />
            <path d="M20 12 120 8" stroke="#f4c84a" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          </svg>
        </div>

        <div className="hide-scrollbar relative -mx-4 flex flex-1 snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-5 sm:px-5 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 lg:gap-[0.9vw]">
          {pasi.map((s) => (
            <VideoCard key={s.n} {...s} />
          ))}

          {/* „Urmărește video” scris de mână + săgeată */}
          <div className="pointer-events-none absolute -right-[5.8vw] top-[1.2vw] hidden w-[5.4vw] xl:block">
            <span className="block -rotate-[14deg] font-hand text-[max(14px,1.15vw)] font-semibold leading-[1.05] text-gold-bright">
              Urmărește
              <br />
              video
            </span>
            <svg viewBox="0 0 80 50" className="mt-1 h-[2.6vw] w-[3.8vw] text-gold-bright" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M70 6C60 30 38 42 10 38" />
              <path d="M22 28 8 38l16 8" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
