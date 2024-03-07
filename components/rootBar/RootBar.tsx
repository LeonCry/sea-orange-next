'use client';
import Link from 'next/link';
import { chakraEN } from '@/style/defineFont';
import { usePathname } from 'next/navigation';
import { Like, MessageEmoji, Tv, GithubOne, CastScreen, DarkMode } from '@icon-park/react';
import style from './RootBar.module.scss';
import { useState } from 'react';
const RootBar = () => {
  const pathName = usePathname();
  const liActiveStyle = 'border-b-[1px] border-black text-[#181926]';
  const [isLike, isLikeSet] = useState(false);
  return (
    <header className="mb-10 sticky top-0">
      <ol className={`${style.main} w-full h-16 flex items-center justify-end ${chakraEN.className}`}>
        <li className={`${style.rootBar}  ${pathName === '/blog' && liActiveStyle}`}>
          <Link className="cursor-none" href={'/blog'}>
            BLOG
          </Link>
        </li>
        <li className={`${style.rootBar} ${pathName === '/project' && liActiveStyle}`}>
          <Link className="cursor-none" href={'/project'}>
            PROJECT
          </Link>
        </li>
        <li className={`${style.rootBar} ${pathName === '/camera' && liActiveStyle}`}>
          <Link className="cursor-none" href={'/camera'}>
            CAMERA
          </Link>
        </li>
        <li className={`${style.rootBar} ${pathName === '/funny' && liActiveStyle}`}>
          <Link className="cursor-none" href={'/funny'}>
            FUNNY
          </Link>
        </li>
        <li className={`${style.rootBar} ${pathName === '/gossip' && liActiveStyle}`}>
          <Link className="cursor-none" href={'/gossip'}>
            GOSSIP
          </Link>
        </li>
        <li className={`${style.rootBar} ${pathName === '/about' && liActiveStyle}`}>
          <Link className="cursor-none" href={'/about'}>
            ABOUT
          </Link>
        </li>
        <li className="w-16 text-center select-none"> || </li>
        <li onClick={() => isLikeSet(!isLike)} className={style.icon}>
          {isLike ? (
            <Like theme="two-tone" size="20" fill={['#f64649', '#ff9999']} strokeLinejoin="bevel" />
          ) : (
            <Like theme="outline" size="20" fill="#181926" />
          )}
        </li>
        <li className={style.icon}>
          <MessageEmoji theme="outline" size="20" fill="#181926" />
        </li>
        <li className={style.icon}>
          <a className="cursor-none" href="https://www.baidu.com" target="_blank">
            <Tv theme="outline" size="20" fill="#181926" />
          </a>
        </li>
        <li className={style.icon}>
          <a className="cursor-none" href="https://www.baidu.com" target="_blank">
            <GithubOne theme="outline" size="20" fill="#181926" />
          </a>
        </li>
        <li className={style.icon}>
          <CastScreen theme="outline" size="20" fill="#181926" />
        </li>
        <li className={`${style.icon} mr-10`}>
          <DarkMode theme="outline" size="20" fill="#181926" />
        </li>
      </ol>
    </header>
  );
};

export default RootBar;
