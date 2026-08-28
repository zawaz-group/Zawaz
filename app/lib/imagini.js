/*
 * Un produs poate avea mai multe imagini. Prima din lista e cea principala
 * (aparea pe card, in cos, in navbar), restul sunt secundare si se vad ca
 * miniaturi pe pagina produsului.
 *
 * Sunt doua cazuri, dupa cum e configurat produsul in admin:
 *   - are culori  -> fiecare culoare isi are propria galerie (imaginiCulori),
 *                    iar imaginea principala e prima imagine a primei culori;
 *   - fara culori -> o singura galerie la nivel de produs (imagini).
 *
 * Campul `img` ramane completat cu imaginea principala, ca restul site-ului
 * (cos, sitemap, produse salvate inainte de aceste reguli) sa poata folosi
 * un singur camp simplu.
 */

function caLista(valoare) {
  if (Array.isArray(valoare)) return valoare.filter(Boolean);
  return valoare ? [valoare] : [];
}

// Imaginile unei culori (suporta si formatul vechi, cu un singur sir).
export function imaginiCuloare(produs, culoare) {
  return caLista(culoare && produs?.imaginiCulori?.[culoare]);
}

// Culoarea implicita a produsului: prima bifata in admin.
export function culoareImplicita(produs) {
  return produs?.culori?.[0] || null;
}

/* Galeria completa afisata pentru produs: imaginile culorii cerute daca are
   culori, altfel galeria produsului. `img` intra ca rezerva pentru produsele
   salvate inainte de a exista galeriile. */
export function galerieProdus(produs, culoare = undefined) {
  const culoareAleasa = culoare === undefined ? culoareImplicita(produs) : culoare;
  const aleCulorii = imaginiCuloare(produs, culoareAleasa);
  if (aleCulorii.length > 0) return aleCulorii;

  const aleProdusului = caLista(produs?.imagini);
  if (aleProdusului.length > 0) return aleProdusului;

  return caLista(produs?.img);
}

// Imaginea afisata cand nu s-a ales inca o culoare anume.
export function imaginePrincipala(produs) {
  return galerieProdus(produs)[0] || "";
}
