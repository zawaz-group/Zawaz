"use client";
import { useState, useEffect, useRef } from "react";

const TESTIMONIALE_FALLBACK = [
  {
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
    nume: "Anne Z.",
    text: "Arată în viață mult mai bine decât pe site! Calitate superioară a execuției.",
  },
  {
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=face",
    nume: "Andrei M.",
    text: "Cadou cumpărat pentru nuntă. Mă gândesc deja să îl cumpăr și pentru mine.",
  },
  {
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
    nume: "Maria D.",
    text: "Arată exact ca în poze, calitate excepțională. Livrare rapidă și ambalaj îngrijit!",
  },
  {
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    nume: "Radu P.",
    text: "Am luat două bucăți. Ambele perfecte. Design elegant și foarte stabile.",
  },
  {
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face",
    nume: "Ioana S.",
    text: "Minunat! L-am cumpărat cadou de Crăciun și a fost o surpriză perfectă!",
  },
  {
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    nume: "Dan F.",
    text: "Exact ceea ce căutam! Produs de calitate înaltă. Livrat în 2 zile.",
  },
];

function Stars({ active = true }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width={14} height={14} viewBox="0 0 24 24" fill={active ? "#D5B358" : "#ddd"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Recenzii() {
  const [testimoniale, setTestimoniale] = useState(TESTIMONIALE_FALLBACK);
  const [slide, setSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const TOTAL = testimoniale.length;
  const INTERVAL = 4000;

  useEffect(() => {
    fetch("/api/recenzii").then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setTestimoniale(data);
        setSlide(0);
      }
    }).catch(() => {});
  }, []);
  const progressRef = useRef(null);
  const startRef = useRef(null);

  const prev = () => { setSlide(s => (s - 1 + TOTAL) % TOTAL); setProgress(0); };
  const next = () => { setSlide(s => (s + 1) % TOTAL); setProgress(0); };

  useEffect(() => {
    setProgress(0);
    startRef.current = performance.now();

    const animate = (now) => {
      const elapsed = now - startRef.current;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        progressRef.current = requestAnimationFrame(animate);
      } else {
        setSlide(s => (s + 1) % TOTAL);
        setProgress(0);
        startRef.current = performance.now();
        progressRef.current = requestAnimationFrame(animate);
      }
    };

    progressRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(progressRef.current);
  }, [slide, TOTAL]);

  const activeIdx = slide;
  const nextIdx = (slide + 1) % TOTAL;

  return (
    <section style={{ background: "#EEF2EC", padding: "60px 0" }}>
      <div style={{
        maxWidth: 1300,
        margin: "0 auto",
        padding: "0 clamp(16px, 4vw, 64px)",
        display: "grid",
        gridTemplateColumns: "minmax(300px, 460px) 1fr",
        gap: "clamp(40px, 5vw, 80px)",
        alignItems: "center",
      }} className="recenzii-grid">

        {/* ── LEFT: TikTok card ── */}
        <div className="recenzii-card" style={{
          borderRadius: 28,
          overflow: "hidden",
          background: "#fff",
          width: "100%",
          height: 620,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 6px 36px rgba(0,0,0,0.09)",
          flexShrink: 0,
        }}>
          {/* VIDEO top 68% */}
          <div style={{ flex: "0 0 68%", position: "relative", overflow: "hidden" }}>
            <video
              src="/Cztery-ezgif.com-resize-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {/* top shadow */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, transparent 45%)" }} />
            {/* bottom fade to white */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(to bottom, transparent 0%, #fff 100%)" }} />

            {/* Top-left text */}
            <div style={{ position: "absolute", top: 20, left: 18, right: 52, zIndex: 2 }}>
              <p style={{
                color: "#fff",
                fontSize: "clamp(14px, 1.5vw, 19px)",
                fontWeight: 800,
                lineHeight: 1.35,
                margin: 0,
                textShadow: "0 1px 8px rgba(0,0,0,0.5)",
                fontFamily: "Inter, system-ui, sans-serif",
              }}>
                Da! Acesta este hit-ul<br />care îl știi din{" "}
                <span style={{ color: "#ee1d52" }}>Tik</span><span style={{ color: "#69c9d0" }}>Tok</span>
              </p>
            </div>

            {/* Top-right icon buttons */}
            <div style={{ position: "absolute", top: 14, right: 12, zIndex: 2, display: "flex", flexDirection: "column", gap: 7 }}>
              {[
                <path key="a" d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>,
                <path key="b" d="M5 3l14 0a2 2 0 0 1 2 2l0 14a2 2 0 0 1-2 2l-14 0a2 2 0 0 1-2-2l0-14a2 2 0 0 1 2-2" fill="none" stroke="white" strokeWidth="2"/>,
              ].map((icon, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="white">{icon}</svg>
                </div>
              ))}
            </div>
          </div>

          {/* WHITE BOTTOM 32% */}
          <div className="recenzii-card-bottom" style={{
            flex: "0 0 32%",
            background: "#fff",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 26px 20px",
            overflow: "hidden",
          }}>
            {/* decorative line */}
            <div style={{
              width: 48, height: 3, borderRadius: 999,
              background: "linear-gradient(90deg, #e8ddd0, #c9b99a)",
              marginBottom: 14,
            }} />

            <div style={{
              fontSize: "clamp(60px, 16vw, 120px)",
              fontWeight: 900,
              color: "#ddd0bf",
              lineHeight: 1,
              letterSpacing: "-0.06em",
              userSelect: "none",
              fontFamily: "Inter, system-ui, sans-serif",
            }}>12</div>

            <p style={{
              color: "#1D2820",
              fontSize: "clamp(14px, 2vw, 20px)",
              fontWeight: 700,
              margin: "4px 0 0",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              textAlign: "center",
              fontFamily: "Inter, system-ui, sans-serif",
            }}>
              Milioane vizualizări
            </p>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="recenzii-right" style={{ display: "flex", flexDirection: "column" }}>

          {/* Title */}
          <h2 style={{
            fontSize: "clamp(28px, 3.2vw, 44px)",
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#1D2820",
            margin: "0 0 24px",
            letterSpacing: "-0.03em",
            letterSpacing: "-0.03em",
            fontFamily: "Inter, system-ui, sans-serif",
            maxWidth: 400,
          }}>
            Sute de opinii<br />pozitive online
          </h2>

          {/* Social logos faded */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 12px", marginBottom: 38, maxWidth: 300 }}>
            <span style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 900, color: "rgba(0,0,0,0.11)", lineHeight: 1.5, fontFamily: "Arial, sans-serif" }}>Google</span>
            <span style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 900, color: "rgba(0,0,0,0.11)", lineHeight: 1.5, fontFamily: "Arial, sans-serif" }}>LinkedIn</span>
            <span style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 900, color: "rgba(0,0,0,0.11)", lineHeight: 1.5, fontFamily: "Arial, sans-serif" }}>facebook</span>
            <span style={{ fontSize: "clamp(16px, 1.7vw, 22px)", fontWeight: 900, color: "rgba(0,0,0,0.11)", lineHeight: 1.5, fontFamily: "Arial, sans-serif", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ display: "inline-block", background: "rgba(0,0,0,0.09)", borderRadius: 3, width: "0.8em", height: "0.8em", flexShrink: 0 }} />
              YouTube
            </span>
          </div>

          {/* Reviews — active + faded next */}
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginBottom: 36 }}>
            {[activeIdx, nextIdx].map((idx, pos) => {
              const r = testimoniale[idx];
              const isActive = pos === 0;
              return (
                <div key={idx} className="recenzii-review-item" style={{
                  display: "grid",
                  gridTemplateColumns: "48px 1fr",
                  gap: "0 14px",
                  opacity: isActive ? 1 : 0.22,
                  transition: "opacity 0.4s ease",
                }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, paddingTop: 2 }}>
                    <img
                      src={r.avatar}
                      alt={r.nume}
                      style={{
                        width: "clamp(46px, 12vw, 54px)",
                        height: "clamp(46px, 12vw, 54px)",
                        borderRadius: "50%",
                        objectFit: "cover",
                        filter: isActive ? "none" : "grayscale(60%)",
                      }}
                    />
                    <Stars active={isActive} />
                    <p style={{ margin: 0, fontSize: "clamp(11px, 2.8vw, 12px)", fontWeight: 700, color: isActive ? "#1D2820" : "#DCE4D9", textAlign: "center", lineHeight: 1.2, fontFamily: "Inter, system-ui, sans-serif" }}>{r.nume}</p>
                  </div>
                  <p style={{
                    margin: 0,
                    paddingTop: 4,
                    fontSize: "clamp(15px, 1.3vw, 16px)",
                    fontStyle: "italic",
                    color: isActive ? "#5D695F" : "#DCE4D9",
                    lineHeight: 1.7,
                    fontFamily: "Georgia, 'Times New Roman', serif",
                  }}>
                    {r.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Slider nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={prev}
              style={{ width: 42, height: 42, borderRadius: "50%", border: "1.5px solid #DCE4D9", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#5D695F", fontSize: 18, transition: "all 0.2s", flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.background = "#214F27"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#214F27"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#5D695F"; e.currentTarget.style.borderColor = "#DCE4D9"; }}
            >&#8249;</button>

            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              {testimoniale.map((_, i) => (
                <div
                  key={i}
                  onClick={() => { setSlide(i); setProgress(0); }}
                  style={{
                    width: slide === i ? 26 : 6,
                    height: 6,
                    borderRadius: 999,
                    background: slide === i ? "#1D2820" : "#DCE4D9",
                    cursor: "pointer",
                    transition: "width 0.3s ease, background 0.3s ease",
                    opacity: slide === i ? 1 : 0.45,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {slide === i && (
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 999,
                      background: "linear-gradient(90deg, #5D695F 0%, #5D695F " + progress + "%, #1D2820 " + progress + "%)",
                    }} />
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={next}
              style={{ width: 42, height: 42, borderRadius: "50%", border: "1.5px solid #DCE4D9", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#5D695F", fontSize: 18, transition: "all 0.2s", flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.background = "#214F27"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#214F27"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#5D695F"; e.currentTarget.style.borderColor = "#DCE4D9"; }}
            >&#8250;</button>
          </div>

        </div>
      </div>
    </section>
  );
}