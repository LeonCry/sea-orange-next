'use client';
import CommonEditor from './common/CommonEditor';
import {
  getAllProjectsFromFunny,
  insertFunny,
  deleteFunnyById,
  getFunnyCategory,
  updateFunnyById,
} from '@/api/funnyPageApi';
const FunnyEditor = () => {
  const property = [
    { causal: 'name', label: '名称' },
    { causal: 'description', label: '描述' },
    { causal: 'icon', label: '图标' },
    { causal: 'category', label: '分类' },
    { causal: 'path', label: '路径(无需添加“/”)' },
    { causal: 'sourceUrl', label: '时间' },
  ];
  const spare = { sorted: 1, isShow: true };
  return (
    <section>
      <CommonEditor
        title="Funny"
        revaPath={'/project'}
        property={property}
        getAllReq={getAllProjectsFromFunny}
        updateReq={updateFunnyById}
        deleteReq={deleteFunnyById}
        insertReq={insertFunny}
        getCategoryReq={getFunnyCategory}
        markdownEdit={'description'}
        spare={spare}
      />
    </section>
  );
};

export default FunnyEditor;
