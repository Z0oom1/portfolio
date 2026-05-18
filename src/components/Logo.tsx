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
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
          {/* Definições dos gradientes dourados hiper-realistas */}
          <defs>
            <linearGradient id="gold-metal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bf953f" />
              <stop offset="25%" stopColor="#fcf6ba" />
              <stop offset="50%" stopColor="#b38728" />
              <stop offset="75%" stopColor="#fbf5b7" />
              <stop offset="100%" stopColor="#aa771c" />
            </linearGradient>
            <linearGradient id="gold-metal-reverse" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#bf953f" />
              <stop offset="25%" stopColor="#fcf6ba" />
              <stop offset="50%" stopColor="#b38728" />
              <stop offset="75%" stopColor="#fbf5b7" />
              <stop offset="100%" stopColor="#aa771c" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Fundo do símbolo / Outline hexagonal sutil */}
          <path d="M50 5 L93.3 30 L93.3 70 L50 95 L6.7 70 L6.7 30 Z" stroke="url(#gold-metal)" strokeWidth="1" strokeOpacity="0.3" fill="rgba(10,10,10,0.5)" />

          {/* Letra C estilizada */}
          <path d="M 60 25 A 35 35 0 0 0 50 20 A 30 30 0 0 0 20 50 A 30 30 0 0 0 50 80 A 35 35 0 0 0 65 75" 
                stroke="url(#gold-metal)" strokeWidth="8" strokeLinecap="round" />

          {/* Letra R estilizada */}
          <path d="M 45 35 L 45 65" stroke="url(#gold-metal-reverse)" strokeWidth="8" strokeLinecap="round" />
          <path d="M 45 35 Q 65 35 65 45 Q 65 52 55 52 L 45 52" stroke="url(#gold-metal-reverse)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 52 52 L 65 65" stroke="url(#gold-metal-reverse)" strokeWidth="8" strokeLinecap="round" />

          {/* Ponto Dourado */}
          <circle cx="75" cy="65" r="4" fill="url(#gold-metal)" filter="url(#glow)" />
        </svg>

        {/* Efeito Glow interativo */}
        <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
      </motion.div>

      {/* Texto do Logo */}
      <div className="flex flex-col -mt-1">
        <span className="text-xl font-heading font-semibold tracking-wider text-foreground group-hover:text-white transition-colors duration-300">
          CAIO<span className="text-gradient-gold ml-1">R.</span>
        </span>
        <span className="text-[10px] tracking-[0.2em] text-[#d4af37]/80 uppercase font-light">
          Premium Dev
        </span>
      </div>
    </div>
  );
}
