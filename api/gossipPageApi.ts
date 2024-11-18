'use server';
import executeWithDb from './executeWithDb';
import prisma from '@/lib/prisma';
//获得gossip页面的所有评论数
const getCommentNum = async () => {
  return executeWithDb(() => prisma.gossipPageItem.count());
};
//获得gossip页面的评论 按页数
const getCommentInGossip = async (page: string | undefined | number) => {
  if (page === undefined) page = 1;
  if (typeof page === 'string') page = parseInt(page);
  return executeWithDb(() => prisma.gossipPageItem.findMany({
    skip: (page as number - 1) * 30,
    take: 30,
  }));
};
//插入一条评论
const insertComment = async (commentObj: { rate: string, name: string, mood: string, message: string }, machine: string, browser: string) => {
  return executeWithDb(() => prisma.gossipPageItem.create({
    data: {
      userName: commentObj.name,
      commentContent: commentObj.message,
      device: machine,
      brower: browser,
      stars: +commentObj.rate,
      isShow: true,
      headImg: commentObj.mood,
    },
  }));
};
const deleteComment = async (id: number) => {
  return executeWithDb(() => prisma.gossipPageItem.delete({
    where: {
      id,
    }
  }));
};
export { getCommentNum, getCommentInGossip, insertComment, deleteComment };