'use client';
// 触发盒子class: box-trigger
import style from './Cursor.module.scss';
import { useEffect, useRef } from 'react';
const Cursor = () => {
  console.log('render cursor');
  const cursorRef = useRef<HTMLDivElement | null>(null);
  //hover后内出现的小球
  const innerCircleRef = useRef<HTMLDivElement | null>(null);
  //最近一次的触发盒子元素
  let lastTriggerElement: HTMLElement | null = null;
  useEffect(() => {
    window.addEventListener('mousemove', (e) => handleMove(e));
    return () => {
      window.removeEventListener('mousemove', (e) => handleMove(e));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleMove = (e: MouseEvent) => {
    if (!cursorRef.current) return;
    const point = { x: e.pageX, y: e.pageY };
    cursorRef.current.style.left = `${point.x}px`;
    cursorRef.current.style.top = `${point.y}px`;
    let target = e.target as HTMLElement;
    while (target.tagName !== 'HTML') {
      if (target.classList.contains('box-trigger')) return handleTriggerBox(target, point);
      target = target.parentElement as HTMLElement;
      resetStyle();
    }
  };
  // 可以通过cursor操作的触发盒子
  const handleTriggerBox = (target: HTMLElement, point: { x: number; y: number }) => {
    const width = target.offsetWidth;
    const height = target.offsetHeight;
    const left = target.offsetLeft;
    const top = target.offsetTop;
    const targetStyle = getComputedStyle(target);
    const targetOrigin = { x: left + width / 2, y: top + height / 2 };
    //更改cursor样式
    cursorRef.current!.style.borderRadius = targetStyle.borderTopLeftRadius;
    cursorRef.current!.style.borderColor = targetStyle.backgroundColor;
    cursorRef.current!.style.animationDuration = '0.5s';
    // cursorRef.current!.style.borderColor = 'transparent';
    cursorRef.current!.style.width = `${width + 14}px`;
    cursorRef.current!.style.height = `${height + 14}px`;
    cursorRef.current!.style.left = `${targetOrigin.x}px`;
    cursorRef.current!.style.top = `${targetOrigin.y}px`;
    //更改target样式
    //最大鼠标移动时target移动距离
    const maxMoveDistance = 4;
    const maxMoveDistanceX = width / 2;
    const maxMoveDistanceY = height / 2;
    let [deltaX, deltaY] = [
      ((point.x - targetOrigin.x) * maxMoveDistance) / maxMoveDistanceX,
      ((point.y - targetOrigin.y) * maxMoveDistance) / maxMoveDistanceY,
    ];
    target.style.transition += ',transform 50ms ease-in-out';
    target.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    lastTriggerElement = target;
    //更改inner小球的样式
    if (innerCircleRef.current) {
      innerCircleRef.current.style.left = `${point.x - targetOrigin.x + width / 2}px`;
      innerCircleRef.current.style.top = `${point.y - targetOrigin.y + height / 2}px`;
      innerCircleRef.current!.style.opacity = '1';
    }
  };
  // 重置cursor与target的样式
  const resetStyle = () => {
    cursorRef.current!.style.width = '20px';
    cursorRef.current!.style.height = '20px';
    cursorRef.current!.style.borderRadius = '50%';
    cursorRef.current!.style.borderColor = '#585b70';
    cursorRef.current!.style.animationDuration = '0s';
    if (!lastTriggerElement) return;
    lastTriggerElement.style.transform = 'none';
    innerCircleRef.current!.style.opacity = '0';
  };
  return (
    <div ref={cursorRef} className={style.default}>
      <div ref={innerCircleRef} className={style.innerCircle} />
    </div>
  );
};

export default Cursor;
