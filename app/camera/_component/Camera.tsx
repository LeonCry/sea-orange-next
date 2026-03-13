'use client';
import { CameraPageItem } from '@prisma/client';
import { message } from 'antd';
import { useRef, useState, useCallback, useEffect } from 'react';
import Loading from '@/lotties/loading/Loading';
import { useImmer } from 'use-immer';
import GridPhoto from './GridPhoto';
import CategoryFilter from './CategoryFilter';
import { useEffectOnce } from 'react-use';
import { useDebounceFn } from 'ahooks';
import { useQueryState } from 'nuqs';
const Camera = ({
  fetchData,
  fetchByCategory,
  fetchCategories,
}: {
  fetchData: (page: number) => Promise<CameraPageItem[]>;
  fetchByCategory?: (category: string, page: number) => Promise<CameraPageItem[]>;
  fetchCategories?: () => Promise<{ category: string }[]>;
}) => {
  let page = useRef(0);
  const container = useRef<HTMLDivElement | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [photos, setPhotos] = useImmer<CameraPageItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [cateParam, setCateParam] = useQueryState('cate', { defaultValue: '' });
  const [selectedCategory, setSelectedCategory] = useState(cateParam);
  const activeCategoryRef = useRef(cateParam);

  const { run: fetchNextCamera } = useDebounceFn(async () => {
    page.current++;
    const cat = activeCategoryRef.current;
    const res =
      cat && fetchByCategory
        ? await fetchByCategory(cat, page.current)
        : await fetchData(page.current);
    if (!res.length) {
      messageApi.open({
        type: 'warning',
        content: 'ALL PHOTOS HAS BEEN LOADED',
      });
      return;
    }
    setPhotos((draft) => {
      draft.push(...res);
    });
  }, { wait: 100 });

  useEffectOnce(() => {
    fetchNextCamera();
    if (fetchCategories) {
      fetchCategories().then((res) => {
        setCategories(res.map((item) => item.category));
      });
    }
  });

  useEffect(() => {
    if (cateParam === activeCategoryRef.current) return;
    activeCategoryRef.current = cateParam;
    setSelectedCategory(cateParam);
    page.current = 0;
    setPhotos(() => []);
    fetchNextCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cateParam]);

  const handleApplyCategory = useCallback((category: string) => {
    if (category === activeCategoryRef.current) return;
    activeCategoryRef.current = category;
    setSelectedCategory(category);

    setCateParam(category || null);
    page.current = 0;
    setPhotos(() => []);
    fetchNextCamera();
  }, [fetchNextCamera, setPhotos, setCateParam]);

  return (
    <>
      {contextHolder}
      {fetchCategories && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onApply={handleApplyCategory}
        />
      )}
      {!!photos.length ? (
        <section ref={container} className="page-dropDown !px-0 fix-h !overflow-hidden">
          <GridPhoto photos={photos} fetchNextCamera={fetchNextCamera} />
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default Camera;
