import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-background selection:bg-gold/30 selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Services />
      <Contact />
    </main>
  );
}
