import Link from "next/link";
import BackgroundStack from "./BackgroundStack";
import Footer from "./Footer";
import Header from "./Header";
import { Crown } from "./icons";
import ScrollToTop from "./ScrollToTop";

/**
 * Cadrul comun al paginilor interioare: antet, fundalul în plăci, conținut cu
 * marginile din design, footer. `narrow` centrează conținutul într-o coloană
 * îngustă (coș, cont, articol de blog).
 */
export default function PageShell({ children, narrow = false, wide = false }) {
  const marginile = "mx-5 pb-20 pt-28 lg:ml-[3.65vw] lg:mr-[4.95vw] lg:pb-[6vw] lg:pt-[8.5vw]";
  return (
    <>
      <Header />
      <main className="page-bg min-h-screen">
        <BackgroundStack />
        <div className={marginile}>
          <div className={narrow ? "mx-auto max-w-[44rem]" : wide ? "mx-auto max-w-[110rem]" : ""}>{children}</div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

/** Antetul paginii: firul de navigare, titlul cu accent auriu și coroana, descrierea. */
export function PageHeading({ crumbs = [], title, accent, description, center = false, crown = true }) {
  return (
    <div className={center ? "text-center" : ""}>
      {crumbs.length > 0 && (
        <nav aria-label="Navigare" className="text-[0.8125rem] text-white/60 lg:text-[max(13px,0.85vw)]">
          {crumbs.map((c, i) => (
            <span key={c.label}>
              {i > 0 && <span className="mx-2 text-gold/60">/</span>}
              {c.href ? (
                <Link href={c.href} className="transition hover:text-gold-bright">
                  {c.label}
                </Link>
              ) : (
                <span className="text-white">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      <div className={`mt-3 flex items-center gap-3 ${center ? "justify-center" : ""}`}>
        <h1 className="font-display text-[max(34px,3.4vw)] font-extrabold italic uppercase leading-none tracking-[-0.01em] text-white">
          {title} {accent && <span className="gold-text">{accent}</span>}
        </h1>
        {crown && <Crown className="h-[max(1.75rem,2.6vw)] w-[max(2rem,3vw)] shrink-0 -translate-y-1 rotate-6" />}
      </div>
      {description && (
        <p className={`mt-3 max-w-[40rem] text-[0.9375rem] leading-relaxed text-white/75 lg:text-[max(14px,1.05vw)] ${center ? "mx-auto" : ""}`}>{description}</p>
      )}
    </div>
  );
}

/** Titlu de secțiune în stilul din design: majuscule, cu accent auriu. */
export function SectionTitle({ children, accent, crown = true }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="text-[max(18px,1.43vw)] font-extrabold uppercase tracking-[0.02em]">
        {children} {accent && <span className="text-gold-bright">{accent}</span>}
      </h2>
      {crown && <Crown className="h-7 w-8 -translate-y-1" />}
    </div>
  );
}
