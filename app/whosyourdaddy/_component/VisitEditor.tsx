'use client';
import CommonEditor from './common/CommonEditor';
import { getVisitByPage, getCount, deleteVisitById } from '@/api/getSectionInfo';
const VisitEditor = () => {
  const property = [{ causal: 'visit', label: 'visit' }];
  const spare = { isShow: true };
  return (
    <section>
      <CommonEditor
        title="Visit"
        revaPath={'/visit'}
        property={property}
        getAllReq={getVisitByPage}
        updateReq={() => Promise.resolve()}
        deleteReq={deleteVisitById}
        insertReq={() => Promise.resolve()}
        getCategoryReq={() => Promise.resolve()}
        getCount={getCount}
        spare={spare}
        readonly={true}
        hasPage={true}
      />
    </section>
  );
};

export default VisitEditor;
