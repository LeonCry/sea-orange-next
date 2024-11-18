'use server';
import { FunnyPageItem } from '@prisma/client';
import executeWithDb from './executeWithDb';
import prisma from '@/lib/prisma';
//获得funnyPage页面的所有项目
const getAllProjectsFromFunny = async () => {
  return executeWithDb(() => prisma.funnyPageItem.findMany());
};
const insertFunny = async (data: FunnyPageItem) => {
  return executeWithDb(() => prisma.funnyPageItem.create({
    data,
  }));
};
const deleteFunnyById = async (id: number) => {
  return executeWithDb(() => prisma.funnyPageItem.delete({
    where: {
      id,
    }
  }));
};
const getFunnyCategory = async () => {
  return executeWithDb(() => prisma.funnyPageItem.findMany({
    distinct: ['category'],
    select: {
      category: true,
    },
  }));
};
const updateFunnyById = (id: number, newData: Record<string, any>) => {
  return executeWithDb(() => prisma.funnyPageItem.update({
    where: {
      id,
    },
    data: newData
  }));
};
export { getAllProjectsFromFunny, insertFunny, deleteFunnyById, getFunnyCategory, updateFunnyById };