import Header from "./components/Header";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import About from "./components/About";
import Services from "./components/Services";
import Transformations from "./components/Transformations";
import Gallery from "./components/Gallery";
import Process from "./components/Process";
import Contact from "./components/Contact";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Highlights />
        <About />
        <Services />
        <Transformations />
        <Gallery />
        <Process />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <div className="pointer-events-none fixed bottom-3 right-3 z-[55] rounded-full bg-ink/80 px-3 py-1 text-[11px] font-medium tracking-wide text-gold-light/90 backdrop-blur">
        Concept Preview
      </div>
    </>
  );
}
