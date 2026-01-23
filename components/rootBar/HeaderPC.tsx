import {
    CastScreen,
    MessageEmoji,
    Tv,
    GithubOne,
    UserPositioning,
} from '@icon-park/react';
import NumberFlow from '@number-flow/react';
import { RootBarProps } from './RootBar';
import style from './RootBar.module.scss';
import { chakraEN } from '@/style/defineFont';
import Link from 'next/link';
import clsx from 'clsx';
import { alertInfo, tvUrl, gitUrl } from './Info';
const HeaderPC = ({
    renderTitle,
    secPath, secondPath,
    handleLike,
    memoizedLike,
    isLike,
    handleDark,
    isDark,
    memoizedDarkMode,
    visitCount,
    isCount
}: RootBarProps) => {
    const activeStyle = '!text-[#585b70] bg-[#ffffffea] shadow animate-play';
    return (
        <>
            <div
                className="text-3xl tracking-widest font-bold absolute top-4 left-10"
            >
                {renderTitle()}
            </div>
            <header className="mb-10 fixed top-0 right-0 z-[60] w-full">
                <ol
                    className={`${style.main} w-full h-16 flex items-center enterFade justify-end ${chakraEN.className}`}
                >
                    <div data-hover className="h-12 flex items-center enterFade w-fit px-2 mt-4 bg-[#eaeaeb99] rounded-2xl">
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
                            <a className="cursor-none" href="/feed.xml" target="_blank">
                                <CastScreen theme="outline" size="20" fill="#181926" />
                            </a>
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
export default HeaderPC;