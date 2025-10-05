import { useEffect, useRef } from 'react';

export const useScrollSnap = <T extends HTMLElement = HTMLElement>(
  sectionRefs: React.RefObject<T>[]
) => {
  const isSnapping = useRef(false);
  const isDisabled = useRef(false); // NEW: Flag to disable snap
  const scrollTimeout = useRef<number | null>(null);

  // NEW: Method to temporarily disable snapping
  const disableSnap = (duration: number = 1000) => {
    isDisabled.current = true;
    setTimeout(() => {
      isDisabled.current = false;
    }, duration);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // UPDATED: Check if disabled
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
          }, 150);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    sectionRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      sectionRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
      observer.disconnect();
    };
  }, [sectionRefs]);

  return { disableSnap }; // NEW: Return control method
};
