'use client';
import searchFolder from './search-folder.json';
import useCreateLottie from "@/hooks/useCreateLottie";
const SearchFolder = () => {
  const style = {
    width: 400,
    height: 400,
  };
  const options = {
    animationData: searchFolder,
    loop: true,
    autoplay: true,
  };
  return useCreateLottie(options, style);
};

export default SearchFolder;
