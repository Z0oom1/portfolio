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
  hoverColor?: "odonto" | "celular" | "academia" | "wilson" | "cebola" | "imports" | "sorriso";
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
    },
    cebola: {
      border: "group-hover:border-emerald-500/40 group-hover:border-r-amber-500/40",
      shadow: "group-hover:shadow-[0_0_25px_rgba(16,185,129,0.15),0_0_25px_rgba(245,158,11,0.1)]",
    },
    imports: {
      border: "group-hover:border-white/40",
      shadow: "group-hover:shadow-[0_0_25px_rgba(255,255,255,0.12)]",
    },
    sorriso: {
      border: "group-hover:border-sky-500/40 group-hover:border-r-blue-600/40",
      shadow: "group-hover:shadow-[0_0_25px_rgba(56,189,248,0.15),0_0_25px_rgba(37,99,235,0.1)]",
    }
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      onClick={privacyRestricted ? onRestrictedClick : undefined}
      className={`group relative flex ${layout === "vertical" ? "flex-col" : "flex-col md:flex-row"} gap-8 p-6 md:p-8 rounded-3xl glass border border-white/5 transition-all duration-500 overflow-hidden ${
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
            <source src={`${videoSrc}#t=0.001`} type="video/mp4" />
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
            <p className={`${
              hoverColor === 'wilson' 
                ? 'text-red-500' 
                : hoverColor === 'cebola'
                ? 'text-emerald-400'
                : hoverColor === 'imports'
                ? 'text-white/80 font-medium'
                : hoverColor === 'sorriso'
                ? 'text-sky-400'
                : 'text-gold'
            } text-xs font-medium tracking-widest uppercase mb-2`}>{category}</p>
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
            <div className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 ${
              hoverColor === 'cebola' 
                ? 'group-hover:bg-emerald-600 group-hover:border-emerald-600' 
                : hoverColor === 'imports'
                ? 'group-hover:bg-white group-hover:border-white group-hover:text-black'
                : hoverColor === 'sorriso'
                ? 'group-hover:bg-sky-500 group-hover:border-sky-500 group-hover:text-black'
                : 'group-hover:bg-red-500 group-hover:border-red-500'
            }`}>
              {/* Lock icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-foreground group-hover:text-inherit transition-colors">
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

interface RestrictedProjectData {
  title: string;
  description: string;
  videoSrc: string;
  hoverColor: "wilson" | "cebola" | "imports" | "sorriso";
  companyName: string;
  logoSrc?: string;
  isSvgLogo?: boolean;
}

export default function Projects() {
  const featuredProjects: ProjectCardProps[] = [
    {
      title: "Modelo Loja Celular",
      category: "E-Commerce",
      description: "Plataforma de vendas focada em alta conversão com design refinado, animações suaves e experiência de compra exclusiva para produtos de tecnologia.",
      tags: ["UI/UX", "Website", "Next.js", "Framer Motion"],
      videoSrc: "/videos/celular.mp4",
      link: "https://website-loja-celulares.vercel.app/",
      hoverColor: "celular"
    },
    {
      title: "Modelo Odonto",
      category: "Institucional",
      description: "Website profissional para clínica odontológica focada em estética de alto padrão, transmitindo luxo, credibilidade e cuidado.",
      tags: ["Website", "Branding", "React", "TailwindCSS"],
      videoSrc: "/videos/odonto.mp4",
      link: "https://modelo-odonto.vercel.app",
      hoverColor: "odonto"
    },
    {
      title: "Modelo Academia",
      category: "Institucional / Fitness",
      description: "Website de alto padrão focado em alta performance para academias e centros fitness, projetado para atração de novos alunos, planos estruturados, infraestrutura e agendamentos.",
      tags: ["Website", "Branding", "HTML5", "CSS3", "JavaScript"],
      videoSrc: "/videos/academia.mp4",
      link: "https://modelo-academia-website.vercel.app",
      hoverColor: "academia"
    }
  ];

  const otherProjects = [
    "Alimentos Wilson", "M & M Cebolas", "Imports", "Novo Sorriso", "Renove", "etc..."
  ];

  const [showAlimentosWilson, setShowAlimentosWilson] = useState(false);
  const [showCebolas, setShowCebolas] = useState(false);
  const [showImports, setShowImports] = useState(false);
  const [showSorriso, setShowSorriso] = useState(false);

  // Restricted Project Preview States
  const [selectedRestricted, setSelectedRestricted] = useState<RestrictedProjectData | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const previewVideoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (previewVideoRef.current) {
      if (isPlaying) {
        previewVideoRef.current.pause();
        setIsPlaying(false);
      } else {
        previewVideoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (previewVideoRef.current) {
      previewVideoRef.current.currentTime = newTime;
    }
  };

  const toggleMute = () => {
    if (previewVideoRef.current) {
      previewVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    const video = previewVideoRef.current;
    if (!video) return;

    try {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if ((video as any).webkitEnterFullscreen) {
        // iOS Safari/Chrome on iPhone - requires webkitEnterFullscreen on video element
        (video as any).webkitEnterFullscreen();
      } else if ((video as any).webkitRequestFullscreen) {
        // iPad / macOS Safari / Chrome
        (video as any).webkitRequestFullscreen();
      } else if ((video as any).mozRequestFullScreen) {
        (video as any).mozRequestFullScreen();
      } else if ((video as any).msRequestFullscreen) {
        (video as any).msRequestFullscreen();
      }
    } catch (error) {
      console.error("Erro ao abrir tela cheia:", error);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const closeModal = () => {
    setSelectedRestricted(null);
    setIsPlayingPreview(false);
    setIsPlaying(true);
    setCurrentTime(0);
    setDuration(0);
    setIsMuted(true);
  };

  // Keyboard shortcut listener inside video player
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlayingPreview) return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowLeft") {
        if (previewVideoRef.current) {
          previewVideoRef.current.currentTime = Math.max(0, previewVideoRef.current.currentTime - 5);
        }
      } else if (e.code === "ArrowRight") {
        if (previewVideoRef.current) {
          previewVideoRef.current.currentTime = Math.min(duration, previewVideoRef.current.currentTime + 5);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlayingPreview, isPlaying, duration]);

  const themeMap = {
    wilson: {
      border: "border-red-500/20",
      glow: "shadow-[0_0_50px_rgba(239,68,68,0.15)]",
      text: "text-red-500",
      bgButton: "bg-red-500 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.35)]",
      progressFill: "text-red-500 accent-red-500",
      progressColor: "#ef4444",
      iconBg: "bg-red-500/10 border-red-500/30 text-red-500",
    },
    cebola: {
      border: "border-emerald-500/20",
      glow: "shadow-[0_0_50px_rgba(16,185,129,0.12),0_0_50px_rgba(245,158,11,0.08)]",
      text: "text-emerald-400",
      bgButton: "bg-gradient-to-r from-emerald-500 to-amber-500 hover:opacity-90 text-white shadow-[0_0_20px_rgba(16,185,129,0.25)]",
      progressFill: "text-emerald-400 accent-emerald-400",
      progressColor: "#10b981",
      iconBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    },
    imports: {
      border: "border-white/20",
      glow: "shadow-[0_0_50px_rgba(255,255,255,0.08)]",
      text: "text-white",
      bgButton: "bg-white hover:bg-neutral-200 text-black shadow-[0_0_20px_rgba(255,255,255,0.25)]",
      progressFill: "text-white accent-white",
      progressColor: "#ffffff",
      iconBg: "bg-white/10 border-white/30 text-white",
    },
    sorriso: {
      border: "border-sky-500/20",
      glow: "shadow-[0_0_50px_rgba(56,189,248,0.12),0_0_50px_rgba(37,99,235,0.08)]",
      text: "text-sky-400",
      bgButton: "bg-gradient-to-r from-sky-500 to-blue-600 hover:opacity-90 text-white shadow-[0_0_20px_rgba(56,189,248,0.25)]",
      progressFill: "text-sky-400 accent-sky-400",
      progressColor: "#38bdf8",
      iconBg: "bg-sky-500/10 border-sky-500/30 text-sky-400",
    }
  };

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
                const isCebolas = name === "M & M Cebolas";
                const isImports = name === "Imports";
                const isSorriso = name === "Novo Sorriso";
                
                if (isAlimentosWilson) {
                  return (
                    <motion.button
                      key={name}
                      onClick={() => {
                        setShowAlimentosWilson(!showAlimentosWilson);
                        setShowCebolas(false);
                        setShowImports(false);
                        setShowSorriso(false);
                      }}
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
                
                if (isCebolas) {
                  return (
                    <motion.button
                      key={name}
                      onClick={() => {
                        setShowCebolas(!showCebolas);
                        setShowAlimentosWilson(false);
                        setShowImports(false);
                        setShowSorriso(false);
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + (i * 0.05), duration: 0.4 }}
                      className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-500 cursor-pointer ${
                        showCebolas 
                          ? "bg-gradient-to-r from-emerald-500/10 to-amber-500/10 border-l-emerald-500 border-r-amber-500 border-t-emerald-500 border-b-amber-500 border text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25),0_0_20px_rgba(245,158,11,0.15)]" 
                          : "bg-surface-hover border border-white/5 text-foreground/70 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                      }`}
                    >
                      {name}
                    </motion.button>
                  );
                }

                if (isImports) {
                  return (
                    <motion.button
                      key={name}
                      onClick={() => {
                        setShowImports(!showImports);
                        setShowAlimentosWilson(false);
                        setShowCebolas(false);
                        setShowSorriso(false);
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + (i * 0.05), duration: 0.4 }}
                      className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-500 cursor-pointer ${
                        showImports 
                          ? "bg-white/10 border-white/50 text-white shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                          : "bg-surface-hover border border-white/5 text-foreground/70 hover:text-white hover:border-white/40 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                      }`}
                    >
                      {name}
                    </motion.button>
                  );
                }

                if (isSorriso) {
                  return (
                    <motion.button
                      key={name}
                      onClick={() => {
                        setShowSorriso(!showSorriso);
                        setShowAlimentosWilson(false);
                        setShowCebolas(false);
                        setShowImports(false);
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + (i * 0.05), duration: 0.4 }}
                      className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-500 cursor-pointer ${
                        showSorriso 
                          ? "bg-gradient-to-r from-sky-500/10 to-blue-600/10 border-l-sky-400 border-r-blue-600 border-t-sky-400 border-b-blue-600 border text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.25),0_0_20px_rgba(37,99,235,0.15)]" 
                          : "bg-surface-hover border border-white/5 text-foreground/70 hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-500/5 hover:shadow-[0_0_15px_rgba(56,189,248,0.15)]"
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
                      videoSrc="/videos/iden.mp4"
                      hoverColor="wilson"
                      layout="vertical"
                      privacyRestricted={true}
                      onRestrictedClick={() => {
                        setSelectedRestricted({
                          title: "AW IDEN",
                          description: "Sistema avançado de controle e identificação de produtos utilizado pelo almoxarifado da Alimentos Wilson, integrando e gerenciando todo o estoque de forma ágil e segura.",
                          videoSrc: "/videos/iden.mp4",
                          hoverColor: "wilson",
                          companyName: "Alimentos Wilson",
                          logoSrc: "https://www.alimentoswilson.com.br/imgs/logo-wilson.png"
                        });
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* M & M Cebolas Expanded Section */}
            <AnimatePresence>
              {showCebolas && (
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
                      src="/Logo_M&M_Cebolas.png" 
                      alt="M & M Cebolas Logo"
                      className="h-16 md:h-20 object-contain filter drop-shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                    <p className="text-emerald-500/80 text-[10px] font-semibold tracking-[0.2em] uppercase">
                      Acesso Restrito / Sistemas de Gestão Agrícola
                    </p>
                  </div>

                  {/* Sub-projects list */}
                  <div className="max-w-xl mx-auto">
                    <ProjectCard 
                      title="Portal M&M"
                      category="Sistema de Controle & Vendas"
                      description="Sistema corporativo avançado para controle de estoque, compras, vendas de cebolas e produtos agrícolas, integrando faturamento de notas fiscais e software dedicado."
                      tags={["Estoque", "AgroTech", "Nota Fiscal", "ERP Corporativo"]}
                      videoSrc="/videos/cebolas.mp4"
                      hoverColor="cebola"
                      layout="vertical"
                      privacyRestricted={true}
                      onRestrictedClick={() => {
                        setSelectedRestricted({
                          title: "Portal M&M",
                          description: "Sistema corporativo avançado para controle de estoque, compras, vendas de cebolas e produtos agrícolas, integrando faturamento de notas fiscais e software dedicado.",
                          videoSrc: "/videos/cebolas.mp4",
                          hoverColor: "cebola",
                          companyName: "M & M Cebolas",
                          logoSrc: "/Logo_M&M_Cebolas.png"
                        });
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Imports Expanded Section */}
            <AnimatePresence>
              {showImports && (
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
                      src="/imports.png" 
                      alt="Imports Logo"
                      className="h-20 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                    <p className="text-white/80 text-[10px] font-semibold tracking-[0.2em] uppercase">
                      Acesso Restrito / Sistemas Comerciais
                    </p>
                  </div>

                  {/* Sub-projects list */}
                  <div className="max-w-xl mx-auto">
                    <ProjectCard 
                      title="Imports Control"
                      category="Sistema de Controle & Vendas"
                      description="Sistema completo de controle de estoque de uma loja de celulares e venda de produtos Apple, permitindo gerenciar o exato modelo, cor e informações de cada aparelho, além de registrar e rastrear defeitos físicos de produtos seminovos/usados."
                      tags={["Estoque", "Loja de Celular", "Apple Control", "ERP Comercial"]}
                      videoSrc="/videos/imports.mp4"
                      hoverColor="imports"
                      layout="vertical"
                      privacyRestricted={true}
                      onRestrictedClick={() => {
                        setSelectedRestricted({
                          title: "Imports Control",
                          description: "Sistema completo de controle de estoque de uma loja de celulares e venda de produtos Apple, permitindo gerenciar o exato modelo, cor e informações de cada aparelho, além de registrar e rastrear defeitos físicos de produtos seminovos/usados.",
                          videoSrc: "/videos/imports.mp4",
                          hoverColor: "imports",
                          companyName: "Imports",
                          logoSrc: "/imports.png"
                        });
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Novo Sorriso Expanded Section */}
            <AnimatePresence>
              {showSorriso && (
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
                      src="/logo.png" 
                      alt="Novo Sorriso Logo"
                      className="h-16 md:h-20 object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                    <p className="text-sky-400/80 text-[10px] font-semibold tracking-[0.2em] uppercase">
                      Acesso Restrito / Gestão Clínica & Consultas
                    </p>
                  </div>

                  {/* Sub-projects list */}
                  <div className="max-w-xl mx-auto">
                    <ProjectCard 
                      title="Portal Odonto NS"
                      category="Sistema de Gestão & Consultas"
                      description="Software e site para a clínica odontológica Novo Sorriso. Trata-se de um sistema completo de controle de consultas e gestão interna que monitora os pacientes da clínica, integrado a um app e site onde o próprio cliente pode realizar agendamentos em dias disponibilizados pela administração."
                      tags={["Software", "Website", "Mobile App", "Gestão Clínica"]}
                      videoSrc="/videos/novosorriso.mp4"
                      hoverColor="sorriso"
                      layout="vertical"
                      privacyRestricted={true}
                      onRestrictedClick={() => {
                        setSelectedRestricted({
                          title: "Portal Odonto NS",
                          description: "Software e site para a clínica odontológica Novo Sorriso. Trata-se de um sistema completo de controle de consultas e gestão interna que monitora os pacientes da clínica, integrado a um app e site onde o próprio cliente pode realizar agendamentos em dias disponibilizados pela administração.",
                          videoSrc: "/videos/novosorriso.mp4",
                          hoverColor: "sorriso",
                          companyName: "Novo Sorriso",
                          logoSrc: "/logo.png"
                        });
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Interactive Privacy & Preview Modal */}
      <AnimatePresence>
        {selectedRestricted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.93, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className={`w-full max-w-2xl glass border rounded-3xl overflow-hidden relative ${themeMap[selectedRestricted.hoverColor].border} ${themeMap[selectedRestricted.hoverColor].glow}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground/75 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {!isPlayingPreview ? (
                /* 1. Privacy Blocking & Preview Launch Screen */
                <div className="p-8 md:p-12 flex flex-col items-center text-center">
                  {/* Pulsing Lock Icon or Official Brand Logo */}
                  {selectedRestricted.logoSrc ? (
                    <motion.img 
                      src={selectedRestricted.logoSrc}
                      alt={selectedRestricted.companyName}
                      className="h-16 md:h-20 object-contain mb-6 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  ) : (
                    <div className={`w-16 h-16 rounded-full border flex items-center justify-center mb-6 animate-pulse ${themeMap[selectedRestricted.hoverColor].iconBg}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                  )}

                  <span className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${themeMap[selectedRestricted.hoverColor].text}`}>
                    {selectedRestricted.companyName}
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-heading font-medium text-white mb-4">
                    {selectedRestricted.title}
                  </h3>

                  <p className="text-foreground/70 font-light text-sm md:text-base max-w-md mb-8 leading-relaxed">
                    Por motivos de diretrizes estritas de confidencialidade e privacidade comercial da <strong className="text-white font-medium">{selectedRestricted.companyName}</strong>, o ambiente online e código-fonte deste projeto são restritos a usuários autorizados.
                  </p>

                  <div className="flex flex-col gap-4 w-full justify-center max-w-xs">
                    <button
                      onClick={() => setIsPlayingPreview(true)}
                      className={`px-8 py-3.5 rounded-full font-medium text-sm flex items-center justify-center gap-3 cursor-pointer transition-all duration-300 transform active:scale-95 ${themeMap[selectedRestricted.hoverColor].bgButton}`}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      Visualizar Preview (Vídeo)
                    </button>
                  </div>
                </div>
              ) : (
                /* 2. Custom Styled Video Player Screen */
                <div className="relative aspect-[16/9] w-full bg-black group overflow-hidden">
                  <video
                    ref={previewVideoRef}
                    src={selectedRestricted.videoSrc}
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                    onTimeUpdate={() => {
                      if (previewVideoRef.current) {
                        setCurrentTime(previewVideoRef.current.currentTime);
                      }
                    }}
                    onLoadedMetadata={() => {
                      if (previewVideoRef.current) {
                        setDuration(previewVideoRef.current.duration);
                      }
                    }}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onClick={togglePlay}
                  />

                  {/* Voltar button overlay */}
                  <button
                    onClick={() => {
                      setIsPlayingPreview(false);
                      setIsPlaying(true);
                      setCurrentTime(0);
                    }}
                    className="absolute top-4 left-4 z-20 px-4 py-2 rounded-full bg-black/60 border border-white/10 flex items-center gap-2 text-white hover:bg-black/80 transition-colors text-xs cursor-pointer font-medium backdrop-blur-sm"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Voltar
                  </button>

                  {/* Custom controls bar */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    
                    {/* Scrub bar */}
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-white/70 select-none">
                        {formatTime(currentTime)}
                      </span>
                      
                      <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        step="0.01"
                        value={currentTime}
                        onChange={handleProgressChange}
                        className={`flex-1 h-1.5 rounded-lg appearance-none cursor-pointer bg-white/20 ${themeMap[selectedRestricted.hoverColor].progressFill}`}
                        style={{
                          background: `linear-gradient(to right, ${themeMap[selectedRestricted.hoverColor].progressColor} 0%, ${themeMap[selectedRestricted.hoverColor].progressColor} ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.2) ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.2) 100%)`
                        }}
                      />
                      
                      <span className="text-[10px] font-mono text-white/70 select-none">
                        {formatTime(duration)}
                      </span>
                    </div>

                    {/* Controls row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        {/* Play/Pause Button */}
                        <button
                          onClick={togglePlay}
                          className="text-white hover:text-white/80 transition-colors cursor-pointer"
                        >
                          {isPlaying ? (
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                              <rect x="6" y="4" width="4" height="16"></rect>
                              <rect x="14" y="4" width="4" height="16"></rect>
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                          )}
                        </button>

                        {/* Mute/Unmute */}
                        <button
                          onClick={toggleMute}
                          className="text-white hover:text-white/80 transition-colors cursor-pointer"
                        >
                          {isMuted ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                              <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"></path>
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                            </svg>
                          )}
                        </button>

                        {/* Voltar 5s */}
                        <button
                          onClick={() => {
                            if (previewVideoRef.current) {
                              previewVideoRef.current.currentTime = Math.max(0, previewVideoRef.current.currentTime - 5);
                            }
                          }}
                          className="text-white/70 hover:text-white transition-colors cursor-pointer"
                          title="Voltar 5s"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M2.5 2v6h6M21.15 13A9 9 0 0 0 5.7 6.88L2.5 10"></path>
                          </svg>
                        </button>

                        {/* Avançar 5s */}
                        <button
                          onClick={() => {
                            if (previewVideoRef.current) {
                              previewVideoRef.current.currentTime = Math.min(duration, previewVideoRef.current.currentTime + 5);
                            }
                          }}
                          className="text-white/70 hover:text-white transition-colors cursor-pointer"
                          title="Avançar 5s"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M21.5 2v6h-6M2.85 13A9 9 0 0 1 18.3 6.88L21.5 10"></path>
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Fullscreen Button */}
                        <button
                          onClick={toggleFullscreen}
                          className="text-white/70 hover:text-white transition-colors cursor-pointer"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                          </svg>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
