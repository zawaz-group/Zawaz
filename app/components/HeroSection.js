"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { escapeHtml } from "../lib/security";

// Escape any HTML first (prevents stored XSS from admin input), THEN turn the
// safe **bold** markers into <strong> tags.
function formatSubtitle(text) {
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

const SLIDES_FALLBACK = [
  {
    src: "/hero-1.png", srcMobile: "/herop.png", alt: "Hero 1",
    titlu: "Oferă un cadou\nde nota 10!\nProdusul anului\npentru toți.",
    subtitlu: "Există 1830 de motive pentru care merită să alegi produsul anului. Calitate **premium**, design **elegant** și confort **garantat**.",
    buton: "Bestsellers", butonHref: "/populare",
  },
  {
    src: "/hero-2.png", srcMobile: "/hero1+.png", alt: "Hero 2",
    titlu: "Stil & Calitate\nPentru Fiecare\nOcazie Specială.",
    subtitlu: "Descoperă colecția noastră **exclusivă**. Produse atent alese pentru un **stil desăvârșit** la prețuri accesibile.",
    buton: "Explorează", butonHref: "/produse",
  },
];
const IMG_W = 1924;
const IMG_H = 725;

export default function HeroSection() {
  const [slides, setSlides] = useState(SLIDES_FALLBACK);
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetch("/api/hero").then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setSlides(data.map(s => ({
          src: s.img, srcMobile: s.img, alt: s.alt || "",
          titlu: s.titlu || "", subtitlu: s.subtitlu || "",
          buton: s.buton || "Explorează", butonHref: s.butonHref || "/produse",
        })));
        setCurrent(0);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [slides.length, next]);

  return (
    <section style={{
      position: "relative",
      width: "100vw",
      aspectRatio: isMobile ? "9 / 16" : `${IMG_W} / ${IMG_H}`,
      overflow: "hidden",
      display: "block",
      marginLeft: "calc(-50vw + 50%)",
    }}>
      {slides.map((slide, i) => (
        <div key={slide.src} style={{
          position: "absolute", inset: 0,
          opacity: i === current ? 1 : 0,
          transition: "opacity 0.8s ease",
          pointerEvents: i === current ? "auto" : "none",
        }}>
          <Image
            src={isMobile && slide.srcMobile ? slide.srcMobile : slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* Text overlay */}
          {isMobile ? (
            /* Mobile: same look as desktop */
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start",
              paddingLeft: "clamp(20px, 7vw, 48px)",
              paddingRight: "clamp(20px, 7vw, 48px)",
              paddingTop: "clamp(24px, 8vw, 48px)",
            }}>
              {slide.titlu && (
                <h1 style={{
                  fontSize: "clamp(22px, 6.5vw, 36px)",
                  fontWeight: 900,
                  color: "#1a1008",
                  margin: "0 0 12px",
                  lineHeight: 1.15,
                  letterSpacing: "-0.025em",
                  whiteSpace: "pre-line",
                  textAlign: "left",
                }}>{slide.titlu}</h1>
              )}
              {slide.subtitlu && (
                <p style={{
                  fontSize: "clamp(12px, 3.5vw, 15px)",
                  color: "#333",
                  margin: "0 0 20px",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  textAlign: "left",
                  maxWidth: 280,
                }} dangerouslySetInnerHTML={{
                  __html: formatSubtitle(slide.subtitlu)
                }} />
              )}
              <a href={slide.butonHref || "/produse"} style={{
                display: "inline-block",
                padding: "11px 28px",
                background: "#1a1008",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                borderRadius: 999,
                textDecoration: "none",
                letterSpacing: "0.04em",
              }}>{slide.buton || "Explorează"}</a>
            </div>
          ) : (
            /* Desktop: side gradient overlay */
            <div className="hero-text-overlay" style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center",
              paddingLeft: "clamp(24px, 6vw, 100px)",
            }}>
              <div style={{ maxWidth: 480 }}>
                {slide.titlu && (
                  <h1 style={{
                    fontSize: "clamp(24px, 3.8vw, 58px)",
                    fontWeight: 900,
                    color: "#1a1008",
                    margin: "0 0 18px",
                    lineHeight: 1.12,
                    letterSpacing: "-0.02em",
                    whiteSpace: "pre-line",
                  }}>{slide.titlu}</h1>
                )}
                {slide.subtitlu && (
                  <p style={{
                    fontSize: "clamp(13px, 1.3vw, 18px)",
                    color: "#333",
                    margin: "0 0 32px",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    maxWidth: 400,
                  }} dangerouslySetInnerHTML={{
                    __html: slide.subtitlu.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  }} />
                )}
                <a href={slide.butonHref || "/produse"} style={{
                  display: "inline-block",
                  padding: "13px 34px",
                  background: "#1a1008",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "clamp(13px, 1.1vw, 15px)",
                  borderRadius: 999,
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#3d2b1f"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#1a1008"; }}
                >{slide.buton || "Explorează"}</a>
              </div>
            </div>
          )}
        </div>
      ))}

      {slides.length > 1 && (
        <div style={{
          position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: 10, zIndex: 10,
        }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`} style={{
              width: i === current ? 28 : 10, height: 10, borderRadius: 5,
              background: i === current ? "#fff" : "rgba(255,255,255,0.5)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "all 0.3s",
            }} />
          ))}
        </div>
      )}
    </section>
  );
}
