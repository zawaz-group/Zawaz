"use client";
import { useState, useEffect, useRef } from "react";
import { GRADIENT_NEGRU_ALB, esteGradient, esteCuloareDeschisa } from "../lib/culori";
import { imaginePrincipala } from "../lib/imagini";
import { listeTip } from "../lib/optiuni";

/* ── palette ── */
const C = {
  bg: "#f7f8fa", sidebar: "#111827", sidebarHov: "#1f2937",
  accent: "#f5a623", accentDark: "#d4891a",
  white: "#ffffff", border: "#e5e7eb", text: "#111", muted: "#6b7280",
  danger: "#ef4444", success: "#22c55e",
};

/* ── shared styles ── */
const inp = {
  width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`,
  borderRadius: 8, fontSize: 14, outline: "none", background: "#fff",
  boxSizing: "border-box", color: C.text,
};
const lbl = { fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4, display: "block" };
const btnPrimary = { background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" };
// inline-flex + gap: butoanele contin acum si iconite, nu doar text — fara
// asta, iconita si eticheta ("Edit") ar cadea pe randuri diferite.
const btnDanger = { background: C.danger, color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 };
const btnGhost = { background: "transparent", color: C.muted, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 };
const card = { background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20, marginBottom: 12 };
const row = { display: "flex", gap: 12, flexWrap: "wrap" };

/* ── iconite ──
   Desenate cu linii (stroke), nu cu emoji: mostenesc culoarea textului, deci
   se coloreaza singure cand un buton e activ sau la hover, si arata la fel pe
   orice sistem de operare (emoji-urile difera intre Windows/Mac/Android). */
const CAI_ICONITE = {
  dashboard: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></>,
  produse: <><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" /><path d="m3 8 9 5 9-5" /><path d="M12 13v8" /></>,
  hero: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="m21 16-5-5-6 6" /></>,
  blog: <><path d="M4 4h11l5 5v11H4z" /><path d="M15 4v5h5" /><path d="M8 13h8" /><path d="M8 17h5" /></>,
  recenzii: <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.8l6.5-.9L12 3Z" />,
  faq: <><circle cx="12" cy="12" r="9" /><path d="M9.2 9.3a2.9 2.9 0 0 1 5.6 1c0 1.9-2.8 2.4-2.8 4" /><path d="M12 17.5h.01" /></>,
  setari: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 9 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 9a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z" /></>,
  administratori: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9" /><path d="M16 3.1a4 4 0 0 1 0 7.8" /></>,
  logo: <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />,
  site: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" /></>,
  iesire: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></>,
  cauta: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  editeaza: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" /></>,
  sterge: <><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M10 11v6" /><path d="M14 11v6" /></>,
  telefon: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />,
  social: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>,
  salveaza: <><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" /><path d="M17 21v-8H7v8" /><path d="M7 3v5h8" /></>,
  sfat: <><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z" /></>,
  utilizator: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a7 7 0 0 1 16 0v1" /></>,
  scut: <><path d="M12 3 5 6v6c0 4.4 3 8.3 7 9 4-.7 7-4.6 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
  bifa: <path d="M20 6 9 17l-5-5" />,
};

function Iconita({ nume, size = 18, strokeWidth = 1.8 }) {
  const cale = CAI_ICONITE[nume];
  if (!cale) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, display: "block" }} aria-hidden="true">
      {cale}
    </svg>
  );
}

/* Nota unei recenzii, ca stele desenate — inlocuieste sirurile "★☆". */
function Stele({ nota = 5, size = 13 }) {
  return (
    <span style={{ display: "inline-flex", gap: 1, verticalAlign: "middle" }}>
      {[1, 2, 3, 4, 5].map(n => (
        <svg key={n} width={size} height={size} viewBox="0 0 24 24"
          fill={n <= nota ? C.accent : "none"} stroke={C.accent} strokeWidth="1.6"
          strokeLinejoin="round" aria-hidden="true">
          <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.8l6.5-.9L12 3Z" />
        </svg>
      ))}
    </span>
  );
}

function Input({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div style={{ marginBottom: 12 }}>
      {label && <label style={lbl}>{label}</label>}
      <input type={type} value={value ?? ""} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inp} />
    </div>
  );
}
function Textarea({ label, value, onChange, rows = 3 }) {
  return (
    <div style={{ marginBottom: 12 }}>
      {label && <label style={lbl}>{label}</label>}
      <textarea value={value ?? ""} onChange={e => onChange(e.target.value)} style={{ ...inp, resize: "vertical", minHeight: rows * 28, fontFamily: "inherit" }} />
    </div>
  );
}
function Badge({ children, color = C.accent }) {
  return <span style={{ background: color + "22", color, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999 }}>{children}</span>;
}
function Modal({ title, onClose, children }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.white, borderRadius: 16, width: "100%", maxWidth: 680, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, background: C.white, zIndex: 1 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: C.muted, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}
function Confirm({ message, onYes, onNo }) {
  return (
    <div onClick={onNo} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.white, borderRadius: 14, padding: 28, maxWidth: 360, width: "90%", textAlign: "center" }}>
        <p style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 600 }}>{message}</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={onNo} style={btnGhost}>Anulează</button>
          <button onClick={onYes} style={btnDanger}>Șterge</button>
        </div>
      </div>
    </div>
  );
}

/* ─── PRODUSE ─── */
const CATEGORII_TIP = [
  { value: "stative", label: "Stative" },
  { value: "pusculite", label: "Pușculițe" },
];
const CATEGORII_NAV = [
  { value: "fete", label: "Fete" },
  { value: "baieti", label: "Băieți" },
  { value: "sport", label: "Sport" },
  { value: "copii", label: "Copii" },
];
// CULORI_LIST / COLOR_ADMIN_MAP stau in app/lib/culori.js, iar TEME_LIST /
// OCAZII_LIST in app/lib/optiuni.js — aceleasi valori le folosesc si filtrele
// din catalogul public, ca sa nu ajunga sa arate liste diferite.
const TAGS_LIST = ["populare","reduceri","produse-noi"];

function slugify(text) {
  return text
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function unionListe(av = [], bv = [], cheie) {
  if (!cheie) return [...new Set([...av, ...bv])];
  const vazute = new Set(av.map(x => x[cheie]));
  return [...av, ...bv.filter(x => !vazute.has(x[cheie]))];
}

// Uneste doua obiecte de optiuni custom fara sa piarda intrari — folosit ca
// sa nu conteze ordinea intre un fetch de incarcare si o adaugare locala.
// tipuriProdus/categoriiNav sunt liste simple; culori/teme/ocazii sunt tinute
// pe cheia tipului de produs, deci unite pe fiecare tip in parte.
function unionOptiuni(a, b) {
  const out = {
    tipuriProdus: unionListe(a.tipuriProdus, b.tipuriProdus, "value"),
    categoriiNav: unionListe(a.categoriiNav, b.categoriiNav, "value"),
  };
  for (const grup of ["culori", "teme", "ocazii"]) {
    const av = a[grup] || {}, bv = b[grup] || {};
    const tipuri = new Set([...Object.keys(av), ...Object.keys(bv)]);
    out[grup] = {};
    for (const tip of tipuri) {
      out[grup][tip] = unionListe(av[tip], bv[tip], grup === "culori" ? "nume" : undefined);
    }
  }
  // "ascunse" (valori fixe din cod, dezactivate din admin) are aceeasi forma
  // ca restul: tipuriProdus/categoriiNav sunt liste simple (de valori, nu
  // obiecte), culori/teme/ocazii sunt tinute pe tip.
  const aa = a.ascunse || {}, ba = b.ascunse || {};
  out.ascunse = {
    tipuriProdus: unionListe(aa.tipuriProdus, ba.tipuriProdus),
    categoriiNav: unionListe(aa.categoriiNav, ba.categoriiNav),
  };
  for (const grup of ["culori", "teme", "ocazii"]) {
    const av = aa[grup] || {}, bv = ba[grup] || {};
    const tipuri = new Set([...Object.keys(av), ...Object.keys(bv)]);
    out.ascunse[grup] = {};
    for (const tip of tipuri) {
      out.ascunse[grup][tip] = unionListe(av[tip], bv[tip]);
    }
  }
  return out;
}
const emptyProdus = { id: "", name: "", price: "", oldPrice: "", category: "stative", tags: [], img: "", imagini: [], descriere: "", culori: [], imaginiCulori: {}, tema: [], ocazie: [] };

/* Peste pragul asta redimensionam imaginea in browser inainte de upload.
   Doua motive, amandoua reale:
   - local, proxy.js face Next sa bufereze corpul cererii cu o limita; peste ea
     corpul e TRUNCHIAT tacut, boundary-ul multipart se strica si formData()
     crapa cu 500 ("expected boundary after body");
   - pe Vercel, un route handler primeste maxim ~4.5MB in corpul cererii.
   O poza de telefon (10-25MB) le depaseste pe amandoua, dar nici nu are rost
   la aceasta dimensiune pe un card de produs. */
const PRAG_REDIMENSIONARE = 3 * 1024 * 1024; // 3MB
const LATURA_MAXIMA = 2000; // px

async function pregatesteImagine(file) {
  // Fisierele mici raman neatinse: pastram formatul si calitatea originala
  // (inclusiv transparenta PNG a logourilor, care s-ar pierde la JPEG).
  if (!file.type?.startsWith("image/") || file.size <= PRAG_REDIMENSIONARE) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scara = Math.min(1, LATURA_MAXIMA / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scara);
    const h = Math.round(bitmap.height * scara);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d").drawImage(bitmap, 0, 0, w, h);
    bitmap.close?.();
    const blob = await new Promise(res => canvas.toBlob(res, "image/jpeg", 0.85));
    if (!blob) return file;
    const nume = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], nume, { type: "image/jpeg" });
  } catch {
    // Format exotic pe care browserul nu-l poate decoda — incercam sa-l
    // trimitem asa cum e; serverul va raspunde cu o eroare clara daca e prea mare.
    return file;
  }
}

// Trimite un fisier la /api/upload si intoarce URL-ul rezultat. Raspunsul
// poate fi orice (JSON valid cu eroare, gol la o eroare de retea/server
// necaptata, HTML de la un 500 generic) — .json() direct pe el arunca
// "Unexpected end of JSON input" si crapa formularul in loc sa arate un
// mesaj clar utilizatorului, asa ca parsam defensiv.
async function uploadFisier(fisierOriginal) {
  const file = await pregatesteImagine(fisierOriginal);
  let res;
  try {
    const fd = new FormData();
    fd.append("file", file);
    res = await fetch("/api/upload", { method: "POST", body: fd });
  } catch {
    throw new Error("Încărcarea a eșuat — verifică conexiunea și încearcă din nou.");
  }
  let data = null;
  try {
    data = await res.json();
  } catch {
    // corp gol/invalid — folosim doar statusul HTTP pentru mesaj
  }
  if (!res.ok || !data?.url) {
    throw new Error(data?.error || `Încărcarea a eșuat (${res.status}).`);
  }
  return data.url;
}

function ImageUpload({ label, value, onChange, height = 120 }) {
  const [uploading, setUploading] = useState(false);
  const ref = useRef();
  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFisier(file);
      onChange(url);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
      ref.current.value = "";
    }
  }
  return (
    <div style={{ marginBottom: 12 }}>
      {label && <label style={lbl}>{label}</label>}
      <div style={{ display: "flex", gap: 8 }}>
        <input value={value ?? ""} onChange={e => onChange(e.target.value)} placeholder="URL imagine" style={{ ...inp, flex: 1 }} />
        <label style={{
          display: "inline-flex", alignItems: "center", padding: "9px 14px",
          background: uploading ? C.muted : C.accent, color: "#fff", borderRadius: 8,
          fontWeight: 700, fontSize: 13, cursor: uploading ? "wait" : "pointer",
          whiteSpace: "nowrap", flexShrink: 0,
        }}>
          <input type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} ref={ref} disabled={uploading} />
          {uploading ? "Se încarcă…" : "Alege fișier"}
        </label>
      </div>
      {value && <img src={value} alt="" style={{ width: "100%", height, objectFit: "cover", borderRadius: 8, marginTop: 8 }} />}
    </div>
  );
}

function MultiImageUpload({ images, onChange, marcheazaPrincipala = false }) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const ref = useRef();
  const imgs = images || [];

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFisier(file);
      onChange([...imgs, url]);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
      ref.current.value = "";
    }
  }
  function addUrl() {
    if (!urlInput.trim()) return;
    onChange([...imgs, urlInput.trim()]);
    setUrlInput("");
  }
  function remove(i) {
    onChange(imgs.filter((_, idx) => idx !== i));
  }
  // Prima imagine e cea principala, deci ordinea conteaza: "fa principala"
  // muta imaginea aleasa pe primul loc, pastrand restul in aceeasi ordine.
  function faPrincipala(i) {
    if (i === 0) return;
    onChange([imgs[i], ...imgs.filter((_, idx) => idx !== i)]);
  }

  const dim = marcheazaPrincipala ? 68 : 56;

  return (
    <div>
      {imgs.length > 0 && (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          {imgs.map((url, i) => (
            <div key={i} style={{ position: "relative", width: dim, flexShrink: 0 }}>
              <img src={url} alt="" style={{
                width: dim, height: dim, objectFit: "cover", borderRadius: 6, display: "block",
                border: marcheazaPrincipala && i === 0 ? `2px solid ${C.accent}` : "2px solid transparent",
              }} />
              <button onClick={() => remove(i)} title="Șterge imaginea" style={{ position: "absolute", top: -6, right: -6, width: 18, height: 18, borderRadius: "50%", background: C.danger, color: "#fff", border: "none", fontSize: 11, cursor: "pointer", lineHeight: 1, padding: 0 }}>×</button>
              {marcheazaPrincipala && (
                i === 0 ? (
                  <p style={{ margin: "3px 0 0", fontSize: 9, fontWeight: 800, color: C.accentDark, textAlign: "center", textTransform: "uppercase", letterSpacing: ".04em" }}>Principală</p>
                ) : (
                  <button onClick={() => faPrincipala(i)} title="Fă imaginea principală" style={{
                    display: "block", width: "100%", margin: "3px 0 0", padding: 0,
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 9, color: C.muted, textAlign: "center", textDecoration: "underline",
                  }}>fă principală</button>
                )
              )}
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: 6 }}>
        <input value={urlInput} onChange={e => setUrlInput(e.target.value)} placeholder="URL imagine" style={{ ...inp, flex: 1, padding: "6px 10px", fontSize: 12 }} />
        <button onClick={addUrl} style={{ ...btnGhost, padding: "6px 12px", fontSize: 11 }}>Adaugă</button>
        <label style={{
          display: "inline-flex", alignItems: "center", padding: "6px 12px",
          background: uploading ? C.muted : C.accent, color: "#fff", borderRadius: 6,
          fontWeight: 700, fontSize: 11, cursor: uploading ? "wait" : "pointer", whiteSpace: "nowrap",
        }}>
          <input type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} ref={ref} disabled={uploading} />
          {uploading ? "…" : "Fișier"}
        </label>
      </div>
    </div>
  );
}

function SectionBlock({ title, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <div style={{ width: 3, height: 13, borderRadius: 2, background: C.accent, flexShrink: 0 }} />
        <span style={{ fontSize: 10, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: ".08em" }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function StergeX({ onClick, title = "Șterge" }) {
  return (
    <button onClick={e => { e.stopPropagation(); onClick(); }} title={title} style={{
      position: "absolute", top: -6, right: -6, width: 16, height: 16, borderRadius: "50%",
      background: C.danger, color: "#fff", border: "none", fontSize: 10, cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 0, lineHeight: 1, zIndex: 1,
    }}>×</button>
  );
}

function Pill({ label, active, onClick, onDelete }) {
  const [hover, setHover] = useState(false);
  const btn = (
    <button onClick={onClick} style={{
      padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: "pointer",
      border: active ? `1.5px solid ${C.accent}` : `1.5px solid ${C.border}`,
      background: active ? C.accent + "18" : "#fff",
      color: active ? C.accentDark : C.muted,
      transition: "all .12s",
    }}>{label}</button>
  );
  if (!onDelete) return btn;
  return (
    <span style={{ position: "relative", display: "inline-flex" }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {btn}
      {hover && <StergeX onClick={onDelete} title={`Șterge „${label}”`} />}
    </span>
  );
}

function ColorSwatch({ name, hex, active, onToggle, onDelete }) {
  const [hover, setHover] = useState(false);
  const isGrad = esteGradient(name);
  const btn = (
    <button title={name} onClick={onToggle} style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
      background: "none", border: "none", cursor: "pointer", padding: "3px 4px",
      borderRadius: 6, outline: active ? `2px solid ${C.accent}` : "2px solid transparent",
      outlineOffset: 1,
    }}>
      <span style={{
        width: 24, height: 24, borderRadius: "50%", display: "block", flexShrink: 0,
        background: isGrad ? GRADIENT_NEGRU_ALB : hex,
        border: name === "Alb" ? "1px solid #ddd" : "none",
        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        position: "relative",
      }}>
        {active && (
          <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: esteCuloareDeschisa(name) ? "#555" : "#fff" }}>
            <Iconita nume="bifa" size={13} strokeWidth={3} />
          </span>
        )}
      </span>
      <span style={{ fontSize: 9, color: active ? C.accentDark : C.muted, fontWeight: active ? 700 : 400, lineHeight: 1.2, textAlign: "center", maxWidth: 38 }}>{name}</span>
    </button>
  );
  if (!onDelete) return btn;
  return (
    <span style={{ position: "relative", display: "inline-flex" }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {btn}
      {hover && <StergeX onClick={onDelete} title={`Șterge culoarea „${name}”`} />}
    </span>
  );
}

/* Buton mic care se transforma intr-un input, pentru a adauga o valoare noua
   intr-o lista (tip produs, categorie navigare, tema, ocazie). Persistarea
   efectiva (in /api/optiuni) se face de apelant, prin onAdd. */
function AdaugaEticheta({ onAdd, placeholder = "Nume nou…" }) {
  const [deschis, setDeschis] = useState(false);
  const [text, setText] = useState("");

  const confirma = () => {
    if (text.trim()) onAdd(text.trim());
    setText("");
    setDeschis(false);
  };

  if (!deschis) {
    return (
      <button onClick={() => setDeschis(true)} style={{
        padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: "pointer",
        border: `1.5px dashed ${C.border}`, background: "#fff", color: C.muted,
      }}>+ Adaugă</button>
    );
  }
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      <input
        autoFocus value={text} onChange={e => setText(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") confirma(); if (e.key === "Escape") { setText(""); setDeschis(false); } }}
        placeholder={placeholder}
        style={{ ...inp, width: 150, padding: "4px 8px", fontSize: 12 }}
      />
      <button onClick={confirma} style={{ ...btnGhost, padding: "4px 10px", fontSize: 11 }}>OK</button>
      <button onClick={() => { setText(""); setDeschis(false); }} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 16, lineHeight: 1 }}>×</button>
    </div>
  );
}

/* La fel ca AdaugaEticheta, dar pentru culori: cere si un cod de culoare,
   nu doar un nume, ca swatch-ul sa aiba ce afisa. */
function AdaugaCuloare({ onAdd }) {
  const [deschis, setDeschis] = useState(false);
  const [nume, setNume] = useState("");
  const [hex, setHex] = useState("#888888");

  const confirma = () => {
    if (nume.trim()) onAdd({ nume: nume.trim(), hex });
    setNume("");
    setDeschis(false);
  };

  if (!deschis) {
    return (
      <button title="Adaugă o culoare nouă" onClick={() => setDeschis(true)} style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
        background: "none", border: "none", cursor: "pointer", padding: "3px 4px",
      }}>
        <span style={{
          width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          border: `1.5px dashed ${C.border}`, color: C.muted, fontSize: 14, fontWeight: 700,
        }}>+</span>
        <span style={{ fontSize: 9, color: C.muted }}>Nouă</span>
      </button>
    );
  }
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      <input type="color" value={hex} onChange={e => setHex(e.target.value)} style={{ width: 30, height: 30, padding: 0, border: "none", borderRadius: 6, cursor: "pointer" }} />
      <input
        autoFocus value={nume} onChange={e => setNume(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") confirma(); if (e.key === "Escape") { setNume(""); setDeschis(false); } }}
        placeholder="Nume culoare" style={{ ...inp, width: 120, padding: "4px 8px", fontSize: 12 }}
      />
      <button onClick={confirma} style={{ ...btnGhost, padding: "4px 10px", fontSize: 11 }}>OK</button>
      <button onClick={() => { setNume(""); setDeschis(false); }} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 16, lineHeight: 1 }}>×</button>
    </div>
  );
}

function StarPicker({ value, onChange }) {
  const rating = value || 0;
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          title={`${n} stele`}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 2, lineHeight: 1 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={n <= rating ? C.accent : "none"} stroke={C.accent} strokeWidth="1.5">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function TipProdusButon({ label, active, onClick, onDelete }) {
  const [hover, setHover] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-flex" }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <button onClick={onClick} style={{
        padding: "8px 12px", borderRadius: 8, cursor: "pointer",
        border: active ? `2px solid ${C.accent}` : `2px solid ${C.border}`,
        background: active ? C.accent + "12" : "#fff",
        fontSize: 13, fontWeight: 700,
        color: active ? C.accentDark : C.text,
        transition: "all .15s",
      }}>{label}</button>
      {hover && <StergeX onClick={onDelete} title={`Șterge tipul „${label}”`} />}
    </span>
  );
}

function ProdusForm({ initial, onSave, onClose }) {
  const [p, setP] = useState(() => {
    const merged = { ...emptyProdus, ...initial };
    const imaginiCulori = {};
    for (const [culoare, val] of Object.entries(merged.imaginiCulori || {})) {
      imaginiCulori[culoare] = Array.isArray(val) ? val : (val ? [val] : []);
    }
    // Produsele salvate inainte de galerie au doar `img`: il aducem in lista,
    // ca sa nu para ca si-au pierdut imaginea cand se deschid la editare.
    const imagini = Array.isArray(merged.imagini) && merged.imagini.length > 0
      ? merged.imagini
      : (merged.img ? [merged.img] : []);
    return { ...merged, imaginiCulori, imagini };
  });
  const set = k => v => setP(x => ({ ...x, [k]: v }));
  const toggleArr = (k, v) => setP(x => ({ ...x, [k]: (x[k] || []).includes(v) ? x[k].filter(i => i !== v) : [...(x[k] || []), v] }));

  // Culorile, temele si ocaziile sunt definite separat pentru fiecare tip de
  // produs, deci selectiile facute pentru tipul vechi nu mai au sens dupa
  // schimbare — ar ramane pe produs valori care nici nu mai apar in formular.
  function schimbaTip(tipNou) {
    setP(x => x.category === tipNou ? x : ({
      ...x, category: tipNou, culori: [], imaginiCulori: {}, tema: [], ocazie: [],
    }));
  }

  // Optiuni custom adaugate din admin — salvate global in /api/optiuni, ca sa
  // fie disponibile pe orice produs, nu doar pe cel editat acum. Tip produs si
  // Categorie navigare raman comune tuturor produselor; culori/teme/ocazii
  // sunt separate PE TIP DE PRODUS — fiecare tip isi are propria lista.
  //
  // optiuniRef tine mereu valoarea CURENTA, sincron: functia de update din
  // useState (setOptiuni(x => ...)) nu se executa neaparat sincron in React,
  // deci "next" calculat inauntrul ei nu era mereu gata la momentul in care
  // il trimiteam mai jos in fetch — PUT-ul pleca uneori cu body gol/vechi.
  // Citind si scriind prin ref, fiecare adaugare/stergere porneste mereu de
  // la ultima valoare reala, indiferent de cand re-randeaza React.
  const optiuniRef = useRef({
    tipuriProdus: [], categoriiNav: [], culori: {}, teme: {}, ocazii: {},
    // Valorile FIXE (scrise in cod) nu pot fi sterse din date — le "ascundem"
    // aici, ca sa dispara din liste fara sa atingem constantele de mai sus.
    ascunse: { tipuriProdus: [], categoriiNav: [], culori: {}, teme: {}, ocazii: {} },
  });
  const [optiuni, setOptiuniState] = useState(optiuniRef.current);
  function setOptiuni(next) {
    optiuniRef.current = next;
    setOptiuniState(next);
  }

  useEffect(() => {
    // Union, nu suprascriere: daca admin-ul adauga o optiune inainte ca acest
    // fetch initial sa se intoarca, un simplu overwrite cu raspunsul (mai
    // vechi decat adaugarea locala) ar sterge-o din nou din state.
    fetch("/api/optiuni").then(r => r.json()).then(d => setOptiuni(unionOptiuni(optiuniRef.current, d))).catch(() => {});
  }, []);

  async function salveazaOptiuni(next) {
    setOptiuni(next);
    try {
      await fetch("/api/optiuni", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(next) });
    } catch {
      // Optiunea ramane selectabila local chiar daca salvarea globala a esuat
      // momentan — nu blocam editarea produsului pentru atat.
    }
  }

  // Tip produs / Categorie navigare: liste simple, comune.
  function adaugaOptiune(grup, valoare) {
    const x = optiuniRef.current;
    salveazaOptiuni({ ...x, [grup]: [...(x[grup] || []), valoare] });
  }
  function stergeOptiune(grup, value) {
    const x = optiuniRef.current;
    salveazaOptiuni({ ...x, [grup]: (x[grup] || []).filter(item => item.value !== value) });
  }
  // Ascunde o valoare FIXA (din cod) — nu o sterge din date, doar o adauga la
  // lista de ascunse, ca sa nu mai apara. Poate fi re-adaugata prin "+Adaugă".
  function ascundeFix(grup, value) {
    const x = optiuniRef.current;
    const ascunse = x.ascunse || {};
    salveazaOptiuni({ ...x, ascunse: { ...ascunse, [grup]: [...(ascunse[grup] || []), value] } });
  }

  // Culori / Teme / Ocazii: liste tinute pe cheia tipului de produs curent (p.category).
  function adaugaOptiuneTip(grup, valoare) {
    const x = optiuniRef.current;
    const tip = p.category;
    const curent = x[grup]?.[tip] || [];
    salveazaOptiuni({ ...x, [grup]: { ...x[grup], [tip]: [...curent, valoare] } });
  }
  function stergeOptiuneTip(grup, cheie) {
    const x = optiuniRef.current;
    const tip = p.category;
    const curent = x[grup]?.[tip] || [];
    const ramase = grup === "culori" ? curent.filter(c => c.nume !== cheie) : curent.filter(v => v !== cheie);
    salveazaOptiuni({ ...x, [grup]: { ...x[grup], [tip]: ramase } });
  }
  function ascundeFixTip(grup, valoare) {
    const x = optiuniRef.current;
    const tip = p.category;
    const ascunse = x.ascunse || {};
    const curent = ascunse[grup]?.[tip] || [];
    salveazaOptiuni({ ...x, ascunse: { ...ascunse, [grup]: { ...ascunse[grup], [tip]: [...curent, valoare] } } });
  }

  // Confirmare comuna pentru toate cele 5 stergeri de mai jos.
  const [confirmStergere, setConfirmStergere] = useState(null); // { mesaj, onYes }
  const cereConfirmare = (mesaj, onYes) => setConfirmStergere({ mesaj, onYes });

  const ascunse = optiuni.ascunse || {};
  const tipuriAscunse = new Set(ascunse.tipuriProdus || []);
  const navAscunse = new Set(ascunse.categoriiNav || []);

  const tipuriFixe = CATEGORII_TIP.filter(t => !tipuriAscunse.has(t.value));
  const navFixe = CATEGORII_NAV.filter(c => !navAscunse.has(c.value));
  const tipuriEfective = [...tipuriFixe, ...optiuni.tipuriProdus];
  const navEfective = [...navFixe, ...optiuni.categoriiNav];

  // Listele pentru tipul curent, calculate in lib/optiuni.js — acelasi cod pe
  // care il foloseste si catalogul public pentru filtre.
  const liste = listeTip(optiuni, p.category);
  const culoriTip = liste.culori.custom;   // doar cele adaugate din admin (se pot sterge)
  const temeTip = liste.teme.custom;
  const ocaziiTip = liste.ocazii.custom;

  const culoriEfective = liste.culori.toate.map(c => c.nume);
  const hexEfectiv = Object.fromEntries(liste.culori.toate.map(c => [c.nume, c.hex]));
  const temeEfective = liste.teme.toate;
  const ocaziiEfective = liste.ocazii.toate;

  // Prima imagine a primei culori bifate — devine imaginea principala a
  // produsului cand exista culori, ca sa nu tinem doua surse de adevar.
  const imgPrincipala = imaginePrincipala(p);

  async function save() {
    const isNew = !p.id;
    const payload = {
      ...p,
      // Salvam si in `img`, ca restul site-ului (cos, navbar, sitemap) sa
      // poata folosi un singur camp, fara sa stie de imaginile pe culoare.
      img: imgPrincipala,
      price: Number(p.price),
      oldPrice: p.oldPrice ? Number(p.oldPrice) : undefined,
      id: p.id || Date.now().toString(),
    };
    const res = isNew
      ? await fetch("/api/produse", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      : await fetch(`/api/produse/${p.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!res.ok) { const d = await res.json().catch(() => ({})); alert(d.error || `Eroare ${res.status}`); return; }
    onSave();
  }

  return (
    <div>
      {/* Informații de bază */}
      <SectionBlock title="Informații de bază">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px", gap: 10 }}>
          <Input label="Nume produs" value={p.name} onChange={set("name")} />
          <Input label="Preț (lei)" value={p.price} onChange={set("price")} type="number" />
          <Input label="Preț vechi" value={p.oldPrice} onChange={set("oldPrice")} type="number" />
        </div>
      </SectionBlock>

      {/* Tip produs */}
      <SectionBlock title="Tip produs">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {tipuriEfective.map(t => {
            const custom = optiuni.tipuriProdus.some(x => x.value === t.value);
            return (
              <TipProdusButon key={t.value} label={t.label} active={p.category === t.value}
                onClick={() => schimbaTip(t.value)}
                onDelete={() => cereConfirmare(
                  custom
                    ? `Ștergi tipul de produs „${t.label}”? Produsele care îl folosesc deja nu se șterg, dar nu va mai putea fi ales pentru altele noi.`
                    : `Ștergi tipul de produs „${t.label}”? Dispare din listă, dar poate fi adăugat din nou oricând cu „+ Adaugă”.`,
                  () => {
                    if (custom) stergeOptiune("tipuriProdus", t.value);
                    else ascundeFix("tipuriProdus", t.value);
                    if (p.category === t.value) schimbaTip("stative");
                  }
                )}
              />
            );
          })}
          <AdaugaEticheta placeholder="Tip produs nou…" onAdd={label => {
            const value = slugify(label);
            if (!value || tipuriEfective.some(t => t.value === value)) return;
            adaugaOptiune("tipuriProdus", { value, label });
            schimbaTip(value);
          }} />
        </div>
      </SectionBlock>

      {/* Categorie navigare */}
      <SectionBlock title="Categorie (navigare site)">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          {navEfective.map(c => {
            const custom = optiuni.categoriiNav.some(x => x.value === c.value);
            return (
              <Pill key={c.value} label={c.label}
                active={(p.tags || []).includes(c.value)}
                onClick={() => toggleArr("tags", c.value)}
                onDelete={() => cereConfirmare(
                  custom
                    ? `Ștergi categoria „${c.label}”? Produsele care o folosesc deja nu se șterg, dar nu va mai putea fi aleasă pentru altele noi.`
                    : `Ștergi categoria „${c.label}”? Dispare din listă, dar poate fi adăugată din nou oricând cu „+ Adaugă”.`,
                  () => {
                    if (custom) stergeOptiune("categoriiNav", c.value);
                    else ascundeFix("categoriiNav", c.value);
                    if ((p.tags || []).includes(c.value)) toggleArr("tags", c.value);
                  }
                )}
              />
            );
          })}
          <AdaugaEticheta placeholder="Categorie nouă…" onAdd={label => {
            const value = slugify(label);
            if (!value || navEfective.some(c => c.value === value)) return;
            adaugaOptiune("categoriiNav", { value, label });
            toggleArr("tags", value);
          }} />
        </div>
      </SectionBlock>

      {/* Cand produsul are culori, imaginile se pun pe fiecare culoare in
          parte (mai jos), iar cea principala e prima imagine a primei culori.
          Fara culori, produsul are o galerie proprie: prima = principala. */}
      <SectionBlock title="Imagini">
        {(p.culori || []).length > 0 ? (
          <div style={{ display: "flex", gap: 12, alignItems: "center", border: `1px solid ${C.border}`, borderRadius: 8, padding: 10 }}>
            {imgPrincipala
              ? <img src={imgPrincipala} alt="" style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
              : <div style={{ width: 64, height: 64, borderRadius: 6, background: "#f1f1f1", flexShrink: 0 }} />}
            <p style={{ margin: 0, fontSize: 12, color: C.muted, lineHeight: 1.5 }}>
              Produsul are culori, deci imaginile se adaugă la fiecare culoare, mai jos.
              Principală: prima imagine a culorii <strong style={{ color: C.text }}>{p.culori[0]}</strong>.
              {!imgPrincipala && " Adaugă o imagine la acea culoare."}
            </p>
          </div>
        ) : (
          <>
            <p style={{ margin: "-4px 0 8px", fontSize: 11, color: C.muted }}>
              Prima imagine e cea principală (apare pe card și în coș), restul sunt secundare.
            </p>
            <MultiImageUpload
              images={p.imagini}
              onChange={v => set("imagini")(v)}
              marcheazaPrincipala
            />
          </>
        )}
      </SectionBlock>

      {/* Descriere */}
      <SectionBlock title="Descriere">
        <Textarea label="" value={p.descriere} onChange={set("descriere")} rows={3} />
      </SectionBlock>

      {/* Vizibilitate */}
      <SectionBlock title="Vizibilitate">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {TAGS_LIST.map(v => (
            <Pill key={v} label={v} active={(p.tags || []).includes(v)} onClick={() => toggleArr("tags", v)} />
          ))}
        </div>
      </SectionBlock>

      {/* Culori */}
      <SectionBlock title="Culori disponibile">
        <p style={{ margin: "-4px 0 8px", fontSize: 11, color: C.muted }}>
          Doar pentru tipul „{tipuriEfective.find(t => t.value === p.category)?.label || p.category}” — fiecare tip de produs are propria listă.
        </p>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center" }}>
          {culoriEfective.map(v => {
            const custom = culoriTip.some(c => c.nume === v);
            return (
              <ColorSwatch key={v} name={v} hex={hexEfectiv[v]} active={(p.culori || []).includes(v)} onToggle={() => toggleArr("culori", v)}
                onDelete={() => cereConfirmare(
                  custom
                    ? `Ștergi culoarea „${v}”? Produsele care o folosesc deja nu se șterg, dar nu va mai putea fi aleasă pentru altele noi.`
                    : `Ștergi culoarea „${v}”? Dispare din listă, dar poate fi adăugată din nou oricând cu „+ Nouă”.`,
                  () => {
                    if (custom) stergeOptiuneTip("culori", v);
                    else ascundeFixTip("culori", v);
                    if ((p.culori || []).includes(v)) toggleArr("culori", v);
                  }
                )}
              />
            );
          })}
          <AdaugaCuloare onAdd={({ nume, hex }) => {
            if (!nume || culoriEfective.includes(nume)) return;
            adaugaOptiuneTip("culori", { nume, hex });
            toggleArr("culori", nume);
          }} />
        </div>
        {(p.culori || []).length > 0 && (
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            {p.culori.map(culoare => (
              <div key={culoare} style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: 10 }}>
                <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, color: C.text }}>Imagini pentru „{culoare}”</p>
                <MultiImageUpload
                  images={p.imaginiCulori?.[culoare]}
                  onChange={urls => setP(x => ({ ...x, imaginiCulori: { ...x.imaginiCulori, [culoare]: urls } }))}
                />
              </div>
            ))}
          </div>
        )}
      </SectionBlock>

      {/* Temă */}
      <SectionBlock title="Temă / Motiv">
        <p style={{ margin: "-4px 0 8px", fontSize: 11, color: C.muted }}>
          Doar pentru tipul „{tipuriEfective.find(t => t.value === p.category)?.label || p.category}” — fiecare tip de produs are propria listă.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          {temeEfective.map(v => {
            const custom = temeTip.includes(v);
            return (
              <Pill key={v} label={v} active={(p.tema || []).includes(v)} onClick={() => toggleArr("tema", v)}
                onDelete={() => cereConfirmare(
                  custom
                    ? `Ștergi tema „${v}”? Produsele care o folosesc deja nu se șterg, dar nu va mai putea fi aleasă pentru altele noi.`
                    : `Ștergi tema „${v}”? Dispare din listă, dar poate fi adăugată din nou oricând cu „+ Adaugă”.`,
                  () => {
                    if (custom) stergeOptiuneTip("teme", v);
                    else ascundeFixTip("teme", v);
                    if ((p.tema || []).includes(v)) toggleArr("tema", v);
                  }
                )}
              />
            );
          })}
          <AdaugaEticheta placeholder="Temă nouă…" onAdd={v => {
            if (!v || temeEfective.includes(v)) return;
            adaugaOptiuneTip("teme", v);
            toggleArr("tema", v);
          }} />
        </div>
      </SectionBlock>

      {/* Ocazie */}
      <SectionBlock title="Ocazie / Circumstanțe">
        <p style={{ margin: "-4px 0 8px", fontSize: 11, color: C.muted }}>
          Doar pentru tipul „{tipuriEfective.find(t => t.value === p.category)?.label || p.category}” — fiecare tip de produs are propria listă.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          {ocaziiEfective.map(v => {
            const custom = ocaziiTip.includes(v);
            return (
              <Pill key={v} label={v} active={(p.ocazie || []).includes(v)} onClick={() => toggleArr("ocazie", v)}
                onDelete={() => cereConfirmare(
                  custom
                    ? `Ștergi ocazia „${v}”? Produsele care o folosesc deja nu se șterg, dar nu va mai putea fi aleasă pentru altele noi.`
                    : `Ștergi ocazia „${v}”? Dispare din listă, dar poate fi adăugată din nou oricând cu „+ Adaugă”.`,
                  () => {
                    if (custom) stergeOptiuneTip("ocazii", v);
                    else ascundeFixTip("ocazii", v);
                    if ((p.ocazie || []).includes(v)) toggleArr("ocazie", v);
                  }
                )}
              />
            );
          })}
          <AdaugaEticheta placeholder="Ocazie nouă…" onAdd={v => {
            if (!v || ocaziiEfective.includes(v)) return;
            adaugaOptiuneTip("ocazii", v);
            toggleArr("ocazie", v);
          }} />
        </div>
      </SectionBlock>

      {/* Recenzii si FAQ — au nevoie de id-ul produsului, deci doar dupa
          prima salvare (produsul nou trebuie salvat intai). */}
      <SectionBlock title="Recenzii produs">
        {p.id ? <ProdusRecenzii produsId={p.id} /> : (
          <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>Salvează produsul întâi pentru a adăuga recenzii.</p>
        )}
      </SectionBlock>

      <SectionBlock title="Întrebări frecvente (FAQ) produs">
        {p.id ? <ProdusFaq produsId={p.id} /> : (
          <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>Salvează produsul întâi pentru a adăuga întrebări.</p>
        )}
      </SectionBlock>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 4 }}>
        <button onClick={onClose} style={btnGhost}>Anulează</button>
        <button onClick={save} style={btnPrimary}>Salvează</button>
      </div>

      {confirmStergere && (
        <Confirm
          message={confirmStergere.mesaj}
          onYes={() => { confirmStergere.onYes(); setConfirmStergere(null); }}
          onNo={() => setConfirmStergere(null)}
        />
      )}
    </div>
  );
}

