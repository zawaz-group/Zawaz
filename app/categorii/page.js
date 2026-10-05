import CategoryCard from "../components/CategoryCard";
import PageShell, { PageHeading } from "../components/PageShell";
import { categoriiSite } from "../lib/categorii-site";
import { readDb } from "../lib/db";

export const metadata = {
  title: "Toate categoriile",
  description: "Toate categoriile de produse Paradox Craft.",
  alternates: { canonical: "/categorii" },
};

// Categoriile se schimbă din admin: fără asta pagina ar fi prerandată la build.
export const dynamic = "force-dynamic";

export default async function CategoriiPage() {
  const [produse, optiuni, detalii] = await Promise.all([readDb("produse"), readDb("optiuni"), readDb("categorii")]);
  const categorii = categoriiSite(produse, optiuni, detalii);

  return (
    <PageShell>
      <PageHeading
        crumbs={[{ label: "Acasă", href: "/" }, { label: "Categorii" }]}
        title="Toate"
        accent="categoriile"
        description="Alege categoria care te interesează și descoperă produsele din ea."
      />

      <div className="mt-8 lg:mt-[2.4vw]">
        {categorii.length === 0 ? (
          <p className="py-12 text-white/70">Nu există categorii momentan.</p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[1.25vw]">
            {categorii.map((c) => (
              <li key={c.key}>
                <CategoryCard c={c} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageShell>
  );
}
