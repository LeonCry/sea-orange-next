'use client';
import { CameraPageItem } from '@prisma/client';
import Image from 'next/image';
import style from './Grid.module.scss';
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
      className="w-full h-full overflow-hidden rounded cursor-none bg-[#c5c5c53d]"
    >
      <div className="flex justify-center items-center relative w-full h-full">
        {!isLoadingComplete && (
          <div className="absolute inset-0 flex items-center justify-center">
            <figure className={style.loading} />
          </div>
        )}
        <Image
          alt="pic"
          onLoad={() => setIsLoadingComplete(true)}
          src={photo.photoSrc}
          fill
          sizes="100px,100px"
          quality={80}
          style={{ objectFit: 'cover' }}
          className='transition-all duration-500 hover:scale-125'
        />
      </div>
    </div>
  );
};

export default ItemBox;
