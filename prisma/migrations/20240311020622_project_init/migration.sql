-- CreateTable
CREATE TABLE `project_page_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `sorted` INTEGER NOT NULL,
    `isShow` BOOLEAN NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `sourceUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
