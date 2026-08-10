import NavBar from "./components/NavBar";
import OferteHero from "./components/OferteHero";
import CumFunctioneaza from "./components/CumFunctioneaza";
import CategoriiMari from "./components/CategoriiMari";
import ProduseNoi from "./components/ProduseNoi";
import Reduceri from "./components/Reduceri";
import SliderPopulare from "./components/SliderPopulare";
import Harta from "./components/Harta";
import Recenzii from "./components/Recenzii";
import BlogPreview from "./components/BlogPreview";
import Footer from "./components/Footer";
import GasestePerfect from "./components/GasestePerfect";
import Livrare from "./components/Livrare";
import AutoVidare from "./components/AutoVidare";

export default function Home() {
  return (
    <div style={{ background: "#F7F7F4", minHeight: "100vh" }}>
      <NavBar />
      <OferteHero />
      <CumFunctioneaza />
      <ProduseNoi />
      <Reduceri />
      <SliderPopulare />
      <AutoVidare />
      <GasestePerfect />
      <Recenzii />
      <BlogPreview />
      <Livrare />
      <Harta />
      <Footer />
    </div>
  );
}
