import { useEffect, useRef, MutableRefObject } from 'react';

const useObserver = (fetchNextPage: () => void): MutableRefObject<HTMLDivElement | null> => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleObserver: IntersectionObserverCallback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      });
    };

    if (!observerRef.current) return;

    const observer = new IntersectionObserver(handleObserver, options);
    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchNextPage]);

  return observerRef;
};

export default useObserver;
