'use client';
import CommonEditor from './common/CommonEditor';
import {
  getAllBlogInfo,
  insertMd,
  getBlogCategory,
  deleteMdById,
  updateBlogById,
} from '@/api/blogPageApi';
const BlogEditor = () => {
  const property = [
    { causal: 'name', label: '名称' },
    { causal: 'description', label: '描述' },
    { causal: 'icon', label: '图标' },
    { causal: 'category', label: '分类' },
    { causal: 'content', label: '文件' },
  ];
  const spare = { file: 'null', path: 'null', sorted: 1, isShow: true };
  return (
    <section>
      <CommonEditor
        title="BLOG"
        revaPath={'/blog'}
        property={property}
        getAllReq={getAllBlogInfo}
        updateReq={updateBlogById}
        deleteReq={deleteMdById}
        insertReq={insertMd}
        getCategoryReq={getBlogCategory}
        spare={spare}
      />
    </section>
  );
};

export default BlogEditor;
