
'use client';
import { useFps } from '@/hooks/useFps';
import { useEffect, useRef, useState } from 'react';
interface Points {
    from: [number, number];
    to: [number, number];
}
const BASE_FPS = 60;
const BRANCH_NUM = 2;
const FULL_GENERATE_BRANCH_NUM = 20;
const MAX_LEN = 10;
const MIN_LEN = 5;
const SPEED_SCALE = 1; 
let lenR = 1;
let rebound = true;
//以上一个点作为圆点,当前半径作为半径作圆,获得垂直于上一个点的线的0~180度的点的坐标
function getEndPointByVertical(
    lastOriginPoint: [number, number],
    lastEndPoint: [number, number],
    curLen: number
  ) {
    const r = Math.random();
    const arc = r > 0.5 ? 280 : 260;
    const vecX = lastEndPoint[0] - lastOriginPoint[0];
    const vecY = lastEndPoint[1] - lastOriginPoint[1];
    const vecLen = Math.hypot(vecX, vecY);
    const vecXUnit = -vecY / vecLen;
    const vecYUnit = vecX / vecLen;
    const angleInRadians = (Math.PI / 180) * arc;
    const rotatedUnitX = vecXUnit * Math.cos(angleInRadians) - vecYUnit * Math.sin(angleInRadians);
    const rotatedUnitY = vecXUnit * Math.sin(angleInRadians) + vecYUnit * Math.cos(angleInRadians);
    const nextPoint = [
      lastEndPoint[0] + rotatedUnitX * curLen,
      lastEndPoint[1] + rotatedUnitY * curLen,
    ];
    return nextPoint as [number, number];
  };
// 判断下一个点是否越界,如果越界,则反弹
function isOutBound(point:[number,number]){
  const w = document.documentElement.clientWidth;
  const h = document.documentElement.clientHeight;
    return point[0] < 0 || point[0] > w || point[1] < 0 || point[1] > h;
}
function loop(t:number,ctx:CanvasRenderingContext2D,ratio:number,points:Array<Points>) {
    if(t >= 18000) return;
    if(points.length === 0) return;
    ctx.beginPath();
    const fullGenerate = points.length <= FULL_GENERATE_BRANCH_NUM;
    let nextPoints:Array<Points> = [];
    points.forEach((item) => {
        ctx.moveTo(...item.from);
        ctx.lineTo(...item.to);
        if(rebound && isOutBound(item.to)){
            nextPoints.push({from:item.to,to:item.from});
            return;
        }
        for(let i = 0;i<BRANCH_NUM;i++){
            if(!fullGenerate && Math.random() >= 0.5) continue;
            nextPoints.push({from:item.to,to:getEndPointByVertical(item.from,item.to,(lenR * Math.random() * MAX_LEN + MIN_LEN) * ratio)});
        }
    });
    ctx.stroke();
    ctx.closePath();
    return requestAnimationFrame((t)=>loop(t,ctx,ratio,[...nextPoints]));
}


const GrowTrees = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fps = useFps();
  const [hasFps,setHasFps] = useState(false);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    setHasFps(Boolean(fps));
  }, [fps]);
  useEffect(() => {
    if (!canvasRef.current) return;
    if (frameIdRef.current) return;
    if (!hasFps) return; 
    const ctx = canvasRef.current.getContext('2d')!;
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    const points:Array<Points> = [
        {from:[width / 2, height/2],to:[width / 2 - 1, height/2]},
        {from:[width / 2, height/2],to:[width / 2 + 1, height/2]},
        {from:[width / 2, height/2],to:[width / 2, height/2 + 1]},
        {from:[width / 2, height/2],to:[width / 2, height/2 - 1]},
    ];
    frameIdRef.current = requestAnimationFrame((t) =>
      loop(t,ctx, (BASE_FPS / fps) * SPEED_SCALE, points)
    );

    return () => {
      ctx.clearRect(0, 0, width, height);
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[hasFps]);
  return (
    <div>
    <canvas ref={canvasRef}></canvas>
  </div>
  );
};

export default GrowTrees;
