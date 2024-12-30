import { CameraPageItem } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import ImageLoading from '@/lotties/imageLoading/ImageLoading';
import { useRef, useState } from 'react';
const ItemBox = ({ photo }: { photo: CameraPageItem }) => {
  const itemRef = useRef<any>(null);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  if (!photo) return null;
  return (
    <Link
      ref={itemRef}
      href={`/camera/${photo.id}`}
      className={'w-full h-full rounded-xl cursor-none bg-[#c5c5c511]'}
    >
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
        {isLoadingComplete || (
          <div className="w-full h-full flex justify-center items-center">
            <ImageLoading />
          </div>
        )}
      </div>
    </Link>
  );
};

export default ItemBox;