function SectionProduse() {
  const [produse, setProduse] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const load = () => fetch("/api/produse").then(r => r.json()).then(data => setProduse(Array.isArray(data) ? data : []));
  useEffect(() => { load(); }, []);

  const filtered = produse.filter(p => (p.name + p.category).toLowerCase().includes(search.toLowerCase()));

  async function del(id) {
    const res = await fetch(`/api/produse/${id}`, { method: "DELETE" });
    if (!res.ok) { const d = await res.json().catch(() => ({})); alert(d.error || `Eroare ${res.status}`); return; }
    load();
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ position: "relative", maxWidth: 300, flex: "1 1 220px" }}>
          <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: C.muted, pointerEvents: "none" }}>
            <Iconita nume="cauta" size={15} />
          </span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Caută produs…" style={{ ...inp, paddingLeft: 34 }} />
        </div>
        <button onClick={() => setModal({ mode: "new", data: emptyProdus })} style={btnPrimary}>+ Produs nou</button>
        <Badge color={C.success}>{produse.length} produse</Badge>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${C.border}` }}>
              {["Img","Nume","Cat.","Preț","Tags",""].map(h => <th key={h} style={{ padding: "8px 12px", color: C.muted, fontWeight: 700, textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: "8px 12px" }}>{p.img && <img src={p.img} alt="" style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover" }} />}</td>
                <td style={{ padding: "8px 12px", fontWeight: 600, maxWidth: 200 }}>{p.name}</td>
                <td style={{ padding: "8px 12px" }}><Badge>{p.category}</Badge></td>
                <td style={{ padding: "8px 12px", fontWeight: 700, whiteSpace: "nowrap" }}>
                  {p.price} lei{p.oldPrice ? <span style={{ color: C.muted, textDecoration: "line-through", marginLeft: 6, fontWeight: 400 }}>{p.oldPrice}</span> : null}
                </td>
                <td style={{ padding: "8px 12px" }}><div style={{ display: "flex", gap: 4 }}>{(p.tags || []).map(t => <Badge key={t} color="#6366f1">{t}</Badge>)}</div></td>
                <td style={{ padding: "8px 12px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => setModal({ mode: "edit", data: p })} style={{ ...btnGhost, padding: "5px 12px", fontSize: 12 }}><Iconita nume="editeaza" size={13} /></button>
                    <button onClick={() => setConfirm(p.id)} style={btnDanger}><Iconita nume="sterge" size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && <Modal title={modal.mode === "new" ? "Produs nou" : `Editează: ${modal.data.name}`} onClose={() => setModal(null)}>
        <ProdusForm initial={modal.data} onSave={() => { load(); setModal(null); }} onClose={() => setModal(null)} />
      </Modal>}
      {confirm && <Confirm message="Ștergi acest produs?" onYes={() => { del(confirm); setConfirm(null); }} onNo={() => setConfirm(null)} />}
    </div>
  );
}

/* ─── HERO ─── */
function SlideForm({ initial, onSave, onClose }) {
  const [s, setS] = useState({ id: "", img: "", alt: "", link: "", ...initial });
  const set = k => v => setS(x => ({ ...x, [k]: v }));
  async function save() {
    const res = !s.id
      ? await fetch("/api/hero", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...s, id: Date.now().toString() }) })
      : await fetch(`/api/hero/${s.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(s) });
    if (!res.ok) { const d = await res.json().catch(() => ({})); alert(d.error || `Eroare ${res.status}`); return; }
    onSave();
  }
  return (
    <div>
      <ImageUpload label="Imagine" value={s.img} onChange={set("img")} height={140} />
      <Input label="Alt text" value={s.alt} onChange={set("alt")} />
      <Input label="Link (unde ajunge clientul dacă apasă pe ofertă)" value={s.link} onChange={set("link")} placeholder="/produse, /produse/id-produs sau URL extern" />
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={btnGhost}>Anulează</button>
        <button onClick={save} style={btnPrimary}>Salvează</button>
      </div>
    </div>
  );
}

