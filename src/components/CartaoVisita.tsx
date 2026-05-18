'use client';

import { useState } from 'react';

export default function CartaoVisita() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section className="py-12 md:py-20 px-4 flex flex-col items-center justify-center bg-[#111] overflow-hidden">
      <div className="text-[rgba(242,242,242,0.6)] mb-6 md:mb-8 text-xs md:text-sm tracking-[0.2em] uppercase animate-pulse text-center">
        Clique no cartão para girar
      </div>

      {/* 
        Container Principal: 
        - No desktop usa largura fixa.
        - No mobile usa largura total (w-full) e mantém a proporção de cartão (aspect-[1.7/1]).
      */}
      <div className="w-full max-w-[950px] flex items-center justify-center">
        <div 
          className="relative w-full aspect-[1.7/1] md:h-[550px] cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ perspective: '2000px' }}
        >
          <div
            className="w-full h-full relative transition-transform duration-[1000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front Card */}
            <div
              className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center bg-[#030303] border border-[rgba(255,255,255,0.05)]"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                borderRadius: 'min(20px, 4vw)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                zIndex: isFlipped ? 0 : 1, // Garante que a frente não apareça quando virado
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.03)_0%,transparent_50%)] pointer-events-none" />
              
              <div className="w-[20%] aspect-square mb-[4%] relative z-10 flex items-center justify-center">
                <div className="absolute w-full h-full bg-[#d4af37] blur-[30px] opacity-[0.15] rounded-full" />
                <img 
                  src="/LogotipoAI.png" 
                  alt="Caio Rodrigues Logo" 
                  className="w-[90%] h-[90%] object-contain"
                  style={{ filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.4))' }}
                />
              </div>
              
              <h1 className="text-[clamp(18px,5vw,46px)] font-medium tracking-[0.25em] text-[#f2f2f2] m-0 uppercase z-10 relative" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Caio Rodrigues
              </h1>
              <h2 
                className="text-[clamp(8px,2vw,20px)] font-light tracking-[0.6em] m-0 uppercase z-10 relative mt-[1%]"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  background: 'linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                UI/UX & Full Stack Developer
              </h2>
            </div>

            {/* Back Card */}
            <div
              className="absolute inset-0 w-full h-full flex bg-[#030303] border border-[rgba(255,255,255,0.05)]"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                borderRadius: 'min(20px, 4vw)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                zIndex: isFlipped ? 1 : 0, // Garante que o verso não apareça quando não virado
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.03)_0%,transparent_50%)] pointer-events-none" />
              
              {/* Left Section - Quote */}
              <div className="w-[45%] p-[5%] flex flex-col justify-center border-r border-[rgba(212,175,55,0.15)] relative z-10">
                <div className="w-[25%] aspect-square mb-[10%] flex items-center justify-center">
                  <img 
                    src="/LogotipoAI.png" 
                    alt="Caio Rodrigues Logo" 
                    className="w-full h-full object-contain"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.4))' }}
                  />
                </div>
                <div 
                  className="text-[clamp(10px,2.8vw,28px)] font-light leading-relaxed text-[#f2f2f2]"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  "Projetos{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    ambiciosos
                  </span>
                  {' '}merecem execução extraordinária."
                </div>
              </div>

              {/* Right Section - Contact Info */}
              <div className="w-[55%] p-[5%] pl-[7%] flex flex-col justify-center gap-[6%] z-10">
                {/* Phone */}
                <div className="flex items-center gap-[5%]">
                  <div className="w-[10%] aspect-square flex items-center justify-center rounded-full border border-[rgba(212,175,55,0.3)] text-[#d4af37] bg-[rgba(212,175,55,0.05)]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[50%] h-[50%]">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[clamp(6px,1.2vw,12px)] uppercase tracking-[0.2em] text-[rgba(242,242,242,0.6)] font-medium">WhatsApp</span>
                    <span className="text-[clamp(8px,2vw,20px)] font-normal text-[#f2f2f2] tracking-wide">+55 18 99639-2316</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-[5%]">
                  <div className="w-[10%] aspect-square flex items-center justify-center rounded-full border border-[rgba(212,175,55,0.3)] text-[#d4af37] bg-[rgba(212,175,55,0.05)]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[50%] h-[50%]">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[clamp(6px,1.2vw,12px)] uppercase tracking-[0.2em] text-[rgba(242,242,242,0.6)] font-medium">Email</span>
                    <span className="text-[clamp(8px,2vw,20px)] font-normal text-[#f2f2f2] tracking-wide truncate max-w-[200px] md:max-w-none">caioprivado01@gmail.com</span>
                  </div>
                </div>

                {/* Portfolio / Site */}
                <div className="flex items-center gap-[5%]">
                  <div className="w-[10%] aspect-square flex items-center justify-center rounded-full border border-[#d4af37] text-[#030303] bg-[#d4af37]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[50%] h-[50%]">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span 
                      className="text-[clamp(6px,1.2vw,12px)] uppercase tracking-[0.2em] font-medium"
                      style={{
                        background: 'linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Projetos & Portfólio
                    </span>
                    <span 
                      className="text-[clamp(8px,2vw,20px)] font-medium tracking-wide text-[#f9e596]"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      portfolio-caio-rod.vercel.app
                    </span>
                  </div>
                </div>

                {/* Socials */}
                <div className="flex items-center gap-[5%]">
                  <div className="w-[10%] aspect-square flex items-center justify-center rounded-full border border-[rgba(212,175,55,0.3)] text-[#d4af37] bg-[rgba(212,175,55,0.05)]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[50%] h-[50%]">
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[clamp(6px,1.2vw,12px)] uppercase tracking-[0.2em] text-[rgba(242,242,242,0.6)] font-medium">Redes</span>
                    <span className="text-[clamp(7px,1.6vw,16px)] font-normal text-[#f2f2f2]">IN/caio-rodss &nbsp;|&nbsp; @caio.riguess</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap');
      `}</style>
    </section>
  );
}
