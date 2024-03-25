'use client';
import { getAllBlogInfo, getBlogCategory, insertMd } from '@/api/blogPageApi';
import { BlogPageItem } from '@prisma/client';
import { Alert, Button, Divider, Drawer, Input, InputRef, Popconfirm, Select, Space, Spin, Table, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
const BlogEditor = () => {
  const [category, setCategory] = useImmer<string[]>([]);
  const [blogs, setBlogs] = useImmer<Record<string, any>[]>([]);
  const [blogInsertedInfo, setBlogInsertedInfo] = useImmer({
    name: '',
    description: '',
    icon: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useImmer<Record<string, any>[]>([]);
  const [open, setOpen] = useState(false);
  const submit = (e: any) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = async (e) => {
      console.log('sss');
      const markdownContent = e.target!.result;
      const data = {
        ...blogInsertedInfo,
        path: 'null',
        sorted: 1,
        isShow: true,
        file: 'null',
        content: markdownContent,
      };
      setLoading(true);
      const res = await insertMd(data as BlogPageItem);
      setLoading(false);
      if (res.id) return alert('成功!');
    };
    reader.readAsText(file);
  };
  const handleChange = (e: any) => {
    let key: keyof typeof blogInsertedInfo = e.target.dataset.title;
    setBlogInsertedInfo((draft) => {
      draft[key] = e.target.value;
    });
  };
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const addItem = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    setCategory((draft) => {
      draft.push(name || 'empty');
    });
    setName('');
    await new Promise((resolve) => setTimeout(resolve, 0));
    inputRef.current?.focus();
  };
  const categoryChange = (val: string) => {
    setBlogInsertedInfo((draft) => {
      draft.category = val;
    });
  };
  const getAllCategory = async () => {
    const res = await getBlogCategory();
    setCategory(() => res.map((v: any) => v.category));
  };
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
        render: () => (
          <Space size="middle">
            <a onClick={() => setOpen(true)}>更新</a>
            <Popconfirm
              title="Delete the blog?"
              description="Are you sure to delete this blog?"
              onConfirm={handleDelete}
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
  const handleDelete = () => {};
  useEffect(() => {
    getAllCategory();
    getAllBlogs();
  }, []);
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
      <div className="flex flex-col gap-6 w-[500px]">
        <Input addonBefore="名称:" data-title="name" onChange={handleChange} />
        <Input addonBefore="描述:" data-title="description" onChange={handleChange} />
        <Input addonBefore="图标:" data-title="icon" onChange={handleChange} />
        <Select
          style={{ width: 500 }}
          placeholder="请选择分类"
          onChange={categoryChange}
          className="!cursor-default"
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: '8px 0' }} />
              <Space style={{ padding: '0 8px 4px' }}>
                <Input
                  placeholder="新分类名称"
                  ref={inputRef}
                  value={name}
                  onChange={onNameChange}
                  onKeyDown={(e) => e.stopPropagation()}
                />
                <Button type="text" onClick={addItem}>
                  创建新分类
                </Button>
              </Space>
            </>
          )}
          options={category.map((item) => ({ label: item, value: item }))}
        />
        <div className="relative">
          <Button>上传文件并提交</Button>
          <input type="file" onChange={submit} className="absolute left-0 w-full opacity-0" />
        </div>
      </div>
      <Drawer
        zIndex={1040}
        className="!cursor-default"
        title="Basic Drawer"
        onClose={() => setOpen(false)}
        open={open}
      ></Drawer>
    </section>
  );
};

export default BlogEditor;