function SectionHero() {
  const [slides, setSlides] = useState([]);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const load = () => fetch("/api/hero").then(r => r.json()).then(setSlides);
  useEffect(() => { load(); }, []);

  async function del(id) {
    const res = await fetch(`/api/hero/${id}`, { method: "DELETE" });
    if (!res.ok) { const d = await res.json().catch(() => ({})); alert(d.error || `Eroare ${res.status}`); return; }
    load();
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}><button onClick={() => setEditing({})} style={btnPrimary}>+ Slide nou</button></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
        {slides.map(s => (
          <div key={s.id} style={{ ...card, padding: 0, overflow: "hidden" }}>
            {s.img && <img src={s.img} alt="" style={{ width: "100%", height: 130, objectFit: "cover" }} />}
            <div style={{ padding: 14 }}>
              <p style={{ margin: "0 0 6px", color: C.muted, fontSize: 13 }}>{s.alt}</p>
              <p style={{ margin: "0 0 12px", fontSize: 12 }}>{s.link ? <span style={{ color: C.accentDark, fontWeight: 600 }}>→ {s.link}</span> : <span style={{ color: C.muted }}>Fără link (duce la /produse)</span>}</p>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setEditing(s)} style={{ ...btnGhost, padding: "5px 12px", fontSize: 12 }}><Iconita nume="editeaza" size={13} /> Edit</button>
                <button onClick={() => setConfirm(s.id)} style={btnDanger}><Iconita nume="sterge" size={13} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editing !== null && <Modal title={editing.id ? "Editează slide" : "Slide nou"} onClose={() => setEditing(null)}>
        <SlideForm initial={editing} onSave={() => { load(); setEditing(null); }} onClose={() => setEditing(null)} />
      </Modal>}
      {confirm && <Confirm message="Ștergi acest slide?" onYes={() => { del(confirm); setConfirm(null); }} onNo={() => setConfirm(null)} />}
    </div>
  );
}

