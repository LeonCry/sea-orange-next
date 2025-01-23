'use client';
import CommonEditor from './common/CommonEditor';
import {
  getAllProjects,
  deleteProjectById,
  insertProject,
  getProjectCategory,
  updateProjectById,
} from '@/api/projectPageApi';
const ProjectEditor = () => {
  const property = [
    { causal: 'name', label: '名称' },
    { causal: 'description', label: '描述' },
    { causal: 'icon', label: '站图src' },
    { causal: 'category', label: '分类' },
    { causal: 'sourceUrl', label: '预览地址' },
    { causal: 'path', label: '发布时间' },
  ];
  const spare = { sorted: 1, isShow: true };
  return (
    <section>
      <CommonEditor
        title="Project"
        revaPath={'/project'}
        property={property}
        getAllReq={getAllProjects}
        updateReq={updateProjectById}
        deleteReq={deleteProjectById}
        insertReq={insertProject}
        getCategoryReq={getProjectCategory}
        spare={spare}
        markdownEdit="description"
      />
    </section>
  );
};

export default ProjectEditor;
