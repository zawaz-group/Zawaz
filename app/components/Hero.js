import Image from "next/image";
import Link from "next/link";
import HeroSlider from "./HeroSlider";
import { ArrowRight, Crown, Gift, Headset, Shield, Truck } from "./icons";

const benefits = [
  { Icon: Truck, title: "Livrare rapidă", sub: "1–3 zile" },
  { Icon: Shield, title: "Plată sigură", sub: "Card sau ramburs" },
  { Icon: Gift, title: "Cadou perfect", sub: "Pentru orice vârstă" },
  { Icon: Headset, title: "Suport clienți", sub: "Luni – Vineri" },
];

/**
 * Hero-ul din design. Dacă din admin (Hero Slider) au fost adăugate bannere, ele
 * înlocuiesc imaginea și textul de bază — bannerele își poartă propriul mesaj.
 */
export default function Hero({ slides = [] }) {
  const areSlides = slides.length > 0;

  return (
    <section className="relative isolate overflow-hidden bg-black lg:h-[37.7vw]">
      {/* Fundal cinematic. Pe telefon începe sub bara de sus și are înălțime fixă. */}
      <div className="absolute inset-x-0 top-12 -z-10 h-[12.8rem] sm:h-[22rem] lg:top-[2.4vw] lg:h-[36.5vw] lg:[mask-image:linear-gradient(to_bottom,transparent_0,#000_5%)]">
        {areSlides ? (
          <HeroSlider slides={slides} />
        ) : (
          <Image
            src="/hero.png"
            alt="Pușculiță Paradox Craft cu drapelul Moldovei, privită frontal"
            fill
            preload
            sizes="100vw"
            className="object-cover object-[79%_center] sm:object-[85%_center] lg:object-[100%_center]"
          />
        )}
      </div>
      {/* Umbră pentru lizibilitatea textului */}
      {!areSlides && (
        <div className="absolute inset-x-0 top-12 -z-10 h-[12.8rem] bg-gradient-to-r from-black/75 via-black/25 to-transparent sm:h-[22rem] lg:inset-0 lg:top-0 lg:h-auto lg:from-black/50 lg:via-transparent" />
      )}
      <div className="absolute inset-x-0 bottom-0 -z-10 hidden h-[14%] bg-gradient-to-t from-black/60 to-transparent lg:block" />

      {/* Copy */}
      {areSlides ? (
        <div className="h-[12.8rem] sm:h-[22rem] lg:hidden" aria-hidden />
      ) : (
        <div className="min-h-[15.9rem] w-[58%] px-4 pb-3 pt-[3.75rem] sm:min-h-[25rem] sm:w-[52%] sm:pt-20 lg:absolute lg:left-[5.5vw] lg:top-[8.6vw] lg:min-h-0 lg:w-auto lg:p-0">
          <p className="text-[0.5625rem] font-extrabold uppercase tracking-[0.12em] text-gold-bright sm:text-[0.75rem] lg:ml-[1.7vw] lg:text-[max(11px,0.92vw)]">
            Pușculițe creative
          </p>

          <h1 className="-mt-px -rotate-2 font-display text-[1.45rem] font-extrabold italic uppercase leading-[0.9] tracking-[-0.03em] text-white drop-shadow-[0_0.375rem_1.125rem_rgba(0,0,0,0.6)] sm:text-[3rem] lg:-ml-[0.5vw] lg:-mt-[0.6vw] lg:text-[max(44px,4.4vw)]">
            <span className="block">Transformă</span>
            <span className="relative block lg:ml-[0.2vw]">
              Economisirea
              <svg viewBox="0 0 120 10" className="absolute -bottom-[0.5vw] left-[0.2vw] hidden h-[0.7vw] w-[6vw] lg:block" aria-hidden>
                <path d="M0 8 120 2l-4 3-110 5Z" fill="#f4c84a" />
              </svg>
            </span>
            <span className="ml-[22%] block lg:ml-[12.5vw]">
              <span className="relative inline-block">
                în <span className="gold-text">stil</span>
                <Crown className="absolute left-full top-[0.1rem] ml-1.5 h-[1.1rem] w-[1.3rem] rotate-6 lg:top-[0.2vw] lg:ml-[0.7vw] lg:h-[2.8vw] lg:w-[3.3vw]" />
              </span>
            </span>
          </h1>

          <p className="mt-1.5 text-[0.625rem] leading-[1.25] text-white/90 sm:mt-3 sm:text-[0.9375rem] lg:ml-[1.5vw] lg:mt-[0.8vw] lg:whitespace-nowrap lg:text-[max(14px,1.17vw)] lg:leading-[1.4]">
            Pușculițe unice, realizate din materiale premium,
            <br className="hidden lg:block" /> cu design modern și detalii distinctive. Cadoul perfect
            <br className="hidden lg:block" /> pentru pasiunile tale.
          </p>

          <Link
            href="/produse"
            className="btn-gold mt-2.5 h-7 gap-2 px-3 text-[0.625rem] sm:mt-4 sm:h-10 sm:px-5 sm:text-[0.875rem] lg:ml-[1.5vw] lg:mt-[1.5vw] lg:h-[2.8vw] lg:min-h-11 lg:px-[2vw] lg:text-[max(13px,0.98vw)]"
          >
            Vezi toate produsele
            <ArrowRight className="h-[1.2em] w-[1.2em]" />
          </Link>
        </div>
      )}

      {/* „Design unic” scris de mână + săgeată */}
      {!areSlides && (
        <div className="pointer-events-none absolute right-[3.4vw] top-[11vw] hidden lg:block">
          <span className="block -rotate-[12deg] font-hand text-[max(18px,2vw)] font-semibold leading-none text-gold-bright">Design unic</span>
          <svg viewBox="0 0 90 70" className="-mt-1 ml-[-1vw] h-[4.4vw] w-[5.6vw] text-gold-bright" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M82 6C60 8 36 24 24 54" />
            <path d="M22 38l2 18 17-6" />
          </svg>
        </div>
      )}

      {/* Beneficii */}
      <ul className="relative mx-3 mb-3 mt-1 grid grid-cols-4 gap-1 rounded-xl border border-gold/30 bg-black/55 px-1.5 py-2 lg:absolute lg:left-[3.8vw] lg:top-[33vw] lg:m-0 lg:flex lg:gap-[2.6vw] lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
        {benefits.map(({ Icon, title, sub }) => (
          <li key={title} className="flex items-center gap-1 lg:gap-[0.7vw]">
            <Icon className="h-5 w-5 shrink-0 text-gold-bright sm:h-8 sm:w-8 lg:h-[2.7vw] lg:min-h-9 lg:w-[2.7vw] lg:min-w-9" />
            <div className="min-w-0 leading-tight">
              <div className="text-[0.5625rem] font-bold text-white sm:text-[0.75rem] lg:text-[max(11px,0.82vw)]">{title}</div>
              <div className="mt-px text-[0.5rem] text-white/70 sm:text-[0.6875rem] lg:mt-0.5 lg:text-[max(10px,0.78vw)]">{sub}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