/* ─── BLOG ─── */
const emptyArticol = { slug: "", titlu: "", rezumat: "", continut: "", categorie: "", data: "", citire: 3, img: "" };

function ArticolForm({ initial, onSave, onClose }) {
  const [a, setA] = useState({ ...emptyArticol, ...initial });
  const set = k => v => setA(x => ({ ...x, [k]: v }));
  async function save() {
    const isNew = !initial.slug;
    const url = isNew ? "/api/blog" : `/api/blog/${initial.slug}`;
    const res = await fetch(url, { method: isNew ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(a) });
    if (!res.ok) { const d = await res.json().catch(() => ({})); alert(d.error || `Eroare ${res.status}`); return; }
    onSave();
  }
  return (
    <div>
      <div style={row}>
        <div style={{ flex: "0 0 68%", minWidth: 0 }}><Input label="Titlu" value={a.titlu} onChange={set("titlu")} /></div>
        <div style={{ flex: "0 0 28%", minWidth: 0 }}><Input label="Timp citire (min)" value={a.citire} onChange={set("citire")} type="number" /></div>
      </div>
      <div style={row}>
        <div style={{ flex: "0 0 48%", minWidth: 0 }}><Input label="Categorie" value={a.categorie} onChange={set("categorie")} /></div>
        <div style={{ flex: "0 0 48%", minWidth: 0 }}><Input label="Data (YYYY-MM-DD)" value={a.data} onChange={set("data")} /></div>
      </div>
      <ImageUpload label="Imagine" value={a.img} onChange={set("img")} />
      <Textarea label="Rezumat" value={a.rezumat} onChange={set("rezumat")} rows={3} />
      <Textarea label="Conținut" value={a.continut} onChange={set("continut")} rows={8} />
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={btnGhost}>Anulează</button>
        <button onClick={save} style={btnPrimary}>Salvează</button>
      </div>
    </div>
  );
}

