import { useState } from 'react';
import { useEffectOnce } from 'react-use';

export const useMyScroll = (container: React.RefObject<HTMLDivElement | null>, option?: { mb?: number }) => {
  const [arrivedState, setArrivedState] = useState({
    top: false,
    bottom: false,
  });
  const [y, setY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  useEffectOnce(() => {
    const currentContainer = container.current;
    if (!currentContainer) return;
    const handleScroll = () => {
      setY(currentContainer.scrollTop);
      setIsScrolling(true);
      setArrivedState({
        top: currentContainer.scrollTop === 0,
        bottom: currentContainer.scrollTop + currentContainer.clientHeight + (option?.mb || 0) >= currentContainer.scrollHeight,
      });
    };
    currentContainer.addEventListener('scroll', handleScroll);
    return () => {
      currentContainer.removeEventListener('scroll', handleScroll);
    };
  });
  return { arrivedState, y, isScrolling };
};
