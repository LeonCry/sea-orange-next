'use client';
import { useCheckMobile } from '@/hooks/useCheckMobile';
import { ReactNode } from 'react';
import UnSuitable from '@/lotties/unsuitable/unSuitable';
const SuitForMobile = ({ children }: { children: ReactNode }) => {
  const isMobile = useCheckMobile();
  return !isMobile ? children :
    <section className='w-full h-full overflow-hidden flex flex-col gap-4 items-center px-10'>
      <UnSuitable />
      This page is not suitable for mobile devices.
    </section>
    ;
};
export default SuitForMobile;