"use client";
import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import BlogCard from "../components/BlogCard";
import PageShell, { PageHeading } from "../components/PageShell";
import { ArrowLeft } from "../components/icons";

export default function BlogPage() {
  return (
    <Suspense>
      <BlogContent />
    </Suspense>
  );
}

function BlogContent() {
  const [articole, setArticole] = useState([]);
  const [loading, setLoading] = useState(true);
  // Articolul deschis e tinut in adresa (?articol=slug), ca sa poata fi
  // trimis ca link si ca previzualizarea din prima pagina sa duca direct la el.
  const slug = useSearchParams().get("articol");

  useEffect(() => {
    fetch("/api/blog")
      .then(r => r.json())
      .then(data => setArticole(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (slug) {
    const a = articole.find(x => x.slug === slug);
    return (
      <PageShell narrow>
        <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-white/70 transition hover:text-gold-bright">
          <ArrowLeft className="h-4 w-4" /> Înapoi la blog
        </Link>

        {a ? (
          <article>
            <span className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-bright">{a.categorie}</span>
            <h1 className="mb-3 mt-3 font-display text-[max(32px,3.2vw)] font-extrabold italic uppercase leading-[0.98] text-white">{a.titlu}</h1>
            <p className="mb-8 text-[0.8125rem] text-white/60">{a.data} · {a.citire} citire</p>
            {a.img && (
              <div className="mb-8 aspect-video overflow-hidden rounded-2xl border border-gold/25 bg-black shadow-[0_0_1.5rem_rgba(31,106,54,0.3)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.img} alt={a.titlu} className="h-full w-full object-cover" />
              </div>
            )}
            <div className="space-y-5 text-[1.0625rem] leading-[1.8] text-white/85">
              {String(a.continut || "").split(/\n{2,}/).map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </article>
        ) : (
          <p className="text-[1rem] text-white/70">{loading ? "Se încarcă…" : "Articolul nu a fost găsit."}</p>
        )}
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeading
        crumbs={[{ label: "Acasă", href: "/" }, { label: "Blog" }]}
        title="Din atelierul"
        accent="nostru"
        description="Ghiduri, idei și povești despre produsele noastre din lemn natural."
      />

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-[3vw] lg:grid-cols-3 lg:gap-[1.8vw]">
        {articole.map(a => (
          <li key={a.slug}>
            <BlogCard articol={a} />
          </li>
        ))}
      </ul>
      {!loading && articole.length === 0 && <p className="mt-10 text-white/70">Nu există articole momentan.</p>}
    </PageShell>
  );
}
