import { getPhotoByPage } from '@/api/cameraPageApi';
import Camera from './_component/Camera';
import RandomSpan from '@/components/randomSpan/RandomSpan';

const CameraLayout = async ({ children }: { children: React.ReactNode }) => {
  const fetchData = async (page: number) => {
    'use server';
    return await getPhotoByPage(page);
  };
  return (
    <section>
      <Camera fetchData={fetchData} />
      {children}
      <RandomSpan />
    </section>
  );
};

export default CameraLayout;
