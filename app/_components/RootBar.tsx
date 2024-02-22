'use client';
import Link from 'next/link';
import { chakraEN } from '@/style/defineFont';
import { usePathname } from 'next/navigation';
import { Like, MessageEmoji, Tv, GithubOne, CastScreen, DarkMode } from '@icon-park/react';
import style from './RootBar.module.scss';
import { useState } from 'react';
const RootBar = () => {
  const pathName = usePathname();
  const liHoverStyle = 'border-b-[1px] border-black text-[#181926]';
  const iconStyle = 'p-2 mx-1 cursor-pointer rounded-full transition-all hover:bg-pink-100';
  const [isLike, isLikeSet] = useState(false);
  return (
    <ol className={`w-full h-16 flex items-center justify-end ${chakraEN.className}`}>
      <li className={`${style.rootBar} ${pathName === '/blog' ? liHoverStyle : null}`}>
        <Link href={'/blog'}> BLOG </Link>
      </li>
      <li className={`${style.rootBar} ${pathName === '/gossip' ? liHoverStyle : null}`}>
        <Link href={'/gossip'}> GOSSIP </Link>
      </li>
      <li className={`${style.rootBar} ${pathName === '/project' ? liHoverStyle : null}`}>
        <Link href={'/project'}> PROJECT </Link>
      </li>
      <li className={`${style.rootBar} ${pathName === '/demo' ? liHoverStyle : null}`}>
        <Link href={'/demo'}> DEMO </Link>
      </li>
      <li className={`${style.rootBar} ${pathName === '/about' ? liHoverStyle : null}`}>
        <Link href={'/about'}> ABOUT </Link>
      </li>
      <li className="w-16 text-center select-none"> || </li>
      <li onClick={() => isLikeSet(!isLike)} className={iconStyle}>
        {isLike ? (
          <Like theme="two-tone" size="20" fill={['#f64649', '#ff9999']} strokeLinejoin="bevel" />
        ) : (
          <Like theme="outline" size="20" fill="#333" />
        )}
      </li>
      <li className={iconStyle}>
        <MessageEmoji theme="outline" size="20" fill="#333" />
      </li>
      <li className={iconStyle}>
        <Tv theme="outline" size="20" fill="#333" />
      </li>
      <li className={iconStyle}>
        <GithubOne theme="outline" size="20" fill="#333" />
      </li>
      <li className={iconStyle}>
        <CastScreen theme="outline" size="20" fill="#333" />
      </li>
      <li className={`${iconStyle} mr-10`}>
        <DarkMode theme="outline" size="20" fill="#333" />
      </li>
    </ol>
  );
};

export default RootBar;
