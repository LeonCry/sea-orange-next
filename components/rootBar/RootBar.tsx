'use client';
import Link from 'next/link';
import { chakraEN } from '@/style/defineFont';
import { usePathname } from 'next/navigation';
import { Like, MessageEmoji, Tv, GithubOne, CastScreen, DarkMode } from '@icon-park/react';
import style from './RootBar.module.scss';
import { useEffect, useState } from 'react';
import { alertInfo, tvUrl, gitUrl } from './Info';
import { darkStore } from '@/store/darkStore';
const RootBar = () => {
  const pathName = usePathname();
  const secPath = '/' + pathName.split('/')[1];
  const liActiveStyle = 'border-b-[1px] border-black text-[#181926]';
  const [isLike, isLikeSet] = useState(false);
  const [isDark, isDarkSet] = useState(false);
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
  return (
    <header className="mb-10 sticky top-0 z-[60]">
      <ol
        className={`${style.main} w-full h-16 flex items-center justify-end ${chakraEN.className}`}
      >
        <li className={`${style.rootBar}  ${secPath === '/blog' && liActiveStyle}`}>
          <Link className="cursor-none" href={'/blog'}>
            BLOG
          </Link>
        </li>
        <li className={`${style.rootBar} ${secPath === '/project' && liActiveStyle}`}>
          <Link className="cursor-none" href={'/project'}>
            PROJECT
          </Link>
        </li>
        <li className={`${style.rootBar} ${secPath === '/camera' && liActiveStyle}`}>
          <Link className="cursor-none" href={'/camera'}>
            CAMERA
          </Link>
        </li>
        <li className={`${style.rootBar} ${secPath === '/funny' && liActiveStyle}`}>
          <Link className="cursor-none" href={'/funny'}>
            FUNNY
          </Link>
        </li>
        <li className={`${style.rootBar} ${secPath === '/gossip' && liActiveStyle}`}>
          <Link className="cursor-none" href={'/gossip'}>
            GOSSIP
          </Link>
        </li>
        <li className={`${style.rootBar} ${secPath === '/about' && liActiveStyle}`}>
          <Link className="cursor-none" href={'/about'}>
            ABOUT
          </Link>
        </li>
        <li className="w-16 text-center select-none"> || </li>
        <li onClick={handleLike} className={style.icon}>
          {isLike ? (
            isDark ? (
              <Like
                theme="two-tone"
                size="20"
                fill={['#00ADB1', '#006364']}
                strokeLinejoin="bevel"
              />
            ) : (
              <Like
                theme="two-tone"
                size="20"
                fill={['#f64649', '#ff9999']}
                strokeLinejoin="bevel"
              />
            )
          ) : (
            <Like theme="outline" size="20" fill="#181926" />
          )}
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
          {isDark ? (
            <DarkMode theme="filled" size="20" fill="#333" />
          ) : (
            <DarkMode theme="outline" size="20" fill="#181926" />
          )}
        </li>
      </ol>
    </header>
  );
};

export default RootBar;
