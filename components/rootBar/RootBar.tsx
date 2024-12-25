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
} from '@icon-park/react';
import style from './RootBar.module.scss';
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { alertInfo, tvUrl, gitUrl } from './Info';
import { darkStore } from '@/store/darkStore';
import { useEffectOnce } from 'react-use';
import { getCount } from '@/api/getSectionInfo';
import NumberFlow from '@number-flow/react';
const RootBar = () => {
  const pathName = usePathname();
  const secPath = '/' + pathName.split('/')[1];
  const [isLike, isLikeSet] = useState(false);
  const [isDark, isDarkSet] = useState(false);

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
        <DarkMode theme="outline" size="20" fill="#181926" />
      ),
    [isDark]
  );

  const handleLike = () => {
    isLikeSet(!isLike);
    localStorage.setItem('isLike', String(!isLike));
  };

  const handleDark = () => {
    isDarkSet(!isDark);
    darkStore.isDark = !isDark;
    sessionStorage.setItem('isDark', String(!isDark));
    if (!isDark) return document.documentElement.classList.add('blend-dark');
    return document.documentElement.classList.remove('blend-dark');
  };

  useEffect(() => {
    if (localStorage.getItem('isLike') === 'true') {
      isLikeSet(true);
    }
    if (sessionStorage.getItem('isDark') === 'true') {
      isDarkSet(true);
      document.documentElement.classList.add('blend-dark');
    }
  }, []);
  const [visitCount, setVisitCount] = useState(0);
  const [isCount, setIsCount] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const getVisitCount = useCallback(async () => {
    const count = await getCount();
    clearInterval(timer.current!);
    setIsCount(true);
    setVisitCount(count);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setVisitCount(count + 1);
  }, []);
  useEffectOnce(() => {
    getVisitCount();
    timer.current = setInterval(() => {
      setVisitCount(Math.floor(100 + Math.random() * 900));
    }, 1000);
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
            <li onClick={handleLike} className={style.icon}>
              {memoizedLike}
            </li>
            <li className={style.icon} onClick={() => window.alert(alertInfo)}>
              <MessageEmoji theme="outline" size="20" fill="#181926" />
            </li>
            <li className={style.icon}>
              <a className="cursor-none" href={tvUrl} target="_blank">
                <Tv theme="outline" size="20" fill="#181926" />
              </a>
            </li>
            <li className={style.icon}>
              <a className="cursor-none" href={gitUrl} target="_blank">
                <GithubOne theme="outline" size="20" fill="#181926" />
              </a>
            </li>
            <li className={style.icon}>
              <CastScreen theme="outline" size="20" fill="#181926" />
            </li>
            <li className={`${style.icon} mr-10`} onClick={handleDark}>
              {memoizedDarkMode}
            </li>
          </div>
          <li className="w-6 text-center h-3 select-none bg-[#eaeaeb99]" />
          <div className="h-12 mr-4 flex items-center enterFade w-fit mt-4 bg-[#eaeaeb99] rounded-2xl transition-all hover:bg-[#8686ff31]">
            <li className="px-2 py-1 mx-1 text-[#585b70a7]">
              <Link className="cursor-none flex items-center gap-1" href={'/user'}>
                <UserPositioning theme="outline" size="20" fill="#585b70d2" />
                <div className=" text-gray-400 relative flex gap-1 items-center text-xs w-fit text-center">
                  <NumberFlow
                    prefix="0"
                    value={visitCount}
                    transformTiming={{ duration: 1000, easing: 'linear' }}
                    continuous
                    trend={1}
                  />
                  {isCount && (
                    <span
                      className={`text-gray-300 absolute -right-4 text-xs block opacity-0 ${style.visAdd}`}
                    >
                      {' '}
                      +1{' '}
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
