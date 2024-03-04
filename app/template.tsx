'use client';
import { usePathname } from 'next/navigation';
import { uploadVisit } from './_serverFn/server';
import { useEffect } from 'react';
import getUserAgentData from '@/lib/getUserAgentData';
const RootTemplate = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  useEffect(() => {
    const { os, browser } = getUserAgentData();
    const curTime = new Date().toLocaleString();
    uploadVisit(pathName, curTime, os, browser);
  }, [pathName]);
  return <>{children}</>;
};

export default RootTemplate;
