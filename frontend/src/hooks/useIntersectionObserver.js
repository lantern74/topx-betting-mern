import { useEffect, useState, useRef } from 'react';

const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        hasAnimated.current = true;
        observer.disconnect(); // Stop observing after first intersection
      }
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
};

export default useIntersectionObserver;
