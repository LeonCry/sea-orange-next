import { MutableRefObject, useEffect } from "react";

export const useHoverCursor = (targetRef: MutableRefObject<HTMLElement | null>) => {
  useEffect(() => {
    if (!targetRef.current) return;
    targetRef.current.onmouseenter = () => {
      console.log('enter...');
    };
    targetRef.current.onmousemove = () => {
      console.log('move...');
    };
    targetRef.current.onmouseleave = () => {
      console.log('leave...');
    };
  }, [targetRef]);
};