'use client';
import { useGetState, useMemoizedFn, useReactive } from 'ahooks';
// 触发盒子class: box-trigger
import style from './Cursor.module.scss';
import { useEffect, useRef } from 'react';
import { isEmpty } from 'radash';
const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  //hover后内出现的小球
  const innerCircleRef = useRef<HTMLDivElement | null>(null);
  //是否在触发盒子内
  const [isInTriggerBox, setIsInTriggerBox, getIsInTriggerBox] = useGetState(false);
  //触发盒子元素ref
  const triggerElement = useRef<HTMLElement | null>(null);
  //触发盒子的位置与大小
  const tarBnd = useReactive<any>({});
  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);
  useEffect(() => {
    if (getIsInTriggerBox()) {
      const getTar = getTargetRectBounding();
      for (const key in getTar) {
        let k = key as keyof typeof getTar;
        tarBnd[k] = getTar[k];
      }
      return handleTriggerBox();
    }
    resetStyle();
  }, [isInTriggerBox]);
  const handleMove = useMemoizedFn((e: MouseEvent) => {
    const point = { x: e.pageX, y: e.pageY };
    if (!getIsInTriggerBox()) {
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
        if (getIsInTriggerBox()) return;
        triggerElement.current = target;
        return setIsInTriggerBox(true);
      }
      target = target.parentElement as HTMLElement;
    }
    if (target.tagName === 'HTML') return setIsInTriggerBox(false);
  });
  // 可以通过cursor操作的触发盒子
  const handleTriggerBox = () => {
    //更改cursor样式
    cursorRef.current!.style.borderRadius = tarBnd.targetStyle.borderTopLeftRadius;
    cursorRef.current!.style.borderColor = tarBnd.targetStyle.backgroundColor;
    cursorRef.current!.style.animationDuration = '0.5s';
    cursorRef.current!.style.width = `${tarBnd.width + 14}px`;
    cursorRef.current!.style.height = `${tarBnd.height + 14}px`;
    cursorRef.current!.style.left = `${tarBnd.targetOrigin.x}px`;
    cursorRef.current!.style.top = `${tarBnd.targetOrigin.y}px`;
    triggerElement.current!.style.transition += ' transform ease-in-out 10ms';
  };
  // 重置cursor与target的样式
  const resetStyle = () => {
    cursorRef.current!.style.width = '20px';
    cursorRef.current!.style.height = '20px';
    cursorRef.current!.style.borderRadius = '50%';
    cursorRef.current!.style.borderColor = '#585b70';
    cursorRef.current!.style.animationDuration = '0s';
    if (!triggerElement.current) return;
    triggerElement.current.style.transform = 'none';
    innerCircleRef.current!.style.opacity = '0';
  };
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
    if (isEmpty(tarBnd)) return;
    const maxMoveDistance = 4;
    const maxMoveDistanceX = tarBnd.width / 2;
    const maxMoveDistanceY = tarBnd.height / 2;
    //最大鼠标移动时target移动距离
    const [deltaX, deltaY] = [
      ((point.x - tarBnd.targetOrigin.x) * maxMoveDistance) / maxMoveDistanceX,
      ((point.y - tarBnd.targetOrigin.y) * maxMoveDistance) / maxMoveDistanceY,
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
