/*
 * Panoul de administrare are propria paletă deschisă (definită în page.js) și
 * nu face parte din designul vitrinei. Fără acest înveliș ar moșteni fundalul
 * întunecat și textul alb al site-ului public.
 */
export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <div
      style={{
        background: "#f7f8fa",
        color: "#111",
        minHeight: "100vh",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {children}
    </div>
  );
}
