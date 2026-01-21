'use client';
import { useEffect, useRef } from 'react';
import { setHoverContainer } from '@/components/cursor/create';
import { useCheckMobile } from '@/hooks/useCheckMobile';
export default function CursorScope({ children, className }: { children: React.ReactNode; className?: string }) {
    const scopeRef = useRef<HTMLDivElement | null>(null);
    const isMobile = useCheckMobile();
    useEffect(() => {
        if (isMobile) return;
        const el = scopeRef.current;
        if (!el) return;
        function handlerEl() {
            setHoverContainer(el!);
        }
        function handlerUf() {
            setHoverContainer(undefined);
        }
        function handlerMove() {
            setHoverContainer(el!);
            el!.removeEventListener('mousemove', handlerMove);
        }
        el.addEventListener('mouseenter', handlerEl);
        el.addEventListener('mouseleave', handlerUf);
        el.addEventListener('mousemove', handlerMove);
        return () => {
            el.removeEventListener('mouseenter', handlerEl);
            el.removeEventListener('mouseleave', handlerUf);
        };
    }, [isMobile]);

    return (
        <article ref={scopeRef} className={className}>
            {children}
        </article>
    );
}