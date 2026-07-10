"use client";
import { useState, useEffect, useRef } from "react";

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
const btnDanger = { background: C.danger, color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer" };
const btnGhost = { background: "transparent", color: C.muted, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" };
const card = { background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20, marginBottom: 12 };
const row = { display: "flex", gap: 12, flexWrap: "wrap" };

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
  { value: "pusculate", label: "Pușculițe" },
];
const CATEGORII_NAV = [
  { value: "fete", label: "Fete" },
  { value: "baieti", label: "Băieți" },
  { value: "sport", label: "Sport" },
  { value: "copii", label: "Copii" },
];
const CULORI_LIST = ["Alb","Albastru","Auriu","Galben","Gri","Maro","Negru","Negru-Alb","Portocaliu","Roz","Roșu","Verde","Violet"];
const COLOR_ADMIN_MAP = {
  "Alb": "#f0f0f0", "Albastru": "#42a5f5", "Auriu": "#ffd700", "Galben": "#ffee58",
  "Gri": "#9e9e9e", "Maro": "#8d6e63", "Negru": "#222", "Negru-Alb": null,
  "Portocaliu": "#ffa726", "Roz": "#f48fb1", "Roșu": "#ef5350", "Verde": "#66bb6a", "Violet": "#9c27b0",
};
const TEME_LIST = ["AI","Animale","Automotive","Basme","Călătorii","Creează-ți propriul","Haios","Jocuri","Nuntă","Ocazii speciale","Orașe","Peisaje","Plante","Sport","Vacanță"];
const OCAZII_LIST = ["Aniversare","Calendar","Comuniune Sfântă","Nuntă","Pentru copii","Pentru ea","Pentru el","Ziua Băiatului","Ziua Copilului","Ziua de naștere","Ziua Femeii","Ziua Îndrăgostiților","Ziua Mamei","Ziua Profesorului","Ziua Tatălui"];
const TAGS_LIST = ["populare","reduceri","produse-noi"];
const emptyProdus = { id: "", name: "", price: "", oldPrice: "", category: "stative", tags: [], img: "", descriere: "", culori: [], imaginiCulori: {}, tema: [], ocazie: [] };

function ImageUpload({ label, value, onChange, height = 120 }) {
  const [uploading, setUploading] = useState(false);
  const ref = useRef();
  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) onChange(data.url);
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

function Pill({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: "pointer",
      border: active ? `1.5px solid ${C.accent}` : `1.5px solid ${C.border}`,
      background: active ? C.accent + "18" : "#fff",
      color: active ? C.accentDark : C.muted,
      transition: "all .12s",
    }}>{label}</button>
  );
}

function ColorSwatch({ name, active, onToggle }) {
  const hex = COLOR_ADMIN_MAP[name];
  const isGrad = name === "Negru-Alb";
  return (
    <button title={name} onClick={onToggle} style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
      background: "none", border: "none", cursor: "pointer", padding: "3px 4px",
      borderRadius: 6, outline: active ? `2px solid ${C.accent}` : "2px solid transparent",
      outlineOffset: 1,
    }}>
      <span style={{
        width: 24, height: 24, borderRadius: "50%", display: "block", flexShrink: 0,
        background: isGrad ? "linear-gradient(135deg,#222 50%,#f0f0f0 50%)" : hex,
        border: name === "Alb" ? "1px solid #ddd" : "none",
        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        position: "relative",
      }}>
        {active && <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: ["Alb","Galben","Auriu"].includes(name) ? "#555" : "#fff", fontWeight: 900 }}>✓</span>}
      </span>
      <span style={{ fontSize: 9, color: active ? C.accentDark : C.muted, fontWeight: active ? 700 : 400, lineHeight: 1.2, textAlign: "center", maxWidth: 38 }}>{name}</span>
    </button>
  );
}

