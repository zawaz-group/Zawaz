import Link from "next/link";
import CategoryArt from "./CategoryArt";
import { ChevronRight } from "./icons";

/** Cardul mare de categorie din design (titlu, paragraf scurt, poză, săgeată aurie). */
export default function CategoryCard({ c }) {
  return (
    <Link
      href={c.href}
      className="group relative block h-[6.75rem] overflow-hidden rounded-xl border border-gold/25 bg-forest-950 shadow-[0_0_1.375rem_rgba(31,106,54,0.28)] transition hover:border-gold/60 hover:shadow-[0_0_1.875rem_rgba(244,200,74,0.2)] sm:h-[11rem] lg:h-[max(140px,9.8vw)] lg:rounded-2xl"
    >
      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04] lg:inset-y-0 lg:right-auto lg:w-[62%] lg:[mask-image:linear-gradient(to_right,#000_70%,transparent)]">
        <CategoryArt image={c.image} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/10 lg:to-black/70" />

      <div className="absolute bottom-2 left-2 right-8 lg:bottom-auto lg:left-[52%] lg:right-[12%] lg:top-1/2 lg:-translate-y-[62%]">
        <div className="text-[0.75rem] font-bold leading-tight text-white sm:text-[1.125rem] lg:text-[max(18px,1.56vw)]">{c.title}</div>
        <div className="mt-0.5 line-clamp-2 text-[0.5625rem] leading-tight text-white/80 sm:text-[0.8125rem] lg:mt-1 lg:text-[max(12px,0.93vw)]">{c.subtitle}</div>
      </div>

      <span className="absolute bottom-2 right-2 grid h-5 w-5 place-items-center rounded-full bg-gold-bright text-forest-950 shadow-[0_0.25rem_0.875rem_rgba(0,0,0,0.5)] transition group-hover:scale-110 sm:h-8 sm:w-8 lg:bottom-[14%] lg:right-[5%] lg:h-[2.7vw] lg:min-h-9 lg:w-[2.7vw] lg:min-w-9">
        <ChevronRight className="h-[60%] w-[60%]" />
      </span>
    </Link>
  );
}
