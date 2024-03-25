# 零碎知识点

- window.getComputedStyle(element)可以获得当前元素经过计算后的样式(呈现出来的样式)
- Element.getBoundingRect():transform 也会改变其 width,height,left,top 的值.固定可选 offset 系列.
- pointer-events: none;可以使指针具有穿透效果.

- **React**: useMemo 和 useCallBack 的区别:
  - `useMemo` 用来记住“值”（尤其是计算得到的值），减少计算次数；
  - `useCallback` 用来记住“函数引用”，避免因函数内容不变而引用变更导致的不必要的子组件重渲染。

```jsx
import { getBlogInfoById } from '@/api/blogPageApi';
import style from './MainBox.module.scss';
import Md from './Md';
import { BlogPageItem } from '@prisma/client';
const MainBox = async ({ mdId }: { mdId: string }) => {
  const blogInfo: BlogPageItem = await getBlogInfoById(mdId);
  return (
    <section className={`${style.main} drop-animation`}>
      <Md blogInfo={blogInfo} />
    </section>
  );
};

export default MainBox;
```
