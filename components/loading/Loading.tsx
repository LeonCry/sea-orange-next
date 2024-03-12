'use client';
import Lottie, { useLottie } from 'lottie-react';
import loadingLottie from './LoadingSearch.json';
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
  const { View } = useLottie(options, style);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center absolute top-0 z-50 backdrop:blur-sm">
      {View}
      <span>Loading...</span>
    </div>
  );
};

export default Loading;
