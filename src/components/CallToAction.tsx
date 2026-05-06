import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Button } from './ui/button';
import { Calendar, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// Lazy load the MapComponent
const MapComponent = lazy(() => import('./MapComponent'));

const CallToAction = () => {
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const mapSectionRef = useRef<HTMLDivElement>(null);

  const position: [number, number] = [-12.9574578, -38.4671262];
  const googleMapsUrl = "https://www.google.com/maps/place/IGREJA+VERBO+DA+VIDA+CABULA/@-12.9540402,-38.4650645,1424m/data=!3m1!1e3!4m6!3m5!1s0x7161b0032c424b9:0x4cc1b35001c6cc7b!8m2!3d-12.9574578!4d-38.4671262!16s%2Fg%2F11y2b3yl3y?entry=ttu&g_ep=EgoyMDI2MDQyMS4wIKXMDSoASAFQAw%3D%3D";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' } // Load map 200px before it enters view
    );

    if (mapSectionRef.current) {
      observer.observe(mapSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Climax CTA */}
      <section className="climax-gradient relative min-h-[70vh] flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="absolute inset-0 bg-[#021f59]/60 mix-blend-multiply z-[1]"></div>
        <div className="hero-noise absolute inset-0 pointer-events-none z-[1] opacity-30"></div>
        <div className="relative z-[2] flex flex-col items-center gap-6">
          <p className="font-aeonik text-rvl-laranja uppercase tracking-[0.3em] text-xs drop-shadow-md">EZEQUIEL 47 · ÁGUAS PROFUNDAS</p>
          <h2 className="text-white tracking-wide uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">Saia da Margem</h2>
          <p className="font-blauer text-white max-w-2xl leading-relaxed mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-lg md:text-xl">
            Águas nos tornozelos já não são mais suficientes. Chegou a hora de deixar o conforto de estar nas margens e avançar para um nível onde o Espírito é quem está no controle. A conferência rios do Espírito 2026 é o seu chamado para a profundidade. O Rio está fluindo, você vem!?
          </p>
          <Button
            href="#ingressos"
            className="!w-auto !max-w-none !rounded-full shadow-[0_4px_20px_rgba(242,127,34,0.4)]"
            boxClassName="!p-2 !rounded-full"
            buttonClassName="!px-8 !py-4 !text-sm !font-bold uppercase tracking-wide !rounded-full"
          >
            QUERO MERGULHAR FUNDO
          </Button>
        </div>
      </section>

      <section className="bg-rvl-creme-bg text-rvl-escuro py-24 px-6 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rvl-laranja/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rvl-laranja/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 justify-between items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-[2px] w-12 bg-rvl-laranja rounded-full"></div>
              <h2 className="tracking-[0.3em] text-rvl-laranja uppercase text-sm font-bold">Quando e Onde</h2>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="mt-1 p-3 bg-white shadow-xl shadow-rvl-laranja/10 rounded-2xl text-rvl-laranja transform transition-transform group-hover:scale-110 duration-300">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="font-aeonik text-3xl md:text-4xl tracking-widest text-rvl-escuro uppercase leading-tight font-bold">
                    18 E 20 DE <span className="text-rvl-laranja">JUNHO</span>
                  </p>
                  <p className="text-rvl-escuro/70 text-sm mt-2 uppercase tracking-[0.2em] font-aeonik flex items-center gap-2">
                    <Sparkles size={14} className="text-rvl-laranja/40" />
                    Quinta a Sábado · 2026
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="mt-1 p-3 bg-white shadow-xl shadow-rvl-laranja/10 rounded-2xl text-rvl-laranja transform transition-transform group-hover:scale-110 duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="font-blauer text-2xl text-rvl-escuro font-medium">Verbo da Vida Cabula</p>
                  <p className="font-blauer text-lg text-rvl-escuro/80 italic">Salvador, Bahia</p>
                </div>
              </div>
            </div>

            <div className="mt-12 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-rvl-laranja/30 rounded-full">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="w-full bg-rvl-laranja rounded-full shadow-[0_0_15px_rgba(242,127,34,0.5)]"
                />
              </div>
              <div className="pl-10 font-blauer text-xl text-rvl-escuro/80 space-y-2">
                <p className="italic leading-relaxed">"Estamos nos preparando."</p>
                <p className="font-bold text-rvl-escuro tracking-tight">Algo maior está sendo construído.</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            ref={mapSectionRef}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="md:w-1/2 w-full h-[450px] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-0 border-8 border-white group bg-gray-100 flex items-center justify-center"
          >
            {shouldLoadMap ? (
              <Suspense fallback={<div className="animate-pulse w-8 h-8 rounded-full bg-rvl-laranja/20" />}>
                <MapComponent position={position} googleMapsUrl={googleMapsUrl} />
              </Suspense>
            ) : (
              <div className="text-rvl-escuro/20 font-aeonik font-bold uppercase tracking-widest text-xs">Carregando Mapa...</div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;
