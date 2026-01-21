'use client';
import style from '../../funny/_component/Modal.module.scss';
import gridStyle from './Grid.module.scss';
import { Acoustic, AppletClosed, Camera, Record } from '@icon-park/react';
import { CameraPageItem } from '@prisma/client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { useEffectOnce } from 'react-use';
import { getPhotoById } from '@/api/cameraPageApi';
import { updateTargetInHover } from 'cursorwith-ts/use';
const CameraInfoMobile = ({
    local,
    handleSetId,
    photoId,
}: {
    local: CameraPageItem;
    handleSetId: (id: string) => void;
    photoId: string;
}) => {
    const backdropRef = useRef<HTMLDivElement | null>(null);
    const handleClose = async () => {
        if (!backdropRef.current) return;
        backdropRef.current.classList.remove(style.backdropBlurIn);
        backdropRef.current.classList.add(style.backdropBlurOut);
        await new Promise((resolve) => setTimeout(resolve, 1300));
        handleSetId('');
    };
    const [isEnlarge, setIsEnlarge] = useState(false);
    const [photoInfo, setPhotoInfo] = useState<CameraPageItem | undefined>(local);
    useEffectOnce(() => {
        const handleGetPhotoById = async () => {
            const res = await getPhotoById(Number(photoId));
            setPhotoInfo(res);
        };
        if (!local) handleGetPhotoById();
    });
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);
    return (
        <section
            ref={backdropRef}
            className={clsx([
                'w-full text-[#233] backdrop-blur-[84px] bg-[rgba(255,255,255,0.1)] z-[60] h-full fixed bottom-0 pt-12',
                style.backdropBlurIn,
            ])}
        >
            <div className="absolute p-3 z-50 right-0 top-0">
                <AppletClosed
                    theme="outline"
                    size="20"
                    fill="#000000"
                    strokeWidth={4}
                    onClick={handleClose}
                />
            </div>
            <div className='absolute w-full top-0 left-0 blur-[36px] scale-y-125' style={{ height: 'calc(30vh + 48px)' }}>
                {photoInfo && (
                    <Image
                        onLoad={() => setIsLoadingComplete(true)}
                        src={photoInfo.photoSrc}
                        alt="pic"
                        fill
                        quality={80}
                        sizes="100px 100px"
                        priority
                        style={{ objectFit: 'contain' }}
                    />
                )}
            </div>
            <div className='flex flex-col overflow-hidden gap-3 h-full'>
                <div className='border-y border-[#333] border-dashed p-3'>
                    <div className='w-full relative h-[30vh] overflow-hidden'>
                        {!isLoadingComplete && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <figure className={gridStyle.loading} />
                            </div>
                        )}
                        {photoInfo && (
                            <Image
                                onLoad={() => setIsLoadingComplete(true)}
                                src={photoInfo.photoSrc}
                                alt="pic"
                                fill
                                sizes="100px 100px"
                                className='!border-2 !border-[#ffffff5e] !rounded-md'
                                priority
                                style={{ objectFit: 'cover' }}
                            />
                        )}
                    </div>
                </div>
                <p className="flex justify-center w-full items-center gap-3 text-2xl">
                    <Acoustic theme="outline" size="24" fill="#000000" />
                    {photoInfo?.name}
                </p>
                <div className="flex items-center px-4 gap-8 justify-evenly">
                    <p className='flex items-center gap-2 underline underline-offset-4'>
                        <Record theme="outline" size="20" fill="#000000" />
                        {photoInfo?.category}
                    </p>
                    <p className='flex items-center gap-2 underline underline-offset-4'>
                        <Camera theme="outline" size="20" fill="#000000" />
                        {photoInfo?.device}
                    </p>
                </div>
                <article className='flex-1 p-4 text-base bg-[#ffffff50] rounded-t-3xl overflow-y-auto whitespace-pre-wrap leading-8 tracking-wide'>
                    {photoInfo?.description}
                </article>
            </div>
        </section>
    );
};

export default CameraInfoMobile;
