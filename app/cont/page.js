import Link from "next/link";
import PageShell, { PageHeading } from "../components/PageShell";

export default function ContPage() {
  return (
    <PageShell narrow>
      <PageHeading
        title="Contul"
        accent="meu"
        description="Autentifică-te pentru a accesa comenzile și setările contului."
        center
      />

      <div className="panel mx-auto mt-10 flex max-w-[30rem] flex-col gap-4 p-8">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cont-email" className="text-[0.75rem] font-bold uppercase tracking-[0.08em] text-white/70">Email</label>
          <input id="cont-email" type="email" placeholder="adresa@email.com" autoComplete="email" className="field" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cont-parola" className="text-[0.75rem] font-bold uppercase tracking-[0.08em] text-white/70">Parolă</label>
          <input id="cont-parola" type="password" placeholder="••••••••" autoComplete="current-password" className="field" />
        </div>
        <button type="button" className="btn-gold mt-2 h-12 text-[0.8125rem] uppercase tracking-[0.1em]">
          Autentificare
        </button>
        <p className="text-center text-[0.8125rem] text-white/70">
          Nu ai cont?{" "}
          <Link href="/cont/inregistrare" className="font-bold text-gold-bright transition hover:underline">
            Înregistrează-te
          </Link>
        </p>
      </div>
    </PageShell>
  );
}
