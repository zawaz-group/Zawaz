import { Crown, Plus } from "./icons";

/** Acordeon nativ (<details>): accesibil și funcționează fără JavaScript. `items` = [{ q, a }]. */
export default function Faq({ items, id = "faq", title = "Întrebări", accent = "frecvente" }) {
  if (!items?.length) return null;

  return (
    <div id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3">
        <h2 className="text-[max(18px,1.43vw)] font-extrabold uppercase tracking-[0.02em]">
          {title} <span className="text-gold-bright">{accent}</span>
        </h2>
        <Crown className="h-7 w-8 -translate-y-1" />
      </div>

      <div className="mt-5 space-y-3 lg:mt-[1.2vw] lg:space-y-[0.8vw]">
        {items.map((item, i) => (
          <details
            key={item.q}
            name={id}
            open={i === 0}
            className="group rounded-xl border border-gold/20 bg-forest-950/65 backdrop-blur-sm transition open:border-gold/50 open:shadow-[0_0_1.25rem_rgba(31,106,54,0.35)] hover:border-gold/45 lg:rounded-[0.8vw]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 text-[0.9375rem] font-bold text-white marker:hidden lg:px-[1.3vw] lg:py-[1vw] lg:text-[max(13px,0.98vw)] [&::-webkit-details-marker]:hidden">
              {item.q}
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold/50 text-gold-bright transition duration-300 group-open:rotate-45 group-open:bg-gold-bright group-open:text-forest-950 lg:h-[1.9vw] lg:w-[1.9vw]">
                <Plus className="h-[55%] w-[55%]" />
              </span>
            </summary>
            <p className="px-4 pb-4 text-[0.875rem] leading-relaxed text-white/80 lg:px-[1.3vw] lg:pb-[1.1vw] lg:text-[max(12px,0.88vw)]">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
