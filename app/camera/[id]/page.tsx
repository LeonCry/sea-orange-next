import CameraInfo from './CameraInfo';
import { getPhotoById } from '@/api/cameraPageApi';

const CameraPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const photoInfo = await getPhotoById(parseInt(id));
  return <CameraInfo local={photoInfo} />;
};
export default CameraPage;
