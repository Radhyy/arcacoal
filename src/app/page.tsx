import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeatureMarquee from "@/components/FeatureMarquee";
import ProductsTeaser from "@/components/ProductsTeaser";
import Features from "@/components/Features";
import PerformanceHighlights from "@/components/PerformanceHighlights";
import Gallery from "@/components/Gallery";
import OemExperience from "@/components/OemExperience";
import Legality from "@/components/Legality";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FCFCFC] text-slate-950 selection:bg-red-600 selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <FeatureMarquee />
      <ProductsTeaser />
      <Features />
      <PerformanceHighlights />
      <Gallery />
      <OemExperience />
      <Legality />
      <Footer />
    </main>
  );
}
