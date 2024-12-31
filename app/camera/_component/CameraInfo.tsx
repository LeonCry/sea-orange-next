'use client';
import style from '../../funny/_component/Modal.module.scss';
import { Acoustic, AppletClosed, Camera, DownloadFour, GamePs, Record } from '@icon-park/react';
import { CameraPageItem } from '@prisma/client';
import { Button } from 'antd';
import Image from 'next/image';
import { useRef } from 'react';
import { darkStore } from '@/store/darkStore';
import { useSnapshot } from 'valtio';
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    handleSetId('');
  };
  return (
    <section
      ref={backdropRef}
      className={`w-full ${style.backdropBlurIn} z-[60] h-full fixed bottom-0 ${
        dark.isDark && 'invert bg-[rgba(0,0,0,0.8)]'
      }`}
    >
      <div
        ref={boxRef}
        className={`relative w-[95%] h-[90%] mt-[4%] ml-[2.5%] rounded-3xl p-4 border shadow-2xl shadow-indigo-100 ${style.puffIn}`}
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
        <div className="flex items-center justify-around w-full h-full">
          <div className={'w-[1200px] h-[800px] relative rounded-xl cursor-none'}>
            <Image
              src={local.photoSrc}
              fill
              alt="pic"
              sizes="100"
              priority
              className="rounded-lg"
            />
          </div>
          <article className="flex-1 flex flex-col h-full justify-center items-start px-10 border-l ml-10 gap-10">
            <span className="flex items-center gap-3">
              <Acoustic theme="outline" size="20" fill={dark.isDark ? '#ffffff' : '#000000'} />
              {local.name}
            </span>
            <span className="flex items-center gap-3">
              <Record theme="outline" size="20" fill={dark.isDark ? '#ffffff' : '#000000'} />
              {local.category}
            </span>
            <span className="flex items-center gap-3">
              <Camera theme="outline" size="20" fill={dark.isDark ? '#ffffff' : '#000000'} />
              {local.device}
            </span>
            <span className="flex items-center gap-3">
              <GamePs theme="outline" size="20" fill={dark.isDark ? '#ffffff' : '#000000'} />
              {local.description}
            </span>
            <a
              href={`${local.photoSrc}?response-content-type=application/octet-stream`}
              download
              className="self-center"
              target="_blank"
            >
              <Button
                className="cursor-none border-none bg-blue-300 hover:!bg-blue-500 px-10"
                type="text"
              >
                <DownloadFour theme="outline" size="24" fill="#333" />
              </Button>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
};

export default CameraInfo;