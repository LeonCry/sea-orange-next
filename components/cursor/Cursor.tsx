'use client';
import { useEffectOnce } from 'react-use';
import { createCursorWith } from './create';

const Cursor = () => {
  useEffectOnce(() => {
    createCursorWith();
  });
  return <></>;
};

export default Cursor;
