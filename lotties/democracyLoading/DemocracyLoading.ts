'use client';
import loadingLottie from './d-loading.json';
import createLottie from "@/lotties/createLottie";
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
  return createLottie(options, style);
};

export default DemocracyLoading;
