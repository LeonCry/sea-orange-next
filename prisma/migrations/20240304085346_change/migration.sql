/*
  Warnings:

  - You are about to drop the column `ip` on the `visit_time` table. All the data in the column will be lost.
  - Added the required column `browser` to the `visit_time` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `visit_time` DROP COLUMN `ip`,
    ADD COLUMN `browser` VARCHAR(191) NOT NULL;
