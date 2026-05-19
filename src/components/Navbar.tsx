"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Início", "Sobre", "Projetos", "Principais Clientes", "Serviços", "Contato"];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div
          className={`flex items-center justify-between transition-all duration-500 rounded-2xl ${
            scrolled ? "glass px-6 py-3" : "px-0"
          }`}
        >
          <a href="#início">
            <Logo />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium text-foreground/70 hover:text-gold transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </nav>

          <a
            href="#contato"
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-background bg-foreground rounded-full hover:bg-gold transition-colors duration-300"
          >
            Vamos conversar
          </a>

          {/* Mobile menu button could go here */}
        </div>
      </div>
    </motion.header>
  );
}
