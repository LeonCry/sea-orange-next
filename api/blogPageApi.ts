"use server";
import executeWithDb from "./executeWithDb";
import prisma from "@/lib/prisma";
import { BlogPageItem } from "@prisma/client";
//获得Blog页面的所有项目信息
const getAllBlogInfo = async () => {
  return executeWithDb(() => prisma.blogPageItem.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      icon: true,
      path: true,
      sorted: true,
      isShow: true,
      category: true,
    },
  }));
};
const getBlogInfoById = async (id: number) => {
  return executeWithDb(() => prisma.blogPageItem.findUnique({
    where: {
      id
    }
  }));
};
//插入一条评论
const insertMd = async (data: BlogPageItem) => {
  return executeWithDb(() => prisma.blogPageItem.create({
    data,
  }));
};
export { getAllBlogInfo, getBlogInfoById, insertMd };