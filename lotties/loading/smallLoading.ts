'use client';
import loadingLottie from './LoadingSearch.json';
import useCreateLottie from '@/hooks/useCreateLottie';
const SmallLoading = () => {
  const style = {
    width: 100,
    height: 100,
  };
  const options = {
    animationData: loadingLottie,
    loop: true,
    autoplay: true,
  };
  return useCreateLottie(options, style);
};

export default SmallLoading;
