'use client';
import style from '../../funny/_component/Modal.module.scss';
import { Acoustic, AppletClosed, Camera, GamePs, Record } from '@icon-park/react';
import { CameraPageItem } from '@prisma/client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { useEffectOnce } from 'react-use';
import { getPhotoById } from '@/api/cameraPageApi';
const CameraInfo = ({
  local,
  handleSetId,
  photoId,
}: {
  local: CameraPageItem;
  handleSetId: (id: string) => void;
  photoId: string;
}) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const handleClose = async () => {
    if (!boxRef.current || !backdropRef.current) return;
    boxRef.current.classList.remove(style.puffIn);
    boxRef.current.classList.add(style.puffOut);
    backdropRef.current.classList.remove(style.backdropBlurIn);
    backdropRef.current.classList.add(style.backdropBlurOut);
    await new Promise((resolve) => setTimeout(resolve, 1300));
    handleSetId('');
  };
  const [isEnlarge, setIsEnlarge] = useState(false);
  const handleResize = () => {
    setIsEnlarge(!isEnlarge);
  };
  const [photoInfo, setPhotoInfo] = useState<CameraPageItem | undefined>(local);
  useEffectOnce(() => {
    const handleGetPhotoById = async () => {
      const res = await getPhotoById(Number(photoId));
      setPhotoInfo(res);
    };
    if (!local) handleGetPhotoById();
  });
  return (
    <section
      ref={backdropRef}
      className={clsx([
        'w-full text-[#233] backdrop-blur-[84px] bg-[rgba(255,255,255,0.1)] z-[60] h-full fixed bottom-0',
        style.backdropBlurIn,
      ])}
    >
      <div
        ref={boxRef}
        className={`relative w-[95%] h-[90%] mt-[4%] ml-[2.5%] rounded-3xl p-4 shadow-2xl opacity-1 ${style.puffIn}`}
      >
        <div className="absolute p-2 m-3 z-10 right-2 top-2 transition duration-300 hover:rotate-[90deg]">
          <AppletClosed
            theme="outline"
            size="20"
            fill="#000000"
            strokeWidth={4}
            onClick={handleClose}
          />
        </div>
        <div className="flex items-center justify-around shadow-2xl rounded-2xl w-full h-full">
          <div
            className={
              'relative select-none shrink-0 h-[85%] flex-1 rounded-xl ml-5 cursor-none'
            }
          >
            {photoInfo && (
              <Image
                src={photoInfo.photoSrc}
                fill
                alt="pic"
                sizes="100"
                priority
                className="rounded-lg h-full m-auto !w-auto"
              />
            )}
          </div>
          <article
            className={clsx([
              ' !w-[25%] flex flex-col relative h-full items-start px-5 shadow-2xl rounded-e-2xl ml-10 gap-10',
              style.borderLinear,
            ])}
          >
            <div className=" h-2 w-full" />
            <span className="flex items-center gap-3">
              <Acoustic theme="outline" size="20" fill="#000000" />
              {photoInfo?.name}
            </span>
            {!isEnlarge && (
              <>
                <span
                  className={clsx([
                    'flex items-center gap-3',
                    isEnlarge ? 'h-0 w-0' : 'w-auto h-auto',
                  ])}
                >
                  <Record theme="outline" size="20" fill="#000000" />
                  {photoInfo?.category}
                </span>
                <span
                  className={clsx([
                    'flex items-center gap-3',
                    isEnlarge ? 'h-0 w-0' : 'w-auto h-auto',
                  ])}
                >
                  <Camera theme="outline" size="20" fill="#000000" />
                  {photoInfo?.device}
                </span>
              </>
            )}
            <div
              className={clsx([
                'flex relative items-start gap-3 w-full transition-all duration-300 ease-in-out',
                isEnlarge ? 'min-h-[80%] max-h-[80%]' : 'min-h-[30%] max-h-[60%]',
              ])}
            >
              {!isEnlarge && <GamePs theme="outline" size="20" fill="#000000" />}
              <p
                onDoubleClick={handleResize}
                className=
                {clsx(style['smooth-shadow-stroke'], 'overflow-y-auto whitespace-pre-wrap leading-7 tracking-wide hover:bg-[#ffffff11] transition-all duration-300 ease-in-out h-full w-full -mt-2 py-1 px-2 text-base rounded bg-[#c1c1c111]')}

              >
                {photoInfo?.description}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default CameraInfo;
