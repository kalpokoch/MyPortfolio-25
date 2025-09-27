import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import CircularProgress from './CircularProgress';

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2
};

interface SkillData {
  name: string;
  percentage: number;
  category: string;
}

interface LogoWithSkill {
  src: string;
  alt: string;
  skillData?: SkillData;
}

const toCssLength = (value: any) => (typeof value === 'number' ? `${value}px` : (value ?? undefined));
const cx = (...parts: any[]) => parts.filter(Boolean).join(' ');

const useResizeObserver = (
  callback: () => void, 
  elements: React.RefObject<HTMLElement | null>[], 
  dependencies: any[]
) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }

    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, dependencies);
};

const useImageLoader = (
  seqRef: React.RefObject<HTMLElement | null>, 
  onLoad: () => void, 
  dependencies: any[]
) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];

    if (images.length === 0) {
      onLoad();
      return;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) {
        onLoad();
      }
    };

    images.forEach(img => {
      const htmlImg = img as HTMLImageElement;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener('load', handleImageLoad, { once: true });
        htmlImg.addEventListener('error', handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, dependencies);
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLElement | null>, 
  targetVelocity: number, 
  seqWidth: number, 
  isHovered: boolean, 
  pauseOnHover: boolean
) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (seqWidth > 0) {
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    if (prefersReduced) {
      track.style.transform = 'translate3d(0, 0, 0)';
      return () => {
        lastTimestampRef.current = null;
      };
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = pauseOnHover && isHovered ? 0 : targetVelocity;

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqWidth > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = nextOffset;

        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover, trackRef]);
};

interface EducationLogoLoopProps {
  logos: LogoWithSkill[];
  speed?: number;
  direction?: 'left' | 'right';
  width?: string | number;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const EducationLogoLoop = memo<EducationLogoLoopProps>(
  ({
    logos,
    speed = 120,
    direction = 'left',
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover = true,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    ariaLabel = 'Educational skills logos',
    className,
    style
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLUListElement>(null);

    const [seqWidth, setSeqWidth] = useState(0);
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState(false);

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      const directionMultiplier = direction === 'left' ? 1 : -1;
      const speedMultiplier = speed < 0 ? -1 : 1;
      return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction]);

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceWidth = seqRef.current?.getBoundingClientRect?.()?.width ?? 0;

      if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth));
        const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    }, []);

    useResizeObserver(updateDimensions, [containerRef as React.RefObject<HTMLElement | null>, seqRef as React.RefObject<HTMLElement | null>], [logos, gap, logoHeight]);
    useImageLoader(seqRef as React.RefObject<HTMLElement | null>, updateDimensions, [logos, gap, logoHeight]);
    useAnimationLoop(trackRef as React.RefObject<HTMLElement | null>, targetVelocity, seqWidth, isHovered, pauseOnHover);

    const cssVariables = useMemo(
      () => ({
        '--logoloop-gap': `${gap}px`,
        '--logoloop-logoHeight': `${logoHeight}px`,
        ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
      }),
      [gap, logoHeight, fadeOutColor]
    );

    const rootClasses = useMemo(
      () =>
        cx(
          'relative overflow-x-hidden group',
          '[--logoloop-gap:32px]',
          '[--logoloop-logoHeight:28px]',
          '[--logoloop-fadeColorAuto:#ffffff]',
          'dark:[--logoloop-fadeColorAuto:#0b0b0b]',
          scaleOnHover && 'py-[calc(var(--logoloop-logoHeight)*0.15)]',
          className
        ),
      [scaleOnHover, className]
    );

    const handleMouseEnter = useCallback(() => {
      if (pauseOnHover) setIsHovered(true);
    }, [pauseOnHover]);

    const handleMouseLeave = useCallback(() => {
      if (pauseOnHover) setIsHovered(false);
    }, [pauseOnHover]);

    const renderLogoItem = useCallback(
      (item: LogoWithSkill, key: string) => {
        const progressSize = logoHeight + 16;
        
        const logoContent = (
          <div className="relative inline-flex items-center justify-center">
            {item.skillData && (
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ 
                  width: progressSize, 
                  height: progressSize,
                  transform: 'translate(-50%, -50%)',
                  left: '50%',
                  top: '50%'
                }}
              >
                <CircularProgress
                  percentage={item.skillData.percentage}
                  size={progressSize}
                  strokeWidth={2}
                  showPercentage={false}
                  isVisible={isHovered}
                />
              </div>
            )}
            
            <img
              className={cx(
                'relative z-10 h-[var(--logoloop-logoHeight)] w-auto block object-contain',
                '[-webkit-user-drag:none] pointer-events-none',
                '[image-rendering:-webkit-optimize-contrast]',
                'motion-reduce:transition-none',
                'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
                scaleOnHover && isHovered && 'scale-110',
                isHovered && item.skillData && 'brightness-110 contrast-110'
              )}
              src={item.src}
              alt={item.alt ?? ''}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            
            {item.skillData && isHovered && (
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                style={{ 
                  width: progressSize, 
                  height: progressSize,
                  transform: 'translate(-50%, -50%)',
                  left: '50%',
                  top: '50%'
                }}
              >
                <div className={cx(
                  'bg-white/90 backdrop-blur-sm rounded-full border border-black/10',
                  'flex items-center justify-center shadow-lg',
                  'transition-all duration-300 ease-out',
                  'animate-in fade-in zoom-in-95'
                )}
                style={{ 
                  width: progressSize * 0.6, 
                  height: progressSize * 0.6 
                }}>
                  <span className="text-black font-bold font-bebas text-xs">
                    {item.skillData.percentage}%
                  </span>
                </div>
              </div>
            )}
          </div>
        );

        return (
          <li
            className={cx(
              'flex-none mr-[var(--logoloop-gap)] text-[length:var(--logoloop-logoHeight)] leading-[1]',
              'flex items-center justify-center',
              scaleOnHover && 'overflow-visible group/item',
              isHovered && 'transform transition-transform duration-300'
            )}
            key={key}
            role="listitem"
          >
            {logoContent}
          </li>
        );
      },
      [scaleOnHover, logoHeight, isHovered]
    );

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className="flex items-center"
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
          </ul>
        )),
      [copyCount, logos, renderLogoItem]
    );

    const containerStyle = useMemo(
      () => ({
        width: toCssLength(width) ?? '100%',
        ...cssVariables,
        ...style
      }),
      [width, cssVariables, style]
    );

    return (
      <div
        ref={containerRef}
        className={rootClasses}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {fadeOut && (
          <>
            <div
              aria-hidden
              className={cx(
                'pointer-events-none absolute inset-y-0 left-0 z-[1]',
                'w-[clamp(24px,8%,120px)]',
                'bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
              )}
            />
            <div
              aria-hidden
              className={cx(
                'pointer-events-none absolute inset-y-0 right-0 z-[1]',
                'w-[clamp(24px,8%,120px)]',
                'bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
              )}
            />
          </>
        )}

        <div
          className={cx('flex w-max will-change-transform select-none', 'motion-reduce:transform-none')}
          ref={trackRef}
        >
          {logoLists}
        </div>
      </div>
    );
  }
);

EducationLogoLoop.displayName = 'EducationLogoLoop';
export default EducationLogoLoop;
