/*
  Warnings:

  - You are about to alter the column `content` on the `blog_page_item` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `Text`.

*/
-- AlterTable
ALTER TABLE `blog_page_item` MODIFY `content` TEXT NOT NULL;
