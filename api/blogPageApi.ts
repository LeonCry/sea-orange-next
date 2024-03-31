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
      id,
    }
  }));
};
//获取分类
const getBlogCategory = async () => {
  return executeWithDb(() => prisma.blogPageItem.findMany({
    distinct: ['category'],
    select: {
      category: true,
    },
  }));
};
//插入一条blog
const insertMd = async (data: BlogPageItem) => {
  return executeWithDb(() => prisma.blogPageItem.create({
    data,
  }));
};
const updateBlogById = (id: number, newData: Record<string, any>) => {
  return executeWithDb(() => prisma.blogPageItem.update({
    where: {
      id,
    },
    data: newData
  }));
};
const deleteMdById = async (id: number) => {
  return executeWithDb(() => prisma.blogPageItem.delete({
    where: {
      id,
    }
  }));
};
export { getAllBlogInfo, getBlogInfoById, insertMd, getBlogCategory, deleteMdById, updateBlogById };