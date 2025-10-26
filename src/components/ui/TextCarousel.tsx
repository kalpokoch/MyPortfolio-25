import React, { useState, useEffect } from 'react';

interface TextCarouselProps {
  texts: string[];
  className?: string;
  interval?: number; // milliseconds between transitions
}

const TextCarousel: React.FC<TextCarouselProps> = ({ 
  texts, 
  className = '',
  interval = 3000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <div className="relative h-16 flex items-center justify-start overflow-hidden">
      {texts.map((text, index) => (
        <span
          key={index}
          className={`${className} absolute transition-all duration-700 ease-in-out ${
            index === currentIndex
              ? 'opacity-100 translate-y-0'
              : index === (currentIndex - 1 + texts.length) % texts.length
              ? 'opacity-0 -translate-y-full'
              : 'opacity-0 translate-y-full'
          }`}
        >
          {text}
        </span>
      ))}
    </div>
  );
};

export default TextCarousel;
