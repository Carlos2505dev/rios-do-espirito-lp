import { useState, useEffect } from 'react';
import Button from './ui/button';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show when scrolling down, hide when scrolling up
      // Or show after a certain scroll depth
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY || currentScrollY < 300) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`bot ${isVisible ? 'bot-ativo' : ''}`}>
      <Button
        href="https://tiketo.com.br/evento/5167"
        className="w-full"
        buttonClassName="!py-1.5 !px-8 !text-sm"
        boxClassName="!p-1 !gap-1"
      >
        Garantir Ingresso
      </Button>

      <div className="hidden md:flex items-center w-full justify-start pl-1">
        <div className="avatar-group scale-90 origin-left">
          {/* Placeholder avatars since actual images might be missing */}
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
            alt="User"
            className="avatar-item"
          />
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
            alt="User"
            className="avatar-item"
          />
          <img
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop"
            alt="User"
            className="avatar-item"
          />
        </div>
        <p className="bot-text !text-[11px] leading-tight">
          <strong>+ 1.000</strong> pessoas<br />transformadas!
        </p>
      </div>
    </div>
  );
};

export default FloatingCTA;
