import { useState } from 'react';
import { useEffectOnce } from 'react-use';

export const useCheckMobile = () => {
    const [isMobile, setIsMobile] = useState(true);
    useEffectOnce(() => {
        setIsMobile(window.innerWidth < 992 && window.innerWidth < window.innerHeight);
    });
    return isMobile;
};