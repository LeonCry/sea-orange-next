'use client';
import { CameraPageItem } from '@prisma/client';
import ItemBox from './ItemBox';
import { Button, Select, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Loading from '@/lotties/loading/Loading';
import { getPhotoByCategory } from '@/api/cameraPageApi';
import SmallLoading from '@/lotties/loading/smallLoading';
import { AllApplication, ClearFormat } from '@icon-park/react';
import { useMemoizedFn, useScroll, useUpdateEffect } from 'ahooks';
import { useImmer } from 'use-immer';
const Camera = ({
  fetchData,
  fetchCategoryData,
}: {
  fetchData: (page: number) => Promise<CameraPageItem[]>;
  fetchCategoryData: () => Promise<{ category: string }[]>;
}) => {
  let page = useRef(1);
  const container = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [photos, setPhotos] = useImmer<CameraPageItem[]>([]);
  const [category, setCategory] = useImmer<string[]>([]);
  const fetchNextCamera = async () => {
    page.current++;
    const res = await fetchData(page.current);
    if (!res.length)
      return messageApi.open({
        type: 'warning',
        content: 'has loaded all photos',
      });
    setPhotos((draft) => draft.push(...res));
  };
  const handleSearch = async (v: string) => {
    page.current = 1;
    setLoading(true);
    const res = await getPhotoByCategory(v, page.current);
    setLoading(false);
    photos.length = 0;
    photos.push(...res);
  };
  const refresh = useMemoizedFn(async () => {
    page.current = 1;
    setLoading(true);
    const res = await fetchData(page.current);
    setLoading(false);
    setPhotos((draft) => {
      draft.length = 0;
      draft.push(...res);
    });
  });
  const position = useScroll(
    container,
    (val) =>
      !!container.current &&
      !!val.top &&
      val.top === container.current.scrollHeight - container.current.offsetHeight
  );
  useUpdateEffect(() => {
    fetchNextCamera();
  }, [position]);
  useEffect(() => {
    refresh();
  }, [refresh]);
  useEffect(() => {
    fetchCategoryData().then((res) => {
      setCategory(res.map((item) => item.category));
    });
  }, [fetchCategoryData, setCategory]);
  return (
    <>
      {!!photos.length && !!category.length ? (
        <section ref={container} className="page-dropDown fix-h !overflow-auto">
          {contextHolder}
          <header className="flex items-center">
            <AllApplication theme="outline" size="24" fill="#333" className="inline-block pr-2" />
            <Select
              className="cursor-none"
              style={{ width: 160 }}
              onChange={handleSearch}
              options={category.map((item) => ({ value: item, label: item }))}
            />
            <div className="w-5 inline-block"></div>
            <Button className="cursor-none px-5" onClick={refresh}>
              <ClearFormat theme="outline" size="18" fill="#333" />
            </Button>
            <div className="w-5 inline-block"></div>
            {loading && (
              <div className="relative inline-block">
                <div className="absolute top-[-55px]">
                  <SmallLoading />
                </div>
              </div>
            )}
          </header>
          <article className="flex flex-wrap gap-10 justify-around p-10">
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
