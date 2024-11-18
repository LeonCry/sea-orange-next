import { useMemoizedFn } from 'ahooks';
import { MutableRefObject, useEffect, useState } from 'react';

export const useIntersectionObserver = (elements: MutableRefObject<any>, threshold: number = 0.66) => {
  const [isIntoView, setIsIntoView] = useState(false);
  const callback = useMemoizedFn((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        (entry.target as HTMLDivElement).style.animationPlayState = 'running';
        setIsIntoView(true);
      }
    });
  });
  useEffect(() => {
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