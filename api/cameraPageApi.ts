"use server";
import { CameraPageItem } from "@prisma/client";
import executeWithDb from "./executeWithDb";
import prisma from "@/lib/prisma";
//获得camera页面的所有项目 按页数
const getPhotoByPage = async (page: number | undefined) => {
  if (page === undefined) page = 1;
  return executeWithDb(() => prisma.cameraPageItem.findMany({
    skip: (page! - 1) * 30,
    take: 30,
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
const getPhotoById = async (id: number) => {
  return executeWithDb(() => prisma.cameraPageItem.findUnique({
    where: {
      id,
    }
  }));
};
const deleteCameraById = async (id: number) => {
  return executeWithDb(() => prisma.cameraPageItem.delete({
    where: {
      id,
    }
  }));
};
const insertCamera = async (data: CameraPageItem) => {
  return executeWithDb(() => prisma.cameraPageItem.create({
    data,
  }));
};
const updateCameraById = (id: number, newData: Record<string, any>) => {
  return executeWithDb(() => prisma.cameraPageItem.update({
    where: {
      id,
    },
    data: newData
  }));
};
const getCount = async () => {
  return executeWithDb(() => prisma.cameraPageItem.count());
};
export { getCount, updateCameraById, getPhotoByPage, getPossibleCategory, getPhotoByCategory, getPhotoById, deleteCameraById, insertCamera };