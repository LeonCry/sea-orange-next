'use client';
import { insertMd } from '@/api/blogPageApi';
import { BlogPageItem } from '@prisma/client';
import { Button, Divider, Input, InputRef, Select, Space, Spin } from 'antd';
import { useRef, useState } from 'react';
import { useImmer } from 'use-immer';
const InsertPart = () => {
  const inputRef = useRef<InputRef>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [blogInsertedInfo, setBlogInsertedInfo] = useImmer({
    name: '',
    description: '',
    icon: '',
    category: '',
  });
  const [category, setCategory] = useImmer<string[]>([]);
  const handleChange = (e: any) => {
    let key: keyof typeof blogInsertedInfo = e.target.dataset.title;
    setBlogInsertedInfo((draft) => {
      draft[key] = e.target.value;
    });
  };
  const categoryChange = (val: string) => {
    setBlogInsertedInfo((draft) => {
      draft.category = val;
    });
  };
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
  return (
    <div className="flex flex-col gap-6 w-[500px]">
      {loading && <Spin />}
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
  );
};

export default InsertPart;
