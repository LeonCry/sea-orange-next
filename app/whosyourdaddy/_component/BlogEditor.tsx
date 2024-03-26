'use client';
import { deleteMdById, getAllBlogInfo } from '@/api/blogPageApi';
import { Button, Drawer, Popconfirm, Space, Spin, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import InsertBlog from './tiny/InsertBlog';
const BlogEditor = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [blogs, setBlogs] = useImmer<Record<string, any>[]>([]);
  const [editContent, setEditContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useImmer<Record<string, any>[]>([]);
  const [open, setOpen] = useState(false);
  const getAllBlogs = async () => {
    setLoading(true);
    const res = await getAllBlogInfo();
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
              title="Delete the blog?"
              description="Are you sure to delete this blog?"
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
    setBlogs(() => res.map((t: any) => ({ ...t, key: t.id })));
  };
  const handleDelete = async (id: string) => {
    setLoading(false);
    await deleteMdById(id);
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
    getAllBlogs();
  }, [refreshFlag]);
  return (
    <section className="p-4 border">
      {loading && <Spin />}
      <Tag bordered={false} color="volcano" className="p-2 m-2">
        [ 当前已有BLOG信息 ]
      </Tag>
      <Table columns={columns} dataSource={blogs} className=" max-h-96 overflow-auto" bordered />
      <Tag bordered={false} color="volcano" className="p-2 m-2">
        [ 操作:添加一条BLOG记录 ]
      </Tag>
      <div className="border p-10 flex justify-center">
        <InsertBlog type={'create'} refreshTable={handleRefresh} />
      </div>
      <Drawer
        width={550}
        zIndex={1040}
        className="!cursor-default"
        title="update blog"
        onClose={() => setOpen(false)}
        open={open}
      >
        <InsertBlog defaultValue={editContent} type={'update'} refreshTable={handleRefresh} />
      </Drawer>
    </section>
  );
};

export default BlogEditor;
