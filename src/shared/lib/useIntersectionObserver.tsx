import { useRef, useEffect } from 'react';

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  options?: IntersectionObserverInit;
}

export const useIntersectionObserver = ({ onIntersect, options }: UseIntersectionObserverProps) => {
  const ref = useRef(null);

  useEffect(() => {
    const observerElement = ref.current;

    const callback = ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    };

    const observer = new IntersectionObserver(callback, options);

    if (observerElement) {
      observer.observe(observerElement);
    }

    return () => {
      if (observerElement) {
        observer.unobserve(observerElement);
      }
    };
  }, [onIntersect, options]);

  return ref;
};
