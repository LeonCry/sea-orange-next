'use client';
// 触发盒子class: box-trigger
import style from './Cursor.module.scss';
import { useEffect, useRef, useState } from 'react';
import { isEmpty } from 'radash';
import { useEffectOnce } from 'react-use';
import { useMemoizedFn } from 'ahooks';
// 可以通过cursor操作的触发盒子
const handleTriggerBox = (el: HTMLDivElement, triggerEl: HTMLElement, tarBnd: any) => {
  //更改cursor样式
  el.style.borderRadius = tarBnd.targetStyle.borderTopLeftRadius;
  el.style.borderColor = tarBnd.targetStyle.backgroundColor;
  el.style.animationDuration = '0.5s';
  el.style.width = `${tarBnd.width + 14}px`;
  el.style.height = `${tarBnd.height + 14}px`;
  el.style.left = `${tarBnd.targetOrigin.x}px`;
  el.style.top = `${tarBnd.targetOrigin.y}px`;
  triggerEl.style.transition = 'transform 0ms ease-in-out';
  triggerEl.classList.add('blend-dark');
};
// 重置cursor与target的样式
const resetStyle = (
  cursorEl: HTMLDivElement,
  triggerEl: HTMLElement,
  innerCircleEl: HTMLDivElement
) => {
  cursorEl.style.width = '20px';
  cursorEl.style.height = '20px';
  cursorEl.style.borderRadius = '50%';
  cursorEl.style.borderColor = '#585b70';
  cursorEl.style.animationDuration = '0.8s';
  if (!triggerEl) return;
  triggerEl.style.transform = 'none';
  innerCircleEl.style.opacity = '0';
  triggerEl.classList.remove('blend-dark');
};
const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  //hover后内出现的小球
  const innerCircleRef = useRef<HTMLDivElement | null>(null);
  //是否在触发盒子内
  const [isInTriggerBox, setIsInTriggerBox] = useState(false);
  //触发盒子元素ref
  const triggerElement = useRef<HTMLElement | null>(null);
  //触发盒子的位置与大小
  const tarBnd = useRef<any>({});
  useEffectOnce(() => {
    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  });
  useEffect(() => {
    if (isInTriggerBox) {
      const getTar = getTargetRectBounding();
      for (const key in getTar) {
        let k = key as keyof typeof getTar;
        tarBnd.current[k] = getTar[k];
      }
      return handleTriggerBox(cursorRef.current!, triggerElement.current!, tarBnd.current);
    }
    resetStyle(cursorRef.current!, triggerElement.current!, innerCircleRef.current!);
  }, [isInTriggerBox]);
  const handleMove = useMemoizedFn((e: MouseEvent) => {
    const point = { x: e.pageX, y: e.pageY };
    if (!isInTriggerBox) {
      if (!cursorRef.current) return;
      cursorRef.current.style.left = `${point.x}px`;
      cursorRef.current.style.top = `${point.y}px`;
    } else {
      if (!innerCircleRef.current || !triggerElement.current) return;
      const left = triggerElement.current.offsetLeft;
      const top = triggerElement.current.offsetTop;
      innerCircleRef.current.style.left = `${point.x - left}px`;
      innerCircleRef.current.style.top = `${point.y - top}px`;
      innerCircleRef.current!.style.opacity = '1';
    }
    let target = e.target as HTMLElement;
    while (target.tagName !== 'HTML') {
      if (target.classList.contains('box-trigger')) {
        handleHoverTriggerBox(point);
        if (isInTriggerBox) return;
        triggerElement.current = target;
        return setIsInTriggerBox(true);
      }
      target = target.parentElement as HTMLElement;
    }
    if (target.tagName === 'HTML') return setIsInTriggerBox(false);
  });
  //获得target的位置与大小信息
  const getTargetRectBounding = () => {
    if (!triggerElement.current) return;
    const target = triggerElement.current;
    const width = target.offsetWidth;
    const height = target.offsetHeight;
    const left = target.offsetLeft;
    const top = target.offsetTop;
    const targetStyle = getComputedStyle(target);
    const targetOrigin = { x: left + width / 2, y: top + height / 2 };
    return { width, height, left, top, targetStyle, targetOrigin };
  };
  //triggerBox的鼠标移动效果
  const handleHoverTriggerBox = (point: { x: number; y: number }) => {
    if (isEmpty(tarBnd.current)) return;
    const maxMoveDistance = 4;
    const maxMoveDistanceX = tarBnd.current.width / 2;
    const maxMoveDistanceY = tarBnd.current.height / 2;
    //最大鼠标移动时target移动距离
    const [deltaX, deltaY] = [
      ((point.x - tarBnd.current.targetOrigin.x) * maxMoveDistance) / maxMoveDistanceX,
      ((point.y - tarBnd.current.targetOrigin.y) * maxMoveDistance) / maxMoveDistanceY,
    ];
    triggerElement.current!.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };
  return (
    <div ref={cursorRef} className={style.default}>
      <div ref={innerCircleRef} className={style.innerCircle} />
    </div>
  );
};

export default Cursor;
