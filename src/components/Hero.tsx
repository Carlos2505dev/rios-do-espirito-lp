
import { Button } from './ui/button';

const Hero = () => {
  return (
    <section id="inicio" className="hero-gradient relative h-[100dvh] min-h-[100dvh] overflow-hidden">
      {/* Background SVG Animation */}
      <div className="absolute bottom-[-80px] sm:bottom-[-120px] md:bottom-[-200px] lg:bottom-[-280px] left-0 right-0 flex justify-center pointer-events-none z-0 overflow-visible">
        <svg viewBox="0 0 900 450" className="w-full max-w-[1400px] h-auto transition-all duration-[1500ms]">
          <defs>
            <radialGradient id="sunGlow" cx="50%" cy="100%" r="50%">
              <stop offset="0%" stopColor="#F2BC79" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#F27F22" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#F27F22" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="450" cy="450" rx="450" ry="300" fill="url(#sunGlow)" className="animate-pulse" style={{ animationDuration: '3s' }} />
          <g>
            <line x1="450" y1="450" x2="150" y2="50" stroke="#F5F9FF" strokeOpacity="0.08" strokeWidth="1" />
            <line x1="450" y1="450" x2="250" y2="20" stroke="#F5F9FF" strokeOpacity="0.08" strokeWidth="1" />
            <line x1="450" y1="450" x2="370" y2="5" stroke="#F5F9FF" strokeOpacity="0.08" strokeWidth="1" />
            <line x1="450" y1="450" x2="450" y2="0" stroke="#F5F9FF" strokeOpacity="0.1" strokeWidth="1" />
            <line x1="450" y1="450" x2="530" y2="5" stroke="#F5F9FF" strokeOpacity="0.08" strokeWidth="1" />
            <line x1="450" y1="450" x2="650" y2="20" stroke="#F5F9FF" strokeOpacity="0.08" strokeWidth="1" />
            <line x1="450" y1="450" x2="750" y2="50" stroke="#F5F9FF" strokeOpacity="0.08" strokeWidth="1" />
          </g>
          <circle cx="450" cy="450" r="440" fill="none" stroke="#F5F9FF" strokeOpacity="0.35" strokeWidth="1" />
        </svg>
      </div>

      <div className="hero-noise absolute inset-0 pointer-events-none z-[1]"></div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(60% 60% at 0% 0%, rgba(2, 31, 89, 0.7) 0%, transparent 60%), radial-gradient(60% 60% at 100% 0%, rgba(242, 127, 34, 0.5) 0%, transparent 60%), radial-gradient(50% 50% at 0% 100%, rgba(43, 92, 172, 0.6) 0%, transparent 55%)', zIndex: 1 }}></div>

      <div className="hero-content relative z-[2] flex flex-col items-center justify-center w-full max-w-5xl mx-auto pt-16 md:pt-20 h-full">
        <img
          src="/assets/Logo  Horizontal Branca.svg"
          alt="Conferência Rios do Espírito Logo"
          width={490}
          height={180}
          fetchPriority="high"
          className="w-[300px] sm:w-[306px] md:w-[380px] lg:w-[420px] xl:w-[490px] max-w-[90vw] max-h-[42vh] object-contain relative z-0 mb-6 sm:mb-8 md:mb-10 xl:mb-12"
        />

        <div className="flex flex-col items-center gap-4 md:gap-5 lg:gap-5 xl:gap-7 relative z-10 w-full px-4 sm:px-6 text-center">
          <div className="border border-rvl-creme/50 rounded-full px-4 py-1.5 sm:px-4 sm:py-1.5 text-rvl-creme text-sm sm:text-sm md:text-base font-aeonik bg-rvl-escuro/20 backdrop-blur-sm whitespace-nowrap">
            18 e 20 de Junho de 2026 — Cabula, Salvador/BA
          </div>

          <div className="flex flex-col text-[#fff2dc] drop-shadow-md mt-3 w-fit max-w-[95%]">
            <h1 className="text-left px-2">
              <span className="font-aeonik font-medium lowercase tracking-wide opacity-90 block mb-1 text-[clamp(12px,3.8vw,18px)]">
                por onde o <span className="underline decoration-1 underline-offset-4 decoration-[#fff2dc]/50">rio passar</span>,
              </span>
              <span className="font-quentin block leading-none text-[clamp(32px,9vw,60px)] text-white drop-shadow-[0_0_20px_rgba(242,127,34,0.3)] hover:drop-shadow-[0_0_25px_rgba(242,127,34,0.5)] transition-all duration-500 transform -rotate-1">
                Tudo Viverá.
              </span>
            </h1>
            <div className="text-right px-2 mt-1">
              <span className="font-aeonik font-light text-xs md:text-sm opacity-75">— Ezequiel 47:9</span>
            </div>
          </div>

          <Button href="https://tiketo.com.br/evento/5167" className="mt-2 md:-mt-4">Escolha seu ingresso aqui</Button>
        </div>
      </div>

      {/* Marquee Banner */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="absolute bottom-0 left-0 right-0 h-[36px] md:h-[44px] bg-white overflow-hidden flex items-center z-20 pointer-events-none text-[#B5440A] font-aeonik font-semibold uppercase text-[11px] md:text-[13px]">
          <div className="flex whitespace-nowrap animate-marquee">
            {[1, 2, 3].map((i) => (
              <span key={i} className="flex">
                <span className="whitespace-nowrap">AVIVAMENTO<span className="mx-3 text-[#B5440A]">·</span></span>
                <span className="whitespace-nowrap">RENDIÇÃO<span className="mx-3 text-[#B5440A]">·</span></span>
                <span className="whitespace-nowrap">EXCELÊNCIA<span className="mx-3 text-[#B5440A]">·</span></span>
                <span className="whitespace-nowrap">SALVADOR<span className="mx-3 text-[#B5440A]">·</span></span>
                <span className="whitespace-nowrap">NORDESTE DO BRASIL<span className="mx-3 text-[#B5440A]">·</span></span>
                <span className="whitespace-nowrap">VERBO DA VIDA CABULA<span className="mx-3 text-[#B5440A]">·</span></span>
                <span className="whitespace-nowrap">CONFERÊNCIA<span className="mx-3 text-[#B5440A]">·</span></span>
                <span className="whitespace-nowrap">18.06.2026<span className="mx-3 text-[#B5440A]">·</span></span>
                <span className="whitespace-nowrap">CRE26'<span className="mx-3 text-[#B5440A]">·</span></span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
