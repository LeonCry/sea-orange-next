'use client';
import { useEffect, useRef } from 'react';
class Branch {
  originPoint: [number, number];
  endPoint: [number, number];
  len: number;
  step: [number, number];
  stepTime: number;
  nextBranch: Branch[];
  constructor(originPoint: [number, number], endPoint: [number, number], len: number) {
    //每走一步的时间
    this.stepTime = Math.floor(Math.random() * 30 + 30);
    this.originPoint = originPoint;
    this.endPoint = endPoint;
    this.len = len;
    this.nextBranch = [];
    this.step = [
      (this.endPoint[0] - this.originPoint[0]) / this.stepTime,
      (this.endPoint[1] - this.originPoint[1]) / this.stepTime,
    ];
  }
  addNextBranch(nextBranch: Branch) {
    this.nextBranch.push(nextBranch);
  }
}
//以上一个点作为圆点,当前半径作为半径作圆,获得垂直于上一个点的线的0~180度的点的坐标
const getEndPointByVertical = (
  lastOriginPoint: [number, number],
  lastEndPoint: [number, number],
  curLen: number
) => {
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
const branchLoop = (
  branch: Branch[],
  branchNum: number,
  limitBranch: number,
  maxBranch: number,
  branchRate: number,
  maxLen: number,
  minLen: number
): void => {
  if (branchNum > limitBranch || !branch.length) return;
  const curBranch = branch.shift()!;
  let newBranchNum = Array.from({ length: maxBranch }, () => Math.random() <= branchRate).filter(
    Boolean
  ).length;
  if (branchNum < 100) newBranchNum = 2;
  branchNum += newBranchNum;
  for (let i = 0; i < newBranchNum; i++) {
    const len = Math.random() * maxLen + minLen;
    const endPoint = getEndPointByVertical(curBranch.originPoint, curBranch.endPoint, len);
    const newBranch = new Branch([...curBranch.endPoint], [...endPoint], len);
    curBranch.addNextBranch(newBranch);
    branch.push(newBranch);
  }
  return branchLoop(branch, branchNum, limitBranch, maxBranch, branchRate, maxLen, minLen);
};
const branchGenerated = (
  width: number,
  height: number,
  generateMode: number,
  initBranchNum: number,
  initBranchRate: number,
  maxBranch: number,
  branchRate: number,
  limitBranch: number,
  maxLen: number,
  minLen: number
) => {
  let originPointArr;
  //对角线模式
  if (generateMode) {
    const diagonalBranch = [
      [new Branch([0, 0], [1, 1], 1), new Branch([width, height], [width - 1, height - 1], 1)],
      [new Branch([width, 0], [width - 1, 1], 1), new Branch([0, height], [1, height - 1], 1)],
      [
        new Branch([0, height / 2], [1, height / 2], 1),
        new Branch([width, height / 2], [width - 1, height / 2], 1),
      ],
    ];
    originPointArr =
      Math.random() > 0.5
        ? diagonalBranch[0]
        : Math.random() > 0.5
        ? diagonalBranch[1]
        : diagonalBranch[2];
  }
  //随机模式
  else {
    originPointArr = Array.from({ length: initBranchNum }, () => {
      //随机模式
      if (Math.random() > initBranchRate) return;
      const side = Math.floor(Math.random() * 4);
      const xRandom = Math.random() * width;
      const yRandom = Math.random() * height;
      switch (side % 4) {
        case 0:
          return new Branch([xRandom, 0], [xRandom, 1], 1);
        case 1:
          return new Branch([width, yRandom], [width - 1, yRandom], 1);
        case 2:
          return new Branch([xRandom, height], [xRandom, height - 1], 1);
        case 3:
          return new Branch([0, yRandom], [1, yRandom], 1);
      }
    }).filter(Boolean) as Branch[];
  }
  originPointArr.forEach((item) => {
    const branchNum = 1;
    branchLoop([item], branchNum, limitBranch, maxBranch, branchRate, maxLen, minLen);
  });
  return originPointArr;
};
const handleCb = (ctx: CanvasRenderingContext2D, remainPoints: Branch[]) => {
  if (!remainPoints.length) return;
  for (let i = 0; i < remainPoints.length; i++) {
    const item = remainPoints[i];
    ctx.beginPath();
    ctx.moveTo(...item.originPoint);
    item.originPoint[0] += item.step[0];
    item.originPoint[1] += item.step[1];
    item.stepTime--;
    ctx.lineTo(...item.originPoint);
    ctx.stroke();
    ctx.closePath();
    if (item.stepTime <= 0) {
      ctx.beginPath();
      ctx.arc(item.originPoint[0], item.originPoint[1], 0.5, 0, Math.PI * 2, true);
      ctx.stroke();
      ctx.closePath();
      remainPoints.splice(i, 1);
      remainPoints.push(...item.nextBranch);
    }
  }
  requestAnimationFrame(() => handleCb(ctx, remainPoints));
};
const GrowTree = () => {
  //plum单步最大长度
  const maxLen = 15;
  const minLen = 10;
  //初始分支数量
  const initBranchNum = 2;
  //初始分支生成概率
  const initBranchRate = 1;
  const generateMode = 1; //[随机模式,对角线模式]
  //单个plum最大分支数
  const maxBranch = 2;
  //每个分支生成概率
  const branchRate = 0.5;
  //所有plum最大分支树
  const limitBranch = 3333;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    canvasRef.current!.width = width;
    canvasRef.current!.height = height;
    const remainPoints: Branch[] = branchGenerated(
      width,
      height,
      generateMode,
      initBranchNum,
      initBranchRate,
      maxBranch,
      branchRate,
      limitBranch,
      maxLen,
      minLen
    );
    ctx.lineWidth = 0.3;
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    const frameId = requestAnimationFrame(() => handleCb(ctx, remainPoints));
    return () => {
      ctx.clearRect(0, 0, width, height);
      cancelAnimationFrame(frameId);
    };
  }, []);
  return (
    <section>
      <canvas ref={canvasRef}></canvas>
    </section>
  );
};

export default GrowTree;
