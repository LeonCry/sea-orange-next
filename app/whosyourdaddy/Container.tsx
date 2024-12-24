'use client';
import { Input, Tabs } from 'antd';
import BlogEditor from './_component/BlogEditor';
import ProjectEditor from './_component/ProjectEditor';
import CameraEditor from './_component/CameraEditor';
import FunnyEditor from './_component/FunnyEditor';
import GossipEditor from './_component/GossipEditor';
import VisitEditor from './_component/VisitEditor';
import { useCallback, useMemo, useState } from 'react';
import { useEffectOnce } from 'react-use';
import RandomSpan from '@/components/randomSpan/RandomSpan';
const tabs = [
  { label: 'BLOG', key: '1', children: <BlogEditor /> },
  { label: 'PROJECT', key: '2', children: <ProjectEditor /> },
  { label: 'CAMERA', key: '3', children: <CameraEditor /> },
  { label: 'FUNNY', key: '4', children: <FunnyEditor /> },
  { label: 'GOSSIP', key: '5', children: <GossipEditor /> },
  { label: 'VISIT', key: '6', children: <VisitEditor /> },
];
const correct = process.env.NEXT_PUBLIC_PASSWORD;
const Container = () => {
  const tabsElement = useMemo(() => {
    return <Tabs defaultActiveKey="1" type="card" size="large" items={tabs} />;
  }, []);
  const [password, setPassword] = useState('');
  const handlePassword = useCallback((e: any) => {
    setPassword(e.target.value);
  }, []);
  useEffectOnce(() => {
    document.body.style.cursor = 'auto';
  });
  return (
    <section className="w-full h-full absolute top-0 z-[1040] bg-white p-5 !text-base">
      {password === correct ? (
        tabsElement
      ) : (
        <div className="w-full h-full overflow-hidden">
          <Input
            className="w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            placeholder="password"
            onChange={handlePassword}
            type="password"
          />
        </div>
      )}
    </section>
  );
};

export default Container;
