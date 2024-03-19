import CameraInfo from './CameraInfo';
import { getPhotoById } from '@/api/cameraPageApi';

const CameraPage = async ({ params }: { params: { id: string } }) => {
  const photoInfo = await getPhotoById(parseInt(params.id));
  return <CameraInfo local={photoInfo} />;
};
export default CameraPage;
