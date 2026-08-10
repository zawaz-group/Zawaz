import { readFileSync } from "fs";
import { join } from "path";
import { getCollection, hasMongo } from "./mongo.js";

/*
 * Stratul de date al site-ului, pe MongoDB.
 *
 * Interfața (readDb / writeDb pe un "name") a rămas identică cu varianta
 * anterioară pe fișiere JSON, așa că rutele din app/api nu s-au schimbat.
 * Fiecare "name" este o colecție:
 *   - liste (produse, blog, faq, …) → câte un document per element,
 *     ordinea păstrată în câmpul intern `_ord`;
 *   - obiecte (setari)              → un singur document, sub `_id: __singleton__`.
 *
 * Documentul `__meta__` marchează o colecție ca inițializată. Fără el nu am
 * putea distinge "colecție încă nepopulată" (unde vrem fallback pe fișierul
 * local) de "listă golită intenționat din admin" (unde fallback-ul ar învia
 * datele șterse).
 */

const SINGLETON_ID = "__singleton__";
const META_ID = "__meta__";

function localPath(name) {
  return join(process.cwd(), "data", `${name}.json`);
}

function readLocal(name) {
  try {
    return JSON.parse(readFileSync(localPath(name), "utf-8"));
  } catch {
    return [];
  }
}

function strip(doc) {
  const { _id, _ord, ...rest } = doc;
  return rest;
}

function keyOf(item, index) {
  return String(item?.id ?? item?.slug ?? `item-${index}`);
}

export async function readDb(name) {
  if (!hasMongo()) return readLocal(name);

  try {
    const col = await getCollection(name);
    const docs = await col.find({}).sort({ _ord: 1 }).toArray();

    const singleton = docs.find((d) => d._id === SINGLETON_ID);
    if (singleton) return strip(singleton);

    const items = docs.filter((d) => d._id !== META_ID);
    if (items.length === 0 && !docs.some((d) => d._id === META_ID)) return readLocal(name);

    return items.map(strip);
  } catch (err) {
    // Citirea nu trebuie să doboare site-ul: servim ultima variantă cunoscută
    // din data/*.json. Datele pot fi învechite, de aceea logăm explicit.
    console.error(`[db] Citirea "${name}" din MongoDB a eșuat; folosesc data/${name}.json.`, err);
    return readLocal(name);
  }
}

export async function writeDb(name, data) {
  // Spre deosebire de citire, o scriere eșuată nu are fallback rezonabil:
  // preferăm o eroare vizibilă în admin decât pierderea silențioasă a datelor.
  if (!hasMongo()) throw new Error("Salvarea a eșuat: MONGODB_URI nu este configurat.");

  const col = await getCollection(name);

  if (!Array.isArray(data)) {
    await col.replaceOne({ _id: SINGLETON_ID }, { ...data }, { upsert: true });
    return;
  }

  const keep = data.map(keyOf);
  const ops = data.map((item, i) => ({
    replaceOne: {
      filter: { _id: keep[i] },
      replacement: { ...item, _ord: i },
      upsert: true,
    },
  }));

  // Întâi upsert-urile, apoi ștergem ce nu mai apare în listă: o listă
  // nu rămâne niciodată goală între operații, cum s-ar fi întâmplat la un
  // deleteMany urmat de insertMany.
  ops.push({ deleteMany: { filter: { _id: { $nin: [...keep, META_ID] } } } });
  ops.push({
    updateOne: {
      filter: { _id: META_ID },
      update: { $set: { initialized: true, updatedAt: new Date() } },
      upsert: true,
    },
  });

  await col.bulkWrite(ops, { ordered: true });
}
