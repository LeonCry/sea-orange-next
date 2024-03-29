'use client';
import CommonEditor from './common/CommonEditor';
import { getCommentInGossip, getCommentNum } from '@/api/gossipPageApi';
const GossipEditor = () => {
  const property = [{ causal: 'gossip', label: 'gossip' }];
  const spare = { isShow: true };
  return (
    <section>
      <CommonEditor
        title="Gossip"
        property={property}
        getAllReq={getCommentInGossip}
        updateReq={() => Promise.resolve()}
        deleteReq={() => Promise.resolve()}
        insertReq={() => Promise.resolve()}
        getCategoryReq={() => Promise.resolve()}
        getCount={getCommentNum}
        spare={spare}
        readonly={true}
        hasPage={true}
      />
    </section>
  );
};

export default GossipEditor;