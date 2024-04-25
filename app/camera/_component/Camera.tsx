'use client';
import { CameraPageItem } from '@prisma/client';
import ItemBox from './ItemBox';
import { Button, Select, message } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import Loading from '@/lotties/loading/Loading';
import { getPhotoByCategory } from '@/api/cameraPageApi';
import SmallLoading from '@/lotties/loading/smallLoading';
import { AllApplication, ClearFormat } from '@icon-park/react';
import { useReactive, useScroll, useUpdateEffect } from 'ahooks';
import { debounce, random } from 'radash';
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
  const photos = useReactive<CameraPageItem[]>([]);
  const category = useReactive<string[]>([]);
  const fetchNextCamera = debounce({ delay: 500 }, async () => {
    page.current++;
    const res = await fetchData(page.current);
    if (!res.length)
      return messageApi.open({
        type: 'warning',
        content: 'has loaded all photos',
      });
    photos.push(...res);
  });
  const refresh = debounce({ delay: 500 }, async () => {
    page.current = 1;
    setLoading(true);
    const res = await fetchData(page.current);
    setLoading(false);
    photos.length = 0;
    photos.push(...res);
  });
  const fetchCategory = debounce({ delay: 500 }, async () => {
    const res = await fetchCategoryData();
    category.length = 0;
    category.push(...res.map((item) => item.category));
  });
  const handleSearch = useCallback(async (v: string) => {
    page.current = 1;
    setLoading(true);
    const res = await getPhotoByCategory(v, page.current);
    setLoading(false);
    photos.length = 0;
    photos.push(...res);
  }, []);
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
    fetchCategory();
  }, []);
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
