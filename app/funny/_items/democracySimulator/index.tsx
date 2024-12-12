'use client';
import Image from 'next/image';
import style from './index.module.scss';
import DemocracyLoading from '@/lotties/democracyLoading/DemocracyLoading';
import { useEffect, useState } from 'react';
import OpButton from './component/OpButton';
import GamePlay from './component/GamePlay';
import { Progress } from 'antd';
import { useEffectOnce } from 'react-use';
const DemocracySimulator = () => {
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [model, setModel] = useState<number | undefined>();
  const [sortable, setSortable] = useState<boolean>(false);
  const [fray, setFray] = useState('');
  const [isRank, setIsRank] = useState<boolean>(false);
  const [keyboard, setKeyboard] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  useEffectOnce(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    const timer2 = setInterval(() => {
      setProgress((n) => n + 1);
    }, 20);
    return () => {
      clearTimeout(timer);
      clearInterval(timer2);
    };
  });
  const optionChoose = (e: MouseEvent | any, type: string) => {
    const target = e.target as HTMLButtonElement;
    const children = target.parentElement?.children;
    if (!e.target || target.nodeName !== 'BUTTON' || !children) return;
    Object.values(children).forEach((c) => {
      c.classList.remove(style.activated);
    });
    target.classList.add(style.activated);
    switch (type) {
      case 'model':
        setModel(() => (target.textContent as string).match(/\d+/g)?.map(Number)[0]);
        break;
      case 'sortable':
        setSortable(() => target.textContent === '顺序模式');
        break;
      case 'keyboard':
        setSortable(() => target.textContent === 'WASD 键');
        break;
      case 'fray':
        setFray(target.textContent!);
        break;
      case 'rank':
        setSortable(() => target.textContent === '军备竞赛');
        break;
    }
  };
  const startGame = async () => {
    setLoading(true);
    setProgress(0);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProgress(21);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProgress(63);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProgress(100);
    setLoading(false);
    setPlaying(true);
  };
  return (
    <main className="bg-zinc-900 w-full h-full absolute overflow-auto top-0 z-[200]">
      <section className="h-[100%] flex flex-col items-center">
        <Image
          src="https://vip.helloimg.com/i/2024/04/14/661baed101ce0.png"
          alt="null"
          width={playing ? 400 : 800}
          height={300}
          priority
          className={`${playing ? 'self-start m-8 absolute' : 'mt-28 mb-32'}`}
        />
        {loading ? (
          <section className="flex items-center absolute bottom-40">
            <DemocracyLoading />
            <h1 className="text-3xl text-gray-300">请民主的等待...</h1>
            <Progress
              className="absolute mt-24 ml-5"
              percent={progress}
              size="small"
              strokeColor="#FACC14"
            />
          </section>
        ) : playing ? (
          <GamePlay exit={() => setPlaying(false)} />
        ) : (
          <section className="flex flex-col gap-6 w-[1000px] text-2xl">
            <div className="flex gap-6 ">
              <span className="text-yellow-500 p-3">游戏模式:</span>
              <div className="flex gap-4 flex-1" onClick={(e) => optionChoose(e, 'model')}>
                <OpButton title="计时2分钟" />
                <OpButton title="计时3分钟" />
                <OpButton title="计时5分钟" />
                <OpButton title="无尽模式" />
              </div>
            </div>
            <div className="flex gap-6 ">
              <span className="text-yellow-500 p-3">战略配备:</span>
              <div className="flex gap-4 flex-1" onClick={(e) => optionChoose(e, 'sortable')}>
                <OpButton title="随机模式" />
                <OpButton title="顺序模式" />
              </div>
            </div>
            <div className="flex gap-6 ">
              <span className="text-yellow-500 p-3">模拟战场:</span>
              <div className="flex gap-4 flex-1" onClick={(e) => optionChoose(e, 'fray')}>
                <OpButton title="终结族" />
                <OpButton title="机器人" />
                <OpButton title="光能者" />
              </div>
            </div>
            <div className="flex gap-6 ">
              <span className="text-yellow-500 p-3">按键设置:</span>
              <div className="flex gap-4 flex-1" onClick={(e) => optionChoose(e, 'keyboard')}>
                <OpButton title="WASD 键" />
                <OpButton title="上下左右 键" />
              </div>
            </div>
            <div
              className="flex gap-4 justify-around mt-8"
              onClick={(e) => optionChoose(e, 'fray')}
            >
              <OpButton title="军备竞赛" />
              <OpButton title="模拟训练" />
            </div>
            <button
              onClick={startGame}
              className=" w-[250px] mt-8 mb-10 self-center text-yellow-500 p-3 cursor-none border-2 border-yellow-400 hover:bg-gray-200 hover:text-zinc-800"
            >
              开始民主的训练!
            </button>
          </section>
        )}
      </section>
    </main>
  );
};

export default DemocracySimulator;
