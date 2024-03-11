-- CreateTable
CREATE TABLE `Gossip_page_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL,
    `commentContent` VARCHAR(191) NOT NULL,
    `device` VARCHAR(191) NOT NULL,
    `brower` VARCHAR(191) NOT NULL,
    `isShow` BOOLEAN NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `stars` INTEGER NOT NULL,
    `headImg` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
