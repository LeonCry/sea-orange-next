"use server";
import executeWithDb from "./executeWithDb";
import prisma from "@/lib/prisma";
//获得funnyPage页面的所有项目
const getAllProjectsFromFunny = async () => {
  return executeWithDb(() => prisma.funnyPageItem.findMany());
};
export { getAllProjectsFromFunny };