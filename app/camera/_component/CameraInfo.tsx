'use client';
import '../../globals.css';
import style from '../../funny/_component/Modal.module.scss';
import { Acoustic, AppletClosed, Camera, GamePs, Record } from '@icon-park/react';
import { CameraPageItem } from '@prisma/client';
import { Button } from 'antd';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { darkStore } from '@/store/darkStore';
import { useSnapshot } from 'valtio';
import clsx from 'clsx';
const CameraInfo = ({
  local,
  handleSetId,
}: {
  local: CameraPageItem;
  handleSetId: (id: string) => void;
}) => {
  const dark = useSnapshot(darkStore);
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
  const [downloadText, setDownloadText] = useState('CLICK TO DOWNLOAD THIS PHOTO');
  const handleDownload = (imgsrc: string) => {
    setDownloadText('DOWNLOADING...');
    imgsrc = imgsrc + '?v=' + Math.random();
    const image = document.createElement('img');
    image.setAttribute('crossOrigin', 'anonymous');
    image.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      context!.drawImage(image, 0, 0, image.width, image.height);
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      const event = new MouseEvent('click');
      a.download = `${local.name}.jpg`;
      a.href = url;
      a.dispatchEvent(event);
      setDownloadText('DOWNLOADED');
    };
    image.src = imgsrc;
  };
  const [isEnlarge, setIsEnlarge] = useState(false);
  const handleResize = () => {
    setIsEnlarge(!isEnlarge);
  };
  return (
    <section
      ref={backdropRef}
      className={`w-full text-[#233] ${
        style.backdropBlurIn
      } backdrop-blur-[84px] bg-[rgba(255,255,255,0.1)] z-[60] h-full fixed bottom-0 ${
        dark.isDark && 'blend-dark'
      }`}
    >
      <div
        ref={boxRef}
        className={`relative w-[95%] h-[90%] mt-[4%] ml-[2.5%] rounded-3xl p-4 shadow-2xl opacity-1 ${style.puffIn}`}
      >
        <div className="absolute right-2 top-2 p-4 transition duration-300 hover:rotate-180">
          <AppletClosed
            theme="outline"
            size="20"
            fill={dark.isDark ? '#ffffff' : '#000000'}
            strokeWidth={2}
            onClick={handleClose}
          />
        </div>
        <div className="flex items-center justify-around shadow-2xl rounded-2xl w-full h-full">
          <div
            className={
              'relative select-none shrink-0 aspect-[3/2] h-[85%] flex-1 rounded-xl ml-5 cursor-none'
            }
          >
            <Image
              src={local.photoSrc}
              fill
              alt="pic"
              sizes="100"
              priority
              className="rounded-lg h-full m-auto aspect-[3/2] !w-auto"
            />
          </div>
          <article
            className={clsx([
              ' !w-[25%] flex flex-col relative h-full items-start px-5 shadow-2xl rounded-e-2xl ml-10 gap-10',
              style.borderLinear,
            ])}
          >
            <div className=" h-2 w-full" />
            <span className="flex items-center gap-3">
              <Acoustic theme="outline" size="20" fill={dark.isDark ? '#ffffff' : '#000000'} />
              {local.name}
            </span>
            {!isEnlarge && (
              <>
                <span
                  className={clsx([
                    'flex items-center gap-3',
                    isEnlarge ? 'h-0 w-0' : 'w-auto h-auto',
                  ])}
                >
                  <Record theme="outline" size="20" fill={dark.isDark ? '#ffffff' : '#000000'} />
                  {local.category}
                </span>
                <span
                  className={clsx([
                    'flex items-center gap-3',
                    isEnlarge ? 'h-0 w-0' : 'w-auto h-auto',
                  ])}
                >
                  <Camera theme="outline" size="20" fill={dark.isDark ? '#ffffff' : '#000000'} />
                  {local.device}
                </span>
              </>
            )}
            <div
              className={clsx([
                'flex relative items-start gap-3 w-full transition-all duration-300 ease-in-out',
                isEnlarge ? 'min-h-[80%] max-h-[80%]' : 'min-h-[30%] max-h-[60%]',
              ])}
            >
              {!isEnlarge && (
                <GamePs theme="outline" size="20" fill={dark.isDark ? '#ffffff' : '#000000'} />
              )}
              <p
                onDoubleClick={handleResize}
                className="overflow-auto  leading-7 tracking-wide hover:bg-[#ffffff11] transition-all duration-300 ease-in-out h-full w-full -mt-2 py-1 px-2 text-base rounded bg-[#c1c1c111]"
              >
                {local.description}
              </p>
            </div>
            <div className="absolute bottom-10 left-0 px-10 w-full hover:animate-bounce">
              <Button
                onClick={() => handleDownload(local.photoSrc)}
                className="cursor-none w-full flex items-center gap-1 self-center px-10 overflow-hidden bg-[#ffffff11] hover:!bg-[rgba(0,0,0,0.05)]"
                type="text"
              >
                <span
                  className={clsx([
                    'transition-all duration-300 ease-in-out',
                    downloadText === 'DOWNLOADING...' && 'text-orange-600 animate-pulse',
                    downloadText === 'DOWNLOADED' && 'text-green-600',
                  ])}
                >
                  {downloadText}
                </span>
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default CameraInfo;
