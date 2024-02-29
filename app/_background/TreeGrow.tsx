import { useTick, Graphics } from '@pixi/react';
import type { Graphics as GraphicsType, Ticker } from 'pixi.js';
import { useCallback, useEffect, useRef } from 'react';
class Branch {
  originPoint: [number, number];
  endPoint: [number, number];
  len: number;
  step: [number, number];
  stepTime: number;
  nextBranch: Branch[];
  constructor(originPoint: [number, number], endPoint: [number, number], len: number) {
    //每走一步的时间
    this.stepTime = Math.floor(Math.random() * 30 + 60);
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
const TreeGrow = () => {
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  //plum单步最大长度
  const maxLen = 15;
  const minLen = 15;
  //初始分支数量
  const initBranchNum = 3;
  //初始分支生成概率
  const initBranchRate = 0.8;
  //单个plum最大分支数
  const maxBranch = 2;
  //每个分支生成概率
  const branchRate = 0.5;
  //所有plum最大分支树
  const limitBranch = 1000;
  const branchGenerated = () => {
    const originPointArr = Array.from({ length: initBranchNum }, () => {
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
    originPointArr.forEach((item) => {
      const branchNum = 1;
      branchLoop([item], branchNum);
    });
    return originPointArr;
  };
  const branchLoop: any = (branch: Branch[], branchNum: number) => {
    if (branchNum > limitBranch || !branch.length) return;
    const curBranch = branch.shift()!;
    let newBranchNum = Array.from({ length: maxBranch }, () => Math.random() <= branchRate).filter(Boolean).length;
    if (branchNum < 100) newBranchNum = 2;
    branchNum += newBranchNum;
    for (let i = 0; i < newBranchNum; i++) {
      const len = Math.random() * maxLen + minLen;
      const endPoint = getEndPointByVertical(curBranch.originPoint, curBranch.endPoint, len, i);
      const newBranch = new Branch([...curBranch.endPoint], [...endPoint], len);
      curBranch.addNextBranch(newBranch);
      branch.push(newBranch);
    }
    return branchLoop(branch, branchNum);
  };
  //以上一个点作为圆点,当前半径作为半径作圆,获得垂直于上一个点的线的0~180度的点的坐标
  const getEndPointByVertical = (
    lastOriginPoint: [number, number],
    lastEndPoint: [number, number],
    curLen: number,
    i: number
  ) => {
    const r = Math.random();
    const ratio = Math.random() * 20 + 15;
    const arc = r > 0.5 ? Math.random() * ratio + 270 : Math.random() * -ratio + 270;
    const vecX = lastEndPoint[0] - lastOriginPoint[0];
    const vecY = lastEndPoint[1] - lastOriginPoint[1];
    const vecLen = Math.hypot(vecX, vecY);
    const vecXUnit = -vecY / vecLen;
    const vecYUnit = vecX / vecLen;
    const angleInRadians = (Math.PI / 180) * arc;
    const rotatedUnitX = vecXUnit * Math.cos(angleInRadians) - vecYUnit * Math.sin(angleInRadians);
    const rotatedUnitY = vecXUnit * Math.sin(angleInRadians) + vecYUnit * Math.cos(angleInRadians);
    const nextPoint = [lastEndPoint[0] + rotatedUnitX * curLen, lastEndPoint[1] + rotatedUnitY * curLen];
    return nextPoint as [number, number];
  };
  let remainPoints = branchGenerated();
  const graphicsRef = useRef<GraphicsType | null>(null);
  const handleTick = useCallback(
    (delta: number, ticker: Ticker) => {
      if (!remainPoints.length) ticker.stop();
      for (let i = 0; i < remainPoints.length; i++) {
        const item = remainPoints[i];
        graphicsRef.current!.moveTo(...item.originPoint);
        item.originPoint[0] += item.step[0];
        item.originPoint[1] += item.step[1];
        item.stepTime--;
        graphicsRef.current!.lineTo(...item.originPoint);
        if (item.stepTime <= 0) {
          remainPoints.splice(i, 1);
          remainPoints.push(...item.nextBranch);
        }
      }
    },
    [remainPoints]
  );
  useTick(handleTick);
  useEffect(() => {
    if (!graphicsRef.current) return;
    graphicsRef.current.lineStyle(0.3, 0x000000, 0.3);
  });
  return (
    <>
      <Graphics ref={graphicsRef}></Graphics>
    </>
  );
};

export default TreeGrow;
