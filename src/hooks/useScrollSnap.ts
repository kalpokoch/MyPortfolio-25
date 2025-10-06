import { useEffect, useRef } from 'react';

export const useScrollSnap = <T extends HTMLElement = HTMLElement>(
  sectionRefs: React.RefObject<T>[]
) => {
  const isSnapping = useRef(false);
  const isDisabled = useRef(false);
  const scrollTimeout = useRef<number | null>(null);
  const lastScrollTop = useRef(0);
  const scrollVelocityTimeout = useRef<number | null>(null);

  const disableSnap = (duration: number = 1000) => {
    isDisabled.current = true;
    setTimeout(() => {
      isDisabled.current = false;
    }, duration);
  };

  useEffect(() => {
    // Detect active scrolling and cancel snap
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // If user is scrolling during snap animation
      if (isSnapping.current && Math.abs(currentScrollTop - lastScrollTop.current) > 5) {
        // Cancel the snap - disable temporarily
        isSnapping.current = false;
        isDisabled.current = true;

        // Clear any pending snap
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
          scrollTimeout.current = null;
        }

        // Re-enable after scrolling settles
        if (scrollVelocityTimeout.current) {
          clearTimeout(scrollVelocityTimeout.current);
        }

        scrollVelocityTimeout.current = setTimeout(() => {
          isDisabled.current = false;
        }, 200) as unknown as number;
      }

      lastScrollTop.current = currentScrollTop;
    };

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (isSnapping.current || isDisabled.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
          }

          scrollTimeout.current = setTimeout(() => {
            isSnapping.current = true;
            
            entry.target.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });

            setTimeout(() => {
              isSnapping.current = false;
            }, 800);
          }, 150) as unknown as number;
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    sectionRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (scrollVelocityTimeout.current) {
        clearTimeout(scrollVelocityTimeout.current);
      }
      window.removeEventListener('scroll', handleScroll);
      sectionRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
      observer.disconnect();
    };
  }, [sectionRefs]);

  return { disableSnap };
};