'use client';
import '@/app/enter-fade.scss';
import { usePathname } from 'next/navigation';
import { AppProgressBar } from 'next-nprogress-bar';
import {
  Like,
  DarkMode,
  SunOne,
} from '@icon-park/react';
import HeaderPC from './HeaderPC';
import { useEffect, useState, useMemo, useCallback, useRef, ReactNode, Suspense } from 'react';
import { darkStore } from '@/store/darkStore';
import { useEffectOnce, useLocalStorage } from 'react-use';
import { getCount } from '@/api/getSectionInfo';
import HeaderMobile from './HeadMobile';
import { useCheckMobile } from '@/hooks/useCheckMobile';
export interface RootBarProps {
  renderTitle: () => ReactNode;
  secPath: string;
  secondPath: string;
  handleLike: () => void;
  memoizedLike: ReactNode;
  isLike: boolean;
  handleDark: () => void;
  isDark: boolean;
  memoizedDarkMode: ReactNode;
  visitCount: number;
  isCount: boolean;
  showMenu?: boolean;
  setShowMenu?: (show: boolean) => void;

}
const RootBar = () => {
  const pathName = usePathname();
  const secondPath = pathName.split('/')[1];
  const secPath = '/' + secondPath;
  const [isLike, isLikeSet] = useState(false);
  const [isDark, isDarkSet] = useState(false);
  const [storageDark, setStorageDark] = useLocalStorage('isDark', false);
  const [storageLike, setStorageLike] = useLocalStorage('isLike', false);
  const [showMenu, setShowMenu] = useState(false);

  const renderTitle = () => {
    const text = 'VOIDIS.ME';
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="letter inline-block"
        style={{
          transformOrigin: 'center center',
          display: 'inline-block'
        }}
      >
        {char}
      </span>
    ));
  };

  const memoizedLike = useMemo(
    () =>
      isLike ? (
        isDark ? (
          <Like theme="two-tone" size="20" fill={['#00ADB1', '#006364']} strokeLinejoin="bevel" />
        ) : (
          <Like theme="two-tone" size="20" fill={['#f64649', '#ff9999']} strokeLinejoin="bevel" />
        )
      ) : (
        <Like theme="outline" size="20" fill="#181926" />
      ),
    [isLike, isDark]
  );

  const memoizedDarkMode = useMemo(
    () =>
      isDark ? (
        <DarkMode theme="filled" size="20" fill="#333" />
      ) : (
        <SunOne theme="outline" size="20" fill="#181926" />
      ),
    [isDark]
  );

  const handleLike = () => {
    isLikeSet(!isLike);
    setStorageLike(!isLike);
  };
  const handleDark = () => {
    isDarkSet(!isDark);
    darkStore.isDark = !isDark;
    setStorageDark(!isDark);
    if (!isDark) return document.documentElement.classList.add('blend-dark');
    return document.documentElement.classList.remove('blend-dark');
  };

  useEffect(() => {
    isLikeSet(storageLike || false);
  }, [storageLike]);
  useEffect(() => {
    isDarkSet(storageDark || false);
    if (storageDark) {
      document.documentElement.classList.add('blend-dark');
    }
  }, [storageDark]);
  const [visitCount, setVisitCount] = useState(0);
  const [isCount, setIsCount] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const getVisitCount = useCallback(async () => {
    const count = await getCount();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearInterval(timer.current!);
    setIsCount(true);
    setVisitCount(count);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setVisitCount(count + 1);
  }, []);
  useEffectOnce(() => {
    setVisitCount(6789);
    getVisitCount();
    timer.current = setInterval(() => {
      setVisitCount(Math.floor(1000 + Math.random() * 9000));
    }, 500);
  });
  const isMobile = useCheckMobile();
  return (
    <>
      <Suspense fallback={null}>
        <AppProgressBar height="2px" color="#ff9103" options={{ showSpinner: false }} />
      </Suspense>
      {isMobile ?
        <HeaderMobile
          renderTitle={renderTitle}
          secPath={secPath}
          secondPath={secondPath}
          handleLike={handleLike}
          memoizedLike={memoizedLike}
          isLike={isLike}
          handleDark={handleDark}
          isDark={isDark}
          memoizedDarkMode={memoizedDarkMode}
          visitCount={visitCount}
          isCount={isCount}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
        :
        <HeaderPC
          renderTitle={renderTitle}
          secPath={secPath}
          secondPath={secondPath}
          handleLike={handleLike}
          memoizedLike={memoizedLike}
          isLike={isLike}
          handleDark={handleDark}
          isDark={isDark}
          memoizedDarkMode={memoizedDarkMode}
          visitCount={visitCount}
          isCount={isCount}
        />
      }
    </>
  );
};

export default RootBar;
