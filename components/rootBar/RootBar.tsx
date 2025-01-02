'use client';
import Link from 'next/link';
import '@/app/enter-fade.scss';
import { AppProgressBar } from 'next-nprogress-bar';
import { chakraEN } from '@/style/defineFont';
import { usePathname } from 'next/navigation';
import {
  Like,
  MessageEmoji,
  Tv,
  GithubOne,
  CastScreen,
  DarkMode,
  UserPositioning,
  SunOne,
} from '@icon-park/react';
import style from './RootBar.module.scss';
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { alertInfo, tvUrl, gitUrl } from './Info';
import { darkStore } from '@/store/darkStore';
import { useEffectOnce, useLocalStorage } from 'react-use';
import { getCount } from '@/api/getSectionInfo';
import NumberFlow from '@number-flow/react';
import clsx from 'clsx';
const RootBar = () => {
  const pathName = usePathname();
  const secPath = '/' + pathName.split('/')[1];
  const [isLike, isLikeSet] = useState(false);
  const [isDark, isDarkSet] = useState(false);
  const [storageDark, setStorageDark] = useLocalStorage('isDark', false);
  const [storageLike, setStorageLike] = useLocalStorage('isLike', false);
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
  const activeStyle = '!text-[#585b70] bg-[#ffffffea] shadow rounded-xl animate-play';
  return (
    <>
      <AppProgressBar height="2px" color="#ff9103" options={{ showSpinner: false }} />
      <header className="mb-10 fixed top-0 right-0 z-[60] w-full">
        <ol
          className={`${style.main} w-full h-16 flex items-center enterFade justify-end ${chakraEN.className}`}
        >
          <div className="h-12 flex items-center enterFade w-fit px-2 mt-4 bg-[#eaeaeb99] rounded-2xl">
            <li className={`${style.rootBar}  ${secPath === '/blog' && activeStyle}`}>
              <Link className="cursor-none" href={'/blog'}>
                BLOG
              </Link>
            </li>
            <li className={`${style.rootBar} ${secPath === '/project' && activeStyle}`}>
              <Link className="cursor-none" href={'/project'}>
                PROJECT
              </Link>
            </li>
            <li className={`${style.rootBar} ${secPath === '/camera' && activeStyle}`}>
              <Link className="cursor-none" href={'/camera'}>
                CAMERA
              </Link>
            </li>
            <li className={`${style.rootBar} ${secPath === '/funny' && activeStyle}`}>
              <Link className="cursor-none" href={'/funny'}>
                FUNNY
              </Link>
            </li>
            <li className={`${style.rootBar} ${secPath === '/gossip' && activeStyle}`}>
              <Link className="cursor-none" href={'/gossip'}>
                GOSSIP
              </Link>
            </li>
            <li className={`${style.rootBar} ${secPath === '/about' && activeStyle}`}>
              <Link className="cursor-none" href={'/about'}>
                ABOUT
              </Link>
            </li>
          </div>
          <li className="w-6 text-center h-3 select-none bg-[#eaeaeb99]" />
          <div className="h-12 flex items-center enterFade w-fit px-2 mt-4 bg-[#eaeaeb99] rounded-2xl">
            <li onClick={handleLike} className={clsx(style.icon, 'relative')}>
              {memoizedLike}
              <span data-addtext>{isLike ? 'like' : 'no-like'}</span>
            </li>
            <li className={style.icon} onClick={() => window.alert(alertInfo)}>
              <MessageEmoji theme="outline" size="20" fill="#181926" />
              <span data-addtext>message</span>
            </li>
            <li className={style.icon}>
              <a className="cursor-none" href={tvUrl} target="_blank">
                <Tv theme="outline" size="20" fill="#181926" />
              </a>
              <span data-addtext>Bilibili</span>
            </li>
            <li className={style.icon}>
              <a className="cursor-none" href={gitUrl} target="_blank">
                <GithubOne theme="outline" size="20" fill="#181926" />
              </a>
              <span data-addtext>Github</span>
            </li>
            <li className={style.icon}>
              <CastScreen theme="outline" size="20" fill="#181926" />
              <span data-addtext>RSS</span>
            </li>
            <li className={`${style.icon} mr-10`} onClick={handleDark}>
              {memoizedDarkMode}
              <span data-addtext>{isDark ? 'moon' : 'sun'}</span>
            </li>
          </div>
          <li className="w-6 text-center h-3 select-none bg-[#eaeaeb99]" />
          <div className="h-12 mr-4 flex items-center enterFade w-fit mt-4 bg-[#eaeaeb99] rounded-2xl transition-all hover:bg-[#5454ff31]">
            <li className="px-2 py-1 mx-1 text-[#585b70a7]">
              <Link
                className="!cursor-none flex items-center justify-center gap-1"
                href={'/whosyourdaddy'}
              >
                <UserPositioning theme="outline" size="20" fill="#585b70d2" />
                <div className="text-gray-400 relative flex gap-1 items-center text-xs min-w-10 text-center">
                  <NumberFlow
                    value={visitCount}
                    transformTiming={{ duration: 1000, easing: 'linear' }}
                    continuous
                    className="m-auto"
                    trend={1}
                  />
                  {isCount && (
                    <span
                      className={`text-gray-300 absolute -right-4 text-xs block opacity-0 ${style.visAdd}`}
                    >
                      +1
                    </span>
                  )}
                </div>
              </Link>
            </li>
          </div>
        </ol>
      </header>
    </>
  );
};

export default RootBar;
