"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  tags: string[];
  videoSrc?: string;
  link?: string;
  delay?: number;
}

function ProjectCard({ title, category, description, tags, videoSrc, link, delay = 0 }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col md:flex-row gap-8 p-6 md:p-8 rounded-3xl glass border border-white/5 hover:border-gold/30 transition-all duration-500 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Video / Visual Section */}
      <div className="w-full md:w-2/5 aspect-[4/3] md:aspect-auto md:h-64 rounded-2xl overflow-hidden bg-surface-hover relative border border-white/5 z-10">
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            playsInline
            className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-surface to-surface-hover flex items-center justify-center relative transform group-hover:scale-105 transition-transform duration-700">
             <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <span className="text-foreground/20 font-heading text-xl uppercase tracking-widest group-hover:text-gold/40 transition-colors duration-500">{title.split(' ')[0]}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-3/5 flex flex-col justify-center relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-gold text-xs font-medium tracking-widest uppercase mb-2">{category}</p>
            <h3 className="text-2xl md:text-3xl font-heading font-medium text-foreground group-hover:text-white transition-colors">
              {title}
            </h3>
          </div>
          {link && (
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-300 transform group-hover:scale-110">
              <ArrowUpRight className="w-5 h-5 text-foreground group-hover:text-background transition-colors" />
            </div>
          )}
        </div>
        
        <p className="text-foreground/60 font-light text-base md:text-lg mb-8 max-w-xl">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-3 mt-auto">
          {tags.map((tag) => (
            <span key={tag} className="text-xs font-medium px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-foreground/80 group-hover:border-white/20 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block focus:outline-none">
      {content}
    </a>
  ) : (
    <div className="block cursor-default">
      {content}
    </div>
  );
}

export default function Projects() {
  const featuredProjects = [
    {
      title: "Modelo Loja Celular",
      category: "E-Commerce",
      description: "Plataforma de vendas focada em alta conversão com design refinado, animações suaves e experiência de compra exclusiva para produtos de tecnologia.",
      tags: ["UI/UX", "Website", "Next.js", "Framer Motion"],
      videoSrc: "/videos/celular.webm",
      link: "https://website-loja-celulares.vercel.app/"
    },
    {
      title: "Modelo Odonto",
      category: "Institucional",
      description: "Website profissional para clínica odontológica focada em estética de alto padrão, transmitindo luxo, credibilidade e cuidado.",
      tags: ["Website", "Branding", "React", "TailwindCSS"],
      videoSrc: "/videos/odonto.webm",
      link: "https://modelo-odonto.vercel.app"
    }
  ];

  const otherProjects = [
    "Alimentos Wilson", "M & M Cebolas", "Imports", "Renove", 
    "Controladoria AW", "Conferente AW", "etc..."
  ];

  return (
    <section id="projetos" className="py-32 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-semibold text-foreground">
            Experiência & <span className="text-gradient">Projetos.</span>
          </h2>
          <p className="text-foreground/60 text-lg mt-4 max-w-2xl font-light">
            Uma seleção de trabalhos desenvolvidos com foco em excelência visual, performance e resultados concretos.
          </p>
        </motion.div>

        <div className="space-y-8">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.title} {...project} delay={i * 0.1} />
          ))}
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="p-8 rounded-3xl glass border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <h3 className="text-xl font-heading font-medium text-foreground mb-6 flex items-center gap-3">
              Outras colaborações e sistemas <span className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent block ml-4"></span>
            </h3>
            <div className="flex flex-wrap gap-4">
              {otherProjects.map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + (i * 0.05), duration: 0.4 }}
                  className="px-5 py-2.5 rounded-full bg-surface-hover border border-white/5 text-foreground/70 font-light text-sm hover:text-white hover:border-gold/30 hover:bg-white/5 transition-all duration-300 cursor-default"
                >
                  {name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
