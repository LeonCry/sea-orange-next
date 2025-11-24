'use client';
import { CameraPageItem } from '@prisma/client';
import Image from 'next/image';
import ImageLoading from '@/lotties/imageLoading/ImageLoading';
import { useState } from 'react';
const ItemBox = ({
  photo,
  handleSetId,
}: {
  photo: CameraPageItem;
  handleSetId: (id: string) => void;
}) => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  if (!photo) return null;
  return (
    <div
      onClick={() => {
        handleSetId(String(photo.id));
      }}
      className="w-full h-full border rounded-xl cursor-none bg-[#c5c5c511] transition-all duration-500 hover:scale-125"
    >
      <div className="flex justify-center items-center relative w-full h-full">
        <Image
          alt="pic"
          onLoad={() => setIsLoadingComplete(true)}
          src={photo.photoSrc}
          fill
          sizes="200px"
          priority
          className={`rounded-xl ${isLoadingComplete || 'opacity-0'}`}
        />
        {isLoadingComplete || (
          <div className="w-full h-full flex justify-center items-center">
            <ImageLoading />
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemBox;
