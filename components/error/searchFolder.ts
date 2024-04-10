'use client';
import { useLottie } from 'lottie-react';
import searchFolder from './search-folder.json';
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
    const { View } = useLottie(options, style);
    return View;
};

export default SearchFolder;
