"use client";
import { useState, useEffect } from "react";

export default function FloatingWidgets() {
  const [showPhone, setShowPhone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowPhone(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="tel:+37368559911"
      style={{
        position: "fixed",
        bottom: 28,
        right: 24,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        gap: isMobile ? 0 : 14,
        background: isMobile ? "transparent" : "#f5f0e8",
        border: isMobile ? "none" : "2.5px solid #2C662D",
        borderRadius: 999,
        padding: isMobile ? 0 : "12px 22px 12px 12px",
        textDecoration: "none",
        boxShadow: isMobile ? "none" : "0 8px 32px rgba(0,0,0,0.18)",
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
        transform: showPhone ? "translateY(0) scale(1)" : "translateY(120px) scale(0.85)",
        opacity: showPhone ? 1 : 0,
        pointerEvents: showPhone ? "auto" : "none",
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: "50%",
        background: "#2C662D",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        boxShadow: isMobile ? "0 4px 16px rgba(0,0,0,0.28)" : "none",
      }}>
        <svg width={20} height={20} viewBox="0 0 24 24" fill="#fff">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </div>
      {!isMobile && (
        <div>
          <p style={{ margin: 0, fontSize: 11, color: "#5D695F", fontWeight: 500, lineHeight: 1 }}>Ai nevoie de ajutor?</p>
          <p style={{ margin: "3px 0 0", fontSize: 17, fontWeight: 800, color: "#2C662D", lineHeight: 1, letterSpacing: "-0.02em" }}>068 559 911</p>
        </div>
      )}
    </a>
  );
}
