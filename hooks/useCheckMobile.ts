import { useState, useEffect } from 'react';



export const useCheckMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    const handlerResize = () => {
        setIsMobile(window.innerWidth < 992 && window.innerWidth < window.innerHeight);
    };
    useEffect(() => {
        handlerResize();
        window.addEventListener('resize', handlerResize);
        return () => {
            window.removeEventListener('resize', handlerResize);
        };
    }, []);
    return isMobile;
};