"use server";
import executeWithDb from "./executeWithDb";
import prisma from "@/lib/prisma";
//获得gossip页面的所有评论数
const getCommentNum = async () => {
  return executeWithDb(() => prisma.gossipPageItem.count());
};
//获得gossip页面的评论 按页数
const getCommentInGossip = async (page: string) => {
  const pageInt = parseInt(page);
  return executeWithDb(() => prisma.gossipPageItem.findMany({
    skip: (pageInt - 1) * 30,
    take: 30,
  }));
};
//插入一条评论
const insertComment = async (commentObj: { rate: number, name: string, mood: string, message: string }, machine: string, browser: string) => {
  return executeWithDb(() => prisma.gossipPageItem.create({
    data: {
      userName: commentObj.name,
      commentContent: commentObj.message,
      device: machine,
      brower: browser,
      stars: commentObj.rate,
      isShow: true,
      headImg: commentObj.mood,
    },
  }));
};
export { getCommentNum, getCommentInGossip, insertComment };