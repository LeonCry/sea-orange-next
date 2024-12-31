'use client';
import { useAsyncEffect } from 'ahooks';
import clsx from 'clsx';
import { useRef, useState } from 'react';
export const SlidingSelector = ({
  defaultCom,
  categoryCom,
}: {
  defaultCom: React.ReactNode;
  categoryCom: React.ReactNode[];
}) => {
  const [isClassify, setIsClassify] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);
  useAsyncEffect(async () => {
    if (!selectorRef.current) return;
    selectorRef.current.style.width = '184px';
    selectorRef.current.style.left = '0';
    await new Promise((resolve) => setTimeout(resolve, 300));
    selectorRef.current.style.width = '88px';
    selectorRef.current.style.left = isClassify ? '0px' : '96px';
  }, [isClassify]);
  return (
    <>
      <div className="sticky z-10 top-0 -ml-[10%] w-48 h-10 bg-[#8636ff10] rounded-md flex justify-between items-center">
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
      {isClassify ? categoryCom : defaultCom}
    </>
  );
};
