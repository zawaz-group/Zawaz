"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { use } from "react";
import PageShell from "../../components/PageShell";
import ProdusCard from "../../components/ProdusCard";
import Faq from "../../components/Faq";
import { Check, Crown, Star } from "../../components/icons";
import categorii from "../../../data/categorii.json";
import { useCos } from "../../context/CosContext";
import { hexCuloare, esteGradient, esteCuloareDeschisa, GRADIENT_NEGRU_ALB } from "../../lib/culori";
import { galerieProdus, culoareImplicita } from "../../lib/imagini";

const eticheta = "mb-3 text-[0.75rem] font-extrabold uppercase tracking-[0.14em] text-gold-bright";

function Titlu({ children }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="text-[max(18px,1.43vw)] font-extrabold uppercase tracking-[0.02em]">{children}</h2>
      <Crown className="h-7 w-8 -translate-y-1" />
    </div>
  );
}

export default function ProdusDePage({ params }) {
  const { id } = use(params);
  const [produs, setProdus] = useState(null);
  const [similare, setSimilare] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCuloare, setSelectedCuloare] = useState(null);
  const [selectedMarime, setSelectedMarime] = useState(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [recenzii, setRecenzii] = useState([]);
  const [faq, setFaq] = useState([]);
  // Culorile adaugate din admin isi tin hex-ul aici, pe tipul de produs —
  // fara ele am sti doar numele culorii, nu si cum arata.
  const [optiuni, setOptiuni] = useState(null);
  const { adaugaInCos } = useCos();

  useEffect(() => {
    fetch("/api/produse").then(r => r.json()).then(data => {
      const lista = Array.isArray(data) ? data : [];
      const found = lista.find(p => p.id === id);
      setProdus(found || null);
      // Prima culoare e selectata din start: imaginea principala a produsului
      // e chiar imaginea ei, deci galeria si bulina trebuie sa fie de acord.
      if (found) {
        setSelectedCuloare(culoareImplicita(found));
        setSimilare(lista.filter(p => p.category === found.category && p.id !== id).slice(0, 4));
      }
      setLoading(false);
    }).catch(() => { setProdus(null); setLoading(false); });
    fetch("/api/recenzii").then(r => r.json()).then(all => setRecenzii((Array.isArray(all) ? all : []).filter(r => r.produsId === id))).catch(() => {});
    fetch("/api/faq").then(r => r.json()).then(all => setFaq((Array.isArray(all) ? all : []).filter(f => f.produsId === id))).catch(() => {});
    fetch("/api/optiuni").then(r => r.json()).then(setOptiuni).catch(() => {});
  }, [id]);

  const selectCuloare = (c) => {
    setSelectedCuloare(c);
    setActiveImgIdx(0);
  };

  if (loading) {
    return (
      <PageShell>
        <div className="grid min-h-[50vh] place-items-center">
          <p className="text-[0.9375rem] text-white/70">Se încarcă…</p>
        </div>
      </PageShell>
    );
  }

  if (!produs) {
    return (
      <PageShell>
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-5 text-center">
          <h1 className="font-display text-[max(40px,5vw)] font-extrabold italic uppercase leading-none">
            Produs <span className="gold-text">negăsit</span>
          </h1>
          <Link href="/produse" className="btn-gold h-11 px-7 text-[0.875rem]">
            Vezi toate produsele
          </Link>
        </div>
      </PageShell>
    );
  }

  const hasDiscount = produs.oldPrice;
  const discountPct = hasDiscount ? Math.round((1 - produs.price / produs.oldPrice) * 100) : null;
  const categLabel = optiuni?.tipuriProdus?.find(t => t.value === produs.category)?.label || categorii.find(c => c.slug === produs.category)?.label || produs.category;

  const culoriCustom = optiuni?.culori?.[produs.category] || [];

  // Imaginile culorii alese daca produsul are culori, altfel galeria proprie
  // a produsului (prima = principala, restul secundare).
  const galleryImgs = galerieProdus(produs, selectedCuloare);
  const mainImg = galleryImgs[activeImgIdx] || galleryImgs[0];

  // Categoriile alese pentru produs, asa cum au fost bifate in admin. Fiecare
  // duce in catalog cu filtrul respectiv deja aplicat.
  const grupuriCategorii = [
    { titlu: "Subcategorie", cheie: "subcategorie", valori: produs.subcategorie ? [produs.subcategorie] : [] },
    { titlu: "Temă", cheie: "tema", valori: produs.tema || [] },
    { titlu: "Ocazie", cheie: "ocazie", valori: produs.ocazie || [] },
  ].filter(g => g.valori.length > 0);

  const handleAddToCart = () => {
    adaugaInCos(produs, selectedCuloare, selectedMarime);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <PageShell>
      {/* Breadcrumb */}
      <nav aria-label="Navigare" className="text-[0.8125rem] text-white/60 lg:text-[max(13px,0.85vw)]">
        <Link href="/" className="transition hover:text-gold-bright">Acasă</Link>
        <span className="mx-2 text-gold/60">/</span>
        <Link href={`/produse?categorie=${encodeURIComponent(produs.category)}`} className="transition hover:text-gold-bright">{categLabel}</Link>
        <span className="mx-2 text-gold/60">/</span>
        <span className="text-white">{produs.name}</span>
      </nav>

      <div className="mt-6 grid items-start gap-8 lg:mt-[2vw] lg:grid-cols-2 lg:gap-[3.5vw]">
        {/* Imagine */}
        <div className="lg:sticky lg:top-8">
          <div className="relative aspect-[1336/1096] w-full overflow-hidden rounded-2xl border border-gold/25 bg-[radial-gradient(70%_70%_at_50%_45%,rgba(244,200,74,0.1),transparent_75%),linear-gradient(180deg,#0b120e,#050a07)] shadow-[0_0_1.5rem_rgba(31,106,54,0.3)]">
            {mainImg && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={mainImg} alt={produs.name} className="h-full w-full object-contain p-[3%]" />
            )}
            {hasDiscount && (
              <div className="absolute left-4 top-4 rounded-full bg-[#e03c2f] px-3.5 py-1.5 text-[0.875rem] font-extrabold text-white">
                -{discountPct}%
              </div>
            )}
          </div>
          {galleryImgs.length > 1 && (
            <div className="mt-3 flex flex-wrap gap-2.5">
              {galleryImgs.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Imaginea ${i + 1}`}
                  aria-pressed={activeImgIdx === i}
                  onClick={() => setActiveImgIdx(i)}
                  className={`h-[4.25rem] w-[4.25rem] shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 bg-[#0b120e] p-0 transition ${
                    activeImgIdx === i ? "border-gold-bright shadow-[0_0_0.875rem_rgba(244,200,74,0.35)]" : "border-gold/20 hover:border-gold/60"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="h-full w-full object-contain p-[6%]" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          <div className="flex gap-2">
            {produs.tags?.includes("produse-noi") && (
              <span className="rounded-full bg-brand px-3 py-1 text-[0.6875rem] font-extrabold uppercase tracking-[0.1em] text-white">Nou</span>
            )}
            {hasDiscount && (
              <span className="rounded-full bg-[#e03c2f] px-3 py-1 text-[0.6875rem] font-extrabold uppercase tracking-[0.1em] text-white">Reducere</span>
            )}
          </div>

          <div>
            <h1 className="font-display text-[max(32px,3.2vw)] font-extrabold italic uppercase leading-[0.95] tracking-[-0.01em] text-white">{produs.name}</h1>
            <p className="mt-2 text-[0.8125rem] uppercase tracking-[0.1em] text-white/60">{categLabel}</p>
          </div>

          <div className="flex flex-wrap items-baseline gap-4">
            <span className="gold-text text-[2rem] font-extrabold leading-none lg:text-[max(30px,2.4vw)]">
              {produs.price.toLocaleString("ro-RO")} lei
            </span>
            {hasDiscount && (
              <span className="text-[1.25rem] text-white/50 line-through">{produs.oldPrice.toLocaleString("ro-RO")} lei</span>
            )}
          </div>

          <p className="text-[0.9375rem] leading-[1.75] text-white/80 lg:text-[max(14px,1vw)]">{produs.descriere}</p>

          {/* Categoriile alese pentru produs (temă / ocazie) */}
          {grupuriCategorii.map(g => (
            <div key={g.cheie}>
              <p className={eticheta}>{g.titlu}</p>
              <div className="flex flex-wrap gap-2">
                {g.valori.map(v => (
                  <Link
                    key={v}
                    href={`/produse?categorie=${encodeURIComponent(produs.category)}&${g.cheie}=${encodeURIComponent(v)}`}
                    className="rounded-full border border-gold/30 bg-forest-950/70 px-3.5 py-1.5 text-[0.8125rem] font-semibold text-white transition hover:border-gold/70 hover:text-gold-bright"
                  >
                    {v}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Culori — doar daca produsul chiar are culori de ales */}
          {(produs.culori || []).length > 0 && (
            <div>
              <p className={eticheta}>
                Culoare: <span className="font-normal normal-case tracking-normal text-white/80">{selectedCuloare || "—"}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {(produs.culori || []).map(c => {
                  const activ = selectedCuloare === c;
                  const hex = hexCuloare(c, culoriCustom);
                  const fundal = esteGradient(c) ? GRADIENT_NEGRU_ALB : hex;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => selectCuloare(c)}
                      title={c}
                      aria-label={c}
                      aria-pressed={activ}
                      // Fara hex cunoscut (culoare stearsa din admin) aratam
                      // tot butonul cu numele scris, ca sa ramana alegibila.
                      style={{ background: fundal || "#0b1a12" }}
                      // Conturul selectiei sta in afara bulinei, ca sa nu
                      // acopere culoarea in sine.
                      className={`grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/30 p-0 text-[0.625rem] font-bold text-white/80 outline-2 outline-offset-2 transition-[outline-color] ${
                        activ ? "outline-gold-bright" : "outline-transparent"
                      }`}
                    >
                      {!fundal ? c.slice(0, 3) : activ && <Check className={`h-4 w-4 ${esteCuloareDeschisa(c) ? "text-forest-950" : "text-white"}`} />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Marimi */}
          {produs.marimi?.length > 0 && (
            <div>
              <p className={eticheta}>
                Mărime: <span className="font-normal normal-case tracking-normal text-white/80">{selectedMarime || "—"}</span>
              </p>
              <div className="flex flex-wrap gap-2.5">
                {(produs.marimi || []).map(m => (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={selectedMarime === m}
                    onClick={() => setSelectedMarime(m)}
                    className={`h-[3.25rem] min-w-[3.25rem] cursor-pointer rounded-xl border px-3 text-[0.875rem] font-semibold transition ${
                      selectedMarime === m
                        ? "border-gold-bright bg-gradient-to-b from-[#ffd868] to-[#e3a92a] text-forest-950"
                        : "border-gold/30 bg-forest-950/70 text-white hover:border-gold/70 hover:text-gold-bright"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Adauga in cos */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`btn-gold h-14 w-full gap-3 text-[0.9375rem] uppercase tracking-[0.1em] ${addedToCart ? "brightness-110" : ""}`}
          >
            {addedToCart ? (
              <>
                <Check className="h-5 w-5" /> Adăugat în coș!
              </>
            ) : (
              "Adaugă în coș"
            )}
          </button>

          {/* Avantaje */}
          <ul className="flex flex-col gap-2.5 border-t border-gold/20 pt-6">
            {["Livrare gratuită peste 500 lei", "Returnare gratuită în 30 de zile", "Garanție autenticitate Paradox Craft"].map(f => (
              <li key={f} className="flex items-center gap-3 text-[0.875rem] text-white/80">
                <Check className="h-4 w-4 shrink-0 text-gold-bright" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recenzii produs */}
      {recenzii.length > 0 && (
        <section className="mt-16 lg:mt-[5vw]">
          <Titlu>
            Recenzii <span className="text-gold-bright">produs</span>
          </Titlu>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[1.5vw]">
            {recenzii.map(r => (
              <li key={r.id} className="rounded-2xl border border-gold/25 bg-gradient-to-b from-[#0b1a12] to-[#04100b] p-5 shadow-[0_0_1.5rem_rgba(31,106,54,0.3)]">
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-gold/60 bg-forest-950 font-extrabold text-gold-bright">
                    {r.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.avatar} alt="" className="h-full w-full object-cover" />
                    ) : (
                      (r.nume || "?").charAt(0).toUpperCase()
                    )}
                  </span>
                  <div>
                    <p className="text-[0.875rem] font-bold text-white">{r.nume}</p>
                    <div className="mt-0.5 flex gap-0.5 text-gold-bright" role="img" aria-label={`${r.rating || 5} din 5 stele`}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < (r.rating || 5) ? "" : "opacity-25"}`} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[0.875rem] italic leading-relaxed text-white/80">„{r.text}”</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQ produs */}
      {faq.length > 0 && (
        <section className="mt-16 max-w-[50rem] lg:mt-[5vw]">
          <Faq id="faq-produs" items={faq.map(f => ({ q: f.intrebare, a: f.raspuns }))} />
        </section>
      )}

      {/* Produse similare */}
      {similare.length > 0 && (
        <section className="mt-16 lg:mt-[5vw]">
          <Titlu>
            Produse <span className="text-gold-bright">similare</span>
          </Titlu>
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-[1.3vw]">
            {similare.map(p => (
              <li key={p.id}>
                <ProdusCard produs={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageShell>
  );
}
