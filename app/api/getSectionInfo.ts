"use server";
import prisma from "@/lib/prisma";
const getSectionInfo = async () => {
  return prisma.sectionInfo.findMany()
    .catch((e: any) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
export default getSectionInfo;