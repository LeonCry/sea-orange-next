'use client';
import { useMyScroll } from '@/hooks/useMyScroll';
import style from './Grid.module.scss';
import { debounce, random, sum } from 'radash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CameraPageItem } from '@prisma/client';
import ItemBox from './ItemBox';
import { useImmer } from 'use-immer';
import { useAsyncEffect, useUpdateEffect } from 'ahooks';
import { useQueryState } from 'nuqs';
import CameraInfo from './CameraInfo';
import { useEffectOnce } from 'react-use';
import { message } from 'antd';
interface blockType {
  width: number;
  height: number;
}
// 单次请求数
let count = 10;
// block宽长比
let ratio = 2 / 3;
// gap
let gap = 3;
// block类型数
let bt = 3;
let wTList = Array.from({ length: bt }, (_, i) => gap * (i + 1));
let hTList = wTList.map((w) => w * ratio);
let totalWidth = sum(wTList);
let gridAreaList = [Array.from({ length: totalWidth }, () => '.')];
//获取一行中的连续空白长度 [startColumn, endColumn][];
const getEmptyWidth = (row: number) => {
  if (row >= gridAreaList.length) {
    gridAreaList.push(Array.from({ length: totalWidth }, () => '.'));
    return [[0, totalWidth - 1]] as [number, number][];
  }
  const ew: [number, number][] = [];
  let ring = false;
  gridAreaList[row].forEach((item, index) => {
    if (!ring && item !== '.') {
      ring = false;
    } else if (!ring && item === '.') {
      ew.push([index, 0]);
      ring = true;
    } else if (ring && item !== '.') {
      ew[ew.length - 1][1] = index - 1;
      ring = false;
    } else if (ring && index === totalWidth - 1) {
      ew[ew.length - 1][1] = index;
    }
  });
  return ew;
};
//根据空白长度生成块类型
const fillingByEmptyWidth = (emptyWidth: [number, number]) => {
  let width = emptyWidth[1] - emptyWidth[0] + 1;
  const blocks: blockType[] = [];
  while (width) {
    const maxR = wTList.findLastIndex((w) => w <= width);
    const r = random(0, maxR);
    width -= wTList[r];
    blocks.push({ width: wTList[r], height: hTList[r] });
  }
  return blocks;
};
//根据块类型生成grid模板区域
const generateGridTemplateArea = (
  row: number,
  startCol: number,
  blocks: blockType[],
  names: string[]
) => {
  blocks.forEach((bk) => {
    const name = names.shift();
    if (!name) return;
    for (let r = row; r < row + bk.height; r++) {
      for (let c = startCol; c < startCol + bk.width; c++) {
        if (!gridAreaList[r]) {
          gridAreaList.push(Array.from({ length: totalWidth }, () => '.'));
        }
        gridAreaList[r][c] = name;
      }
    }
    startCol += bk.width;
  });
};
const resetBaseData = () => {
  wTList = Array.from({ length: bt }, (_, i) => gap * (i + 1));
  hTList = wTList.map((w) => w * ratio);
  totalWidth = sum(wTList);
  gridAreaList = [Array.from({ length: totalWidth }, () => '.')];
};
export default function GridPhoto({
  photos,
  fetchNextCamera,
}: {
  photos: CameraPageItem[];
  fetchNextCamera: () => Promise<boolean | undefined>;
}) {
  useEffectOnce(resetBaseData);
  const [messageApi, contextHolder] = message.useMessage();
  const container = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const continueRow = useRef(0);
  const [allGridAreaNames, setAllGridAreaNames] = useImmer<string[]>([]);
  //生成函数
  const handleGenerating = (gridAreaNames: string[]) => {
    let row = continueRow.current;
    while (gridAreaNames.length) {
      const emptyWidth = getEmptyWidth(row);
      if (!emptyWidth.length) {
        row++;
        continue;
      }
      emptyWidth.forEach((col) => {
        const blocks = fillingByEmptyWidth(col);
        generateGridTemplateArea(row, col[0], blocks, gridAreaNames);
      });
    }
    continueRow.current = row;
    return gridAreaList
      .map((row) => row.join(' '))
      .map((r) => '\'' + r + '\'')
      .join(' ');
  };
  // 附加参数
  const t = useRef(0);
  const [gridTemplateAreas, setGridTemplateAreas] = useState('');
  useEffect(() => {
    const getGridTemplateAreaStyle = debounce({ delay: 300 }, async () => {
      t.current++;
      const gridAreaNames = Array.from({ length: count }, (_, i) => `_${t.current}_${i}`);
      setAllGridAreaNames((draft) => {
        draft.push(...gridAreaNames);
      });
      setGridTemplateAreas(handleGenerating(gridAreaNames));
    });
    getGridTemplateAreaStyle();
  }, [photos, setAllGridAreaNames]);
  const { arrivedState } = useMyScroll(container, { mb: 1 });
  const [baseWH, setBaseWH] = useState(90);
  const isLoadAll = useRef(false);
  const handleFetchNextCameraWithAnimation = useCallback(async () => {
    if (isLoadAll.current) return;
    const lastTop = gridAreaList.length * baseWH - 384;
    gridRef.current!.style.opacity = '0.5';
    messageApi.open({
      type: 'info',
      content: 'THE NEXT PAGE IS LOADING...',
      duration: 1,
    });
    const res = await fetchNextCamera();
    await new Promise((resolve) => setTimeout(resolve, 800));
    gridRef.current!.style.opacity = '1';
    if (res) return (isLoadAll.current = true);
    container.current!.scrollTo({ top: lastTop, behavior: 'smooth' });
  }, [fetchNextCamera, baseWH, messageApi]);
  useUpdateEffect(() => {
    if (!gridRef.current || !container.current) return;
    if (!arrivedState.bottom) return;
    handleFetchNextCameraWithAnimation();
  }, [arrivedState.bottom]);
  useAsyncEffect(async () => {
    if (!gridRef.current) return;
    setBaseWH(document.documentElement.clientWidth / 18);
    gridRef.current.style.opacity = '0';
    await new Promise((resolve) => setTimeout(resolve, 800));
    gridRef.current.style.opacity = '1';
  }, []);
  const [id, setId] = useQueryState('id', {
    defaultValue: '',
  });
  return (
    <>
      {contextHolder}
      <article ref={container} className="relative z-10 h-full w-fit m-auto overflow-scroll">
        <div
          ref={gridRef}
          className={style.edgeGrid}
          style={{
            gridTemplateAreas,
            width: baseWH * sum(wTList) + 'px',
            height: gridAreaList.length * baseWH + 'px',
          }}
        >
          {allGridAreaNames.map((n, i) => (
            <div key={n} style={{ gridArea: n }} className={style.edgeBlock}>
              <ItemBox photo={photos[i]} handleSetId={setId} />
            </div>
          ))}
        </div>
        <div className="h-96 w-full relative">
          <div
            className="transition-all duration-700 absolute select-none hover:text-purple-500 hover:bg-[#7700ff2b] hover:w-full hover:animate-pulse left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-10 py-5 w-[650px] rounded-md text-center"
            onClick={handleFetchNextCameraWithAnimation}
          >
            CLICK OR SCROLL TO BOTTOM TO LOAD NEXT PAGE PHOTOS
          </div>
        </div>
      </article>
      {id.length && (
        <CameraInfo
          local={photos.find((p) => p.id === Number(id))!}
          handleSetId={setId}
          photoId={id}
        />
      )}
    </>
  );
}
