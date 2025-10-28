
'use client';
import { useFps } from '@/hooks/useFps';

const FPS = () => {
  const fps = useFps();

  return (
            <div
      style={{
        position: 'fixed',
        bottom: 8,
        left: 8,
        background: 'rgba(0,0,0,0.6)',
        color: '#0f0',
        padding: '4px 8px',
        borderRadius: 4,
        fontSize: 12,
      }}
    >
      {fps} FPS
    </div>
  );
};

export default FPS;
