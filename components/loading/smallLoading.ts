'use client';
import { useLottie } from 'lottie-react';
import loadingLottie from './LoadingSearch.json';
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
  const { View } = useLottie(options, style);
  return View;
};

export default SmallLoading;
