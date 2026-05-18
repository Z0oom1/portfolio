"use client";

import { motion } from "framer-motion";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center gap-3 group ${className}`}>
      {/* SVG Geometric Logo */}
      <motion.div 
        initial={{ rotate: -10, scale: 0.9 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center"
      >
        {/* Logo Gerado por Inteligência Artificial */}
        <img src="/LogotipoAI.png" alt="Caio Rodrigues Logo" className="w-full h-full object-contain" style={{ filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.4))' }} />

        {/* Efeito Glow interativo */}
        <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
      </motion.div>

      {/* Texto do Logo */}
      <div className="flex flex-col -mt-1">
        <span className="text-xl font-heading font-semibold tracking-wider text-foreground group-hover:text-white transition-colors duration-300">
          CAIO<span className="text-gradient-gold ml-1">R.</span>
        </span>
        <span className="text-[10px] tracking-[0.2em] text-[#d4af37]/80 uppercase font-light">
          Programador / Designer
        </span>
      </div>
    </div>
  );
}
