'use client';
import { useEffectOnce } from 'react-use';
import { createCursorWith } from './create';
import { useCheckMobile } from '@/hooks/useCheckMobile';
const Cursor = () => {
  const isMobile = useCheckMobile();
  useEffectOnce(() => {
    if (isMobile) return;
    createCursorWith();
  });
  return <></>;
};

export default Cursor;
