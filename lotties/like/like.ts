'use client';
import like from './like.json';
import useCreateLottie from "@/hooks/useCreateLottie";
const SearchFolder = () => {
  const style = {
    width: 50,
    height: 50,
  };
  const options = {
    animationData: like,
    loop: false,
    autoplay: true,
  };
  return useCreateLottie(options, style);
};
export default SearchFolder;
