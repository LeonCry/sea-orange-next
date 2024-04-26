import { CameraPageItem } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { darkStore } from '@/store/darkStore';
import { useSnapshot } from 'valtio';
const ItemBox = ({ photo }: { photo: CameraPageItem }) => {
  const dark = useSnapshot(darkStore);
  const itemRef = useRef<any>(null);
  const isIntoView = useIntersectionObserver(itemRef, 0.22);
  return (
    <Link
      ref={itemRef}
      href={`/camera/${photo.id}`}
      className={`w-[600px] h-[400px] relative rounded-xl cursor-none box-trigger ${
        dark.isDark && 'blend-dark'
      }`}
    >
      {isIntoView && (
        <Image alt="pic" src={photo.photoSrc} fill sizes="100" className="rounded-xl" priority />
      )}
    </Link>
  );
};

export default ItemBox;
