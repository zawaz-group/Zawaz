"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function OferteHero() {
  const [href, setHref] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetch("/api/produse")
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const randomProduct = data[Math.floor(Math.random() * data.length)];
        setHref(`/produse/${randomProduct.id}`);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!href) return null;

  return (
    // padding orizontal 16px = acelasi cu al navbar-ului (NavBar.js:192),
    // ca marginile bannerului sa cada exact pe marginile continutului paginii.
    <section style={{ padding: isMobile ? "24px 16px" : "40px 16px" }}>
      <div style={{ maxWidth: "var(--container-inner)", margin: "0 auto", display: "flex", justifyContent: "center" }}>
        <Link
          href={href}
          style={{
            position: "relative", display: "block",
            // Fara plafon: bannerul urmeaza --container, la fel ca navbar-ul si
            // restul sectiunilor, deci ramane aliniat pe orice latime de ecran.
            width: "100%",
            // 2/1 este raportul real al imaginii (1774x887), deci objectFit:
            // cover o incadreaza fara sa taie nimic.
            aspectRatio: isMobile ? "16 / 9" : "2 / 1",
            borderRadius: 20,
            overflow: "hidden",
            background: "#0d1f3c",
          }}
        >
          <Image
            src="/oferta-monezi.png"
            alt="Ofertă specială"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: isMobile ? "contain" : "cover", objectPosition: "center" }}
          />
        </Link>
      </div>
    </section>
  );
}
