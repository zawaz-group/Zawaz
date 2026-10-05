import Link from "next/link";
import { CATEGORII_PRINCIPALE } from "../lib/categorii-site";
import CategoryCard from "./CategoryCard";
import { ArrowRight } from "./icons";

/**
 * „Categorii principale”: primele câteva; dacă sunt mai multe, apare butonul „Toate categoriile”.
 * Cu o singură categorie secțiunea nu are sens (un singur card arată gol), deci nu se afișează.
 */
export default function Categories({ categorii = [] }) {
  if (categorii.length < 2) return null;
  const vizibile = categorii.slice(0, CATEGORII_PRINCIPALE);
  const suntMai = categorii.length > vizibile.length;

  return (
    <div className="mx-4 pt-6 sm:mx-5 lg:ml-[3.65vw] lg:mr-[4.95vw] lg:pt-[0.6vw]">
      <div className="flex items-center justify-between gap-3">
        <div className="relative inline-block">
          <h2 className="text-[max(18px,1.43vw)] font-extrabold uppercase tracking-[0.02em]">
            Categorii <span className="text-gold-bright">principale</span>
          </h2>
          <svg viewBox="0 0 220 16" className="absolute -bottom-3 left-0 h-3 w-[110%]" fill="none" aria-hidden>
            <path d="M2 11C50 5 120 3 178 7" stroke="#2fb35a" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
            <path d="M120 12C150 9 180 8 214 4" stroke="#f4c84a" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </svg>
        </div>

        {suntMai && (
          <Link href="/categorii" className="btn-outline h-9 shrink-0 gap-2 px-4 text-[0.75rem] lg:h-[2.6vw] lg:min-h-9 lg:px-[1.3vw] lg:text-[max(12px,0.9vw)]">
            Toate categoriile
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      {/* Pe telefon: 3 carduri pe un rând, cu imaginea pe toată suprafața */}
      <div
        style={{ "--n": vizibile.length }}
        className="mt-4 grid grid-cols-[repeat(var(--n),minmax(0,1fr))] gap-2 sm:gap-3 lg:mt-3.5 lg:gap-[1.25vw]"
      >
        {vizibile.map((c) => (
          <CategoryCard key={c.key} c={c} />
        ))}
      </div>
    </div>
  );
}
