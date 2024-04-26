'use client';
import errorMarker from './error-marker.json';
import useCreateLottie from "@/hooks/useCreateLottie";
const ErrorMark = () => {
  const style = {
    width: 100,
    height: 100,
  };
  const options = {
    animationData: errorMarker,
    loop: false,
    autoplay: true,
  };
  return useCreateLottie(options, style);
};

export default ErrorMark;
