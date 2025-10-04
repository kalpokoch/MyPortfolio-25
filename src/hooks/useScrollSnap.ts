import { useEffect, useRef } from 'react';

export const useScrollSnap = <T extends HTMLElement = HTMLElement>(
  sectionRefs: React.RefObject<T>[]
) => {
  const isSnapping = useRef(false);
  const scrollTimeout = useRef<number | null>(null);  // Changed from NodeJS.Timeout

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (isSnapping.current) return;

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
};
