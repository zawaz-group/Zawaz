import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
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
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <div style={{ position: "relative", zIndex: 20, background: "#f0eeeb" }}>
        <NavBar />
        <div style={{ height: 68, background: "#f0eeeb" }} aria-hidden="true" />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
      </div>
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
