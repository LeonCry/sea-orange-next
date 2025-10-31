'use client';
import { useEffect, useRef } from 'react';
import { setHoverContainer } from '@/components/cursor/create';

export default function CursorScope({ children, className }: { children: React.ReactNode; className?: string }) {
    const scopeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = scopeRef.current;
        if (!el) return;
        setHoverContainer(el);
    }, []);

    return (
        <article ref={scopeRef} className={className}>
            {children}
        </article>
    );
}