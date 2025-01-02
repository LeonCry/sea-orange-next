'use client';
import Loading from '@/lotties/loading/Loading';
import style from './index.module.scss';
const Index = () => {
  return (
    <>
      <section className="w-full h-full overflow-auto flex items-center backdrop-blur">
        {/* <aside className="w-40 ml-10 h-full bg-white relative rounded-2xl flex flex-col items-center justify-center gap-16">
          <div className=" w-5 h-5 bg-orange-500 rounded-full"></div>
          <div className=" w-5 h-5 bg-orange-500 rounded-full"></div>
          <div className=" w-5 h-5 bg-orange-500 rounded-full"></div>
          <div className=" w-5 h-5 bg-orange-500 rounded-full"></div>
          <div className=" w-5 h-5 bg-orange-500 rounded-full"></div>
          <div className=" w-5 h-5 bg-orange-500 rounded-full"></div>
          <div className=" w-5 h-5 bg-orange-500 rounded-full"></div>
          <div className=" w-5 h-5 bg-orange-500 rounded-full"></div>
        </aside>
        <section className={` w-full text-center px-10 h-full overflow-auto ${style.container}`}>
          <div className={`${style.linear} w-full rounded-md h-full border-2`}></div>
          <div className={`${style.linear} w-full rounded-md h-full border-2`}></div>
          <div className={`${style.linear} w-full rounded-md h-full border-2`}></div>
          <div className={`${style.linear} w-full rounded-md h-full border-2`}></div>
        </section> */}
        <Loading />
      </section>
    </>
  );
};
export default Index;
