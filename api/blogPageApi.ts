"use server";
import executeWithDb from "./executeWithDb";
import prisma from "@/lib/prisma";
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
export { getAllBlogInfo, getBlogInfoById };