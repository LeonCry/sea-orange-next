import { useState } from 'react';
import { useEffectOnce } from 'react-use';

export function useFps() {
  const [fps, setFps] = useState(0);
  useEffectOnce(() => {
    if (typeof window === 'undefined') return;
    let frames = 0;
    let start = performance.now();
    let rafId = 0;

    const loop = (now: number) => {
      frames += 1;
      const elapsed = now - start;
      if (elapsed >= 1000) {
        setFps(Math.round((frames * 1000) / elapsed));
        frames = 0;
        start = now;
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  });
  return fps;
}
