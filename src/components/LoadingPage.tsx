'use client';

import { useEffect, useState } from 'react';

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Inicializando Experiência...');
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Smoothly increments progress up to 100% over 2 seconds
    const duration = 2000; // 2 seconds total
    const intervalTime = 20; // 20ms steps
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / totalSteps) * 100), 100);
      setProgress(currentProgress);

      // Dynamically change status messages to make it feel like a real luxurious app loading
      if (currentProgress < 30) {
        setStatusText('Inicializando Experiência...');
      } else if (currentProgress < 70) {
        setStatusText('Carregando Portfólio...');
      } else if (currentProgress < 95) {
        setStatusText('Otimizando Interface...');
      } else {
        setStatusText('Pronto!');
      }

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        // Small satisfying delay before fading out
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            setIsVisible(false);
          }, 500); // Duration matches CSS transition
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#030303] transition-all duration-500 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Cinematic Glowing Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* Main Glassmorphic Panel */}
      <div className="relative flex flex-col items-center justify-center p-8 md:p-12 rounded-3xl border border-[rgba(212,175,55,0.08)] bg-[#070707]/60 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] max-w-sm w-full mx-4 transition-all duration-300">
        
        {/* Decorative corner glows */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/20 rounded-tl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/20 rounded-br-2xl pointer-events-none" />

        {/* Logo Container with Orbiting Rings */}
        <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full border border-dashed border-[#d4af37]/20 animate-spin-slow" />
          <div className="absolute inset-2 rounded-full border border-[#d4af37]/10 animate-pulse" />
          <div className="absolute inset-0 bg-[#d4af37]/5 blur-[25px] rounded-full" />
          
          <img
            src="/LogotipoAI.png"
            alt="Caio Rodrigues"
            className="w-20 h-20 md:w-24 md:h-24 object-contain relative z-10 animate-float"
            style={{ filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.3))' }}
          />
        </div>

        {/* Title and Subtitle */}
        <div className="text-center mb-8 flex flex-col items-center">
          <h1
            className="text-xl md:text-2xl font-medium tracking-[0.2em] text-[#f2f2f2] uppercase mb-1.5 animate-pulse-text"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Caio Rodrigues
          </h1>
          <span 
            className="text-[9px] tracking-[0.4em] font-light uppercase"
            style={{
              fontFamily: 'Outfit, sans-serif',
              background: 'linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c, #bf953f)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'goldShimmer 6s linear infinite'
            }}
          >
            UI/UX & Full Stack Developer
          </span>
        </div>

        {/* Progress System */}
        <div className="w-full flex flex-col items-center gap-3">
          {/* Progress Bar Container */}
          <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] to-[#bf953f] rounded-full transition-all duration-100 ease-out"
              style={{ 
                width: `${progress}%`,
                backgroundSize: '200% auto',
                animation: 'goldShimmer 6s linear infinite'
              }}
            />
          </div>

          {/* Info row (Progress % and dynamic text) */}
          <div className="w-48 flex justify-between items-center text-[9px] tracking-widest text-[rgba(242,242,242,0.4)] uppercase font-light">
            <span className="truncate max-w-[120px]">{statusText}</span>
            <span className="font-medium text-[#d4af37]/80">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Embedded Premium CSS Animations */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .animate-pulse-text {
          animation: pulse-text 2s ease-in-out infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-6px) scale(1.02); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.08); }
        }

        @keyframes pulse-text {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }

        @keyframes goldShimmer {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: -200% 0%;
          }
        }
      `}</style>
    </div>
  );
}
