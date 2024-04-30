'use client';
import loadingLottie from './steal-bank.json';
import useCreateLottie from '@/hooks/useCreateLottie';
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
  return (
    <div className="w-full h-full flex flex-col justify-center items-center absolute top-0 z-50 backdrop:blur-sm">
      {view}
      <span>Loading...</span>
    </div>
  );
};

export default Loading;
