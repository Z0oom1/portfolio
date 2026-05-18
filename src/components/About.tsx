"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);

  return (
    <section id="sobre" ref={containerRef} className="relative py-32 overflow-hidden bg-surface">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            style={{ y, opacity }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <h3 className="text-gold text-sm font-medium tracking-widest uppercase mb-4">
              A Abordagem
            </h3>
            <h2 className="text-4xl md:text-5xl font-heading font-semibold text-foreground mb-8">
              Onde o Design <br /> encontra a <span className="text-gradient">Engenharia.</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 lg:pl-12 border-l border-white/5"
          >
            <div className="space-y-8 text-lg md:text-xl text-foreground/70 font-light leading-relaxed">
              <p>
                Não construo apenas sites. Desenvolvo experiências digitais de alto valor que combinam uma <strong className="text-foreground font-medium">identidade visual marcante</strong> com <strong className="text-foreground font-medium">engenharia de software robusta</strong>.
              </p>
              <p>
                Trabalho na intersecção entre design e programação, unindo o melhor dos dois mundos. Cada linha de código e cada pixel têm um propósito: entregar produtos que sejam não apenas funcionais, mas que ofereçam uma sensação <strong className="text-gold font-medium">premium e cinematográfica</strong>.
              </p>
              <p>
                Desenvolvo portfólios, softwares sob medida e sistemas complexos. Dou o meu máximo em cada detalhe porque acredito que <strong className="text-foreground font-medium">projetos ambiciosos exigem execução impecável</strong>. Meu objetivo é trabalhar com pessoas e marcas que buscam transcender o comum.
              </p>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-4">
              {['Design UI/UX', 'Desenvolvimento Full Stack', 'Motion Design', 'Identidade Visual'].map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm font-medium hover:border-gold/30 hover:bg-white/10 transition-colors"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
