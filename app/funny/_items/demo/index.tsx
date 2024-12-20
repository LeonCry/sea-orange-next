'use client';
import style from './index.module.scss';
const Index = () => {
  return (
    <section className=" w-full text-center px-40">
      <div className="w-[400px] h-[600px] bg-white border rounded-[36px] border-gray-300"></div>
      <div className={style.box}></div>
    </section>
  );
};
export default Index;
