import { useEffect, useState } from 'react';

export const useMyScroll = (container: React.RefObject<HTMLDivElement | null>) => {
  const [arrivedState, setArrivedState] = useState({
    top: false,
    bottom: false,
  });
  const [y, setY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    const currentContainer = container.current;
    if (!currentContainer) return;
    const handleScroll = () => {
      setY(currentContainer.scrollTop);
      setIsScrolling(true);
      setArrivedState({
        top: currentContainer.scrollTop === 0,
        bottom: currentContainer.scrollTop + currentContainer.clientHeight === currentContainer.scrollHeight,
      });
    };
    currentContainer.addEventListener('scroll', handleScroll);
    return () => {
      currentContainer.removeEventListener('scroll', handleScroll);
    };
  }, [container]);
  return { arrivedState, y, isScrolling };
};
