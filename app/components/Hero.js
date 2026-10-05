import { getImageProps } from "next/image";
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

  // Imagine diferită pe telefon (portret) și pe tabletă/desktop (peisaj): <picture> cu art direction.
  const comun = { alt: "Pușculiță Paradox Craft cu drapelul Moldovei, privită frontal", fill: true, sizes: "100vw", loading: "eager", fetchPriority: "high" };
  const {
    props: { srcSet: srcSetLat },
  } = getImageProps({ ...comun, src: "/hero.png" });
  const {
    props: { srcSet: srcSetTelefon, ...imgProps },
  } = getImageProps({ ...comun, src: "/hero-mobil.png" });

  return (
    <section className="relative isolate overflow-hidden bg-black lg:h-[37.7vw]">
      {/* Fundal cinematic. Pe telefon începe sub bara de sus și are înălțime fixă. */}
      <div className="relative mt-12 h-[19rem] max-sm:mt-0 max-sm:h-[51rem] sm:h-[28rem] lg:absolute lg:inset-x-0 lg:top-[2.4vw] lg:-z-10 lg:mt-0 lg:h-[36.5vw] lg:[mask-image:linear-gradient(to_bottom,transparent_0,#000_5%)]">
        {areSlides ? (
          <HeroSlider slides={slides} />
        ) : (
          <picture>
            <source media="(min-width: 640px)" srcSet={srcSetLat} />
            <source media="(max-width: 639px)" srcSet={srcSetTelefon} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img {...imgProps} className="object-cover object-[50%_60%] sm:object-[88%_center] lg:object-[100%_center]" />
          </picture>
        )}
      </div>
      {/* Umbră pentru lizibilitatea textului: sus pe telefon, în stânga pe desktop */}
      {!areSlides && <div className="absolute inset-x-0 top-0 -z-10 h-[27rem] bg-gradient-to-b from-black/75 via-black/35 to-transparent sm:hidden" />}
      {!areSlides && (
        <div className="hidden bg-gradient-to-r lg:absolute lg:inset-0 lg:-z-10 lg:block lg:from-black/50 lg:via-transparent lg:to-transparent" />
      )}
      <div className="absolute inset-x-0 bottom-0 -z-10 hidden h-[14%] bg-gradient-to-t from-black/60 to-transparent lg:block" />

      {/* Copy */}
      {areSlides ? null : (
        <div className="px-5 pb-2 pt-6 max-sm:absolute max-sm:inset-x-0 max-sm:top-[4.25rem] max-sm:pt-0 sm:px-8 sm:pt-8 lg:absolute lg:left-[5.5vw] lg:top-[8.6vw] lg:w-auto lg:p-0">
          <p className="text-[0.875rem] font-extrabold uppercase tracking-[0.12em] text-gold-bright sm:text-[1rem] lg:ml-[1.7vw] lg:text-[max(11px,0.92vw)]">
            Pușculițe creative
          </p>

          <h1 className="-mt-px -rotate-2 font-display text-[3rem] font-extrabold italic uppercase leading-[0.9] tracking-[-0.03em] text-white drop-shadow-[0_0.375rem_1.125rem_rgba(0,0,0,0.6)] sm:text-[4.5rem] lg:-ml-[0.5vw] lg:-mt-[0.6vw] lg:text-[max(44px,4.4vw)]">
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
                <Crown className="absolute left-full top-[0.2rem] ml-2 h-[2rem] w-[2.4rem] rotate-6 sm:h-[3rem] sm:w-[3.5rem] lg:top-[0.2vw] lg:ml-[0.7vw] lg:h-[2.8vw] lg:w-[3.3vw]" />
              </span>
            </span>
          </h1>

          <p className="mt-4 text-[1.0625rem] leading-[1.45] text-white/90 sm:text-[1.25rem] lg:ml-[1.5vw] lg:mt-[0.8vw] lg:whitespace-nowrap lg:text-[max(14px,1.17vw)] lg:leading-[1.4]">
            Pușculițe unice, realizate din materiale premium,
            <br className="hidden lg:block" /> cu design modern și detalii distinctive. Cadoul perfect
            <br className="hidden lg:block" /> pentru pasiunile tale.
          </p>

          <Link
            href="/produse"
            className="btn-gold mt-5 h-12 gap-2 px-7 text-[1rem] sm:h-14 sm:px-9 sm:text-[1.125rem] lg:ml-[1.5vw] lg:mt-[1.5vw] lg:h-[2.8vw] lg:min-h-11 lg:px-[2vw] lg:text-[max(13px,0.98vw)]"
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
      <ul className="relative mx-4 mb-6 mt-6 grid grid-cols-2 gap-x-3 gap-y-5 rounded-2xl border border-gold/30 bg-black/55 px-4 py-5 sm:mx-8 sm:grid-cols-4 sm:gap-x-2 lg:absolute lg:left-[3.8vw] lg:top-[33vw] lg:m-0 lg:flex lg:gap-[2.6vw] lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
        {benefits.map(({ Icon, title, sub }) => (
          <li key={title} className="flex items-center gap-3 sm:gap-2 lg:gap-[0.7vw]">
            <Icon className="h-9 w-9 shrink-0 text-gold-bright sm:h-9 sm:w-9 lg:h-[2.7vw] lg:min-h-9 lg:w-[2.7vw] lg:min-w-9" />
            <div className="min-w-0 leading-tight">
              <div className="text-[0.9375rem] font-bold text-white sm:text-[0.8125rem] lg:text-[max(11px,0.82vw)]">{title}</div>
              <div className="mt-0.5 text-[0.8125rem] text-white/75 sm:text-[0.75rem] lg:mt-0.5 lg:text-[max(10px,0.78vw)]">{sub}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
