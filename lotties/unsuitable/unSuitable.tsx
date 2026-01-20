'use client';
import unSuitableJson from './un-suitable.json';
import useCreateLottie from '@/hooks/useCreateLottie';
import moduleStyle from '../loading/Loading.module.scss';
import { useLocalStorage } from 'react-use';
import clsx from 'clsx';
const UnSuitable = () => {
    const style = {
        width: 400,
        height: 400,
    };
    const options = {
        animationData: unSuitableJson,
        loop: true,
        autoplay: true,
    };
    const view = useCreateLottie(options, style);
    const [isDark] = useLocalStorage('isDark', false);
    return (
        <div className={clsx([isDark && moduleStyle.loadingDark, 'relative'])
        }> {view} </div>
    );
};

export default UnSuitable;
