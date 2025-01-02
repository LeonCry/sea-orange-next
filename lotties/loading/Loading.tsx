'use client';
import loadingLottie from './steal-bank.json';
import useCreateLottie from '@/hooks/useCreateLottie';
import moduleStyle from './Loading.module.scss';
import { useSnapshot } from 'valtio';
import { darkStore } from '@/store/darkStore';
const Loading = () => {
  const style = {
    width: 600,
    height: 600,
  };
  const options = {
    animationData: loadingLottie,
    loop: true,
    autoplay: true,
  };
  const view = useCreateLottie(options, style);
  const dark = useSnapshot(darkStore);
  return (
    <div
      className={`w-full h-full flex flex-col justify-center items-center absolute top-0 z-50 backdrop:blur-sm ${moduleStyle.cat}`}
    >
      <span className={`text-base-text-color ${moduleStyle.text} text-2xl block`}>喵</span>
      <span className={`text-base-text-color ${moduleStyle.text} text-2xl block`}>喵</span>
      <span className={`text-base-text-color ${moduleStyle.text} text-2xl block`}>喵</span>
      <span className={`text-base-text-color ${moduleStyle.text} text-2xl block`}>~</span>
      <div className={`${dark.isDark ? moduleStyle.loadingDark : ''}`}>{view}</div>
    </div>
  );
};

export default Loading;
