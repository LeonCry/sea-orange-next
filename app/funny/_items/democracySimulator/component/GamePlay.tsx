'use client';
import { UpTwo } from '@icon-park/react';
import { useEffect, useState } from 'react';
import allDirections from '../allDirections';
import Image from 'next/image';
const baseKeyCode = [37, 38, 39, 40];
const fillColor = ['#C1C1BA', '#f9c116'];
const direction = ['-rotate-90', '', 'rotate-90', 'rotate-180'];
const GamePlay = () => {
  const dirs = [...allDirections];
  const [curPass, setCurPass] = useState(0);
  const [curDir, setCurDir] = useState(0);
  const [error, setError] = useState(false);
  const [finish, setFinish] = useState(false);
  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (error || finish) return;
    const { ctrlKey, keyCode } = e;
    // if (!ctrlKey) return;
    if (keyCode !== baseKeyCode[dirs[curDir].instruction[curPass]]) {
      setError(() => true);
      setTimeout(() => {
        setError(() => false);
      }, 500);
      return setCurPass(() => 0);
    }
    setCurPass((n) => n + 1);
    if (curPass === dirs[curDir].instruction.length - 1) {
      setFinish(() => true);
      setTimeout(() => {
        setFinish(() => false);
        setCurDir(() => curDir + 1);
        return setCurPass(() => 0);
      }, 500);
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [curPass, error]);
  return (
    <main className="w-full flex justify-center h-full items-center">
      <section
        className={`flex flex-col w-[500px] p-3 rounded-xl h-[160px] transition-all duration-500 ${
          finish ? 'bg-emerald-900' : 'bg-zinc-800'
        }`}
      >
        <div className="flex justify-between mb-3">
          <div>
            <p className="text-gray-500 mb-4">{dirs[curDir].license}</p>
            <span className="text-yellow-500 text-2xl">{dirs[curDir].name}</span>
          </div>
          <Image src={dirs[curDir].icon} alt="null" width={80} height={80} priority />
        </div>
        <div className="flex pt-3 border-t-2 border-dashed border-gray-500">
          {dirs[curDir].instruction.map((c, i) => (
            <UpTwo
              key={i}
              theme="filled"
              size="26"
              fill={error ? '#de1c31' : curPass < i ? fillColor[0] : fillColor[1]}
              className={`p-1 ${direction[c]}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default GamePlay;
