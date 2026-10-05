import BackgroundStack from "./components/BackgroundStack";
import Benefits from "./components/Benefits";
import Categories from "./components/Categories";
import CustomAndFaq from "./components/CustomAndFaq";
import Footer from "./components/Footer";
import GiftBand from "./components/GiftBand";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import ProductCarousel from "./components/ProductCarousel";
import Reviews from "./components/Reviews";
import ScrollToTop from "./components/ScrollToTop";
import { categoriiSite } from "./lib/categorii-site";
import { readDb } from "./lib/db";

// Totul vine din MongoDB și se schimbă din admin: fără asta pagina ar fi
// prerandată la build, iar modificările n-ar apărea până la următorul deploy.
export const dynamic = "force-dynamic";

const lista = (v) => (Array.isArray(v) ? v : []);

export default async function Home() {
  const [produse, optiuni, detaliiCategorii, hero, recenzii, faq] = await Promise.all([
    readDb("produse"),
    readDb("optiuni"),
    readDb("categorii"),
    readDb("hero"),
    readDb("recenzii"),
    readDb("faq"),
  ]);

  const categorii = categoriiSite(produse, optiuni, detaliiCategorii);

  return (
    <>
      <Header defaultOpen categorii={categorii} />
      <main>
        <Hero slides={lista(hero)} />
        <div className="categories-section">
          <BackgroundStack />
          <Categories categorii={categorii} />
          <ProductCarousel products={lista(produse).filter((p) => p.tags?.includes("populare"))} title="Pușculițe" accent="populare" href="/produse" />
          <HowItWorks />
          <Benefits />
          <GiftBand />
          <Reviews reviews={lista(recenzii).filter((r) => !r.produsId)} />
          <CustomAndFaq faq={lista(faq).filter((f) => !f.produsId)} />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
