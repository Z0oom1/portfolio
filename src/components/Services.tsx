"use client";

import { motion } from "framer-motion";

const servicesList = [
  {
    title: "Websites Profissionais",
    description: "Plataformas digitais otimizadas, focadas em conversão e com design impactante."
  },
  {
    title: "UI/UX Design",
    description: "Interfaces intuitivas e jornadas de usuário desenhadas para engajar e reter."
  },
  {
    title: "Sistemas Personalizados",
    description: "Aplicações web robustas, escaláveis e desenvolvidas para necessidades específicas."
  },
  {
    title: "Software sob Medida",
    description: "Engenharia de software de ponta a ponta, do banco de dados à interface visual."
  },
  {
    title: "Identidade Visual",
    description: "Criação de marcas memoráveis, logotipos e sistemas de design coerentes."
  },
  {
    title: "Landing Pages",
    description: "Páginas focadas em um único objetivo: transformar visitantes em clientes."
  },
  {
    title: "Branding Digital",
    description: "Posicionamento de marca no ambiente digital com consistência e autoridade."
  },
  {
    title: "Experiências Interativas",
    description: "Motion design, animações 3D e interações que encantam o usuário."
  }
];

export default function Services() {
  return (
    <section id="serviços" className="py-32 relative bg-surface">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-heading font-semibold text-foreground">
              Áreas de <span className="text-gradient">Atuação.</span>
            </h2>
            <p className="text-foreground/60 text-lg mt-6 font-light">
              Soluções digitais completas, do conceito à implementação, com foco em estética e performance.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicesList.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="group p-8 rounded-3xl bg-background border border-white/5 hover:border-gold/30 transition-all duration-500 relative overflow-hidden"
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-10 h-10 rounded-full bg-surface-hover border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gold/10 group-hover:border-gold/30 transition-all duration-500">
                <div className="w-1.5 h-1.5 rounded-full bg-gold/50 group-hover:bg-gold transition-colors duration-500" />
              </div>
              
              <h3 className="text-xl font-heading font-medium text-foreground mb-3 relative z-10">
                {service.title}
              </h3>
              
              <p className="text-foreground/50 font-light text-sm leading-relaxed relative z-10 group-hover:text-foreground/70 transition-colors duration-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
