import { useGetState, useMemoizedFn } from "ahooks";
import { throttle } from "radash";
import { useEffect, useMemo } from "react";
const usePreloadImages = (images: string[]) => {
  const getImages = useMemoizedFn(throttle({ interval: 100 }, () => images.forEach((mg) => {
    const imgElement = new Image();
    imgElement.src = mg;
    imgElement.onload = () => {
      setProcess((p) => ++p);
    };
  })));
  const [, setProcess, getProcess] = useGetState(0);
  const total = useMemo(() => images.length, []);
  useEffect(() => {
    getImages();
  }, []);
  return { process: getProcess(), total };
};
export default usePreloadImages;