import prisma from "@/lib/prisma";
const executeWithDb = async (cb: () => Promise<any>) => {
  return cb().catch(() => {
    process.exit(1);
  })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
export default executeWithDb;