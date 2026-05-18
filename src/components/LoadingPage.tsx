'use client';

import { useEffect, useState } from 'react';

export default function LoadingPage() {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula o carregamento da página
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setIsVisible(false);
      }, 300); // Fade out animation
    }, 2000); // Tempo de carregamento

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#030303] transition-opacity duration-300 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="flex flex-col items-center justify-center gap-8 z-10">
        {/* Logo with glow animation */}
        <div className="relative w-[120px] h-[120px] md:w-[160px] md:h-[160px] flex items-center justify-center">
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-full border border-[#d4af37] opacity-30"
            style={{
              animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />
          
          {/* Middle glow ring */}
          <div
            className="absolute inset-2 rounded-full border border-[#d4af37] opacity-20"
            style={{
              animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.3s',
            }}
          />

          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-[#d4af37] blur-[40px] opacity-[0.15] rounded-full" />

          {/* Logo */}
          <img
            src="/LogotipoAI.png"
            alt="Carregando..."
            className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] object-contain relative z-10"
            style={{
              filter: 'drop-shadow(0 0 25px rgba(212, 175, 55, 0.4))',
              animation: 'float 3s ease-in-out infinite',
            }}
          />
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-4">
          <h1
            className="text-[24px] md:text-[32px] font-medium tracking-[0.15em] md:tracking-[0.25em] text-[#f2f2f2] uppercase"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Caio Rodrigues
          </h1>

          {/* Animated dots */}
          <div className="flex items-center gap-2">
            <span className="text-[12px] md:text-[14px] text-[rgba(242,242,242,0.6)] tracking-[0.1em] uppercase">
              Carregando
            </span>
            <div className="flex gap-1">
              <span
                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#d4af37]"
                style={{
                  animation: 'bounce 1.4s infinite',
                }}
              />
              <span
                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#d4af37]"
                style={{
                  animation: 'bounce 1.4s infinite 0.2s',
                }}
              />
              <span
                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#d4af37]"
                style={{
                  animation: 'bounce 1.4s infinite 0.4s',
                }}
              />
            </div>
          </div>

          {/* Subtitle */}
          <p
            className="text-[11px] md:text-[13px] text-[rgba(242,242,242,0.5)] tracking-[0.15em] uppercase mt-2"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Preparando portfólio premium
          </p>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 0.3;
          }
          50% {
            opacity: 0.15;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: translateY(0);
            opacity: 1;
          }
          40% {
            transform: translateY(-8px);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
