"use server";
import type { VisitTime } from "@prisma/client";
import executeWithDb from "./executeWithDb";
import prisma from "@/lib/prisma";
//获得每个section的header信息
const getSectionInfo = async () => {
  return executeWithDb(() => prisma.sectionInfo.findMany());
};
//提交每个界面的访问信息
const uploadVisit = async (info: Omit<VisitTime, 'id'>) => {
  // return executeWithDb(() => prisma.visitTime.create({ data: info }));
};
export { getSectionInfo, uploadVisit };