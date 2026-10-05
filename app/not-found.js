import Link from "next/link";
import PageShell from "./components/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="gold-text font-display text-[max(96px,12vw)] font-extrabold italic leading-none">404</h1>
        <p className="mb-8 mt-4 text-[1.25rem] text-white/75">Pagina nu a fost găsită.</p>
        <Link href="/" className="btn-gold h-12 px-9 text-[0.875rem] uppercase tracking-[0.05em]">
          Înapoi acasă
        </Link>
      </div>
    </PageShell>
  );
}
