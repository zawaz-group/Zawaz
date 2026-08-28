"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { use } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ProdusCard from "../../components/ProdusCard";
import categorii from "../../../data/categorii.json";
import { useCos } from "../../context/CosContext";
import { hexCuloare, esteGradient, esteCuloareDeschisa, GRADIENT_NEGRU_ALB } from "../../lib/culori";
import { galerieProdus, culoareImplicita } from "../../lib/imagini";

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
  const [openFaq, setOpenFaq] = useState(null);
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
        setSimilare(lista.filter(p => p.category === found.category && p.id !== id).slice(0, 3));
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
      <div style={{ background: "#F7F7F4", minHeight: "100vh" }}>
        <NavBar />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
          <p style={{ color: "#5D695F", fontSize: 15 }}>Se încarcă…</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!produs) {
    return (
      <div style={{ background: "#F7F7F4", minHeight: "100vh" }}>
        <NavBar />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 16 }}>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: "#1D2820" }}>Produs negăsit</h1>
          <Link href="/" style={{ color: "#1D2820", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 13 }}>
            ← Înapoi acasă
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const hasDiscount = produs.oldPrice;
  const discountPct = hasDiscount ? Math.round((1 - produs.price / produs.oldPrice) * 100) : null;
  const categLabel = categorii.find(c => c.slug === produs.category)?.label || produs.category;

  const culoriCustom = optiuni?.culori?.[produs.category] || [];

  // Imaginile culorii alese daca produsul are culori, altfel galeria proprie
  // a produsului (prima = principala, restul secundare).
  const galleryImgs = galerieProdus(produs, selectedCuloare);
  const mainImg = galleryImgs[activeImgIdx] || galleryImgs[0];

  // Categoriile alese pentru produs, asa cum au fost bifate in admin. Fiecare
  // duce in catalog cu filtrul respectiv deja aplicat.
  const grupuriCategorii = [
    { titlu: "Temă", cheie: "tema", valori: produs.tema || [] },
    { titlu: "Ocazie", cheie: "ocazie", valori: produs.ocazie || [] },
  ].filter(g => g.valori.length > 0);

  const handleAddToCart = () => {
    adaugaInCos(produs, selectedCuloare, selectedMarime);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div style={{ background: "#F7F7F4", minHeight: "100vh" }}>
      <NavBar />

      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "var(--section-padding)" }} className="page-content-top">
        {/* Breadcrumb */}
        <nav style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 40, fontSize: 13, color: "#5D695F" }}>
          <Link href="/" style={{ color: "#5D695F", textDecoration: "none" }}>Acasă</Link>
          <span>›</span>
          <Link href={`/${produs.category}`} style={{ color: "#5D695F", textDecoration: "none" }}>{categLabel}</Link>
          <span>›</span>
          <span style={{ color: "#1D2820" }}>{produs.name}</span>
        </nav>

        {/* Main product layout */}
        <div className="produse-grid">
          {/* Image */}
          <div style={{ position: "sticky", top: 100 }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", overflow: "hidden", borderRadius: 16, background: "#f5f5f5" }}>
              {mainImg && (
                <img
                  src={mainImg}
                  alt={produs.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              )}
              {hasDiscount && (
                <div style={{ position: "absolute", top: 20, left: 20, background: "#dc2626", color: "#fff", fontWeight: 700, fontSize: 14, padding: "6px 14px", borderRadius: 6 }}>
                  -{discountPct}%
                </div>
              )}
            </div>
            {galleryImgs.length > 1 && (
              <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                {galleryImgs.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImgIdx(i)}
                    style={{
                      width: 68, height: 68, borderRadius: 10, overflow: "hidden", padding: 0, cursor: "pointer",
                      border: activeImgIdx === i ? "2px solid #2C662D" : "1px solid #DCE4D9", background: "none", flexShrink: 0,
                    }}
                  >
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* Tags */}
            <div style={{ display: "flex", gap: 8 }}>
              {produs.tags?.includes("produse-noi") && (
                <span style={{ background: "#2C662D", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>NOU</span>
              )}
              {hasDiscount && (
                <span style={{ background: "#dc2626", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 4, textTransform: "uppercase" }}>REDUCERE</span>
              )}
            </div>

            <div>
              <h1 style={{ fontSize: 34, fontWeight: 800, color: "#1D2820", margin: 0, letterSpacing: "-0.01em" }}>{produs.name}</h1>
              <p style={{ fontSize: 13, color: "#5D695F", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>{categLabel}</p>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: hasDiscount ? "#dc2626" : "#1D2820" }}>
                {produs.price.toLocaleString("ro-RO")} lei
              </span>
              {hasDiscount && (
                <span style={{ fontSize: 20, color: "#5D695F", textDecoration: "line-through" }}>
                  {produs.oldPrice.toLocaleString("ro-RO")} lei
                </span>
              )}
            </div>

            <p style={{ fontSize: 15, color: "#5D695F", lineHeight: 1.7, margin: 0 }}>{produs.descriere}</p>

            {/* Categoriile alese pentru produs (temă / ocazie) */}
            {grupuriCategorii.map(g => (
              <div key={g.cheie}>
                <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#1D2820", marginBottom: 12 }}>
                  {g.titlu}
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {g.valori.map(v => (
                    <Link
                      key={v}
                      href={`/produse?categorie=${produs.category}&${g.cheie}=${encodeURIComponent(v)}`}
                      style={{
                        padding: "6px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600,
                        background: "#EEF2EC", color: "#5D695F", textDecoration: "none",
                        border: "1px solid #DCE4D9",
                      }}
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
              <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#1D2820", marginBottom: 12 }}>
                Culoare: <span style={{ fontWeight: 400, color: "#5D695F" }}>{selectedCuloare || "—"}</span>
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {(produs.culori || []).map(c => {
                  const activ = selectedCuloare === c;
                  const hex = hexCuloare(c, culoriCustom);
                  const fundal = esteGradient(c) ? GRADIENT_NEGRU_ALB : hex;
                  return (
                    <button
                      key={c}
                      onClick={() => selectCuloare(c)}
                      title={c}
                      aria-label={c}
                      aria-pressed={activ}
                      style={{
                        width: 40, height: 40, borderRadius: "50%", cursor: "pointer",
                        // Fara hex cunoscut (culoare stearsa din admin) aratam
                        // tot butonul cu numele scris, ca sa ramana alegibila.
                        background: fundal || "#fff",
                        border: fundal ? "1px solid #DCE4D9" : "1px solid #5D695F",
                        // Conturul selectiei sta in afara bulinei, ca sa nu
                        // acopere culoarea in sine.
                        outline: activ ? "2px solid #2C662D" : "2px solid transparent",
                        outlineOffset: 2,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 10, fontWeight: 700, color: "#5D695F",
                        transition: "outline-color 0.2s", padding: 0,
                      }}
                    >
                      {!fundal ? c.slice(0, 3) : activ && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke={esteCuloareDeschisa(c) ? "#1D2820" : "#fff"} strokeWidth="3"
                          strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            )}

            {/* Marimi */}
            {produs.marimi?.length > 0 && <div>
              <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#1D2820", marginBottom: 12 }}>
                Mărime: <span style={{ fontWeight: 400, color: "#5D695F" }}>{selectedMarime || "—"}</span>
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {(produs.marimi || []).map(m => (
                  <button key={m} onClick={() => setSelectedMarime(m)} style={{
                    width: 52, height: 52, border: selectedMarime === m ? "2px solid #2C662D" : "1px solid #DCE4D9",
                    background: selectedMarime === m ? "#2C662D" : "#fff", color: selectedMarime === m ? "#fff" : "#5D695F",
                    fontSize: 14, fontWeight: 600, borderRadius: 8, cursor: "pointer", transition: "all 0.2s"
                  }}>{m}</button>
                ))}
              </div>
            </div>}

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              style={{
                width: "100%", padding: "18px 0", background: addedToCart ? "#16a34a" : "#2C662D",
                color: "#fff", fontSize: 15, fontWeight: 800, textTransform: "uppercase",
                letterSpacing: "0.15em", border: "none", borderRadius: 10, cursor: "pointer",
                transition: "background 0.3s"
              }}
            >
              {addedToCart ? "✓ Adăugat în coș!" : "Adaugă în coș"}
            </button>

            {/* Features */}
            <div style={{ borderTop: "1px solid #DCE4D9", paddingTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
              {["Livrare gratuită peste 500 lei", "Returnare gratuită în 30 de zile", "Garanție autenticitate Paradox Craft"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#5D695F" }}>
                  <span style={{ fontSize: 16 }}>✓</span> {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recenzii produs */}
        {recenzii.length > 0 && (
          <div style={{ marginTop: 96 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: "#1D2820", marginBottom: 32 }}>
              Recenzii
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
              {recenzii.map(r => (
                <div key={r.id} style={{ background: "#fff", border: "1px solid #DCE4D9", borderRadius: 14, padding: 20 }}>
                  <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "center" }}>
                    {r.avatar && <img src={r.avatar} alt="" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />}
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, color: "#1D2820", fontSize: 14 }}>{r.nume}</p>
                      <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} width={13} height={13} viewBox="0 0 24 24" fill={i < (r.rating || 5) ? "#D5B358" : "#e8e4de"}>
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p style={{ margin: 0, color: "#5D695F", fontSize: 14, fontStyle: "italic", lineHeight: 1.6 }}>"{r.text}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ produs */}
        {faq.length > 0 && (
          <div style={{ marginTop: 96, maxWidth: 800 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: "#1D2820", marginBottom: 32 }}>
              Întrebări frecvente
            </h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {faq.map((f, i) => (
                <div key={f.id} style={{ borderBottom: "1px solid #DCE4D9" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 4px", gap: 16, textAlign: "left" }}
                  >
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#1D2820", lineHeight: 1.4 }}>{f.intrebare}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D5B358" strokeWidth={2.5} strokeLinecap="round" style={{ flexShrink: 0, transition: "transform 0.3s ease", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                  <div style={{ overflow: "hidden", maxHeight: openFaq === i ? 400 : 0, transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
                    <p style={{ fontSize: 14, color: "#5D695F", lineHeight: 1.7, margin: "0 4px 18px" }}>{f.raspuns}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar products */}
        {similare.length > 0 && (
          <div style={{ marginTop: 96 }}>
            <h2 className="similare-heading" style={{ fontSize: 22, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: "#1D2820", marginBottom: 40 }}>
              Produse Similare
            </h2>
            <div className="similare-grid">
              {similare.map(p => <ProdusCard key={p.id} produs={p} />)}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
