import React, { useRef, useEffect, useState } from 'react';

type LayoutVariant = 'default' | 'image-center' | 'image-right' | 'image-right-scroll' | 'image-right-stack';

interface SectionLayoutProps {
  sectionNumber: string;
  verticalText: string;
  title: string;
  subtitle: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  variant?: LayoutVariant;
  imageComponent?: React.ReactNode;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({
  sectionNumber,
  verticalText,
  title,
  subtitle,
  children,
  className = '',
  variant = 'default',
  imageComponent
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, [children, variant, imageComponent]);

  useEffect(() => {
    if (variant !== 'image-right-stack') return;
    
    // TUNE THESE to control where/how far the moveable elements travel:
    const DEBUG = true;                    // set true to see console debug
    const BOTTOM_PADDING = 0;               // reduce to allow more downward travel (was 24)
    const VERTICAL_OFFSET_FACTOR = 0;    // increase to move target down more (was 0.2)
    const animationStartY = 200;            // start animation earlier (was 100)
    const animationDistance = 350;          // control scroll distance over which easing runs (was 400)
    const EXTRA_ALLOWANCE = 1200;              // optional extra px allowed beyond clamp
    
    const handleScroll = () => {
      if (!(sectionRef.current && sidebarRef.current && textRef.current)) return;
    
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
    
      // reset if not visible
      if (sectionRect.bottom <= 0 || sectionRect.top >= viewportHeight) {
        sidebarRef.current.style.transform = 'translateY(0px)';
        textRef.current.style.transform = 'translateY(0px)';
        sidebarRef.current.style.transition = 'transform 0.25s ease-out';
        textRef.current.style.transition = 'transform 0.25s ease-out';
        return;
      }
    
      // rects for clamp calculations
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      const textRect = textRef.current.getBoundingClientRect();
    
      // normalized scroll progress (0..1)
      const scrollProgress = Math.max(0, Math.min(1,
        (animationStartY - sectionRect.top) / animationDistance
      ));
      const easedProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress); // smoothstep
    
      // --- TARGET translate (increase VERTICAL_OFFSET_FACTOR to ask for more downward movement) ---
      const desiredTranslate = Math.max(0, -sectionRect.top + (viewportHeight * VERTICAL_OFFSET_FACTOR));
      const computedTranslate = desiredTranslate * easedProgress;
    
      // --- CLAMP: how much room below each element before hitting section bottom ---
      const sidebarOffsetWithinSection = sidebarRect.top - sectionRect.top;
      const textOffsetWithinSection = textRect.top - sectionRect.top;
    
      const allowedSidebar = Math.max(0, sectionRect.height - (sidebarOffsetWithinSection + sidebarRect.height) - BOTTOM_PADDING);
      const allowedText = Math.max(0, sectionRect.height - (textOffsetWithinSection + textRect.height) - BOTTOM_PADDING);
    
      // choose the minimum allowed so neither element overflows; allow small EXTRA_ALLOWANCE if desired
      const maxAllowedTranslate = Math.max(0, Math.min(allowedSidebar, allowedText) + EXTRA_ALLOWANCE);
    
      // final translate is limited by clamp
      const finalTranslateY = Math.min(computedTranslate, maxAllowedTranslate);
    
      // apply
      sidebarRef.current.style.transform = `translateY(${finalTranslateY}px)`;
      textRef.current.style.transform = `translateY(${finalTranslateY}px)`;
      sidebarRef.current.style.transition = 'transform 0.05s ease-out';
      textRef.current.style.transition = 'transform 0.05s ease-out';
    
      if (DEBUG) {
        console.debug({
          desiredTranslate,
          computedTranslate,
          allowedSidebar,
          allowedText,
          maxAllowedTranslate,
          finalTranslateY,
          sectionHeight: sectionRect.height
        });
      }
    };
  
    // rAF-throttled scroll listener
    let rafId: number | null = null;
    const throttledScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          handleScroll();
          rafId = null;
        });
      }
    };
  
    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // initial
  
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [variant, contentHeight, imageComponent]);


  const renderLayout = () => {
    // Standard sidebar content for ALL variants except image-right-stack
    const centeredSidebarContent = (
      <div className="flex flex-col items-center justify-between flex-shrink-0" style={{ height: `${contentHeight}px`, minHeight: '200px' }}>
        <div className="text-6xl sm:text-7xl md:text-9xl font-light text-[#DBDBDB] lg:mt-[-8px] opacity-80 leading-none font-bebas flex-shrink-0">
          {sectionNumber}
        </div>
        
        <div className="w-px bg-black flex-1 my-6 sm:my-7 md:my-8 min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem]"></div>
        
        <div 
          className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-3xl font-medium tracking-widest text-black font-bebas flex-shrink-0"
          style={{ 
            writingMode: 'vertical-rl', 
            textOrientation: 'mixed',
            transform: 'rotate(180deg)' 
          }}
        >
          {verticalText}
        </div>
      </div>
    );

    // Transform-only animated sidebar for image-right-stack (no position changes)
    const moveableSidebarContent = (
      <div 
        ref={sidebarRef}
        className="flex flex-col items-center justify-between flex-shrink-0 relative will-change-transform"
        style={{ minHeight: '400px', transform: 'translateY(0px)' }}
      >
        <div className="text-6xl sm:text-7xl md:text-9xl font-light text-[#DBDBDB] lg:mt-[-8px] opacity-80 leading-none font-bebas flex-shrink-0">
          {sectionNumber}
        </div>
        
        <div className="w-px bg-black flex-1 my-6 sm:my-7 md:my-8 min-h-[8rem] sm:min-h-[10rem] md:min-h-[12rem] max-h-[15rem]"></div>
        
        <div 
          className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-3xl font-medium tracking-widest text-black font-bebas flex-shrink-0"
          style={{ 
            writingMode: 'vertical-rl', 
            textOrientation: 'mixed',
            transform: 'rotate(180deg)' 
          }}
        >
          {verticalText}
        </div>
      </div>
    );

    // Standard text content
    const textContent = (
      <div ref={contentRef} className="flex-1 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-black leading-tight tracking-wider font-bebas">
          {title}
        </h1>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-black leading-tight mb-6 sm:mb-7 md:mb-8 tracking-wider font-bebas">
          {subtitle}
        </h2>
        
        <div className="w-16 sm:w-18 md:w-20 h-1.5 sm:h-2 bg-black mb-8 sm:mb-10 md:mb-12"></div>
        
        <div className="max-w-xs sm:max-w-sm md:max-w-md tracking-wider space-y-4 sm:space-y-5 md:space-y-8 font-sansita text-sm sm:text-base lg:mt-[97px]">
          {children}
        </div>
      </div>
    );

    // Transform-only animated text content for image-right-stack (no position changes)
    const moveableTextContent = (
      <div 
        ref={textRef}
        className="flex-1 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl relative will-change-transform"
        style={{ transform: 'translateY(0px)' }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-black leading-tight tracking-wider font-bebas">
          {title}
        </h1>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-black leading-tight mb-6 sm:mb-7 md:mb-8 tracking-wider font-bebas">
          {subtitle}
        </h2>
        
        <div className="w-16 sm:w-18 md:w-20 h-1.5 sm:h-2 bg-black mb-8 sm:mb-10 md:mb-12"></div>
        
        <div className="max-w-xs sm:max-w-sm md:max-w-md tracking-wider space-y-4 sm:space-y-5 md:space-y-8 font-sansita text-sm sm:text-base lg:mt-[97px]">
          {children}
        </div>
      </div>
    );

    const stackedImageElement = imageComponent && (
      <div className="flex-shrink-0 hidden md:block">
        <div className="w-80 md:w-96 lg:w-[450px] xl:w-[650px] flex items-start justify-center">
          <div className="w-full">
            {imageComponent}
          </div>
        </div>
      </div>
    );

    // Other elements remain unchanged
    const imageElement = imageComponent && (
      <div className="flex-shrink-0 hidden md:block">
        <div
          className="w-64 md:w-72 lg:w-80 xl:w-[520px] h-64 md:h-72 lg:h-80 xl:h-auto lg:mt-0 flex items-center justify-center"
          style={{ height: `${contentHeight}px` }}
        >
          {imageComponent}
        </div>
      </div>
    );

    const scrollableImageElement = imageComponent && (
      <div className="flex-shrink-0 hidden md:block">
        <div
          className="w-64 md:w-72 lg:w-80 xl:w-[520px] h-64 md:h-72 lg:h-80 xl:h-auto lg:mt-0 flex items-start justify-center overflow-y-auto"
          style={{ height: `${contentHeight}px` }}
        >
          <div className="w-full">
            {imageComponent}
          </div>
        </div>
      </div>
    );

    switch (variant) {
      case 'image-center':
        return (
          <>
            {centeredSidebarContent}
            {imageElement}
            {textContent}
          </>
        );
      
      case 'image-right':
        return (
          <>
            {centeredSidebarContent}
            {textContent}
            {imageElement}
          </>
        );

      case 'image-right-scroll':
        return (
          <>
            {centeredSidebarContent}
            {textContent}
            {scrollableImageElement}
          </>
        );

      case 'image-right-stack':
        return (
          <>
            {moveableSidebarContent}
            {moveableTextContent}
            {stackedImageElement}
          </>
        );
      
      case 'default':
      default:
        return (
          <>
            {centeredSidebarContent}
            {textContent}
          </>
        );
    }
  };

  const getFlexGap = () => {
    switch (variant) {
      case 'image-right-stack':
        return 'gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8';
      case 'image-center':
      case 'image-right':
      case 'image-right-scroll':
        return 'gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12';
      default:
        return 'gap-6 sm:gap-8 md:gap-10 lg:gap-12';
    }
  };

  // NOTE: changed overflow-visible -> overflow-hidden for image-right-stack so that transformed
  // elements are clipped and won't visually spill into the next section.
  const containerClass = variant === 'image-right-stack' 
    ? `relative bg-gray-100 overflow-hidden py-16 md:py-20 ${className}`
    : `relative min-h-screen flex items-center bg-gray-100 overflow-hidden ${className}`;

  return (
    <section ref={sectionRef} className={containerClass}>
      <div className="relative z-20 w-full pl-8 pr-8 sm:pl-12 sm:pr-12 md:pl-16 md:pr-16 lg:pl-20 lg:pr-20 xl:pl-24 xl:pr-24">
        {/* Mobile Layout remains unchanged */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="text-5xl sm:text-8xl font-light text-[#DBDBDB] opacity-80 leading-none font-bebas">
              {sectionNumber}
            </div>
            <div className="flex-1 h-px bg-black mx-4 sm:mx-6"></div>
            <div className="text-2xl sm:text-4sm font-medium tracking-widest text-black font-bebas">
              {verticalText}
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-normal text-black leading-tight tracking-wider font-bebas">
              {title}
            </h1>
            <h2 className="text-2xl sm:text-3xl font-normal text-black leading-tight mb-6 sm:mb-7 tracking-wider font-bebas">
              {subtitle}
            </h2>
            <div className="w-16 sm:w-18 h-1.5 sm:h-2 bg-black mb-8 sm:mb-10"></div>

            {imageComponent && (
              <div className="mb-6 sm:mb-8 flex justify-center max-h-96 overflow-y-auto">
                <div className="w-full max-w-sm">
                  {imageComponent}
                </div>
              </div>
            )}

            <div className="max-w-xs sm:max-w-sm tracking-wider space-y-4 sm:space-y-5 font-sansita text-sm sm:text-base">
              {children}
            </div>
          </div>
        </div>
        
        <div className={`hidden md:flex ${getFlexGap()} items-start max-w-none min-h-fit`}>
          {renderLayout()}
        </div>
      </div>
    </section>
  );
};

export default SectionLayout;
