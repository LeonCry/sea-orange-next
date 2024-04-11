'use client';
import searchFolder from './search-folder.json';
import createLottie from "@/lotties/createLottie";
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
    return createLottie(options, style);
};

export default SearchFolder;
