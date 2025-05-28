-- AlterTable
ALTER TABLE `comments` ADD COLUMN `repliedToId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_repliedToId_fkey` FOREIGN KEY (`repliedToId`) REFERENCES `comments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
