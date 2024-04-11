'use client';
import notFound from './not-found.json';
import createLottie from "@/lotties/createLottie";
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
    return createLottie(options, style);
};

export default NotFound;
