'use client';
import style from './Modal.module.scss';
import { AppletClosed } from '@icon-park/react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const Modal = ({ children }: { children: React.ReactNode }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const handleClose = async () => {
    if (!modalRef.current) return;
    modalRef.current.style.animationPlayState = 'running';
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push('/funny');
  };
  return (
    <section className={`absolute backdrop-blur-sm z-10 top-[64px] ${style.content}`}>
      <div
        ref={modalRef}
        className={`${style.puffOut} w-[90%] h-[90%] ml-[5%] mt-6 backdrop-blur-sm rounded-3xl p-4 border shadow-2xl shadow-indigo-100`}
      >
        <div className="absolute right-0 top-0 p-4 transition duration-300 hover:rotate-180">
          <AppletClosed
            theme="outline"
            size="20"
            fill="#000000"
            strokeWidth={2}
            onClick={handleClose}
          />
        </div>
        {children}
      </div>
    </section>
  );
};

export default Modal;