function SectionBlog() {
  const [articole, setArticole] = useState([]);
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const load = () => fetch("/api/blog").then(r => r.json()).then(setArticole);
  useEffect(() => { load(); }, []);

  async function del(slug) {
    const res = await fetch(`/api/blog/${slug}`, { method: "DELETE" });
    if (!res.ok) { const d = await res.json().catch(() => ({})); alert(d.error || `Eroare ${res.status}`); return; }
    load();
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}><button onClick={() => setModal({ mode: "new", data: emptyArticol })} style={btnPrimary}>+ Articol nou</button></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 16 }}>
        {articole.map(a => (
          <div key={a.slug} style={{ ...card, padding: 0, overflow: "hidden" }}>
            {a.img && <img src={a.img} alt="" style={{ width: "100%", height: 120, objectFit: "cover" }} />}
            <div style={{ padding: 14 }}>
              {a.categorie && <Badge>{a.categorie}</Badge>}
              <p style={{ margin: "8px 0 4px", fontWeight: 700, fontSize: 14 }}>{a.titlu}</p>
              <p style={{ margin: "0 0 12px", color: C.muted, fontSize: 12 }}>{a.rezumat?.slice(0, 80)}…</p>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setModal({ mode: "edit", data: a })} style={{ ...btnGhost, padding: "5px 12px", fontSize: 12 }}><Iconita nume="editeaza" size={13} /> Edit</button>
                <button onClick={() => setConfirm(a.slug)} style={btnDanger}><Iconita nume="sterge" size={13} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modal && <Modal title={modal.mode === "new" ? "Articol nou" : `Editează: ${modal.data.titlu}`} onClose={() => setModal(null)}>
        <ArticolForm initial={modal.data} onSave={() => { load(); setModal(null); }} onClose={() => setModal(null)} />
      </Modal>}
      {confirm && <Confirm message="Ștergi acest articol?" onYes={() => { del(confirm); setConfirm(null); }} onNo={() => setConfirm(null)} />}
    </div>
  );
}

