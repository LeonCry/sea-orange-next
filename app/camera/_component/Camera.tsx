'use client';
import { CameraPageItem } from '@prisma/client';
import { message } from 'antd';
import { useRef } from 'react';
import Loading from '@/lotties/loading/Loading';
import { useImmer } from 'use-immer';
import GridPhoto from './GridPhoto';
import { useEffectOnce } from 'react-use';
import { useDebounceFn } from 'ahooks';
const Camera = ({ fetchData }: { fetchData: (page: number) => Promise<CameraPageItem[]> }) => {
  let page = useRef(0);
  const container = useRef<HTMLDivElement | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [photos, setPhotos] = useImmer<CameraPageItem[]>([]);
  const { run: fetchNextCamera } = useDebounceFn(async () => {
    page.current++;
    const res = await fetchData(page.current);
    if (!res.length) {
      messageApi.open({
        type: 'warning',
        content: 'ALL PHOTOS HAS BEEN LOADED',
      });
      return true;
    }
    setPhotos((draft) => {
      draft.push(...res);
    });
  }, { wait: 100 });
  useEffectOnce(() => {
    fetchNextCamera();
  });
  return (
    <>
      {!!photos.length ? (
        <section ref={container} className="page-dropDown !px-0 fix-h !overflow-hidden">
          {contextHolder}
          <GridPhoto photos={photos} fetchNextCamera={fetchNextCamera} />
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default Camera;
