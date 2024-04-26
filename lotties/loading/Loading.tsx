'use client';
import loadingLottie from './LoadingSearch.json';
import useCreateLottie from '@/hooks/useCreateLottie';
const Loading = () => {
  const style = {
    width: 400,
    height: 400,
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
