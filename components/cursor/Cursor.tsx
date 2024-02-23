'use client';
// 触发盒子class: box-trigger
import style from './Cursor.module.scss';
import { useEffect, useRef, useState } from 'react';
const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  //hover后内出现的小球
  const innerCircleRef = useRef<HTMLDivElement | null>(null);
  const [innerShow, innerShowSet] = useState(true);
  //最近一次的触发盒子元素
  let lastTriggerElement: HTMLElement | null = null;
  useEffect(() => {
    window.addEventListener('mousemove', (e) => handleMove(e));
    return () => {
      window.removeEventListener('mousemove', (e) => handleMove(e));
    };
  }, [innerShow]);
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
    cursorRef.current!.style.width = `${width + 10}px`;
    cursorRef.current!.style.height = `${height + 10}px`;
    cursorRef.current!.style.left = `${targetOrigin.x}px`;
    cursorRef.current!.style.top = `${targetOrigin.y}px`;
    //更改target样式
    let [deltaX, deltaY] = [point.x - targetOrigin.x, point.y - targetOrigin.y];
    if (Math.abs(deltaX) > 2.5) deltaX = deltaX > 0 ? 2.5 : -2.5;
    if (Math.abs(deltaY) > 2.5) deltaY = deltaY > 0 ? 2.5 : -2.5;
    target.style.transition = 'transform 150ms ease-in-out';
    target.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    lastTriggerElement = target;
    //更改inner小球的样式
    innerShowSet(true);
    if (innerCircleRef.current && innerShow) {
      innerCircleRef.current.style.left = `${point.x - targetOrigin.x}px`;
      innerCircleRef.current.style.top = `${point.y - targetOrigin.y}px`;
      console.log(point);
      console.dir(innerCircleRef.current);
    }
  };
  // 重置cursor与target的样式
  const resetStyle = () => {
    cursorRef.current!.style.width = '20px';
    cursorRef.current!.style.height = '20px';
    cursorRef.current!.style.borderRadius = '50%';
    if (!lastTriggerElement) return;
    lastTriggerElement.style.transform = 'none';
    innerCircleRef.current = null;
    innerShowSet(false);
  };
  return (
    <div ref={cursorRef} className={style.default}>
      {innerShow ? <div ref={innerCircleRef} className={style.innerCircle} /> : null}
    </div>
  );
};

export default Cursor;
