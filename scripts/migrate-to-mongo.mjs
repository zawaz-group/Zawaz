/*
 * Importă data/*.json în MongoDB, o singură dată, la trecerea de pe fișiere.
 *
 *   npm run migrate:mongo            → importă doar colecțiile încă nepopulate
 *   npm run migrate:mongo -- --force → rescrie și colecțiile deja existente
 *
 * Folosește exact readDb/writeDb din aplicație, ca formatul scris de script
 * să nu poată devia de la ce citește site-ul.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { writeDb } from "../app/lib/db.js";
import { closeMongo, getCollection, hasMongo } from "../app/lib/mongo.js";

const SETURI = ["produse", "categorii", "blog", "faq", "hero", "recenzii", "setari", "utilizatori"];

const force = process.argv.includes("--force");

function citesteLocal(name) {
  const cale = join(process.cwd(), "data", `${name}.json`);
  return JSON.parse(readFileSync(cale, "utf-8"));
}

function numaraElemente(valoare) {
  return Array.isArray(valoare) ? valoare.length : Object.keys(valoare).length;
}

async function main() {
  if (!hasMongo()) {
    console.error("MONGODB_URI nu este setat. Rulează cu: node --env-file=.env.local scripts/migrate-to-mongo.mjs");
    process.exitCode = 1;
    return;
  }

  console.log(`Bază de date: ${process.env.MONGODB_DB || "artyzawaz"}\n`);

  for (const name of SETURI) {
    const col = await getCollection(name);
    const populata = (await col.countDocuments({}, { limit: 1 })) > 0;

    if (populata && !force) {
      const n = await col.countDocuments({ _id: { $nin: ["__meta__"] } });
      console.log(`- ${name.padEnd(12)} sărit (colecția există deja, ${n} documente) — folosește --force pentru rescriere`);
      continue;
    }

    const local = citesteLocal(name);
    await writeDb(name, local);
    console.log(`✓ ${name.padEnd(12)} importat ${numaraElemente(local)} înregistrări`);
  }

  console.log("\nMigrare finalizată.");
}

try {
  await main();
} finally {
  await closeMongo();
}
