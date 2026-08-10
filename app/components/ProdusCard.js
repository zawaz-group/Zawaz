"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCos } from "../context/CosContext";

export default function ProdusCard({ produs }) {
  const [favorit, setFavorit] = useState(false);
  const [adaugat, setAdaugat] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [selectedCuloare] = useState(produs.culori?.[0] || null);
  const { adaugaInCos } = useCos();
  const router = useRouter();

  const hasDiscount = !!produs.oldPrice;
  const discountAmount = hasDiscount ? produs.oldPrice - produs.price : 0;
  const discountPercent = hasDiscount ? Math.round((1 - produs.price / produs.oldPrice) * 100) : 0;
  const currentImg = (selectedCuloare && produs.imaginiCulori?.[selectedCuloare]) || produs.img;
  const esteNou = produs.tags?.includes("produse-noi");

  const specs = [selectedCuloare, produs.tema?.[0]].filter(Boolean).join(" / ");

  const handleCart = (e) => {
    e.preventDefault();
    adaugaInCos(produs, selectedCuloare, null);
    setAdaugat(true);
    setTimeout(() => setAdaugat(false), 1800);
  };

  const handleQuickBuy = (e) => {
    e.preventDefault();
    adaugaInCos(produs, selectedCuloare, null);
    router.push("/cos");
  };

  const handleFavorit = (e) => {
    e.preventDefault();
    setFavorit((f) => !f);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column", gap: 10, position: "relative",
        background: "transparent", borderRadius: 14, padding: 10,
        border: hovered ? "1px solid #DCE4D9" : "1px solid transparent",
        transition: "border-color 0.2s ease"
      }}
    >
      <Link href={`/produse/${produs.id}`} style={{ textDecoration: "none" }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", overflow: "hidden", borderRadius: 10, background: "#f5f5f5" }}>
          <img
            src={currentImg}
            alt={produs.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />

          {esteNou && (
            <span style={{ position: "absolute", top: 8, left: 8, background: "#4338ca", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Nou
            </span>
          )}
        </div>
      </Link>

      <button
        onClick={handleFavorit}
        style={{
          position: "absolute", top: 18, right: 18, width: 32, height: 32,
          background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)", zIndex: 10
        }}
        aria-label="Adaugă la favorite"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill={favorit ? "#dc2626" : "none"} stroke={favorit ? "#dc2626" : "#555"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "2px 4px 4px" }}>
        <Link href={`/produse/${produs.id}`} style={{ textDecoration: "none" }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#1D2820", margin: 0 }}>{produs.name}</p>
        </Link>

        {specs && (
          <p style={{ fontSize: 12, color: "#5D695F", margin: 0 }}>{specs}</p>
        )}

        {hasDiscount && (
          <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
            <p style={{ fontSize: 13, color: "#5D695F", textDecoration: "line-through", margin: 0 }}>
              {produs.oldPrice.toLocaleString("ro-RO")} lei
            </p>
            <span style={{ background: "#dc2626", color: "#fff", fontSize: 13, fontWeight: 800, padding: "3px 9px", borderRadius: 5, whiteSpace: "nowrap" }}>
              -{discountAmount.toLocaleString("ro-RO")} lei
            </span>
            <span style={{ background: "#fde2e2", color: "#dc2626", fontSize: 13, fontWeight: 800, padding: "3px 9px", borderRadius: 5, whiteSpace: "nowrap" }}>
              -{discountPercent}%
            </span>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <p style={{ fontSize: 24, fontWeight: 800, color: "#1D2820", margin: 0 }}>
            {produs.price.toLocaleString("ro-RO")}
          </p>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#1D2820" }}>lei</span>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          <button
            onClick={handleCart}
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
              padding: "8px 5px",
              background: adaugat ? "#16a34a" : "#2C662D",
              color: "#fff", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
              border: "none", borderRadius: 9, cursor: "pointer",
              transition: "background 0.3s"
            }}
          >
            {adaugat ? (
              "✓ Adăugat!"
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Adaugă în coș
              </>
            )}
          </button>
          <button
            onClick={handleQuickBuy}
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
              padding: "7px 5px",
              background: "#fff",
              border: "1.5px solid #1D2820", borderRadius: 9, cursor: "pointer",
              lineHeight: 1.15
            }}
          >
            <span style={{ fontSize: 12, color: "#D5B358" }}>⚡</span>
            <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#1D2820", whiteSpace: "nowrap" }}>Cumpără rapid</span>
              <span style={{ fontSize: 8, fontWeight: 400, color: "#5D695F", whiteSpace: "nowrap" }}>Într-un click</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
