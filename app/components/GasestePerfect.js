"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { slugify } from "../lib/utils";

const CULORI_OPTIONS = [
  "Alb", "Albastru", "Auriu", "Galben", "Gri",
  "Maro", "Negru", "Negru-Alb", "Portocaliu", "Roz", "Roșu", "Verde", "Violet",
];

// Map color names to CSS colors
const COLOR_MAP = {
  "Alb": "#f5f5f5",
  "Albastru": "#42a5f5",
  "Auriu": "#ffd700",
  "Galben": "#ffee58",
  "Gri": "#9e9e9e",
  "Maro": "#8d6e63",
  "Negru": "#1a1a1a",
  "Negru-Alb": "linear-gradient(135deg, #1a1a1a 50%, #f5f5f5 50%)",
  "Portocaliu": "#ffa726",
  "Roz": "#f48fb1",
  "Roșu": "#ef5350",
  "Verde": "#66bb6a",
  "Violet": "#9c27b0",
};

const TEME_OPTIONS = [
  "AI", "Animale", "Automotive", "Basme", "Călătorii",
  "Creează-ți propriul", "Haios", "Jocuri", "Nuntă",
  "Ocazii speciale", "Orașe", "Peisaje", "Plante", "Sport", "Vacanță",
];

const TEMA_ICONS = {};
const OCAZII_OPTIONS = [
  "Aniversare", "Calendar", "Comuniune Sfântă", "Nuntă",
  "Pentru copii", "Pentru ea", "Pentru el",
  "Ziua Băiatului", "Ziua Copilului", "Ziua de naștere",
  "Ziua Femeii", "Ziua Îndrăgostiților", "Ziua Mamei", "Ziua Profesorului", "Ziua Tatălui",
];

const OCAZIE_ICONS = {};

const TYPE_LABELS = { culoare: "După culoare:", tema: "După motiv:", ocazie: "După circumstanțe:" };

