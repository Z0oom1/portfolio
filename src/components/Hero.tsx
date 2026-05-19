"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="início"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37]/15 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column - Text */}
          <div className="flex flex-col gap-6 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-sm md:text-base font-medium tracking-widest text-gold uppercase mb-2">
                UI/UX Developer • Full Stack Developer
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-semibold leading-[1.1] tracking-tight">
                Caio <br />
                <span className="text-gradient-gold">Rodrigues.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl font-light text-foreground/80 mt-4 max-w-lg"
            >
              “Projetos ambiciosos merecem execução extraordinária.”
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              <a
                href="#projetos"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium overflow-hidden transition-transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] border border-transparent hover:border-[#d4af37]/50"
              >
                <span className="relative z-10 group-hover:text-black transition-colors">Ver Projetos</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </a>
              <a
                href="#contato"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-white/10 text-foreground rounded-full font-medium hover:bg-white/5 transition-colors"
              >
                Entrar em Contato
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </motion.div>
          </div>

          {/* Right Column - Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] max-w-md mx-auto lg:ml-auto pointer-events-auto group cursor-pointer"
          >
            {/* Background glowing gold aura */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#bf953f]/30 via-[#fcf6ba]/10 to-[#aa771c]/30 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none -z-10" />
            
            <div className="absolute inset-0 rounded-3xl overflow-hidden glass border border-white/10 group-hover:border-[#d4af37]/45 shadow-[0_0_25px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.25)] transition-all duration-500 z-10">
              <img
                src="/caio.png"
                alt="Caio Rodrigues"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Premium golden light cast overlay to blend original photo colors with the page design */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#bf953f]/10 via-[#d4af37]/5 to-[#aa771c]/10 mix-blend-overlay opacity-90 transition-opacity duration-500 pointer-events-none" />
              
              {/* Dynamic light reflex sweeping over the image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

              {/* Edge vignetting and bottom integration gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.4)_120%)] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 pointer-events-none" />
            </div>
            
            {/* Decorator elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
