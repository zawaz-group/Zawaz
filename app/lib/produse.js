import { readDb } from "./db";
import categoriiData from "../../data/categorii.json";
export { slugify, deslugify } from "./utils";

export const categorii = categoriiData;

export async function getProduse() {
  return await readDb("produse");
}

export async function getProduseByCategorie(slug) {
  const produse = await getProduse();
  if (slug === "copii") return produse.filter(p => p.tags?.includes("fete") || p.tags?.includes("baieti"));
  return produse.filter(p => p.tags?.includes(slug) || p.category === slug);
}

export async function getProdusById(id) {
  const produse = await getProduse();
  return produse.find(p => p.id === id);
}

export async function getProduseByculoare(culoare) {
  const produse = await getProduse();
  return produse.filter(p => p.culori?.includes(culoare));
}

export async function getProduseByTema(tema) {
  const produse = await getProduse();
  return produse.filter(p => p.tema?.includes(tema));
}

export async function getProduseByOcazie(ocazie) {
  const produse = await getProduse();
  return produse.filter(p => p.ocazie?.includes(ocazie));
}

export function getCategorieBySlug(slug) {
  return categorii.find(c => c.slug === slug);
}

export function getAllCulori() {
  return ["Alb","Albastru","Auriu","Galben","Gri","Maro","Negru","Negru-Alb","Portocaliu","Roz","Roșu","Verde","Violet"];
}

export function getAllTeme() {
  return ["AI","Animale","Automotive","Basme","Călătorii","Creează-ți propriul","Haios","Jocuri","Nuntă","Ocazii speciale","Orașe","Peisaje","Plante","Sport","Vacanță"];
}

export function getAllOcazii() {
  return ["Aniversare","Calendar","Comuniune Sfântă","Nuntă","Pentru copii","Pentru ea","Pentru el","Ziua Băiatului","Ziua Copilului","Ziua de naștere","Ziua Femeii","Ziua Îndrăgostiților","Ziua Mamei","Ziua Profesorului","Ziua Tatălui"];
}

