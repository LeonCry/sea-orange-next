import { Tv, GithubOne, UserPositioning, HamburgerButton } from '@icon-park/react';
import { AppProgressBar } from 'next-nprogress-bar';
import NumberFlow from '@number-flow/react';
import { RootBarProps } from './RootBar';
import style from './RootBar.module.scss';
import { chakraEN } from '@/style/defineFont';
import Link from 'next/link';
import clsx from 'clsx';
import { tvUrl, gitUrl } from './Info';
const HeaderMobile = ({
    secPath,
    secondPath,
    handleLike,
    memoizedLike,
    isLike,
    handleDark,
    isDark,
    memoizedDarkMode,
    visitCount,
    isCount,
    showMenu,
    setShowMenu,
}: RootBarProps) => {
    const activeStyle = '!text-[#333] bg-[#ffffffea] shadow animate-play p-2 rounded-[6px]';
    const inactiveStyle = `!text-[#ffffff] underline ${chakraEN.className}`;
    function handleClick() {
        setShowMenu!(false);
    }
    return (
        <>
            <AppProgressBar height="2px" color="#ff9103" options={{ showSpinner: false }} />
            <div className="absolute top-0 left-0 px-2 w-full flex items-center justify-end z-30">
                <div className={clsx('h-12 flex items-center enterFade w-full justify-end px-2 mt-4 rounded-2xl transition-all duration-500',
                    showMenu ? 'bg-[#ffffff80]' : 'bg-[#00000005]'
                )}>
                    <li className={clsx(style.icon, 'relative !w-fit !mr-auto')}>
                        <div
                            className="!cursor-none flex items-center justify-center gap-1"
                        >
                            <UserPositioning theme="outline" size="20" fill="#333" />
                            <div className="text-[#333] relative flex gap-1 items-center text-xs min-w-10 text-center">
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
                        </div>
                    </li>
                    <li onClick={handleLike} className={clsx(style.icon, 'relative')}>
                        {memoizedLike}
                        <span data-addtext>{isLike ? 'like' : 'no-like'}</span>
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
                    <li className={`${style.icon} mr-10`} onClick={handleDark}>
                        {memoizedDarkMode}
                        <span data-addtext>{isDark ? 'moon' : 'sun'}</span>
                    </li>
                    <HamburgerButton onClick={() => setShowMenu?.(!showMenu)} theme="outline" size="20"
                        className={clsx('p-[6px] ml-4 bg-[#333e] rounded-[8px] transition-all duration-300', showMenu ? 'rotate-90' : 'rotate-0')}
                        fill="#fffe" strokeLinecap="square" />
                </div>
            </div>
            <aside className='absolute overflow-hidden top-0 left-0 w-full transition-all duration-500 bg-[#333] rounded-b-2xl z-20'
                style={{
                    height: showMenu ? '300px' : '0px',
                }}
            >
                {showMenu && (
                    <div className="grid grid-cols-2 gap-10 enterFade px-10 mt-24">
                        <li className={inactiveStyle} onClick={handleClick}>
                            <Link className={clsx(secPath === '/blog' && activeStyle)} href={'/blog'}>
                                BLOG
                            </Link>
                        </li>
                        <li className={inactiveStyle} onClick={handleClick}>
                            <Link className={clsx(secPath === '/project' && activeStyle)} href={'/project'}>
                                PROJECT
                            </Link>
                        </li>
                        <li className={inactiveStyle} onClick={handleClick}>
                            <Link className={clsx(secPath === '/camera' && activeStyle)} href={'/camera'}>
                                CAMERA
                            </Link>
                        </li>
                        {secondPath === 'funny' && (
                            <li className={inactiveStyle} onClick={handleClick}>
                                <Link className={clsx(secPath === '/funny' && activeStyle)} href={'/funny'}>
                                    FUNNY
                                </Link>
                            </li>
                        )}
                        <li className={inactiveStyle} onClick={handleClick}>
                            <Link className={clsx(secPath === '/gossip' && activeStyle)} href={'/gossip'}>
                                GOSSIP
                            </Link>
                        </li>
                        <li className={inactiveStyle} onClick={handleClick}>
                            <Link className={clsx(secPath === '/friendLink' && activeStyle)} href={'/friendLink'}>
                                FRIEND-LINK
                            </Link>
                        </li>
                        <li className={inactiveStyle} onClick={handleClick}>
                            <Link className={clsx(secPath === '/about' && activeStyle)} href={'/about'}>
                                ABOUT
                            </Link>
                        </li>
                    </div>
                )}
            </aside>
            <div className='absolute w-full z-10 backdrop-blur-[10px] top-0 left-0 transition-all duration-300'
                style={{
                    height: showMenu ? '100%' : '0%',
                }}
            />
        </>
    );
};
export default HeaderMobile;
