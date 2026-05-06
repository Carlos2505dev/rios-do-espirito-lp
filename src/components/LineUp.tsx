import { useState, useEffect } from 'react';

const CountdownItem = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-4xl md:text-6xl font-aeonik font-bold text-white tracking-tighter">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-[10px] md:text-xs font-blauer text-white/70 tracking-[0.2em] mt-2 font-bold">
      {label}
    </span>
  </div>
);

const LineUp = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    // Set target date: June 18, 2026 at 19:00:00
    const targetDate = new Date('2026-06-18T19:00:00').getTime();
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('countdown-section');
    if (section) observer.observe(section);

    const interval = setInterval(() => {
      if (!isVisible) return;
      
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!hasFinished) {
          setHasFinished(true);
          triggerConfetti();
        }
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => {
      clearInterval(interval);
      if (section) observer.unobserve(section);
    };
  }, [hasFinished]);

  const triggerConfetti = async () => {
    const { default: confetti } = await import('canvas-confetti');
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <section className="bg-rvl-creme-bg py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <button
          className="relative w-full aspect-video rounded-lg overflow-hidden group"
          aria-label="Reproduzir vídeo Line Up"
        >
          <img src="/assets/capa_rios2026.webp" alt="Line Up" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 24 24" fill="white" className="w-10 h-10 ml-1">
                <path d="M8 5v14l11-7z"></path>
              </svg>
            </div>
          </div>
        </button>

        {/* Countdown Section */}
        <div id="countdown-section" className="mt-16 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden bg-rvl-escuro">
          {/* Hero Gradient with Opacity */}
          <div className="hero-gradient absolute inset-0 opacity-60"></div>

          {/* Noise effect for consistency with Hero */}
          <div className="hero-noise absolute inset-0 opacity-10 pointer-events-none"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
            <CountdownItem value={timeLeft.days} label="DIAS" />
            <CountdownItem value={timeLeft.hours} label="HORAS" />
            <CountdownItem value={timeLeft.minutes} label="MINS" />
            <CountdownItem value={timeLeft.seconds} label="SEGS" />
          </div>

          {/* Subtle decoration to match the premium feel */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default LineUp;
