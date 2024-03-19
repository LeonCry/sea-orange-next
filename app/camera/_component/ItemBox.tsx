import { CameraPageItem } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
const ItemBox = ({ photo }: { photo: CameraPageItem }) => {
  const itemRef = useRef<any>(null);
  const isIntoView = useIntersectionObserver(itemRef);
  return (
    <Link
      ref={itemRef}
      href={`/camera/${photo.id}`}
      className={`w-[300px] h-[200px] relative rounded-xl cursor-none shadow-violet-200 shadow-xl box-trigger`}
    >
      {isIntoView && <Image alt="pic" src={photo.photoSrc} fill sizes="100" className="rounded-xl" priority />}
    </Link>
  );
};

export default ItemBox;
