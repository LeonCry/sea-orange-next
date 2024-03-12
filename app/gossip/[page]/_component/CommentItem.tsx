'use client';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import Icon from '@icon-park/react/es/all';
import { GossipPageItem } from '@prisma/client';
import { Rate } from 'antd';
import { useRef } from 'react';
const colors = [
  'bg-red-50',
  'bg-sky-50',
  'bg-pink-50',
  'bg-rose-50',
  'bg-yellow-50',
  'bg-green-50',
  'bg-blue-50',
  'bg-indigo-50',
  'bg-purple-50',
  'bg-pink-50',
  'bg-teal-50',
  'bg-violet-50',
  'bg-orange-50',
  'bg-amber-50',
  'bg-lime-50',
  'bg-emerald-50',
  'bg-cyan-50',
];
const CommentItem = ({ comment }: { comment: GossipPageItem }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isShow = useIntersectionObserver(contentRef);
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return (
    <div ref={contentRef} style={{ opacity: isShow ? 1 : 0 }} className="h-44 w-96">
      {isShow && (
        <div
          className={` h-fit flex flex-col max-w-[400px] gap-3 rounded-xl p-3 transition-all duration-300 hover:bg-slate-50 border ${randomColor}`}
        >
          <div className="flex items-center gap-6">
            <div className="flex-1 flex items-center gap-2 text-base">
              <Icon type={comment.headImg} size={26} className="p-1" />
              <span>- {comment.userName} -</span>
            </div>
            <Rate defaultValue={comment.stars} disabled className="text-[#ff9a9a]" />
          </div>
          <div className="border-t text-base p-2 overflow-auto max-h-[80px]">{comment.commentContent}</div>
          <span className="self-end text-xs text-gray-400">- {comment.date.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
