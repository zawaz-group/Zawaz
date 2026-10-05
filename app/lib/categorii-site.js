import { imaginePrincipala } from "./imagini";
import { TIPURI_ORIGINALE } from "./optiuni";

/*
 * Cardurile de categorie de pe site (meniul „Produse” și „Categorii principale”).
 *
 * Categoriile sunt tipurile de produs din admin: cele două originale (minus cele
 * ascunse) și cele create de acolo. Titlul, paragraful și poza vin din colecția
 * `categorii` (secțiunea Categorii din admin); fără ele, cardul folosește titlul
 * tipului și poza primului produs. O categorie fără niciun produs nu apare.
 */

const FIXE = {
  pusculite: { title: "Pușculițe", subtitle: "Colectează cu stil" },
  stative: { title: "Stative", subtitle: "Practic și elegant" },
};

export function categoriiSite(produse = [], optiuni = null, detalii = []) {
  const lista = Array.isArray(produse) ? produse : [];
  const colectie = Array.isArray(detalii) ? detalii : [];
  const ascunse = new Set(optiuni?.ascunse?.tipuriProdus || []);

  // Pușculițele primele, ca în design; apoi celelalte originale și tipurile custom.
  const originale = ["pusculite", ...TIPURI_ORIGINALE.filter((t) => t !== "pusculite")].filter((t) => !ascunse.has(t));
  const custom = (optiuni?.tipuriProdus || []).filter((t) => t?.value);
  const tipuri = [
    ...originale.map((value) => ({ value, label: FIXE[value]?.title || value })),
    ...custom.map((t) => ({ value: t.value, label: t.label || t.value })),
  ];

  return tipuri
    .map((t) => {
      const ale = lista.filter((p) => p.category === t.value);
      const d = colectie.find((c) => c.slug === t.value);
      return {
        key: t.value,
        title: d?.label || t.label,
        subtitle: d?.descriere ?? FIXE[t.value]?.subtitle ?? "",
        href: `/produse?categorie=${encodeURIComponent(t.value)}`,
        image: d?.img || ale.map(imaginePrincipala).find(Boolean) || "",
        produse: ale.length,
      };
    })
    .filter((c) => c.produse > 0);
}

// Câte categorii apar în „Categorii principale” și în meniul „Produse”;
// restul se văd pe pagina „Toate categoriile” (/categorii).
export const CATEGORII_PRINCIPALE = 3;
