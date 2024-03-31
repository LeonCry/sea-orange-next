import { getPhotoByPage, getPossibleCategory } from '@/api/cameraPageApi';
import Camera from './_component/Camera';
import { revalidatePath } from 'next/cache';

const CameraLayout = async ({ children }: { children: React.ReactNode }) => {
  const fetchData = async (page: number) => {
    'use server';
    return await getPhotoByPage(page);
  };
  const fetchCategoryData = async () => {
    'use server';
    return await getPossibleCategory();
  };
  revalidatePath('/camera');
  return (
    <>
      <Camera fetchData={fetchData} fetchCategoryData={fetchCategoryData} />
      {children}
    </>
  );
  return;
};

export default CameraLayout;
