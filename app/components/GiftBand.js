import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Car, Gamepad, Smile, Star } from "./icons";

const audiences = [
  { Icon: Smile, title: "Pentru copii", sub: "Îi învață să economisească" },
  { Icon: Star, title: "Pentru colecționari", sub: "Modele speciale și limitate" },
  { Icon: Gamepad, title: "Pentru gameri", sub: "Designuri inspirate din jocuri" },
  { Icon: Car, title: "Pentru pasionații de mașini", sub: "Modele auto unice" },
];

export default function GiftBand() {
  return (
    <section
      aria-labelledby="gift-title"
      className="relative overflow-hidden border-y border-gold/20 bg-[radial-gradient(38%_95%_at_90%_60%,rgba(255,170,60,0.3),transparent_70%),linear-gradient(90deg,rgba(2,12,9,0.8),rgba(2,12,9,0.55)_55%,rgba(48,28,8,0.6))]"
    >
      <div className="flex flex-col gap-0 pb-7 sm:pb-9 lg:flex-row lg:items-center lg:py-0 lg:pb-0">
        {/* cutia cadou */}
        <div
          className="relative h-[13rem] w-full shrink-0 [mask-image:linear-gradient(to_bottom,#000_65%,transparent)] sm:h-[17rem] lg:h-[12.6vw] lg:w-[20vw] lg:[mask-image:linear-gradient(to_right,#000_72%,transparent)]"
        >
          <Image src="/cadou.webp" alt="Cutie cadou neagră cu fundă aurie" fill sizes="(min-width:1024px) 20vw, 100vw" className="object-cover object-[50%_35%]" />
        </div>

        {/* titlu + text + buton */}
        <div className="-mt-6 min-w-0 flex-1 px-5 text-left sm:px-8 lg:mt-0 lg:w-[24vw] lg:flex-none lg:shrink-0 lg:px-[1.2vw]">
          <h2 id="gift-title" className="-rotate-3 font-display font-extrabold italic uppercase leading-[0.95] text-white drop-shadow-[0_0.375rem_1.125rem_rgba(0,0,0,0.6)]">
            <span className="block text-[2.5rem] sm:text-[3.25rem] lg:text-[max(30px,2.75vw)]">
              Cadoul <span className="gold-text">perfect</span>
            </span>
            <span className="block text-[1.75rem] sm:text-[2.25rem] lg:text-[max(24px,2.1vw)]">pentru orice pasionat</span>
          </h2>
          <p className="mt-4 text-[1rem] leading-relaxed text-white/85 sm:text-[1.0625rem] lg:mt-[0.8vw] lg:leading-snug lg:text-[max(12px,0.82vw)]">
            O pușculiță unică este mai mult decât un obiect — este o experiență, o pasiune și o amintire care durează.
          </p>
          <Link
            href="/produse"
            className="btn-gold mt-5 h-12 px-7 text-[1rem] lg:mt-[0.9vw] lg:h-[2.3vw] lg:px-[1.4vw] lg:text-[max(12px,0.82vw)]"
          >
            Vezi toate modelele
            <ArrowRight className="h-[1.2em] w-[1.2em]" />
          </Link>
        </div>

        {/* pentru cine */}
        <ul className="hidden w-full flex-1 gap-x-6 gap-y-5 px-6 sm:grid-cols-2 lg:grid lg:grid-cols-2 lg:gap-x-[2vw] lg:gap-y-[1.3vw] lg:px-[1.5vw]">
          {audiences.map(({ Icon, title, sub }) => (
            <li key={title} className="flex items-center gap-3 lg:gap-[0.9vw]">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-gold/40 bg-forest-950/70 text-gold-bright shadow-[0_0_0.75rem_rgba(31,106,54,0.35)] lg:h-[3.1vw] lg:w-[3.1vw]">
                <Icon className="h-[55%] w-[55%]" />
              </span>
              <div className="leading-tight">
                <div className="text-[0.8125rem] font-semibold text-white lg:text-[max(10.5px,0.7vw)]">{title}</div>
                <div className="mt-1 text-[0.6875rem] text-white/65 lg:text-[max(9px,0.6vw)]">{sub}</div>
              </div>
            </li>
          ))}
        </ul>

        {/* produsul */}
        <div className="relative hidden h-52 w-full max-w-sm shrink-0 lg:block lg:h-[12.6vw] lg:w-[21vw] lg:max-w-none">
          <Image
            src="/products/supercar-galben.webp"
            alt="Pușculiță Paradox Craft — Supercar Galben"
            fill
            sizes="(min-width:1024px) 20vw, 80vw"
            className="object-contain p-[1.5%] drop-shadow-[0_1rem_1.5rem_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>
    </section>
  );
}
