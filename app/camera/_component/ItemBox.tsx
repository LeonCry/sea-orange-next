import { CameraPageItem } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import ImageLoading from '@/lotties/imageLoading/ImageLoading';
import { useRef, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { darkStore } from '@/store/darkStore';
import { useSnapshot } from 'valtio';
const ItemBox = ({ photo }: { photo: CameraPageItem }) => {
  const dark = useSnapshot(darkStore);
  const itemRef = useRef<any>(null);
  const isIntoView = useIntersectionObserver(itemRef, 0.33);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  return (
    <Link
      ref={itemRef}
      href={`/camera/${photo.id}`}
      className={'w-[600px] h-[400px] rounded-xl cursor-none box-trigger bg-[#c5c5c511]'}
    >
      {isIntoView && (
        <div className="flex justify-center items-center relative w-full h-full ">
          <Image
            alt="pic"
            onLoad={() => setIsLoadingComplete(true)}
            src={photo.photoSrc}
            fill
            sizes="100"
            priority
            className={`rounded-xl ${isLoadingComplete || 'opacity-0'}`}
          />
          {isLoadingComplete || <ImageLoading />}
        </div>
      )}
    </Link>
  );
};

export default ItemBox;
