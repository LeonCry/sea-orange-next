import { Button, Divider, Input, InputRef, Select, Space, Spin } from 'antd';
import { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';

const InsertPart = (props: {
  defaultValue?: Record<string, any>;
  type: 'update' | 'create';
  property: { causal: string; label: string }[];
  refreshTable: () => void;
  getCategoryReq?: () => Promise<any>;
  insertReq: (data: Record<string, any>) => Promise<any>;
  updateReq: (id: string, data: Record<string, any>) => Promise<any>;
  spare?: Record<string, any>;
}) => {
  const inputRef = useRef<InputRef>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const initInfo: Record<string, any> = {};
  const labels: Record<string, string> = {};
  props.property.forEach((v) => {
    initInfo[v.causal] = undefined;
    labels[v.causal] = v.label;
  });
  const [insertInfo, setInsertInfo] = useImmer(initInfo);
  const [category, setCategory] = useImmer<string[]>([]);
  const handleChange = (e: any) => {
    let key: keyof typeof insertInfo = e.target.dataset.title;
    setInsertInfo((draft) => {
      draft[key] = e.target.value;
    });
  };
  const categoryChange = (val: string) => {
    setInsertInfo((draft) => {
      draft.category = val;
    });
  };
  const getAllCategory = async () => {
    if (!props.getCategoryReq) return;
    const res = await props.getCategoryReq();
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
      setInsertInfo((draft) => {
        draft.content = e.target!.result;
      });
    };
    reader.readAsText(file);
  };
  const submit = async () => {
    const data = {
      ...insertInfo,
      ...props.spare,
    };
    for (const key in insertInfo) {
      const k = key as keyof typeof insertInfo;
      if (isEmpty(insertInfo[k])) {
        if (k === 'content' && props.type === 'update') continue;
        return alert(`${labels[k]}不能为空`);
      }
    }
    if (
      Object.keys(insertInfo).includes('content') &&
      !insertInfo.content &&
      props.type === 'create'
    )
      return alert('请上传文件');
    setLoading(true);
    let res;
    if (props.type === 'create') res = await props.insertReq(data);
    else res = await props.updateReq(props.defaultValue?.id, data);
    setLoading(false);
    props.refreshTable();
    if (res.id) {
      setInsertInfo(() => initInfo);
      return alert('success!');
    }
  };
  useEffect(() => {
    getAllCategory();
    if (props.defaultValue) {
      setInsertInfo((draft) => {
        props.property.forEach(({ causal }) => {
          draft[causal] = props.defaultValue?.[causal];
        });
      });
    }
  }, [props]);
  return (
    <div className="flex flex-col gap-6 w-[500px]">
      {loading && <Spin />}
      {props.property.map((v) => {
        if (v.causal === 'category' || v.causal === 'content') return null;
        return (
          <Input
            key={v.causal}
            addonBefore={v.label}
            defaultValue={props.defaultValue?.[v.causal]}
            data-title={v.causal}
            onChange={handleChange}
          />
        );
      })}
      {props.property.find((v) => v.causal === 'category') && (
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
      )}
      {props.property.find((v) => v.causal === 'content') && (
        <div className="relative">
          <Button>上传文件</Button>
          <input type="file" onChange={uploadFile} className="absolute left-0 w-full opacity-0" />
        </div>
      )}
      <Button type="dashed" onClick={submit}>
        提交
      </Button>
    </div>
  );
};
export default InsertPart;