/* ─── RECENZII ─── */
function RecenzieForm({ initial, onSave, onClose }) {
  const [r, setR] = useState({ id: "", avatar: "", nume: "", text: "", rating: 5, ...initial });
  const set = k => v => setR(x => ({ ...x, [k]: v }));
  async function save() {
    const res = !r.id
      ? await fetch("/api/recenzii", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(r) })
      : await fetch(`/api/recenzii/${r.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(r) });
    if (!res.ok) { const d = await res.json().catch(() => ({})); alert(d.error || `Eroare ${res.status}`); return; }
    onSave();
  }
  return (
    <div>
      <Input label="Nume client" value={r.nume} onChange={set("nume")} />
      <label style={lbl}>Notă (stele)</label>
      <StarPicker value={r.rating} onChange={set("rating")} />
      <ImageUpload label="Avatar" value={r.avatar} onChange={set("avatar")} height={80} />
      <Textarea label="Recenzie" value={r.text} onChange={set("text")} rows={3} />
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={btnGhost}>Anulează</button>
        <button onClick={save} style={btnPrimary}>Salvează</button>
      </div>
    </div>
  );
}

/* Recenzii/FAQ legate de un produs anume — reutilizeaza RecenzieForm/FaqForm
   (mai sus), doar ca filtreaza dupa produsId si il seteaza automat la salvare. */
function ProdusRecenzii({ produsId }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const load = () => fetch("/api/recenzii").then(r => r.json()).then(all => setItems(all.filter(r => r.produsId === produsId)));
  useEffect(() => { load(); }, [produsId]);

  async function del(id) {
    const res = await fetch(`/api/recenzii/${id}`, { method: "DELETE" });
    if (!res.ok) { const d = await res.json().catch(() => ({})); alert(d.error || `Eroare ${res.status}`); return; }
    load();
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
        {items.map(r => (
          <div key={r.id} style={{ display: "flex", gap: 10, alignItems: "center", border: `1px solid ${C.border}`, borderRadius: 8, padding: 8 }}>
            {r.avatar && <img src={r.avatar} alt="" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>{r.nume} <Stele nota={r.rating || 5} size={11} /></p>
              <p style={{ margin: 0, fontSize: 12, color: C.muted, fontStyle: "italic" }}>„{r.text}”</p>
            </div>
            <button onClick={() => setEditing(r)} style={{ ...btnGhost, padding: "4px 10px", fontSize: 11, flexShrink: 0 }}><Iconita nume="editeaza" size={13} /></button>
            <button onClick={() => setConfirm(r.id)} style={{ ...btnDanger, flexShrink: 0 }}><Iconita nume="sterge" size={13} /></button>
          </div>
        ))}
        {items.length === 0 && <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>Nicio recenzie încă pentru acest produs.</p>}
      </div>
      <button onClick={() => setEditing({})} style={{ ...btnGhost, fontSize: 12, padding: "6px 14px" }}>+ Recenzie</button>
      {editing !== null && <Modal title={editing.id ? "Editează recenzie" : "Recenzie nouă"} onClose={() => setEditing(null)}>
        <RecenzieForm initial={{ ...editing, produsId }} onSave={() => { load(); setEditing(null); }} onClose={() => setEditing(null)} />
      </Modal>}
      {confirm && <Confirm message="Ștergi această recenzie?" onYes={() => { del(confirm); setConfirm(null); }} onNo={() => setConfirm(null)} />}
    </div>
  );
}

function ProdusFaq({ produsId }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const load = () => fetch("/api/faq").then(r => r.json()).then(all => setItems(all.filter(f => f.produsId === produsId)));
  useEffect(() => { load(); }, [produsId]);

  async function del(id) {
    const res = await fetch(`/api/faq/${id}`, { method: "DELETE" });
    if (!res.ok) { const d = await res.json().catch(() => ({})); alert(d.error || `Eroare ${res.status}`); return; }
    load();
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
        {items.map((f, i) => (
          <div key={f.id} style={{ display: "flex", gap: 10, alignItems: "flex-start", border: `1px solid ${C.border}`, borderRadius: 8, padding: 8 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 12 }}>{i + 1}. {f.intrebare}</p>
              <p style={{ margin: 0, fontSize: 12, color: C.muted }}>{f.raspuns}</p>
            </div>
            <button onClick={() => setEditing(f)} style={{ ...btnGhost, padding: "4px 10px", fontSize: 11, flexShrink: 0 }}><Iconita nume="editeaza" size={13} /></button>
            <button onClick={() => setConfirm(f.id)} style={{ ...btnDanger, flexShrink: 0 }}><Iconita nume="sterge" size={13} /></button>
          </div>
        ))}
        {items.length === 0 && <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>Nicio întrebare încă pentru acest produs.</p>}
      </div>
      <button onClick={() => setEditing({})} style={{ ...btnGhost, fontSize: 12, padding: "6px 14px" }}>+ Întrebare</button>
      {editing !== null && <Modal title={editing.id ? "Editează întrebare" : "Întrebare nouă"} onClose={() => setEditing(null)}>
        <FaqForm initial={{ ...editing, produsId }} onSave={() => { load(); setEditing(null); }} onClose={() => setEditing(null)} />
      </Modal>}
      {confirm && <Confirm message="Ștergi această întrebare?" onYes={() => { del(confirm); setConfirm(null); }} onNo={() => setConfirm(null)} />}
    </div>
  );
}

function SectionRecenzii() {
  const [recenzii, setRecenzii] = useState([]);
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null);

  // Recenziile legate de un produs se gestioneaza din formularul produsului
  // (ProdusRecenzii); aici ramane doar lista globala (homepage).
  const load = () => fetch("/api/recenzii").then(r => r.json()).then(data => setRecenzii(data.filter(r => !r.produsId)));
  useEffect(() => { load(); }, []);

  async function del(id) {
    const res = await fetch(`/api/recenzii/${id}`, { method: "DELETE" });
    if (!res.ok) { const d = await res.json().catch(() => ({})); alert(d.error || `Eroare ${res.status}`); return; }
    load();
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}><button onClick={() => setModal({})} style={btnPrimary}>+ Recenzie nouă</button></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {recenzii.map(r => (
          <div key={r.id} style={card}>
            <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
              {r.avatar && <img src={r.avatar} alt="" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />}
              <div>
                <p style={{ margin: 0, fontWeight: 700 }}>{r.nume}</p>
                <Stele nota={r.rating || 5} />
              </div>
            </div>
            <p style={{ margin: "0 0 12px", color: C.muted, fontSize: 13, fontStyle: "italic" }}>"{r.text}"</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setModal({ ...r })} style={{ ...btnGhost, padding: "5px 12px", fontSize: 12 }}><Iconita nume="editeaza" size={13} /> Edit</button>
              <button onClick={() => setConfirm(r.id)} style={btnDanger}><Iconita nume="sterge" size={13} /></button>
            </div>
          </div>
        ))}
      </div>
      {modal !== null && <Modal title="Recenzie" onClose={() => setModal(null)}>
        <RecenzieForm initial={modal} onSave={() => { load(); setModal(null); }} onClose={() => setModal(null)} />
      </Modal>}
      {confirm && <Confirm message="Ștergi această recenzie?" onYes={() => { del(confirm); setConfirm(null); }} onNo={() => setConfirm(null)} />}
    </div>
  );
}

/* ─── FAQ ─── */
function FaqForm({ initial, onSave, onClose }) {
  const [f, setF] = useState({ id: "", intrebare: "", raspuns: "", ...initial });
  const set = k => v => setF(x => ({ ...x, [k]: v }));
  async function save() {
    const res = !f.id
      ? await fetch("/api/faq", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) })
      : await fetch(`/api/faq/${f.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
    if (!res.ok) { const d = await res.json().catch(() => ({})); alert(d.error || `Eroare ${res.status}`); return; }
    onSave();
  }
  return (
    <div>
      <Input label="Întrebare" value={f.intrebare} onChange={set("intrebare")} />
      <Textarea label="Răspuns" value={f.raspuns} onChange={set("raspuns")} rows={5} />
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={btnGhost}>Anulează</button>
        <button onClick={save} style={btnPrimary}>Salvează</button>
      </div>
    </div>
  );
}

function SectionFAQ() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null);

  // La fel ca la recenzii: intrebarile legate de un produs se gestioneaza
  // din formularul produsului (ProdusFaq); aici ramane doar FAQ-ul global.
  const load = () => fetch("/api/faq").then(r => r.json()).then(data => setItems(data.filter(f => !f.produsId)));
  useEffect(() => { load(); }, []);

  async function del(id) {
    const res = await fetch(`/api/faq/${id}`, { method: "DELETE" });
    if (!res.ok) { const d = await res.json().catch(() => ({})); alert(d.error || `Eroare ${res.status}`); return; }
    load();
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}><button onClick={() => setModal({})} style={btnPrimary}>+ Întrebare nouă</button></div>
      {items.map((f, i) => (
        <div key={f.id} style={{ ...card, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 14 }}>{i + 1}. {f.intrebare}</p>
            <p style={{ margin: 0, color: C.muted, fontSize: 13, lineHeight: 1.6 }}>{f.raspuns}</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button onClick={() => setModal({ ...f })} style={{ ...btnGhost, padding: "5px 12px", fontSize: 12 }}><Iconita nume="editeaza" size={13} /></button>
            <button onClick={() => setConfirm(f.id)} style={btnDanger}><Iconita nume="sterge" size={13} /></button>
          </div>
        </div>
      ))}
      {modal !== null && <Modal title="FAQ" onClose={() => setModal(null)}>
        <FaqForm initial={modal} onSave={() => { load(); setModal(null); }} onClose={() => setModal(null)} />
      </Modal>}
      {confirm && <Confirm message="Ștergi această întrebare?" onYes={() => { del(confirm); setConfirm(null); }} onNo={() => setConfirm(null)} />}
    </div>
  );
}

