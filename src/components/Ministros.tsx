import { useState, useRef, useEffect } from 'react';

const initialCards = [
  { id: 1, img: '/assets/Ministros/Cinthya.webp' },
  { id: 2, img: 'https://dunamismovement.com/wp-content/uploads/2026/03/DSM.png' },
  { id: 3, img: 'https://dunamismovement.com/wp-content/uploads/2026/02/HANGAR-1.png' },
  { id: 4, img: 'https://dunamismovement.com/wp-content/uploads/2026/02/faculdad-dunamis-card-2.png' },
  { id: 5, img: 'https://dunamismovement.com/wp-content/uploads/2026/03/Dcon26.png' },
];

const Ministros = () => {
  const [cards, setCards] = useState(initialCards);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.3 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextCard = () => {
    setCards(prev => {
      const newCards = [...prev];
      const first = newCards.shift()!;
      newCards.push(first);
      return newCards;
    });
  };

  const prevCard = () => {
    setCards(prev => {
      const newCards = [...prev];
      const last = newCards.pop()!;
      newCards.unshift(last);
      return newCards;
    });
  };

  // Drag handlers
  const onTouchStart = (e: React.TouchEvent) => setStartX(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextCard();
    else if (endX - startX > 50) prevCard();
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };
  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const endX = e.clientX;
    if (startX - endX > 50) nextCard();
    else if (endX - startX > 50) prevCard();
    setIsDragging(false);
  };
  const onMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6 bg-rvl-creme-bg overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-12">

        {/* Texts and Button */}
        <div className="flex flex-col w-full md:w-1/2">
          <div
            className="transition-all duration-1000 ease-out"
            style={{
              transform: isVisible ? 'translateY(0%)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0
            }}
          >
            <h2 className="text-rvl-escuro mb-6 whitespace-normal md:whitespace-nowrap">
              MINISTROS CONFIRMADOS
            </h2>
            <div className="font-blauer text-rvl-escuro/80 text-base md:text-lg leading-relaxed space-y-5">
              <p>
                Prepare-se para receber de líderes e vozes proféticas que carregam o fogo do avivamento. Homens e mulheres comprometidos em manifestar o poder do Espírito Santo para transformar vidas e nações.
              </p>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative h-[480px] w-full max-w-[400px] mx-auto md:mx-0 custom-carousel-wrapper w-full md:w-1/2">
          <div
            className="relative w-full h-full"
            style={{ perspective: 1000, touchAction: 'pan-y' }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
          >
            {cards.map((card, index) => {
              let style: React.CSSProperties = {
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                transition: 'all .6s ease',
                cursor: 'grab',
                opacity: 0,
                pointerEvents: 'none',
              };

              if (index < 5) {
                const offsetX = index * 25;
                const offsetY = index * 27;
                const scale = 1 - index * 0.07;
                const blur = index * 1.5;

                style = {
                  ...style,
                  opacity: 1,
                  pointerEvents: index === 0 ? 'auto' : 'none',
                  zIndex: 5 - index,
                  transform: `translate(-${offsetX}px, ${offsetY}px) scale(${scale})`,
                  filter: `blur(${blur}px)`
                };
              }

              return (
                <div key={card.id} className="card" style={style}>
                  <div className="block w-full h-full pointer-events-auto" draggable={false}>
                    <img src={card.img} alt="" className="w-full h-full object-cover rounded-[2rem] shadow-lg block" draggable={false} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Controls */}
          <button
            onClick={prevCard}
            className="absolute left-[2px] sm:-left-[15px] top-1/2 -translate-y-1/2 z-10 p-0 bg-transparent border-none cursor-pointer hover:scale-110 transition-transform"
          >
            <img src="https://dunamismovement.com/wp-content/uploads/2025/08/esquerda.png" className="w-[36px] sm:w-[38px]" alt="Previous" draggable={false} />
          </button>

          <button
            onClick={nextCard}
            className="absolute right-[2px] sm:-right-[15px] top-1/2 -translate-y-1/2 z-10 p-0 bg-transparent border-none cursor-pointer hover:scale-110 transition-transform"
          >
            <img src="https://dunamismovement.com/wp-content/uploads/2025/08/direira_.png" className="w-[36px] sm:w-[38px] invert" alt="Next" draggable={false} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Ministros;
