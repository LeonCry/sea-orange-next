import { getPhotoByPage, getPossibleCategory } from '@/api/cameraPageApi';
import Camera from './_component/Camera';

const CameraLayout = async ({ children }: { children: React.ReactNode }) => {
  const fetchData = async (page: number) => {
    'use server';
    return await getPhotoByPage(page);
  };
  const fetchCategoryData = async () => {
    'use server';
    return await getPossibleCategory();
  };
  return (
    <section>
      <Camera fetchData={fetchData} fetchCategoryData={fetchCategoryData} />
      {children}
    </section>
  );
};

export default CameraLayout;
