'use client';
import { CameraPageItem } from '@prisma/client';
import { useImmer } from 'use-immer';
import ItemBox from './ItemBox';
import { Button, Select, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Loading from '@/components/loading/Loading';
import { getPhotoByCategory } from '@/api/cameraPageApi';
import SmallLoading from '@/components/loading/smallLoading';
import {AllApplication, ClearFormat} from "@icon-park/react";
const Camera = ({
  fetchData,
  fetchCategoryData,
}: {
  fetchData: (page: number) => Promise<CameraPageItem[]>;
  fetchCategoryData: () => Promise<{ category: string }[]>;
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [photos, setPhotos] = useImmer<CameraPageItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [category, setCategory] = useImmer<string[]>([]);
  let page = useRef(1);
  const fetchNextCamera = async () => {
    setIsFetching(true);
    const res = await fetchData(page.current);
    setIsFetching(false);
    if (!res.length)
      return messageApi.open({
        type: 'warning',
        content: 'has loaded all photos',
      });
    setIsFetching(false);
    setPhotos((draft) => {
      draft.push(...res);
    });
  };
  const refresh = async () => {
    setIsFetching(true);
    page.current = 1;
    const res = await fetchData(page.current);
    setIsFetching(false);
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
  const handleSearch = async (v: string) => {
    setIsFetching(true);
    page.current = 1;
    const res = await getPhotoByCategory(v, page.current);
    setIsFetching(false);
    setPhotos((draft) => {
      draft.splice(0, draft.length);
      draft.push(...res);
    });
  };
  const handleScrollToBottom = () => {
    const scrollTop = (document.documentElement || document.body.parentNode || document.body)
      .scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
    if (scrollTop + clientHeight >= scrollHeight) {
      if (isFetching) return;
      page.current++;
      fetchNextCamera();
    }
  };
  useEffect(() => {
    refresh();
    fetchCategory();
    window.addEventListener('scroll', handleScrollToBottom);
    return () => {
      setCategory((draft) => draft.splice(0, draft.length));
      setPhotos((draft) => draft.splice(0, draft.length));
      window.removeEventListener('scroll', handleScrollToBottom);
    };
  }, []);
  return (
    <>
      {!!photos.length && !!category.length ? (
        <section className="page-dropDown">
          {contextHolder}
          <header className="flex items-center">
            <AllApplication theme="outline" size="24" fill="#333" className="inline-block pr-2"/>
            <Select
              className="cursor-none"
              style={{ width: 160 }}
              onChange={handleSearch}
              options={category.map((item) => ({ value: item, label: item }))}
            />
            <div className="w-5 inline-block"></div>
            <Button className="cursor-none px-5" onClick={refresh}>
              <ClearFormat theme="outline" size="18" fill="#333"/>
            </Button>
            <div className="w-5 inline-block"></div>
            {isFetching && (
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
