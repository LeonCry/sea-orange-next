'use client';
import { Button, Input, Space, Table } from 'antd';
const BlogEditor = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>编辑</a>
          <a className="text-red-500">删除</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <section className="p-4 border text-base">
      <p>当前已有Blog信息:</p>
      <br />
      <hr />
      <br />
      <Table columns={columns} dataSource={data} />
      <p>操作:</p>
      <br />
      <p>添加一条Blog:</p>
      <br />
      <br />
      <div className="flex flex-col gap-6 w-[500px]">
        <Input prefix="文件名" suffix="string" />
        <Input prefix="￥" suffix="a" />
        <Input prefix="￥" suffix="a" />
        <Input prefix="￥" suffix="a" />
        <Input prefix="￥" suffix="a" />
        <Input prefix="￥" suffix="a" />
        <Button>上传</Button>
      </div>
    </section>
  );
};

export default BlogEditor;
