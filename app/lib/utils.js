const ALL_KNOWN = [
  "Alb","Albastru","Auriu","Galben","Gri","Maro","Negru","Negru-Alb","Portocaliu","Roz","Roșu","Verde","Violet",
  "AI","Animale","Automotive","Basme","Călătorii","Creează-ți propriul","Haios","Jocuri","Nuntă",
  "Ocazii speciale","Orașe","Peisaje","Plante","Sport","Vacanță",
  "Aniversare","Calendar","Comuniune Sfântă","Nuntă","Pentru copii","Pentru ea","Pentru el",
  "Ziua Băiatului","Ziua Copilului","Ziua de naștere","Ziua Femeii","Ziua Îndrăgostiților",
  "Ziua Mamei","Ziua Profesorului","Ziua Tatălui",
];

export function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function deslugify(slug) {
  return ALL_KNOWN.find(v => slugify(v) === slug) || slug;
}
