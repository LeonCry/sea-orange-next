'use client';
import like from './like.json';
import createLottie from "@/lotties/createLottie";
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
    return createLottie(options, style);
};
export default SearchFolder;
