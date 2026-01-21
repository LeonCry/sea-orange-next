'use client';
import { useEffect } from 'react';
import { createCursorWith, destroyCursorWith } from './create';
import { useCheckMobile } from '@/hooks/useCheckMobile';
const Cursor = () => {
  const isMobile = useCheckMobile();
  useEffect(() => {
    if (isMobile) return destroyCursorWith();
    createCursorWith();
    return () => destroyCursorWith();
  }, [isMobile]);
  return <></>;
};

export default Cursor;
