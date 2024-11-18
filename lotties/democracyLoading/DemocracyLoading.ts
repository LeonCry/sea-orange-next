'use client';
import loadingLottie from './d-loading.json';
import useCreateLottie from '@/hooks/useCreateLottie';
const DemocracyLoading = () => {
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

export default DemocracyLoading;
