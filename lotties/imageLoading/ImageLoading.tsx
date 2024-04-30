'use client';
import lottieJson from './image-load.json';
import useCreateLottie from '@/hooks/useCreateLottie';
const ImageLoading = () => {
  const style = {
    width: 200,
    height: 200,
  };
  const options = {
    animationData: lottieJson,
    loop: true,
    autoplay: true,
  };
  return useCreateLottie(options, style);
};
export default ImageLoading;
