'use client';
import { CameraPageItem } from '@prisma/client';
import { useImmer } from 'use-immer';
import ItemBox from './ItemBox';
import { Select } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import Loading from '@/components/loading/Loading';
const Camera = ({
  fetchData,
  fetchCategoryData,
}: {
  fetchData: (page: number) => Promise<CameraPageItem[]>;
  fetchCategoryData: () => Promise<{ category: string }[]>;
}) => {
  const [photos, setPhotos] = useImmer<CameraPageItem[]>([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useImmer<string[]>([]);
  const fetchNextCamera = async (page: number) => {
    const res = await fetchData(page);
    setPhotos((draft) => {
      draft.push(...res);
    });
  };
  const refresh = async () => {
    setPage(1);
    const res = await fetchData(page);
    setPhotos((draft) => {
      draft.splice(0, draft.length);
      draft.push(...res);
    });
  };
  const fetchCategory = async () => {
    const res = await fetchCategoryData();
    setCategory((draft) => {
      draft.splice(0, draft.length);
      draft.push(...res.map((item) => item.category));
    });
  };
  const handleChange = () => {};
  useEffect(() => {
    refresh();
    fetchCategory();
    return () => {
      setCategory((draft) => draft.splice(0, draft.length));
      setPhotos((draft) => draft.splice(0, draft.length));
    };
  }, []);
  return (
    <>
      {!!photos.length && !!category.length ? (
        <section className="page-dropDown">
          <header className="p-4">
            <label htmlFor="sel">Select category: </label>
            <Select
              id="sel"
              className="cursor-none"
              style={{ width: 120 }}
              onChange={handleChange}
              options={category.map((item) => ({ value: item, label: item }))}
            />
          </header>
          <article className="flex flex-wrap gap-6 justify-around">
            {photos.map((p, i) => (
              <ItemBox key={i} photo={p} />
            ))}
          </article>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Camera;
