"use server";
import executeWithDb from "./executeWithDb";
import prisma from "@/lib/prisma";
//获得camera页面的所有项目 按页数
const getPhotoByPage = async (page: number) => {
  return executeWithDb(() => prisma.cameraPageItem.findMany({
    skip: (page - 1) * 20,
    take: 20,
  }));
};
//查找所有的类别
const getPossibleCategory = async () => {
  return executeWithDb(() => prisma.cameraPageItem.findMany({
    distinct: ['category'],
    select: {
      category: true,
    },
  }));
};
//获得camera页面的图片根据类别 按页数
const getPhotoByCategory = async (category: string, page: number) => {
  return executeWithDb(() => prisma.cameraPageItem.findMany({
    where: {
      category,
    },
    skip: (page - 1) * 20,
    take: 20,
  }));
};
export { getPhotoByPage, getPossibleCategory, getPhotoByCategory };