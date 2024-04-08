'use client';
import style from '../../funny/_component/Modal.module.scss';
import { Acoustic, AppletClosed, Camera, GamePs, Record } from '@icon-park/react';
import { CameraPageItem } from '@prisma/client';
import { Button } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { darkStore } from '@/store/darkStore';
import { useSnapshot } from 'valtio';
const CameraInfo = ({ local }: { local: CameraPageItem }) => {
  const dark = useSnapshot(darkStore);
  const router = useRouter();
  const boxRef = useRef<HTMLDivElement | null>(null);
  const handleClose = async () => {
    if (!boxRef.current) return;
    boxRef.current.style.animationPlayState = 'running';
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push('/camera');
  };
  return (
    <section className="w-full backdrop-blur-[84px] z-[60] h-full top-0 fixed">
      <div
        ref={boxRef}
        className={`relative w-[95%] h-[95%] ml-[2.5%] mt-6 rounded-3xl p-4 border shadow-2xl shadow-indigo-100 ${style.puffOut}`}
      >
        <div className="absolute right-2 top-2 p-4 transition duration-300 hover:rotate-180">
          <AppletClosed
            theme="outline"
            size="20"
            fill="#000000"
            strokeWidth={2}
            onClick={handleClose}
          />
        </div>
        <div className="flex items-center justify-around w-full h-full">
          <div className="w-[999px] h-[666px] relative">
            <Image
              src={local.photoSrc}
              fill
              alt="pic"
              priority
              className={`rounded-lg shadow-xl shadow-blue-100 ${dark.isDark && 'blend-dark'}`}
            />
          </div>
          <article className="flex-1 flex flex-col h-full justify-center items-start px-10 border-l ml-10 gap-10">
            <span className="flex items-center gap-3">
              <Acoustic theme="outline" size="20" fill="#000000" /> {local.name}
            </span>
            <span className="flex items-center gap-3">
              <Record theme="outline" size="20" fill="#000000" /> {local.category}
            </span>
            <span className="flex items-center gap-3">
              <Camera theme="outline" size="20" fill="#000000" /> {local.device}
            </span>
            <span className="flex items-center gap-3">
              <GamePs theme="outline" size="20" fill="#000000" /> {local.description}
            </span>
            <a
              href={`${local.photoSrc}?response-content-type=application/octet-stream`}
              download
              className="self-center"
              target="_blank"
            >
              <Button
                className="cursor-none border-none bg-black hover:!bg-gray-900 font-base"
                type="text"
              >
                Download
              </Button>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
};

export default CameraInfo;
