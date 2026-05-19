"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  tags: string[];
  videoSrc?: string;
  link?: string;
  delay?: number;
  hoverColor?: "odonto" | "celular" | "academia" | "wilson";
  layout?: "horizontal" | "vertical";
  privacyRestricted?: boolean;
  onRestrictedClick?: () => void;
}

function ProjectCard({ 
  title, 
  category, 
  description, 
  tags, 
  videoSrc, 
  link, 
  delay = 0, 
  hoverColor,
  layout = "horizontal",
  privacyRestricted = false,
  onRestrictedClick
}: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const hasTouch = window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window;
      setIsMobile(hasTouch || window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Force DOM-level muting to completely bypass the React muted DOM rendering bug on iOS Safari
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
    }
  }, []);

  useEffect(() => {
    if (isMobile && videoRef.current) {
      const playVideo = () => {
        if (videoRef.current) {
          videoRef.current.defaultMuted = true;
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      };

      // Try playing immediately after mounting/detection
      playVideo();

      // Add backup event listeners to trigger play as soon as the media can be decoded
      const videoEl = videoRef.current;
      videoEl.addEventListener("loadedmetadata", playVideo);
      videoEl.addEventListener("canplay", playVideo);

      return () => {
        videoEl.removeEventListener("loadedmetadata", playVideo);
        videoEl.removeEventListener("canplay", playVideo);
      };
    }
  }, [isMobile]);

  const handleMouseEnter = () => {
    if (isMobile) return;
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const displayName = title.startsWith("Modelo ") ? title.replace("Modelo ", "") : title;

  const colorMap = {
    odonto: {
      border: "group-hover:border-[#FAF9F6]/40",
      shadow: "group-hover:shadow-[0_0_25px_rgba(250,249,246,0.12)]",
    },
    celular: {
      border: "group-hover:border-[#FF5C00]/50",
      shadow: "group-hover:shadow-[0_0_25px_rgba(255,92,0,0.15)]",
    },
    academia: {
      border: "group-hover:border-[#00D2FF]/50",
      shadow: "group-hover:shadow-[0_0_25px_rgba(0,210,255,0.15)]",
    },
    wilson: {
      border: "group-hover:border-red-500/50",
      shadow: "group-hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]",
    }
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      onClick={privacyRestricted ? onRestrictedClick : undefined}
      className={`group relative flex ${layout === "vertical" ? "flex-col" : "flex-col md:flex-row"} gap-8 p-6 md:p-8 rounded-3xl glass border border-white/5 hover:border-gold/30 transition-all duration-500 overflow-hidden ${
        privacyRestricted ? "cursor-pointer" : ""
      } ${
        hoverColor ? `${colorMap[hoverColor].border} ${colorMap[hoverColor].shadow}` : "group-hover:border-gold/30"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Video / Visual Section */}
      <div className={`w-full ${layout === "vertical" ? "aspect-[16/9]" : "md:w-2/5 aspect-[4/3] md:aspect-auto md:h-64"} rounded-2xl overflow-hidden bg-surface-hover relative border border-white/5 transition-all duration-500 ease-out z-10 ${
        hoverColor ? `${colorMap[hoverColor].border} ${colorMap[hoverColor].shadow}` : "group-hover:border-gold/30"
      }`}>
        {videoSrc && !videoError ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            autoPlay={isMobile}
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
          >
            <source src={`${videoSrc.replace('.webm', '.mp4')}#t=0.001`} type="video/mp4" />
            <source src={`${videoSrc.replace('.mp4', '.webm')}#t=0.001`} type="video/webm" onError={() => setVideoError(true)} />
          </video>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-surface to-surface-hover flex items-center justify-center relative transform group-hover:scale-105 transition-transform duration-700">
             <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <span className="text-foreground/20 font-heading text-xl uppercase tracking-widest group-hover:text-gold/40 transition-colors duration-500">{displayName}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      {/* Content Section */}
      <div className={`w-full ${layout === "vertical" ? "" : "md:w-3/5"} flex flex-col justify-center relative z-10`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className={`${hoverColor === 'wilson' ? 'text-red-500' : 'text-gold'} text-xs font-medium tracking-widest uppercase mb-2`}>{category}</p>
            <h3 className="text-2xl md:text-3xl font-heading font-medium text-foreground group-hover:text-white transition-colors">
              {title}
            </h3>
          </div>
          {link && !privacyRestricted && (
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-300 transform group-hover:scale-110">
              <ArrowUpRight className="w-5 h-5 text-foreground group-hover:text-background transition-colors" />
            </div>
          )}
          {privacyRestricted && (
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-red-500 group-hover:border-red-500 transition-all duration-300 transform group-hover:scale-110">
              {/* Lock icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-foreground group-hover:text-white transition-colors">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
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

  return link && !privacyRestricted ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block focus:outline-none">
      {content}
    </a>
  ) : (
    <div className="block focus:outline-none">
      {content}
    </div>
  );
}

export default function Projects() {
  const featuredProjects: ProjectCardProps[] = [
    {
      title: "Modelo Loja Celular",
      category: "E-Commerce",
      description: "Plataforma de vendas focada em alta conversão com design refinado, animações suaves e experiência de compra exclusiva para produtos de tecnologia.",
      tags: ["UI/UX", "Website", "Next.js", "Framer Motion"],
      videoSrc: "/videos/celular.webm",
      link: "https://website-loja-celulares.vercel.app/",
      hoverColor: "celular"
    },
    {
      title: "Modelo Odonto",
      category: "Institucional",
      description: "Website profissional para clínica odontológica focada em estética de alto padrão, transmitindo luxo, credibilidade e cuidado.",
      tags: ["Website", "Branding", "React", "TailwindCSS"],
      videoSrc: "/videos/odonto.webm",
      link: "https://modelo-odonto.vercel.app",
      hoverColor: "odonto"
    },
    {
      title: "Modelo Academia",
      category: "Institucional / Fitness",
      description: "Website de alto padrão focado em alta performance para academias e centros fitness, projetado para atração de novos alunos, planos estruturados, infraestrutura e agendamentos.",
      tags: ["Website", "Branding", "HTML5", "CSS3", "JavaScript"],
      videoSrc: "/videos/academia.webm",
      link: "https://modelo-academia-website.vercel.app",
      hoverColor: "academia"
    }
  ];

  const otherProjects = [
    "Alimentos Wilson", "M & M Cebolas", "Imports", "Renove", "etc..."
  ];

  const [showAlimentosWilson, setShowAlimentosWilson] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

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
              {otherProjects.map((name, i) => {
                const isAlimentosWilson = name === "Alimentos Wilson";
                if (isAlimentosWilson) {
                  return (
                    <motion.button
                      key={name}
                      onClick={() => setShowAlimentosWilson(!showAlimentosWilson)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + (i * 0.05), duration: 0.4 }}
                      className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-500 cursor-pointer ${
                        showAlimentosWilson 
                          ? "bg-red-500/10 border-red-500/50 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]" 
                          : "bg-surface-hover border border-white/5 text-foreground/70 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/5 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                      }`}
                    >
                      {name}
                    </motion.button>
                  );
                }
                return (
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
                );
              })}
            </div>

            {/* Alimentos Wilson Expanded Section */}
            <AnimatePresence>
              {showAlimentosWilson && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 40 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden border-t border-white/5 pt-8"
                >
                  {/* Logo and Title */}
                  <div className="flex flex-col items-center justify-center mb-8 gap-3">
                    <motion.img 
                      src="https://www.alimentoswilson.com.br/imgs/logo-wilson.png" 
                      alt="Alimentos Wilson"
                      className="h-14 md:h-16 object-contain filter drop-shadow-[0_0_15px_rgba(239,68,68,0.25)]"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                    <p className="text-red-500 text-[10px] font-semibold tracking-[0.2em] uppercase">
                      Acesso Restrito / Sistemas Internos
                    </p>
                  </div>

                  {/* Sub-projects list */}
                  <div className="max-w-xl mx-auto">
                    <ProjectCard 
                      title="AW IDEN"
                      category="Sistema de Identificação de Produtos"
                      description="Sistema avançado de controle e identificação de produtos utilizado pelo almoxarifado da Alimentos Wilson, integrando e gerenciando todo o estoque de forma ágil e segura."
                      tags={["Logística", "Estoque", "AW Almoxarifado", "Segurança"]}
                      videoSrc="/videos/iden.webm"
                      hoverColor="wilson"
                      layout="vertical"
                      privacyRestricted={true}
                      onRestrictedClick={() => setToastMessage("O acesso ao projeto AW IDEN está fechado por motivos de privacidade e segurança da Alimentos Wilson.")}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Floating Privacy Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 p-5 rounded-2xl glass border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)] max-w-sm flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <div>
              <h4 className="text-red-500 font-heading font-medium text-sm">Acesso Restrito</h4>
              <p className="text-foreground/70 font-light text-xs mt-1">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
