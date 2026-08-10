"use client";
import Link from "next/link";

const categorii = [
  {
    label: "Stative Desktop",
    descriere: "Suporturi ergonomice pentru birou — stabilitate și design elegant pentru spațiul tău de lucru.",
    img: "/648893568_18014414480666664_2387728317279334603_n.jpg",
    href: "/stative",
  },
  {
    label: "Tripoduri",
    descriere: "Trepieduri profesionale și flexibile pentru fotografie, vlogging și streaming — stabilitate maximă oriunde.",
    img: "/653684068_18070199012242558_3155586751005660151_n.jpg",
    href: "/pusculate",
  },
];

export default function CategoriiMari() {
  return (
    <section style={{ padding: "var(--section-padding)", background: "#F7F7F4" }}>
      <div style={{ maxWidth: "var(--container-inner)", margin: "0 auto" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 48, textAlign: "center", color: "#1D2820" }}>
          Explorează Categoriile
        </h2>
        <div className="categorii-mari-grid">
          {categorii.map((cat) => (
            <Link key={cat.href} href={cat.href} style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ width: "100%", aspectRatio: "1/1", overflow: "hidden", borderRadius: 16 }}>
                <img
                  src={cat.img}
                  alt={cat.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s" }}
                  onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
              <div>
                <p style={{ fontSize: 20, fontWeight: 800, color: "#1D2820", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>{cat.label}</p>
                <p style={{ fontSize: 15, color: "#5D695F", marginTop: 8, lineHeight: 1.6 }}>{cat.descriere}</p>
                <span style={{ display: "inline-block", marginTop: 12, fontSize: 13, fontWeight: 700, color: "#1D2820", textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "2px solid #1D2820", paddingBottom: 2 }}>
                  Descoperă →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
