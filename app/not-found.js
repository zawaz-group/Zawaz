import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      background: "#ffffff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial, Helvetica, sans-serif",
      color: "#171717",
    }}>
      <h1 style={{ fontSize: 96, fontWeight: 800, margin: 0, letterSpacing: "-0.04em" }}>404</h1>
      <p style={{ fontSize: 20, marginTop: 16, marginBottom: 40, color: "#5D695F" }}>
        Pagina nu a fost găsită.
      </p>
      <Link href="/" style={{
        background: "#171717",
        color: "#fff",
        padding: "14px 36px",
        borderRadius: 8,
        textDecoration: "none",
        fontWeight: 700,
        fontSize: 15,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      }}>
        Înapoi acasă
      </Link>
    </div>
  );
}
