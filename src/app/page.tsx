import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import CartaoVisita from "@/components/CartaoVisita";
import LoadingPage from "@/components/LoadingPage";

export default function Home() {
  return (
    <>
      <LoadingPage />
      <main className="relative flex min-h-screen flex-col bg-background selection:bg-gold/30 selection:text-white">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Services />
        <CartaoVisita />
        <Contact />
      </main>
    </>
  );
}
