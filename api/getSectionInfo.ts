'use server';
import type { VisitTime } from '@prisma/client';
import executeWithDb from './executeWithDb';
import prisma from '@/lib/prisma';
//提交每个界面的访问信息
const uploadVisit = async (info: Omit<VisitTime, 'id'>) => {
  return executeWithDb(() => prisma.visitTime.create({ data: info }));
};
//查询访问信息
const getVisitByPage = async (page: number | undefined) => {
  if (page === undefined) page = 1;
  return executeWithDb(() => prisma.visitTime.findMany({
    skip: (page! - 1) * 30,
    take: 30,
  }));
};
//删除访问信息
const deleteVisitById = async (id: number) => {
  return executeWithDb(() => prisma.visitTime.delete({
    where: {
      id,
    }
  }));
};
const getCount = async () => {
  return executeWithDb(() => prisma.visitTime.count());
};
export { getCount, uploadVisit, getVisitByPage, deleteVisitById };