function FilterDropdown({ options, onSelect, onClose, type }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 20,
        boxShadow: "0 16px 60px rgba(0,0,0,0.25)",
        padding: "28px 32px 24px", minWidth: 220,
      }}>
        <p style={{ margin: "0 0 16px", fontWeight: 700, fontSize: 18, color: "#1D2820" }}>
          {TYPE_LABELS[type]}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {options.map((opt) => (
            <button key={opt} onClick={() => onSelect(opt)} style={{
              background: "none", border: "none", cursor: "pointer",
              textAlign: "left", fontSize: 16, fontWeight: 500,
              color: "#D5B358", padding: 0, lineHeight: 1.4,
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#BE963D"}
              onMouseLeave={e => e.currentTarget.style.color = "#D5B358"}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

function GasesteCard({ title, desc, btn, icon, type, options, accentColor }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const router = useRouter();
  const isAccent = !!accentColor;

  const handleClose = () => setOpen(false);
  const handleSelect = (val) => { handleClose(); router.push(`/${type}/${slugify(val)}`, { scroll: false }); };

  return (
    <div className="gaseste-card" style={{
      background: accentColor || "#fff", borderRadius: 20, padding: "28px 24px 24px",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      minHeight: 280, position: "relative", overflow: "visible",
      boxShadow: isAccent ? "0 8px 32px rgba(245,166,35,0.3)" : "0 2px 16px rgba(0,0,0,0.06)",
      transition: "transform 0.25s ease, box-shadow 0.25s ease",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = isAccent ? "0 16px 40px rgba(245,166,35,0.4)" : "0 12px 32px rgba(0,0,0,0.12)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = isAccent ? "0 8px 32px rgba(245,166,35,0.3)" : "0 2px 16px rgba(0,0,0,0.06)"; }}
    >
      <div style={{ position: "absolute", top: 16, right: 16 }}>{icon}</div>
      <div style={{ flex: 1, paddingRight: 120 }}>
        <h3 style={{ fontSize: "clamp(17px, 1.5vw, 22px)", fontWeight: 800, color: isAccent ? "#fff" : "#1D2820", margin: "0 0 10px", lineHeight: 1.2, whiteSpace: "pre-line" }}>{title}</h3>
        <p style={{ fontSize: 14, color: isAccent ? "rgba(255,255,255,0.85)" : "#5D695F", margin: 0, lineHeight: 1.5 }}>{desc}</p>
      </div>
      <div style={{ marginTop: 24 }}>
        {isAccent ? (
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", padding: "8px 20px", borderRadius: 999, background: "#c0392b", color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>{btn}</Link>
        ) : (
          <>
            <button ref={btnRef} className="gaseste-btn" onClick={() => setOpen(o => !o)} style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 999,
              border: "1.5px solid " + (open ? "#2C662D" : "#DCE4D9"), background: open ? "#2C662D" : "transparent",
              color: open ? "#fff" : "#5D695F", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
            }}>
              {btn}
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}><path d="M6 9l6 6 6-6"/></svg>
            </button>
            {open && <FilterDropdown options={options} onSelect={handleSelect} onClose={handleClose} type={type} />}
          </>
        )}
      </div>
    </div>
  );
}

export default function GasestePerfect() {
  const culori = CULORI_OPTIONS;
  const teme = TEME_OPTIONS;
  const ocazii = OCAZII_OPTIONS;

  const colorIcon = (
    <div style={{ width: 92, height: 92, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 5 }}>
      {culori.map(c => {
        const bg = COLOR_MAP[c] || "#ccc";
        const isGrad = bg.startsWith("linear-gradient");
        return <span key={c} title={c} style={{ width: 24, height: 24, borderRadius: "50%", background: isGrad ? bg : undefined, backgroundColor: isGrad ? undefined : bg, border: c === "Alb" ? "1.5px solid #DCE4D9" : "none", display: "inline-block", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }} />;
      })}
    </div>
  );

  const temaIcon = (
    <div style={{ width: 92, height: 92, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 80 80" width={92} height={92}>
        <rect x="8" y="18" width="64" height="48" rx="8" fill="url(#igr)"/>
        <defs><linearGradient id="igr" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#74b9ff"/><stop offset="100%" stopColor="#0984e3"/></linearGradient></defs>
        <circle cx="26" cy="34" r="8" fill="#fdcb6e"/>
        <path d="M8 52l18-16 14 12 10-8 18 14" fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round"/>
        <rect x="52" y="8" width="22" height="18" rx="4" fill="#ff7675" transform="rotate(-15 63 17)"/>
      </svg>
    </div>
  );

  const ocazieIcon = (
    <div style={{ width: 92, height: 92, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 80 80" width={92} height={92}>
        <ellipse cx="36" cy="58" rx="22" ry="8" fill="#b2bec3" opacity="0.3"/>
        <path d="M14 52 L28 20 L50 20 L64 52 Z" fill="url(#mgr)"/>
        <defs><linearGradient id="mgr" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f5f6fa"/><stop offset="100%" stopColor="#dcdde1"/></linearGradient></defs>
        <rect x="28" y="50" width="8" height="18" rx="4" fill="#636e72"/>
        <circle cx="60" cy="14" r="6" fill="#fd79a8"/>
        <circle cx="72" cy="22" r="4" fill="#fdcb6e"/>
        <circle cx="66" cy="28" r="3" fill="#6c5ce7"/>
      </svg>
    </div>
  );

  const customIcon = (
    <div style={{ width: 92, height: 92, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 80 80" width={92} height={92}>
        <ellipse cx="40" cy="60" rx="20" ry="16" fill="#ff7043"/>
        <circle cx="40" cy="32" r="16" fill="#ffccbc"/>
        <ellipse cx="40" cy="18" rx="14" ry="5" fill="#ff5722"/>
        <rect x="32" y="10" width="16" height="10" rx="4" fill="#ff7043"/>
        <rect x="24" y="50" width="22" height="16" rx="4" fill="#37474f"/>
        <circle cx="35" cy="58" r="5" fill="#546e7a"/>
        <circle cx="35" cy="58" r="3" fill="#263238"/>
      </svg>
    </div>
  );

  return (
    <section style={{ background: "#EEF2EC", padding: "clamp(48px, 8vw, 80px) 0 clamp(48px, 8vw, 100px)" }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 900, color: "#1D2820", margin: "0 0 clamp(24px, 4vw, 48px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
          Găsiți modelul perfect
        </h2>
        <div className="gaseste-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <GasesteCard title={"Găsi\ndupă culoare"} desc="Potriviți-vă la culoarea interiorului" btn="+ Selectați culoarea" icon={colorIcon} type="culoare" options={culori} />
          <GasesteCard title={"Găsi\ndupă motiv"} desc="Potrivește-te obiectivului tău" btn="+ Selectați o temă" icon={temaIcon} type="tema" options={teme} />
          <GasesteCard title={"Găsi\ndupă circumstanțe"} desc="Alege ca un cadou" btn="+ Alege o oportunitate" icon={ocazieIcon} type="ocazie" options={ocazii} />
          <GasesteCard title={"Proprie\nmodel?"} desc="70×50 cm" btn="Design" icon={customIcon} type="contact" options={[]} accentColor="#D5B358" />
        </div>
      </div>
    </section>
  );
}
