import { useTick, Graphics } from '@pixi/react';
import type { Graphics as GraphicsType, Ticker } from 'pixi.js';
import { useCallback, useEffect, useRef } from 'react';
const CircleGrow = () => {
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  const graphicsRef = useRef<GraphicsType | null>(null);
  const handleTick = useCallback(async (delta: number, ticker: Ticker) => {
    ticker.speed = 1;
    const op = circles[0] as [number, number, number, number, number, boolean];
    op[3] += delta * 1;
    op[2] += delta * 15;
    op[0] += delta * 1;
    op[1] += delta * 1;
    graphicsRef.current?.arc(...op);
    if (op[2] > width * 1.5) ticker.stop();
  }, []);
  const randomCircle = () => {
    const cx = Math.random() * width;
    const cy = Math.random() * height;
    const r = Math.random() * 10;
    const startAngle = 0;
    const endAngle = Math.PI * 2;
    const anticlockwise = Math.random() > 0.5 ? true : false;
    return [cx, cy, r, startAngle, endAngle, anticlockwise];
  };
  const circles = [randomCircle(), randomCircle()];
  useTick(handleTick);
  useEffect(() => {
    if (!graphicsRef.current) return;
    graphicsRef.current.lineStyle(1, 0x000000, 1);
  });
  return (
    <>
      <Graphics ref={graphicsRef}></Graphics>
    </>
  );
};

export default CircleGrow;
