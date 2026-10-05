import Link from "next/link";

/** Cardul unui articol de blog, în stilul cardurilor din design. */
export default function BlogCard({ articol: a }) {
  return (
    <Link
      href={`/blog?articol=${encodeURIComponent(a.slug)}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-b from-[#0b1a12] to-[#050b08] shadow-[0_0_1.25rem_rgba(31,106,54,0.25)] transition hover:-translate-y-1 hover:border-gold/55"
    >
      <div className="aspect-[4/3] overflow-hidden bg-black">
        {a.img && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={a.img} alt={a.titlu} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-center gap-2 text-[0.6875rem]">
          <span className="font-bold uppercase tracking-[0.14em] text-gold-bright">{a.categorie}</span>
          <span className="text-white/40">·</span>
          <span className="text-white/60">{a.citire} citire</span>
        </div>
        <h3 className="text-[1.0625rem] font-extrabold leading-snug text-white">{a.titlu}</h3>
        <p className="flex-1 text-[0.875rem] leading-relaxed text-white/70">{a.rezumat}</p>
        <p className="text-[0.75rem] text-white/50">{a.data}</p>
      </div>
    </Link>
  );
}
