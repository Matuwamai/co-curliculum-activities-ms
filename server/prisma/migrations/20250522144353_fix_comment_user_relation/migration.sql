/*
  Warnings:

  - You are about to drop the column `repliedToId` on the `comments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_repliedToId_fkey`;

-- DropIndex
DROP INDEX `comments_repliedToId_fkey` ON `comments`;

-- AlterTable
ALTER TABLE `comments` DROP COLUMN `repliedToId`,
    ADD COLUMN `parentId` INTEGER NULL,
    MODIFY `studentId` INTEGER NULL,
    MODIFY `trainerId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `comments_parentId_idx` ON `comments`(`parentId`);

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `comments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
