import { getPhotoByPage, getPhotoByCategory, getPossibleCategory } from '@/api/cameraPageApi';
import Camera from './_component/Camera';
import RandomSpan from '@/components/randomSpan/RandomSpan';

const CameraLayout = async ({ children }: { children: React.ReactNode }) => {
  const fetchData = async (page: number) => {
    'use server';
    return await getPhotoByPage(page);
  };
  const fetchByCategory = async (category: string, page: number) => {
    'use server';
    return await getPhotoByCategory(category, page);
  };
  const fetchCategories = async () => {
    'use server';
    return await getPossibleCategory();
  };
  return (
    <section>
      <Camera fetchData={fetchData} fetchByCategory={fetchByCategory} fetchCategories={fetchCategories} />
      {children}
      <RandomSpan />
    </section>
  );
};

export default CameraLayout;
