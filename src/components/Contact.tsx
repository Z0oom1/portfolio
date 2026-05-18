"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const LinkedinIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Contact() {
  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/caio-rodss", icon: LinkedinIcon },
    { name: "Instagram", url: "https://instagram.com/caio.riguess", icon: InstagramIcon },
  ];

  return (
    <section id="contato" className="py-32 relative overflow-hidden">
      {/* Background glow for contact section */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] opacity-60 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-gold text-sm font-medium tracking-widest uppercase mb-6"
          >
            Próximos Passos
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-semibold text-foreground mb-12 leading-tight"
          >
            Vamos construir algo <br />
            <span className="text-gradient">extraordinário.</span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16"
          >
            {/* Email */}
            <a 
              href="mailto:caioprivado01@gmail.com"
              className="group flex flex-col items-center justify-center p-8 rounded-3xl glass border border-white/5 hover:border-gold/30 hover:bg-white/5 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-surface-hover flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <Mail className="w-5 h-5 text-foreground/70 group-hover:text-gold transition-colors" />
              </div>
              <span className="text-sm text-foreground/50 mb-1">Email</span>
              <span className="text-foreground font-medium">caioprivado01@gmail.com</span>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/5518996392316"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-8 rounded-3xl glass border border-white/5 hover:border-gold/30 hover:bg-white/5 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-surface-hover flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <Phone className="w-5 h-5 text-foreground/70 group-hover:text-gold transition-colors" />
              </div>
              <span className="text-sm text-foreground/50 mb-1">WhatsApp</span>
              <span className="text-foreground font-medium">+55 18 99639-2316</span>
            </a>

            {/* Location */}
            <div className="group flex flex-col items-center justify-center p-8 rounded-3xl glass border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all duration-500">
              <div className="w-12 h-12 rounded-full bg-surface-hover flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <MapPin className="w-5 h-5 text-foreground/70 group-hover:text-white transition-colors" />
              </div>
              <span className="text-sm text-foreground/50 mb-1">Localização</span>
              <span className="text-foreground font-medium">Presidente Prudente, SP</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center gap-8 border-t border-white/10 pt-12 w-full justify-between"
          >
            <div className="text-foreground/50 text-sm font-light">
              © {new Date().getFullYear()} Caio Rodrigues. Todos os direitos reservados.
            </div>
            
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-foreground/60 hover:text-background hover:bg-white transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
