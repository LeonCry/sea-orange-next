'use client';
import { ArrowLeft } from '@icon-park/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ImageLandscapeViewerProps {
    src: string;
    alt?: string;
    onClose: () => void;
}

const ViewerInner = ({ src, alt = 'photo', onClose }: ImageLandscapeViewerProps) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(t);
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 280);
    };

    return (
        <div
            className="fixed inset-0 z-[300]"
            style={{
                transition: 'opacity 0.28s ease',
                opacity: visible ? 1 : 0,
            }}
        >
            {/* 模糊背景 */}
            <div className="absolute inset-0 overflow-hidden">
                <Image
                    src={src}
                    alt="bg"
                    fill
                    quality={20}
                    sizes="100vw"
                    priority
                    style={{
                        objectFit: 'cover',
                        filter: 'blur(48px)',
                        transform: 'scale(1.15)',
                    }}
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="absolute inset-0" onClick={handleClose} />
            <div
                className="absolute"
                style={{
                    width: '100vh',
                    height: '100vw',
                    top: 'calc(50vh - 50vw)',
                    left: 'calc(50vw - 50vh)',
                    transform: 'rotate(90deg)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative w-full h-full">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        quality={95}
                        sizes="100vh"
                        priority
                        style={{ objectFit: 'contain' }}
                    />
                </div>

                <button
                    className="absolute top-4 left-4 z-10 flex items-center gap-1.5 text-white bg-black/50 rounded-full px-3 py-2 backdrop-blur-sm active:scale-95 transition-transform"
                    onClick={handleClose}
                >
                    <ArrowLeft theme="outline" size="18" fill="#ffffff" strokeWidth={4} />
                </button>
            </div>
        </div>
    );
};

const ImageLandscapeViewer = (props: ImageLandscapeViewerProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    if (!mounted) return null;
    return createPortal(<ViewerInner {...props} />, document.body);
};

export default ImageLandscapeViewer;
