'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import getUserAgentData from '@/lib/getUserAgentData';
import { uploadVisit } from '@/api/getSectionInfo';
const RootTemplate = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  useEffect(() => {
    const time = new Date();
    const path = pathName;
    return () => {
      if (process.env.NEXT_PUBLIC_APP_ENV === 'development') return;
      if (localStorage.getItem('ignore-visit') === 'true') return;
      const { machine, browser } = getUserAgentData();
      const overTime = new Date();
      const differenceInMilliseconds = Math.abs(time.getTime() - overTime.getTime());
      const spendTime = Math.floor(differenceInMilliseconds / 1000) + '';
      if (spendTime === '0') return;
      const infos = { path, machine, browser, time: time.toLocaleString(), spendTime };
      uploadVisit(infos);
    };
  }, [pathName]);
  return <>{children}</>;
};

export default RootTemplate;
