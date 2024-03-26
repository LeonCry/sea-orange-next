'use client';
import { getBlogCategory, insertMd, updateBlogById } from '@/api/blogPageApi';
import { BlogPageItem } from '@prisma/client';
import { Button, Divider, Input, InputRef, Select, Space, Spin } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
const InsertBlog = (props: {
  defaultValue?: Record<string, any>;
  type: 'update' | 'create';
  refreshTable: () => void;
}) => {
  const inputRef = useRef<InputRef>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<string | ArrayBuffer | null>(null);
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
  const getAllCategory = async () => {
    const res = await getBlogCategory();
    setCategory(() => res.map((v: any) => v.category));
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
  const uploadFile = (e: any) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = async (e) => {
      setFile(e.target!.result);
    };
    reader.readAsText(file);
  };
  const submit = async () => {
    const data = {
      ...blogInsertedInfo,
      path: 'null',
      sorted: 1,
      isShow: true,
      file: 'null',
      content: file || undefined,
    };
    for (const key in blogInsertedInfo) {
      const k = key as keyof typeof blogInsertedInfo;
      if (!blogInsertedInfo[k].length) return alert('请填写完整信息');
    }
    if (!file && props.type === 'create') return alert('请上传文件');
    setLoading(true);
    let res;
    if (props.type === 'create') res = await insertMd(data as BlogPageItem);
    else res = await updateBlogById(props.defaultValue?.id, data as BlogPageItem);
    setLoading(false);
    props.refreshTable();
    if (res.id) {
      setBlogInsertedInfo(() => ({
        name: '',
        description: '',
        icon: '',
        category: '',
      }));
      setFile(null);
      return alert('success!');
    }
  };
  useEffect(() => {
    getAllCategory();
    if (props.defaultValue) {
      setBlogInsertedInfo(() => ({
        name: props.defaultValue?.name,
        description: props.defaultValue?.description,
        icon: props.defaultValue?.icon,
        category: props.defaultValue?.category,
      }));
    }
  }, [props]);
  return (
    <div className="flex flex-col gap-6 w-[500px]">
      {loading && <Spin />}
      <Input
        addonBefore="名称:"
        defaultValue={props.defaultValue?.name}
        data-title="name"
        onChange={handleChange}
      />
      <Input
        addonBefore="描述:"
        defaultValue={props.defaultValue?.description}
        data-title="description"
        onChange={handleChange}
      />
      <Input
        addonBefore="图标:"
        defaultValue={props.defaultValue?.icon}
        data-title="icon"
        onChange={handleChange}
      />
      <Select
        style={{ width: 500 }}
        placeholder="请选择分类"
        defaultValue={props.defaultValue?.category}
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
        <Button>上传文件</Button>
        <input type="file" onChange={uploadFile} className="absolute left-0 w-full opacity-0" />
      </div>
      <Button type="dashed" onClick={submit}>
        提交
      </Button>
    </div>
  );
};

export default InsertBlog;
