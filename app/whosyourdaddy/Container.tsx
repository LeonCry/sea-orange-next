import { Tabs } from 'antd';
import BlogEditor from './_component/BlogEditor';
import ProjectEditor from './_component/ProjectEditor';
import CameraEditor from './_component/CameraEditor';
import FunnyEditor from './_component/FunnyEditor';
import GossipEditor from './_component/GossipEditor';
import VisitEditor from './_component/VisitEditor';
const tabs = [
  { label: 'Blog', key: '1', children: <BlogEditor /> },
  { label: 'Project', key: '2', children: <ProjectEditor /> },
  { label: 'Camera', key: '3', children: <CameraEditor /> },
  { label: 'Funny', key: '4', children: <FunnyEditor /> },
  { label: 'Gossip', key: '5', children: <GossipEditor /> },
  { label: 'Visit', key: '6', children: <VisitEditor /> },
];
const Container = () => {
  return (
    <section className="w-full h-full absolute top-0 z-[1040] bg-white p-5 !text-base !cursor-auto">
      <Tabs defaultActiveKey="1" type="card" size="large" items={tabs} />
    </section>
  );
};

export default Container;
