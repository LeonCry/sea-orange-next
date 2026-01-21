'use client';
import { useAsyncEffect } from 'ahooks';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import style from './ItemBox.module.scss';
export const SlidingSelector = ({
  defaultCom,
  categoryCom,
}: {
  defaultCom: React.ReactNode;
  categoryCom: React.ReactNode[];
}) => {
  const [isClassify, setIsClassify] = useState(true);
  const selectorRef = useRef<HTMLDivElement>(null);
  useAsyncEffect(async () => {
    if (!selectorRef.current) return;
    selectorRef.current.style.width = 'calc(100% - 8px)';
    selectorRef.current.style.left = '0';
    await new Promise((resolve) => setTimeout(resolve, 300));
    selectorRef.current.style.width = '88px';
    selectorRef.current.style.left = isClassify ? '0' : 'calc(100% - 98px)';
  }, [isClassify]);
  return (
    <>
      <div className={style.slider}>
        <div
          ref={selectorRef}
          className="absolute w-[88px] h-8 m-1 rounded-md bg-[#b236ff17] transition-all duration-300"
        />
        <div
          onClick={() => setIsClassify(true)}
          className={clsx(
            'p-2 w-24 text-sm text-center z-10 rounded-md',
            isClassify && 'text-purple-600'
          )}
        >
          CATEGORY
        </div>
        <div
          onClick={() => setIsClassify(false)}
          className={clsx(
            'p-2 w-24 text-sm text-center z-10 rounded-md',
            !isClassify && 'text-purple-600'
          )}
        >
          TIME
        </div>
      </div>
      {isClassify ?
        <section className='flex flex-col-reverse'>
          {categoryCom}
        </section>
        : defaultCom}
    </>
  );
};
