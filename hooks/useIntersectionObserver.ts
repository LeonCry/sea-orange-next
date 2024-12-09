import { MutableRefObject, useEffect, useState } from 'react';

export const useIntersectionObserver = (elements: MutableRefObject<any>, threshold: number = 0.66) => {
  const [isIntoView, setIsIntoView] = useState(false);
  useEffect(() => {
    const callback = ((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLDivElement).style.animationPlayState = 'running';
          setIsIntoView(true);
        }
      });
    });
    const io = new IntersectionObserver(callback, {
      threshold,
    });
    if (elements) {
      elements.current.classList.add('show-move-animation');
      io.observe(elements.current);
    }
    return () => {
      io.disconnect();
    };
  }, [elements, threshold]);
  return isIntoView;
};