function ProdusForm({ initial, onSave, onClose }) {
  const [p, setP] = useState({ ...emptyProdus, ...initial });
  const set = k => v => setP(x => ({ ...x, [k]: v }));
  const toggleArr = (k, v) => setP(x => ({ ...x, [k]: (x[k] || []).includes(v) ? x[k].filter(i => i !== v) : [...(x[k] || []), v] }));

  async function save() {
    const isNew = !p.id;
    const payload = { ...p, price: Number(p.price), oldPrice: p.oldPrice ? Number(p.oldPrice) : undefined, id: p.id || Date.now().toString() };
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
        <div style={{ display: "flex", gap: 8 }}>
          {CATEGORII_TIP.map(t => (
            <button key={t.value} onClick={() => set("category")(t.value)} style={{
              flex: 1, padding: "8px 12px", borderRadius: 8, cursor: "pointer",
              border: p.category === t.value ? `2px solid ${C.accent}` : `2px solid ${C.border}`,
              background: p.category === t.value ? C.accent + "12" : "#fff",
              fontSize: 13, fontWeight: 700,
              color: p.category === t.value ? C.accentDark : C.text,
              transition: "all .15s",
            }}>{t.label}</button>
          ))}
        </div>
      </SectionBlock>

      {/* Categorie navigare */}
      <SectionBlock title="Categorie (navigare site)">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {CATEGORII_NAV.map(c => (
            <Pill key={c.value} label={c.label}
              active={(p.tags || []).includes(c.value)}
              onClick={() => toggleArr("tags", c.value)} />
          ))}
        </div>
      </SectionBlock>

      {/* Imagine */}
      <SectionBlock title="Imagine">
        <ImageUpload value={p.img} onChange={set("img")} height={130} />
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
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {CULORI_LIST.map(v => (
            <ColorSwatch key={v} name={v} active={(p.culori || []).includes(v)} onToggle={() => toggleArr("culori", v)} />
          ))}
        </div>
      </SectionBlock>

      {/* Temă */}
      <SectionBlock title="Temă / Motiv">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {TEME_LIST.map(v => (
            <Pill key={v} label={v} active={(p.tema || []).includes(v)} onClick={() => toggleArr("tema", v)} />
          ))}
        </div>
      </SectionBlock>

      {/* Ocazie */}
      <SectionBlock title="Ocazie / Circumstanțe">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {OCAZII_LIST.map(v => (
            <Pill key={v} label={v} active={(p.ocazie || []).includes(v)} onClick={() => toggleArr("ocazie", v)} />
          ))}
        </div>
      </SectionBlock>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 4 }}>
        <button onClick={onClose} style={btnGhost}>Anulează</button>
        <button onClick={save} style={btnPrimary}>Salvează</button>
      </div>
    </div>
  );
}

function SectionProduse() {
  const [produse, setProduse] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const load = () => fetch("/api/produse").then(r => r.json()).then(setProduse);
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
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Caută produs…" style={{ ...inp, maxWidth: 300 }} />
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
                    <button onClick={() => setModal({ mode: "edit", data: p })} style={{ ...btnGhost, padding: "5px 12px", fontSize: 12 }}>✏️</button>
                    <button onClick={() => setConfirm(p.id)} style={btnDanger}>🗑</button>
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
  const [s, setS] = useState({ id: "", img: "", alt: "", ...initial });
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
              <p style={{ margin: "0 0 12px", color: C.muted, fontSize: 13 }}>{s.alt}</p>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setEditing(s)} style={{ ...btnGhost, padding: "5px 12px", fontSize: 12 }}>✏️ Edit</button>
                <button onClick={() => setConfirm(s.id)} style={btnDanger}>🗑</button>
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
                <button onClick={() => setModal({ mode: "edit", data: a })} style={{ ...btnGhost, padding: "5px 12px", fontSize: 12 }}>✏️ Edit</button>
                <button onClick={() => setConfirm(a.slug)} style={btnDanger}>🗑</button>
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
  const [r, setR] = useState({ id: "", avatar: "", nume: "", text: "", ...initial });
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
      <ImageUpload label="Avatar" value={r.avatar} onChange={set("avatar")} height={80} />
      <Textarea label="Recenzie" value={r.text} onChange={set("text")} rows={3} />
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={btnGhost}>Anulează</button>
        <button onClick={save} style={btnPrimary}>Salvează</button>
      </div>
    </div>
  );
}

