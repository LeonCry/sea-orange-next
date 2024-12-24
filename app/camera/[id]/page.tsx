import { unstable_cache } from 'next/cache';
import CameraInfo from './CameraInfo';
import { getPhotoById } from '@/api/cameraPageApi';
import RandomSpan from '@/components/randomSpan/RandomSpan';

const CameraPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const photoInfo = await unstable_cache(async () => await getPhotoById(parseInt(id)), [id], {
    tags: ['/camera' + id],
  })();
  return (
    <>
      <CameraInfo local={photoInfo} />
      <RandomSpan />
    </>
  );
};
export default CameraPage;
