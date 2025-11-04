'use client';
import { useEffect, useRef } from 'react';
import { setHoverContainer } from '@/components/cursor/create';
export default function CursorScope({ children, className }: { children: React.ReactNode; className?: string }) {
    const scopeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
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
    }, []);

    return (
        <article ref={scopeRef} className={className}>
            {children}
        </article>
    );
}