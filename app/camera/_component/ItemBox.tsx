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
  const isIntoView = useIntersectionObserver(itemRef);
  return (
    <Link
      ref={itemRef}
      href={`/camera/${photo.id}`}
      className={`w-[600px] h-[400px] relative rounded-xl cursor-none shadow-violet-200 shadow-xl box-trigger`}
    >
      {isIntoView && (
        <Image
          alt="pic"
          src={photo.photoSrc}
          fill
          sizes="100"
          className={`rounded-xl ${dark.isDark && 'blend-dark'}`}
          priority
        />
      )}
    </Link>
  );
};

export default ItemBox;
