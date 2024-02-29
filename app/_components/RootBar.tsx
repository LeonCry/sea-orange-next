'use client';
import Link from 'next/link';
import { chakraEN } from '@/style/defineFont';
import { usePathname } from 'next/navigation';
import { Like, MessageEmoji, Tv, GithubOne, CastScreen, DarkMode } from '@icon-park/react';
import style from './RootBar.module.scss';
import { useState } from 'react';
const RootBar = () => {
  const pathName = usePathname();
  console.log('pathName:', pathName);
  const liActiveStyle = 'border-b-[1px] border-black text-[#181926]';
  const iconStyle = 'p-2 mx-1 rounded-full transition-all hover:bg-pink-100';
  const [isLike, isLikeSet] = useState(false);
  return (
    <header>
      <ol className={`w-full h-16 flex items-center justify-end sticky top-0 ${chakraEN.className}`}>
        <li className={`${style.rootBar} ${pathName === '/blog' ? liActiveStyle : null}`}>
          <Link className="cursor-none" href={'/blog'}>
            BLOG
          </Link>
        </li>
        <li className={`${style.rootBar} ${pathName === '/camera' ? liActiveStyle : null}`}>
          <Link className="cursor-none" href={'/camera'}>
            CAMERA
          </Link>
        </li>
        <li className={`${style.rootBar} ${pathName === '/gossip' ? liActiveStyle : null}`}>
          <Link className="cursor-none" href={'/gossip'}>
            GOSSIP
          </Link>
        </li>
        <li className={`${style.rootBar} ${pathName === '/project' ? liActiveStyle : null}`}>
          <Link className="cursor-none" href={'/project'}>
            PROJECT
          </Link>
        </li>
        <li className={`${style.rootBar} ${pathName === '/funny' ? liActiveStyle : null}`}>
          <Link className="cursor-none" href={'/funny'}>
            FUNNY
          </Link>
        </li>
        <li className={`${style.rootBar} ${pathName === '/about' ? liActiveStyle : null}`}>
          <Link className="cursor-none" href={'/about'}>
            ABOUT
          </Link>
        </li>
        <li className="w-16 text-center select-none"> || </li>
        <li onClick={() => isLikeSet(!isLike)} className={iconStyle}>
          {isLike ? (
            <Like theme="two-tone" size="20" fill={['#f64649', '#ff9999']} strokeLinejoin="bevel" />
          ) : (
            <Like theme="outline" size="20" fill="#181926" />
          )}
        </li>
        <li className={iconStyle}>
          <MessageEmoji theme="outline" size="20" fill="#181926" />
        </li>
        <li className={iconStyle}>
          <a className="cursor-none" href="https://www.baidu.com" target="_blank">
            <Tv theme="outline" size="20" fill="#181926" />
          </a>
        </li>
        <li className={iconStyle}>
          <a className="cursor-none" href="https://www.baidu.com" target="_blank">
            <GithubOne theme="outline" size="20" fill="#181926" />
          </a>
        </li>
        <li className={iconStyle}>
          <CastScreen theme="outline" size="20" fill="#181926" />
        </li>
        <li className={`${iconStyle} mr-10`}>
          <DarkMode theme="outline" size="20" fill="#181926" />
        </li>
      </ol>
    </header>
  );
};

export default RootBar;
