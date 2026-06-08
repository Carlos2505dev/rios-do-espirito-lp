import React, { useState } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  buttonClassName?: string;
  boxClassName?: string;
}

export const Button = ({ children, href, onClick, className = '', buttonClassName = '', boxClassName = '' }: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  const content = (
    <div className={`btn-cta-box ${boxClassName}`}>
      <div className={`btn-cta ${buttonClassName}`}>{children}</div>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="arrow-icon flex-shrink-0">
        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  return (
    <div className={`glowbox-container ${className}`}>
      <div className={`glowbox glowbox-active ${isPressed ? 'btn-pressed' : ''} ${className}`}>
        <div className="glowbox-animations">
          <div className="glowbox-glow"></div>
          <div className="glowbox-stars-masker">
            <div className="glowbox-stars"></div>
          </div>
        </div>

        <div className="glowbox-borders-masker">
          <div className="glowbox-borders"></div>
        </div>

        {href ? (
          <a 
            href={href} 
            className="block w-full h-full" 
            target={href.startsWith('http') ? '_blank' : undefined} 
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {content}
          </a>
        ) : (
          <button 
            onClick={onClick} 
            className="block w-full h-full bg-transparent border-none p-0 cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {content}
          </button>
        )}
      </div>
    </div>
  );
};

export default Button;
