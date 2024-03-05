'use client';
import { chakraEN } from '@/style/defineFont';
import ItemBox from './ItemBox';
import { useEffect, useRef } from 'react';
const titleStyle = `w-full text-center text-2xl py-5 ${chakraEN.className}`;
const callback = (entries: IntersectionObserverEntry[]) => {
  //改成hooks
  entries.forEach((entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) (entry.target as HTMLDivElement).style.animationPlayState = 'running';
  });
};
const option = {
  threshold: 1,
};
const SectionBox = () => {
  const itemBoxRefs = useRef<(typeof ItemBox | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(callback, option);
    itemBoxRefs.current.forEach((item: any) => {
      if (item) io.observe(item);
    });
    return () => {
      io.disconnect();
    };
  }, []);
  return (
    <>
      <h1 className={titleStyle}> current focusing </h1>
      <article className="flex flex-wrap justify-evenly pb-16">
        <ItemBox ref={(f: typeof ItemBox) => (itemBoxRefs.current[0] = f)} />
        <ItemBox ref={(f: typeof ItemBox) => (itemBoxRefs.current[1] = f)} />
        <ItemBox ref={(f: typeof ItemBox) => (itemBoxRefs.current[2] = f)} />
        <ItemBox ref={(f: typeof ItemBox) => (itemBoxRefs.current[3] = f)} />
        <ItemBox ref={(f: typeof ItemBox) => (itemBoxRefs.current[4] = f)} />
      </article>
    </>
  );
};

export default SectionBox;
