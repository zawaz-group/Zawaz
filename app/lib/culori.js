/*
 * Paleta culorilor fixe, folosita si in admin (la alegerea culorilor unui
 * produs) si pe site (ca sa afisam bulina reala, nu doar numele culorii).
 * Culorile adaugate din admin isi tin propriul hex in /api/optiuni, pe tipul
 * de produs — vezi hexCuloare() de mai jos.
 */

export const CULORI_LIST = [
  "Alb", "Albastru", "Auriu", "Galben", "Gri", "Maro",
  "Negru", "Negru-Alb", "Portocaliu", "Roz", "Roșu", "Verde", "Violet",
];

export const COLOR_MAP = {
  "Alb": "#f0f0f0", "Albastru": "#42a5f5", "Auriu": "#ffd700", "Galben": "#ffee58",
  "Gri": "#9e9e9e", "Maro": "#8d6e63", "Negru": "#222", "Negru-Alb": null,
  "Portocaliu": "#ffa726", "Roz": "#f48fb1", "Roșu": "#ef5350", "Verde": "#66bb6a", "Violet": "#9c27b0",
};

// "Negru-Alb" nu e o culoare unica, ci doua — se deseneaza ca un cerc taiat
// pe diagonala, nu ca fundal plat.
export const GRADIENT_NEGRU_ALB = "linear-gradient(135deg,#222 50%,#f0f0f0 50%)";

export function esteGradient(nume) {
  return nume === "Negru-Alb";
}

/* Culoarea de fundal pentru o bulina: intai culorile custom ale tipului de
   produs (din /api/optiuni), apoi paleta fixa. Daca numele nu e cunoscut
   deloc, intoarce null si apelantul poate afisa doar textul. */
export function hexCuloare(nume, culoriCustom = []) {
  const custom = culoriCustom.find(c => c.nume === nume);
  if (custom?.hex) return custom.hex;
  return COLOR_MAP[nume] ?? null;
}

// Culorile deschise au nevoie de bifa/contur inchis la culoare ca sa se vada.
export function esteCuloareDeschisa(nume) {
  return ["Alb", "Galben", "Auriu"].includes(nume);
}
