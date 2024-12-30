'use client';
import { useMyScroll } from '@/hooks/useMyScroll';
import style from './Grid.module.scss';
import { debounce, random, sum } from 'radash';
import { useEffect, useRef, useState } from 'react';
import { CameraPageItem } from '@prisma/client';
import ItemBox from './ItemBox';
import { useImmer } from 'use-immer';
import { useAsyncEffect, useUpdateEffect } from 'ahooks';
import { useEffectOnce } from 'react-use';
interface blockType {
  width: number;
  height: number;
}
// base-w-h
const baseWH = 90;
// 单次请求数
const count = 10;
// block宽长比
const ratio = 2 / 3;
// gap
const gap = 3;
// block类型数
const bt = 3;
const wTList = Array.from({ length: bt }, (_, i) => gap * (i + 1));
const hTList = wTList.map((w) => w * ratio);
const totalWidth = sum(wTList);
const gridAreaList = [Array.from({ length: totalWidth }, () => '.')];
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
export default function GridPhoto({
  photos,
  fetchNextCamera,
}: {
  photos: CameraPageItem[];
  fetchNextCamera: () => Promise<boolean | undefined>;
}) {
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
  }, [photos]);
  const { arrivedState } = useMyScroll(container);
  useAsyncEffect(async () => {
    if (!gridRef.current) return;
    if (!arrivedState.bottom) return;
    fetchNextCamera();
    gridRef.current.style.opacity = '0';
    await new Promise((resolve) => setTimeout(resolve, 600));
    gridRef.current.style.opacity = '1';
  }, [arrivedState.bottom]);
  useAsyncEffect(async () => {
    if (!gridRef.current) return;
    gridRef.current.style.opacity = '0';
    await new Promise((resolve) => setTimeout(resolve, 600));
    gridRef.current.style.opacity = '1';
  }, []);
  return (
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
            <ItemBox photo={photos[i]} />
          </div>
        ))}
      </div>
    </article>
  );
}
