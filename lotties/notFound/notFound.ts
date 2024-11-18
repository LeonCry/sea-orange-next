'use client';
import notFound from './not-found.json';
import useCreateLottie from '@/hooks/useCreateLottie';
const NotFound = () => {
  const style = {
    width: 400,
    height: 400,
  };
  const options = {
    animationData: notFound,
    loop: true,
    autoplay: true,
  };
  return useCreateLottie(options, style);
};

export default NotFound;
