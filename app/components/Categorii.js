"use client";
import Link from "next/link";

const categorii = [
  { label: "Stative", img: "/648893568_18014414480666664_2387728317279334603_n.jpg", href: "/stative" },
  { label: "Pu\u0219culi\u021be", img: "/653684068_18070199012242558_3155586751005660151_n.jpg", href: "/barbati" },
];

export default function Categorii() {
  return (
    <section style={{ padding: "var(--section-padding)", maxWidth: "var(--container)", margin: "0 auto" }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 40, textAlign: "center", color: "#111" }}>
        Categorii
      </h2>
      <div className="categorii-grid">
        {categorii.map((cat) => (
          <Link key={cat.href} href={cat.href} style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", overflow: "hidden", borderRadius: 12 }}>
              <img
                src={cat.img}
                alt={cat.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s" }}
                onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
              />
            </div>
            <span style={{ color: "#111", fontWeight: 700, fontSize: 16, textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center" }}>
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
