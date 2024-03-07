'use client';
import { Stage, AppProvider } from '@pixi/react';
import { Application } from 'pixi.js';
import TreeGrow from '@/components/backgroundView/TreeGrow';
import { useEffect, useMemo } from 'react';
const BackView = () => {
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  const app = useMemo(() => new Application({ width, height }), []);
  useEffect(() => {
    return () => {
      app.destroy(true);
    };
  }, [app]);
  return (
    <main className="w-full h-full">
      <AppProvider value={app}>
        <Stage width={width} height={height} options={{ backgroundAlpha: 0 }}>
          <TreeGrow></TreeGrow>
        </Stage>
      </AppProvider>
    </main>
  );
};

export default BackView;
