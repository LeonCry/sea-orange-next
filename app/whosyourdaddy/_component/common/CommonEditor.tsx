'use client';
import { Button, Drawer, Popconfirm, Space, Spin, Table, TablePaginationConfig, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import InsertPart from './InsertPart';
export interface CommonEditorService {
  title: string;
  property: { causal: string; label: string }[];
  spare?: Record<string, any>;
  readonly?: boolean;
  hasPage?: boolean;
  getAllReq: (page?: number) => Promise<any>;
  updateReq: (id: string, data: Record<string, any>) => Promise<any>;
  deleteReq: (id: string) => Promise<any>;
  insertReq: (data: any) => Promise<any>;
  getCategoryReq?: () => Promise<any>;
  getCount?: () => Promise<any>;
}
const CommonEditor = (props: CommonEditorService) => {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [tableData, setTableData] = useImmer<Record<string, any>[]>([]);
  const [editContent, setEditContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useImmer<Record<string, any>[]>([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 30;
  const getAllData = async () => {
    setLoading(true);
    const res = await props.getAllReq(page);
    setLoading(false);
    if (!res.length) return;
    const col = Object.keys(res[0]).map((t) => ({
      title: t,
      dataIndex: t,
      key: t + Math.random(),
    }));
    setColumns(() => [
      ...col,
      {
        title: 'Action',
        key: 'action',
        render: (_: any, record: Record<string, any>) =>
          !props.readonly && (
            <Space>
              <a onClick={() => handleUpdate(record)}>
                <Button type="link">update</Button>
              </a>
              <Popconfirm
                title="Delete?"
                description="Are you sure to delete it?"
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </Space>
          ),
      },
    ]);
    setTableData(() => res.map((t: any) => ({ ...t, key: t.id })));
  };
  const getTotals = async () => {
    if (!props.getCount) return;
    const res = await props.getCount();
    setTotal(res);
  };
  const handleDelete = async (id: string) => {
    setLoading(false);
    await props.deleteReq(id);
    setLoading(true);
    setRefreshFlag(!refreshFlag);
  };
  const handleUpdate = (record: Record<string, any>) => {
    setEditContent(() => record);
    setOpen(true);
  };
  const handleRefresh = () => {
    setRefreshFlag(!refreshFlag);
  };
  const handlePageChange = (pagination: TablePaginationConfig) => {
    if (!pagination.current) return;
    setPage(pagination.current);
  };
  useEffect(() => {
    getAllData();
    getTotals();
  }, [refreshFlag, page]);
  return (
    <section className="p-4 border">
      {loading && <Spin />}
      <Tag bordered={false} color="volcano" className="p-2 m-2">
        [ 当前已有{props.title}信息 ]
      </Tag>
      <Table
        columns={columns}
        dataSource={tableData}
        className={`overflow-auto ${props.readonly ? 'max-h-[750px]' : 'max-h-96'}`}
        bordered
        onChange={handlePageChange}
        pagination={{ current: page, pageSize, total }}
      />
      {!props.readonly && (
        <Tag bordered={false} color="volcano" className="p-2 m-2">
          [ 操作:添加一条{props.title}记录 ]
        </Tag>
      )}
      {!props.readonly && (
        <div className="border p-10 flex justify-center">
          <InsertPart
            type={'create'}
            refreshTable={handleRefresh}
            property={props.property}
            getCategoryReq={props.getCategoryReq}
            insertReq={props.insertReq}
            updateReq={props.updateReq}
            spare={props.spare}
          />
        </div>
      )}
      <Drawer
        width={550}
        zIndex={1040}
        className="!cursor-default"
        title="update"
        onClose={() => setOpen(false)}
        open={open}
      >
        <InsertPart
          defaultValue={editContent}
          type={'update'}
          refreshTable={handleRefresh}
          property={props.property}
          getCategoryReq={props.getCategoryReq}
          insertReq={props.insertReq}
          updateReq={props.updateReq}
          spare={props.spare}
        />
      </Drawer>
    </section>
  );
};

export default CommonEditor;
