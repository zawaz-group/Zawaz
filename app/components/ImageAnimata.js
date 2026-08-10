"use client";
import { useState } from "react";
import Link from "next/link";

export default function ImageAnimata() {
  const [hovered, setHovered] = useState(false);

  return (
    <section style={{ padding: "64px var(--gutter)", background: "#183A22" }}>
      <div style={{ maxWidth: "var(--container-inner)", margin: "0 auto" }} className="image-animata-row">
        {/* Animated image side */}
        <div
          className="image-animata-img"
          style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src="/649711146_18058842923678194_8771572248370298729_n.jpg"
            alt="Stative telefoane"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.7s ease",
              transform: hovered ? "scale(1.1)" : "scale(1)"
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            transition: "transform 1s ease",
            transform: hovered ? "translateX(100%)" : "translateX(-100%)",
            pointerEvents: "none"
          }} />
        </div>

        {/* Text side */}
        <div className="image-animata-text" style={{ color: "#fff", display: "flex", flexDirection: "column", gap: 24 }}>
          <p style={{ color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 11, margin: 0 }}>Filosofia noastră</p>
          <h2 style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.1, margin: 0 }}>
            Stabilitate fără compromis
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, lineHeight: 1.7, maxWidth: 420, margin: 0 }}>
            Fiecare stativ este proiectat pentru a oferi stabilitate maximă și ușurință în utilizare,
            fie că filmezi, lucrezi sau navighezi — telefonul tău e mereu în poziția perfectă.
          </p>
          <Link
            href="/despre-noi"
            style={{ display: "inline-block", border: "1px solid #fff", color: "#fff", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", padding: "14px 32px", textDecoration: "none", alignSelf: "flex-start" }}
          >
            Află mai mult
          </Link>
        </div>
      </div>
    </section>
  );
}