/* ─── CATEGORII ─── */
/* ─── SETĂRI ─── */
function SectionSetari() {
  const [s, setS] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetch("/api/setari").then(r => r.json()).then(setS); }, []);

  function set(path, v) {
    setS(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let cur = next;
      for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
      cur[keys[keys.length - 1]] = v;
      return next;
    });
  }

  async function save() {
    const res = await fetch("/api/setari", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(s) });
    if (!res.ok) { const d = await res.json().catch(() => ({})); alert(d.error || `Eroare ${res.status}`); return; }
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  }

  if (!s) return <p style={{ color: C.muted }}>Se încarcă…</p>;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div style={card}>
          <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 800, display: "flex", alignItems: "center", gap: 8 }}><Iconita nume="telefon" size={15} />Contact</h4>
          <Input label="Email" value={s.contact?.email} onChange={v => set("contact.email", v)} />
          <Input label="Telefon" value={s.contact?.telefon} onChange={v => set("contact.telefon", v)} />
          <Input label="Adresă" value={s.contact?.adresa} onChange={v => set("contact.adresa", v)} />
          <Input label="Program" value={s.contact?.program} onChange={v => set("contact.program", v)} />
        </div>
        <div style={card}>
          <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 800, display: "flex", alignItems: "center", gap: 8 }}><Iconita nume="social" size={15} />Social Media</h4>
          <Input label="Instagram URL" value={s.social?.instagram} onChange={v => set("social.instagram", v)} />
          <Input label="Facebook URL" value={s.social?.facebook} onChange={v => set("social.facebook", v)} />
          <Input label="TikTok URL" value={s.social?.tiktok} onChange={v => set("social.tiktok", v)} />
        </div>
        <div style={card}>
          <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 800, display: "flex", alignItems: "center", gap: 8 }}><Iconita nume="site" size={15} />Site general</h4>
          <Input label="Nume site" value={s.site?.numeSite} onChange={v => set("site.numeSite", v)} />
          <div style={row}>
            <div style={{ flex: 1, minWidth: 0 }}><Input label="Logo text 1" value={s.site?.logoText1} onChange={v => set("site.logoText1", v)} /></div>
            <div style={{ flex: 1, minWidth: 0 }}><Input label="Logo text 2" value={s.site?.logoText2} onChange={v => set("site.logoText2", v)} /></div>
          </div>
          <Textarea label="Slogan / footer" value={s.site?.slogan} onChange={v => set("site.slogan", v)} rows={2} />
          <Input label="Copyright" value={s.site?.copyright} onChange={v => set("site.copyright", v)} />
        </div>
        <div style={card}>
          <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 800, display: "flex", alignItems: "center", gap: 8 }}><Iconita nume="recenzii" size={15} />Secțiunea Recenzii</h4>
          <Input label="Titlu secțiune" value={s.recenzii?.titluSectiune} onChange={v => set("recenzii.titluSectiune", v)} />
          <Input label="Milioane vizualizări" value={s.recenzii?.milioanePlatforma} onChange={v => set("recenzii.milioanePlatforma", v)} />
          <Textarea label="Text TikTok" value={s.recenzii?.textTikTok} onChange={v => set("recenzii.textTikTok", v)} rows={2} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={save} style={{ ...btnPrimary, padding: "11px 28px", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 8 }}>
          <Iconita nume="salveaza" size={15} /> Salvează toate setările
        </button>
        {saved && (
          <span style={{ color: C.success, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Iconita nume="bifa" size={15} strokeWidth={2.5} /> Salvat!
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── DASHBOARD ─── */
function SectionDashboard({ onNav }) {
  const [counts, setCounts] = useState({ produse: 0, blog: 0, recenzii: 0, faq: 0, hero: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/produse").then(r => r.json()),
      fetch("/api/blog").then(r => r.json()),
      fetch("/api/recenzii").then(r => r.json()),
      fetch("/api/faq").then(r => r.json()),
      fetch("/api/hero").then(r => r.json()),
    ]).then(([p, b, r, f, h]) => setCounts({ produse: p.length, blog: b.length, recenzii: r.length, faq: f.length, hero: h.length }));
  }, []);

  const stats = [
    { label: "Produse", count: counts.produse, icon: "produse", section: "Produse", color: "#f5a623" },
    { label: "Hero Slides", count: counts.hero, icon: "hero", section: "Hero", color: "#6366f1" },
    { label: "Articole Blog", count: counts.blog, icon: "blog", section: "Blog", color: "#22c55e" },
    { label: "Recenzii", count: counts.recenzii, icon: "recenzii", section: "Recenzii", color: "#ec4899" },
    { label: "Întrebări FAQ", count: counts.faq, icon: "faq", section: "FAQ", color: "#0ea5e9" },
  ];

  return (
    <div>
      <p style={{ color: C.muted, margin: "0 0 24px" }}>Bun venit în panoul de administrare ArtyZawaz.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 16, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} onClick={() => onNav(s.section)} style={{ ...card, cursor: "pointer", borderLeft: `4px solid ${s.color}`, marginBottom: 0 }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.09)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
          >
            <div style={{ color: s.color, marginBottom: 8 }}><Iconita nume={s.icon} size={24} /></div>
            <div style={{ fontSize: 30, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.count}</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ ...card, background: "#fffbeb", borderColor: "#fde68a", marginBottom: 0 }}>
        <p style={{ margin: 0, fontSize: 13, color: "#92400e", display: "flex", alignItems: "center", gap: 8 }}>
          <Iconita nume="sfat" size={16} />
          <span><strong>Sfat:</strong> Modificările la produse, recenzii și FAQ se reflectă automat pe site după salvare.</span>
        </p>
      </div>
    </div>
  );
}

