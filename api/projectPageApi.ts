"use server";
import executeWithDb from "./executeWithDb";
import prisma from "@/lib/prisma";
//获得funnyPage页面的所有项目
const getAllProjects = async () => {
  return executeWithDb(() => prisma.projectPageItem.findMany());
};
export { getAllProjects };