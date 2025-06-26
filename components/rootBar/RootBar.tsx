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
import { gsap } from 'gsap';

const RootBar = () => {
  const pathName = usePathname();
  const secondPath = pathName.split('/')[1];
  const secPath = '/' + secondPath;
  const [isLike, isLikeSet] = useState(false);
  const [isDark, isDarkSet] = useState(false);
  const [storageDark, setStorageDark] = useLocalStorage('isDark', false);
  const [storageLike, setStorageLike] = useLocalStorage('isLike', false);
  const titleRef = useRef<HTMLDivElement>(null);

  // GSAP 动画初始化
  useEffect(() => {
    if (titleRef.current) {
      const letters = titleRef.current.querySelectorAll('.letter');

      // 设置初始状态
      gsap.set(letters, {
        skewX: 0,
        rotation: 0,
        y: 0,
        opacity: 1
      });

      gsap.set(titleRef.current, {
        letterSpacing: '0.2em'
      });

      // 创建动画时间线，设置无限重复，间隔1.5秒
      const tl = gsap.timeline({
        repeat: -1, // 无限重复
        repeatDelay: 1.5 // 重复间隔1.5秒
      });

      // 步骤1: 为每个字母添加倾斜动画，延时0.05秒
      letters.forEach((letter, index) => {
        tl.to(letter, {
          skewX: 15,
          rotation: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        }, index * 0.05);
      });

      // 步骤2: 扩大字母间距
      tl.to(titleRef.current, {
        letterSpacing: '0.3em',
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.3');

      // 步骤3: 倾斜角度返回正常
      tl.to(letters, {
        skewX: 0,
        rotation: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      });

      // 步骤4: 每个字母右旋转15度
      tl.to(letters, {
        skewX: 0,
        rotation: 15,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.1
      });

      // 步骤5: 每个字母之间上下间距大一点
      // V(0)向上, O(1)向上但比V低, I(2)保持不变, D(3)向下, I(4)保持不变, S(5)向下, .(6)向下且比I低, M(7)向上, E(8)向下
      const verticalOffsets1 = [-15, -10, -8, -4, 0, 10, 15, -20, 10]; // VOIDIS.ME
      letters.forEach((letter, index) => {
        tl.to(letter, {
          y: verticalOffsets1[index],
          duration: 0.8,
          ease: 'elastic.out(1, 0.8)'
        }, '-=0.8');
      });

      // 步骤6: 字母左旋转15度
      tl.to(letters, {
        skewX: 0,
        rotation: -15,
        duration: 0.6,
        ease: 'power2.inOut',
        stagger: 0.08
      });

      // 步骤7: 每个字母之间的间距对调
      // V(0)向下, O(1)向下但比V高, I(2)保持不变, D(3)向上, I(4)保持不变, S(5)向上, .(6)向上且比E高, M(7)向下, E(8)向上
      const verticalOffsets2 = [17, 15, 0, -10, 0, -10, -18, 17, -15]; // VOIDIS.ME 对调
      letters.forEach((letter, index) => {
        tl.to(letter, {
          y: verticalOffsets2[index],
          duration: 0.8,
          ease: 'elastic.out(1, 0.8)'
        }, '-=0.6');
      });

      // 步骤8: 所有字母旋转一圈
      tl.to(letters, {
        rotation: 360,
        duration: 1.0,
        ease: 'power2.inOut',
        stagger: 0.05
      });

      // 步骤9: 全部返回正常状态
      tl.to(letters, {
        rotation: 0,
        skewX: 0,
        y: 0,
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)',
        stagger: 0.03
      });

      tl.to(titleRef.current, {
        letterSpacing: '0.2em',
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)'
      }, '-=1.5');

      // 添加一个小的延迟，让最终状态保持一会儿再重复
      tl.to({}, { duration: 0.5 });
    }
  }, []);

  // 渲染标题字母
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
  const activeStyle = '!text-[#585b70] bg-[#ffffffea] shadow rounded-xl animate-play';
  return (
    <>
      <div
        ref={titleRef}
        className="text-3xl tracking-widest font-bold absolute top-4 left-10"
      >
        {renderTitle()}
      </div>
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
            {secondPath === 'funny' && (
              <li className={`${style.rootBar} ${secPath === '/funny' && activeStyle}`}>
                <Link className="cursor-none" href={'/funny'}>
                  FUNNY
                </Link>
              </li>
            )}
            <li className={`${style.rootBar} ${secPath === '/gossip' && activeStyle}`}>
              <Link className="cursor-none" href={'/gossip'}>
                GOSSIP
              </Link>
            </li>
            <li className={`${style.rootBar} ${secPath === '/friendLink' && activeStyle}`}>
              <Link className="cursor-none" href={'/friendLink'}>
                FRIEND-LINK
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
