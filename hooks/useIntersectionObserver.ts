import { MutableRefObject, useEffect, useState } from "react";

export const useIntersectionObserver = (elements: MutableRefObject<any>) => {
  const [typeStarted, setTypeStarted] = useState(false);
  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        (entry.target as HTMLDivElement).style.animationPlayState = 'running';
        setTypeStarted(true);
      }
    });
  };
  useEffect(() => {
    const io = new IntersectionObserver(callback, {
      threshold: 1,
    });
    if (elements) io.observe(elements.current);
    return () => {
      io.disconnect();
    };
  }, [elements]);
  return typeStarted;
};