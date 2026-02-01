import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import CaseStudy from "@/components/CaseStudy";
import PuneLocations from "@/components/PuneLocations";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <CaseStudy />
        <PuneLocations />
      </main>
      <Footer />
    </>
  );
}
