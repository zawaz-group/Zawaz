import { MongoClient } from "mongodb";

/*
 * Conexiunea MongoDB, partajată la nivel de proces.
 *
 * În dev, Next reîncarcă modulele la fiecare modificare (HMR); fără cache pe
 * globalThis s-ar deschide câte un client nou la fiecare salvare, până la
 * epuizarea limitei de conexiuni a clusterului. În producție (serverless),
 * clientul este reutilizat între invocările care nimeresc aceeași instanță.
 */

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "artyzawaz";

const options = {
  // Eșuează rapid dacă clusterul e inaccesibil, ca să nu blocăm un build
  // sau un request până la timeout-ul implicit de 30s.
  serverSelectionTimeoutMS: 10_000,
  maxPoolSize: 10,
};

export function hasMongo() {
  return Boolean(uri);
}

let clientPromise;

function connect() {
  // Dacă handshake-ul eșuează, nu păstrăm promisiunea respinsă în cache —
  // altfel orice request ulterior ar reutiliza aceeași eroare la nesfârșit.
  return new MongoClient(uri, options).connect().catch((err) => {
    clientPromise = undefined;
    if (process.env.NODE_ENV === "development") globalThis.__mongoClientPromise = undefined;
    throw err;
  });
}

function getClientPromise() {
  if (!uri) throw new Error("MONGODB_URI nu este configurat.");

  if (process.env.NODE_ENV === "development") {
    if (!globalThis.__mongoClientPromise) globalThis.__mongoClientPromise = connect();
    return globalThis.__mongoClientPromise;
  }

  if (!clientPromise) clientPromise = connect();
  return clientPromise;
}

export async function getDb() {
  const client = await getClientPromise();
  return client.db(dbName);
}

export async function getCollection(name) {
  const db = await getDb();
  return db.collection(name);
}

/* Folosit doar de scripturi (ex. migrarea), ca procesul să se poată încheia. */
export async function closeMongo() {
  const pending = clientPromise || globalThis.__mongoClientPromise;
  if (!pending) return;
  clientPromise = undefined;
  globalThis.__mongoClientPromise = undefined;
  const client = await pending;
  await client.close();
}
