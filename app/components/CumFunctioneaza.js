"use client";
import { useState, useRef, useEffect } from "react";

const PASI = [
  { titlu: "Monteaza", video: "/Video%201.mp4" },
  { titlu: "Introduce monede", video: "/VIdeo%202.mp4" },
  { titlu: "Retrage banii", video: "/Video%203.mp4" },
];

export default function CumFunctioneaza() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollTo = (index) => {
    setActive(index);
    if (scrollRef.current) {
      const el = scrollRef.current;
      if (isMobile) {
        const card = el.querySelector('[data-card]');
        const cardWidth = card ? card.offsetWidth + 16 : el.offsetWidth;
        el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
      } else {
        el.scrollTo({ left: index * 524, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % PASI.length;
        if (scrollRef.current) {
          const el = scrollRef.current;
          const card = el.querySelector('[data-card]');
          const cardWidth = card ? card.offsetWidth + 16 : el.offsetWidth;
          el.scrollTo({ left: next * cardWidth, behavior: "smooth" });
        }
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const handleScroll = () => {
    if (!scrollRef.current || !isMobile) return;
    const el = scrollRef.current;
    const card = el.querySelector('[data-card]');
    const cardWidth = card ? card.offsetWidth + 16 : el.offsetWidth;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActive(Math.max(0, Math.min(idx, PASI.length - 1)));
  };

  return (
    <section style={{ background: "#EEF2EC", padding: isMobile ? "48px 0 60px" : "80px 0 100px", overflow: "hidden" }}>
      {isMobile ? (
        /* -- MOBILE LAYOUT -- */
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {/* Header */}
          <div style={{ padding: "0 clamp(20px, 5vw, 40px)", display: "flex", flexDirection: "column", gap: 14 }}>
            <h2 style={{
              fontSize: "clamp(36px, 10vw, 56px)", fontWeight: 900, lineHeight: 1.0,
              color: "#1D2820", margin: 0, letterSpacing: "-0.04em",
              fontFamily: "'Montserrat', 'Poppins', sans-serif",
            }}>Cum<br />functioneaza?</h2>
            <p style={{
              fontSize: "clamp(20px, 5vw, 30px)", fontWeight: 700, lineHeight: 1.2,
              color: "#ccc9c0", margin: 0, letterSpacing: "-0.02em",
              fontFamily: "'Montserrat', 'Poppins', sans-serif",
            }}>"Simplu si rapid!"</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" alt="Maria" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ display: "flex", gap: 2 }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#D5B358", fontSize: 16 }}>★</span>)}
              </div>
              <p style={{ fontSize: 13, color: "#5D695F", margin: 0, fontWeight: 600 }}>Maria, Chisinau</p>
            </div>
          </div>

          {/* Swipeable cards */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            style={{
              display: "flex", gap: 16, overflowX: "auto",
              scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none", paddingBottom: 8,
              margin: "0 20px",
            }}
          >
            {PASI.map((pas, i) => (
              <div data-card key={pas.titlu} style={{ flexShrink: 0, width: "calc(100vw - 40px)", scrollSnapAlign: "start", display: "flex", flexDirection: "column", gap: 10 }}>
                <h3 style={{ fontSize: 20, fontWeight: 900, color: active === i ? "#1D2820" : "#DCE4D9", margin: 0, letterSpacing: "-0.02em", transition: "color 0.3s", fontFamily: "'Montserrat', 'Poppins', sans-serif" }}>{pas.titlu}</h3>
                <div style={{ borderRadius: 20, overflow: "hidden", width: "100%", aspectRatio: "1 / 1", background: "#e8e4de", boxShadow: "0 6px 24px rgba(0,0,0,0.10)", position: "relative" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)", zIndex: 1, pointerEvents: "none" }} />
                  <video src={pas.video} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {PASI.map((_, i) => (
              <div key={i} onClick={() => scrollTo(i)} style={{ width: active === i ? 28 : 8, height: 8, borderRadius: 999, background: active === i ? "#c8c4bb" : "#DCE4D9", cursor: "pointer", transition: "all 0.35s ease" }} />
            ))}
          </div>
        </div>
      ) : (
        /* -- DESKTOP LAYOUT -- */
        <>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 48 }}>
            {/* LEFT PANEL */}
            <div style={{ flexShrink: 0, width: "50vw", display: "flex", flexDirection: "column", gap: 44, paddingTop: 8, paddingLeft: "clamp(32px, 6vw, 96px)" }}>
              <h2 style={{ fontSize: "clamp(52px, 6vw, 96px)", fontWeight: 900, lineHeight: 1.0, color: "#1D2820", margin: 0, letterSpacing: "-0.04em", fontFamily: "'Montserrat', 'Poppins', sans-serif" }}>Cum<br />functioneaza?</h2>
              <p style={{ fontSize: "clamp(28px, 3.2vw, 52px)", fontWeight: 700, lineHeight: 1.2, color: "#ccc9c0", margin: 0, letterSpacing: "-0.02em", fontFamily: "'Montserrat', 'Poppins', sans-serif" }}>"Simplu<br />si rapid!"</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", flexShrink: 0, boxShadow: "0 2px 16px rgba(0,0,0,0.14)" }}>
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" alt="Maria" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ display: "flex", gap: 3 }}>
                    {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#D5B358", fontSize: 22, lineHeight: 1 }}>★</span>)}
                  </div>
                </div>
                <p style={{ fontSize: 15, color: "#5D695F", margin: 0, fontWeight: 600, letterSpacing: "0.02em" }}>Maria, Chisinau</p>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => scrollTo((active - 1 + PASI.length) % PASI.length)} style={{ width: 56, height: 56, borderRadius: "50%", border: "none", background: "#EEF2EC", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "#5D695F", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = "#DCE4D9"; }} onMouseLeave={e => { e.currentTarget.style.background = "#EEF2EC"; }}>&#8249;</button>
                <button onClick={() => scrollTo((active + 1) % PASI.length)} style={{ width: 56, height: 56, borderRadius: "50%", border: "none", background: "#EEF2EC", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "#5D695F", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = "#DCE4D9"; }} onMouseLeave={e => { e.currentTarget.style.background = "#EEF2EC"; }}>&#8250;</button>
              </div>
            </div>

            {/* CARDS */}
            <div ref={scrollRef} style={{ display: "flex", gap: 24, alignItems: "flex-start", flex: 1, minWidth: 0, overflowX: "hidden", scrollBehavior: "smooth" }}>
              {PASI.map((pas, i) => (
                <div key={pas.titlu} onClick={() => scrollTo(i)} style={{ flexShrink: 0, width: 500, display: "flex", flexDirection: "column", gap: 16, cursor: "pointer" }}>
                  <h3 style={{ fontSize: 28, fontWeight: 900, color: active === i ? "#1D2820" : "#DCE4D9", margin: 0, lineHeight: 1.1, letterSpacing: "-0.02em", transition: "color 0.3s", fontFamily: "'Montserrat', 'Poppins', sans-serif" }}>{pas.titlu}</h3>
                  <div style={{ borderRadius: 28, overflow: "hidden", position: "relative", width: 500, height: 500, boxShadow: active === i ? "0 24px 56px rgba(0,0,0,0.16)" : "0 6px 24px rgba(0,0,0,0.07)", transition: "box-shadow 0.3s ease", background: "#e8e4de" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)", zIndex: 1, pointerEvents: "none" }} />
                    <video src={pas.video} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 48 }}>
            {PASI.map((_, i) => (
              <div key={i} onClick={() => scrollTo(i)} style={{ width: active === i ? 36 : 10, height: 10, borderRadius: 999, background: active === i ? "#c8c4bb" : "#DCE4D9", cursor: "pointer", transition: "all 0.35s ease" }} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
