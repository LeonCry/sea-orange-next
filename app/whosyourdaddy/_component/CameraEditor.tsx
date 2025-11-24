'use client';
import {
  getPhotoByPageInBackGround,
  getPossibleCategory,
  deleteCameraById,
  insertCamera,
  updateCameraById,
  getCount,
} from '@/api/cameraPageApi';
import CommonEditor from './common/CommonEditor';
const CameraEditor = () => {
  const property = [
    { causal: 'name', label: '名称' },
    { causal: 'description', label: '描述' },
    { causal: 'photoSrc', label: '图片地址' },
    { causal: 'category', label: '分类' },
    { causal: 'device', label: '设备' },
  ];
  const spare = { path: 'null', sorted: 1, isShow: true };
  return (
    <section>
      <CommonEditor
        title="Camera"
        revaPath={'/camera'}
        property={property}
        getAllReq={getPhotoByPageInBackGround}
        updateReq={updateCameraById}
        deleteReq={deleteCameraById}
        insertReq={insertCamera}
        getCategoryReq={getPossibleCategory}
        getCount={getCount}
        spare={spare}
        hasPage={true}
      />
    </section>
  );
};

export default CameraEditor;