function SectionRecenzii() {
  const [recenzii, setRecenzii] = useState([]);
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const load = () => fetch("/api/recenzii").then(r => r.json()).then(setRecenzii);
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
                <span style={{ color: C.accent, fontSize: 13 }}>★★★★★</span>
              </div>
            </div>
            <p style={{ margin: "0 0 12px", color: C.muted, fontSize: 13, fontStyle: "italic" }}>"{r.text}"</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setModal({ ...r })} style={{ ...btnGhost, padding: "5px 12px", fontSize: 12 }}>✏️ Edit</button>
              <button onClick={() => setConfirm(r.id)} style={btnDanger}>🗑</button>
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

  const load = () => fetch("/api/faq").then(r => r.json()).then(setItems);
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
            <button onClick={() => setModal({ ...f })} style={{ ...btnGhost, padding: "5px 12px", fontSize: 12 }}>✏️</button>
            <button onClick={() => setConfirm(f.id)} style={btnDanger}>🗑</button>
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
function CategForm({ initial, onSave, onClose }) {
  const [c, setC] = useState({ slug: "", label: "", descriere: "", img: "", ...initial });
  const set = k => v => setC(x => ({ ...x, [k]: v }));
  async function save() {
    const res = initial.slug
      ? await fetch(`/api/categorii/${initial.slug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(c) })
      : await fetch("/api/categorii", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(c) });
    if (!res.ok) { const d = await res.json().catch(() => ({})); alert(d.error || `Eroare ${res.status}`); return; }
    onSave();
  }
  return (
    <div>
      <Input label="Slug (URL)" value={c.slug} onChange={set("slug")} placeholder="ex: stative" />
      <Input label="Nume afișat" value={c.label} onChange={set("label")} />
      <ImageUpload label="Imagine" value={c.img} onChange={set("img")} height={110} />
      <Textarea label="Descriere" value={c.descriere} onChange={set("descriere")} rows={3} />
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={btnGhost}>Anulează</button>
        <button onClick={save} style={btnPrimary}>Salvează</button>
      </div>
    </div>
  );
}

function SectionCategorii() {
  const [categorii, setCategorii] = useState([]);
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const load = () => fetch("/api/categorii").then(r => r.json()).then(setCategorii);
  useEffect(() => { load(); }, []);

  async function del(slug) {
    const res = await fetch(`/api/categorii/${slug}`, { method: "DELETE" });
    if (!res.ok) { const d = await res.json().catch(() => ({})); alert(d.error || `Eroare ${res.status}`); return; }
    load();
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}><button onClick={() => setModal({})} style={btnPrimary}>+ Categorie nouă</button></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
        {categorii.map(c => (
          <div key={c.slug} style={{ ...card, padding: 0, overflow: "hidden" }}>
            {c.img && <img src={c.img} alt="" style={{ width: "100%", height: 100, objectFit: "cover" }} />}
            <div style={{ padding: 14 }}>
              <p style={{ margin: "0 0 2px", fontWeight: 700 }}>{c.label}</p>
              <code style={{ fontSize: 11, color: C.muted }}>/{c.slug}</code>
              <p style={{ margin: "6px 0 12px", color: C.muted, fontSize: 12 }}>{c.descriere?.slice(0, 70)}…</p>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setModal({ ...c })} style={{ ...btnGhost, padding: "5px 12px", fontSize: 12 }}>✏️ Edit</button>
                <button onClick={() => setConfirm(c.slug)} style={btnDanger}>🗑</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modal !== null && <Modal title="Categorie" onClose={() => setModal(null)}>
        <CategForm initial={modal} onSave={() => { load(); setModal(null); }} onClose={() => setModal(null)} />
      </Modal>}
      {confirm && <Confirm message="Ștergi această categorie?" onYes={() => { del(confirm); setConfirm(null); }} onNo={() => setConfirm(null)} />}
    </div>
  );
}

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
          <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 800 }}>📞 Contact</h4>
          <Input label="Email" value={s.contact?.email} onChange={v => set("contact.email", v)} />
          <Input label="Telefon" value={s.contact?.telefon} onChange={v => set("contact.telefon", v)} />
          <Input label="Adresă" value={s.contact?.adresa} onChange={v => set("contact.adresa", v)} />
          <Input label="Program" value={s.contact?.program} onChange={v => set("contact.program", v)} />
        </div>
        <div style={card}>
          <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 800 }}>📱 Social Media</h4>
          <Input label="Instagram URL" value={s.social?.instagram} onChange={v => set("social.instagram", v)} />
          <Input label="Facebook URL" value={s.social?.facebook} onChange={v => set("social.facebook", v)} />
          <Input label="TikTok URL" value={s.social?.tiktok} onChange={v => set("social.tiktok", v)} />
        </div>
        <div style={card}>
          <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 800 }}>🌐 Site general</h4>
          <Input label="Nume site" value={s.site?.numeSite} onChange={v => set("site.numeSite", v)} />
          <div style={row}>
            <div style={{ flex: 1, minWidth: 0 }}><Input label="Logo text 1" value={s.site?.logoText1} onChange={v => set("site.logoText1", v)} /></div>
            <div style={{ flex: 1, minWidth: 0 }}><Input label="Logo text 2" value={s.site?.logoText2} onChange={v => set("site.logoText2", v)} /></div>
          </div>
          <Textarea label="Slogan / footer" value={s.site?.slogan} onChange={v => set("site.slogan", v)} rows={2} />
          <Input label="Copyright" value={s.site?.copyright} onChange={v => set("site.copyright", v)} />
        </div>
        <div style={card}>
          <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 800 }}>⭐ Secțiunea Recenzii</h4>
          <Input label="Titlu secțiune" value={s.recenzii?.titluSectiune} onChange={v => set("recenzii.titluSectiune", v)} />
          <Input label="Milioane vizualizări" value={s.recenzii?.milioanePlatforma} onChange={v => set("recenzii.milioanePlatforma", v)} />
          <Textarea label="Text TikTok" value={s.recenzii?.textTikTok} onChange={v => set("recenzii.textTikTok", v)} rows={2} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={save} style={{ ...btnPrimary, padding: "11px 28px", fontSize: 14 }}>💾 Salvează toate setările</button>
        {saved && <span style={{ color: C.success, fontWeight: 700 }}>✓ Salvat!</span>}
      </div>
    </div>
  );
}

/* ─── DASHBOARD ─── */
function SectionDashboard({ onNav }) {
  const [counts, setCounts] = useState({ produse: 0, blog: 0, recenzii: 0, faq: 0, categorii: 0, hero: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/produse").then(r => r.json()),
      fetch("/api/blog").then(r => r.json()),
      fetch("/api/recenzii").then(r => r.json()),
      fetch("/api/faq").then(r => r.json()),
      fetch("/api/categorii").then(r => r.json()),
      fetch("/api/hero").then(r => r.json()),
    ]).then(([p, b, r, f, c, h]) => setCounts({ produse: p.length, blog: b.length, recenzii: r.length, faq: f.length, categorii: c.length, hero: h.length }));
  }, []);

  const stats = [
    { label: "Produse", count: counts.produse, icon: "📦", section: "Produse", color: "#f5a623" },
    { label: "Hero Slides", count: counts.hero, icon: "🖼️", section: "Hero", color: "#6366f1" },
    { label: "Articole Blog", count: counts.blog, icon: "📝", section: "Blog", color: "#22c55e" },
    { label: "Recenzii", count: counts.recenzii, icon: "⭐", section: "Recenzii", color: "#ec4899" },
    { label: "Întrebări FAQ", count: counts.faq, icon: "❓", section: "FAQ", color: "#0ea5e9" },
    { label: "Categorii", count: counts.categorii, icon: "🗂️", section: "Categorii", color: "#8b5cf6" },
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
            <div style={{ fontSize: 26, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 30, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.count}</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ ...card, background: "#fffbeb", borderColor: "#fde68a", marginBottom: 0 }}>
        <p style={{ margin: 0, fontSize: 13, color: "#92400e" }}>
          💡 <strong>Sfat:</strong> Modificările la produse, recenzii și FAQ se reflectă automat pe site după salvare.
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
              <div style={{ width: 46, height: 46, borderRadius: "50%", background: C.accent + "1a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                👤
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: C.text }}>{a.nume}</p>
                <p style={{ margin: "3px 0 0", color: C.muted, fontSize: 13 }}>{a.email}</p>
              </div>
              <Badge color={rolColor(a.rol)}>{a.rol || "Admin"}</Badge>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setModal({ ...a })} style={{ ...btnGhost, padding: "5px 12px", fontSize: 12 }}>✏️ Edit</button>
              <button onClick={() => setConfirm(a.id)} style={btnDanger}>🗑</button>
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
  { id: "Dashboard", icon: "🏠", label: "Dashboard" },
  { id: "Produse", icon: "📦", label: "Produse" },
  { id: "Hero", icon: "🖼️", label: "Hero Slider" },
  { id: "Blog", icon: "📝", label: "Blog" },
  { id: "Recenzii", icon: "⭐", label: "Recenzii" },
  { id: "FAQ", icon: "❓", label: "FAQ" },
  { id: "Categorii", icon: "🗂️", label: "Categorii" },
  { id: "Setari", icon: "⚙️", label: "Setări" },
  { id: "Administratori", icon: "👥", label: "Administratori" },
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
            <div style={{ fontSize: 36 }}>🛡️</div>
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
          <span style={{ fontSize: 20, flexShrink: 0 }}>⚡</span>
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
              <span style={{ fontSize: 18, flexShrink: 0 }}>{s.icon}</span>
              {!collapsed && <span style={{ whiteSpace: "nowrap" }}>{s.label}</span>}
            </button>
          ))}
        </nav>
        <div style={{ padding: "10px 8px", borderTop: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
          <a href="/" style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 10px", borderRadius: 10, textDecoration: "none", marginBottom: 2, background: "transparent", color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 600 }}
            onMouseEnter={e => e.currentTarget.style.background = C.sidebarHov}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <span style={{ fontSize: 18, flexShrink: 0 }}>🌐</span>
            {!collapsed && "Vezi site"}
          </a>
          <button onClick={() => { setLoggedIn(false); localStorage.removeItem("adminLoggedIn"); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 10px", borderRadius: 10, border: "none", cursor: "pointer", background: "transparent", color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 600 }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>🚪</span>
            {!collapsed && "Ieși"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, marginLeft: SW, transition: "margin-left .2s", minHeight: "100vh" }}>
        <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "15px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <h2 style={{ margin: 0, fontSize: 19, fontWeight: 900 }}>
            {SECTIONS.find(s => s.id === section)?.icon} {SECTIONS.find(s => s.id === section)?.label}
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
          {section === "Categorii" && <SectionCategorii />}
          {section === "Setari" && <SectionSetari />}
          {section === "Administratori" && <SectionAdministratori />}
        </div>
      </main>
    </div>
  );
}
