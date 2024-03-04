"use server";
import prisma from "@/lib/prisma";
const getSectionInfo = async () => {
  const main = () => {
    const section = prisma.sectionInfo.findMany();
    return section;
  };
  return main()
    .catch((e: any) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
export default getSectionInfo;