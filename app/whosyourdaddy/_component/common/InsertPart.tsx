import { CheckOne, CloseOne } from '@icon-park/react';
import { useMemoizedFn, useReactive, useResetState } from 'ahooks';
import { Button, Divider, Input, InputRef, Select, Space, Spin, Tag } from 'antd';
import { isEmpty, throttle } from 'radash';
import { useRef, useState, memo } from 'react';

const InsertPart = memo(
  (props: {
    defaultValue?: Record<string, any>;
    type: 'update' | 'create';
    property: { causal: string; label: string }[];
    refreshTable: () => void;
    getCategoryReq?: () => Promise<any>;
    insertReq: (data: Record<string, any>) => Promise<any>;
    updateReq: (id: number, data: Record<string, any>) => Promise<any>;
    spare?: Record<string, any>;
    closeSelfFn?: () => void;
  }) => {
    const inputRef = useRef<InputRef>(null);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const initInfo: Record<string, any> = {};
    const labels: Record<string, string> = {};
    props.property.forEach((v) => {
      initInfo[v.causal] = props.defaultValue?.[v.causal];
      labels[v.causal] = v.label;
    });
    const [insertInfo, setInsertInfo, resetInsertInfo] = useResetState(initInfo);
    const category = useReactive<string[]>([]);
    const handleChange = useMemoizedFn((e: any) => {
      let key: keyof typeof insertInfo = e.target.dataset.title;
      setInsertInfo({ ...insertInfo, [key]: e.target.value });
    });
    const categoryChange = useMemoizedFn((val: string) => {
      setInsertInfo({ ...insertInfo, category: val });
    });
    const getAllCategory = useMemoizedFn(
      throttle({ interval: 300 }, async () => {
        if (!props.getCategoryReq) return;
        const res = await props.getCategoryReq();
        category.length = 0;
        category.push(...res.map((v: any) => v.category));
      })
    );
    const onNameChange = useMemoizedFn((event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    });
    const addItem = useMemoizedFn(
      async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        category.push(name || 'empty');
        setName('');
        await new Promise((resolve) => setTimeout(resolve, 0));
        inputRef.current?.focus();
      }
    );
    const uploadFile = useMemoizedFn((e: any) => {
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onload = async (e) => {
        if (!e?.target?.result) return;
        setInsertInfo({ ...insertInfo, content: e.target.result });
      };
      reader.readAsText(file);
    });
    const submit = useMemoizedFn(
      throttle({ interval: 2000 }, async () => {
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
        const res =
          props.type === 'create'
            ? await props.insertReq(data)
            : await props.updateReq(props.defaultValue?.id, data);
        setLoading(false);
        props.refreshTable();
        if (res.id) {
          alert('success!');
          return props.closeSelfFn ? props.closeSelfFn() : resetInsertInfo();
        }
      })
    );
    return (
      <div className="flex flex-col gap-6 w-[500px]">
        {loading && <Spin />}
        {props.property.map((v) => {
          if (v.causal === 'category' || v.causal === 'content') return null;
          return (
            <Input
              key={v.causal}
              addonBefore={v.label}
              data-title={v.causal}
              onChange={handleChange}
              value={insertInfo?.[v.causal]}
            />
          );
        })}
        {props.property.find((v) => v.causal === 'category') && (
          <Select
            style={{ width: 500 }}
            placeholder="请选择分类"
            defaultValue={insertInfo?.category}
            onChange={categoryChange}
            onDropdownVisibleChange={getAllCategory}
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
            {insertInfo.content || props.type === 'update' ? (
              <Tag
                bordered={false}
                color="green"
                className="absolute right-0 -top-1 p-2 flex gap-2"
              >
                <CheckOne theme="outline" size="20" fill="#53A052" />
                <span>文件已上传</span>
              </Tag>
            ) : (
              <Tag
                bordered={false}
                color="volcano"
                className="absolute right-0 -top-1 p-2 flex gap-2"
              >
                <CloseOne theme="outline" size="20" fill="#D4380D" />
                <span>无文件</span>
              </Tag>
            )}

            <input type="file" onChange={uploadFile} className="absolute left-0 w-24 opacity-0" />
          </div>
        )}
        <Button type="dashed" onClick={submit}>
          提交
        </Button>
      </div>
    );
  },
  (pre, next) => {
    const { defaultValue: pd, property: pp, spare: ps } = pre;
    const { defaultValue: nd, property: np, spare: ns } = next;
    if (pd !== nd || pp !== np || ps !== ns) return true;
    return false;
  }
);
InsertPart.displayName = 'InsertPart';
export default InsertPart;
