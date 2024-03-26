"use server";
import { ProjectPageItem } from "@prisma/client";
import executeWithDb from "./executeWithDb";
import prisma from "@/lib/prisma";
//获得funnyPage页面的所有项目
const getAllProjects = async () => {
  return executeWithDb(() => prisma.projectPageItem.findMany());
};
const insertProject = async (data: ProjectPageItem) => {
  return executeWithDb(() => prisma.projectPageItem.create({
    data,
  }));
};
const deleteProjectById = async (id: string) => {
  return executeWithDb(() => prisma.projectPageItem.delete({
    where: {
      id,
    }
  }));
};
const getProjectCategory = async () => {
  return executeWithDb(() => prisma.projectPageItem.findMany({
    distinct: ['category'],
    select: {
      category: true,
    },
  }));
};
const updateProjectById = (id: string, newData: Record<string, any>) => {
  return executeWithDb(() => prisma.projectPageItem.update({
    where: {
      id,
    },
    data: newData
  }));
};
export { getAllProjects, deleteProjectById, insertProject, getProjectCategory, updateProjectById };