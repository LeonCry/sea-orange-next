import CameraInfo from './CameraInfo';
import { getPhotoById } from '@/api/cameraPageApi';

const CameraPage = async ({ params }: { params: { id: number } }) => {
  const photoInfo = await getPhotoById(params.id);
  return <CameraInfo local={photoInfo} />;
};
export default CameraPage;
