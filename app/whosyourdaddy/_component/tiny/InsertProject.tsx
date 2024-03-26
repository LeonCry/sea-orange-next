'use client';
import { getProjectCategory, insertProject, updateProjectById } from '@/api/projectPageApi';
import { ProjectPageItem } from '@prisma/client';
import { Button, Divider, Input, InputRef, Select, Space, Spin } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
const InsertProject = (props: {
  defaultValue?: Record<string, any>;
  type: 'update' | 'create';
  refreshTable: () => void;
}) => {
  const inputRef = useRef<InputRef>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [projectInsertedInfo, setProjectInsertedInfo] = useImmer({
    name: '',
    description: '',
    icon: '',
    category: '',
    sourceUrl: '',
  });
  const [category, setCategory] = useImmer<string[]>([]);
  const handleChange = (e: any) => {
    let key: keyof typeof projectInsertedInfo = e.target.dataset.title;
    setProjectInsertedInfo((draft) => {
      draft[key] = e.target.value;
    });
  };
  const categoryChange = (val: string) => {
    setProjectInsertedInfo((draft) => {
      draft.category = val;
    });
  };
  const getAllCategory = async () => {
    const res = await getProjectCategory();
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
  const submit = async () => {
    const data = {
      ...projectInsertedInfo,
      path: 'null',
      sorted: 1,
      isShow: true,
    };
    for (const key in projectInsertedInfo) {
      const k = key as keyof typeof projectInsertedInfo;
      if (!projectInsertedInfo[k].length) return alert('请填写完整信息');
    }
    setLoading(true);
    let res;
    if (props.type === 'create') res = await insertProject(data as ProjectPageItem);
    else res = await updateProjectById(props.defaultValue?.id, data as ProjectPageItem);
    setLoading(false);
    props.refreshTable();
    if (res.id) {
      alert('success!');
      setProjectInsertedInfo({
        name: '',
        description: '',
        icon: '',
        category: '',
        sourceUrl: '',
      });
    }
  };
  useEffect(() => {
    getAllCategory();
    if (props.defaultValue) {
      setProjectInsertedInfo(() => ({
        name: props.defaultValue?.name,
        description: props.defaultValue?.description,
        icon: props.defaultValue?.icon,
        category: props.defaultValue?.category,
        sourceUrl: props.defaultValue?.sourceUrl,
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
        addonBefore="图片地址:"
        defaultValue={props.defaultValue?.icon}
        data-title="icon"
        onChange={handleChange}
      />
      <Input
        addonBefore="网址:"
        defaultValue={props.defaultValue?.sourceUrl}
        data-title="sourceUrl"
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
      <Button type="dashed" onClick={submit}>
        提交
      </Button>
    </div>
  );
};

export default InsertProject;
