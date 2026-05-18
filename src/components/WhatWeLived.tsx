import { useState, useEffect, type TouchEvent } from 'react';

const ImageSlider = ({ images, title, year, actionLink, actionText, actionBgImage }: { images: string[], title: string, year: string, actionLink?: string, actionText?: string, actionBgImage?: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const totalSlides = actionLink ? images.length + 1 : images.length;

  useEffect(() => {
    if (!images || totalSlides === 0) return;

    // Only auto-slide if component is visible to save CPU
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    const container = document.getElementById(`slider-${year}-${title.substring(0, 5)}`);
    if (container) observer.observe(container);

    const timer = setInterval(() => {
      if (isVisible) {
        setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      }
    }, 12000);

    return () => {
      clearInterval(timer);
      if (container) observer.unobserve(container);
    };
  }, [currentIndex, totalSlides, images, year, title]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  if (!images || totalSlides === 0) return null;

  return (
    <div className="mt-4 flex justify-center md:justify-start">
      <div
        id={`slider-${year}-${title.substring(0, 5)}`}
        className="relative w-full h-full min-h-[300px] aspect-square md:aspect-square rounded-xl overflow-hidden shadow-lg group"
        style={{ transform: 'translateZ(0)' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Foto ${idx + 1} da edição de ${year} com o tema ${title}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            style={{ willChange: 'opacity' }}
            decoding="async"
            loading="lazy"
            fetchPriority={idx === 0 ? "high" : "low"}
          />
        ))}

        {actionLink && (
          <div
            className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 bg-rvl-escuro text-white transition-opacity duration-1000 ease-in-out ${currentIndex === images.length ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
          >
            {actionBgImage && (
              <>
                <img src={actionBgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60"></div>
              </>
            )}
            <div className="relative z-10">
              <a
                href={actionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-rvl-laranja text-white rounded-full font-blauer uppercase tracking-widest text-sm hover:bg-orange-600 transition-colors font-medium pointer-events-auto"
              >
                {actionText || 'Saiba Mais'}
              </a>
            </div>
          </div>
        )}

        <button
          onClick={handlePrev}
          aria-label="Foto anterior"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50 z-20 pointer-events-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left w-5 h-5 -ml-0.5">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </button>

        <button
          onClick={handleNext}
          aria-label="Próxima foto"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50 z-20 pointer-events-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-5 h-5 ml-0.5">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>

        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-auto">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex ? 'w-4 bg-rvl-laranja' : 'w-1.5 bg-white/50'
                }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const WhatWeLived = () => {
  const events = [
    {
      year: '2024',
      images: [
        '/assets/2024/IMG_0067.webp',
        '/assets/2024/IMG_0161.webp',
        '/assets/2024/IMG_0768.webp',
        '/assets/2024/IMG_1058.webp',
        '/assets/2024/IMG_1713.webp',
        '/assets/2024/IMG_2126.webp'
      ]
    },
    {
      year: '2025',
      images: [
        '/assets/2025/1-IMG_1384.webp',
        '/assets/2025/3-IMG_8189.webp',
        '/assets/2025/7-IMG_1339.webp',
        '/assets/2025/8-IMG_8167.webp',
        '/assets/2025/17-IMG_8197.webp',
        '/assets/2025/20-IMG_8182.webp',
        '/assets/2025/25-IMG_1018.webp'
      ],
      actionLink: 'https://verbodavida.org.br/noticias/destaques/conferencia-impactou-participantes-em-salvador-ba',
      actionText: 'Saiba Mais',
      actionBgImage: '/assets/2025/2-IMG_9861.webp'
    }
  ];

  return (
    <section aria-labelledby="what-we-lived-title" className="bg-rvl-creme-bg py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 id="what-we-lived-title" className="text-rvl-escuro text-left mb-6">O QUE JÁ VIVEMOS</h2>
        <div className="font-blauer text-rvl-escuro/80 text-left max-w-4xl leading-relaxed mb-16">
          O rio tem um curso. Ao longo das nossas últimas seis edições, cada tema foi uma direção exata para a estação que a igreja vivia. Não foram apenas eventos que passaram, são águas que prepararam o terreno para o que vamos viver agora. Oramos e nos movemos profeticamente para acompanhar o que o Espírito está fazendo a cada ano.
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-rvl-laranja/40 -translate-x-px hidden md:block"></div>
          <div className="space-y-12 md:space-y-16">
            {events.map((event, i) => (
              <article key={i} className={`md:flex items-start gap-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <span className="font-aeonik text-5xl text-rvl-laranja/70 block mb-4">{event.year}</span>
                  {event.images && event.images.length > 0 && (
                    <ImageSlider
                      images={event.images}
                      year={event.year}
                      actionLink={event.actionLink}
                      actionText={event.actionText}
                      actionBgImage={event.actionBgImage}
                      title={''}
                    />
                  )}
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeLived;


