"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCos } from "../context/CosContext";

function CosDrawer({ open, onClose }) {
  const { cos, stergeItem, actualizeazaCantitate, total, numarArticole } = useCos();
  return (
    <>
      {open && (
        <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 200 }} />
      )}
      <div style={{
        position: "fixed", top: 0, right: 0, height: "100vh", width: 560, maxWidth: "95vw",
        background: "#fff", zIndex: 201, boxShadow: "-4px 0 32px rgba(0,0,0,0.15)",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #DCE4D9" }}>
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "0.04em" }}>Coșul tău ({numarArticole})</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1D2820" strokeWidth={2}><path strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {cos.length === 0 ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, paddingTop: 80 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="#ccc" strokeWidth={1.2}>
                <path strokeLinecap="round" d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path strokeLinecap="round" d="M3 6h18"/><path strokeLinecap="round" d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p style={{ color: "#5D695F", fontSize: 15, textAlign: "center", margin: 0 }}>Coșul tău este gol.</p>
            </div>
          ) : cos.map(item => (
            <div key={item.key} style={{ display: "flex", gap: 14, alignItems: "flex-start", borderBottom: "1px solid #f5f5f5", paddingBottom: 16 }}>
              <img src={item.produs.img} alt={item.produs.name} style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8, background: "#f5f5f5", flexShrink: 0 }} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: "#1D2820" }}>{item.produs.name}</p>
                {item.culoare && <p style={{ margin: 0, fontSize: 12, color: "#5D695F" }}>Culoare: {item.culoare}</p>}
                {item.marime && <p style={{ margin: 0, fontSize: 12, color: "#5D695F" }}>Mărime: {item.marime}</p>}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid #DCE4D9", borderRadius: 6, overflow: "hidden" }}>
                    <button onClick={() => actualizeazaCantitate(item.key, item.cantitate - 1)} style={{ width: 28, height: 28, background: "none", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 700, color: "#1D2820" }}>−</button>
                    <span style={{ padding: "0 10px", fontSize: 14, fontWeight: 600 }}>{item.cantitate}</span>
                    <button onClick={() => actualizeazaCantitate(item.key, item.cantitate + 1)} style={{ width: 28, height: 28, background: "none", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 700, color: "#1D2820" }}>+</button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: "#1D2820" }}>{(item.produs.price * item.cantitate).toLocaleString("ro-RO")} lei</span>
                    <button onClick={() => stergeItem(item.key)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5D695F", padding: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cos.length > 0 && (
          <div style={{ padding: "20px 24px", borderTop: "1px solid #DCE4D9", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16 }}>
              <span>Total</span>
              <span>{total.toLocaleString("ro-RO")} lei</span>
            </div>
            <Link href="/cos" onClick={onClose} style={{ display: "block", background: "#2C662D", color: "#fff", padding: "14px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none", textAlign: "center", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Finalizează comanda
            </Link>
          </div>
        )}
        {cos.length === 0 && (
          <div style={{ padding: "20px 24px", borderTop: "1px solid #DCE4D9" }}>
            <Link href="/" onClick={onClose} style={{ display: "block", background: "#2C662D", color: "#fff", padding: "14px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none", textAlign: "center", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Continuă cumpărăturile
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

const navLinks = [
  {
    label: "Pușculițe",
    href: "/pusculate",
    subcategorii: [
      { label: "Pentru ia", href: "/pusculate?categorie=pentru-ia" },
      { label: "Pentru el", href: "/pusculate?categorie=pentru-el" },
      { label: "Zile de naștere", href: "/pusculate?categorie=zile-de-nastere" },
      { label: "Pentru copii", href: "/pusculate?categorie=pentru-copii" },
      { label: "Primăvară", href: "/pusculate?categorie=primavara" },
      { label: "Valentine Day", href: "/pusculate?categorie=valentine-day" },
      { label: "Zile speciale", href: "/pusculate?categorie=zile-speciale" },
    ],
  },
  {
    label: "Stative",
    href: "/stative",
    subcategorii: [
      { label: "Pentru ia", href: "/stative?categorie=pentru-ia" },
      { label: "Pentru el", href: "/stative?categorie=pentru-el" },
      { label: "Zile de naștere", href: "/stative?categorie=zile-de-nastere" },
      { label: "Pentru copii", href: "/stative?categorie=pentru-copii" },
      { label: "Primăvară", href: "/stative?categorie=primavara" },
      { label: "Valentine Day", href: "/stative?categorie=valentine-day" },
      { label: "Zile speciale", href: "/stative?categorie=zile-speciale" },
    ],
  },
  { label: "Best Seller", href: "/populare" },
  { label: "Reduceri", href: "/reduceri", badge: "SALE" },
  { label: "Despre Noi", href: "/despre-noi" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [cosOpen, setCosOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [produse, setProduse] = useState([]);
  const [navHeight, setNavHeight] = useState(68);
  const [isAdmin, setIsAdmin] = useState(false);
  const navRef = useRef(null);
  const { numarArticole } = useCos();

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem("adminLoggedIn"));
    const onStorage = () => setIsAdmin(!!localStorage.getItem("adminLoggedIn"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    fetch("/api/produse").then(r => r.json()).then(setProduse).catch(() => {});
  }, []);

  useEffect(() => {
    if (navRef.current) setNavHeight(navRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setAtTop(y === 0);
      if (y !== lastY) {
        setMenuOpen(false);
        lastY = y;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on scroll handled above

  const navBg = "#EEF2EC";
  const color = "#1D2820";

  return (
    <>
    <CosDrawer open={cosOpen} onClose={() => setCosOpen(false)} />

    {/* Mobile menu dropdown — appears below navbar */}
    {menuOpen && (
      <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 98, pointerEvents: "auto" }} />
    )}

    {!atTop && <div style={{ height: navHeight }} aria-hidden="true" />}

    <nav
      ref={navRef}
      style={{
        position: atTop ? "relative" : "fixed",
        top: atTop ? "auto" : 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        background: navBg,
        boxShadow: atTop ? "none" : "0 2px 12px rgba(0,0,0,0.08)",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseLeave={() => setActiveDropdown(null)}
    >
        <div className="nav-height" style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", outline: "none", border: "none" }}>
          <Image src="/paradox-craft-logo.png" alt="Paradox Craft" width={168} height={53} className="nav-logo-img" style={{ objectFit: "contain", display: "block", width: "auto", height: 44 }} priority />
        </Link>

        {/* Desktop nav links */}
        <ul className="nav-links" style={{ alignItems: "center", gap: 18, listStyle: "none", margin: 0, padding: 0 }}>
          {navLinks.map((link) => (
            <li key={link.href} style={{ position: "relative" }}
              onMouseEnter={() => setActiveDropdown(link.subcategorii ? link.href : null)}
            >
              <Link href={link.href} style={{ textDecoration: "none", fontSize: 12, fontWeight: 600, color: link.href === "/reduceri" ? "#e03c2f" : color, textTransform: "uppercase", letterSpacing: "0.04em", transition: "color 0.3s", display: "flex", alignItems: "center", gap: 5 }}>
                {link.label}
                {link.badge && (
                  <span style={{
                    fontSize: 10, fontWeight: 800, lineHeight: 1,
                    background: link.href === "/reduceri" ? "#e03c2f" : "#2C662D",
                    color: "#fff",
                    borderRadius: 999,
                    padding: "2px 6px",
                    letterSpacing: "0.04em",
                  }}>{link.badge}</span>
                )}
                {link.subcategorii && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                    style={{ transition: "transform 0.25s", transform: activeDropdown === link.href ? "rotate(180deg)" : "rotate(0deg)" }}
                  ><path d="M6 9l6 6 6-6"/></svg>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Admin Panel button — only visible when logged in as admin */}
          {isAdmin && (
            <Link href="/admin" className="nav-links" style={{
              fontSize: 11, fontWeight: 800, color: "#fff", background: "#2C662D",
              padding: "5px 13px", borderRadius: 6, textDecoration: "none",
              letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap",
            }}>Admin Panel</Link>
          )}
          {/* Desktop icons */}
          <Link href="/cautare" className="nav-icon-desktop nav-links" style={{ color, display: "flex", alignItems: "center", transition: "color 0.3s" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="11" cy="11" r="7"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/></svg>
          </Link>
          <Link href="/favorite" className="nav-icon-desktop nav-links" style={{ color, display: "flex", alignItems: "center", transition: "color 0.3s" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </Link>
          <button onClick={() => setCosOpen(true)} style={{ color, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", position: "relative", padding: 0 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path strokeLinecap="round" d="M3 6h18"/><path strokeLinecap="round" d="M16 10a4 4 0 01-8 0"/></svg>
            <span style={{ position: "absolute", top: -4, right: -4, background: "#2C662D", color: "#fff", fontSize: 10, width: 16, height: 16, borderRadius: "50%", display: numarArticole > 0 ? "flex" : "none", alignItems: "center", justifyContent: "center" }}>{numarArticole}</span>
          </button>
          {/* Hamburger / Close */}
          <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, position: "relative" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D2820" strokeWidth={2.2} strokeLinecap="round" style={{ position: "absolute", transition: "opacity 0.25s, transform 0.25s", opacity: menuOpen ? 0 : 1, transform: menuOpen ? "rotate(90deg) scale(0.7)" : "rotate(0deg) scale(1)" }}>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D2820" strokeWidth={2.2} strokeLinecap="round" style={{ position: "absolute", transition: "opacity 0.25s, transform 0.25s", opacity: menuOpen ? 1 : 0, transform: menuOpen ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.7)" }}>
              <line x1="4" y1="4" x2="20" y2="20"/>
              <line x1="20" y1="4" x2="4" y2="20"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mega dropdown panel */}
      {navLinks.map(link => link.subcategorii && (
        <div key={link.href} style={{
          position: "absolute", top: "100%", left: 0, width: "100%",
          background: "#fff",
          boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
          borderTop: "1px solid #EEF2EC",
          zIndex: 99,
          overflow: "hidden",
          maxHeight: activeDropdown === link.href ? 500 : 0,
          opacity: activeDropdown === link.href ? 1 : 0,
          transform: activeDropdown === link.href ? "translateY(0)" : "translateY(-8px)",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease, transform 0.25s ease",
          pointerEvents: activeDropdown === link.href ? "auto" : "none",
        }}
          onMouseEnter={() => setActiveDropdown(link.href)}
        >
          <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "28px 16px 32px" }}>
            {/* Subcategories row */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", paddingBottom: 20, marginBottom: 24, borderBottom: "1px solid #EEF2EC" }}>
              <Link href={link.href} onClick={() => setActiveDropdown(null)}
                style={{ padding: "6px 16px", borderRadius: 999, fontSize: 12, fontWeight: 700, background: "#2C662D", color: "#fff", textDecoration: "none", whiteSpace: "nowrap" }}
              >Toate</Link>
              {link.subcategorii.map(sub => (
                <Link key={sub.href} href={sub.href} onClick={() => setActiveDropdown(null)}
                  style={{ padding: "6px 16px", borderRadius: 999, fontSize: 12, fontWeight: 700, background: "#EEF2EC", color: "#2C662D", textDecoration: "none", whiteSpace: "nowrap", transition: "background 0.2s, color 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#214F27"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#EEF2EC"; e.currentTarget.style.color = "#2C662D"; }}
                >{sub.label}</Link>
              ))}
            </div>
            {/* Products row */}
            <div style={{ display: "flex", gap: 20, overflowX: "auto", paddingBottom: 4 }}>
              {produse.filter(p => p.category === link.href.replace("/", "")).slice(0, 7).map(p => (
                <Link key={p.id} href={`/produse/${p.id}`} onClick={() => setActiveDropdown(null)}
                  style={{ textDecoration: "none", color: "#1D2820", flexShrink: 0, width: 140 }}
                  onMouseEnter={e => e.currentTarget.querySelector("img").style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.querySelector("img").style.transform = "scale(1)"}
                >
                  <div style={{ width: 140, height: 140, borderRadius: 10, overflow: "hidden", background: "#EEF2EC", marginBottom: 9 }}>
                    <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease" }} />
                  </div>
                  <p style={{ margin: "0 0 3px", fontSize: 12, fontWeight: 700, lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</p>
                  <p style={{ margin: 0, fontSize: 12, color: "#5D695F" }}>{p.price} lei</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Mobile dropdown menu */}
      <div style={{
        position: "absolute", top: "100%", left: 0, right: 0,
        background: navBg,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        overflow: "hidden",
        maxHeight: menuOpen ? "80vh" : "0",
        overflowY: menuOpen ? "auto" : "hidden",
        transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
        zIndex: 99,
      }}>
        <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              style={{ textDecoration: "none", fontSize: 17, fontWeight: 700, color: "#1D2820", textTransform: "uppercase", letterSpacing: "0.08em", padding: "12px 0", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "block" }}>
              {link.label}
              {link.badge && <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 800, background: link.href === "/reduceri" ? "#e03c2f" : "#2C662D", color: "#fff", padding: "2px 7px", borderRadius: 4, verticalAlign: "middle" }}>{link.badge}</span>}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin" onClick={() => setMenuOpen(false)}
              style={{ textDecoration: "none", fontSize: 17, fontWeight: 800, color: "#fff", background: "#2C662D", textTransform: "uppercase", letterSpacing: "0.08em", padding: "12px 16px", borderRadius: 8, display: "block", textAlign: "center", margin: "8px 0 4px" }}>
              Admin Panel
            </Link>
          )}
          <div style={{ display: "flex", gap: 20, paddingTop: 16, paddingBottom: 8 }}>
            <Link href="/cautare" onClick={() => setMenuOpen(false)} style={{ color: "#1D2820", display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="11" cy="11" r="7"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/></svg>
              Caută
            </Link>
            <Link href="/favorite" onClick={() => setMenuOpen(false)} style={{ color: "#1D2820", display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              Favorite
            </Link>
            <button onClick={() => { setMenuOpen(false); setCosOpen(true); }} style={{ color: "#1D2820", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, padding: 0, position: "relative" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path strokeLinecap="round" d="M3 6h18"/><path strokeLinecap="round" d="M16 10a4 4 0 01-8 0"/></svg>
              Coș {numarArticole > 0 && `(${numarArticole})`}
            </button>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}
