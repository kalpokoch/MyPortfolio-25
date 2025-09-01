import React, { useState, useEffect, useMemo } from 'react';

interface TextCarouselProps {
  texts: string[];
  className?: string;
}

const TextCarousel: React.FC<TextCarouselProps> = ({ texts, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Compute line height once
  const lineHeight = useMemo(() => {
    if (typeof window === "undefined") return 48 * 1.2; // default for SSR
    const baseSize = window.innerWidth >= 1024 ? 48 : 36; 
    return baseSize * 1.2;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ height: `${lineHeight}px`, lineHeight: `${lineHeight}px` }}
    >
      <div
        className="transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateY(-${currentIndex * lineHeight}px)`,
        }}
      >
        {texts.map((text, index) => (
          <div
            key={index}
            className="w-full flex items-center whitespace-nowrap"
            style={{ height: `${lineHeight}px`, lineHeight: `${lineHeight}px` }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextCarousel;
