import { CULORI_LIST, COLOR_MAP } from "./culori";

/*
 * Listele de culori / teme / ocazii disponibile pentru un tip de produs.
 *
 * Fiecare tip (stative, pusculite, sau unul creat din admin) isi are propriile
 * liste: cele fixe de mai jos (doar pentru tipurile originale, si doar cele
 * neascunse din admin) plus cele adaugate din admin pentru acel tip.
 *
 * Tine loc de sursa unica: si formularul din admin, si filtrele din /produse
 * citesc de aici, ca sa nu ajunga sa arate liste diferite.
 */

export const TEME_LIST = ["AI", "Animale", "Automotive", "Basme", "Călătorii", "Creează-ți propriul", "Haios", "Jocuri", "Nuntă", "Ocazii speciale", "Orașe", "Peisaje", "Plante", "Sport", "Vacanță"];
export const OCAZII_LIST = ["Aniversare", "Calendar", "Comuniune Sfântă", "Nuntă", "Pentru copii", "Pentru ea", "Pentru el", "Ziua Băiatului", "Ziua Copilului", "Ziua de naștere", "Ziua Femeii", "Ziua Îndrăgostiților", "Ziua Mamei", "Ziua Profesorului", "Ziua Tatălui"];

// Tipurile scrise in cod, singurele care pornesc cu listele fixe completate.
// Un tip nou, creat din admin, incepe gol.
export const TIPURI_ORIGINALE = ["stative", "pusculite"];

function grup(fixeToate, ascunse, custom, esteOriginal) {
  const ascunseSet = new Set(ascunse || []);
  const fixe = esteOriginal ? fixeToate.filter(v => !ascunseSet.has(v)) : [];
  return { fixe, custom: custom || [] };
}

/* Listele pentru un tip, separate in "fixe" (din cod) si "custom" (din admin).
   Admin-ul are nevoie de distinctie ca sa stie ce sterge si ce doar ascunde;
   pentru afisare simpla exista `toate`. */
export function listeTip(optiuni, tip) {
  const asc = optiuni?.ascunse || {};
  const esteOriginal = TIPURI_ORIGINALE.includes(tip);

  const culori = grup(CULORI_LIST, asc.culori?.[tip], optiuni?.culori?.[tip], esteOriginal);
  const teme = grup(TEME_LIST, asc.teme?.[tip], optiuni?.teme?.[tip], esteOriginal);
  const ocazii = grup(OCAZII_LIST, asc.ocazii?.[tip], optiuni?.ocazii?.[tip], esteOriginal);

  return {
    culori: {
      ...culori,
      // Culorile custom sunt obiecte {nume, hex}; cele fixe isi iau hex-ul din paleta.
      toate: [...culori.fixe.map(nume => ({ nume, hex: COLOR_MAP[nume] })), ...culori.custom],
    },
    teme: { ...teme, toate: [...teme.fixe, ...teme.custom] },
    ocazii: { ...ocazii, toate: [...ocazii.fixe, ...ocazii.custom] },
  };
}

// Toate tipurile de produs cunoscute: cele originale + cele adaugate din admin.
export function tipuriCunoscute(optiuni) {
  const custom = (optiuni?.tipuriProdus || []).map(t => t.value);
  const ascunse = new Set(optiuni?.ascunse?.tipuriProdus || []);
  return [...TIPURI_ORIGINALE.filter(t => !ascunse.has(t)), ...custom];
}

/* Reuniunea listelor mai multor tipuri — folosita in catalog cand nu e ales
   niciun tip anume, ca filtrele sa acopere tot ce exista. */
export function listeReunite(optiuni, tipuri) {
  const culori = [];
  const vazuteCulori = new Set();
  const teme = new Set();
  const ocazii = new Set();

  for (const tip of tipuri) {
    const l = listeTip(optiuni, tip);
    for (const c of l.culori.toate) {
      if (!vazuteCulori.has(c.nume)) { vazuteCulori.add(c.nume); culori.push(c); }
    }
    l.teme.toate.forEach(v => teme.add(v));
    l.ocazii.toate.forEach(v => ocazii.add(v));
  }

  return { culori, teme: [...teme], ocazii: [...ocazii] };
}
