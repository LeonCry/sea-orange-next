'use client';
import errorMarker from './error-marker.json';
import createLottie from "@/lotties/createLottie";
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
    return createLottie(options, style);
};

export default ErrorMark;