/* ─── ADMINISTRATORI ─── */
function AdminForm({ initial, onSave, onClose }) {
  const [a, setA] = useState({ id: "", nume: "", email: "", parola: "", rol: "Admin", ...initial });
  const [err, setErr] = useState("");
  const set = k => v => setA(x => ({ ...x, [k]: v }));
  async function save() {
    if (!a.nume?.trim() || !a.email?.trim()) { setErr("Nume și email sunt obligatorii."); return; }
    if (!a.id && !a.parola?.trim()) { setErr("Parola este obligatorie pentru un administrator nou."); return; }
    setErr("");
    const res = !a.id
      ? await fetch("/api/utilizatori", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(a) })
      : await fetch(`/api/utilizatori/${a.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(a) });
    if (!res.ok) { const d = await res.json().catch(() => ({})); setErr(d.error || `Eroare ${res.status}`); return; }
    onSave();
  }
  return (
    <div>
      <Input label="Nume" value={a.nume} onChange={set("nume")} />
      <Input label="Email" value={a.email} onChange={set("email")} type="email" />
      <Input
        label={a.id ? "Parolă nouă (opțional)" : "Parolă"}
        value={a.parola}
        onChange={set("parola")}
        type="password"
        placeholder={a.id ? "Lasă gol pentru a păstra parola actuală" : "••••••••"}
      />
      <div style={{ marginBottom: 12 }}>
        <label style={lbl}>Rol</label>
        <div style={{ display: "flex", gap: 8 }}>
          {["Super Admin", "Admin"].map(r => (
            <button key={r} onClick={() => set("rol")(r)} style={{
              flex: 1, padding: "9px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700,
              border: a.rol === r ? `2px solid ${C.accent}` : `2px solid ${C.border}`,
              background: a.rol === r ? C.accent + "14" : "#fff",
              color: a.rol === r ? C.accentDark : C.text,
              transition: "all .12s",
            }}>{r}</button>
          ))}
        </div>
      </div>
      {err && <p style={{ color: C.danger, fontSize: 13, margin: "0 0 12px", fontWeight: 600 }}>{err}</p>}
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={btnGhost}>Anulează</button>
        <button onClick={save} style={btnPrimary}>Salvează</button>
      </div>
    </div>
  );
}

function SectionAdministratori() {
  const [admins, setAdmins] = useState([]);
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const load = () => fetch("/api/utilizatori").then(r => r.json()).then(setAdmins);
  useEffect(() => { load(); }, []);

  async function del(id) {
    const res = await fetch(`/api/utilizatori/${id}`, { method: "DELETE" });
    if (!res.ok) { const d = await res.json().catch(() => ({})); alert(d.error || `Eroare ${res.status}`); return; }
    load();
  }

  const rolColor = rol => rol === "Super Admin" ? "#8b5cf6" : C.accent;

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setModal({})} style={btnPrimary}>+ Administrator nou</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {admins.map(a => (
          <div key={a.id} style={card}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", background: C.accent + "1a", color: C.accentDark, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Iconita nume="utilizator" size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: C.text }}>{a.nume}</p>
                <p style={{ margin: "3px 0 0", color: C.muted, fontSize: 13 }}>{a.email}</p>
              </div>
              <Badge color={rolColor(a.rol)}>{a.rol || "Admin"}</Badge>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setModal({ ...a })} style={{ ...btnGhost, padding: "5px 12px", fontSize: 12 }}><Iconita nume="editeaza" size={13} /> Edit</button>
              <button onClick={() => setConfirm(a.id)} style={btnDanger}><Iconita nume="sterge" size={13} /></button>
            </div>
          </div>
        ))}
        {admins.length === 0 && (
          <p style={{ color: C.muted, fontSize: 14 }}>Niciun administrator găsit.</p>
        )}
      </div>
      {modal !== null && (
        <Modal title={modal.id ? "Editează administrator" : "Administrator nou"} onClose={() => setModal(null)}>
          <AdminForm initial={modal} onSave={() => { load(); setModal(null); }} onClose={() => setModal(null)} />
        </Modal>
      )}
      {confirm && (
        <Confirm message="Ștergi acest administrator?" onYes={() => { del(confirm); setConfirm(null); }} onNo={() => setConfirm(null)} />
      )}
    </div>
  );
}

/* ─── ROOT ─── */

const SECTIONS = [
  { id: "Dashboard", icon: "dashboard", label: "Dashboard" },
  { id: "Produse", icon: "produse", label: "Produse" },
  { id: "Hero", icon: "hero", label: "Hero Slider" },
  { id: "Blog", icon: "blog", label: "Blog" },
  { id: "Recenzii", icon: "recenzii", label: "Recenzii" },
  { id: "FAQ", icon: "faq", label: "FAQ" },
  { id: "Setari", icon: "setari", label: "Setări" },
  { id: "Administratori", icon: "administratori", label: "Administratori" },
];

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [err, setErr] = useState("");
  const [section, setSection] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  async function login() {
    setErr("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, parola }),
      });
      const data = await res.json();
      if (res.ok && data.ok) { setLoggedIn(true); localStorage.setItem("adminLoggedIn", "1"); }
      else setErr(data.error || "Email sau parolă incorectă.");
    } catch {
      setErr("Eroare de conexiune. Încearcă din nou.");
    }
  }

  if (!loggedIn) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: C.white, borderRadius: 20, padding: 40, width: "100%", maxWidth: 380, boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ color: C.accent, display: "flex", justifyContent: "center" }}><Iconita nume="scut" size={36} strokeWidth={1.5} /></div>
            <h1 style={{ margin: "8px 0 4px", fontSize: 22, fontWeight: 900 }}>Admin Panel</h1>
            <p style={{ margin: 0, color: C.muted, fontSize: 14 }}>ArtyZawaz</p>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inp} placeholder="admin@email.com" onKeyDown={e => e.key === "Enter" && login()} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Parolă</label>
            <input type="password" value={parola} onChange={e => setParola(e.target.value)} style={inp} placeholder="••••••••" onKeyDown={e => e.key === "Enter" && login()} />
          </div>
          {err && <p style={{ color: C.danger, fontSize: 13, margin: "0 0 12px", fontWeight: 600 }}>{err}</p>}
          <button onClick={login} style={{ ...btnPrimary, width: "100%", padding: 13, fontSize: 15 }}>Intră în admin</button>
        </div>
      </div>
    );
  }

  const SW = collapsed ? 64 : 220;

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif", background: C.bg }}>
      {/* Sidebar */}
      <aside style={{ width: SW, background: C.sidebar, color: "#fff", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100, transition: "width .2s", overflowX: "hidden" }}>
        <div style={{ padding: "18px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }} onClick={() => setCollapsed(o => !o)}>
          <span style={{ color: C.accent, display: "flex", flexShrink: 0 }}><Iconita nume="logo" size={20} /></span>
          {!collapsed && <span style={{ fontWeight: 900, fontSize: 14, whiteSpace: "nowrap" }}>ArtyZawaz Admin</span>}
        </div>
        <nav style={{ flex: 1, padding: "10px 8px", overflowY: "auto" }}>
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setSection(s.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 10px",
              borderRadius: 10, border: "none", cursor: "pointer", marginBottom: 2, textAlign: "left",
              background: section === s.id ? C.accent : "transparent",
              color: section === s.id ? "#fff" : "rgba(255,255,255,0.6)",
              fontWeight: section === s.id ? 700 : 500, fontSize: 14, transition: "all .15s",
            }}
              onMouseEnter={e => { if (section !== s.id) e.currentTarget.style.background = C.sidebarHov; }}
              onMouseLeave={e => { if (section !== s.id) e.currentTarget.style.background = "transparent"; }}
            >
              <Iconita nume={s.icon} />
              {!collapsed && <span style={{ whiteSpace: "nowrap" }}>{s.label}</span>}
            </button>
          ))}
        </nav>
        <div style={{ padding: "10px 8px", borderTop: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
          <a href="/" style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 10px", borderRadius: 10, textDecoration: "none", marginBottom: 2, background: "transparent", color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 600 }}
            onMouseEnter={e => e.currentTarget.style.background = C.sidebarHov}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <Iconita nume="site" />
            {!collapsed && "Vezi site"}
          </a>
          <button onClick={() => { setLoggedIn(false); localStorage.removeItem("adminLoggedIn"); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 10px", borderRadius: 10, border: "none", cursor: "pointer", background: "transparent", color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 600 }}>
            <Iconita nume="iesire" />
            {!collapsed && "Ieși"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, marginLeft: SW, transition: "margin-left .2s", minHeight: "100vh" }}>
        <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "15px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <h2 style={{ margin: 0, fontSize: 19, fontWeight: 900, display: "flex", alignItems: "center", gap: 9 }}>
            <Iconita nume={SECTIONS.find(s => s.id === section)?.icon} size={20} />
            {SECTIONS.find(s => s.id === section)?.label}
          </h2>
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 16px", background: C.accent, color: "#fff", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>← Vezi site</a>
        </div>
        <div style={{ padding: 28 }}>
          {section === "Dashboard" && <SectionDashboard onNav={setSection} />}
          {section === "Produse" && <SectionProduse />}
          {section === "Hero" && <SectionHero />}
          {section === "Blog" && <SectionBlog />}
          {section === "Recenzii" && <SectionRecenzii />}
          {section === "FAQ" && <SectionFAQ />}
          {section === "Setari" && <SectionSetari />}
          {section === "Administratori" && <SectionAdministratori />}
        </div>
      </main>
    </div>
  );
}
