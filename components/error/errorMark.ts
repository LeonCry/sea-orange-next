'use client';
import { useLottie } from 'lottie-react';
import errorMarker from './error-marker.json';
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
    const { View } = useLottie(options, style);
    return View;
};

export default ErrorMark;
