'use client';
import { useRef, useState } from 'react';
import style from './WriteBox.module.scss';
import { Button, Rate, Select, message } from 'antd';
import { useImmer } from 'use-immer';
import getUserAgentData from '@/lib/getUserAgentData';
import { insertComment } from '@/api/gossipPageApi';
import { LeftSquare, MessageUnread, RightSquare, ToBottomOne } from '@icon-park/react';
import { useRouter } from 'next/navigation';
const WriteBox = ({ curPage }: { curPage: string }) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [loadings, setLoadings] = useState<boolean>(false);
  const [showWriteBox, setShowWriteBox] = useState<boolean>(false);
  const [sectionClass, setSectionClass] = useState(style['section-reverse']);
  const [comment, setComment] = useImmer({
    rate: '',
    name: '',
    mood: '',
    message: '',
  });
  const handleInputChange = (type: 'name' | 'mood' | 'message' | 'rate', value: string | number) => {
    setComment((draft) => {
      (draft[type] as any) = value;
    });
  };
  const handleSubmit = async () => {
    let key: keyof typeof comment;
    for (key in comment) {
      if (comment[key] === '') {
        return messageApi.open({
          type: 'warning',
          content: key + " should't be empty",
        });
      }
    }
    const { machine, browser } = getUserAgentData();
    setLoadings(true);
    await insertComment(comment as any, machine, browser);
    setLoadings(false);
    setComment((draft) => {
      draft = {
        rate: '',
        name: '',
        mood: '',
        message: '',
      };
    });
    handleChangeShowWriteBox(true);
    router.refresh();
  };
  const handleChangeShowWriteBox = (isShow: boolean) => {
    setShowWriteBox(!isShow);
    setSectionClass(isShow ? style['section-reverse'] : style['section-start']);
  };
  return (
    <>
      <div className="w-[500px] z-10 self-center mb-[-16px] flex justify-center gap-2">
        <Button type="text" className="cursor-none">
          <LeftSquare theme="outline" size="21" fill="#4c4f69" strokeWidth={4} />
        </Button>
        {showWriteBox ? (
          <Button type="text" className="cursor-none" onClick={() => handleChangeShowWriteBox(true)}>
            <ToBottomOne theme="outline" size="21" fill="#4c4f69" strokeWidth={4} />
          </Button>
        ) : (
          <Button type="text" className="cursor-none" onClick={() => handleChangeShowWriteBox(false)}>
            <MessageUnread theme="outline" size="21" fill="#4c4f69" strokeWidth={4} />
          </Button>
        )}
        <Button type="text" className="cursor-none">
          <RightSquare theme="outline" size="21" fill="#4c4f69" strokeWidth={4} />
        </Button>
      </div>
      <section className={sectionClass} key={sectionClass}>
        {contextHolder}
        <Rate onChange={(value) => handleInputChange('rate', value)} className={style.rate} />
        <div className="flex gap-5 px-5">
          <label htmlFor="it_2" className=" !text-gray-300">
            name:
          </label>
          <input
            onChange={(event) => handleInputChange('name', event?.target.value)}
            id="it_2"
            type="text"
            maxLength={8}
            className={`${style.inputs} w-36`}
          />
          <label htmlFor="it_3" className=" !text-gray-300">
            mood:
          </label>
          <Select
            id="it_3"
            style={{ width: 144 }}
            className=" cursor-none"
            size="small"
            onChange={(value) => handleInputChange('mood', value)}
            options={[
              { value: 'DisappointedFace', label: 'Disappoint' },
              { value: 'EmotionHappy', label: 'Happy' },
              { value: 'EmotionUnhappy', label: 'UnHappy' },
              { value: 'GrinningFace', label: 'Grinning' },
              { value: 'SlightlySmilingFace', label: 'SlightlySmiling' },
              { value: 'SmilingFaceWithSquintingEyes', label: 'Smiling' },
              { value: 'WorriedFace', label: 'Worried' },
            ]}
          />
        </div>
        <div className="flex gap-3 px-5">
          <label htmlFor="it_1" className=" !text-gray-300">
            message:
          </label>
          <input
            onChange={(event) => handleInputChange('message', event?.target.value)}
            id="it_1"
            type="text"
            maxLength={99}
            className={`${style.inputs} flex-1`}
          />
        </div>
        <Button onClick={handleSubmit} loading={loadings} className="h-10 w-24 mt-10 self-center cursor-none">
          submit
        </Button>
      </section>
    </>
  );
};

export default WriteBox;
