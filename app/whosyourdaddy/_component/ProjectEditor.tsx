'use client';
import { Button, Drawer, Popconfirm, Space, Spin, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { deleteProjectById, getAllProjects } from '@/api/projectPageApi';
import { useImmer } from 'use-immer';
import InsertProject from './tiny/InsertProject';
const ProjectEditor = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [projects, setProjects] = useImmer<Record<string, any>[]>([]);
  const [editContent, setEditContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useImmer<Record<string, any>[]>([]);
  const [open, setOpen] = useState(false);
  const getAllProject = async () => {
    setLoading(true);
    const res = await getAllProjects();
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
        render: (_: any, record: Record<string, any>) => (
          <Space>
            <a onClick={() => handleUpdate(record)}>
              <Button type="link">update</Button>
            </a>
            <Popconfirm
              title="Delete?"
              description="Are you sure to delete?"
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
    setProjects(() => res.map((t: any) => ({ ...t, key: t.id })));
  };
  const handleDelete = async (id: string) => {
    setLoading(false);
    await deleteProjectById(id);
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
  useEffect(() => {
    getAllProject();
  }, [refreshFlag]);
  return (
    <section className="p-4 border">
      {loading && <Spin />}
      <Tag bordered={false} color="volcano" className="p-2 m-2">
        [ 当前已有Project信息 ]
      </Tag>
      <Table columns={columns} dataSource={projects} className=" max-h-96 overflow-auto" bordered />
      <Tag bordered={false} color="volcano" className="p-2 m-2">
        [ 操作:添加一条Project记录 ]
      </Tag>
      <div className="border p-10 flex justify-center">
        <InsertProject type={'create'} refreshTable={handleRefresh} />
      </div>
      <Drawer
        width={550}
        zIndex={1040}
        className="!cursor-default"
        title="update project"
        onClose={() => setOpen(false)}
        open={open}
      >
        <InsertProject defaultValue={editContent} type={'update'} refreshTable={handleRefresh} />
      </Drawer>
    </section>
  );
};

export default ProjectEditor;
