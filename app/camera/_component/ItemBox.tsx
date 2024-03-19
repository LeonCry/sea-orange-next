import { CameraPageItem } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
const ItemBox = ({ photo }: { photo: CameraPageItem }) => {
  return (
    <Link
      href={`/camera/${photo.id}`}
      className={`w-[300px] h-[200px] relative rounded-xl cursor-none shadow-violet-200 shadow-2xl box-trigger`}
    >
      <Image alt="pic" src={photo.photoSrc} fill sizes="100" className="rounded-xl" />
    </Link>
  );
};

export default ItemBox;
