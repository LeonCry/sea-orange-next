'use client';
import { useLottie } from 'lottie-react';
import notFound from './not-found.json';
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
    const { View } = useLottie(options, style);
    return View;
};

export default NotFound;
